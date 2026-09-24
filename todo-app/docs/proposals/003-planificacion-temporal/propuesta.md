# Planificación temporal: fechas límite, programación y vista de hoy

## Estado

[ ] Borrador | [ ] Pendiente de revisión | [a] Aprobada | [ ] Descartada

## Problema

La aplicación registra qué hay que hacer pero ignora cuándo: todas las tareas pendientes pesan igual en la vista, y una que vence mañana ocupa el mismo lugar que otra que podría hacerse el año que viene. La persona tiene que llevar el calendario en la cabeza y revisar la lista entera para descubrir qué le toca hoy; la lista responde «qué queda pendiente» pero no «qué me toca ahora», que es la pregunta operativa del día a día.

El coste es doble y continuo: tareas urgentes descubiertas tarde, y tareas lejanas contaminando la atención cada vez que se abre la aplicación. Además, registrar algo para dentro de tres meses obliga a elegir entre tenerlo siempre delante o no anotarlo, lo que desincentiva la captura a largo plazo; y lo que se repite por rutina —cada semana, cada mes— exige volver a anotarlo a mano cada vez.

## Oportunidad

Resolverlo convierte «qué me toca ahora» en una consulta del sistema en lugar de un ejercicio mental sobre la lista completa: lo vencido se hace visible, lo futuro puede registrarse sin ocupar atención hasta que corresponda, las rutinas se sostienen solas y la planificación deja de depender de la memoria y de herramientas externas. Supera a la alternativa actual —llevar los plazos en un calendario aparte o en la cabeza— que separa el «cuándo» del «qué» y obliga a reconciliar ambos a mano.

## Forma de solución

Cada tarea puede llevar un día asociado —opcional, sin horas— y la aplicación gana una consulta por tiempo: una vista «hoy» que muestra lo vencido y lo que toca hoy, las tareas con día futuro permanecen registradas pero fuera de la vista hasta que llega su fecha, lo vencido se distingue visualmente, y una tarea recurrente regenera su próxima aparición al completarse en lugar de tener que volver a anotarla. Categoría: flujo nuevo — hoy no existe ningún recorrido para asignar cuándo corresponde una tarea ni para consultar la lista por tiempo.

## Solución

La tarea incorpora una fecha opcional (día, sin hora) que la persona puede asignar, cambiar o quitar. La fecha divide la consulta en tres situaciones visibles: vencida, de hoy y futura. La vista principal muestra lo vencido y lo de hoy junto a lo sin fecha; lo programado a futuro no aparece hasta que llega su día. Una vista «hoy» dedicada acota la consulta a lo vencido y lo del día, como jornada acotada.

Las tareas recurrentes declaran una periodicidad simple (por ejemplo, semanal o mensual) junto a su fecha: al completarse, la tarea renace con su próxima fecha en lugar de desaparecer, y puede dejar de repetirse quitándole la recurrencia. La propuesta no presupone la épica de múltiples listas: la fecha es un dato de la tarea y la vista «hoy» es transversal; si las listas existen cuando se ejecute, «hoy» mezcla contextos.

## Alternativas consideradas

- Solo fecha de vencimiento, sin programación: se descarta porque cubre la mitad del problema —visibiliza lo urgente pero sigue obligando a tener delante lo lejano o no anotarlo.
- Orden o prioridad manual en lugar de tiempo: se descarta porque no responde «qué me toca ahora» sin que la persona reordene a mano cada día; la urgencia ya está en el dato del plazo.
- Delegar el «cuándo» a un calendario externo: es la alternativa existente que el problema describe como insuficiente: separa el «cuándo» del «qué» y exige reconciliarlos a mano.

## Fuera de alcance

- Horas, citas o duraciones: el día es la unidad; no es una agenda.
- Notificaciones o recordatorios fuera de la aplicación.
- Vista de calendario o de semana completa; la planificación semanal queda servida por las fechas, sin vista dedicada.
- Recurrencias complejas (reglas tipo «cada tercer lunes»): solo periodicidad simple.
- Integración con calendarios externos.
- Interacción fecha×lista más allá de la vista «hoy» transversal (filtrar por lista dentro de «hoy», o vistas temporales por lista).

## Investigaciones de apoyo

- Ninguna.

## Borradores

- docs/tasks/016-fecha-en-el-modelo.md — Fecha opcional en la tarea y migración de la persistencia
- docs/tasks/017-asignar-y-distinguir-fechas.md — Asignar, cambiar y quitar la fecha, con distinción visual de vencida, de hoy y futura (depende de 016)
- docs/tasks/018-vista-hoy-y-programacion.md — Vista «hoy» y exclusión de lo futuro de la vista principal (depende de 017)
- docs/tasks/019-tareas-recurrentes.md — Periodicidad simple que regenera la tarea al completarla (depende de 018)

## Revisión

- Usuario: 2026-09-24 — Aprueba
