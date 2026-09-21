# Filtros de vista y limpieza de completadas

## Estado

[ ] Pendiente | [ ] En progreso | [ ] En revisión | [ ] Completada | [ ] Bloqueada

## Tipo

desarrollo

## Objetivo

Permitir filtrar la lista por todas / pendientes / completadas y limpiar de una vez las tareas completadas, con tests que lo verifiquen.

## Dependencias

- 004

## Entrada

- La aplicación con creación, listado, contador, operaciones sobre tareas y suite de tests de las tareas anteriores.

## Resultado esperado

- Tres filtros determinan qué tareas se muestran: todas, solo pendientes, solo completadas, con el filtro activo distinguible.
- Una acción «limpiar completadas» elimina de una vez todas las tareas completadas.
- Filtros y limpieza se coordinan con el contador y la persistencia.
- Tests QUnit nuevos que cubren los filtros y la limpieza.

## Criterios de calidad

- Cada filtro muestra exactamente el subconjunto correspondiente y el activo es reconocible.
- Limpiar completadas las borra todas y persiste el resultado al recargar.
- Las operaciones sobre tareas (crear, completar, editar, borrar) siguen funcionando con cualquier filtro activo.
- El contador sigue mostrando el total de pendientes, no el de las tareas visibles con el filtro activo.
- La suite de `tests.html` pasa en verde, incluidos los tests nuevos.
- Sin errores en consola.

## Procedimiento sugerido

1. Añadir el estado de filtro activo y la lógica de filtrado y limpieza al objeto de lógica definido en la tarea 002, con sus tests QUnit.
2. Conectar los controles de filtro, marcar el filtro activo y aplicar el filtro durante el renderizado.
3. Implementar la limpieza de completadas sobre el estado y la persistencia.
4. Verificar en el navegador la combinación de filtros con las operaciones existentes, la recarga y que la suite sigue en verde.

## Notas

- Los commits de este proyecto llevan el ámbito `todo-app` en Conventional Commits (`tipo(todo-app): descripción`).

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario: [fecha] — [Aprueba | Solicita cambios]
