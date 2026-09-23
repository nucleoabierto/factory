# Separar el modelo de tareas de la persistencia y la presentación

## Estado

[ ] Pendiente | [ ] En progreso | [ ] En revisión | [x] Completada | [ ] Bloqueada

## Tipo

desarrollo

## Objetivo

Resolver la concentración de características en `App`: extraer el modelo de dominio de tareas (estado, invariantes, operaciones) a un componente que no dependa de `localStorage` ni del DOM, dejando la persistencia y el renderizado como componentes separados que lo usan.

## Dependencias

- Ninguna

## Entrada

- `app.js` — objeto `App` monolítico (dominio + persistencia + presentación).
- `docs/domains/001-lista-de-tareas.md` — fronteras declaradas.
- Informe `docs/architecture-reviews/001-revision-arquitectura-dominio.md` (tarea 007), hallazgo H1.
- D018 — vanilla JS sin build ni framework (`docs/decisions/` del repositorio raíz).

## Resultado esperado

- Las operaciones del dominio (crear, completar, editar, borrar, filtrar, limpiar, contar) son ejecutables sin DOM ni `localStorage`.
- La persistencia y el renderizado son componentes separados que dependen del modelo, no al revés.
- Los tests existentes siguen pasando.

## Criterios de calidad

- La separación se resuelve con objetos/módulos del lenguaje; no se añade framework ni build (D018).
- Cada invariante sigue defendida en un único lugar tras el refactor.
- El documento de dominio se actualiza si las anclas o las fronteras cambian.

## Notas

- Origen: hallazgo H1 de la revisión de arquitectura (tarea 007). H3 (estado mutable expuesto) puede resolverse dentro de este refactor.

## Plan técnico

Subsistema: `app.js` expone un único objeto `App` que mezcla estado de dominio (`tasks`, `nextId`), persistencia (`load`/`save` → `localStorage`), estado y renderizado de UI (`editingId`, `render`, `init` → DOM). Los tests QUnit mutan `App.tasks`/`App.nextId` y llaman `App.load` directamente, así que la API pública debe seguir existiendo.

Acciones:

1. Extraer el modelo de dominio `TaskList`: estado (`tasks`, `nextId`) más las operaciones e invariantes (add, toggle, edit, delete, pendingCount, visibleTasks, clearCompleted, findTask) en un objeto sin `localStorage` ni `document`. Las operaciones notifican el cambio a suscriptores en lugar de llamar a `save`/`render` — rompe el acoplamiento dominio→infraestructura/presentación.
2. Extraer la persistencia `Storage`: carga y guarda la lista y el filtro con su tolerancia a datos corruptos; recibe y devuelve datos, no conoce el DOM.
3. Extraer la presentación `UI`: `render` e `init` con `editingId` y los listeners DOM; consume consultas del modelo y llama a sus operaciones.
4. Convertir `App` en fachada de composición: crea los tres componentes, suscribe el cambio del modelo a persistir+renderizar, y expone la API pública actual (`tasks`, `nextId`, `editingId`, `filter`, `init`, operaciones) delegando — compatibilidad con `tests.html` e `index.html` sin tocarlos.
5. Actualizar el documento de dominio si las anclas cambian (las operaciones vivirán en `TaskList`, no en `App`).

## Suite de pruebas esperada

- Las operaciones del dominio funcionan sin DOM ni `localStorage`: ejecutar el modelo en un contexto sin ambos mantiene crear/completar/editar/borrar/filtrar.
- La suite QUnit existente pasa íntegra sin modificar `tests.html` — regresión del refactor.
- Al crear/editar/borrar con DOM y storage presentes, la vista y `localStorage` se actualizan (cubierto por los tests existentes).

## Desviaciones del plan

- La fachada `App` delega `tasks`, `nextId` y `editingId` a los componentes mediante `Object.defineProperty` (get/set) en lugar de campos propios: necesario para que `tests.html` siga mutando `App.tasks`/`App.nextId` sin cambios.
- `TaskList` se expone también como `global.TaskList`: permite verificar el modelo sin pasar por la fachada.
- `UI.editingId` vive en `UI`; el borrado al editar/borrar lo orquesta la fachada `App` (el modelo no conoce estado de UI).

## Revisión

- Subagente: 2026-09-22 — Solicita cambios (regresión de `editingId` corregida; sin cambios restantes)
- Usuario: 2026-09-22 — Aprueba
