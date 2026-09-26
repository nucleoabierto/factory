# Reducir la repetición del arnés de tests y dividir tests.html

## Estado

[ ] Pendiente | [ ] En progreso | [ ] En revisión | [x] Completada | [ ] Bloqueada

## Tipo

mantenimiento (refactoring)

## Objetivo

Que el setup común de la suite —vaciado de `localStorage`, reset de `App`, helpers `texts()`/`day()` y builders de fixture— se defina una sola vez en un archivo de helpers cargado como script clásico, y que los módulos de `tests.html` declaren solo su fixture particular; opcionalmente dividir los módulos en varios archivos de test cargados en orden.

## Dependencias

- Ninguna (el usuario decidió ejecutarla antes que la 029; la separación de `app.js` retocará las etiquetas `<script>` de `tests.html` después)

## Entrada

- `tests.html` (~1590 líneas): 10 `beforeEach` casi idénticos, 24 `localStorage.removeItem` repetidos, 5 helpers `texts()` duplicados y el helper `day()` solo presente en el último módulo.
- El hallazgo H2 de `docs/architecture-reviews/003-modularidad-y-tests.md`.
- El layout de scripts que deje la tarea 029 (los archivos de la app se cargan como scripts clásicos).

## Resultado esperado

- Un archivo de helpers de test (p. ej. `tests-helpers.js`) con el reset común, los helpers de consulta y los builders de fixture, compartido por un namespace global.
- `tests.html` carga los helpers antes que los módulos; cada módulo conserva solo lo particular de su fixture.
- Si se dividen los módulos en varios archivos, `tests.html` los carga en orden explícito.

## Criterios de calidad

- La suite pasa en verde con el mismo número de módulos y pruebas y los mismos nombres de módulo y título (los documentos de producto se anclan a ellos).
- Un helper nuevo se define una sola vez; añadir un módulo no exige copiar el bloque de `beforeEach` completo.
- Los tests y los helpers siguen en inglés; la suite se abre como archivo sin servidor.

## Procedimiento sugerido

1. Extraer el setup común y los helpers a `tests-helpers.js`.
2. Sustituir los `beforeEach` repetidos por la llamada común más la fixture particular de cada módulo.
3. Si procede, separar los módulos en archivos por temática y cargarlos en orden desde `tests.html`.
4. Verificar la suite en el navegador.

## Notas

- Los commits de este proyecto llevan el ámbito `todo-app` en Conventional Commits (`tipo(todo-app): descripción`).

## Contexto

- Archivos similares:
  - `tests.html` — los 11 módulos QUnit (`harness`, `create and list`, `complete, edit and delete`, `filters and clear completed`, `lists and migration`, `active list navigation`, `list management`, `archiving lists`, `view contract`, `task dates`, `views: main and today`) con sus `beforeEach` repetidos y fixtures inline.
  - `app.js` — `App.reset`, `App.initialized`, `App.editingId`, `App.filter`, `App.view` y las claves `todoapp-*` de `localStorage` que el setup común debe limpiar.
- Patrones:
  - Cada módulo limpia `localStorage`, reinicia `App` (`reset`, `initialized`, `editingId`, `filter`, a veces `view`) y fija `qunit-fixture.innerHTML` con su HTML particular.
  - Helpers locales duplicados: `texts()` en 5 módulos, `day()` solo en el último; `selectorValues()` es propio del módulo de archivado.
  - El módulo `view contract` es la excepción: no reinicia `App` porque renderiza view-models literales.
  - QUnit por CDN y scripts clásicos sobre `file://`; los documentos de producto se anclan a nombres de módulo y título de prueba, que no pueden cambiar.
- Lecciones:
  - `idioma-del-codigo`: helpers y tests en inglés.
  - `comunicacion-en-codigo`: nombres de helpers que no presuponen lo que verifican.
  - `fidelidad-al-plan`: refactoring con comportamiento invariante —misma suite en verde, sin extras no declarados.
  - `scope-del-subproyecto`: artefactos en `todo-app/`.
- Decisiones:
  - Ninguna propia del subproyecto; la tarea 028 registrará la de scripts clásicos, pero esta tarea ya opera bajo esa pauta porque `file://` lo exige.

## Conectividad

- Veredicto: **conectada**.
- Justificación: todo lo necesario existe: QUnit soporta `hooks.beforeEach`/`afterEach` por módulo; los scripts clásicos comparten el scope global (igual que `app.js` ya expone `window.App`), así que un `tests-helpers.js` cargado antes del script inline puede proveer el setup y los helpers sin build ni servidor. Las claves de `localStorage` a limpiar son cuatro (`tasks`, `filter`, `active-list`, `view`) y son conocidas. No falta capacidad base.

## Plan técnico

`tests.html` carga QUnit y `app.js` como scripts clásicos y define los módulos inline; cada `beforeEach` repite el mismo reset y fija un fixture propio. La fachada ya es global (`window.App`), así que un script clásico previo puede exponer un namespace de helpers.

- [x] Crear `tests-helpers.js` con el namespace global `TestKit`: `resetApp()` (limpia las cuatro claves `todoapp-*`, `App.reset()` y defaults de `initialized`/`editingId`/`filter`/`view`), `fixture(html)`, `texts()` y `day(offset)`
  - Aporta: el setup y los helpers quedan definidos una sola vez, compartidos por scope global sin ES modules (compatible con `file://`)
  - Contexto: `view` solo existe desde la épica 003; limpiar las cuatro claves siempre es seguro aunque un módulo no las use
- [x] Sustituir en cada módulo el bloque repetido por `TestKit.resetApp()` + `TestKit.fixture(...)`, y los helpers locales por `TestKit.*`
  - Aporta: cada `beforeEach` declara solo lo particular; desaparecen las ~24 líneas de limpieza y los `texts()` duplicados
  - Contexto: `harness` no tiene setup; `view contract` solo fija fixture (no reinicia `App`, renderiza view-models literales); `list management` conserva su `afterEach` de `window.prompt`
- [x] Cargar `tests-helpers.js` desde `tests.html` entre `app.js` y el script inline
  - Aporta: los helpers existen antes de que los módulos se definan

## Suite de pruebas esperada

Refactoring: la aceptación es la suite existente en verde, intacta —mismos módulos, mismos títulos de prueba (los documentos de producto se anclan a ellos), mismo comportamiento— ejecutada sobre el nuevo arnés.

## Revisión

- Subagente: 2026-09-26 — Aprueba (observaciones cosméticas: líneas en blanco dobles y «10»→«11» módulos en Contexto, corregidas)
- Usuario: 2026-09-26 — Aprueba
