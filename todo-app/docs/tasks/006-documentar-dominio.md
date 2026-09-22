# Documentar el dominio de la aplicación

## Estado

[ ] Pendiente | [ ] En progreso | [ ] En revisión | [x] Completada | [ ] Bloqueada

## Tipo

mantenimiento

## Objetivo

Crear la documentación viva del dominio de todo-app con el skill `documentar-dominio`: primer documento de dominio en `todo-app/docs/domains/` (la documentación vive junto al código que describe) describiendo el modelo, el lenguaje ubicuo y las fronteras de la aplicación de lista de tareas, con anclas al código de `app.js`.

## Dependencias

- Ninguna

## Entrada

- El skill `documentar-dominio` del proyecto raíz y su plantilla `assets/domain.txt`.
- `todo-app/app.js` como código del dominio; `todo-app/docs/` (propuesta, épica, tareas) como contexto del dominio.
- `todo-app/docs/domains/README.md` como índice.

## Resultado esperado

- Un documento de dominio `todo-app/docs/domains/001-*.md` que documenta el dominio de todo-app: propósito, lenguaje ubicuo con anclas a `app.js`, modelo (entidad tarea, invariantes, operaciones), fronteras, decisiones relevantes y estado de salud.
- El índice `todo-app/docs/domains/README.md` con la entrada del dominio.

## Criterios de calidad

- Cada término del glosario lleva su ancla a un elemento de `app.js` (o del HTML si aplica) y opcionalmente su origen (tarea de todo-app).
- Las invariantes documentadas existen realmente en el código.
- Las fronteras declaran qué es dominio y qué es infraestructura/presentación.

## Procedimiento sugerido

1. Invocar `documentar-dominio` sobre el dominio de todo-app.
2. Crear el documento y actualizar el índice.

## Notas

- El índice de dominios vive junto al código: `todo-app/docs/domains/`, no en la raíz del repositorio.

## Revisión

- Subagente: 2026-09-22 — Aprueba
- Usuario: 2026-09-22 — Aprueba
