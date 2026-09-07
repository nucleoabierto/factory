# D002: Tareas individuales en docs/tasks/

## Estado

Aceptada

## Contexto

Inicialmente `TODO.txt` contenía las descripciones completas de las tareas inline, una por línea. Con 10 tareas, las descripciones eran largas y difíciles de mantener: no cabía el objetivo, las dependencias, el resultado esperado y los criterios de calidad en una sola línea.

## Decisión

Mantenemos una tarea por archivo bajo `docs/tasks/NNN-slug.md`, con `TODO.txt` como índice que referencia cada archivo. Cada archivo de tarea sigue una plantilla con objetivo, dependencias, entrada, resultado esperado, criterios de calidad, procedimiento y notas.

## Justificación

Separar el índice del detalle permite que `TODO.txt` sea escaneable y que cada tarea tenga espacio para toda la información necesaria para ejecutarla y evaluar su resultado. La plantilla asegura que las tareas son comparables y que el agente tiene todo lo que necesita sin información externa no referenciada. La numeración secuencial facilita el ordenamiento y la referencia cruzada.
