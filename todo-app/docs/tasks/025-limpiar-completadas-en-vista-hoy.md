# Limpiar completadas coherente con la vista activa

## Estado

[ ] Pendiente | [ ] En progreso | [ ] En revisión | [ ] Completada | [ ] Bloqueada

## Tipo

desarrollo

## Objetivo

Que «Limpiar completadas» actúe sobre lo que la vista activa muestra como completadas. En la vista «hoy» el filtro «Completadas» muestra tareas hechas de todas las listas, pero el botón solo borra las de la lista activa: el usuario ve completadas que el botón no limpia.

## Dependencias

- 018

## Entrada

- La vista transversal «hoy» y el `TaskList.clearCompleted(listId)` actual, acotado a una lista.
- El hallazgo 1 del informe de revisión de la tarea 018.

## Resultado esperado

- En la vista principal, «Limpiar completadas» sigue borrando las completadas de la lista activa.
- En la vista «hoy», borra las completadas presentes en esa vista (las de todas las listas), coherente con lo que el filtro «Completadas» muestra.
- El dominio decide la pertenencia; la presentación solo refleja.

## Criterios de calidad

- Limpiar en «hoy» borra las completadas vencidas y de hoy de cualquier lista, y solo esas.
- Limpiar en la vista principal conserva el comportamiento actual.
- Lo completado con fecha futura nunca se alcanza desde «hoy» ni desde la vista principal al limpiar (no es visible en ninguna).
- La suite de `tests.html` pasa en verde con tests nuevos del alcance por vista.

## Procedimiento sugerido

1. Extender `clearCompleted` con los ejes de vista como `visibleTasks`/`pendingCount`.
2. Ajustar `App.clearCompleted` para pasar la vista activa.
3. Escribir tests del borrado por vista y verificar en el navegador.

## Notas

- Los commits de este proyecto llevan el ámbito `todo-app` en Conventional Commits (`tipo(todo-app): descripción`).

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario: [fecha] — [Aprueba | Solicita cambios]
