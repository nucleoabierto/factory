# D012: Formato y ubicación de las propuestas

## Estado

Aceptada

## Contexto

El flujo de idea a tarea necesita un contenedor que agrupe el problema, la forma de solución y los borradores de tarea antes de su aprobación. Los patrones externos (Chorus, AgentBoard) usan un contenedor de propuesta con borradores y una puerta de aprobación. El proyecto prioriza los archivos de texto en el repositorio y el principio bootstrap.

## Decisión

Adoptamos `docs/proposals/NNN-slug/` como directorio de propuesta, con `propuesta.md` —problema, oportunidad, forma de solución, alternativas, fuera de alcance, investigaciones e índice de borradores— y borradores independientes `MM-titulo.md` con los campos de la plantilla de tarea definitiva, sin Estado ni Revisión. La numeración de propuestas es independiente de la de las tareas y se distingue por el directorio.

## Justificación

El directorio agrupa la propuesta y sus borradores en un contenedor versionable e inspeccionable. `propuesta.md` se mantiene acotado al enmarcado del problema y la solución; el detalle de cada tarea vive en su propio borrador, lo que permite crearlos y iterarlos de forma progresiva, uno a uno. Los patrones externos confirman este enfoque. La alternativa de un único archivo con todo se descarta porque crece en tamaño y dificulta la iteración independiente de cada borrador.

## Referencias

- Investigación «Flujo 1 completo: propuesta, borradores y procedimiento» — `docs/research/2026-09-flujo-1-propuesta-borradores.md`
- D002, «Tareas individuales en docs/tasks/» — `docs/decisions/D002-tareas-individuales-en-docs-tasks.md`
