# Planificación temporal: fechas límite, programación y vista de hoy

## Estado

[x] Planificada | [ ] Completada

## Objetivo

Abriendo `index.html`, la persona puede asignar un día a una tarea, cambiarlo o quitarlo; la vista principal muestra lo vencido, lo de hoy y lo sin fecha mientras lo futuro permanece oculto hasta su día; una vista «hoy» acota la consulta a la jornada; y una tarea recurrente regenera su próxima fecha al completarse. Los datos persistidos antes del cambio —tareas sin fecha— siguen funcionando.

## Alcance

- **Dentro:** fecha opcional por tarea (día, sin hora), clasificación vencida/de hoy/futura, distinción visual, exclusión de lo futuro de la vista principal, vista «hoy» persistente y periodicidad simple que regenera la tarea al completarla.
- **Fuera:** horas o duraciones, notificaciones, vista de calendario o semana, recurrencias complejas, integración con calendarios externos e interacción fecha×lista más allá de la vista «hoy» transversal.

## Piezas

- [ ] docs/tasks/016-fecha-en-el-modelo.md — Fecha opcional en la tarea y migración de la persistencia
- [ ] docs/tasks/017-asignar-y-distinguir-fechas.md — Asignar, cambiar y quitar la fecha, con distinción visual
- [ ] docs/tasks/018-vista-hoy-y-programacion.md — Vista «hoy» y exclusión de lo futuro de la vista principal
- [ ] docs/tasks/019-tareas-recurrentes.md — Periodicidad simple que regenera la tarea al completarla

## Plan técnico

- **Orden:** 016 → 017 → 018 → 019, estrictamente secuencial: la fecha precede a su interfaz, la interfaz a las vistas y las vistas a la recurrencia.
- **Dependencias:** cada pieza extiende el mismo `TaskList`/`Storage`/`UI`/`App` de `app.js` y alimenta la suite QUnit de `tests.html`.
- **Decisiones transversales:** la fecha es día calendario sin hora; la clasificación vencida/hoy/futura es consulta del dominio, no de la presentación; la vista «hoy» es transversal aunque existan listas; la recurrencia exige fecha y se limita a periodicidad simple; «hoy» se obtiene de forma comprobable en tests; vanilla JS sin build, `localStorage` tolerante a datos corruptos, QUnit por CDN con aislamiento, Conventional Commits con ámbito `todo-app`.

## Criterio de cierre

Las cuatro piezas completadas, la suite de `tests.html` en verde, la aplicación funcional sin errores en consola y las tareas sin fecha del formato anterior conservadas tras la migración.

## Revisión

- Usuario: 2026-09-24 — Aprueba
