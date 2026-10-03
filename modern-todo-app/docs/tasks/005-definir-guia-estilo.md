# Definir la guía de estilo del proyecto

## Estado

[x] Completada

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

## Contexto

- **Archivos similares:**
  - `src/index.css` — estilos globales con literales a migrar: fuente `system-ui…`, color `#1a1a1a`, fondo `#fafafa`, line-height `1.5`.
  - `src/components/App.css` — estilos del componente con literales: `42rem`, `4rem 1.5rem`, `2rem`, `#666`, `#888`, `3rem`, itálica.
  - `todo-app/DESIGN.md` — precedente del repositorio: guía de estilo del proyecto hermano siguiendo el formato de contrato; modelo de estructura y nivel de precisión, no de valores (la dirección estética de este producto es propia).
- **Patrones:** CSS plano por componente (`App.css` importado desde `App.tsx`), sin CSS-in-JS ni framework de utilidades; las pruebas consultan por roles y texto visible (`App.test.tsx`); las custom properties se declaran en `:root` del archivo de estilos principal (`src/index.css`).
- **Dominio:** ninguna aplica — el subproyecto no tiene `docs/domains/` todavía.
- **Producto:** ninguna aplica — el subproyecto no tiene documentación de producto todavía.
- **Lecciones:**
  - `consistencia-de-formatos` — el `DESIGN.md` nuevo sigue la estructura de la plantilla del skill (`references/formato-design-md.md`), coherente con el precedente `todo-app/DESIGN.md`.
  - `vocabulario` — redacción en español llano, sin derivaciones acuñadas.
  - `alcance` — hallazgos fuera del alcance se reportan, no se corrigen; un hallazgo del mismo tema (p. ej. un valor visual fuera de la guía) puede absorberse en la tarea.
- **Decisiones:**
  - `D001` del subproyecto — la pila es React + TypeScript estricto + Vite + Vitest; el sistema de diseño se materializa en CSS plano con custom properties, sin añadir librerías de estilos.
  - `D028` del repositorio — cada expectativa de la `## Suite de pruebas esperada` declara la letra ZOMBIE que la derivó cuando aplica.

## Conectividad

**Conectada.** Todo lo que la tarea asume existe: los archivos de estilos con literales a migrar (`src/index.css`, `src/components/App.css`), el componente pantalla (`src/components/App.tsx`), los skills `documentar-guia-estilo` y `aplicar-guia-estilo` como capacidades del sistema, el contrato `npm run verify` en `package.json` y el dev server (`npm run dev`) para la evidencia renderizada. `DESIGN.md` no existe aún — es el resultado esperado, no una dependencia.

## Plan técnico

Subsistema: la superficie visual del subproyecto son dos hojas de CSS plano —`src/index.css` (estilos globales) y `src/components/App.css` (la pantalla)— con valores literales dispersos. La tarea crea `DESIGN.md` en la raíz del subproyecto como contrato verificable, lo materializa en custom properties en `:root` y migra los literales.

- [x] Definir la guía de estilo en diálogo con el usuario y escribir `DESIGN.md`
  - Aporta: la dirección estética es decisión humana —principio de `documentar-guia-estilo`: extraer o dialogar, nunca imponer—; el documento nace con las decisiones aprobadas y cubre la superficie TodoMVC anticipada (captura, ítem con sus estados, acciones discretas y destructivas, filtros).
  - Contexto: plantilla en `references/formato-design-md.md` del skill; `todo-app/DESIGN.md` es precedente de estructura y precisión, no de valores; el inventario de literales actuales está en la sección Contexto.
- [x] Declarar los tokens decididos como custom properties en `:root` de `src/index.css`
  - Aporta: materializa el contrato en la forma que el código consume y que la verificación estática cuenta.
- [x] Migrar los literales de `src/index.css` y `src/components/App.css` a `var(--…)`
  - Aporta: la pantalla existente queda construida sobre el sistema declarado; cero literales visuales fuera de `:root`.
  - Contexto: la migración puede normalizar valores al sistema decidido (unir grises cercanos, ajustar la escala de espaciado); esas normalizaciones forman parte de la decisión de la guía, no son deriva.
- [x] Verificar el cumplimiento con `aplicar-guia-estilo`: revisión estática y evidencia renderizada con el dev server
  - Aporta: demuestra que el contrato se cumple en el código y en lo servido —criterio de calidad explícito de la tarea.
- [x] Ejecutar `npm run verify` en verde
  - Aporta: la suite y la cobertura al 100% siguen pasando con la pantalla reestilada.

## Suite de pruebas esperada

Caso de uso «la pantalla se construye sobre el sistema de diseño declarado» — la tarea no cambia comportamiento observable; las expectativas son de arnés y regresión, sin letras ZOMBIE:

1. Las pruebas existentes de la pantalla siguen en verde tras la migración a tokens (regresión).
2. Verificación estática: ningún literal visual (color, tamaño, espaciado, radio, sombra) fuera de la declaración de tokens en el CSS propio (arnés).
3. Evidencia renderizada: la pantalla servida por el dev server aplica los tokens declarados (arnés).
4. `npm run verify` en verde con cobertura al 100% (arnés).

## Revisión

- Subagente: 2026-10-03 — Aprueba (segunda pasada; primera solicitó cambios: vacío sin centrar y tagline fuera de la guía)
- Usuario: 2026-10-03 — Aprueba (eliminación de la tagline decidida durante la revisión)
