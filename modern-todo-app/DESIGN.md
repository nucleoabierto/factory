# Guía de estilo — modern-todo-app

Contrato verificable del sistema visual de la aplicación. Todo valor visual en el código debe referenciar los tokens declarados aquí; un literal fuera de la declaración de tokens es deriva. La guía declara dos temas —claro y oscuro— y cada rol de color indica sus dos valores; el tema activo sigue `prefers-color-scheme`.

## Atmósfera

Neutra moderna y espaciosa: la jerarquía se construye con tipografía y espacio, no con decoración. El color se reserva para el acento y los estados; la interfaz respira y las etiquetas son la palabra más corta posible.

## Color

Cada token declara su valor en tema claro y en tema oscuro.

| Token                   | Claro                    | Oscuro               | Rol                                           |
| ----------------------- | ------------------------ | -------------------- | --------------------------------------------- |
| `--color-background`    | `#f8fafc`                | `#0f172a`            | fondo de página                               |
| `--color-surface`       | `#ffffff`                | `#1e293b`            | tarjeta de la app y campos de entrada         |
| `--color-text`          | `#0f172a`                | `#e2e8f0`            | texto principal                               |
| `--color-text-muted`    | `#64748b`                | `#94a3b8`            | metadatos, acciones discretas, estado vacío   |
| `--color-text-done`     | `#94a3b8`                | `#64748b`            | texto de tarea completada                     |
| `--color-accent`        | `#2563eb`                | `#60a5fa`            | foco, acciones primarias, estado seleccionado |
| `--color-danger`        | `#dc2626`                | `#f87171`            | acciones destructivas                         |
| `--color-border`        | `#e2e8f0`                | `#334155`            | separadores de lista y bordes de campo        |
| `--color-border-strong` | `#94a3b8`                | `#64748b`            | borde del campo de edición                    |
| `--color-disabled`      | `#cbd5e1`                | `#475569`            | controles deshabilitados                      |
| `--color-shadow`        | `rgba(15, 23, 42, 0.08)` | `rgba(0, 0, 0, 0.4)` | sombra de la tarjeta                          |

Reglas de combinación: el acento solo en foco, acciones primarias y estado seleccionado —nunca como fondo de superficie salvo la píldora de filtro seleccionada, que lleva texto `--color-surface`—. El danger solo en acciones destructivas. Texto principal siempre sobre `--color-background` o `--color-surface`.

## Tipografía

| Rol                 | Familia       | Tamaño                                    | Peso | Altura de línea |
| ------------------- | ------------- | ----------------------------------------- | ---- | --------------- |
| Título              | `--font-sans` | `--font-display` `clamp(24px, 6vw, 32px)` | 700  | 1.1             |
| Tarea / campo       | `--font-sans` | `--font-task` 18px                        | 400  | 1.5             |
| UI                  | `--font-sans` | `--font-ui` 15px                          | 400  | 1.4             |
| Etiqueta / contador | `--font-sans` | `--font-label` 14px                       | 400  | 1.4             |

Reglas: una sola familia en toda la app (`--font-sans`: `system-ui, 'Segoe UI', Roboto, sans-serif`); el peso 700 solo en el título; el tamaño mínimo es 14px.

## Espaciado y forma

- Unidad base: 8px. Los espaciados son múltiplos de ella: `--space-1` 8px, `--space-2` 16px, `--space-3` 24px, `--space-4` 32px, `--space-6` 48px, `--space-8` 64px.
- Radios permitidos: `--radius` 8px para la tarjeta, campos y controles; `--radius-pill` 999px para las píldoras de filtro.
- Sombra única: `--shadow-card` `0 4px 16px var(--color-shadow)`, solo en la tarjeta de la app.
- Contenedor: ancho máximo `--container-max` 560px, centrado, con gutters de `--space-3`.
- Tamaños de control: `--size-toggle` 20px — las casillas de completar y la maestra.

## Componentes

- **Campo de captura** (`new-todo`): ancho completo de la tarjeta, fondo `--color-surface`, borde `--color-border`, radio `--radius`, padding `--space-1` vertical y `--space-2` horizontal; foco con anillo en `--color-accent`.
- **Campo de edición** (`edit`): como el campo de captura —fondo `--color-surface`, radio `--radius`, padding `--space-1` vertical y `--space-2` horizontal, foco con anillo en `--color-accent`, tipografía de tarea— pero con borde `--color-border-strong`; se activa con doble clic sobre el título del ítem y, mientras un ítem edita, se muestra solo el campo —toggle y destroy no se renderizan.
- **Ítem de lista**: fila con checkbox en `--size-toggle`, texto en `--font-task`, separador inferior `--color-border` entre ítems —el último no lo lleva—, padding `--space-2`; el texto completada usa `--color-text-done` con tachado.
- **Toggle** (`toggle`): checkbox nativo con `accent-color: var(--color-accent)` y tamaño `--size-toggle` — ningún color fuera de la paleta.
- **Acción discreta**: botón de texto en `--color-text-muted`, tamaño `--font-label`; hover cambia el color a `--color-text`, nunca el fondo.
- **Acción destructiva** (`destroy`, limpiar completadas): como la discreta pero en `--color-danger`; aparece por opacidad al hover o foco del ítem.
- **Filtros**: píldoras con padding `--space-1` `--space-2`, radio `--radius-pill`, borde transparente; hover muestra borde `--color-border-strong`, seleccionado fondo `--color-accent` con texto `--color-surface`.
- **Marcar todas**: casilla maestra en una fila densa (`--space-1` vertical) sobre la lista, alineada con la columna de casillas de los ítems, con etiqueta visible «Todas» en `--font-label`/`--color-text-muted` y separador inferior `--color-border`; la casilla sigue el tratamiento de `toggle`.

## Estados

- **Foco:** anillo deliberado en `--color-accent` (outline de 2px con offset) en todo elemento interactivo; el estilo de foco por defecto del navegador sin personalizar está vetado.
- **Hover:** cambio de color o de borde; nunca cambio de fondo salvo la píldora de filtro seleccionada.
- **Completada:** texto en `--color-text-done` con tachado.
- **Edición:** el campo ocupa la fila del ítem con borde `--color-border-strong` y foco en `--color-accent`.
- **Vacío:** mensaje centrado en `--color-text-muted`, en cursiva.
- **Deshabilitado:** color `--color-disabled`, cursor por defecto.
- **Acciones contextuales** (`destroy` y similares): opacidad reducida en reposo y opacidad plena en `:hover` o `:focus` — deben ser descubribles también en táctil.

## Layout

- Una sola columna: cabecera con el título, campo de captura, lista, pie con contador, filtros y acción de limpieza.
- La aplicación se presenta como tarjeta `--color-surface` con `--shadow-card` sobre `--color-background`.
- No hay layout responsive declarado más allá del ancho máximo de 560px; la app se lee completa hasta ~360px sin scroll horizontal.

## Movimiento

Sin animación. Las transiciones de estado (color, borde, opacidad) duran como máximo 150ms.

## Anti-patrones

Prohibido:

- Valores literales de color, tamaño, espaciado, radio o sombra fuera de la declaración de tokens.
- Tipografías distintas de `--font-sans`.
- Gradientes y sombras distintas de `--shadow-card`.
- Glifos crípticos como único indicio de una acción.
- `visibility: hidden` para acciones que el usuario necesita descubrir.
- El estilo de foco por defecto del navegador sin personalizar.
- El acento como fondo de superficie fuera de la píldora seleccionada.
- Prosa explicativa en la interfaz.
