# Usar la lista

Cómo trabajar con todo-app en el día a día. Todo se hace desde una sola página; no hay cuentas ni configuración.

## Capturar tareas

Escribe en el campo «¿Qué hay que hacer?» y pulsa Enter. La tarea aparece en la lista activa y el campo queda libre para la siguiente. Los textos vacíos o de solo espacios no crean nada.

## Completar, editar y borrar

- **Completar:** marca la casilla de la tarea; el contador de pendientes baja. Volver a marcarla la reabre.
- **Editar:** doble clic sobre el texto, cambia y confirma con Enter. Escape cancela. Si confirmas el texto vacío, la tarea se borra.
- **Borrar:** el botón × de la tarea la elimina.

## Filtrar y limpiar

Los enlaces del pie —Todas, Pendientes, Completadas— acotan lo que se ve sin tocar el estado: el contador sigue contando los pendientes de la lista activa, no solo los visibles. «Limpiar completadas» descarta las tareas terminadas que la vista activa muestra: en la vista principal, las de la lista activa; en la vista «hoy», las de todas las listas. Una tarea completada con fecha futura no se alcanza nunca al limpiar: no es visible en ninguna vista.

## Organizar con listas

La barra superior gestiona las listas:

- El selector muestra la lista activa con su número de pendientes y permite cambiar de lista; al cambiar, las tareas, los filtros y el contador se acotan a ella.
- **+** crea una lista nueva, que pasa a ser la activa. Los nombres son únicos sin distinguir mayúsculas.
- **✎** renombra la lista activa; **×** la elimina. Eliminar una lista nunca pierde tareas: las suyas pasan a la Entrada.
- La **Entrada** es la lista permanente: existe siempre, recibe las tareas de las listas eliminadas y no puede renombrarse, eliminarse ni archivarse.

## Archivar listas

El botón ↓ aparca la lista activa: desaparece del selector pero conserva todas sus tareas intactas. Las listas archivadas se listan al final, en «Archivadas», con su número de pendientes y un botón Reactivar que la devuelve exactamente como estaba. Una lista archivada no puede ser la lista activa ni recibir tareas movidas.

## Mover tareas entre listas

Cada tarea lleva un desplegable «Mover a…» con el resto de listas vivas. Elegir una la traslada al instante.

## Persistencia

La aplicación guarda todo en el navegador al momento: tareas, listas, filtro elegido y lista activa. Al volver, todo está como se dejó. Si los datos guardados están corruptos o incompletos, la aplicación arranca limpia con la Entrada en lugar de fallar. El detalle del formato está en [Estado persistido](../referencia/estado-persistido.md).
