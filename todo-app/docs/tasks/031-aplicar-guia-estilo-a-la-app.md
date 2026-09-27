# Aplicar la guía de estilo a la aplicación

## Estado

[ ] Pendiente | [ ] En progreso | [ ] En revisión | [x] Completada | [ ] Bloqueada

## Tipo

desarrollo

## Objetivo

Materializar `DESIGN.md` en el código: declarar los tokens como custom properties en `:root`, sustituir los literales de `style.css` por `var(--…)` e implementar las mejoras que la guía ya decidió (footer en varias filas, foco en color de acento, empty state, acciones contextuales siempre descubribles, acciones de lista legibles y «Limpiar completadas» como acción destructiva discreta).

## Dependencias

- Ninguna. La guía ya existe en `DESIGN.md`.

## Entrada

- `DESIGN.md` en la raíz del proyecto: contrato vigente con tokens, componentes, estados y anti-patrones.
- `style.css` e `index.html` actuales.

## Resultado esperado

- `style.css` con `:root` declarando todos los tokens de la guía y sin literales fuera de ella.
- `index.html`/`style.css` actualizados con las mejoras decididas: footer en varias filas, foco en `--color-accent`, empty state, opacidad en vez de `visibility: hidden` para acciones contextuales, etiquetas legibles en acciones de lista.
- El cambio validado con el skill `aplicar-guia-estilo` (verificación estática de literales + evidencia renderizada con screenshot).

## Criterios de calidad

- Ningún literal de color, tamaño, espaciado, radio o sombra fuera de `:root` en `style.css`.
- El footer se organiza en varias filas según la sección Layout de la guía; «Limpiar completadas» aparece solo cuando hay completadas.
- Las acciones contextuales son descubribles sin hover (opacidad reducida → plena).
- El foco visible usa `--color-accent` en todos los interactivos.
- La lista vacía muestra el empty state declarado.
- La suite de `tests.html` sigue en verde; el comportamiento funcional no cambia.
- Captura renderizada que evidencia el resultado conforme a la guía.

## Procedimiento sugerido

1. Sub-flujo de desarrollo habitual: contexto, conectividad, plan, ejecución.
2. En la ejecución, aplicar `aplicar-guia-estilo` sobre el diff producido.
3. Verificación visual con Chrome headless (`--headless --screenshot`) en estado vacío y con tareas.

## Notas

- Los commits de este proyecto llevan el ámbito `todo-app` en Conventional Commits (`tipo(todo-app): descripción`).
- Código y tests en inglés; documentación en español.
- Si el trabajo descubre decisiones que la guía no cubre, se elevan al usuario —no se improvisan—; la guía se actualiza con `documentar-guia-estilo`.

## Contexto

- Archivos similares:
  - `style.css`: único archivo de estilos; el destino de los tokens y de la sustitución de literales. Los valores ya inventariados en `DESIGN.md` salen de aquí.
  - `index.html`: markup del footer (`.footer` con `.views`, `.filters`, `.clear-completed`) y de la lista vacía (`.main > .todo-list`); toca solo el footer y el empty state.
  - `todo-ui.js`: la vista renderiza clases como `done`, `due-today`, `due-overdue`, `selected` y decide la visibilidad de `.clear-completed`; las reglas de presentación del estado ya existen en el DOM, el CSS solo las estila.
- Patrones:
  - La vista es imperativa vanilla JS con scripts clásicos; el estilo vive todo en `style.css` con selectores de clase, sin inline styles.
  - Los estados se modelan con clases (`done`, `due-*`, `selected`), no con estilos en línea; las mejoras deben seguir ese patrón.
  - El footer actual es un único flex-row con `justify-content: space-between`; la guía lo reorganiza en filas.
- Lecciones:
  - `idioma-del-codigo`: nombres de tokens y clases en inglés; el `DESIGN.md` y la documentación en español.
  - `comunicacion-en-codigo`: los comentarios en el CSS, si los hay, explican razones duraderas.
  - `scope-del-subproyecto`: los artefactos viven dentro de `todo-app/` (`DESIGN.md`, esta tarea).
- Decisiones:
  - `D001`: solo aplica si se toca la carga de scripts en `index.html`; la tarea no añade ni reordena scripts, solo modifica markup del footer y de la lista.

## Conectividad

Veredicto: **conectada**.

Todo lo que la tarea asume existe: `style.css` con los literales inventariados en `DESIGN.md`; `index.html` con el footer (`.views`, `.filters`, `.clear-completed`) y la lista `.todo-list`; `todo-ui.js` ya asigna las clases de estado (`done`, `due-today`, `due-overdue`, `selected`) y controla `.clear-completed` y el contador. El empty state es absorbible en CSS puro (`.todo-list:empty::after`), sin tocar la vista.

## Plan técnico

El estilo de la app vive íntegro en `style.css` con selectores de clase; los estados se modelan como clases (`done`, `due-*`, `selected`) que `todo-ui.js` ya asigna, y el footer y la barra de lista están en `index.html`. El trabajo es CSS y markup acotado; no se tocan scripts (D001). Las acciones se agrupan en tres fases: tokens (base secuencial), mejoras (atómicas, delegables a subagentes por región de selectores) y verificación.

- [x] Declarar el bloque `:root` en `style.css` con los tokens de `DESIGN.md`: colores, `--font-family`, tamaños `--font-*`, `--radius`, `--shadow-card` y espaciados `--space-*`
  - Aporta: materializa la fuente de verdad de la guía en el código
  - Contexto: el padding `3px 7px` de filtros/vistas se normaliza a `4px 8px`; la escala no tiene 3 ni 7 — normalización declarada
- [x] Sustituir todos los literales por `var(--…)` en el resto de `style.css`
  - Aporta: cumple el anti-patrón «sin literales fuera de `:root`»
  - Contexto: delegable por bloques de selectores (colores vs. tamaños/espaciados) si conviene
- [x] Reestructurar el footer de `index.html` en tres filas —`.views-row` (Lista/Hoy), `.filters-row` (Todas/Pendientes/Completadas) y `.footer-row` con el contador a la izquierda y `.clear-completed` a la derecha— con sus estilos en `style.css`
  - Aporta: la mejora de controles decidida; elimina el desborde a 550px
- [x] Dar foco visible en `--color-accent` (`outline` o `box-shadow`) a input, botones, enlaces y select
  - Aporta: cumple el estado «foco» de la guía; veta el azul por defecto del navegador
- [x] Añadir el empty state con `.todo-list:empty::after` en `--color-text-muted` y `min-height` en `.main`
  - Aporta: cumple el estado «empty» en CSS puro, sin tocar la vista
- [x] Cambiar las acciones contextuales (`.due-date`, `.move`, `.destroy`) de `visibility: hidden` a `opacity` reducida en reposo y plena en `:hover`/`:focus-within`
  - Aporta: las acciones son descubribles también en táctil, según la guía
- [x] Sustituir los glifos crípticos de la barra de lista (`+ ✎ ↓ ×`) por etiquetas de texto legibles en `index.html` (p. ej. `+`, `Renombrar`, `Archivar`, `Eliminar` en 13px muted, ancho auto), conservando `title` y `aria-label`
  - Aporta: cumple «acciones de lista legibles» y el anti-patrón de glifos crípticos
- [x] Añadir a `tests.html` las pruebas del contrato visual declaradas en la suite
  - Aporta: el contrato queda verificable y detecta regresión; las pruebas van en inglés sobre CSSOM/DOM
- [x] Validar: búsqueda de literales fuera de `:root` y screenshots con Chrome headless (vacío y con tareas) contra la rúbrica de `aplicar-guia-estilo`
  - Aporta: evidencia estática y renderizada del cumplimiento de la guía

## Suite de pruebas esperada

- La lista vacía muestra el mensaje de empty state (Z).
- Con una tarea presente, el empty state no se muestra (O).
- El footer se organiza en las tres filas declaradas: vistas, filtros y contador+limpiar (I).
- «Limpiar completadas» solo es visible cuando hay tareas completadas (B).
- Ninguna regla fuera de `:root` declara literales de color o tamaño — se verifica leyendo `document.styleSheets` (contrato de regresión).
- Las acciones contextuales (`.due-date`, `.move`, `.destroy`) usan `opacity` y no `visibility: hidden` (contrato CSSOM).
- Existe una regla de foco (`:focus` o `:focus-visible`) que referencia el token de acento (contrato CSSOM).

## Desviaciones del plan

- El plan asumía que la vista ya gobernaba la visibilidad de `.clear-completed` y que no se tocaría JavaScript; el botón siempre estaba visible. Se añadió `hasCompleted` al view model (`app.js`) y `hidden` en `renderFooter` (`todo-ui.js`) para cumplir la suite (B).
- Los tamaños de componente que quedaban literales (`toggle` 20px, `move` 110px, `min-height` 96px) se declararon como tokens (`--toggle-size`, `--move-max`, `--main-min-height`) para cumplir el anti-patrón.
- `tests.html` cargó `style.css`. Tras la revisión del usuario, las pruebas del contrato se reescribieron como pruebas de comportamiento visual con `getComputedStyle` (funcionan en `file://`); los escaneos CSSOM de literales/reglas se eliminaron — esa validación estática pertenece a la revisión de `aplicar-guia-estilo`, no a la suite.
- Los literales de color fuera de `:root` se verificaron con grep durante la ejecución (cero); no quedó prueba automática — el tamaño/borde `1px`/`2px` legítimo hace la regla automática frágil.
- Tras la revisión: `.destroy` ganó `aria-label`/`title` («Eliminar tarea») y pasó a acción-icono (`--font-icon`, `--control-size`); `DESIGN.md` se actualizó al padding `4px 8px` normalizado. Los `font-weight` literales (200, 600) quedan fuera de `:root` — la guía no define token de peso.
- Tras el critique de diseño: `.views` se convirtió en segmented real (píldora contenedora, seleccionado con fondo `--color-accent` y texto `--color-surface`), hover de `.views` por color en lugar de borde muerto, hairline + `--space-lg` antes de `.footer-row`, `accent-color: --color-accent` en `.toggle`, `overflow-wrap: anywhere` en labels, y `.recur` pasó a píldora contextual (estaba sin estilo). `DESIGN.md` se actualizó en todos estos puntos — el contrato y el código quedan consistentes.

## Revisión

- Subagente: 2026-09-26 — Solicita cambios (`.destroy` sin etiqueta —corregido—, divergencia de padding en `DESIGN.md` —actualizada—, `--font-icon` sin uso —aplicado—); hallazgos informativos: `font-weight` literales y cambio de `visibility` a `opacity` en `.due-date` registrado.
- Usuario: 2026-09-26 — Aprueba
