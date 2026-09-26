# Listas

Agrupar las tareas en listas, elegir sobre cuál se trabaja y mover tareas entre ellas. Los conceptos —lista, entrada permanente, lista activa— y sus invariantes están en el documento de dominio `docs/domains/001-lista-de-tareas.md`; aquí se describe el comportamiento observable.

## Escenarios

Cada escenario está verificado por la suite de pruebas del proyecto (`tests.html`); se cita el módulo y el título de la prueba que lo cubre.

### La Entrada

- **La aplicación vacía siempre tiene la lista Entrada.** — módulo `lists and migration`, «an empty app always holds the permanent inbox list»
- **Las tareas creadas sin más contexto pertenecen a la Entrada.** — módulo `lists and migration`, «created tasks belong to the inbox list»
- **La Entrada no puede renombrarse ni eliminarse; sus acciones aparecen desactivadas.** — módulos `list management` («the inbox cannot be renamed or emptied», «the inbox cannot be deleted», «rename and delete buttons are disabled on the inbox»)

### Crear, renombrar y eliminar

- **Crear una lista la añade, la convierte en activa y la persiste.** — módulo `list management`, «creating a list adds it, selects it and persists» y «the add-list button creates the prompted list»
- **Un nombre vacío o de solo espacios no crea nada.** — módulo `list management`, «empty or whitespace-only names create no list»
- **Los nombres duplicados se rechazan sin distinguir mayúsculas.** — módulo `list management`, «duplicate names are rejected case-insensitively»
- **Renombrar actualiza la lista y lo persiste.** — módulo `list management`, «renaming a list updates it and persists»
- **Eliminar una lista reasigna sus tareas a la Entrada: nada se pierde.** — módulo `list management`, «deleting a list reassigns its tasks to the inbox»

### Lista activa

- **Cambiar de lista muestra solo sus tareas y su contador.** — módulo `active list navigation`, «switching lists shows exactly its tasks» y «the counter counts only the active list»
- **Los filtros operan dentro de la lista activa.** — módulo `active list navigation`, «filters operate within the active list»
- **Las tareas nuevas caen en la lista activa.** — módulo `active list navigation`, «new tasks land in the active list»
- **El selector enumera las listas vivas y marca la activa; cambiarlo cambia de lista.** — módulo `active list navigation`, «the selector lists all lists and marks the active» y «changing the selector switches the active list»
- **La lista activa persiste entre visitas; un valor guardado inválido o archivado vuelve a la Entrada.** — módulo `active list navigation`, «the active list persists across reloads» y «a missing or stale stored list falls back to inbox»
- **Cambiar de lista cancela la edición en curso.** — módulo `active list navigation`, «switching lists cancels the edit in progress»
- **Limpiar completadas solo vacía la lista activa en la vista principal.** En la vista «hoy» el alcance es transversal: ver [Vista «hoy»](004-vista-hoy.md). — módulo `active list navigation`, «clear completed empties only the active list»

### Mover tareas

- **Mover una tarea la traslada a la lista de destino.** — módulo `list management`, «moving a task relocates it to the target list»
- **El desplegable de mover ofrece las demás listas vivas.** — módulo `list management`, «move select in a task row lists the other lists»

### Migración de datos antiguos

- **Los datos del formato antiguo (array plano) migran a la Entrada y el siguiente guardado usa el formato actual.** — módulo `lists and migration`, «legacy flat-array data migrates into the inbox»
- **El formato actual restaura listas y pertenencia.** — módulo `lists and migration`, «the new format restores lists and membership»
- **Las tareas que apuntan a una lista inexistente no cargan.** — módulo `lists and migration`, «tasks pointing to a missing list do not load»
- **Los identificadores de lista duplicados en los datos colapsan a uno.** — módulo `lists and migration`, «duplicate list ids in storage collapse to one»
- **Datos sin Entrada la recrean; datos corruptos producen un estado limpio con la Entrada.** — módulos `lists and migration` («loading data without the inbox recreates it», «corrupted data yields empty state with the inbox») y `create and list` («load tolerates missing key or corrupted data», «load keeps only items with a valid task shape»)
