# Archivar y reactivar listas sin perder su contenido

## Estado

[ ] Pendiente | [ ] En progreso | [ ] En revisión | [ ] Completada | [ ] Bloqueada

## Tipo

desarrollo

## Objetivo

Permitir aparcar una lista —con todo su contenido— de modo que deje de aparecer en la navegación y en las vistas sin borrarse, y reactivarla cuando el trabajo se retoma.

## Dependencias

- 013

## Entrada

- La gestión de listas de la tarea 013 (crear, renombrar, eliminar, mover tareas).

## Resultado esperado

- Una lista puede archivarse: desaparece del selector y de la navegación habitual, conservando sus tareas y su estado.
- Una lista archivada puede consultarse y reactivarse desde un acceso a las listas archivadas.
- Archivar la lista activa devuelve la vista a la lista de entrada.
- La lista de entrada no puede archivarse.
- El estado archivado persiste entre recargas.

## Criterios de calidad

- Archivar una lista oculta su contenido sin destruirlo: al reactivarla, sus tareas y su contador están como estaban.
- Mientras está archivada, sus tareas no aparecen en ninguna vista.
- La lista de entrada no ofrece la acción de archivar.
- La suite de `tests.html` pasa en verde con tests nuevos de archivar, consultar archivadas y reactivar.
- Sin errores en consola.

## Procedimiento sugerido

1. Añadir al dominio el estado archivado de una lista y las operaciones de archivar y reactivar, con la protección de la lista de entrada.
2. Excluir las listas archivadas del selector y ofrecer un acceso para verlas y reactivarlas.
3. Resolver la navegación al archivar la lista activa (volver a la de entrada).
4. Escribir los tests de archivar, reactivar, persistencia del estado y protección de la entrada; verificar en el navegador.

## Notas

- Los commits de este proyecto llevan el ámbito `todo-app` en Conventional Commits (`tipo(todo-app): descripción`).
- Este borrador cierra el flujo «cierre de proyecto» de la idea: aparcar un conjunto sin poda tarea a tarea.

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario: [fecha] — [Aprueba | Solicita cambios]
