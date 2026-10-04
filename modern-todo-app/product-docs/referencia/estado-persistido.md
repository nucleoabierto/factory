# Estado persistido

Qué guarda la aplicación en el navegador y en qué formato, para quien inspeccione el almacenamiento o escriba herramientas que lo lean.

## Escenarios

Cada afirmación está verificada por la suite de pruebas del proyecto (`src/persistence/task-storage.test.ts` y `src/domain/tasks.test.ts`); se cita el módulo y el título de la prueba que lo cubre.

- **La lista se guarda en `localStorage` bajo la clave `todos-react`, como un array JSON cuyos ítems llevan exactamente las claves `id`, `title` y `completed`.** — módulo `task-storage`, «saves a JSON array with the spec keys under todos-react»
- **Guardar y recargar devuelve la misma lista.** — módulo `task-storage`, «round-trips the saved list»
- **Sin dato previo, o con un JSON corrupto, la aplicación arranca con la lista vacía sin romperse.** — módulo `task-storage` («loads an empty list when nothing is stored», «loads an empty list on corrupted JSON without throwing»)
- **Un ítem malformado dentro del array se descarta sin contaminar los válidos; las entradas se normalizan a las claves `id`, `title`, `completed`, y los `id` repetidos conservan solo la primera ocurrencia.** — módulo `hydrateTasks` («drops malformed entries without contaminating the valid ones», «normalizes entries to the spec keys, without extra keys», «drops duplicate ids keeping the first occurrence»)
- **Un almacenamiento que lanza errores en cada acceso no rompe ni la carga ni la escritura.** — módulo `task-storage`, «tolerates a storage that throws on every access»
