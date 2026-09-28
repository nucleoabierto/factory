# Separar el flujo de tareas en «planear» y «ejecutar»

## Estado

[ ] Pendiente | [~] En progreso | [r] En revisión | [x] **Completada** | [!] Bloqueada

## Tipo

desarrollo

## Objetivo

Dividir el trabajo de desarrollo de una tarea en dos flujos invocables de forma independiente: uno de planeación —toma la tarea y recorre el pipeline hasta dejar plan técnico y suite aprobados— y uno de ejecución —toma una tarea ya planeada y completa el desarrollo—. Hoy `desarrollo` ejecuta ambos pasos en la misma sesión, lo que impide planear varias tareas en paralelo y ejecutarlas después, ni construir planes incrementales sobre planes previos aún no ejecutados.

## Dependencias

- Ninguna

## Entrada

- `.agents/skills/desarrollo/SKILL.md` como pipeline actual a dividir.
- `recopilar-contexto`, `evaluar-conectividad`, `planear-implementacion` y `ejecutar-implementacion` como capacidades a repartir entre los dos flujos.
- `.agents/skills/ejecutar-tareas/SKILL.md` y su «Enrutado por tipo», que hoy enruta `desarrollo` y `mantenimiento (refactoring)` al pipeline completo.
- `docs/decisions/D020-flujo-desarrollo-skill-especialista.md` como decisión a revisar o extender.

## Resultado esperado

- Un flujo de planeación de tarea (skill nuevo, p. ej. `planear-tarea`, o extensión de `desarrollo` con modo planeación) que ejecute recopilación de contexto, evaluación de conectividad y planeación de implementación con su puerta humana, y se detenga dejando `## Contexto`, `## Conectividad`, `## Plan técnico` y `## Suite de pruebas esperada` aprobados en el archivo de la tarea.
- Un flujo de ejecución (p. ej. `desarrollar-tarea` o modo ejecución) que tome una tarea con plan aprobado y complete `ejecutar-implementacion` con su registro de desviaciones.
- Soporte para planeación incremental: cuando una tarea depende de otra aún no ejecutada, el flujo de planeación lee el plan aprobado de la dependencia como base —asumiendo que el trabajo estará completo— en lugar de bloquearse esperando la ejecución.
- `ejecutar-tareas` actualizado: el enrutado por tipo y el ciclo reflejan los dos flujos, de modo que una tarea sin plan pasa por planeación y una tarea con plan aprobado va directa a ejecución, sin replanificar.
- La decisión de diseño correspondiente registrada con `decisiones-diseno` (extensión o sustitución de D020) y los `README`/índices de skills actualizados.

## Criterios de calidad

- Los dos flujos son invocables por separado y `ejecutar-tareas` distingue el estado de planeación de una tarea para elegir el punto de entrada correcto.
- Una tarea planeada en una sesión puede ejecutarse en otra sin repetir recopilación de contexto, conectividad ni planeación: el archivo de la tarea es la fuente de verdad del avance.
- El flujo de planeación declara explícitamente cómo trata las dependencias: planeación en paralelo si no hay dependencia, planeación incremental sobre el plan de la dependencia si la hay.
- `desarrollo` sigue existiendo como orquestador íntegro (planear + ejecutar en una sesión) o queda sustituido de forma coherente con los flujos nuevos, sin caminos huérfanos.
- Se preserva la revisión dual y el commit por tarea del ciclo general.

## Procedimiento sugerido

1. Leer `desarrollo`, `planear-implementacion`, `ejecutar-implementacion`, `recopilar-contexto` y `evaluar-conectividad` para fijar el corte exacto del pipeline.
2. Decidir la forma: dos skills nuevos frente a `desarrollo` con dos modos; documentar la elección.
3. Definir el contrato de estado en el archivo de la tarea: qué secciones marcan «planeada» y cómo el flujo de ejecución las valida antes de empezar.
4. Escribir o adaptar los skills, actualizar «Enrutado por tipo» de `ejecutar-tareas` y la descripción de `desarrollo` si permanece.
5. Registrar la decisión de diseño y actualizar `README.md` si lista los flujos.

## Contexto

- **Archivos similares:**
  - `.agents/skills/desarrollo/SKILL.md` — mini-orquestador actual del sub-flujo: contexto → conectividad → plan (puerta humana) → ejecución → devolución. Es el pipeline a dividir.
  - `.agents/skills/idea-a-tarea/SKILL.md` — precedente de orquestador que delega en capacidades y se detiene en una puerta asíncrona (la `[p]`), análogo a la parada tras la planeación.
  - `.agents/skills/recopilar-contexto/SKILL.md`, `evaluar-conectividad`, `planear-implementacion`, `ejecutar-implementacion` — las cuatro capacidades a repartir; sus secciones en el archivo de la tarea (`## Contexto`, `## Conectividad`, `## Plan técnico`, `## Suite de pruebas esperada`, `## Desviaciones del plan`) ya son el contrato de estado.
- **Patrones:**
  - El archivo de la tarea es la fuente de verdad del avance: cada capacidad registra su sección; una ejecución interrumpida se retoma desde las secciones existentes, no de memoria.
  - Las puertas humanas pertenecen al usuario: aprobación del plan y confirmación de desviaciones mayores.
  - El enrutado por tipo de `ejecutar-tareas` delega por el campo «Tipo»; el ejecutor no conoce las fases del dominio.
  - Idempotencia ya declarada en las capacidades: `recopilar-contexto` enriquece sin rehacer; `desarrollo` no replanifica si plan y suite ya están aprobados.
- **Lecciones:**
  - `contratos-de-skills` — descriptions a nivel de resultado; reglas inline.
  - `consistencia-de-formatos` — las secciones nuevas en el archivo de tarea mantienen la convención.
  - `flexibilidad-en-procesos` — el criterio de «planeada» se declara por secciones presentes y aprobadas, lista abierta.
  - `diseno-de-artefactos` — la forma elegida (skills nuevos o modos) se registra como decisión de esta tarea.
- **Decisiones:**
  - D020 — el flujo de desarrollo vive en un skill especialista enrutado por tipo; esta tarea lo extiende o sustituye.
  - D011 — pospone la separación del orquestador de entrega de código; no afecta al corte planear/ejecutar dentro de la tarea.
  - D028 — la suite esperada declara letra ZOMBIE por expectativa.
  - D003/D004/D005 — estándar de skills si se crean nuevos.

## Conectividad

- **Veredicto:** conectada.
- **Justificación:** el pipeline a dividir existe completo (`desarrollo` + cuatro capacidades); el contrato de estado que la separación necesita ya está materializado como secciones del archivo de la tarea; `ejecutar-tareas` ya tiene el punto de enrutado por tipo donde declarar la bifurcación. Nada de lo asumido falta.

## Plan técnico

Subsistema: `desarrollo` es hoy un mini-orquestador que recorre contexto → conectividad → plan → ejecución en una sesión. El contrato de estado ya existe como secciones del archivo de la tarea; la división es un corte del pipeline en dos skills y el traslado de la distinción de estado al enrutado de `ejecutar-tareas`.

Forma: dos skills nuevos —`planear-tarea` y `desarrollar-tarea`— y `desarrollo` se elimina, sustituido por el enrutado con estado. Alternativa descartada: conservar `desarrollo` como compositor íntegro —dejaba un nivel de orquestación flotante que no añadía decisión propia.

- [x] Crear `.agents/skills/planear-tarea/SKILL.md` con la mitad de planeación del pipeline
  - Aporta: orquesta recopilar-contexto → evaluar-conectividad → planear-implementacion con su puerta humana y se detiene con las secciones aprobadas en el archivo de la tarea; declara la planeación incremental —si la tarea depende de otra aún no ejecutada, el plan aprobado de la dependencia se lee como base, asumiéndolo completo.
  - Contexto: hereda de `desarrollo` los pasos 3–5 y la regla de no replanificar cuando ya hay plan aprobado; si la conectividad es desconectada, informa al ejecutor para el marcado `[!]`.
- [x] Crear `.agents/skills/desarrollar-tarea/SKILL.md` con la mitad de ejecución
  - Aporta: valida la entrada —`## Plan técnico` y `## Suite de pruebas esperada` presentes y aprobados—, deriva a `planear-tarea` si faltan y ejecuta `ejecutar-implementacion` con su registro de desviaciones; devuelve el diff al ejecutor general.
- [x] Eliminar `.agents/skills/desarrollo/` y trasladar su contenido residual a los dos flujos
  - Aporta: no queda skill flotante; la lista de control de sesión y la coordinación del pipeline se reparten entre los dos skills nuevos y `ejecutar-tareas`.
  - Contexto: revisar referencias a `desarrollo` en otros skills (`ejecutar-tareas`, `README.md`, domain docs) y actualizarlas.
- [x] Actualizar «Enrutado por tipo» y el paso 5 de `ejecutar-tareas`
  - Aporta: el ejecutor distingue el estado de planeación por las secciones del archivo de la tarea —sin plan aprobado → `planear-tarea`; si el plan queda aprobado, la misma iteración continúa con `desarrollar-tarea`; con plan aprobado → `desarrollar-tarea` directo—. Es el mínimo de estado de dominio que el ejecutor asume, documentado en la decisión.
- [x] Actualizar `README.md` (tabla de skills) y `docs/domains/003-subflujo-desarrollo.md`
  - Aporta: índice y dominio reflejan los dos flujos y la desaparición de `desarrollo`.
- [x] Registrar la decisión que sustituye a D020 con `decisiones-diseno`
  - Aporta: la división del flujo, el contrato de estado «planeada» y la asunción mínima del ejecutor quedan trazadas.
- [x] Pasar `revisar-redaccion` y `pulir-escritura` en modo preventivo sobre los SKILL.md nuevos
  - Aporta: cumple D006.

## Suite de pruebas esperada

- `planear-tarea` sobre una tarea sin secciones produce `## Contexto`, `## Conectividad`, `## Plan técnico` y `## Suite de pruebas esperada` aprobados, y se detiene (O).
- `desarrollar-tarea` sobre una tarea con plan aprobado ejecuta sin repetir contexto ni planeación (O).
- `desarrollar-tarea` sobre una tarea sin plan no ejecuta: deriva a `planear-tarea` (B).
- `planear-tarea` sobre una tarea que depende de otra planeada pero no ejecutada planea sobre el plan de la dependencia como base (I).
- `ejecutar-tareas` enruta una tarea de desarrollo sin plan a `planear-tarea` y una con plan aprobado a `desarrollar-tarea` (B).
- `desarrollo` ya no existe y ninguna referencia queda huérfana (regresión).
- La revisión dual y el commit por tarea del ciclo general se preservan (regresión).

## Notas

- Motivación: trabajar en paralelo sobre varias tareas —múltiples sesiones de planeación sin dependencia, o planes incrementales encadenados cuando la hay, donde cada plan asume el plan anterior como base sólida aunque aún no se haya ejecutado.

## Revisión

- Subagente: 2026-09-28 — Solicita cambios (menores): checklist del plan sin marcar `[x]`; referencias a D020 en `planear-implementacion`, `ejecutar-implementacion` y `revisar-implementacion` actualizadas a D031; dominio `001-ciclo-de-tareas.md` actualizado a D031. Corregidos.
- Usuario: 2026-09-28 — Aprueba
