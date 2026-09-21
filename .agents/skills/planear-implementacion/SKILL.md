---
name: planear-implementacion
description: >
  Produce el plan de una tarea de desarrollo antes de escribir
  código: entendimiento del subsistema afectado, plan técnico
  conceptual con storytelling y suite de pruebas esperada guiada
  internamente por ZOMBIE.
  Usar al ejecutar una tarea de tipo desarrollo, invocado por el
  skill especialista del sub-flujo de desarrollo o directamente,
  cuando hay que planear la implementación antes de codificar.
  Sinónimos: planear implementación, plan técnico de la tarea,
  planeación de desarrollo, plan antes del código.
---

# Planear implementación

Instrucciones para que un agente produzca el plan de una tarea de desarrollo antes de escribir código. El skill entiende primero el subsistema afectado, redacta después un plan técnico a nivel conceptual en el que cada acción explica cómo aporta al desarrollo, y lo completa con la suite de pruebas esperada: expectativas sobre el comportamiento del sistema, trazables a casos de uso. Ambos artefactos se agregan al archivo de la tarea, manteniendo un solo artefacto por tarea.

## Cuándo usar

- Al ejecutar una tarea de tipo desarrollo, antes de escribir código: invocado por el skill especialista que orquesta el sub-flujo de desarrollo dentro de la tarea.
- Cuando el usuario pida planear la implementación de una tarea concreta, fuera del ciclo de ejecución.

## Cuándo no usar

- Para tareas que no modifican código (investigación, documentación, mantenimiento de procesos): se ejecutan con el comportamiento general de `ejecutar-tareas`.
- Para producir la guía de arquitectura de un conjunto de tareas: eso corresponde a `planificar`, en la épica.
- Para ejecutar el plan ya redactado: eso corresponde a `ejecutar-implementacion`.

## Entrada

- El archivo de la tarea de desarrollo a planear (`docs/tasks/NNN-slug.md`), con su objetivo y criterios de calidad.
- El plan técnico de la épica que agrupa la tarea, si existe, como guía de arquitectura.
- El código base del subsistema afectado.

## Salida

- Dos secciones agregadas al archivo de la tarea, antes de la sección Revisión:
  - `## Plan técnico`: el entendimiento del subsistema y la lista de acciones a nivel conceptual, cada una con la explicación de cómo aporta al desarrollo.
  - `## Suite de pruebas esperada`: las expectativas sobre lo que el sistema hace, cada una trazable a un caso de uso.

## Principios rectores

1. **Entender antes de planear:** el agente lee y resume el subsistema afectado antes de escribir el plan, para exponer malentendidos antes de que se conviertan en plan.
2. **La épica guía, la tarea detalla:** el plan técnico de la épica fija los patrones y las decisiones transversales; el plan de la tarea los sigue y los baja a las acciones de esa pieza. Si la tarea contradice la guía, se plantea la discrepancia al usuario en lugar de desviarse en silencio.
3. **Nivel conceptual como norma:** las acciones se expresan como operaciones sobre el diseño (crear una clase, agregar un método, dividir un módulo; la lista es abierta, no exhaustiva), sin rutas ni fragmentos de código. Se admiten referencias a archivos concretos solo cuando el detalle previene un error costoso.
4. **Storytelling técnico:** cada acción declara cómo aporta al desarrollo de la tarea; una acción sin justificación es ruido en el plan.
5. **Las pruebas describen el qué, no el cómo:** la suite expresa expectativas sobre el comportamiento del sistema ante estímulos, ancladas en casos de uso, no en la implementación. Una prueba sin caso de uso asociado es de baja calidad.
6. **ZOMBIE es guía de generación, no taxonomía:** el acrónimo (*zero, one, many, boundary, interface, exception*) sirve para rebanar el problema y descubrir casos, de forma parcialmente secuencial; la suite resultante no declara su relación con ZOMBIE ni con la implementación.

## Procedimiento

### 1. Entender el subsistema

1. **Leer el archivo de la tarea** para fijar objetivo, alcance y criterios de calidad.
2. **Leer el plan técnico de la épica**, si la tarea figura bajo un encabezado con comentario `<!-- épica: ... -->` en `TODO.txt` o referencia una épica; esa guía de arquitectura es el marco del plan.
3. **Explorar el subsistema afectado:** leer los archivos que la tarea tocará y los archivos hermanos o de funcionalidad similar, hasta poder resumir estructura, patrones vigentes y puntos de extensión.
4. **Redactar el resumen del subsistema** en dos o tres frases: qué hace, qué patrón sigue y dónde encaja el cambio. Si la lectura revela un malentendido en la propia tarea, plantearlo al usuario antes de seguir.

### 2. Redactar el plan técnico

5. **Listar las acciones a nivel conceptual** que realizan el objetivo de la tarea, en orden de implementación cuando el orden importe. Cada acción va acompañada de su explicación: cómo aporta al desarrollo.
6. **Añadir detalle solo donde previene errores costosos:** una referencia a archivo o una decisión de implementación concreta se incluye cuando omitirla haría probable un error; no porque el plan parezca más minucioso.
7. **Verificar la guía de la épica:** cada acción del plan sigue los patrones y decisiones transversales que la épica declara; si el plan necesita apartarse, se explicita la discrepancia al usuario.

### 3. Redactar la suite de pruebas esperada

8. **Extraer los casos de uso** del objetivo y los criterios de calidad de la tarea.
9. **Generar casos con ZOMBIE como guía interna:** para cada comportamiento, recorrer el eje de progresión (*zero, one, many*) y el de bordes (*boundary, interface, exception*), empezando por el caso más simple y actualizando la lista de forma iterativa.
10. **Expresar cada caso como expectativa de comportamiento:** qué hace el sistema ante qué estímulo, con el resultado observable; sin nombrar funciones, clases ni detalles internos, y sin declarar su relación con ZOMBIE.
11. **Trazar cada prueba a su caso de uso:** cada expectativa indica de qué caso de uso deriva; si una prueba no encuentra anclaje, se descarta o se plantea el caso de uso que falta.

### 4. Puerta humana

12. **Aplicar revisión de redacción y pulido mecánico en modo preventivo.** Si el arnés lo permite, invocar `revisar-redaccion` y, con su salida, `pulir-escritura`; de lo contrario, realizar el equivalente manualmente.
13. **Presentar el plan y la suite al usuario** para aprobación. Si solicita cambios, ajustar y repetir la presentación. Si lo rechaza, no escribir nada en el archivo de la tarea y terminar informando del rechazo.

### 5. Materializar el plan

14. **Agregar las dos secciones al archivo de la tarea**, antes de la sección Revisión: `## Plan técnico` con el resumen del subsistema y las acciones justificadas, y `## Suite de pruebas esperada` con las expectativas trazadas.
15. **Informar al usuario** de que el plan quedó en el archivo de la tarea, listo para la fase de ejecución.

## Finalización

El skill ha terminado cuando:

- El subsistema afectado quedó resumido y los malentendidos se resolvieron con el usuario.
- El usuario aprobó el plan técnico y la suite.
- El archivo de la tarea contiene las secciones `## Plan técnico` y `## Suite de pruebas esperada`, o se informó del rechazo sin escribir nada.

## Referencias

- `docs/research/2026-09-flujo-desarrollo.md` — Fases de planeación técnica y de testing, con los ajustes aprobados (entendimiento previo, granularidad flexible).
- `docs/decisions/D020-flujo-desarrollo-skill-especialista.md` — Encapsulación del flujo de desarrollo en skills especialistas.
- James Grenning, «TDD Guided by ZOMBIES» — blog.wingman-sw.com/tdd-guided-by-zombies — Guía de generación de casos de prueba.
