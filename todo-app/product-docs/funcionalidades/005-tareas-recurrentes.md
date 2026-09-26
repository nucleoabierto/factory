# Tareas recurrentes

Repetir una tarea por rutina: a una tarea con fecha se le declara una periodicidad simple —semanal o mensual— y, al completarla, la aplicación conserva la completada como registro y crea una copia pendiente con la próxima fecha. El concepto de recurrencia y sus reglas de cálculo están en el documento de dominio `docs/domains/001-lista-de-tareas.md`; aquí se describe el comportamiento observable.

## Escenarios

Cada escenario está verificado por la suite de pruebas del proyecto (`tests.html`, módulo `recurring tasks`); se cita el título de la prueba que lo cubre.

- **El repetidor solo aparece en tareas con fecha.** Una tarea sin fecha no ofrece el selector «Repetir»; al asignarle fecha aparece con las opciones «No repetir», «Semanal» y «Mensual», y muestra la periodicidad elegida. — «the repeat selector exists only on dated tasks»
- **Sin fecha no hay repetición.** Intentar marcar una tarea sin fecha como recurrente no produce efecto. — «an undated task cannot be recurring»
- **Completar una semanal crea la aparición de la semana siguiente.** La original queda hecha y aparece una copia pendiente, con el mismo texto y la misma lista, siete días después. — «completing a weekly task spawns next week's copy»
- **Completar una mensual conserva el día del mes.** La copia queda el mismo día del mes siguiente; si ese día no existe, cae en el último día del mes (31 de enero → último día de febrero). — «completing a monthly task keeps the day of month», «a monthly occurrence clamps to a shorter month»
- **Una recurrente vencida retoma la primera fecha futura.** Si la rutina quedó atrás, la copia salta hasta la primera ocurrencia posterior al día de hoy, nunca a una fecha ya pasada. — «an overdue recurring task resumes at the next future slot»
- **La completada queda como registro y es limpiable.** La aparición hecha figura en el filtro «Completadas» y «Limpiar completadas» la descarta como a cualquier otra; la copia viva sigue pendiente y nunca se alcanza por esa vía. — «the completed record is cleanable, the copy never done»
- **Quitar la fecha quita también la repetición.** La tarea vuelve a comportarse como una tarea normal. — «removing the date drops the recurrence too»
- **Quitar la repetición devuelve la tarea a lo normal.** Completarla ya no genera copia: queda simplemente hecha. — «removing the recurrence restores plain completion»
- **La periodicidad se conserva entre visitas.** Al recargar, la recurrencia sigue declarada; un valor guardado no válido —o una recurrencia sin fecha— se descarta sin perder la tarea. — «recurrence survives a reload and bad values drop alone»
