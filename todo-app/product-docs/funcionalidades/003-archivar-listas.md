# Archivar listas

Aparcarse una lista sin perder su contenido y reactivarla después. El concepto de lista archivada y sus invariantes están en el documento de dominio `docs/domains/001-lista-de-tareas.md`; aquí se describe el comportamiento observable.

## Escenarios

Cada escenario está verificado por la suite de pruebas del proyecto (`tests.html`, módulo `archiving lists`); se cita el título de la prueba que lo cubre.

- **Archivar una lista la saca de la navegación pero conserva todas sus tareas.** — «archiving hides the list but keeps its tasks»
- **Archivar la lista activa devuelve la vista a la Entrada.** — «archiving the active list falls back to the inbox»
- **Reactivar restaura la lista tal como estaba.** — «reactivating restores the list as it was»
- **El estado archivado persiste entre visitas.** — «the archived flag persists across reloads»
- **Las listas guardadas antes de existir el archivado cargan como vivas.** — «lists persisted without the flag load as live»
- **La Entrada no puede archivarse.** — «the inbox cannot be archived»
- **Las listas archivadas no se ofrecen en ningún sitio: ni en el selector ni como destino de mover tareas.** — «archived lists are not offered anywhere»
