# Estructura de la página y arnés de tests

## Estado

[ ] Pendiente | [ ] En progreso | [ ] En revisión | [x] Completada | [ ] Bloqueada

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

## Plan técnico

Subsistema: no hay código todavía; la tarea crea el andamiaje completo —página, estilo, punto de entrada de lógica y arnés de tests— sobre el que las tareas 003–005 colgarán comportamiento.

1. Crear `index.html` con la estructura semántica de la página: encabezado, campo de entrada para nuevas tareas, lista vacía, pie con contador, filtros (todas / pendientes / completadas) y acción de limpieza; enlaza `style.css` y `app.js`. Aporta el esqueleto DOM al que se anclarán los comportamientos siguientes.
2. Crear `style.css` con un estilo mínimo y legible. Aporta una presentación usable sin adelantar clases de estado que corresponden a tareas posteriores.
3. Crear `app.js` como script clásico que define el objeto global `App` con un punto de entrada `init()` que se invoca al cargar el DOM, sin lógica de negocio aún. Aporta la costura donde 003–005 cuelgan la lógica, cumpliendo la decisión transversal de la épica: sin módulos ES, funciona por `file://`.
4. Crear `tests.html` que carga QUnit por CDN, `app.js` y un test de humo. Aporta el arnés que las tareas siguientes alimentan, ejecutable sin toolchain ni servidor.

## Suite de pruebas esperada

- Al abrir `index.html` no hay errores en consola y la página muestra la estructura completa aunque sin comportamiento (caso de uso: abrir la aplicación).
- La lista aparece vacía en el estado inicial, sin tareas preexistentes (caso de uso: consultar la lista sin haber creado nada).
- Al abrir `tests.html`, QUnit se ejecuta y reporta al menos un test en verde: el objeto de lógica `App` existe y expone `init` (caso de uso: verificar el arnés antes de alimentarlo).

## Revisión

- Subagente: 2026-09-21 — Aprueba (tras una corrección menor: regla `.filters a.selected` eliminada para seguir el plan)
- Usuario: 2026-09-21 — Aprueba
