# Planificación temporal: fechas límite, programación y vista de hoy

> **Tipo:** idea de funcionalidad — tamaño épica (complejidad media-alta)
> **Fecha:** 2026-09

## Problema

La aplicación registra qué hay que hacer pero ignora cuándo. Todas las tareas pendientes pesan igual en la vista: una tarea que vence mañana y otra que podría hacerse el año que viene ocupan el mismo lugar con la misma urgencia visual. La persona tiene que llevar el calendario en la cabeza y revisar la lista entera para descubrir qué le toca hoy.

El coste es doble: tareas urgentes descubiertas tarde y tareas lejanas contaminando la atención cada vez que se abre la aplicación. La lista responde «qué queda pendiente» pero no «qué me toca ahora», que es la pregunta operativa del día a día.

## Qué desbloquea

- **La vista de hoy:** hoy no existe ninguna forma de ver solo lo relevante en este momento. Con fechas, «hoy» se convierte en una consulta del sistema en lugar de un ejercicio mental sobre la lista completa.
- **Programar en lugar de posponer:** una tarea que no toca aún puede registrarse con su fecha y desaparecer hasta entonces. Hoy la única opción es tenerla delante siempre o no anotarla.
- **Vencimientos visibles:** el plazo deja de ser información externa (calendario, memoria) y pasa a ser un dato que la aplicación muestra y ordena.
- **Confianza para capturar a largo plazo:** se puede apuntar algo para dentro de tres meses sin miedo a olvidarlo ni a que moleste hasta entonces — el sistema lo devuelve cuando corresponde.

## Flujos de trabajo que se hacen viables

- Arranque del día: abrir «hoy» y encontrar la jornada ya acotada — lo vencido, lo de hoy, nada más.
- Planificación semanal: recorrer la semana asignando fechas, con visión de carga por día en lugar de una bolsa indiferenciada.
- Revisión de vencidos: una vista de lo que se pasó de fecha para reprogramar o descartar conscientemente, en lugar de descubrirlo por accidente.
- Tareas recurrentes por rutina: lo que vuelve cada semana o cada mes se regenera solo, sin volver a anotarlo.

## Ventajas como producto

- **Frecuencia de uso:** la lista plana se consulta cuando se recuerda; la vista de hoy da un motivo para abrir la aplicación cada mañana. Es el cambio que convierte una herramienta ocasional en hábito diario.
- **Sustituye al calendario para tareas:** captura el caso «no es cita, es cosa por hacer con plazo» que los calendarios resuelven mal, posicionando la app en el espacio entre agenda y notas.
- **Superficie para notificaciones futuras:** sin fechas no hay nada que recordar; con ellas, recordatorios y avisos de vencimiento son una extensión natural en lugar de una funcionalidad inventada.

## Tensión que introduce en el roadmap

Compite con múltiples listas por el puesto de «siguiente épica»: las dos acotan la vista, pero por dimensiones distintas (contexto frente a tiempo), y la primera que llegue define sobre qué eje se organiza el producto. Además se solapa con ella en el diseño —¿las fechas viven por lista? ¿«hoy» mezcla contextos?—, de modo que el orden de ejecución cambia el resultado, no solo la secuencia.
