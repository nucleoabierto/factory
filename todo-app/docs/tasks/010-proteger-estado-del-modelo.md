# Dejar de exponer el estado mutable del modelo

## Estado

[ ] Pendiente | [ ] En progreso | [ ] En revisión | [x] Completada | [ ] Bloqueada

## Tipo

desarrollo

## Objetivo

Que el estado del dominio (`tasks`, `nextId`) solo pueda mutar a través de las operaciones del modelo, en lugar de estar expuesto públicamente en `App`.

## Dependencias

- 008 (el refactor de separación define dónde vive el estado; resolver H3 dentro de ese refactor puede hacer esta tarea innecesaria)

## Entrada

- `app.js` — `App.tasks` y `App.nextId` públicos y mutables (líneas 9-10).
- Informe `docs/reviews/001-revision-arquitectura-dominio.md` (tarea 007), hallazgo H3.

## Resultado esperado

- El estado no es accesible para mutación directa desde fuera del componente de dominio; la lectura expone lo necesario para renderizar.
- Los tests existentes siguen pasando (los que lean estado usan la interfaz pública acordada).

## Criterios de calidad

- No se rompe el arnés de tests: si los tests acceden a `App.tasks`, se define una consulta pública equivalente.

## Notas

- Origen: hallazgo H3 de la revisión de arquitectura (tarea 007).

## Plan técnico

Subsistema: `TaskList` es un objeto literal con `tasks` y `nextId` públicos; la fachada los expone por accessors, así que cualquier código puede mutar el estado saltándose los defensores de invariantes. Los tests usan esa mutación para resetear (`App.tasks = []`, `App.nextId = 1`).

Acciones:

1. Convertir `TaskList` en una clase con campos privados (`#tasks`, `#nextId`, `#listeners`): el estado ya no es un campo accesible.
2. Exponer consulta de solo lectura: `tasks()` devuelve una copia; la fachada `App.tasks` la delega para lectura.
3. Añadir `reset()` en el modelo y `App.reset()` en la fachada como operación pública de reinicio — lo que los tests necesitan.
4. Actualizar `tests.html`: sustituir las mutaciones directas (`App.tasks = []`, `App.nextId = 1`, `App.tasks = [...]`) por `App.reset()`; las lecturas siguen iguales.
5. Actualizar el documento de dominio si cambian anclas.

Decisión: clase ES6 con `#privados` en lugar de factoría con closure — los navegadores actuales soportan ES6 y la clase expresa mejor el modelo; sigue siendo vanilla JS sin build (D018).

## Suite de pruebas esperada

- No es posible mutar el estado del modelo desde fuera sin pasar por sus operaciones (`App.tasks = [...]` ya no inyecta estado).
- `App.reset()` deja el modelo vacío con `nextId` en 1 (necesidad del arnés de tests).
- La suite QUnit completa en verde con `tests.html` actualizado.

## Revisión

- Subagente: 2026-09-22 — Solicita cambios (copias profundas, export `global.TaskList`, nit de ancla — todo corregido)
- Usuario: 2026-09-23 — Aprueba (comentario de `reset()` acotado a la razón duradera)

## Desviaciones del plan

- La fachada expone `App.tasks`/`App.nextId` como getters de solo lectura que devuelven copias; `tests.html` migró sus mutaciones a `App.reset()`.
- `TaskList` se implementó como clase ES6 con campos `#privados` (decidido con el usuario) en lugar de factoría con closure.
