# D001: TODO.txt como índice único de tareas

## Estado

Aceptada

## Contexto

El proyecto necesita un mecanismo para seguir el estado de las tareas a lo largo del tiempo. Las opciones van desde un gestor externo (Linear, GitHub Issues) hasta un archivo de texto plano en el repositorio. El proyecto prioriza la simplicidad, la trazabilidad en git y la independencia de herramientas externas.

## Decisión

Mantenemos `TODO.txt` como índice único de tareas. Cada tarea se documenta en un archivo individual bajo `docs/tasks/` y se referencia desde `TODO.txt` con una línea por tarea.

## Justificación

Un archivo de texto plano en el repositorio es versionable, inspeccionable sin herramientas externas y suficiente para el volumen actual. Un gestor externo añadiría una dependencia y una fuente de verdad paralela. El formato de una línea por tarea con estado entre corchetes es legible y procesable por el skill `ejecutar-tareas`.
