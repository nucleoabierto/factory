# Lista operable: captura, completar, eliminar y marcar todas

## Estado

[ ] Pendiente

## Tipo

desarrollo

## Objetivo

Convertir la pantalla en una lista de tareas operable: captura de tareas nuevas, ítems que se completan y se eliminan, casilla de «marcar todas» y visibilidad de lista y pie ligada al estado vacío — todo conforme a la especificación TodoMVC y a la guía de estilo.

## Dependencias

- 005 — los tokens de diseño disponibles.
- 007 — el dominio implementado.

## Entrada

- La pantalla mínima actual y los tokens declarados en `DESIGN.md`.
- El dominio implementado por la tarea 007, con el modelo de estado de D002.
- La especificación TodoMVC: input con foco al cargar, Enter crea y limpia, recorte de espacios y rechazo de vacíos, casilla por ítem con clase `completed` en el `<li>`, botón de eliminar visible al hover, «marcar todas» sincronizada con los ítems, y lista y pie ocultos cuando no hay tareas.

## Resultado esperado

- El input de captura crea la tarea al pulsar Enter, recorta los espacios, rechaza entradas vacías y queda listo para la siguiente.
- Cada ítem muestra su título, una casilla de completar que marca el `<li>` como `completed` y un botón de eliminar que aparece al hover.
- La casilla de «marcar todas» alterna el estado de todos los ítems y refleja el estado agregado: se marca cuando todos están completados y se desmarca al quedar alguno pendiente.
- La lista y el pie se ocultan cuando no hay tareas; reaparecen al capturar la primera.

## Criterios de calidad

- Cada comportamiento de la spec cubierto por una prueba de Testing Library, consultando por roles y texto visible y no por detalles internos.
- Todo el estilo nuevo usa tokens de `DESIGN.md`, verificado con `aplicar-guia-estilo` en estático y con evidencia renderizada.
- `npm run verify` en verde con cobertura al 100%.

## Procedimiento sugerido

1. Conectar el dominio a la vista con el modelo de estado decidido, sustituyendo la pantalla estática por la estructura de la spec (cabecera, captura, lista, pie).
2. Implementar la captura y los ítems con sus interacciones, escribiendo primero las pruebas.
3. Implementar «marcar todas» y la visibilidad condicional de lista y pie.
4. Aplicar la guía de estilo con evidencia renderizada.
5. Dejar `npm run verify` en verde.

## Notas

- La edición inline se deja a la tarea 009: esta tarea deja el ítem funcional sin doble clic.
- El pie se implementa vacío o con su estructura mínima; su contenido completo (contador, filtros, limpieza) pertenece a la tarea 010.

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario: [fecha] — [Aprueba | Solicita cambios]
