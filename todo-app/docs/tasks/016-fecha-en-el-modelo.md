# Fecha opcional en la tarea y migración de la persistencia

## Estado

[ ] Pendiente | [ ] En progreso | [ ] En revisión | [x] Completada | [ ] Bloqueada

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

## Plan técnico

La tarea es `{id, text, done, listId}`; `isValidTask` valida la forma al cargar y `load` migra los formatos anteriores. La fecha entra como día calendario sin hora, campo opcional que la presentación aún no consume: el usuario no percibe cambios.

- [x] Fijar la representación de la fecha: cadena de día ISO `YYYY-MM-DD` en un campo `date` opcional de la tarea (`null` cuando ausente), con `isValidDate` que exige forma y día real de calendario, y un helper `currentDay()` que produce el día local
  - Aporta: la representación y la comprobabilidad que la épica exige —la clasificación acepta el día de referencia como parámetro
  - Contexto: comparar cadenas ISO ordena igual que fechas; la clasificación no necesita `Date`
- [x] Extender la tarea y la carga: `#snapshot` incluye `date`, `isValidTask` tolera ausencia o fecha bien formada, `load` descarta fechas malformadas conservando la tarea, `App.save` persiste el campo
  - Aporta: los datos del formato anterior sobreviven a la carga y la fecha persiste entre recargas
- [x] Añadir las operaciones de fecha al modelo: `setTaskDate(id, date)` y `clearTaskDate(id)` con las garantías del resto de operaciones (snapshot de salida, notificación), más sus pasarelas en la fachada `App`
  - Aporta: asignar, cambiar y quitar la fecha con la API del dominio
- [x] Añadir la consulta de clasificación: `dateStatus(date, today = currentDay())` devuelve `'overdue' | 'today' | 'future'`, o `null` sin fecha; consulta del dominio expuesta por la fachada
  - Aporta: la clasificación vencida/hoy/futura que las vistas consumirán, decidida en el dominio y comprobable con el día inyectado
- [x] Escribir los tests nuevos en `tests.html`: asignación, cambio y retirada, persistencia y recarga, tolerancia (sin fecha y malformada) y clasificación en los tres bordes
  - Aporta: cubre la suite esperada sin tocar la presentación; la suite existente queda intacta

## Suite de pruebas esperada

- Una tarea nueva no tiene fecha; asignarle una la muestra, cambiarla la sustituye y quitarla la deja como al crearse (caso de uso: asignar fecha a una tarea).
- La fecha asignada persiste tras guardar y recargar (caso de uso: conservar la planificación entre visitas).
- Las tareas persistidas sin fecha cargan y operan con normalidad (caso de uso: migración del formato anterior).
- Una fecha malformada en los datos cargados se descarta sin romper la tarea ni la carga (caso de uso: tolerancia a datos corruptos).
- La clasificación devuelve vencida, hoy o futura para el día anterior, el mismo y el siguiente, y nada sin fecha (caso de uso: distinguir el momento de cada tarea).
- La suite existente sigue en verde: la interfaz funciona como antes (caso de uso: ninguno nuevo — cambio interno).

## Revisión

- Subagente: 2026-09-25 — Aprueba (observaciones menores: tolerancia de fecha en `load` en vez de `isValidTask`; `dateStatus` clasifica la cadena, no la tarea)
- Usuario: 2026-09-25 — Aprueba
