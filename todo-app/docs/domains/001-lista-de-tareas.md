# Lista de tareas (todo-app)

## Propósito

Un único lugar donde una persona apunta lo que tiene que hacer, consulta qué sigue pendiente y cierra lo terminado, conservando la lista entre visitas.

## Referencia del modelo

- **Lenguaje ubicuo:**
  - **Tarea:** algo que hay que hacer, con texto y estado; pertenece a una lista.
    - Ancla: el objeto `{id, text, done, listId}` creado en `TaskList.addTask` en `app.js`
    - Origen: `docs/tasks/003-crear-y-listar.md`
  - **Lista:** agrupación exclusiva de tareas con identificador y nombre; cada tarea pertenece exactamente a una lista.
    - Ancla: `TaskList.#lists`, `TaskList.lists()` y el campo `listId` en `TaskList.#snapshot` en `app.js`
    - Origen: `docs/tasks/011-listas-en-el-modelo.md`
  - **Entrada:** la lista permanente por defecto («Entrada», id `inbox`); existe siempre y recibe las tareas creadas sin lista indicada y las migradas del formato antiguo.
    - Ancla: la constante `INBOX` y su reconstrucción en `TaskList.reset`/`TaskList.load` en `app.js`
    - Origen: `docs/tasks/011-listas-en-el-modelo.md`
  - **Pendiente / completada:** los dos estados de una tarea; completar es conmutar su estado.
    - Ancla: `t.done` y `TaskList.toggleTask` en `app.js`
    - Origen: `docs/tasks/004-completar-editar-borrar.md`
  - **Filtro:** vista de la lista restringida a todas, pendientes o completadas.
    - Ancla: `FILTERS`, `App.filter` y `TaskList.visibleTasks` en `app.js`
    - Origen: `docs/tasks/005-filtros-y-limpiar.md`
  - **Limpiar completadas:** descartar de la lista las tareas completadas.
    - Ancla: `TaskList.clearCompleted` en `app.js`
    - Origen: `docs/tasks/005-filtros-y-limpiar.md`
  - **Lista activa:** la lista elegida sobre la que trabaja la vista: acota las tareas visibles, los filtros, el contador y la captura de tareas nuevas; persiste entre visitas y cae a la entrada si el valor guardado no existe o está archivado.
    - Ancla: `App.activeListId`, `App.setActiveList` y `Storage.loadActiveList`/`saveActiveList` en `app.js`
    - Origen: `docs/tasks/012-navegacion-por-lista.md`
  - **Lista archivada:** una lista aparcada con todo su contenido: sale de la navegación y de las vistas sin perder tareas ni estado, y puede reactivarse; solo las vivas pueden ser activas o recibir tareas movidas.
    - Ancla: el flag `archived` de la lista y `TaskList.archiveList`/`unarchiveList` en `app.js`
    - Origen: `docs/tasks/014-archivar-listas.md`
- **Entidades / estado:**
  - La tarea `{id, text, done, listId}` y la lista `{id, name, archived}`; el estado es el conjunto de tareas y de listas (privado en `TaskList`, consultable por `tasks()`/`lists()`) más el contador derivado, el filtro activo y la lista activa.
    - Ancla: `class TaskList` con `#tasks`/`#lists`/`#nextId` y las consultas `tasks()`/`lists()`/`nextId()` en `app.js`
- **Invariantes:**
  - No existen tareas con texto vacío o de solo espacios.
    - Ancla: validación en `TaskList.addTask` y `TaskList.editTask`
  - Los identificadores son únicos y crecientes.
    - Ancla: `TaskList.#nextId` y `nextId()`
  - Editar una tarea a texto vacío la borra.
    - Ancla: `TaskList.editTask` delegando en `TaskList.deleteTask`
  - Toda tarea pertenece a una lista existente, sin huérfanas.
    - Ancla: `listId` en `TaskList.addTask` y el filtro de pertenencia en `TaskList.load`
  - La entrada existe siempre, tiene identificador único y los identificadores de lista no se duplican.
    - Ancla: `INBOX`, `TaskList.isValidList` y la deduplicación en `TaskList.load`
  - Los nombres de lista son únicos sin distinguir mayúsculas y la entrada no puede renombrarse, eliminarse ni archivarse.
    - Ancla: `TaskList.#nameTaken` y las guardas en `addList`/`renameList`/`deleteList`/`archiveList`
  - Una lista archivada no puede ser la activa ni recibir tareas movidas.
    - Ancla: `!list.archived` en `App.setActiveList`, `App.load` y `TaskList.moveTask`
  - Eliminar una lista nunca destruye tareas: pasan a la entrada.
    - Ancla: reasignación en `TaskList.deleteList`
  - Al cargar datos externos solo entran ítems con forma válida.
    - Ancla: `TaskList.isValidTask`/`isValidList` en `TaskList.load`
  - El formato persistido es `{lists, tasks}` y el array plano antiguo migra a la entrada.
    - Ancla: discriminación de formato en `TaskList.load` y serialización en `App.save`
- **Operaciones:**
  - Crear, completar, editar y borrar tareas.
    - Ancla: `addTask`, `toggleTask`, `editTask`, `deleteTask` en `TaskList`
  - Filtrar la vista, limpiar completadas y contar pendientes.
    - Ancla: `visibleTasks`, `clearCompleted`, `pendingCount` en `TaskList` y `App.setFilter`
  - Crear, renombrar, eliminar listas y mover tareas entre ellas.
    - Ancla: `addList`, `renameList`, `deleteList`, `moveTask` en `TaskList`
  - Archivar y reactivar listas.
    - Ancla: `archiveList`, `unarchiveList` en `TaskList`
  - Elegir la lista activa.
    - Ancla: `App.setActiveList`

## Explicación del dominio

- **Fronteras:**
  - Dentro: el modelo de tarea y de lista, sus invariantes y las operaciones sobre ellas; la noción de pendiente y el filtro como consulta sobre el estado, acotable por lista. Vive en el objeto `TaskList`, que notifica cambios a suscriptores sin conocer persistencia ni DOM.
  - Fuera: el renderizado DOM y los eventos (presentación, objeto `UI` con `render`/`bind` y las funciones de región `renderTasks`/`renderListBar`/`renderArchived`/`renderFooter`) y la persistencia en `localStorage` (infraestructura, objeto `Storage` con `loadTasks`/`saveTasks`/`loadFilter`/`saveFilter`/`loadActiveList`/`saveActiveList`). La fachada `App` compone los tres y mantiene la API pública: la vista consume un view-model de datos planos con las colecciones ya proyectadas (`App.viewModel`: `navigableLists`, `archivedLists`, `moveTargets` por tarea) y despacha acciones declaradas (`App.actions`) por un único mecanismo de delegación sobre `data-action` (`dispatchTable`), sin conocer la fachada ni re-decidir las reglas de pertenencia; el estado de vista vive en `viewState`, con un solo poseedor.
  - Relaciones: el almacenamiento del navegador (`localStorage`) como dependencia de infraestructura con tolerancia a datos ausentes o corruptos.
- **Decisiones relevantes:**
  - D018 «todo-app en vanilla JS como prueba del flujo externo» (`docs/decisions/` del repositorio raíz) — la aplicación es una PoC en vanilla JS sin build ni framework.

## Estado de salud

- Última revisión: 2026-09-25
- Divergencias conocidas: ninguna. La revisión de arquitectura 002 detectó un ciclo `App` ↔ `UI` y un contrato de vista implícito; la tarea 023 lo resolvió con el contrato view-model/dispatch y el estado de vista de poseedor único (`viewState`). La concentración de características se resolvió en la tarea 008 (dominio en `TaskList`, `App` como fachada) y el estado quedó privado en la tarea 010 (campos `#` de la clase; lectura por `tasks()`/`nextId()`, reinicio por `reset()`). La tarea 011 introdujo la lista como agrupación exclusiva y la entrada permanente; la tarea 012 añadió la lista activa persistida que acota la vista; la tarea 013 la gestión de listas con unicidad de nombre y reasignación al eliminar; la tarea 014 el estado archivado —la lista `{id, name, archived}`— con exclusión de la navegación y veto de la entrada; la tarea 024 cerró el contrato de vista: la proyección de colecciones vive en `App.viewModel` y los eventos usan un solo mecanismo delegado.
