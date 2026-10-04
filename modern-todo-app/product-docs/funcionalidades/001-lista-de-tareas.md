# Lista de tareas

Capturar tareas nuevas, completarlas y reactivarlas, editarlas inline, eliminarlas y marcar todas a la vez, con la lista visible solo cuando hay contenido. Los conceptos —tarea, pendiente— y las invariantes del modelo están en el documento de dominio `docs/domains/001-lista-de-tareas.md`; aquí se describe el comportamiento observable.

## Escenarios

Cada escenario está verificado por la suite de pruebas del proyecto (`src/components/App.test.tsx` y `src/state/TodoProvider.test.tsx`); se cita el módulo y el título de la prueba que lo cubre.

### Capturar

- **Al abrir la aplicación, el campo de captura tiene el foco.** — módulo `App`, «focuses the capture field on load»
- **Escribir un título y pulsar Enter crea el ítem y deja el campo libre para la siguiente.** — módulo `App`, «creates a task on Enter and clears the field for the next one»
- **Los espacios alrededor del título se recortan al guardarse.** — módulo `App`, «captures titles trimmed»
- **Un texto vacío o de solo espacios no crea nada.** — módulo `App`, «rejects the empty capture %j»
- **Las capturas se muestran en orden de inserción.** — módulo `App`, «lists captured tasks in insertion order»

### Completar y eliminar

- **Marcar la casilla de un ítem lo completa —tachado en el título— y desmarcarla lo reactiva.** — módulo `App`, «marks an item completed and reactivates it»
- **En una lista de varios ítems, cada casilla y cada botón de eliminar actúan solo sobre su ítem.** — módulo `App`, «acts on its own item in a list of many»
- **Eliminar un ítem lo quita de la lista; al quedar cero, la pantalla vuelve a su estado vacío.** — módulo `App`, «removes an item and restores the empty screen when the last one goes»

### Marcar todas

- **La casilla «Todas» completa todos los ítems y queda marcada.** — módulo `App`, «completes every item when marking all»
- **Con todas completadas, desmarcarla las reactiva.** — módulo `App`, «reactivates every item when unmarking all»
- **La casilla refleja el estado agregado: se desmarca sola al reactivar cualquier ítem.** — módulo `App`, «reflects the aggregate state when an item is reactivated»

### Editar

- **Un doble clic sobre el título abre la edición: un campo con el título actual, enfocado, sin casilla ni botón de eliminar a la vista.** — módulo `App`, «enters edit mode on double click»
- **Enter guarda el título recortado y cierra la edición.** — módulo `App`, «saves the trimmed title on Enter and leaves edit mode»
- **Confirmar la edición con un texto vacío o de solo espacios elimina la tarea.** — módulo `App`, «destroys the task when the edit is confirmed empty %j»
- **Escape abandona la edición conservando el título original.** — módulo `App`, «cancels the edit on Escape keeping the original title»
- **Perder el foco guarda los cambios, igual que Enter.** — módulo `App`, «saves the edited title when the field loses focus»
- **Lo tecleado sin confirmar no se conserva: al recargar vuelve el título guardado.** — módulo `App`, «does not persist the in-progress edit across remounts»

### Estado vacío y persistencia

- **Sin tareas no hay lista ni control «Todas»; se ve el mensaje de vacío.** — módulo `App`, «hides the list while empty»
- **Al capturar la primera tarea aparecen la lista y el control «Todas».** — módulo `App`, «shows the list and mark-all control after the first capture»
- **Las tareas se conservan entre visitas.** — módulos `App` («restores captured tasks on remount with the same storage») y `TodoProvider` («restores the state on a fresh mount with the same storage»)
