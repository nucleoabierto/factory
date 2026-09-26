# Periodicidad simple que regenera la tarea al completarla

## Estado

[ ] Pendiente | [ ] En progreso | [ ] En revisión | [x] Completada | [ ] Bloqueada

## Tipo

desarrollo

## Objetivo

Permitir que una tarea con fecha se repita por rutina: declara una periodicidad simple y, al completarse, regenera su próxima aparición en lugar de desaparecer.

## Dependencias

- 018

## Entrada

- La fecha de la tarea, su clasificación y las vistas de la tarea 018.
- La operación de completar existente (`toggleTask`) y el flujo de «limpiar completadas».

## Resultado esperado

- Una tarea con fecha puede marcarse como recurrente con una periodicidad simple (por ejemplo, semanal o mensual).
- Al completar una tarea recurrente, esta vuelve a pendiente con su fecha avanzada a la siguiente ocurrencia, en lugar de quedar completada.
- Se puede quitar la recurrencia de una tarea, que pasa a comportarse como tarea con fecha normal.
- La periodicidad es visible en el ítem y persiste entre recargas.
- La recurrencia requiere fecha: una tarea sin fecha no puede ser recurrente; quitar la fecha quita también la recurrencia.

## Criterios de calidad

- Completar una recurrente la deja pendiente con la fecha de la próxima ocurrencia correcta (semanal: +7 días; mensual: mismo día del mes siguiente o convención documentada).
- La próxima ocurrencia respeta las reglas de la vista: si queda a futuro, desaparece hasta su día.
- Una recurrente nunca entra en «limpiar completadas» por la vía de completarla; sin recurrencia, el comportamiento es el de siempre.
- La suite de `tests.html` pasa en verde con tests nuevos de regeneración, periodicidad y casos borde (fin de mes).
- Sin errores en consola.

## Procedimiento sugerido

1. Añadir la periodicidad al modelo como dato de la tarea ligado a la fecha, con su validación al cargar.
2. Cambiar la operación de completar para que una recurrente regenere su próxima fecha en lugar de quedar completada; documentar la convención de cálculo (incluido el fin de mes).
3. Cablear en la interfaz el marcado y desmarcado de recurrencia y su indicación en el ítem.
4. Escribir los tests de cada periodicidad, de los bordes de calendario y de la interacción con «limpiar completadas»; verificar en el navegador.

## Notas

- Los commits de este proyecto llevan el ámbito `todo-app` en Conventional Commits (`tipo(todo-app): descripción`).
- Las recurrencias complejas quedan fuera de alcance por decisión de la propuesta; la periodicidad se limita a reglas simples.

## Contexto

- Archivos similares:
  - `todo-domain.js`: la tarea `{id, text, done, listId, date}`; `isValidTask`/`isValidList` validan al cargar; `setTaskDate`/`clearTaskDate` gestionan la fecha; `toggleTask` conmuta `done`; `#scopedTasks` fija la pertenencia por vista; `dateStatus` clasifica con `today` inyectable.
  - `todo-ui.js`: la fila de tarea (`renderTasks`) ya renderiza el input de fecha con `data-action="set-task-date"`; `dispatchTable.change` despacha los cambios.
  - `tests.html`: módulo `task dates` fija el patrón de asignar fecha con `App.setTaskDate` + `TestKit.day`.
- Patrones:
  - El dominio decide reglas y produce valores calendario; la vista solo refleja el view-model.
  - `today` inyectable en las operaciones del dominio para tests deterministas.
  - Persistencia tolerante: `load` sanea campos desconocidos o inválidos por ítem.
- Lecciones:
  - `idioma-del-codigo`: código y tests en inglés.
  - `comunicacion-en-codigo`: la convención de cálculo de la próxima ocurrencia se documenta como razón duradera.
  - `fidelidad-al-plan`: diff fiel al plan aprobado.
- Decisiones:
  - Épica 003 (`docs/epics/003-planificacion-temporal.md`): la recurrencia exige fecha y se limita a periodicidad simple; «hoy» comprobable en tests.
  - D001: las capas viven en archivos separados compartiendo `window.Todo`.

## Conectividad

Veredicto: **conectada**.

Todo lo asumido existe: la fecha opcional con validación, `toggleTask`
como punto de regeneración, las vistas que ya ocultan lo futuro (la
próxima ocurrencia a futuro desaparece sola), el despacho delegado para
el nuevo control de la interfaz y la persistencia tolerante que admite
un campo nuevo por tarea.

## Plan técnico

La tarea gana `recur` (`null | 'weekly' | 'monthly'`), ligado a la fecha.
Al completar una recurrente no se regenera en el mismo ítem: queda
`done` como registro histórico —visible en el filtro «Completadas» y
alcanzable por «limpiar completadas» como cualquier completada— y el
dominio crea una copia viva (mismo texto, lista y recurrencia, id nuevo,
pendiente) con la próxima fecha. Convenciones aprobadas: mensual = mismo
día del mes siguiente, cayendo al último día del mes si no existe
(*clamp*: 31 ene → 28/29 feb); la próxima ocurrencia avanza en pasos
hasta quedar estrictamente después del día de referencia.

- [x] Añadir `recur` al modelo: campo de la tarea en `#snapshot`/`addTask`/`load` (inválido o sin fecha → `null`), `isValidTask` tolerante y helper `#nextOccurrence(date, recur)` con la convención documentada
  - Aporta: la periodicidad es un dato del dominio, validado y persistente
  - Contexto: en `load` una tarea con `recur` pero sin fecha válida conserva la tarea y pierde la recurrencia, como hace `date`
- [x] Añadir `setTaskRecur(id, recur)` que exige fecha y acepta `null`/`'weekly'`/`'monthly'`; `clearTaskDate` limpia también `recur`
  - Aporta: el marcado y desmarcado de recurrencia con la invariante «sin fecha no hay recurrencia» defendida en un solo punto
- [x] Cambiar `toggleTask` para que, al completar una recurrente, cree la copia viva con la fecha regenerada además de marcar la original
  - Aporta: el historial de lo realizado y la próxima aparición conviven; una sola notificación por operación
- [x] Cablear la fachada: `App.setTaskRecur` delega y el view-model ya transporta `recur` por el snapshot
  - Aporta: la API pública gana la operación sin exponer el modelo
- [x] Añadir en `todo-ui.js` el selector «Repetir» de la fila (solo con fecha) y la entrada `set-task-recur` en `dispatchTable.change`
  - Aporta: la indicación y el control de la periodicidad en el ítem, por el mecanismo único de eventos
- [x] Añadir los tests de la suite esperada y verificar suite QUnit + `index.html` sobre `file://`
  - Aporta: la red que fija regeneración, periodicidades, bordes de calendario y coexistencia con limpiar

## Desviaciones

- Menor: el test de limpiar completadas comparaba la forma persistida
  exacta; se añadió `recur: null` a la expectativa, consecuencia directa
  del campo nuevo.
- `App.toggleTask` ganó el parámetro `today` para que los tests del
  borde de calendario sean deterministas (patrón ya presente en otras
  operaciones de la fachada).

## Suite de pruebas esperada

Caso de uso: «Repetir una tarea» (marcar periodicidad → completar → la original queda hecha y aparece la copia pendiente con la próxima fecha).

- Una tarea sin fecha no acepta recurrencia; `setTaskRecur` no hace nada (Z).
- Completar una recurrente semanal deja la original completada y crea la copia pendiente con la fecha +7 días, misma lista y texto (O). Ídem mensual con el mismo día del mes siguiente (O).
- Borde de mes: 31 de enero mensual cae al último día de febrero (B); una recurrente vencida salta en pasos hasta la primera fecha posterior a hoy (B).
- La copia histórica aparece en «Completadas» y es limpiable; la viva nunca entra por la vía de completar (I).
- Quitar la fecha quita la recurrencia; quitar la recurrencia devuelve la tarea a su comportamiento normal (E).
- La recurrencia persiste tras recargar (`load` conserva `recur` válido y descarta el inválido o huérfano de fecha); el selector «Repetir» solo aparece con fecha y refleja la periodicidad (I).

## Revisión

- Subagente: 2026-09-26 — Aprueba
- Usuario: 2026-09-26 — Aprueba
