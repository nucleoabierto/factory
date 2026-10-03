# Definir la guía de estilo del proyecto

## Estado

[ ] Pendiente

## Tipo

desarrollo

## Objetivo

Definir la guía de estilo del producto —`DESIGN.md` en la raíz de `modern-todo-app` como contrato verificable, con los tokens materializados como custom properties de CSS— y migrar la pantalla actual a tokens, de modo que toda la interfaz del núcleo se construya sobre un sistema de diseño declarado.

## Dependencias

- Ninguna.

## Entrada

- La pantalla mínima actual (`src/components/App.tsx`, `src/components/App.css`, `src/index.css`) con sus valores visuales literales.
- El skill `documentar-guia-estilo` como capacidad que produce la guía, y `aplicar-guia-estilo` como verificación del cumplimiento.
- La superficie visual que el núcleo necesitará según la spec TodoMVC: input de captura, ítems con estados hover/editing/completed, casilla de marcar todas, pie con contador, filtros y acciones discretas — la guía debe contemplar esos patrones aunque aún no existan en el código.

## Resultado esperado

- `modern-todo-app/DESIGN.md` con las secciones del contrato: atmósfera, color con roles, tipografía, espaciado y forma, componentes base (captura, ítem, acción discreta y destructiva, filtros), estados (hover, foco, completed, editing, vacío), layout, movimiento y anti-patrones.
- Los tokens declarados como custom properties en `:root` y la pantalla actual migrada a `var(--…)`, sin literales visuales en el CSS de la aplicación.
- `npm run verify` en verde: los tests existentes siguen pasando con la pantalla reestilada.

## Criterios de calidad

- `DESIGN.md` existe con todas las secciones del contrato y decisiones concretas, sin placeholders.
- Todo valor visual del CSS propio proviene de tokens — verificación estática sin literales.
- Los tokens cubren lo que la superficie TodoMVC necesita: controles, estados de ítem, acciones discretas y destructivas.
- Evidencia renderizada: la pantalla servida por el dev server se verifica visualmente con los tokens aplicados.
- `npm run verify` en verde con cobertura al 100%.

## Procedimiento sugerido

1. Inventariar los valores visuales actuales del CSS y la superficie que la spec TodoMVC requerirá.
2. Definir el contrato en `DESIGN.md` siguiendo `documentar-guia-estilo`, en diálogo con el usuario donde la guía lo exija.
3. Declarar los tokens en `:root` y sustituir los literales del CSS existente.
4. Aplicar `aplicar-guia-estilo`: verificación estática y evidencia renderizada.
5. Dejar `npm run verify` en verde.

## Notas

- La guía es un documento vivo: las tareas siguientes del conjunto pueden revelar patrones que la guía deba absorber; esas actualizaciones se evalúan al cierre de cada tarea con `documentar-guia-estilo`.

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario: [fecha] — [Aprueba | Solicita cambios]
