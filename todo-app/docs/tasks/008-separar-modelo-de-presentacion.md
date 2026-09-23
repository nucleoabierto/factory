# Separar el modelo de tareas de la persistencia y la presentación

## Estado

[ ] Pendiente | [ ] En progreso | [ ] En revisión | [ ] Completada | [ ] Bloqueada

## Tipo

desarrollo

## Objetivo

Resolver la concentración de características en `App`: extraer el modelo de dominio de tareas (estado, invariantes, operaciones) a un componente que no dependa de `localStorage` ni del DOM, dejando la persistencia y el renderizado como componentes separados que lo usan.

## Dependencias

- Ninguna

## Entrada

- `app.js` — objeto `App` monolítico (dominio + persistencia + presentación).
- `docs/domains/001-lista-de-tareas.md` — fronteras declaradas.
- Informe `docs/reviews/001-revision-arquitectura-dominio.md` (tarea 007), hallazgo H1.
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

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario: [fecha] — [Aprueba | Solicita cambios]
