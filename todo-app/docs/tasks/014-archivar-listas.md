# Archivar y reactivar listas sin perder su contenido

## Estado

[ ] Pendiente | [ ] En progreso | [ ] En revisión | [x] Completada | [ ] Bloqueada

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

## Plan técnico

El subsistema es `app.js`: `TaskList` ya gestiona listas (`addList`/`renameList`/`deleteList`/`moveTask`) y `App` mantiene la lista activa persistida. Archivar añade un estado por lista —flag `archived`— que la retira de la navegación sin tocar sus tareas.

- [x] Añadir el flag `archived` a la lista y las operaciones `archiveList(id)`/`unarchiveList(id)` a `TaskList`
  - Aporta: el dominio conoce el estado archivado con su invariante —la entrada no puede archivarse— y las transiciones notifican como el resto de operaciones
  - Contexto: `TaskList.load` debe normalizar las listas persistidas a `{id, name, archived}` (`archived === true`) porque datos previos a esta tarea carecen del flag; el veto de la entrada sigue el patrón de `renameList`/`deleteList`
- [x] Acotar en `App` la lista activa a listas no archivadas y exponer `archiveList`/`unarchiveList`
  - Aporta: una lista archivada nunca puede ser la activa —ni por `setActiveList` ni por restauración en `load`— y archivar la activa devuelve la vista a la entrada con persistencia corregida
  - Contexto: el patrón de corrección previa a la notificación es el de `App.deleteList` (corregir `activeListId` antes de delegar para que el render del notify ya sea correcto)
- [x] Excluir las archivadas del selector y del «mover a…», y añadir el botón de archivar y el acceso de archivadas en `UI` e `index.html`
  - Aporta: la navegación solo ofrece listas vivas y el acceso permite consultar y reactivar archivadas
  - Contexto: botón `↓` (`#archive-list`, cuarto en `.list-bar`, deshabilitado en la entrada como renombrar/eliminar); el acceso es un `<details id="archived-section">` nativo con `<summary>` «Archivadas (n)» y una `<ul id="archived-list">` de ítems con nombre, contador y botón «Reactivar» por lista — sin JS de toggle
- [x] Estilar el botón y la sección de archivadas en `style.css` coherentes con la paleta existente
  - Aporta: los elementos nuevos llegan terminados también en lo visual
  - Contexto: `.list-action` ya define la caja cuadrada; la sección de archivadas sigue la tipografía secundaria del footer
- [x] Escribir los tests de archivar, consultar archivadas, reactivar, persistencia y protección de la entrada
  - Aporta: la suite cubre los criterios de calidad de la tarea
  - Contexto: módulo nuevo en `tests.html` con fixture ampliado al botón de archivar y la sección `<details>`

## Suite de pruebas esperada

- Archivar una lista la oculta del selector y sus tareas dejan de aparecer en cualquier vista, conservándose en el estado (archivar sin destruir).
- Archivar la lista activa devuelve la vista y el valor persistido a la entrada (resolución de navegación).
- Las archivadas aparecen en el acceso «Archivadas» con su contador de pendientes; reactivar las devuelve al selector con tareas y contador intactos (consultar y reactivar).
- El estado archivado persiste entre recargas y los datos antiguos sin flag cargan como no archivados (persistencia y tolerancia).
- La entrada no puede archivarse: la operación devuelve null y el botón está deshabilitado (protección de la entrada).
- Ni el selector ni el «mover a…» ofrecen listas archivadas, y una activa persistida que llega archivada cae a la entrada (exclusión de archivadas).

## Revisión

- Subagente: 2026-09-25 — Aprueba
- Usuario: 2026-09-25 — Aprueba
