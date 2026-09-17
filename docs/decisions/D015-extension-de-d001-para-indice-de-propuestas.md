# D015: Extensión de D001 para índice de propuestas en revisión

## Estado

Aceptada

## Contexto

D001 estableció `TODO.txt` como índice único de tareas. El flujo de idea a tarea introduce propuestas en revisión que también necesitan ser visibles en `TODO.txt` para que el agente las detecte al iniciar una sesión. El principio subyacente de D001 —un archivo de texto plano como punto de entrada único— no cambia; se amplía lo que indexa.

## Decisión

Extendemos D001: `TODO.txt` pasa de índice único de tareas a índice de tareas y propuestas en revisión. D001 no se sustituye: se amplía su alcance. La sección de propuestas usa el marcador `[p]` para distinguirse de las tareas.

## Justificación

Extender D001 preserva la decisión original y su trazabilidad, y refleja el alcance ampliado sin invalidar el principio de índice único en archivo de texto plano. La alternativa de sustituir D001 por una nueva decisión se descarta porque el principio no cambia: sigue siendo un único archivo de texto plano como punto de entrada; solo se amplía lo que indexa.

## Referencias

- D001, «TODO.txt como índice único de tareas» — `docs/decisions/D001-todo-txt-como-indice-unico.md`
- D013, «Mecanismo de borradores y su reflejo en TODO.txt» — `docs/decisions/D013-mecanismo-borradores-reflejo-todo.md`
- Investigación «Flujo 1 completo: propuesta, borradores y procedimiento» — `docs/research/2026-09-flujo-1-propuesta-borradores.md`
