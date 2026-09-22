# Lista de tareas (todo-app)

## Propósito

Un único lugar donde una persona apunta lo que tiene que hacer, consulta qué sigue pendiente y cierra lo terminado, conservando la lista entre visitas.

## Lenguaje ubicuo

- **Tarea:** algo que hay que hacer, con texto y estado.
  - Ancla: el objeto `{id, text, done}` creado en `App.addTask` en `app.js`
  - Origen: `docs/tasks/003-crear-y-listar.md`
- **Pendiente / completada:** los dos estados de una tarea; completar es conmutar su estado.
  - Ancla: `t.done` y `App.toggleTask` en `app.js`
  - Origen: `docs/tasks/004-completar-editar-borrar.md`
- **Filtro:** vista de la lista restringida a todas, pendientes o completadas.
  - Ancla: `FILTERS`, `App.filter` y `App.visibleTasks` en `app.js`
  - Origen: `docs/tasks/005-filtros-y-limpiar.md`
- **Limpiar completadas:** descartar de la lista las tareas completadas.
  - Ancla: `App.clearCompleted` en `app.js`
  - Origen: `docs/tasks/005-filtros-y-limpiar.md`

## Modelo

- **Entidades / estado:** la tarea `{id, text, done}` es la única entidad; el estado es la lista `App.tasks` más el contador derivado y el filtro activo.
  - Ancla: `App.tasks`, `App.nextId` en `app.js`
- **Invariantes:** no existen tareas con texto vacío o de solo espacios (Ancla: validación en `App.addTask` y `App.editTask`); los identificadores son únicos y crecientes (Ancla: `App.nextId`); editar una tarea a texto vacío la borra (Ancla: `App.editTask` delegando en `App.deleteTask`).
- **Operaciones:** crear, completar, editar, borrar, filtrar, limpiar completadas y contar pendientes.
  - Ancla: `addTask`, `toggleTask`, `editTask`, `deleteTask`, `setFilter`, `clearCompleted`, `pendingCount`, `visibleTasks` en `app.js`

## Fronteras

- **Dentro:** el modelo de tarea, sus invariantes y las operaciones sobre la lista; la noción de pendiente y el filtro como consulta sobre el estado.
- **Fuera:** el renderizado DOM y los eventos (presentación, `App.render` y `App.init`) y la persistencia en `localStorage` (infraestructura, `App.load`/`App.save`/`setFilter`). Ambas son responsabilidades que hoy comparten el mismo objeto `App` con el dominio —ver estado de salud.
- **Relaciones:** el almacenamiento del navegador (`localStorage`) como dependencia de infraestructura con tolerancia a datos ausentes o corruptos.

## Decisiones relevantes

- D018 «todo-app en vanilla JS como prueba del flujo externo» (`docs/decisions/` del repositorio raíz) — la aplicación es una PoC en vanilla JS sin build ni framework.

## Estado de salud

- Última revisión: 2026-09-22
- Divergencias conocidas: dominio, persistencia y presentación conviven en el objeto `App` (concentración de características); aceptable para la PoC, candidato a revisión de arquitectura si el dominio crece.
