# Vista «hoy» y programación

Consultar qué toca ahora: la vista principal deja fuera lo programado a futuro y una vista «hoy» acota la consulta a la jornada, mezclando todas las listas vivas. Los conceptos de fecha, clasificación temporal y vista están en el documento de dominio `docs/domains/001-lista-de-tareas.md`; aquí se describe el comportamiento observable.

## Escenarios

Cada escenario está verificado por la suite de pruebas del proyecto (`tests.html`, módulo `views: main and today`); se cita el título de la prueba que lo cubre.

- **La vista principal esconde lo programado a futuro.** Lo sin fecha, lo vencido y lo de hoy siguen visibles; una tarea con fecha futura no aparece hasta que llega su día. — «the main view hides future tasks only»
- **La vista «hoy» muestra solo la jornada.** Entran las tareas vencidas y las de hoy; ni las sin fecha ni las futuras. — «the today view shows exactly overdue and today tasks»
- **«Hoy» mezcla todas las listas vivas.** La vista es transversal: reúne lo vencido y lo del día sin importar a qué lista pertenece cada tarea, mientras la vista principal sigue acotada a la lista activa. — «the today view crosses lists»
- **Las listas archivadas no alimentan «hoy».** Una lista aparcada con tareas vencidas o del día no aparece en la vista «hoy» ni suma en su contador, al igual que está fuera de la navegación; al reactivarla, sus tareas vuelven a «hoy». — «the today view excludes archived lists», «reactivating a list brings its tasks back to today»
- **La vista elegida se conserva entre visitas.** Al recargar vuelve la vista activa; un valor guardado no válido devuelve a la vista principal. — «the view persists and tolerates corrupted values»
- **Los filtros conviven con la vista.** Dentro de «hoy» se puede seguir acotando por todas, pendientes o completadas. — «filters keep working inside the today view»
- **El contador cuenta lo presente en la vista.** El pie muestra los pendientes que la vista activa considera presentes, no el total. — «the counter reflects the pending of the active view»
- **El enlace de la vista activa aparece marcado.** — «the active view link carries the selected class»
- **El cambio de vista se hace desde el conmutador del pie.** Los enlaces «Lista» y «Hoy» alternan la vista. — «switching views through the dispatched click»
