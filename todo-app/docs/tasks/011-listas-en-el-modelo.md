# Listas nombradas en el modelo y migración de la persistencia

## Estado

[ ] Pendiente | [ ] En progreso | [ ] En revisión | [ ] Completada | [ ] Bloqueada

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

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario: [fecha] — [Aprueba | Solicita cambios]
