# Formato de exportación

La acción «Exportar» del pie produce un archivo `todo-app.json` y la acción «Enlace» produce un enlace que lleva el mismo contenido. Ambos transportan el mismo documento: una forma legible y versionada del estado completo de la aplicación, pensada para salir y volver a entrar sin pérdida.

## El documento

```json
{
  "app": "todo-app",
  "version": 1,
  "lists": [
    { "id": "inbox", "name": "Entrada", "archived": false },
    { "id": "list-1", "name": "Trabajo", "archived": true }
  ],
  "tasks": [
    { "id": 1, "text": "Comprar pan", "done": false, "listId": "list-1",
      "date": null, "recur": null }
  ]
}
```

- `app` y `version` identifican el formato: `todo-app`, versión `1`.
- `lists` y `tasks` llevan el estado completo en la misma forma que el estado persistido —los campos de cada ítem están en [Estado persistido](estado-persistido.md)—, con la Entrada viajando como una lista más.
- Los documentos exportados antes de que existieran campos opcionales (`archived`, `date`, `recur`) siguen siendo válidos.

## El enlace

El enlace apunta a la propia página y lleva el documento codificado en el fragmento tras `#export=`, en base64url: quien lo abre no necesita nada del navegador que lo creó. La dirección completa tiene un límite de tamaño —8000 caracteres— para que sobreviva a los canales por los que se comparte; un estado que lo excede no produce enlace y la aplicación lo indica.

## Dónde vive la lógica

La composición del documento está en `TaskList.toDocument` (`todo-domain.js`); la codificación del enlace y el límite, en `todo-core.js` (`encodeDocument`, `decodeDocument`, `documentLink`, `EXPORT_LINK_MAX`); la descarga y el diálogo, en `todo-ui.js` (`UI.downloadFile`, acciones `export-file`/`export-link`).
