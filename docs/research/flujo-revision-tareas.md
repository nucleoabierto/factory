# Flujo de revisión de tareas

## Propósito

Investigar cómo añadir un paso de revisión antes de marcar una tarea como completada, priorizando calidad y seguridad. Definir quién revisa, qué criterios disparan revisión, y cómo se refleja el estado de revisión en la plantilla y en `TODO.txt`.

## Contexto actual

El skill `ejecutar-tareas` marca una tarea como completada `[x]` cuando el agente termina de ejecutarla, sin un paso de revisión intermedio. El agente que ejecuta es el mismo que decide que está completa. Esto presenta el problema estructural del **sesgo de autoaprobación**: el agente que escribió el código tiene sus justificaciones en contexto y tiende a confirmar en lugar de reevaluar.

La plantilla actual (`assets/task.txt`) tiene un campo «Estado» con cuatro valores (pendiente, en progreso, completada, bloqueada) y un campo «Criterios de calidad» que el agente verifica por sí mismo.

## El problema de la autorevisión

La investigación sobre revisión de código por LLMs es contundente:

- **Sesgo de autoaprobación:** los LLMs reconocen su propia salida y muestran auto-preferencia respecto a una evaluación neutral.
- **Contaminación de contexto:** el razonamiento que produjo el código queda en la ventana de contexto; el agente relee sus razones en lugar de reevaluar.
- **Prioridad saturada:** cuando se encadenan «generar → revisar → commitear» en una sola conversación, la revisión pierde prioridad frente a la generación.

La conclusión unánime es que el agente que escribe no debe aprobar su propio trabajo. El mecanismo que resuelve el sesgo es la **separación de contextos**: un revisor independiente que ve el diff y los criterios, no el razonamiento del ejecutor.

## Enfoques analizados

### 1. Solo agente (autorevisión)

El propio agente revisa su trabajo antes de marcar completada.

**Evaluación:** descartada. El sesgo de autoaprobación está documentado y es estructural: no se resuelve con un mejor *prompt*, sino con separación de contextos.

### 2. Solo usuario

El agente presenta el trabajo y el usuario aprueba sin verificación técnica previa.

**Evaluación:** insuficiente. El usuario recibe el trabajo sin un filtro técnico que verifique criterios de calidad de forma sistemática. Puede pasar por alto problemas que un revisor independiente con contexto fresco detectaría.

### 3. Solo subagente

Un subagente independiente revisa y aprueba.

**Evaluación:** incompleta. El subagente aporta verificación técnica objetiva con contexto aislado, pero pierde el juicio humano sobre intención, alineación con la visión del proyecto y decisiones de diseño. Un solo filtro automático no basta para calidad y seguridad.

### 4. Usuario + subagente (dual)

Un subagente independiente hace la revisión técnica y el usuario hace la aprobación final.

**Evaluación: la mejor para el objetivo.** Combina dos filtros complementarios:

- **Subagente (revisión técnica):** sigue el patrón *independent-checker*. Arranca con contexto aislado: ve el diff y los criterios de calidad, no el razonamiento del agente ejecutor. Su rol es explícitamente adversarial: buscar problemas, no aprobar. Verifica que cada criterio de calidad del archivo de tarea se cumple, que no hay invariantes rotos, que el resultado coincide con el objetivo.
- **Usuario (aprobación final):** aporta juicio humano. Verifica alineación con intención, decisiones de diseño y criterios que no son puramente técnicos. Decide si el trabajo está listo para marcarse completado.

### 5. Dual-model + usuario (dos subagentes con modelos distintos + usuario)

Dos subagentes con modelos diferentes revisan en paralelo, luego el usuario aprueba.

**Evaluación:** excesiva para este proyecto. Es la más robusta técnicamente (cada modelo tiene puntos ciegos distintos), pero el coste de ejecutar dos subagentes por tarea es desproporcionado para el tamaño y la cadencia del proyecto.

### 6. Subagente + usuario condicional (escalado por riesgo)

El subagente siempre revisa; el usuario solo interviene en tareas de alto riesgo o cuando el subagente encuentra problemas.

**Evaluación:** buena alternativa, pero sacrifica seguridad. Es más rápida, pero requiere definir qué es «alto riesgo» y abre la puerta a que tareas riesgosas pasen sin revisión humana si la clasificación falla. Para un objetivo explícito de calidad y seguridad, la revisión dual siempre es más segura.

## Evaluación comparativa

| Criterio | Solo agente | Solo usuario | Solo subagente | Usuario + subagente | Dual-model + usuario | Escalado por riesgo |
|----------|-------------|--------------|----------------|---------------------|----------------------|---------------------|
| Calidad | Baja | Media | Media-alta | Alta | Máxima | Alta |
| Seguridad | Baja | Media | Media | Alta | Máxima | Media-alta |
| Coste | Mínimo | Bajo | Medio | Medio | Alto | Variable |
| Simplicidad | Alta | Alta | Media | Media | Baja | Baja |
| Sin sesgo autoaprobación | No | Sí | Sí | Sí | Sí | Sí |
| Juicio humano | No | Sí | No | Sí | Sí | Condicional |

## Recomendación

**Usuario + subagente (dual).** Es la combinación que mejor equilibra calidad, seguridad y coste para este proyecto.

No hay una combinación mejor sin aumentar significativamente el coste (dual-model) o sacrificar seguridad (escalado condicional). Lo que la hace óptima es el patrón *independent-checker*: el subagente revisa con contexto aislado, sin ver el razonamiento del agente ejecutor, con un rol explícitamente adversarial. El usuario añade el juicio que el subagente no puede aportar: intención, visión y decisiones de diseño.

## Diseño del flujo

### Estados de revisión

Añadir un estado intermedio entre «en progreso» y «completada»:

- `[~]` En progreso: el agente ejecutor está trabajando.
- `[r]` En revisión: el trabajo está hecho, pendiente de revisión dual.
- `[x]` Completada: la revisión ha aprobado el trabajo.

El estado `[r]` indica que la tarea ha terminado su ejecución pero no puede considerarse completada hasta que pase la revisión.

### Procedimiento de revisión

1. **El agente ejecutor termina el trabajo** y marca la tarea como `[r]` en `TODO.txt` y en el campo «Estado» del archivo de tarea.
2. **Se lanza un subagente independiente** con contexto aislado. El subagente recibe:
   - El diff de los cambios (`git diff`).
   - El archivo de tarea (objetivo, criterios de calidad).
   - No recibe el razonamiento del agente ejecutor.
3. **El subagente verifica cada criterio de calidad** contra el diff y produce un informe con:
   - Cada criterio marcado como cumplido, parcialmente cumplido o no cumplido.
   - Hallazgos adicionales (problemas no previstos en los criterios).
   - Un veredicto: aprueba o solicita cambios.
4. **Si el subagente solicita cambios**, el agente ejecutor corrige y repite desde el paso 1.
5. **Si el subagente aprueba**, se presenta el informe al usuario junto con un resumen del trabajo.
6. **El usuario aprueba o solicita cambios.** Si solicita cambios, el agente ejecutor corrige y repite desde el paso 1.
7. **Si el usuario aprueba**, se marca la tarea como `[x]` y se commitea.

### Cambios en la plantilla `task.txt`

Añadir el estado `[r]` a la lista de estados:

```
[ ] Pendiente | [~] En progreso | [r] En revisión | [x] Completada | [!] Bloqueada
```

Añadir un campo opcional «Revisión» al final de la plantilla:

```markdown
## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario: [fecha] — [Aprueba | Solicita cambios]
```

### Cambios en `TODO.txt`

Añadir `[r]` a la lista de estados en el comentario del encabezado:

```
estado: [ ] pendiente, [~] en progreso, [r] en revisión, [x] completada, [!] bloqueada
```

### Cambios en el skill `ejecutar-tareas`

Añadir el paso de revisión entre el paso 8 (marcar completada) y el paso 9 (commitear) del procedimiento actual:

> 8. Al terminar la tarea, marcarla como en revisión `[r]` en `TODO.txt` y en el campo «Estado» del archivo de tarea.
> 9. Lanzar un subagente independiente para revisión técnica. El subagente recibe el diff y el archivo de tarea, sin el razonamiento del ejecutor. Si solicita cambios, corregir y repetir. Si aprueba, presentar al usuario.
> 10. Si el usuario aprueba, marcar la tarea como completada `[x]`.
> 11. Commitear la tarea completada.

### Cuándo no aplicar revisión dual

Para tareas triviales que no modifican archivos del proyecto (p. ej. corregir un typo en un documento), la revisión dual puede omitirse a discreción del agente ejecutor, que lo indica en el informe de finalización. Esto evita burocracia innecesaria sin comprometer la calidad de los cambios sustanciales.

## Referencias

- Independent-checker pattern — dev.to/ccesteffan
- Adversarial code review — augmentcode.com/guides/adversarial-code-review
- Sub-agents as quality gates — shuji-bonji.github.io/ai-agent-architecture
- Writer/reviewer pattern — claudecodesessions.com
- Human-in-the-loop code review — onout.org/vibers/blog
