# Estado persistido

Todo el estado de todo-app vive en `localStorage` del navegador, bajo cuatro claves. Los datos se escriben en cada operación y se leen al abrir la página. Si `localStorage` no está disponible —modo privado restrictivo, cuota llena—, la aplicación funciona igualmente en memoria durante la sesión.

## Claves

- **`todoapp-tasks`** — el estado completo: listas y tareas.
- **`todoapp-filter`** — el filtro activo: `all`, `active` o `completed`. Un valor distinto se ignora y se usa `all`.
- **`todoapp-view`** — la vista activa: `main` o `today`. Un valor distinto se ignora y se usa `main`.
- **`todoapp-active-list`** — el identificador de la lista activa. Si la lista ya no existe o está archivada, se vuelve a `inbox`.

## Formato de `todoapp-tasks`

```json
{
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

- `id` de tarea: número entero único y creciente.
- `id` de lista: cadena única; la Entrada siempre usa `inbox`.
- `archived`: booleano; las listas guardadas antes de existir el archivado carecen del campo y cargan como vivas.
- `listId`: identificador de la lista a la que pertenece la tarea.
- `date`: día de la tarea como cadena ISO `YYYY-MM-DD`, o `null` si no tiene; las tareas guardadas antes de existir la fecha carecen del campo y cargan sin ella.
- `recur`: periodicidad de la tarea —`weekly` o `monthly`—, o `null` si no se repite; solo es válida junto a una `date` válida y las tareas anteriores a la recurrencia carecen del campo.

## Tolerancia y migración

Al cargar se aplican estas reglas:

- Datos ausentes, JSON roto o de un tipo inesperado producen un estado vacío con la Entrada, nunca un error visible.
- Solo entran tareas con la forma válida (`id` numérico, `text` no vacío, `done` booleano) y listas válidas con identificadores únicos; las duplicadas colapsan a la primera.
- Una tarea cuya `listId` apunta a una lista inexistente se descarta; una tarea sin `listId` va a la Entrada.
- Una `date` malformada se descarta sola: la tarea se conserva sin fecha.
- Un `recur` desconocido, o uno sin `date` válida, se descarta solo: la tarea se conserva sin repetición.
- Si los datos no contienen la Entrada, se recrea.
- El formato antiguo —un array plano de tareas— se migra: todas sus tareas pasan a la Entrada y el siguiente guardado escribe ya el formato `{lists, tasks}`.

## Dónde vive la lógica

La lectura y escritura están en el objeto `Storage` de `todo-storage.js` (las claves y la tolerancia a errores); la validación de forma y la migración están en `TaskList.load` e `isValidTask`/`isValidList` de `todo-domain.js`. Las invariantes del modelo están en el documento de dominio `docs/domains/001-lista-de-tareas.md`.
