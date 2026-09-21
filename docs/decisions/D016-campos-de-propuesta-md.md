# D016: Campos de propuesta.md

## Estado

Aceptada

## Contexto

D012 definió `propuesta.md` con los campos problema, oportunidad, forma de solución, alternativas, fuera de alcance, investigaciones e índice de borradores. Al construir la capacidad de refinamiento con borradores se descubrieron dos carencias: la propuesta no explicaba la solución con el nivel necesario para derivar los borradores —la forma de solución es deliberadamente de alto nivel—, y la sección «Origen» era redundante, porque las propuestas siempre parten de solicitudes y el contexto ya vive en el problema y la oportunidad.

## Decisión

Extendemos D012 con dos cambios al formato de `propuesta.md`: se añade la sección «Solución», que describe qué se hace concretamente —componentes o funcionalidades nuevos que se crean o cambian y cómo se comportan, sin código ni procesos detallados—, y se elimina la sección «Origen». Además, las dependencias de un borrador pueden apuntar a tareas existentes por su número, no solo a borradores de la misma propuesta. El resto del formato se mantiene.

## Justificación

Sin la sección «Solución», el refinamiento tendría que inventar la solución concreta mientras redacta los borradores, y la propuesta no serviría como unidad de revisión: el usuario aprobaría borradores sin haber visto la solución que implementan. La forma de solución dice qué tipo de cambio es; la solución dice qué se hará; los borradores dicen cómo ejecutarlo. «Origen» se elimina porque duplica contexto que ya está en el problema y la oportunidad. Las dependencias a tareas existentes se permiten porque una propuesta puede producir tareas que dependen de trabajo ya registrado, como ocurre en el sistema de tareas actual.

## Referencias

- D012, «Formato y ubicación de las propuestas» — `docs/decisions/D012-formato-y-ubicacion-de-las-propuestas.md`
- Investigación «Flujo 1 completo: propuesta, borradores y procedimiento» — `docs/research/2026-09-flujo-1-propuesta-borradores.md`
- Tarea 038 — `docs/tasks/038-construir-refinamiento-borradores.md`
