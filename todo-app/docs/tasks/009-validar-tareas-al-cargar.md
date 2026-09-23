# Validar la forma de las tareas al cargar desde el almacenamiento

## Estado

[ ] Pendiente | [ ] En progreso | [ ] En revisión | [ ] Completada | [ ] Bloqueada

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

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario: [fecha] — [Aprueba | Solicita cambios]
