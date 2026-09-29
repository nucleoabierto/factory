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
  - **Limpiar completadas:** descartar las tareas completadas que la vista activa muestra —en la vista principal, las visibles de la lista activa; en «hoy», las de todas las listas vivas—. Lo completado con fecha futura nunca se alcanza: no es visible en ninguna vista.
    - Ancla: `TaskList.clearCompleted` y `#scopedTasks` en `todo-domain.js`
    - Origen: `docs/tasks/005-filtros-y-limpiar.md`
  - **Lista activa:** la lista elegida sobre la que trabaja la vista: acota las tareas visibles, los filtros, el contador y la captura de tareas nuevas; persiste entre visitas y cae a la entrada si el valor guardado no existe o está archivado.
    - Ancla: `App.activeListId` y `App.setActiveList` en `app.js`, y `Storage.loadActiveList`/`saveActiveList` en `todo-storage.js`
    - Origen: `docs/tasks/012-navegacion-por-lista.md`
  - **Lista archivada:** una lista aparcada con todo su contenido: sale de la navegación y de las vistas sin perder tareas ni estado, y puede reactivarse; solo las vivas pueden ser activas o recibir tareas movidas.
    - Ancla: el flag `archived` de la lista y `TaskList.archiveList`/`unarchiveList` en `todo-domain.js`
    - Origen: `docs/tasks/014-archivar-listas.md`
  - **Fecha de la tarea:** día calendario opcional (cadena ISO `YYYY-MM-DD`, sin hora), ausente por defecto; puede asignarse, cambiarse y quitarse. La tarea capturada en la vista «hoy» nace con la fecha del día, para quedar visible donde se creó.
    - Ancla: el campo `date` de la tarea y `TaskList.setTaskDate`/`clearTaskDate` en `todo-domain.js`, e `isValidDate` en `todo-core.js`
    - Origen: `docs/tasks/016-fecha-en-el-modelo.md`
  - **Vencida / de hoy / futura:** clasificación de una fecha respecto al día actual; la consulta del dominio recibe el día de referencia y la decide el modelo, no la presentación.
    - Ancla: `TaskList.dateStatus` en `todo-domain.js` y `currentDay` en `todo-core.js`
    - Origen: `docs/tasks/016-fecha-en-el-modelo.md`
  - **Recurrencia:** periodicidad simple de una tarea con fecha —semanal (`weekly`) o mensual (`monthly`)—, ausente por defecto (`null`). Al completar una recurrente, la tarea queda completada como registro histórico y el dominio crea una copia pendiente —mismo texto, lista y recurrencia, identificador nuevo— con la próxima ocurrencia: semanal avanza siete días; mensual, el mismo día del mes siguiente cayendo al último día del mes si no existe; si el resultado no es posterior al día de referencia, el paso se repite sobre la fecha resultante hasta quedar a futuro.
    - Ancla: el campo `recur` de la tarea, `RECURS` en `todo-core.js` y `TaskList.setTaskRecur`/`TaskList.#nextOccurrence` en `todo-domain.js`
    - Origen: `docs/tasks/019-tareas-recurrentes.md`
  - **Documento de exportación:** forma serializada, legible y versionada del estado completo —`{app, version, lists, tasks}`— pensada para salir de la aplicación y volver a entrar; la entrada viaja en el documento como una lista más.
    - Ancla: `EXPORT_APP`/`EXPORT_VERSION` en `todo-core.js` y `TaskList.toDocument` en `todo-domain.js`
    - Origen: `docs/tasks/020-formato-de-exportacion.md`
  - **Importar:** entrada de un documento de exportación al estado, en dos tiempos: la validación es estricta y sin tocar el estado —un ítem inválido rechaza el documento entero informando del motivo— y la aplicación ofrece dos semánticas: reemplazar (`'replace'`), que hace del documento el estado completo, y copiar (`'copy'`), que incorpora el contenido como copias con identificadores reasignados, nombres de lista liberados por sufijo y la entrada del documento integrada en la permanente.
    - Ancla: `TaskList.parseDocument`/`importDocument`/`#validateDocument`/`#importCopy`/`#freeName` en `todo-domain.js` e `IMPORT_MODES` en `todo-core.js`
    - Origen: `docs/tasks/020-formato-de-exportacion.md`
- **Entidades / estado:**
  - La tarea `{id, text, done, listId, date, recur}` y la lista `{id, name, archived}`; el estado es el conjunto de tareas y de listas (privado en `TaskList`, consultable por `tasks()`/`lists()`) más el contador derivado, el filtro activo, la vista activa y la lista activa.
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
  - Sin fecha válida no hay recurrencia: `recur` solo admite `weekly`/`monthly` con fecha presente; cualquier otro valor, o una fecha que se quita, lo degrada a `null` sin tocar la tarea.
    - Ancla: `RECURS` en `todo-core.js` y el saneado de `recur` en `TaskList.load`, `setTaskRecur` y `clearTaskDate`
  - El documento de exportación se valida estricto antes de entrar —a diferencia del `load` tolerante—: ítem inválido, referencia colgante, identificador o nombre de lista duplicado, nombre igual al de la entrada, marcador o versión desconocidos rechazan el documento entero sin tocar el estado; los campos opcionales ausentes (`archived`, `date`, `recur`) se toleran por compatibilidad.
    - Ancla: `TaskList.parseDocument` y `TaskList.#validateDocument` en `todo-domain.js`
  - Al incorporar un documento como copia no quedan identificadores ni nombres duplicados: las listas reciben ids frescos `list-N` y nombres liberados con el sufijo « (copia)», las tareas ids nuevos de `#nextId` con su `listId` remapeado, y la entrada nunca se duplica.
    - Ancla: `TaskList.#importCopy` y `TaskList.#freeName` en `todo-domain.js`
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
  - Declarar y quitar la periodicidad de una tarea con fecha; al completar una recurrente, generar su copia pendiente con la próxima ocurrencia.
    - Ancla: `setTaskRecur`, `#nextOccurrence` y la rama de copia de `toggleTask` en `TaskList`, con la pasarela `App.setTaskRecur`
  - Exportar el estado como documento versionado e importar un documento validado reemplazando el estado o incorporándolo como copia.
    - Ancla: `toDocument`, `parseDocument`, `importDocument` en `TaskList` y las pasarelas `App.exportDocument`/`App.importDocument`

## Explicación del dominio

- **Fronteras:**
  - Dentro: el modelo de tarea y de lista, sus invariantes y las operaciones sobre ellas; la noción de pendiente y el filtro como consulta sobre el estado, acotable por lista. Vive en el objeto `TaskList` (`todo-domain.js`), que notifica cambios a suscriptores sin conocer persistencia ni DOM.
  - Fuera: el renderizado DOM y los eventos (presentación, objeto `UI` en `todo-ui.js` con `render`/`bind` y las funciones de región `renderTasks`/`renderListBar`/`renderArchived`/`renderFooter`) y la persistencia en `localStorage` (infraestructura, objeto `Storage` en `todo-storage.js` con `loadTasks`/`saveTasks`/`loadFilter`/`saveFilter`/`loadView`/`saveView`/`loadActiveList`/`saveActiveList`). Las constantes y helpers neutros (`INBOX`, `FILTERS`, `VIEWS`, `RECURS`, `currentDay`, `isValidDate`) viven en `todo-core.js`. La fachada `App` (`app.js`) compone los tres y mantiene la API pública: la vista consume un view-model de datos planos con las colecciones ya proyectadas (`App.viewModel`: `navigableLists`, `archivedLists`, `moveTargets` por tarea) y despacha acciones declaradas (`App.actions`) por un único mecanismo de delegación sobre `data-action` (`dispatchTable`), sin conocer la fachada ni re-decidir las reglas de pertenencia; el estado de vista vive en `viewState`, con un solo poseedor. Las capas son archivos cargados como scripts clásicos que comparten lo imprescindible por el namespace global `window.Todo` (D001).
  - Relaciones: el almacenamiento del navegador (`localStorage`) como dependencia de infraestructura con tolerancia a datos ausentes o corruptos.
- **Decisiones relevantes:**
  - D018 «todo-app en vanilla JS como prueba del flujo externo» (`docs/decisions/` del repositorio raíz) — la aplicación es una PoC en vanilla JS sin build ni framework.
  - D001 «División de app.js por capas con scripts clásicos y namespace compartido» (`docs/decisions/` del subproyecto) — cada capa vive en su propio archivo (`todo-core.js`, `todo-domain.js`, `todo-storage.js`, `todo-ui.js`, `app.js`) cargado con `<script>` clásico; los ES modules quedan descartados por incompatibles con `file://`.

## Estado de salud

- Última revisión: 2026-09-28
- Divergencias conocidas: ninguna abierta. La tarea 020 introdujo el documento de exportación como segundo contrato de datos del dominio —versionado, autocontenido y de validación estricta, frente al `load` tolerante— con las dos semánticas de importación: reemplazar y copiar con reasignación de identificadores. La tarea 019 introdujo la recurrencia como dato ligado a la fecha —`recur` en la tarea, copia viva al completar—. La vista «hoy» incluía tareas de listas archivadas pese a que el concepto las declara fuera de las vistas; la revisión de la tarea 018 lo detectó y la tarea 027 lo resolvió excluyéndolas de la consulta transversal. La revisión de arquitectura 002 detectó un ciclo `App` ↔ `UI` y un contrato de vista implícito; la tarea 023 lo resolvió con el contrato view-model/dispatch y el estado de vista de poseedor único (`viewState`). La concentración de características se resolvió en la tarea 008 (dominio en `TaskList`, `App` como fachada) y el estado quedó privado en la tarea 010 (campos `#` de la clase; lectura por `tasks()`/`nextId()`, reinicio por `reset()`). La tarea 011 introdujo la lista como agrupación exclusiva y la entrada permanente; la tarea 012 añadió la lista activa persistida que acota la vista; la tarea 013 la gestión de listas con unicidad de nombre y reasignación al eliminar; la tarea 014 el estado archivado —la lista `{id, name, archived}`— con exclusión de la navegación y veto de la entrada; la tarea 024 cerró el contrato de vista: la proyección de colecciones vive en `App.viewModel` y los eventos usan un solo mecanismo delegado. La tarea 016 introdujo la fecha opcional de la tarea como día calendario y la clasificación temporal como consulta del dominio.
