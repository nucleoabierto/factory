# D017: TODO.txt como índice de trabajo activo

## Estado

Aceptada

## Contexto

Tras cinco hitos completados, `TODO.txt` acumula decenas de líneas `[x]` que ya no informan de trabajo pendiente y diluyen lo activo. La trazabilidad de lo completado no depende del índice: cada tarea conserva su Estado y su Revisión en `docs/tasks/`, y el historial de git preserva cada línea que haya tenido `TODO.txt`. Las alternativas eran: mantener las líneas completadas indefinidamente, archivarlas en un archivo separado, o eliminarlas del índice.

## Decisión

Usamos `TODO.txt` como índice de solo trabajo activo: tareas pendientes, en progreso, en revisión o bloqueadas, y propuestas `[p]` en revisión. Cuando todas las tareas de un hito quedan completadas, eliminamos el encabezado del hito y sus líneas del índice, sin crear ningún archivo de archivo. Revisamos la limpieza cuando el archivo supera las 100 líneas y podemos ejecutarla on demand en cualquier momento anterior.

## Justificación

Eliminar es preferible a archivar porque un archivo de archivo crecería sin fin y nadie lo consultaría: la misma información ya está en el historial de git y en el campo Estado de cada tarea, con mejor trazabilidad. El umbral de 100 líneas convierte la limpieza en un proceso acotado y revisable, no en una decisión que depende de la memoria. La alternativa de conservar lo completado se descarta porque el índice perdería su función: distinguir de un vistazo qué queda por hacer. Esta decisión extiende D001 (índice único) y D015 (índice de tareas y propuestas): no cambia qué archivo es el índice, sino qué indexa. D008 se mantiene: los hitos siguen agrupando el trabajo activo; lo que cambia es que desaparecen al completarse.

## Referencias

- D001, «TODO.txt como índice único de tareas» — `docs/decisions/D001-todo-txt-como-indice-unico.md`
- D008, «Organización por hitos en TODO.txt» — `docs/decisions/D008-organizacion-por-hitos-en-todo.md`
- D015, «Extensión de D001 para índice de propuestas en revisión» — `docs/decisions/D015-extension-de-d001-para-indice-de-propuestas.md`
- Tarea 046 — `docs/tasks/046-registrar-decision-limpieza-todo.md`
- Tarea 048, ejecutora de la primera limpieza — `docs/tasks/048-limpiar-hitos-completados-todo.md`
