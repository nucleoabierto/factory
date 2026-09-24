# Fecha opcional en la tarea y migración de la persistencia

## Estado

[ ] Pendiente | [ ] En progreso | [ ] En revisión | [ ] Completada | [ ] Bloqueada

## Tipo

desarrollo

## Objetivo

Introducir en el dominio la fecha opcional de la tarea —día, sin hora— con su validación y su persistencia, tolerando los datos ya guardados que no la tienen. Sin cambios visibles para el usuario todavía.

## Dependencias

- Ninguna.

## Entrada

- El modelo `TaskList` en `app.js`, con la tarea `{id, text, done}`, sus invariantes y `isValidTask` al cargar.
- La capa `Storage` con la clave `todoapp-tasks` y tolerancia a datos corruptos.
- La suite QUnit en `tests.html` con aislamiento de `localStorage`.

## Resultado esperado

- La tarea admite una fecha opcional como día calendario (sin componente horaria), ausente por defecto.
- El dominio ofrece operaciones para asignar, cambiar y quitar la fecha de una tarea, con las mismas garantías de encapsulamiento que el resto de operaciones.
- La validación al cargar acepta tareas con fecha bien formada, tolera las que no la tienen (datos del formato anterior) y descarta fechas malformadas sin romper la carga.
- La fecha persiste y se restaura entre recargas.
- El dominio sabe clasificar una tarea con fecha en vencida, de hoy o futura respecto al día actual, como consulta reutilizable.
- La interfaz sigue funcionando como antes: el usuario no percibe cambios.

## Criterios de calidad

- Las tareas persistidas sin fecha sobreviven a la carga y siguen funcionando.
- Una fecha asignada persiste al recargar y puede quitarse, dejando la tarea como estaba.
- La clasificación vencida/hoy/futura es correcta en los bordes: día anterior, mismo día y día siguiente.
- Las invariantes existentes se mantienen: sin tareas vacías, identificadores únicos y crecientes.
- La suite de `tests.html` pasa en verde con tests nuevos de fecha, migración y clasificación.
- Sin errores en consola.

## Procedimiento sugerido

1. Decidir la representación de la fecha (cadena de día ISO o equivalente) y cómo se obtiene «hoy» de forma comprobable en tests.
2. Extender la tarea y `isValidTask` para la fecha opcional, tolerando su ausencia.
3. Añadir las operaciones de fecha y la consulta de clasificación al modelo.
4. Mantener la fachada `App` compatible para que la presentación y los tests existentes sigan pasando sin cambios.
5. Escribir los tests de asignación, persistencia, tolerancia de datos y clasificación; verificar en el navegador.

## Notas

- Los commits de este proyecto llevan el ámbito `todo-app` en Conventional Commits (`tipo(todo-app): descripción`).

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario: [fecha] — [Aprueba | Solicita cambios]
