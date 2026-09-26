# Reducir la repetición del arnés de tests y dividir tests.html

## Estado

[ ] Pendiente | [ ] En progreso | [ ] En revisión | [ ] Completada | [ ] Bloqueada

## Tipo

mantenimiento (refactoring)

## Objetivo

Que el setup común de la suite —vaciado de `localStorage`, reset de `App`, helpers `texts()`/`day()` y builders de fixture— se defina una sola vez en un archivo de helpers cargado como script clásico, y que los módulos de `tests.html` declaren solo su fixture particular; opcionalmente dividir los módulos en varios archivos de test cargados en orden.

## Dependencias

- 029

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

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario: [fecha] — [Aprueba | Solicita cambios]
