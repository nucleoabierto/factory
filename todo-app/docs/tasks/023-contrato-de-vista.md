# Contrato de vista: la vista renderiza un snapshot y despacha acciones

## Estado

[ ] Pendiente

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

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario: [fecha] — [Aprueba | Solicita cambios]
