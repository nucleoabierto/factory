# Vista «hoy» y exclusión de lo futuro de la vista principal

## Estado

[ ] Pendiente | [ ] En progreso | [ ] En revisión | [ ] Completada | [ ] Bloqueada

## Tipo

desarrollo

## Objetivo

Hacer real la consulta «qué me toca ahora»: una vista «hoy» que acota la lista a lo vencido y lo del día, y la vista principal que deja de mostrar lo programado a futuro hasta que llega su fecha.

## Dependencias

- 017

## Entrada

- La asignación de fecha y la distinción visual de la tarea 017.
- El mecanismo de filtros de vista existente (`FILTERS`, `setFilter`, persistencia del filtro).

## Resultado esperado

- La vista principal muestra lo sin fecha, lo vencido y lo de hoy; lo programado a futuro no aparece hasta que llega su día.
- Existe una vista «hoy» —junto a los filtros o como navegación equivalente— que muestra solo lo vencido y lo del día, como jornada acotada.
- La elección de vista se conserva entre recargas, al estilo del filtro actual.
- El contador de pendientes refleja lo que la vista activa considera presente (decidir y documentar: pendientes visibles o total; la elección queda en el procedimiento).

## Criterios de calidad

- Una tarea con fecha futura no aparece en la vista principal; al llegar su día, aparece.
- La vista «hoy» muestra exactamente lo vencido y lo de hoy, nada más.
- La vista elegida se restaura al recargar; con el dato persistido inválido, se vuelve a la vista por defecto.
- Los filtros todas/pendientes/completadas siguen funcionando dentro de la vista elegida.
- La suite de `tests.html` pasa en verde con tests nuevos de la exclusión de futuras y de la vista «hoy».
- Sin errores en consola.

## Procedimiento sugerido

1. Extender la consulta de tareas visibles del dominio para excluir futuras y para la vista «hoy», usando la clasificación ya existente.
2. Añadir la vista «hoy» al mecanismo de navegación y persistir la elección.
3. Ajustar el contador a la decisión tomada y reflejarla en los tests.
4. Escribir los tests de exclusión de futuras, contenido de «hoy», persistencia de la vista y convivencia con los filtros; verificar en el navegador.

## Notas

- Los commits de este proyecto llevan el ámbito `todo-app` en Conventional Commits (`tipo(todo-app): descripción`).
- La vista «hoy» es transversal por decisión de la propuesta: si la épica de múltiples listas ya está ejecutada, «hoy» mezcla tareas de todas las listas.

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario: [fecha] — [Aprueba | Solicita cambios]
