# La vista «hoy» y las listas archivadas

## Estado

[ ] Pendiente | [ ] En progreso | [ ] En revisión | [ ] Completada | [ ] Bloqueada

## Tipo

desarrollo

## Objetivo

Decidir y aplicar si la vista «hoy» —transversal— incluye las tareas de listas archivadas. El concepto de lista archivada la declara fuera de la navegación y de las vistas, pero la consulta transversal actual itera todas las tareas sin mirar el flag: «hoy» muestra lo aparcado. La opción coherente con el concepto es excluirlas.

## Dependencias

- 018

## Entrada

- La rama `today` de `TaskList.visibleTasks`, que recorre todas las tareas sin consultar `list.archived`.
- El hallazgo 3 del informe de revisión de la tarea 018 y la divergencia registrada en el documento de dominio `docs/domains/001-lista-de-tareas.md`.

## Resultado esperado

- La decisión queda aplicada en el dominio y documentada: si se excluyen, una lista archivada con tareas vencidas o de hoy no aporta nada a «hoy»; si se incluyen, el documento de dominio y el concepto de archivada se actualizan para reflejar la excepción.
- La divergencia del estado de salud del dominio queda resuelta en uno u otro sentido.

## Criterios de calidad

- El comportamiento elegido se cumple en `visibleTasks` y en `pendingCount` (ambos comparten la pertenencia por vista).
- La documentación de dominio queda coherente con lo implementado.
- La suite de `tests.html` pasa en verde con tests nuevos del caso.

## Procedimiento sugerido

1. Confirmar la decisión con el usuario si hace falta.
2. Ajustar la consulta transversal (o el documento, según la decisión).
3. Escribir los tests y verificar en el navegador.

## Notas

- Los commits de este proyecto llevan el ámbito `todo-app` en Conventional Commits (`tipo(todo-app): descripción`).

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario: [fecha] — [Aprueba | Solicita cambios]
