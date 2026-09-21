# Estructura de la página y arnés de tests

## Estado

[ ] Pendiente | [ ] En progreso | [ ] En revisión | [ ] Completada | [ ] Bloqueada

## Tipo

desarrollo

## Objetivo

Crear la base de la aplicación —el documento HTML con la estructura de la página y el estilo mínimo— junto con el arnés de tests en el navegador que las tareas siguientes irán alimentando.

## Dependencias

- Ninguna

## Entrada

- Propuesta `docs/proposals/001-app-lista-tareas/propuesta.md`.

## Resultado esperado

- `index.html`, `style.css` y `app.js` en la raíz del proyecto, que se pueden abrir directamente en el navegador sin build.
- Estructura de la página: campo de entrada para nuevas tareas, lista (inicialmente vacía), zona del contador, zona de filtros y acción de limpieza.
- `tests.html` en la raíz, que carga QUnit por CDN e `app.js`, y muestra la página de resultados de QUnit al abrirse.
- `app.js` como script clásico que expone su lógica en un objeto accesible (por ejemplo, un `App` global), sin módulos ES, para que los tests funcionen incluso por `file://`.

## Criterios de calidad

- Al abrir `index.html` en el navegador no hay errores en consola.
- La página muestra la estructura descrita aunque todavía sin comportamiento interactivo.
- Al abrir `tests.html`, QUnit se ejecuta y muestra al menos un test inicial en verde (por ejemplo, que el objeto de lógica existe).
- Los tests no dependen de toolchain ni de servidor.

## Procedimiento sugerido

1. Crear `index.html` con la estructura semántica de la página y enlaces a `style.css` y `app.js`.
2. Crear `style.css` con un estilo mínimo y legible.
3. Crear `app.js` con el punto de entrada y el objeto que expondrá la lógica.
4. Crear `tests.html` con QUnit por CDN, que cargue `app.js` y un primer test de humo.
5. Verificar en el navegador ambas páginas.

## Notas

- QUnit se elige por funcionar sin toolchain y sin servidor: basta abrir `tests.html`, incluso por `file://`.
- Los commits de este proyecto llevan el ámbito `todo-app` en Conventional Commits (`tipo(todo-app): descripción`).

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario: [fecha] — [Aprueba | Solicita cambios]
