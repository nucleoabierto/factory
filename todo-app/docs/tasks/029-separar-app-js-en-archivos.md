# Separar app.js en archivos por capa con scripts clásicos

## Estado

[ ] Pendiente | [ ] En progreso | [ ] En revisión | [ ] Completada | [ ] Bloqueada

## Tipo

mantenimiento (refactoring)

## Objetivo

Dividir `app.js` (~1000 líneas) en un archivo por capa —dominio (`TaskList`), infraestructura (`Storage`), presentación (`UI`) y fachada (`App` con el bootstrap)— cargados como scripts clásicos desde `index.html` y `tests.html`, sin cambiar el comportamiento observable ni la API pública.

## Dependencias

- 028

## Entrada

- La decisión de modularización registrada por la tarea 028 (scripts clásicos, namespace compartido, orden de dependencias).
- La separación lógica ya existente en `app.js`: regiones helpers/validación + `TaskList`, `Storage`, `UI`, `App` y bootstrap.
- El hallazgo H1 de `docs/architecture-reviews/003-modularidad-y-tests.md`.

## Resultado esperado

- `app.js` deja de existir como archivo único: cada capa vive en su propio archivo bajo el directorio del proyecto, cargados por `<script>` en orden infraestructura-neutral → dominio → presentación → fachada, compartiendo lo imprescindible por un namespace global.
- `index.html` y `tests.html` referencian los archivos nuevos en lugar de `app.js`.
- La aplicación sigue funcionando abierta como `index.html` (protocolo `file://`), sin servidor ni build.

## Criterios de calidad

- Misma API pública: `window.App` (y `window.UI`, si hoy se expone) conservan sus operaciones; la suite las usa sin reescritura de llamadas.
- La suite de `tests.html` pasa en verde sin cambios de comportamiento en los tests.
- La aplicación funciona al abrir `index.html` directamente (sin servidor).
- El estado privado de `TaskList` (campos `#`) sigue sin ser accesible desde fuera; solo se comparte lo que el contrato exige.

## Procedimiento sugerido

1. Definir el namespace compartido y cortar `app.js` por sus regiones.
2. Actualizar las etiquetas `<script>` de `index.html` y `tests.html` en el orden de dependencias.
3. Verificar la suite en el navegador y la app abierta como archivo.

## Notas

- Los commits de este proyecto llevan el ámbito `todo-app` en Conventional Commits (`tipo(todo-app): descripción`).

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario: [fecha] — [Aprueba | Solicita cambios]
