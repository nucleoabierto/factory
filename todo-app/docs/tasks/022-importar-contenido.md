# Importar desde archivo o enlace, reemplazando o incorporando como copia

## Estado

[ ] Pendiente | [ ] En progreso | [ ] En revisión | [x] Completada | [ ] Bloqueada

## Tipo

desarrollo

## Objetivo

Cerrar el ciclo de portabilidad: la persona puede traer contenido a la aplicación desde un archivo o desde un enlace recibido, eligiendo entre reemplazar su estado o incorporarlo como copia junto a lo existente.

## Dependencias

- 021

## Entrada

- La deserialización validada y la reasignación de identificadores de la tarea 020.
- El enlace portable de la tarea 021, cuyos datos viajan en la URL.

## Resultado esperado

- La interfaz ofrece una acción de importar que acepta un archivo con el documento del formato propio.
- Abrir la aplicación con un enlace portable propone importar su contenido en lugar de ignorarlo.
- Antes de aplicar, la persona elige entre reemplazar su estado actual o incorporar lo recibido como copia; incorporar reasigna identificadores para no colisionar.
- Un documento inválido, corrupto o de versión desconocida se rechaza con un aviso claro y el estado queda intacto.
- Importar persiste el resultado como cualquier otro cambio.

## Criterios de calidad

- Importar un archivo válido deja el contenido disponible según la opción elegida, y persiste al recargar.
- Un enlace recibido propone la importación sin aplicarla hasta que la persona confirma.
- Incorporar como copia no destruye ni mezcla lo existente: ambos contenidos quedan consultables.
- Reemplazar descarta el estado anterior solo tras la confirmación y con un documento válido.
- La suite de `tests.html` pasa en verde con tests nuevos de ambos modos, del rechazo de inválidos y del enlace entrante.
- Sin errores en consola.

## Procedimiento sugerido

1. Cablear la entrada por archivo (selector de archivo) y la entrada por enlace (detección de datos en la URL al cargar).
2. Implementar el diálogo o flujo de elección reemplazar/incorporar antes de aplicar el documento validado.
3. Conectar con las operaciones del dominio del borrador 01 y persistir el resultado.
4. Escribir los tests de los dos modos, del rechazo y de la propuesta al recibir un enlace; verificar en el navegador.

## Notas

- Los commits de este proyecto llevan el ámbito `todo-app` en Conventional Commits (`tipo(todo-app): descripción`).
- Este borrador cierra los flujos de la idea: respaldo y restauración, cambio de equipo, lista entregada y punto de control antes de una limpieza.

## Contexto

- **Archivos similares:**
  - `app.js` — `App.importDocument(candidate, mode)` ya aplica un documento validado en modo `replace`/`copy` corrigiendo el estado de vista afectado; `App.init`/`load` es el punto donde detectar un enlace entrante; `viewState` es el poseedor único del estado de vista donde puede vivir una importación pendiente.
  - `todo-domain.js` — `parseDocument` valida estricto sin tocar el estado (permite proponer antes de aplicar) e `importDocument` aplica.
  - `todo-core.js` — `EXPORT_HASH`/`decodeDocument`/`documentLink` de la 021; el inverso del enlace (extraer la carga del fragmento) es helper neutro que vive aquí.
  - `todo-ui.js` — `dispatchTable` con `change`/`click` delegados; `prompt`/`alert` ya se usan para diálogos; `downloadFile` es el modelo de efecto DOM.
  - `index.html` — la fila `.export-row` del pie (de la 021) es el lugar natural de la acción «Importar»; la sección `.archived` (`<details>` con `hidden`) es el patrón de bloque condicional.
  - `tests.html` + `tests-helpers.js` — el módulo `export file and link` muestra las costuras de stubs (prompt/alert, file) y `App.init` en `beforeEach`.
- **Patrones:**
  - Capas por archivo, scripts clásicos, namespace `window.Todo`; vista consume view-model y despacha `data-action`; efectos DOM/diálogo en `UI`; helpers puros en `todo-core`.
  - Validación estricta sin tocar el estado ante datos inválidos (decisión transversal de la épica); `localStorage` se escribe por la suscripción ya existente, sin acción extra.
  - Código y tests en inglés, textos visibles en español.
- **Dominio:** `docs/domains/001-lista-de-tareas.md` — «importar» (dos semánticas, validación estricta) y «enlace portable» ya son conceptos documentados con anclas.
- **Producto:** `product-docs/funcionalidades/006-exportar.md` cubre la salida; `referencia/formato-exportacion.md` el documento; la entrada (importar) es funcionalidad nueva a documentar al cierre.
- **Lecciones:** `idioma-del-codigo`, `comunicacion-en-codigo`, `fidelidad-al-plan` (mismas que la 021; consultadas esta sesión).
- **Decisiones:** D018 (vanilla JS, `file://`, sin build), D001 (scripts clásicos), D028 (letra ZOMBIE en la suite).

## Conectividad

**Veredicto:** conectada.

Todo lo que la tarea asume existe: `App.importDocument`/`parseDocument`/`importDocument` dan la validación estricta y las dos semánticas; `decodeDocument` y `EXPORT_HASH` dan la decodificación del enlace; el mecanismo de dispatch (`data-action`, incluido `change` para el selector de archivo) y la fila del pie dan los puntos de cableado; la persistencia tras importar ya ocurre por la suscripción de `App`. La propuesta antes de aplicar (estado de vista «importación pendiente») y la lectura del fragmento al cargar son piezas pequeñas que la propia tarea crea dentro de su alcance.

## Plan técnico

**Subsistema:** capas por archivo con namespace `window.Todo` —`todo-core` (helpers neutros y codec del enlace), `todo-domain` (`TaskList` con `parseDocument`/`importDocument`), `todo-storage` (localStorage), `todo-ui` (render, dispatch delegado por `data-action` y efectos de navegador), `app` (fachada con `viewState` y `viewModel`)—. El dominio ya valida un documento sin tocar el estado y lo aplica en dos semánticas; la tarea añade las dos entradas —archivo y enlace entrante— que convergen en una propuesta de importación pendiente en `viewState`, que la persona resuelve como reemplazar, copiar o descartar.

Decisiones transversales: la propuesta es estado de vista (`viewState.pendingImport`), no un diálogo nativo —elegir entre tres salidas se presta a un bloque condicional renderizado, patrón de `.archived` con `hidden`, que el contrato de vista cubre entero (view-model → render, botones → `data-action`)—; la validación estricta antecede a la propuesta —solo se propone lo que `parseDocument` acepta— e `importDocument` revalida al aplicar; la lectura del archivo y los avisos son efectos de `UI`; el inverso del enlace es helper neutro de `todo-core`.

- [x] Helper inverso del enlace en `todo-core.js`: extraer de una URL la carga cruda del fragmento `#export=`, devolviendo `null` solo cuando no hay enlace
  - Aporta: cierra el par con `documentLink` donde viven el codec y la clave; al ser puro sobre una cadena, la suite lo prueba sin tocar `location`
  - Contexto: el fragmento es un canal compartido —los `href="#/…"` de filtros y vistas ocupan el mismo espacio—, así que el helper solo reconoce la clave `export`
- [x] Propuesta de importación en la fachada (`app.js`): `viewState.pendingImport` como documento validado pendiente; `App.offerImport(candidate)` valida con `parseDocument` —sin tocar el estado— y registra la propuesta o devuelve el motivo; `App.applyImport(mode)` aplica el pendiente y lo despeja; `App.dismissImport()` lo descarta; `viewModel` expone la propuesta resumida y `actions` las acciones de resolución
  - Aporta: archivo y enlace convergen en una sola vía —ambos «ofrecen» el candidato—, la elección queda como acciones del contrato de vista y la aplicación reusa `App.importDocument` intacta, con su corrección del estado de vista
  - Contexto: `reset()` de la fachada debe despejar también la propuesta —`TestKit.resetApp` parte de ahí—; el resumen del view-model basta con los conteos del documento (listas y tareas)
- [x] Entrada por archivo en `index.html`/`todo-ui.js`: acción «Importar» en `.export-row` que abre un selector de archivo oculto, cuyo `change` lee el archivo y ofrece su texto; el fallo de lectura avisa
  - Aporta: la entrada por archivo usa el mecanismo único de `data-action` —`click` para abrir el selector, `change` para leer— y la lectura queda en la capa de efectos DOM junto a `downloadFile`
  - Contexto: el input oculto necesita `value = ''` tras cada lectura o el `change` no vuelve a disparar al elegir el mismo archivo; `file.text()` cubre la lectura sin dependencias
- [x] Bloque de propuesta en `index.html`, `todo-ui.js` y `style.css`: sección condicional (patrón `.archived` con `hidden`) visible mientras hay propuesta, con el resumen del contenido y tres acciones —aplicar como reemplazo, aplicar como copia, descartar— con sus entradas en `dispatchTable`
  - Aporta: la propuesta se renderiza como cualquier otra región a partir del view-model y se resuelve por el mismo dispatch; las etiquetas son cortas y en español, el estilo se construye con tokens de `DESIGN.md`
  - Contexto: al implementar se aplica la guía de estilo (skill `aplicar-guia-estilo`); el aviso de rechazo es un `alert` como los diálogos existentes, con el motivo traducido a una frase clara
- [x] Detección del enlace entrante en `App.init`: tras cargar, leer la carga con el helper de `todo-core`; si hay, ofrecerla por la misma vía del archivo y consumir el fragmento de la URL
  - Aporta: un enlace recibido propone importar en lugar de ignorarse, y consumir el fragmento deja la barra limpia —una recarga no repite lo ya ofrecido ni un descarte se desdice solo—
  - Contexto: el consumo del fragmento es tolerante —`history.replaceState` dentro de `try/catch`; si el navegador lo veta sobre `file://`, la propuesta sigue en pie y una recarga la repite, degradación aceptable—; para que el helper sea sustituible en tests conviene leerlo del namespace en tiempo de uso, no destructurarlo en la cabecera del IIFE
- [x] Pruebas en `tests.html`: módulo nuevo para la importación por archivo y enlace, reutilizando las costuras del arnés —stubs de `alert`, inyección de `File` en el input y stub del helper del enlace para el arranque— restauradas en `afterEach`
  - Aporta: cubre las dos entradas, los tres desenlaces de la propuesta y los rechazos sin archivos ni navegación reales
  - Contexto: las dos semánticas ya están cubiertas a nivel de dominio en `export and import documents`; aquí se prueba el cableado —propuesta, elección, avisos y persistencia—

## Suite de pruebas esperada

Casos de uso: **CU1** importar desde un archivo; **CU2** abrir la app con un enlace recibido; **CU3** resolver la propuesta (reemplazar, copiar, descartar); **CU4** rechazar contenido inválido.

- CU1 — La acción de importar con un archivo válido muestra la propuesta —resumen del contenido y las opciones— sin tocar el estado hasta elegir. (O)
- CU1 — Un segundo archivo mientras hay propuesta la reemplaza: la propuesta refleja lo último ofrecido. (M)
- CU2 — Abrir la aplicación con un enlace válido muestra la propuesta con el contenido del enlace, sin aplicarlo. (I)
- CU2 — El enlace producido por la exportación se reconoce al abrirlo y devuelve el mismo documento; un fragmento ajeno —de filtro o vista— no propone nada. (B)
- CU2 — Abrir la aplicación sin enlace arranca sin propuesta. (Z)
- CU3 — Reemplazar aplica el documento como estado completo y despeja la propuesta. (O)
- CU3 — Copiar incorpora el contenido junto al existente —sin destruirlo ni mezclarlo— y despeja la propuesta. (M)
- CU3 — Descartar despeja la propuesta sin tocar el estado. (Z)
- CU3 — El resultado de aplicar persiste: el contenido importado sobrevive a la recarga. (I)
- CU4 — Un archivo mal formado o de formato o versión desconocidos produce un aviso claro, sin propuesta y con el estado intacto. (E)
- CU4 — Un enlace cuya carga no decodifica o cuyo documento no valida produce el mismo aviso claro, con el estado intacto y la app arrancada con normalidad. (E)
- El pie expone la acción «Importar» junto a las de exportación. *(regresión de interfaz, sin letra)*

## Desviaciones del plan

- **El helper del enlace devuelve la carga cruda, no el documento decodificado.** Motivo: si decodificara, «no hay enlace» y «enlace corrupto» producirían ambos `null` y una carga indecodificable no podría avisar, contradiciendo la expectativa CU4 de la suite. Decisión: `linkPayload` devuelve la carga del fragmento `#export=` (o `null` solo por ausencia) y la decodificación queda en el llamador —`App.init` decodifica y ofrece, y una carga que no decodifica llega a `offerImport` como `null` y se rechaza con aviso. Desviación menor: no cambia el objetivo ni los criterios; el plan quedó actualizado.

## Revisión

- Subagente: 2026-09-28 — Aprueba
- Usuario: 2026-09-28 — Aprueba
