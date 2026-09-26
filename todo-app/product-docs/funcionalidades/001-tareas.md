# Tareas

Crear, completar, editar, borrar, filtrar y limpiar tareas dentro de la lista activa. Los conceptos —tarea, pendiente, filtro— y las invariantes del modelo están en el documento de dominio `docs/domains/001-lista-de-tareas.md`; aquí se describe el comportamiento observable.

## Escenarios

Cada escenario está verificado por la suite de pruebas del proyecto (`tests.html`); se cita el módulo y el título de la prueba que lo cubre.

### Capturar

- **Una tarea nueva aparece como pendiente en la lista activa.** — módulo `create and list`, «creating a task adds it to the state and the list»
- **Un texto vacío o de solo espacios no crea nada.** — módulo `create and list`, «empty or whitespace-only texts create no task»
- **Enter en el campo de captura crea la tarea y deja el campo libre.** — módulo `create and list`, «Enter in the input creates the task and clears it»
- **El contador muestra el número de pendientes.** — módulo `create and list`, «the counter reflects pending tasks after several adds»

### Completar, editar y borrar

- **Marcar una tarea la completa y baja el contador; desmarcarla la reabre.** — módulo `complete, edit and delete`, «toggling a task marks it done and lowers the counter»
- **Editar cambia el texto en la vista y en lo guardado.** — módulo `complete, edit and delete`, «editing a task updates state, view and storage»
- **Confirmar una edición vacía borra la tarea.** — módulo `complete, edit and delete`, «confirming an empty edit deletes the task»
- **Escape cancela la edición y conserva el texto original.** — módulo `complete, edit and delete`, «Escape cancels the edit and keeps the original text»
- **Borrar elimina la tarea de la vista y de lo guardado.** — módulo `complete, edit and delete`, «deleting a task removes it from state, view and storage»
- **Completar, editar y borrar sobreviven a la recarga.** — módulo `complete, edit and delete`, «toggling, editing and deleting persist across reloads»

### Filtrar y limpiar

- **Cada filtro muestra exactamente su subconjunto: todas, pendientes o completadas.** — módulo `filters and clear completed`, «each filter shows exactly its subset»
- **El enlace del filtro activo queda señalado.** — módulo `filters and clear completed`, «the active filter link carries the selected class»
- **Limpiar descarta las completadas y conserva las pendientes, también tras recargar.** — módulo `filters and clear completed`, «clearing removes all done tasks and keeps the pending»
- **Las operaciones siguen funcionando con un filtro activo.** — módulo `filters and clear completed`, «operations keep working under an active filter»
- **El contador cuenta los pendientes de la lista, no solo los visibles.** — módulo `filters and clear completed`, «the counter totals pending, not visible tasks»
- **El filtro elegido persiste; un valor guardado inválido vuelve a «todas».** — módulo `filters and clear completed`, «the filter persists and tolerates corrupted values»

### Fechas

- **Cada tarea ofrece un campo de día para asignarle fecha; la elegida queda en el estado y persiste al recargar.** — módulo `task dates`, «the date control assigns and persists the date»
- **El campo permite cambiar la fecha, y vaciarlo la quita devolviendo el ítem a su aspecto sin fecha.** — módulo `task dates`, «the date control changes and removes the date»
- **La fecha se distingue a simple vista según su situación: vencida, de hoy o futura.** — módulo `task dates`, «items show their date status with a class»
- **Una tarea sin fecha no lleva distinción temporal alguna.** — módulo `task dates`, «undated items carry no temporal class»
- **La fecha convive con la edición de texto por doble clic.** — módulo `task dates`, «text editing still works alongside the date control»
