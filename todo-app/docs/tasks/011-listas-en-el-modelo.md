# Listas nombradas en el modelo y migración de la persistencia

## Estado

[ ] Pendiente | [ ] En progreso | [ ] En revisión | [x] Completada | [ ] Bloqueada

## Tipo

desarrollo

## Objetivo

Introducir en el dominio la lista (contexto) como agrupación exclusiva de tareas: cada tarea pertenece exactamente a una lista, existe una lista de entrada permanente y los datos ya persistidos migran a ella sin pérdida. Sin cambios visibles para el usuario todavía.

## Dependencias

- Ninguna.

## Entrada

- El modelo `TaskList` en `app.js`, con estado privado, operaciones de tarea y validación `isValidTask` al cargar.
- La capa `Storage` con la clave `todoapp-tasks` y tolerancia a datos corruptos.
- La suite QUnit en `tests.html` con aislamiento de `localStorage`.

## Resultado esperado

- El dominio modela listas nombradas: cada lista tiene identificador y nombre; cada tarea pertenece a una lista concreta.
- Existe una lista de entrada fija (por ejemplo, «Entrada») que no puede eliminarse ni dejar de existir.
- Las operaciones de tarea existentes (crear, completar, editar, borrar, filtrar, limpiar, contar) operan sobre una lista dada o conservan su comportamiento actuando sobre la lista de entrada.
- Al cargar datos persistidos con el formato anterior (lista plana de tareas), todas las tareas quedan en la lista de entrada; datos corruptos siguen tolerados.
- La interfaz sigue funcionando como antes: el usuario no percibe cambios.

## Criterios de calidad

- Las tareas ya persistidas antes del cambio sobreviven a la migración y quedan consultables.
- Las invariantes existentes se mantienen: sin tareas vacías, identificadores únicos y crecientes, editar a texto vacío borra.
- Toda tarea pertenece a una lista existente; no hay tareas huérfanas.
- La suite de `tests.html` pasa en verde con tests nuevos que cubren la pertenencia a lista, la lista de entrada y la migración.
- Sin errores en consola.

## Procedimiento sugerido

1. Decidir la representación: lista como entidad del dominio con sus tareas, o tarea con referencia a su lista; elegir la que preserve mejor las invariantes y el encapsulamiento actual.
2. Extender el modelo con la lista de entrada y la pertenencia de cada tarea a una lista.
3. Adaptar la carga: detectar el formato anterior y migrar las tareas a la lista de entrada; guardar con el formato nuevo.
4. Mantener la fachada `App` compatible para que la presentación y los tests existentes sigan pasando sin cambios.
5. Escribir los tests de pertenencia, lista de entrada y migración, y verificar `index.html` y `tests.html` en el navegador.

## Notas

- Los commits de este proyecto llevan el ámbito `todo-app` en Conventional Commits (`tipo(todo-app): descripción`).

## Plan técnico

`TaskList` mantiene `#tasks` privado con sus invariantes (texto no vacío, ids únicos crecientes, edición vacía = borrado) y valida al cargar con `isValidTask`; `Storage` serializa una lista plana bajo `todoapp-tasks` tolerante a corrupción; `App` es la fachada que la UI y los tests consumen. La representación elegida es la tarea con `listId` (referencia a su lista), porque preserva `#tasks` como colección plana y convierte la pertenencia en un campo más del snapshot.

1. Extender el estado privado con `#lists` y una constante de lista de entrada permanente (`INBOX`, nombre «Entrada»): la lista de entrada existe siempre y no puede eliminarse —todavía no hay operación de borrado de listas.
2. Añadir `listId` al shape de la tarea en `addTask`, `#snapshot` e `isValidTask`: toda tarea pertenece a una lista existente y el modelo rechaza ítems huérfanos al cargar —la invariante nueva se protege en la misma frontera que las demás.
3. Evolucionar `load` para discriminar formatos: un array plano es el formato antiguo y sus tareas válidas migran a la entrada; un objeto `{lists, tasks}` es el formato nuevo y conserva las listas válidas descartando huérfanas; si los datos omiten la entrada, se recrea —la migración vive en el modelo, donde están las invariantes.
4. Relajar `Storage.loadTasks` para devolver el valor parseado sin exigir array —la validación de forma es del modelo— y mantener `saveTasks` serializando lo que recibe: la persistencia tolera corrupción sin conocer la forma.
5. Hacer que `App.save` persista el estado completo `{lists, tasks}` y que las operaciones existentes actúen sobre la entrada por defecto: UI y tests actuales no cambian; la vista acotada a lista activa es de la tarea 012.
6. Añadir tests de pertenencia, lista de entrada y migración en `tests.html`, sin tocar los existentes.

## Suite de pruebas esperada

- Caso de uso «lista de entrada»: al arrancar vacío existe una lista permanente llamada «Entrada»; cargar datos que la omiten la recrea.
- Caso de uso «pertenencia»: toda tarea creada lleva el id de la entrada; las consultas del modelo pueden acotarse por lista.
- Caso de uso «migración»: `localStorage` con el array plano anterior deja las tareas en la entrada y al guardar se escribe el formato nuevo; con formato nuevo se restauran listas y pertenencias; con JSON corrupto o formato desconocido el estado queda vacío con la entrada, sin errores.
- Caso de uso «sin huérfanas»: un ítem válido cuyo `listId` no existe al cargar no entra al estado.

## Desviaciones del plan

- Tres aserciones de tests existentes que verificaban el JSON crudo persistido se ajustaron al formato nuevo `{lists, tasks}` («editing a task updates state, view and storage», «deleting a task removes it from state, view and storage», «clearing removes all done tasks and keeps the pending»). Motivo: la acción 5 cambia la forma serializada; las aserciones conservan la misma intención verificando la colección `tasks` del objeto persistido. Decisión: ajuste menor dentro del objetivo; no cambia comportamiento observable para el usuario.

## Revisión

- Subagente: 2026-09-25 — Aprueba (primera pasada halló ids de lista duplicables en `load`; corregido con deduplicación y test; la cobertura del acotamiento por lista queda sugerida para la tarea 012)
- Usuario: 2026-09-25 — Aprueba
