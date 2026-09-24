# Múltiples listas: organizar las tareas por contexto

## Estado

[ ] Borrador | [p] Pendiente de revisión | [ ] Aprobada | [ ] Descartada

## Problema

La aplicación ofrece hoy un único espacio plano donde conviven todas las tareas de la persona: compras, trabajo, trámites y proyectos personales compiten en la misma vista sin distinción. La única forma de acotar la consulta es por estado (pendiente o completada), que responde «qué estado tiene cada cosa» pero no «a qué parte de mi vida pertenece», que es la pregunta que una persona se hace al sentarse a trabajar.

Afecta a cualquier persona cuya lista crezca más allá de unas pocas tareas, y sucede de forma continua: cada tarea nueva engrosa el mismo saco. El coste es que la lista deja de ser consultable —la vista de pendientes se convierte en ruido— y la persona vuelve a llevar el contexto en la cabeza, que es justo lo que la aplicación nació para evitar. Además, no existe forma de aparcar un proyecto pausado sin borrarlo: su contenido contamina la vista mientras exista. El problema está experimentado, no solo anticipado.

## Oportunidad

Resolverlo permite que el acotado de la consulta pase del estado al contexto, de modo que el volumen total pueda crecer sin degradar la consulta y que un proyecto pueda aparcarse y retomarse sin poda tarea a tarea. Supera a la alternativa actual —filtrar por estado y limpiar completadas— que solo gestiona el tiempo de vida de la tarea, no su pertenencia; y es el prerrequisito estructural para casi toda funcionalidad organizativa posterior (avance por proyecto, fechas de un conjunto, reparto de esfuerzo).

## Forma de solución

La persona puede organizar sus tareas en contextos nombrados y trabajar dentro de uno de ellos cada vez: cada contexto tiene su propio perímetro de tareas con contadores de pendientes propios, se puede capturar rápido en un contexto de entrada sin decidir dónde va cada cosa, y un contexto puede aparcarse —dejar de verse— sin perder su contenido. Categoría: flujo nuevo — hoy no existe ningún recorrido para agrupar tareas por pertenencia ni para consultar «solo el trabajo»; el único acotado disponible es por estado.

## Solución

Se introduce el concepto de lista (contexto) nombrado como agrupación exclusiva de tareas: cada tarea pertenece exactamente a una lista. La aplicación mantiene una lista de entrada permanente donde cae la captura rápida y las tareas existentes. La vista principal pasa a mostrar una lista activa —seleccionable y persistente entre visitas— con sus propios filtros de estado y contador de pendientes, y cada lista muestra cuánto le queda.

Sobre esa base se añade la gestión de listas: crear, renombrar, mover tareas entre listas y eliminar una lista (sus tareas vuelven a la lista de entrada, no se pierden por descuido). Por último, una lista puede archivarse: desaparece de la navegación sin borrar su contenido, y puede reactivarse. Los filtros por estado siguen funcionando igual, pero dentro de la lista activa.

## Alternativas consideradas

- Etiquetas por tarea con filtrado múltiple: se descarta porque la pertenencia a un contexto en esta aplicación es exclusiva —una tarea es «del trabajo» o «de casa»— y las etiquetas cobran una decisión por tarea sin ofrecer a cambio lo que el problema pide: unidad para contar, archivar y cerrar un contexto como conjunto.
- Convención manual en el texto (prefijos como `[trabajo]`): ya disponible hoy sin cambios. Se descarta porque depende de la disciplina de quien escribe, no produce contadores ni vistas propias y no permite aparcar nada: es exactamente la alternativa existente que el problema describe como insuficiente.
- Separar en varias aplicaciones o instancias: se descarta porque rompe el lugar único de captura y obliga a mantener varios perímetros a mano, en contra del propósito del producto.

## Fuera de alcance

- Planificación temporal: fechas de entrega, vencimientos o vistas por día (idea 002 del catálogo de ideas).
- Compartir, colaborar o sincronizar listas entre dispositivos (idea 003).
- Métricas por lista: avance, reparto de esfuerzo o historial agregado; quedan habilitadas estructuralmente pero no se construyen.
- Jerarquía entre listas (sublistas o proyectos anidados).
- Reordenado manual de tareas dentro de una lista ni de las propias listas.

## Investigaciones de apoyo

- Ninguna.

## Borradores

- `01-listas-en-el-modelo.md` — Listas nombradas en el modelo y migración de la persistencia
- `02-navegacion-por-lista.md` — Vista acotada a la lista activa con selector y contadores (depende de 01)
- `03-gestion-de-listas.md` — Crear, renombrar, eliminar listas y mover tareas entre ellas (depende de 02)
- `04-archivar-listas.md` — Archivar y reactivar listas sin perder su contenido (depende de 03)

## Revisión

- Pendiente de decisión del usuario.
