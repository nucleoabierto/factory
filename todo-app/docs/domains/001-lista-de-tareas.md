# Lista de tareas (todo-app)

## Propósito

Un único lugar donde una persona apunta lo que tiene que hacer, consulta qué sigue pendiente y cierra lo terminado, conservando la lista entre visitas.

## Lenguaje ubicuo

- **Tarea:** algo que hay que hacer, con texto y estado.
  - Ancla: el objeto `{id, text, done}` creado en `TaskList.addTask` en `app.js`
  - Origen: `docs/tasks/003-crear-y-listar.md`
- **Pendiente / completada:** los dos estados de una tarea; completar es conmutar su estado.
  - Ancla: `t.done` y `TaskList.toggleTask` en `app.js`
  - Origen: `docs/tasks/004-completar-editar-borrar.md`
- **Filtro:** vista de la lista restringida a todas, pendientes o completadas.
  - Ancla: `FILTERS`, `App.filter` y `TaskList.visibleTasks` en `app.js`
  - Origen: `docs/tasks/005-filtros-y-limpiar.md`
- **Limpiar completadas:** descartar de la lista las tareas completadas.
  - Ancla: `TaskList.clearCompleted` en `app.js`
  - Origen: `docs/tasks/005-filtros-y-limpiar.md`

## Modelo

- **Entidades / estado:** la tarea `{id, text, done}` es la única entidad; el estado es la lista `TaskList.tasks` más el contador derivado y el filtro activo.
  - Ancla: `TaskList.tasks`, `TaskList.nextId` en `app.js`
- **Invariantes:** no existen tareas con texto vacío o de solo espacios (Ancla: validación en `TaskList.addTask` y `TaskList.editTask`); los identificadores son únicos y crecientes (Ancla: `TaskList.nextId`); editar una tarea a texto vacío la borra (Ancla: `TaskList.editTask` delegando en `TaskList.deleteTask`).
- **Operaciones:** crear, completar, editar, borrar, filtrar, limpiar completadas y contar pendientes.
  - Ancla: `addTask`, `toggleTask`, `editTask`, `deleteTask`, `clearCompleted`, `pendingCount`, `visibleTasks` en `TaskList` y `setFilter` en `App`, en `app.js`

## Fronteras

- **Dentro:** el modelo de tarea, sus invariantes y las operaciones sobre la lista; la noción de pendiente y el filtro como consulta sobre el estado. Vive en el objeto `TaskList`, que notifica cambios a suscriptores sin conocer persistencia ni DOM.
- **Fuera:** el renderizado DOM y los eventos (presentación, objeto `UI` con `render` y `bindEvents`) y la persistencia en `localStorage` (infraestructura, objeto `Storage` con `loadTasks`/`saveTasks`/`loadFilter`/`saveFilter`). La fachada `App` compone los tres y mantiene la API pública.
- **Relaciones:** el almacenamiento del navegador (`localStorage`) como dependencia de infraestructura con tolerancia a datos ausentes o corruptos.

## Decisiones relevantes

- D018 «todo-app en vanilla JS como prueba del flujo externo» (`docs/decisions/` del repositorio raíz) — la aplicación es una PoC en vanilla JS sin build ni framework.

## Estado de salud

- Última revisión: 2026-09-22
- Divergencias conocidas: ninguna. La concentración de características se resolvió en la tarea 008: el dominio vive en `TaskList` y `App` actúa de fachada. El estado del modelo sigue accesible públicamente a través de la fachada (tarea 010 pendiente).
