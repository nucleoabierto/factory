# Limpiar completadas coherente con la vista activa

## Estado

[ ] Pendiente | [ ] En progreso | [ ] En revisión | [x] Completada | [ ] Bloqueada

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

## Contexto

- Archivos similares:
  - `todo-domain.js`: `TaskList.visibleTasks` (líneas ~160–181) ya implementa el scope por vista —`main` acota por `listId` y excluye futuras; `today` cruza listas vivas admitiendo solo `overdue`/`today`— y `TaskList.clearCompleted(listId)` borra las completadas de una lista sin mirar la vista.
  - `app.js`: `App.clearCompleted` delega con `App.activeListId` sin vista; los ejes de vista se pasan igual en `App.pendingCount`/`App.visibleTasks`.
  - `tests.html`: los módulos usan `TestKit.resetApp`/`fixture`/`day` y prueban las vistas `main`/`today`; los tests van en inglés.
- Patrones:
  - La pertenencia por vista la decide el dominio; la presentación solo refleja (frontera declarada en `docs/domains/001-lista-de-tareas.md`).
  - El día de referencia es inyectable (`today = currentDay()`) para que los tests fijen «hoy».
- Lecciones:
  - `idioma-del-codigo`: código y tests en inglés.
  - `fidelidad-al-plan`: diff estrictamente fiel al plan aprobado.
- Decisiones:
  - Ninguna adicional aplica: la tarea extiende una operación del dominio dentro de la arquitectura vigente.

## Conectividad

Veredicto: **conectada**.

`TaskList.clearCompleted` y `App.clearCompleted` existen con la forma
que la tarea asume; el mecanismo de ejes de vista (`view`, `today`)
ya está implementado en `visibleTasks`/`pendingCount` del mismo objeto;
la suite tiene harness (`TestKit`) y módulos de vistas para anclar los
tests nuevos.

## Plan técnico

`TaskList` decide la pertenencia por vista: `visibleTasks` calcula el
conjunto visible (`main` acota por lista y excluye futuras; `today` cruza
listas vivas admitiendo vencidas y de hoy) mientras `clearCompleted`
ignora la vista y borra todas las completadas de una lista —incluidas
las futuras, invisibles en ambas vistas—. La tarea reusa la misma regla
de pertenencia para que limpiar borre exactamente lo que la vista activa
muestra como completadas.

- [x] Extraer el cálculo del conjunto visible de `TaskList.visibleTasks` a un privado `#scopedTasks(listId, view, today)` que devuelve las tareas presentes en la vista (sin filtro de estado)
  - Aporta: una única regla de pertenencia por vista que reusan lectura y limpieza
- [x] Reescribir `clearCompleted(listId = INBOX.id, view = 'main', today = currentDay())` para borrar solo las completadas del scope
  - Aporta: limpiar equivale a borrar lo que la vista activa muestra como completadas
  - Contexto: cambio deliberado — una completada con fecha futura en la lista activa ya no se borra desde `main` (no es visible; el criterio lo exige)
- [x] Pasar la vista activa desde `App.clearCompleted` (`App.view`) manteniendo el `today` inyectable
  - Aporta: la fachada lleva la vista activa al dominio, como ya hacen `visibleTasks`/`pendingCount`
- [x] Añadir los tests de la suite esperada en el módulo de vistas de `tests.html`
  - Aporta: la red que fija el alcance por vista
- [x] Verificar la suite QUnit en verde y `index.html` sobre `file://`
  - Aporta: confirma el comportamiento observable

## Suite de pruebas esperada

Caso de uso: «Limpiar completadas» (`data-action="clear-completed"` → `App.clearCompleted` → `TaskList.clearCompleted`).

- En la vista «hoy», limpiar sin completadas visibles no borra nada (Z).
- En la vista «hoy», limpiar borra la completada de hoy aunque viva en otra lista (O).
- En la vista «hoy», limpiar borra las completadas vencidas y de hoy de varias listas, conservando las pendientes y las de listas archivadas (M).
- Una completada con fecha futura no se borra desde «hoy» ni desde la vista principal (B).
- En la vista principal, limpiar borra solo las completadas visibles de la lista activa (regresión del comportamiento declarado).

## Revisión

- Subagente: 2026-09-26 — Aprueba
- Usuario: 2026-09-26 — Aprueba
