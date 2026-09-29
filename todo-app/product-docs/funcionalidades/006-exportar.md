# Exportar contenido

Sacar las tareas de la aplicación en dos formas desde el pie de la página: «Exportar» descarga un archivo con todo el estado —todas las listas, incluidas las archivadas— y «Enlace» muestra un enlace autocontenido que lleva el mismo contenido dentro, para copiarlo y entregarlo por cualquier canal. Si el estado es demasiado grande para un enlace, la aplicación lo indica en lugar de producir uno roto. El formato del documento exportado y sus reglas están en el documento de dominio `docs/domains/001-lista-de-tareas.md`; aquí se describe el comportamiento observable.

## Escenarios

Cada escenario está verificado por la suite de pruebas del proyecto (`tests.html`, módulo `export file and link`); se cita el título de la prueba que lo cubre.

- **Exportar descarga un archivo con todo el estado.** El archivo se llama `todo-app.json` y contiene el documento completo: listas y tareas, con sus fechas y repeticiones. — «exporting downloads the document of the whole state»
- **Sin tareas también se puede exportar.** La descarga produce un documento válido con la Entrada y sin tareas. — «the empty state still downloads a valid document»
- **El enlace lleva el mismo contenido que el archivo.** «Enlace» muestra una dirección de esta misma página con el documento dentro del enlace; quien la recibe no necesita nada del navegador de origen. — «the link carries the same document as the file»
- **Los textos viajan intactos.** Tildes y emoji llegan sin corromperse a través del enlace. — «non-ASCII task text survives the link intact»
- **El enlace transporta todo el estado.** Varias listas —incluidas las archivadas— y las tareas recurrentes viajan completas por el enlace. — «the link transports the whole multi-list state»
- **Si el estado no cabe, se indica.** Un contenido demasiado grande para un enlace no produce ninguno: la aplicación avisa en lugar de entregar una dirección truncada. — «a state too large for a link is reported, not truncated»
- **Las dos acciones viven en el pie.** «Exportar» y «Enlace» están siempre disponibles al final de la página. — «the footer exposes the two export actions»
