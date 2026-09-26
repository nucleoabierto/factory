# Lista de tareas (todo-app)

## Propósito

Un único lugar donde una persona apunta lo que tiene que hacer, consulta qué sigue pendiente y cierra lo terminado, conservando la lista entre visitas.

## Referencia del modelo

- **Lenguaje ubicuo:**
  - **Tarea:** algo que hay que hacer, con texto y estado; pertenece a una lista.
    - Ancla: el objeto `{id, text, done, listId}` creado en `TaskList.addTask` en `todo-domain.js`
    - Origen: `docs/tasks/003-crear-y-listar.md`
  - **Lista:** agrupación exclusiva de tareas con identificador y nombre; cada tarea pertenece exactamente a una lista.
    - Ancla: `TaskList.#lists`, `TaskList.lists()` y el campo `listId` en `TaskList.#snapshot` en `todo-domain.js`
    - Origen: `docs/tasks/011-listas-en-el-modelo.md`
  - **Entrada:** la lista permanente por defecto («Entrada», id `inbox`); existe siempre y recibe las tareas creadas sin lista indicada y las migradas del formato antiguo.
    - Ancla: la constante `INBOX` en `todo-core.js` y su reconstrucción en `TaskList.reset`/`TaskList.load` en `todo-domain.js`
    - Origen: `docs/tasks/011-listas-en-el-modelo.md`
  - **Pendiente / completada:** los dos estados de una tarea; completar es conmutar su estado.
    - Ancla: `t.done` y `TaskList.toggleTask` en `todo-domain.js`
    - Origen: `docs/tasks/004-completar-editar-borrar.md`
  - **Filtro:** vista de la lista restringida a todas, pendientes o completadas.
    - Ancla: `FILTERS` en `todo-core.js`, `App.filter` en `app.js` y `TaskList.visibleTasks` en `todo-domain.js`
    - Origen: `docs/tasks/005-filtros-y-limpiar.md`
  - **Vista:** eje de consulta independiente del filtro y de la lista activa: la vista principal (`main`) muestra, de la lista activa, lo sin fecha, lo vencido y lo de hoy —lo futuro permanece oculto hasta su día—; la vista «hoy» (`today`) es transversal y muestra exactamente lo vencido y lo del día de todas las listas vivas —las archivadas no aportan nada a ninguna vista. Persiste entre visitas y cae a `main` si el valor guardado no es válido.
    - Ancla: `VIEWS` en `todo-core.js`, `App.view`/`App.setView` en `app.js`, `Storage.loadView`/`saveView` en `todo-storage.js` y el parámetro `view` de `TaskList.visibleTasks`/`pendingCount` en `todo-domain.js`
    - Origen: `docs/tasks/018-vista-hoy-y-programacion.md`
  - **Limpiar completadas:** descartar de la lista las tareas completadas.
    - Ancla: `TaskList.clearCompleted` en `todo-domain.js`
    - Origen: `docs/tasks/005-filtros-y-limpiar.md`
  - **Lista activa:** la lista elegida sobre la que trabaja la vista: acota las tareas visibles, los filtros, el contador y la captura de tareas nuevas; persiste entre visitas y cae a la entrada si el valor guardado no existe o está archivado.
    - Ancla: `App.activeListId` y `App.setActiveList` en `app.js`, y `Storage.loadActiveList`/`saveActiveList` en `todo-storage.js`
    - Origen: `docs/tasks/012-navegacion-por-lista.md`
  - **Lista archivada:** una lista aparcada con todo su contenido: sale de la navegación y de las vistas sin perder tareas ni estado, y puede reactivarse; solo las vivas pueden ser activas o recibir tareas movidas.
    - Ancla: el flag `archived` de la lista y `TaskList.archiveList`/`unarchiveList` en `todo-domain.js`
    - Origen: `docs/tasks/014-archivar-listas.md`
  - **Fecha de la tarea:** día calendario opcional (cadena ISO `YYYY-MM-DD`, sin hora), ausente por defecto; puede asignarse, cambiarse y quitarse.
    - Ancla: el campo `date` de la tarea y `TaskList.setTaskDate`/`clearTaskDate` en `todo-domain.js`, e `isValidDate` en `todo-core.js`
    - Origen: `docs/tasks/016-fecha-en-el-modelo.md`
  - **Vencida / de hoy / futura:** clasificación de una fecha respecto al día actual; la consulta del dominio recibe el día de referencia y la decide el modelo, no la presentación.
    - Ancla: `TaskList.dateStatus` en `todo-domain.js` y `currentDay` en `todo-core.js`
    - Origen: `docs/tasks/016-fecha-en-el-modelo.md`
- **Entidades / estado:**
  - La tarea `{id, text, done, listId, date}` y la lista `{id, name, archived}`; el estado es el conjunto de tareas y de listas (privado en `TaskList`, consultable por `tasks()`/`lists()`) más el contador derivado, el filtro activo, la vista activa y la lista activa.
    - Ancla: `class TaskList` con `#tasks`/`#lists`/`#nextId` y las consultas `tasks()`/`lists()`/`nextId()` en `todo-domain.js`
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
  - Al cargar datos externos solo entran ítems con forma válida; una fecha malformada se descarta sola y la tarea sobrevive.
    - Ancla: `TaskList.isValidTask`/`isValidList` y el saneado de `date` en `TaskList.load`
  - El formato persistido es `{lists, tasks}` y el array plano antiguo migra a la entrada.
    - Ancla: discriminación de formato en `TaskList.load` y serialización en `App.save`
- **Operaciones:**
  - Crear, completar, editar y borrar tareas.
    - Ancla: `addTask`, `toggleTask`, `editTask`, `deleteTask` en `TaskList`
  - Filtrar la vista, limpiar completadas y contar pendientes.
    - Ancla: `visibleTasks`, `clearCompleted`, `pendingCount` en `TaskList` y `App.setFilter`
  - Elegir la vista (principal u «hoy»); el contador de pendientes cuenta lo presente en la vista activa.
    - Ancla: `App.setView` y los parámetros `view`/`today` de `TaskList.visibleTasks`/`pendingCount`
  - Crear, renombrar, eliminar listas y mover tareas entre ellas.
    - Ancla: `addList`, `renameList`, `deleteList`, `moveTask` en `TaskList`
  - Archivar y reactivar listas.
    - Ancla: `archiveList`, `unarchiveList` en `TaskList`
  - Elegir la lista activa.
    - Ancla: `App.setActiveList`
  - Asignar, cambiar y quitar la fecha de una tarea; clasificar una fecha como vencida, de hoy o futura.
    - Ancla: `setTaskDate`, `clearTaskDate`, `dateStatus` en `TaskList` y sus pasarelas en `App`

## Explicación del dominio

- **Fronteras:**
  - Dentro: el modelo de tarea y de lista, sus invariantes y las operaciones sobre ellas; la noción de pendiente y el filtro como consulta sobre el estado, acotable por lista. Vive en el objeto `TaskList` (`todo-domain.js`), que notifica cambios a suscriptores sin conocer persistencia ni DOM.
  - Fuera: el renderizado DOM y los eventos (presentación, objeto `UI` en `todo-ui.js` con `render`/`bind` y las funciones de región `renderTasks`/`renderListBar`/`renderArchived`/`renderFooter`) y la persistencia en `localStorage` (infraestructura, objeto `Storage` en `todo-storage.js` con `loadTasks`/`saveTasks`/`loadFilter`/`saveFilter`/`loadView`/`saveView`/`loadActiveList`/`saveActiveList`). Las constantes y helpers neutros (`INBOX`, `FILTERS`, `VIEWS`, `currentDay`, `isValidDate`) viven en `todo-core.js`. La fachada `App` (`app.js`) compone los tres y mantiene la API pública: la vista consume un view-model de datos planos con las colecciones ya proyectadas (`App.viewModel`: `navigableLists`, `archivedLists`, `moveTargets` por tarea) y despacha acciones declaradas (`App.actions`) por un único mecanismo de delegación sobre `data-action` (`dispatchTable`), sin conocer la fachada ni re-decidir las reglas de pertenencia; el estado de vista vive en `viewState`, con un solo poseedor. Las capas son archivos cargados como scripts clásicos que comparten lo imprescindible por el namespace global `window.Todo` (D001).
  - Relaciones: el almacenamiento del navegador (`localStorage`) como dependencia de infraestructura con tolerancia a datos ausentes o corruptos.
- **Decisiones relevantes:**
  - D018 «todo-app en vanilla JS como prueba del flujo externo» (`docs/decisions/` del repositorio raíz) — la aplicación es una PoC en vanilla JS sin build ni framework.
  - D001 «División de app.js por capas con scripts clásicos y namespace compartido» (`docs/decisions/` del subproyecto) — cada capa vive en su propio archivo (`todo-core.js`, `todo-domain.js`, `todo-storage.js`, `todo-ui.js`, `app.js`) cargado con `<script>` clásico; los ES modules quedan descartados por incompatibles con `file://`.

## Estado de salud

- Última revisión: 2026-09-26
- Divergencias conocidas: ninguna abierta. La vista «hoy» incluía tareas de listas archivadas pese a que el concepto las declara fuera de las vistas; la revisión de la tarea 018 lo detectó y la tarea 027 lo resolvió excluyéndolas de la consulta transversal. La revisión de arquitectura 002 detectó un ciclo `App` ↔ `UI` y un contrato de vista implícito; la tarea 023 lo resolvió con el contrato view-model/dispatch y el estado de vista de poseedor único (`viewState`). La concentración de características se resolvió en la tarea 008 (dominio en `TaskList`, `App` como fachada) y el estado quedó privado en la tarea 010 (campos `#` de la clase; lectura por `tasks()`/`nextId()`, reinicio por `reset()`). La tarea 011 introdujo la lista como agrupación exclusiva y la entrada permanente; la tarea 012 añadió la lista activa persistida que acota la vista; la tarea 013 la gestión de listas con unicidad de nombre y reasignación al eliminar; la tarea 014 el estado archivado —la lista `{id, name, archived}`— con exclusión de la navegación y veto de la entrada; la tarea 024 cerró el contrato de vista: la proyección de colecciones vive en `App.viewModel` y los eventos usan un solo mecanismo delegado. La tarea 016 introdujo la fecha opcional de la tarea como día calendario y la clasificación temporal como consulta del dominio.
