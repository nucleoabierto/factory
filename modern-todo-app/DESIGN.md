# Guía de estilo — modern-todo-app

Contrato verificable de la aplicación en dos mitades —visual y de comportamiento. Todo valor visual en el código debe referenciar los tokens declarados aquí —un literal fuera de la declaración de tokens es deriva— y toda interacción debe cumplir las garantías del contrato de experiencia. La guía declara dos temas —claro y oscuro— y cada rol de color indica sus dos valores; el tema activo sigue `prefers-color-scheme`. Además del contrato, la guía documenta los principios que arbitran las decisiones y la razón de cada regla en dos dimensiones —qué protege en la interfaz y qué cambia en la experiencia del usuario—: es el porqué de la forma visual, para que un componente o pantalla nueva se diseñe con criterio sin recurrir al código.

## Principios

- **La jerarquía se construye con tipografía y espacio, no con decoración.** Consecuencia: sin gradientes y con una sola sombra; el peso y el tamaño hacen el trabajo que en otra guía haría un color o un borde. En experiencia: el usuario mapea la página de un vistazo —lo grande y pesado es lo importante— sin tener que aprender ningún código de color.
- **El color es señal, no decoración.** Consecuencia: la paleta neutra lleva la interfaz y el acento solo aparece donde hay que actuar o atender —foco, acción primaria, selección, peligro—. En experiencia: el usuario aprende que el color anuncia acción, y el barrido visual encuentra qué hacer en fracciones de segundo; un elemento que no pide acción no lleva color.
- **La destrucción debe ser deliberada.** Consecuencia: las acciones destructivas se ocultan en reposo y se revelan en hover o foco; nunca compiten en visibilidad con las acciones de construcción. En experiencia: el error más costoso de la app —borrar sin querer— exige dos gestos deliberados en lugar de uno accidental.
- **El foco es inconfundible.** Consecuencia: anillo propio en `--color-accent` en todo elemento interactivo; el foco por defecto del navegador está vetado porque no garantiza contraste en ambos temas. En experiencia: quien navega por teclado —o con un lector de pantalla— siempre sabe dónde está; sin anillo propio, tabular es navegar a ciegas.
- **El movimiento no llama la atención.** Consecuencia: sin animación; las transiciones de estado existen para confirmar la acción, no para lucirse, y duran como máximo 150ms. En experiencia: la transición dice «hecho» justo cuando el gesto termina; más de 150ms se siente como espera de la app, menos no llega a percibirse y no confirma nada.

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

Reglas de combinación: el acento solo en foco, acciones primarias y estado seleccionado —nunca como fondo de superficie salvo la píldora de filtro seleccionada, que lleva texto `--color-surface` (la píldora está decidida pero pendiente de implementación; la regla gobierna el diseño aprobado)—. En interfaz, reservar el acento mantiene la señal inequívoca; en experiencia, el usuario nunca se pregunta dónde actuar: lo azul es lo clicable y lo atendible, y un fondo de acento compite con el foco y diluye la selección. El danger solo en acciones destructivas —el rojo dispara la alerta automática del usuario; si aparece en cosas inofensivas, la alerta se habitúa y deja de proteger cuando importa—. Texto principal siempre sobre `--color-background` o `--color-surface` —es el par de mayor contraste disponible en ambos temas: legibilidad sin esfuerzo en claro y en oscuro—.

## Tipografía

| Rol                 | Familia       | Tamaño                                    | Peso | Altura de línea |
| ------------------- | ------------- | ----------------------------------------- | ---- | --------------- |
| Título              | `--font-sans` | `--font-display` `clamp(24px, 6vw, 32px)` | 700  | 1.1             |
| Tarea / campo       | `--font-sans` | `--font-task` 18px                        | 400  | 1.5             |
| UI                  | `--font-sans` | `--font-ui` 15px                          | 400  | 1.4             |
| Etiqueta / contador | `--font-sans` | `--font-label` 14px                       | 400  | 1.4             |

Reglas: una sola familia en toda la app (`--font-sans`: `system-ui, 'Segoe UI', Roboto, sans-serif`) —elimina la decisión de emparejar tipografías y, en experiencia, mantiene una sola voz: cada cambio de familia es un cambio de tono que el usuario tiene que procesar—; el peso 700 solo en el título —el peso es la jerarquía más barata de leer, y reservarlo al título lo vuelve señal: el ojo aterriza primero en el título; si todo es bold, nada lo es y el usuario pierde el mapa de la página—; el tamaño mínimo es 14px —por debajo, el usuario fuerza la vista o abandona: 14px es el umbral de lectura sin zoom en pantallas densas—.

## Espaciado y forma

- Unidad base: 8px. Los espaciados son múltiplos de ella: `--space-1` 8px, `--space-2` 16px, `--space-3` 24px, `--space-4` 32px, `--space-6` 48px, `--space-8` 64px —la unidad única elimina los ajustes de ojo entre elementos; en experiencia, el ritmo constante hace la interfaz predecible: el usuario no nota el espaciado, y esa es la meta —la atención queda en el contenido, no en los huecos—.
- Radios permitidos: `--radius` 8px para la tarjeta, campos y controles; `--radius-pill` 999px para las píldoras de filtro —la forma comunica la affordance antes de tocar: la píldora pide ser pulsada, el campo rectangular pide ser llenado—.
- Sombra única: `--shadow-card` `0 4px 16px var(--color-shadow)`, solo en la tarjeta de la app —la elevación dice «esto flota sobre todo lo demás»; si todo flota, nada destaca y la profundidad deja de informar—.
- Contenedor: ancho máximo `--container-max` 560px, centrado, con gutters de `--space-3` —mantiene la longitud de línea que el ojo lee sin perder el renglón: más ancho fatiga, menos fragmenta—.
- Tamaños de control: `--size-toggle` 20px — las casillas de completar y la maestra —el área de toque usable con la densidad de la lista: debajo, el error de puntero sube y completar deja de ser un gesto de un toque—.

## Componentes

- **Campo de captura** (`new-todo`): ancho completo de la tarjeta, fondo `--color-surface`, borde `--color-border`, radio `--radius`, padding `--space-1` vertical y `--space-2` horizontal; foco con anillo en `--color-accent` —es el gesto principal de la app: el ancho completo lo invita y comparte el tratamiento del campo genérico; en experiencia, escribir la primera tarea no exige descubrir nada—.
- **Campo de edición** (`edit`): como el campo de captura —fondo `--color-surface`, radio `--radius`, padding `--space-1` vertical y `--space-2` horizontal, foco con anillo en `--color-accent`, tipografía de tarea— pero con borde `--color-border-strong`; se activa con doble clic sobre el título del ítem y, mientras un ítem edita, se muestra solo el campo —toggle y destroy no se renderizan—. En interfaz, el borde fuerte distingue el modo edición del de captura; en experiencia, editar en el lugar conserva el contexto —el usuario ve qué tarea edita sin memoria de trabajo— y ocultar el resto de controles evita que la fila cambie debajo del texto que se está escribiendo.
- **Ítem de lista**: fila con checkbox en `--size-toggle`, texto en `--font-task`, separador inferior `--color-border` entre ítems —el último no lo lleva—, padding `--space-2`; el texto completada usa `--color-text-done` con tachado —el separador delimita sin construir cajas: la lista se lee como un flujo, no como una pila de objetos; el tachado con color apagado comunica «hecho» con el código cultural que el usuario ya trae, y retira la tarea del foco perceptual sin borrarla —deshacer sigue siendo posible—.
- **Toggle** (`toggle`): checkbox nativo con `accent-color: var(--color-accent)` y tamaño `--size-toggle` — ningún color fuera de la paleta —el control nativo entrega gratis el comportamiento de teclado y lector de pantalla que la herramienta del usuario espera, sin reimplementarlo ni introducir colores propios—.
- **Acción discreta**: botón de texto en `--color-text-muted`, tamaño `--font-label`; hover cambia el color a `--color-text`, nunca el fondo —las acciones secundarias no compiten por la atención: el usuario escanea la lista sin ruido, y el hover despierta la acción solo cuando el puntero ya está ahí, es decir, con intención declarada—.
- **Acción destructiva** (`destroy`; limpiar completadas pendiente de implementación): como la discreta pero en `--color-danger`; aparece por opacidad al hover o al foco dentro del ítem —oculta en reposo porque la destrucción accidental es el error más costoso de la app: exigir llevar el puntero y clicar la vuelve deliberada; en táctil, la descubribidad la da el foco, no el hover—.
- **Filtros** (pendiente de implementación): píldoras con padding `--space-1` `--space-2`, radio `--radius-pill`, borde transparente; hover muestra borde `--color-border-strong`, seleccionado fondo `--color-accent` con texto `--color-surface` —la píldora es el único lugar donde el acento puede ser fondo: la selección es un estado que debe verse desde la distancia; en experiencia responde siempre a «¿dónde estoy?» —el usuario nunca se pregunta por qué no ve sus tareas—. La lógica de dominio existe (`selectByFilter`); falta la interfaz.
- **Marcar todas**: casilla maestra en una fila densa (`--space-1` vertical) sobre la lista, alineada con la columna de casillas de los ítems, con etiqueta visible «Todas» en `--font-label`/`--color-text-muted` y separador inferior `--color-border`; la casilla sigue el tratamiento de `toggle` —alineada con la columna, el gesto es el mismo que completar una tarea: cero aprendizaje nuevo; la etiqueta visible evita descifrar un glifo—.

## Estados

- **Foco:** anillo deliberado en `--color-accent` (outline de 2px con offset) en todo elemento interactivo; el estilo de foco por defecto del navegador sin personalizar está vetado —el anillo propio garantiza contraste en ambos temas; en experiencia, el usuario de teclado siempre sabe dónde está—.
- **Hover:** cambio de color o de borde; nunca cambio de fondo salvo la píldora de filtro seleccionada —el hover confirma sin reorganizar: la fila no salta y el puntero no pierde su objetivo a mitad del gesto—.
- **Completada:** texto en `--color-text-done` con tachado —el tachado es el código cultural del completado; el color apagado lo acompaña sin borrar la tarea: el usuario ve el progreso acumulado y conserva la opción de deshacer—.
- **Edición:** el campo ocupa la fila del ítem con borde `--color-border-strong` y foco en `--color-accent` —el borde fuerte anuncia «estás en otro modo» antes de que el usuario escriba sobre lo que no debía—.
- **Vacío:** mensaje centrado en `--color-text-muted`, en cursiva —en experiencia distingue «no hay datos» de «la app está rota», y no compite con la lista cuando esta llegue—.
- **Deshabilitado:** color `--color-disabled`, cursor por defecto —el control visible pero muerto explica por qué no responde; hacerlo desaparecer dejaría al usuario buscando una función que sabe que existía—.
- **Acciones contextuales** (`destroy` y similares): opacidad reducida en reposo y opacidad plena en `:hover` o cuando el foco entra en el ítem (`focus-within`) — deben ser descubribles también en táctil —la revelación por foco, y no solo por hover, es lo que las mantiene alcanzables sin puntero: teclado y táctil no pierden la función—.

## Layout

- Una sola columna: cabecera con el título, campo de captura, lista y —pendiente de implementación— pie con contador, filtros y acción de limpieza —la app es una lista: la columna única elimina la decisión de qué va a cada lado y, en experiencia, el orden de lectura coincide con el orden de uso—.
- La aplicación se presenta como tarjeta `--color-surface` con `--shadow-card` sobre `--color-background` —la tarjeta separa «la app» de «el navegador»: el usuario sabe qué es la aplicación y qué es el entorno que la rodea—.
- No hay layout responsive declarado más allá del ancho máximo de 560px; la app se lee completa hasta ~360px sin scroll horizontal —sin columnas laterales no hay nada que colapsar: la misma app funciona de 360px a 560px sin modos distintos que aprender—.

## Movimiento

Sin animación. Las transiciones de estado (color, borde, opacidad) duran como máximo 150ms —confirman el gesto: más de 150ms se percibe como lentitud de la app, menos como parpadeo que no confirma nada—.

## Contrato de experiencia

Las garantías de comportamiento que cruzan toda la interfaz —lo que el usuario puede esperar siempre—. Cada una declara qué garantiza y cómo se comprueba; la experiencia de un componente concreto vive en la razón de ese componente.

- **El sistema confirma cada acción:** toda interacción produce feedback perceptible en ≤150ms —las transiciones de estado confirman el gesto; el usuario nunca adivina si llegó—. Comprobable: la duración de las transiciones en el CSS.
- **El teclado recorre todo lo interactivo:** todo elemento interactivo recibe foco visible con anillo propio en `--color-accent`, en el orden de lectura —quien navega con Tab nunca pierde su posición—. Comprobable: recorrer toda la app con Tab.
- **La destrucción pide deliberación:** las acciones destructivas están atenuadas en reposo y se revelan con intención —hover o foco dentro del ítem—. Comprobable: la opacidad reducida en reposo y la revelación por `focus-within`.
- **Ningún estado es un callejón sin salida:** todo estado mantiene la referencia de dónde está el usuario —el vacío dice que no hay tareas, la edición ocurre en la fila y no en otra pantalla—. Comprobable: cada estado conserva el contexto visible sin instrucciones ocultas.
- **Reconocer, no recordar:** el gesto de completar es el mismo en toda la lista y cada control conserva su forma siempre que está presente —el usuario no memoriza variaciones—. Comprobable: mismos controles y gestos en todas las filas.
- **Áreas de toque usable:** los controles interactivos miden al menos 20px —debajo, el error de puntero sube—. Comprobable: el tamaño de las casillas.

## Orientación para decisiones nuevas

Para un componente o pantalla que la guía aún no describe:

1. **Identifica el rol:** acción primaria, acción secundaria, acción destructiva o contenido. El rol determina el tratamiento: el primario lleva acento, el secundario vive en `--color-text-muted` y despierta en hover, el destructivo se oculta en reposo, el contenido no lleva color de acción.
2. **Todo valor desde los tokens:** ningún literal; si falta un token, la decisión es de la guía, no del componente —se eleva como laguna en lugar de inventar—.
3. **Estados obligatorios:** foco con anillo en `--color-accent`, hover por color o borde —nunca fondo salvo la píldora seleccionada—, deshabilitado en `--color-disabled`.
4. **Densidad desde la fila:** espaciado en múltiplos de 8px; alineación con la columna de casillas si el componente vive en la lista; separador `--color-border` si delimita filas.
5. **Arbitra con los principios:** si la duda es estética, el principio decide —p. ej. un botón nuevo con fondo de acento contradice «el color es señal» salvo que sea la acción primaria de la pantalla—.
6. **Declara el impacto en la experiencia:** la razón que entre en la guía dice qué cambia para el usuario —percepción, acción, error, aprendizaje o accesibilidad—, no solo qué protege en la interfaz.

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
