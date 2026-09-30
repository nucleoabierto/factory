# Pantalla mínima propia verificada de extremo a extremo

## Estado

[x] Completada

## Tipo

desarrollo

## Objetivo

Sustituir el contenido del punto de partida de la pila por una pantalla mínima propia de la aplicación —su identidad visible— y comprobarla con la suite, cerrando el recorrido completo del terreno: el código se compila, se sirve, se muestra y se verifica.

## Dependencias

- 003 — la verificación ejecutable establecida.

## Entrada

- El proyecto inicializado con su suite de verificación funcionando.

## Resultado esperado

- La aplicación muestra una pantalla propia, con la identidad de la aplicación, sin restos del contenido del generador.
- La suite comprueba lo que la pantalla muestra y permanece en verde.

## Criterios de calidad

- No queda contenido del punto de partida de la pila: ni textos, ni estilos, ni recursos.
- La prueba de la pantalla comprueba su contenido visible, no detalles internos.
- La verificación completa queda en verde.

## Procedimiento sugerido

1. Reemplazar el componente inicial por la pantalla propia mínima.
2. Retirar los recursos del generador que ya no se usan.
3. Actualizar la prueba para que compruebe la pantalla real.
4. Ejecutar la verificación completa en verde.

## Notas

- La pantalla no gestiona tareas: eso es la idea 002. Es el cascarón visible que demuestra que el terreno funciona.
- El diseño visual es el mínimo viable; la guía de estilo del producto queda fuera de esta propuesta.

## Contexto

- Archivos similares: ninguno aplica como modelo interno — es la primera pantalla propia del subproyecto; los archivos que la tarea sustituye son el contenido del scaffolding: `src/components/App.tsx` + `App.css`, `src/index.css`, `src/assets/` (hero.png, react.svg, vite.svg), `public/icons.svg`, `public/favicon.svg` y el `<title>` de `index.html`. La prueba semilla `src/components/App.test.tsx` es el modelo de cómo se verifica contenido visible.
- Patrones: guía de arquitectura de la épica `docs/epics/001-andamiaje-proyecto.md` — `npm run verify` es el contrato y esta tarea lo cierra de extremo a extremo; estructura de módulos vigente (`src/components/`, `*.test.tsx` junto al componente); criterio de la tarea: la prueba comprueba contenido visible, no detalles internos.
- Dominio: ninguna aplica — el subproyecto no tiene `docs/domains/` y la pantalla no gestiona tareas (idea 002).
- Producto: ninguna aplica — no hay documentación de producto; la pantalla es el primer comportamiento observable.
- Lecciones: `validacion` (la pantalla es el estímulo real que la suite comprueba de extremo a extremo); `nomenclatura` (componentes y recursos nombrados por su contenido); `alcance` (restos del generador dentro del alcance; hallazgos ajenos se reportan).
- Decisiones: `D001` del subproyecto — la pila ya fijada no se reabre; la pantalla se escribe con React + CSS del proyecto.

## Conectividad

**Conectada.** Todo lo que la tarea asume existe: el proyecto inicializado con su suite en verde está en `modern-todo-app/` (tareas 002–003 ejecutadas); el contenido del scaffolding a sustituir está localizado en `src/components/`, `src/index.css`, `src/assets/`, `public/` e `index.html`; la prueba semilla `App.test.tsx` es el ancla donde se verifica la pantalla. No requiere piezas externas nuevas.

## Plan técnico

Subsistema: `src/` — se sustituye el contenido del scaffolding por una pantalla propia mínima con la identidad de la aplicación, y la suite ya existente la verifica de extremo a extremo. Contenido: un `main` con `h1` con el nombre de la aplicación, una línea descriptiva y una zona de estado vacío estática — identidad visible sin funcionalidad de dominio.

- [x] Sustituir `src/components/App.tsx` por la pantalla propia mínima
  - Aporta: marcado semántico (`main`, `h1`) con la identidad de la aplicación; el contador y las secciones del generador desaparecen.
  - Contexto: texto en español, coherente con el proyecto; nada de gestión de tareas (idea 002).
- [x] Reescribir `src/components/App.css` y `src/index.css` con estilos propios mínimos
  - Aporta: ningún estilo del generador queda; el diseño es el mínimo viable — la guía de estilo queda fuera de alcance.
- [x] Retirar los recursos del generador y aportar los propios
  - Aporta: se eliminan `src/assets/` (hero.png, react.svg, vite.svg) y `public/icons.svg`; `public/favicon.svg` se sustituye por uno propio mínimo; `index.html` ajusta `lang="es"` (el `<title>` ya es propio desde la 002).
- [x] Actualizar `App.test.tsx` para comprobar el contenido visible de la pantalla real
  - Aporta: la suite verifica lo que el usuario ve —encabezado y estado vacío— por rol y texto, no detalles internos.
- [x] Ejecutar `npm run verify` en verde y comprobar la pantalla servida por el dev server
  - Aporta: el recorrido completo del terreno —compila, sirve, muestra, verifica— cerrado de extremo a extremo.

## Suite de pruebas esperada

Caso de uso «ver la pantalla de la aplicación» (arnés, sin letra ZOMBIE):

1. `npm run verify` termina en verde sobre la pantalla propia.
2. La prueba comprueba el contenido visible: el encabezado principal muestra la identidad de la aplicación y el estado vacío está presente.
3. Regresión: retirar un texto visible de la pantalla rompe la prueba → `verify` en rojo → revertido → verde.
4. Higiene: ninguna referencia a recursos del generador queda en `src/`, `public/` ni `index.html` (`vite`, `react` logos, `icons.svg`, «Get started» — cero coincidencias).
5. El servidor de desarrollo sirve la pantalla propia.

## Revisión

- Subagente: 2026-09-30 — Aprueba (corregida la línea obsoleta de `src/assets/` en el README)
- Usuario: 2026-09-30 — Aprueba (con la meta de cobertura del 100% añadida durante la revisión)

## Desviaciones del plan

- A petición del usuario durante la revisión, la verificación exige **cobertura del 100%**: se instaló `@vitest/coverage-v8` (5.0.1, madura), `npm test` corre con `--coverage` y los umbrales `lines/functions/branches/statements: 100` se configuraron en `vite.config.ts`, excluyendo `main.tsx`, `setupTests.ts` y los propios tests. El ciclo rojo-verde quedó demostrado también para la cobertura (un archivo sin pruebas tumba `verify`).
- `coverage/` quedó añadido a `.gitignore`, `.prettierignore` y a los `globalIgnores` de ESLint — su salida generada rompía el lint por warnings.
