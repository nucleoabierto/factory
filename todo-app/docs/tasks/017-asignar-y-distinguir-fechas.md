# Asignar, cambiar y quitar la fecha, con distinción visual

## Estado

[ ] Pendiente | [ ] En progreso | [ ] En revisión | [x] Completada | [ ] Bloqueada

## Tipo

desarrollo

## Objetivo

Permitir a la persona poner fecha a una tarea, cambiarla o quitarla desde la interfaz, y distinguir a simple vista en qué situación está cada tarea con fecha: vencida, de hoy o futura.

## Dependencias

- 016

## Entrada

- La fecha opcional de la tarea y la clasificación vencida/hoy/futura de la tarea 016.
- La presentación actual de cada ítem en `UI.render` (checkbox, etiqueta, edición, borrado).

## Resultado esperado

- Cada tarea ofrece un medio de asignar fecha —un campo de día—, cambiarla y quitarla.
- El ítem muestra su fecha cuando la tiene y se distingue visualmente según su situación: vencida, de hoy o futura.
- La fecha se puede editar junto al resto de acciones del ítem sin romper el flujo de edición de texto existente.
- Lo sin fecha no muestra distinción temporal alguna.

## Criterios de calidad

- Asignar una fecha la muestra en el ítem y persiste al recargar.
- Una tarea vencida se distingue claramente de una de hoy y de una futura.
- Quitar la fecha devuelve el ítem a su aspecto sin fecha.
- La edición de texto por doble clic y el resto de acciones siguen funcionando.
- La suite de `tests.html` pasa en verde con tests nuevos del cableado de la fecha en la vista.
- Sin errores en consola.

## Procedimiento sugerido

1. Exponer en la fachada `App` las operaciones de fecha del dominio.
2. Añadir al ítem renderizado el control de fecha y la indicación de su situación, reutilizando la clasificación del dominio.
3. Cablear los eventos de asignar, cambiar y quitar fecha sin interferir con la edición de texto.
4. Dar estilos a la distinción temporal en `style.css` (vencida, hoy, futura).
5. Escribir los tests de la interacción y verificar `index.html` y `tests.html` en el navegador.

## Notas

- Los commits de este proyecto llevan el ámbito `todo-app` en Conventional Commits (`tipo(todo-app): descripción`).

## Plan técnico

Cada fila de tarea se renderiza en `renderTasks` desde `vm.tasks` (ya proyectadas tras la 024) y sus eventos salen por la tabla de dispatch delegada en `document`. `TaskList.dateStatus` ya clasifica la fecha en el dominio.

- [x] Proyectar la situación temporal en el view-model: cada tarea de `vm.tasks` lleva `dateStatus` (`overdue`/`today`/`future`/`null`) calculado por `TaskList.dateStatus`; añadir `setTaskDate`/`clearTaskDate` a `App.actions`
  - Aporta: la vista renderiza la clase sin evaluar reglas, coherente con el contrato cerrado en la tarea 024
- [x] Añadir el control de fecha a la fila: `<input type="date" class="due-date">` en el modo normal del ítem, con `data-action="set-task-date"` y `data-id`; su `value` es la fecha o vacío, y el `li` recibe `due-overdue`/`due-today`/`due-future` según `dateStatus`
  - Aporta: asignar, ver y cambiar la fecha; vaciar el campo la quita
  - Contexto: el modo edición sigue mostrando solo el input de texto; la fecha no interfiere con él
- [x] Registrar la entrada en la tabla de dispatch: `change → 'set-task-date'` llama `setTaskDate(id, value)`, o `clearTaskDate(id)` si el campo quedó vacío
  - Aporta: el cableado usa el mecanismo único de eventos, sin listeners por fila
- [x] Dar estilos a la distinción en `style.css`: color del campo de fecha según la clase del `li` (vencida destacada, hoy marcada, futura neutra), con la paleta existente
  - Aporta: la distinción a simple vista que exige el objetivo
- [x] Escribir los tests de la interacción en `tests.html`: asignar y persistir desde la vista, quitar, las tres clases de distinción con días relativos al día real, y regresión de la edición por doble clic
  - Aporta: cubre la suite esperada sobre el cableado nuevo

## Suite de pruebas esperada

- Asignar una fecha desde el control del ítem la deja en el estado y persiste al recargar (caso de uso: poner fecha a una tarea).
- Cambiar la fecha desde el control actualiza el estado (caso de uso: cambiar la fecha).
- Vaciar el control quita la fecha y el ítem vuelve a su aspecto sin fecha (caso de uso: quitar la fecha).
- El ítem lleva la clase `due-overdue`, `due-today` o `due-future` según su fecha respecto a hoy, y ninguna si no tiene fecha (caso de uso: distinguir la situación de cada tarea).
- Doble clic en la etiqueta y Enter/Escape siguen editando el texto (caso de uso: editar una tarea — regresión).
- La suite completa pasa en verde sin errores en consola.

## Revisión

- Subagente: 2026-09-25 — Aprueba (observaciones: distinción hoy/vencida reforzada con color ámbar)
- Usuario: 2026-09-25 — Aprueba (pidió que el campo de fecha se oculte hasta el hover como sus hermanos; corregido)
