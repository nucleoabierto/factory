# Separar app.js en archivos por capa con scripts clásicos

## Estado

[ ] Pendiente | [ ] En progreso | [ ] En revisión | [x] Completada | [ ] Bloqueada

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

## Contexto

- Archivos similares:
  - `app.js` (~1000 líneas): IIFE `(global) => {}` con cuatro regiones —helpers/constantes + `TaskList` (dominio, líneas 1–338), `Storage` (infraestructura, ~340–427), `UI` + `dispatchTable` + render helpers (presentación, ~428–706), `viewState` + `App` + bootstrap (fachada, ~707–1000)—. Expone `global.App` y `global.UI`.
  - `tests-helpers.js`: script clásico que comparte `TestKit` como `const` de nivel superior —precedente del proyecto de compartir entre scripts por el entorno léxico global, sin objeto namespace explícito—.
  - `index.html` (línea 67) y `tests.html` (línea 14): cargan `app.js` con un único `<script>`; `tests.html` además carga `tests-helpers.js` después.
- Patrones:
  - Cada región se abre con un comentario de capa que declara lo que conoce y lo que no; el código va en inglés.
  - Los scripts clásicos comparten los `const`/`class` de nivel superior por el entorno léxico global; solo lo que el contrato exige se cuelga de `window` (`App`, `UI`).
  - La suite consume `window.App` (366 usos) y `window.UI`; nada referencia `TaskList`, `Storage` ni `taskList` desde fuera.
- Lecciones:
  - `idioma-del-codigo`: código y comentarios en inglés.
  - `comunicacion-en-codigo`: comentarios con razones duraderas, no narrativa de sesión (al mover las regiones, mantener sus comentarios de capa).
  - `fidelidad-al-plan`: diff estrictamente fiel al plan; extras se declaran como desviación.
- Decisiones:
  - `D001` (`docs/decisions/D001-division-app-js-scripts-clasicos.md`): un archivo por capa, scripts clásicos en orden infraestructura-neutral → dominio → presentación → fachada, compartiendo lo imprescindible por un namespace global; ES modules descartados.

## Conectividad

Veredicto: **conectada**.

Todo lo que la tarea asume existe con la forma esperada: `app.js`
contiene las cuatro regiones ya separadas lógicamente (helpers +
`TaskList`, `Storage`, `UI`, `App` + bootstrap dentro del IIFE);
`index.html` y `tests.html` lo cargan como script clásico; la decisión
D001 está registrada y declara el mecanismo (scripts clásicos, orden de
dependencias, namespace compartido); `tests-helpers.js` demuestra que la
suite ya funciona con scripts clásicos sobre `file://`.

## Plan técnico

`app.js` es un IIFE `(global) => {}` con cuatro regiones ya separadas
lógicamente que comparten `const`/`class` por el scope de la función y
exponen solo `window.App` y `window.UI`. La división corta por esas
regiones, mantiene un IIFE por archivo y comparte lo imprescindible a
través del namespace global `window.Todo` (opción aprobada A), fiel a
D001. La instancia `taskList` se crea en la fachada y nunca se expone.

- [x] Crear `todo-core.js`: constantes (`STORAGE_KEY`, `FILTER_KEY`, `ACTIVE_LIST_KEY`, `VIEW_KEY`, `FILTERS`, `VIEWS`, `INBOX`) y helpers (`currentDay`, `isValidDate`) en `Todo`
  - Aporta: el suelo neutral del que dependen las demás capas; crea el namespace `window.Todo`
- [x] Crear `todo-domain.js`: clase `TaskList` en `Todo.TaskList`
  - Aporta: el dominio en su propio archivo
  - Contexto: la instancia `taskList` (hoy línea 338) no se mueve a este archivo: se crea en la fachada para no exponerla en el namespace
- [x] Crear `todo-storage.js`: objeto `Storage` en `Todo.Storage`
  - Aporta: la infraestructura aislada, consumida solo por la fachada
- [x] Crear `todo-ui.js`: `dispatchTable`, helpers de render y `UI`; expone `window.UI` como hoy
  - Aporta: la presentación aislada con API pública invariante
- [x] Reescribir `app.js` como fachada: `viewState`, `App`, creación de `taskList` (`new Todo.TaskList()`), suscripción y bootstrap; expone `window.App`
  - Aporta: la composición y la API pública sin cambios observables
- [x] Actualizar los `<script>` de `index.html` y `tests.html` en orden `todo-core.js` → `todo-domain.js` → `todo-storage.js` → `todo-ui.js` → `app.js`
  - Aporta: el orden de dependencias de D001; la instancia de dominio y los objetos de capa se crean a nivel superior, así que el orden real importa
- [x] Verificar la suite QUnit en verde y `index.html` abierto como `file://`
  - Aporta: la red que demuestra la invariancia del comportamiento

## Suite de pruebas esperada

- La suite QUnit completa pasa sin reescribir ninguna llamada (regresión — todos los casos de uso existentes de los hitos 1–3).
- `window.App` y `window.UI` ofrecen las mismas operaciones tras la división (I — contrato de vista).
- La aplicación abierta como `index.html` sobre `file://` crea, completa, edita, borra, filtra y cambia de lista y de vista (regresión manual — casos de uso de los hitos 1–3).
- El estado privado de `TaskList` (campos `#`) sigue inaccesible desde fuera y la instancia `taskList` no cuelga de `window` (B — encapsulación declarada en el dominio).

## Revisión

- Subagente: 2026-09-26 — Aprueba
- Usuario: 2026-09-26 — Aprueba
