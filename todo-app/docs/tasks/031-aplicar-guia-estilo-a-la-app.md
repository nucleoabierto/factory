# Aplicar la guía de estilo a la aplicación

## Estado

[ ] Pendiente | [ ] En progreso | [ ] En revisión | [ ] Completada | [ ] Bloqueada

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

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario: [fecha] — [Aprueba | Solicita cambios]
