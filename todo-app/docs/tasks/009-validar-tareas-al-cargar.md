# Validar la forma de las tareas al cargar desde el almacenamiento

## Estado

[ ] Pendiente | [ ] En progreso | [ ] En revisión | [x] Completada | [ ] Bloqueada

## Tipo

desarrollo

## Objetivo

Hacer que `load` defienda las invariantes del modelo ante datos externos: los ítems persistidos que no cumplen la forma `{id, text, done}` se descartan o normalizan en lugar de entrar al modelo.

## Dependencias

- Ninguna

## Entrada

- `app.js` — `App.load` acepta cualquier array persistido (líneas 35-47).
- Informe `docs/reviews/001-revision-arquitectura-dominio.md` (tarea 007), hallazgo H2.

## Resultado esperado

- Al cargar, solo entran al modelo ítems con `id` numérico, `text` no vacío y `done` booleano; los demás se descartan.
- Test que cubre storage con ítems corruptos (no solo JSON roto).

## Criterios de calidad

- La validación convive con la tolerancia ya existente a JSON corrupto o ausente.
- `nextId` se recalcula a partir de los ítems válidos.

## Notas

- Origen: hallazgo H2 de la revisión de arquitectura (tarea 007).

## Plan técnico

Subsistema: `Storage.loadTasks` devuelve cualquier array parseado; `TaskList.load` lo asigna tal cual, sin defender la forma `{id, text, done}` de cada ítem.

Acciones:

1. Añadir validación de ítems en `TaskList.load` (el modelo defiende las invariantes, no la infraestructura): descartar ítems sin `id` numérico, sin `text` no vacío o sin `done` booleano. `nextId` se recalcula sobre los ítems válidos.
2. Añadir un test al arnés QUnit: storage con ítems corruptos mezclados con válidos carga solo los válidos.

## Suite de pruebas esperada

- Storage vacío o JSON roto → lista vacía (ya cubierto por tests existentes).
- Storage con ítems corruptos mezclados con válidos → solo entran los válidos y `nextId` queda por encima del mayor id válido.
- La suite existente sigue en verde.

## Revisión

- Subagente: 2026-09-22 — Aprueba (blindaje `isFinite` aplicado)
- Usuario: 2026-09-22 — Aprueba (renombrado el parámetro `t` a `candidate`)
