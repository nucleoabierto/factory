# Guía de estilo — Todo app

Contrato verificable del sistema visual de la app. Todo valor visual en el código debe referenciar los tokens declarados aquí; un literal fuera de la declaración de tokens es deriva.

## Atmósfera

Utilitaria y compacta, fiel a la estética TodoMVC: una lista centrada sin decoración, donde domina la información sobre la prosa. Las etiquetas son la palabra más corta posible; no hay textos explicativos en la interfaz.

## Color

- `--color-background` `#f5f5f5` — fondo de página
- `--color-surface` `#ffffff` — tarjeta de la app y campos de entrada
- `--color-text` `#111111` — texto principal
- `--color-text-muted` `#777777` — metadatos, footer, acciones secundarias
- `--color-text-done` `#b0b0b0` — texto de tarea completada
- `--color-disabled` `#cccccc` — controles deshabilitados
- `--color-accent` `#b83f45` — título, foco, hover de acciones, seleccionado, acciones destructivas y fechas vencidas
- `--color-warning` `#9a6700` — texto de fecha «hoy»
- `--color-warning-bg` `rgba(255, 180, 0, 0.12)` — fondo de fecha «hoy»
- `--color-warning-border` `#e8a13c` — borde de fecha «hoy»
- `--color-border` `#e6e6e6` — bordes de lista, campos y píldoras
- `--color-border-strong` `#999999` — borde del campo de edición
- `--color-shadow` `rgba(0, 0, 0, 0.15)` — sombra de la tarjeta

Reglas de combinación: el acento solo en título, foco, hover, estado seleccionado, acciones destructivas y fechas vencidas — nunca como fondo de superficie salvo el seleccionado del control segmentado (`.views`), donde lleva texto `--color-surface`. El warning solo para la fecha «hoy». Texto principal siempre sobre `--color-background` o `--color-surface`.

## Tipografía

| Rol | Familia | Tamaño | Peso | Altura de línea |
|-----|---------|--------|------|-----------------|
| Display | system-ui, sans-serif | 48px | 200 | normal |
| Tarea / campo | system-ui, sans-serif | 20px | 400 | normal |
| Acción-icono | system-ui, sans-serif | 16px | 400 | 1 |
| UI | system-ui, sans-serif | 14px | 400 | normal |
| Etiqueta | system-ui, sans-serif | 13px | 400 | normal |
| Estado de fecha | system-ui, sans-serif | 13px | 600 | normal |

Reglas: una sola familia en toda la app; el peso 600 solo para estados de fecha (hoy, vencida); el tamaño mínimo es 13px.

## Espaciado y forma

- Unidad base: 4px. Los espaciados usados son múltiplos o submúltiplos declarados: 2, 3, 4, 7, 8, 10, 12, 16 y 40px.
- Radio único: `--radius` `3px`, para píldoras (fecha, mover) y enlaces de filtro/vista.
- Sombra única: `--shadow-card` `0 2px 8px var(--color-shadow)`, solo en `.todoapp`.
- Contenedor: ancho máximo 550px, centrado, con margen superior de 40px.

## Componentes

- **Acción-icono** (`.list-action`, `.destroy`, `.reactivate`): botón sin fondo ni borde, 32×32, texto en `--color-text-muted` o `--color-accent` según sea secundaria o destructiva; hover cambia el color, no el fondo. Las acciones de lista usan etiquetas legibles, no glifos crípticos.
- **Píldora** (`.due-date`, `.move`, `.recur`): 13px, borde `--color-border`, radio `--radius`, fondo `--color-surface`, texto `--color-text-muted`.
- **Toggle** (`.toggle`): checkbox nativo con `accent-color: --color-accent` — ningún color fuera de la paleta.
- **Campo de texto** (`.new-todo`, `.edit`): sin borde salvo el inferior en `--color-border` (o `--color-border-strong` en edición); foco con `outline`/`box-shadow` en `--color-accent`, nunca el azul por defecto del navegador.
- **Controles segmentados**: `.views` es la navegación primaria — píldora contenedora con borde `--color-border`; el seleccionado lleva fondo `--color-accent` y texto `--color-surface`; hover en acento de texto. `.filters` son enlaces con padding `4px 8px`, borde transparente y radio `--radius`; hover y `.selected` muestran borde en `--color-accent`.
- **Bloque condicional** (`.archived`, `.import`): franja de ancho completo bajo la lista, oculta con `hidden` cuando no tiene contenido; texto `--font-ui` en `--color-text-muted` y borde superior en `--color-border`; sus acciones son botones de texto en `--font-label`, en `--color-text-muted` con hover en acento, o en `--color-accent` cuando la acción es destructiva.

## Estados

- **Foco:** `outline` o `box-shadow` en `--color-accent` en todo elemento interactivo; el outline azul por defecto del navegador está vetado.
- **Hover:** cambio de color o de borde; nunca cambio de fondo salvo en la píldora de fecha «hoy».
- **Deshabilitado:** color `--color-disabled`, cursor por defecto.
- **Completada:** texto en `--color-text-done` con tachado.
- **Fecha «hoy»:** texto `--color-warning`, fondo `--color-warning-bg`, borde `--color-warning-border`, peso 600.
- **Fecha vencida:** texto y borde `--color-accent`, peso 600.
- **Empty:** la lista vacía muestra un mensaje en `--color-text-muted` («Sin tareas.») centrado con padding, no un área en blanco.
- **Acciones contextuales** (`.due-date`, `.move`, `.recur`, `.destroy`): visibles con opacidad reducida en reposo y opacidad plena en `:hover`/`:focus`, en lugar de `visibility: hidden` — deben ser descubribles también en táctil.

## Layout

- Una sola columna: cabecera (título, barra de lista, campo nuevo), lista, sección de archivadas, bloque de propuesta de importación, footer.
- La lista tiene `min-height` suficiente para que el footer no quede pegado al campo de entrada cuando está vacía.
- **El footer se organiza en varias filas:** navegación de vistas (Lista/Hoy) y filtros (Todas/Pendientes/Completadas) ocupan filas propias; la fila inferior lleva el contador a la izquierda y la acción «Limpiar completadas» a la derecha, esta última como texto pequeño en `--color-accent` y solo cuando hay completadas. Una fila propia (`.export-row`) lleva las acciones de portabilidad —«Exportar», «Enlace» e «Importar»— como botones de texto en `--font-label` y `--color-text-muted`, con hover en `--color-accent`; el selector de archivo de «Importar» permanece oculto.
- No hay layout responsive declarado más allá del ancho máximo de 550px; la app se lee completa hasta ~360px sin scroll horizontal.

## Movimiento

Sin animación. Si en el futuro se añaden transiciones de estado, máximo 150ms.

## Anti-patrones

Prohibido:

- Valores literales de color, tamaño, espaciado, radio o sombra fuera de la declaración de tokens.
- Tipografías distintas de `system-ui, sans-serif`.
- Sombras distintas de `--shadow-card`.
- Glifos crípticos como único indicio de una acción (`✎`, `↓`, `×` sin etiqueta legible o tooltip claro).
- `visibility: hidden` para acciones que el usuario necesita descubrir.
- El outline azul por defecto del navegador.
- Prosa explicativa en la interfaz.
