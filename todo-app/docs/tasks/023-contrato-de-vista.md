# Contrato de vista: la vista renderiza un snapshot y despacha acciones

## Estado

[x] Completada

## Tipo

mantenimiento (refactoring)

## Objetivo

Romper la dependencia cíclica `App` ↔ `UI` y hacer explícito el contrato de la vista: `UI.render` recibe un view-model de datos planos y los eventos despachan acciones declaradas, en lugar de que la vista conozca la fachada entera. Hallazgo H1 de `docs/architecture-reviews/002-revision-arquitectura-vista.md`.

## Dependencias

- Ninguna

## Entrada

- `app.js`, en concreto `UI` (líneas 342-568), `App` (líneas 572-773) y el suscriptor (líneas 763-766)
- `tests.html`, que consume `App.editingId`, `App.filter`, `App.tasks` y `App.reset` (líneas 28-31, 136-139)
- Informe origen: `docs/architecture-reviews/002-revision-arquitectura-vista.md`

## Resultado esperado

- `app.js` modificado: `UI.render(viewModel)` recibe un objeto de datos planos (`tasks`, `lists`, `activeListId`, `filter`, `editingId`, contadores necesarios) construido por la capa que compone; los eventos de la vista invocan acciones declaradas (objeto de callbacks o `data-action` con dispatch), no a `App` por nombre.
- `editingId` pasa a ser estado de vista poseído por un único componente; `App` deja de mutar miembros de `UI`.
- La superficie pública de `App` que usa el arnés (`tasks`, `lists`, `nextId`, `editingId`, `filter`, `activeListId`, operaciones) sigue disponible —sea delegando al nuevo poseedor del estado o migrando el arnés dentro de la misma tarea.

## Criterios de calidad

- `UI.render` es ejecutable en `tests.html` con un objeto literal construido a mano, sin `App` ni `localStorage`.
- Ninguna línea de `App` accede a miembros de `UI` (verificable con búsqueda de `UI.` dentro del objeto `App`).
- Misma suite en verde y mismo comportamiento observable de la aplicación.
- Decisiones respetadas: D018 —vanilla JS sin build ni framework.

## Procedimiento sugerido

1. Definir la forma del view-model y del objeto de acciones a partir de lo que `render` y `bindEvents` consumen hoy.
2. Introducir el poseedor único del estado de vista (`editingId` y lo que corresponda) y redirigir las mutaciones que hoy hace `App`.
3. Reescribir `UI.render`/`bindEvents` contra el nuevo contrato y adaptar `App` como constructor del view-model.
4. Ejecutar `tests.html` y ajustar el arnés solo si la superficie de `App` cambió.

## Notas

- El estado de la edición se limpia hoy desde seis métodos de `App` (`editTask`, `deleteTask`, `setActiveList`, `deleteList`, `archiveList`, `startEdit`/`cancelEdit`); la reubicación debe conservar esos puntos de limpieza.
- La división de `render` en funciones por región es un paso natural dentro de esta tarea, pero no es obligatoria.

## Plan técnico

El subsistema es un único IIFE en `app.js` con tres componentes —`TaskList` (dominio), `Storage` (persistencia) y `UI` (presentación)— compuestos por la fachada `App`, que también actúa de controlador de sesión (`filter`, `activeListId`). Hoy `UI.render(App)` pesca de la fachada entera y `App` muta `UI.editingId` desde seis métodos: ciclo `App` ↔ `UI`. El cambio introduce un contrato: `App` construye un view-model de datos planos y entrega a `UI` un objeto de acciones; el estado de edición se reubica en un objeto de estado de vista de un solo poseedor.

- [x] Definir el view-model y el mapa de acciones en la capa de composición
  - Aporta: el contrato de la vista queda explícito en un solo punto; añadir datos o acciones al render cambia una firma visible
  - Contexto: `App.viewModel()` produce los datos planos que el render consume hoy (`tasks`, `lists`, `activeListId`, `filter`, `editingId`, contadores); `App.actions` declara los callbacks despachables (`addTask`, `toggleTask`, `startEdit`, `cancelEdit`, `editTask`, `deleteTask`, `moveTask`, `setActiveList`, `setFilter`, `addList`, `renameList`, `archiveList`, `unarchiveList`, `deleteList`, `clearCompleted`)
- [x] Reubicar `editingId` en un objeto de estado de vista de un solo poseedor
  - Aporta: `UI` deja de ser mutada desde fuera; la limpieza de la edición la decide `App` como controlador, en los mismos puntos donde hoy lo hace
  - Contexto: la propiedad `App.editingId` ya existe con getter/setter (`app.js:754-761`); basta cambiar a qué delega —el arnés no se toca. La alternativa de que la vista decida la limpieza reintroduciría el acoplamiento `App` → `UI`
- [x] Reescribir `UI.render(viewModel)` dividido en funciones por región
  - Aporta: la vista se vuelve una función de datos ejecutable con un literal; la división en regiones (lista de tareas, barra de listas, sección de archivadas, pie) hace que cada parte sea legible por separado y acota el crecimiento por funcionalidad
  - Contexto: conservar el foco en el input de edición tras el re-render (`app.js:418-421`); los listeners dinámicos invocan `actions.*`, nunca `App.*`
- [x] Reescribir `bindEvents` como `UI.bind(actions)`
  - Aporta: un solo protocolo de salida de la vista —acciones declaradas— tanto para los elementos estáticos como para los que crea el render, que usa la referencia guardada
  - Contexto: la unificación completa del mecanismo (delegación con `data-action`) es la tarea 024; aquí basta con que todo evento salga por `actions`
- [x] Actualizar el cableado de composición
  - Aporta: cierra el ciclo en un solo sentido —`UI` → `actions` → `App` → `viewModel` → `UI`—; `init` vincula `UI.bind(App.actions)` y `App.render()` pasa `App.viewModel()`; el suscriptor del modelo (`save` + `render`) no cambia

## Suite de pruebas esperada

- El arnés existente queda en verde sin modificarlo: misma superficie de `App` y mismo comportamiento observable — caso de uso: toda la funcionalidad actual.
- Renderizar la vista con un view-model construido literalmente en el test produce el DOM esperado, sin `App` cargado ni `localStorage` — caso de uso: la vista como función de datos.
- Iniciar la edición muestra el input con foco; confirmar con Enter guarda y sale del modo edición; Escape cancela; borrar la tarea o cambiar de lista sale del modo edición — caso de uso: ciclo de vida del estado de vista con un solo poseedor.

## Desviaciones del plan

- `UI` se expone en el global (`window.UI`) junto a `App`. Motivo: la expectativa «render con un view-model literal» exige que el arnés invoque `UI.render` directamente, y solo `App` era global. Decisión: exponerlo con un comentario que declara su propósito en el arnés; no cambia el objetivo ni los criterios de la tarea.
- El mapa de acciones usa nombres orientados a la intención de la vista (`renameActiveList`, `archiveActiveList`, `deleteActiveList`, `activeListName`) en lugar de réplicas de la fachada (`renameList(id, name)`…). Motivo: la vista no debe conocer el concepto «lista activa» para despachar un clic en «renombrar»; el contrato declara lo que la vista puede pedir. Decisión: mantener, dentro del espíritu del plan.

## Revisión

- Subagente: 2026-09-25 — Aprueba
- Usuario: 2026-09-25 — Aprueba
