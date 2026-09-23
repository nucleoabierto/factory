# Dejar de exponer el estado mutable del modelo

## Estado

[ ] Pendiente | [ ] En progreso | [ ] En revisión | [ ] Completada | [ ] Bloqueada

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

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario: [fecha] — [Aprueba | Solicita cambios]
