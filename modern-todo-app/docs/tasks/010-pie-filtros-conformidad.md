# Pie de lista, filtros con routing y conformidad TodoMVC

## Estado

[ ] Pendiente

## Tipo

desarrollo

## Objetivo

Completar la interfaz con el pie de lista —contador pluralizado, filtros con routing hash y acción de limpiar completadas— y cerrar el conjunto verificando la conformidad de la aplicación con la especificación TodoMVC de extremo a extremo.

## Dependencias

- 009 — el comportamiento completo del ítem.

## Entrada

- La aplicación con lista operable y edición inline.
- La especificación TodoMVC: contador de pendientes pluralizado con el número en `<strong>` («N items left»), filtros en las rutas `#/`, `#/active` y `#/completed` con clase `selected` en el enlace activo, filtrado a nivel de modelo, filtro activo conservado al recargar, ítems actualizados según el filtro vigente y «Clear completed» oculto cuando no hay completadas.

## Resultado esperado

- El contador muestra el número de pendientes con la pluralización correcta y el número marcado con `<strong>`.
- Los filtros navegan por hash, filtran la lista a nivel de modelo, marcan el enlace seleccionado y se conservan al recargar; un ítem que cambia de estado desaparece o aparece según el filtro activo.
- «Limpiar completadas» elimina las tareas completadas, se oculta cuando no hay ninguna y desmarca la casilla de «marcar todas».
- Conformidad verificada: cada cláusula funcional de la spec se comprueba sobre la aplicación y `npm run verify` queda en verde.

## Criterios de calidad

- Contador, filtros y limpieza cubiertos por pruebas de Testing Library por roles y texto visible.
- Recorrido de conformidad documentado en la tarea: la lista de cláusulas funcionales de la spec revisada una a una, sin huecos.
- El estilo del pie usa tokens de `DESIGN.md`, verificado con `aplicar-guia-estilo`; evidencia renderizada de los tres filtros.
- `npm run verify` en verde con cobertura al 100% y el dev server sirviendo la aplicación operativa.

## Procedimiento sugerido

1. Implementar el routing hash y el filtro persistido en el modelo, con el filtrado a nivel de modelo.
2. Implementar el pie: contador, filtros y limpieza, escribiendo primero las pruebas.
3. Recorrer la especificación cláusula a cláusula contra la aplicación servida y cerrar cualquier hueco.
4. Aplicar la guía de estilo con evidencia renderizada de los filtros.
5. Dejar `npm run verify` en verde.

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario: [fecha] — [Aprueba | Solicita cambios]
