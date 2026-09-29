# Exportar el estado como archivo descargable y como enlace portable

## Estado

[ ] Pendiente | [ ] En progreso | [ ] En revisión | [x] Completada | [ ] Bloqueada

## Tipo

desarrollo

## Objetivo

Permitir a la persona sacar su contenido de la aplicación en dos formas: un archivo descargable que puede guardar o enviar, y un enlace que lleva los datos dentro para entregar la lista a otra persona.

## Dependencias

- 020

## Entrada

- La serialización estado→documento de la tarea 020.
- La estructura de la página `index.html` y la presentación `UI`.

## Resultado esperado

- La interfaz ofrece una acción de exportar que produce un archivo descargable con el documento del estado actual.
- La misma acción, u otra junto a ella, produce un enlace portable que codifica el documento —para abrirlo en otro navegador sin servidor—.
- El enlace generado es completo y autocontenido: no depende del estado del navegador que lo creó.
- Si el estado es demasiado grande para un enlace, la aplicación lo indica en lugar de producir un enlace roto o truncado.

## Criterios de calidad

- El archivo descargado contiene el documento bien formado con el estado completo.
- El enlace producido transporta el mismo documento que el archivo.
- Abrir el enlace en un contexto sin datos previos ofrece el contenido para importar (la recepción se completa en el borrador 03).
- La suite de `tests.html` pasa en verde con tests nuevos de la generación del archivo y del enlace, incluido el límite de tamaño.
- Sin errores en consola.

## Procedimiento sugerido

1. Implementar la descarga del documento como archivo (blob o equivalente, sin dependencias).
2. Implementar la codificación del documento en la URL del enlace (fragmento o parámetro), con su límite de tamaño detectado y comunicado.
3. Cablear ambas acciones en la interfaz en un lugar visible y discreto (pie o cabecera).
4. Escribir los tests de generación y del límite del enlace; verificar en el navegador.

## Notas

- Los commits de este proyecto llevan el ámbito `todo-app` en Conventional Commits (`tipo(todo-app): descripción`).
- El enlace en claro es decisión de la propuesta: quien comparte elige el canal; el cifrado queda fuera de alcance.

## Contexto

- **Archivos similares:**
  - `app.js` — la fachada `App` ya expone `exportDocument()` (pasarela a `taskList.toDocument()`, de la tarea 020); `App.actions` declara las acciones que la vista puede despachar y `viewModel()` el contrato de datos que el render consume.
  - `todo-ui.js` — `dispatchTable` resuelve eventos delegados por `data-action` (click/change/keydown/dblclick); `renderFooter` actualiza contador, filtros y vistas. Las acciones nuevas se cablean aquí sin listeners por render.
  - `index.html` — el footer ya se organiza en filas (`.views-row`, `.filters-row`, `.footer-row`); el lugar «visible y discreto» del procedimiento encaja en una fila del pie.
  - `todo-domain.js` — `toDocument` produce el documento `{app, version, lists, tasks}`; `parseDocument`/`importDocument` ya validan e importan (la recepción del enlace es tarea 022).
  - `todo-storage.js` — objeto de infraestructura tolerante a APIs ausentes (try/catch + degradación); la descarga y el portapapeles/enlace son también efectos de navegador que conviene aislar con el mismo cuidado.
  - `tests.html` + `tests-helpers.js` — el módulo `export and import documents` ya cubre el documento; `TestKit.resetApp`/`fixture` dan el estado limpio y el DOM de prueba por módulo.
  - `style.css` — `.clear-completed` es el modelo de acción discreta del pie (texto pequeño, sin fondo ni borde); los tokens de `DESIGN.md` rigen cualquier estilo nuevo.
- **Patrones:**
  - Capas por archivo cargadas como scripts clásicos en orden de dependencias, compartiendo lo imprescindible por `window.Todo`; la vista solo conoce el view-model y despacha por `data-action`, sin conocer la fachada.
  - Las acciones de la vista llegan a `App.actions` como pasarelas a `App`; nada de lógica de navegador (blob, `URL.createObjectURL`, codificación del fragmento) se decide en el render.
  - Código, identificadores, claves y tests en inglés; textos visibles de la interfaz en español.
- **Dominio:** `docs/domains/001-lista-de-tareas.md` — el «documento de exportación» es el segundo contrato de datos: versionado, autocontenido, con la entrada viajando como lista más; exportar es leerlo, no transformarlo.
- **Producto:** `product-docs/referencia/estado-persistido.md` documenta el formato `{lists, tasks}` persistido; el documento de exportación lo envuelve con `app`/`version`. La acción de exportar es funcionalidad nueva sin documento propio aún — `documentar-producto` lo evaluará al cerrar.
- **Lecciones:**
  - `idioma-del-codigo` — código y tests en inglés, documentación en español.
  - `comunicacion-en-codigo` — nombres de parámetros que no presuponen lo validado; comentarios con razones duraderas, no narrativa de sesión.
  - `fidelidad-al-plan` — el diff se ciñe al plan aprobado; cualquier extra se declara como desviación.
- **Decisiones:**
  - D018 (raíz) — vanilla JS sin build ni framework, abierta por `file://`: la descarga y el enlace deben funcionar sin servidor ni ES modules.
  - D001 (subproyecto) — scripts clásicos y namespace `window.Todo`: si el enlace necesita codificación reusable, vive en una capa compartida, no en módulos.
  - D028 (raíz) — la suite de pruebas esperada anota la letra ZOMBIE por expectativa.

## Conectividad

**Veredicto:** conectada.

Todo lo que la tarea asume existe: `App.exportDocument()` ya entrega el documento versionado del estado completo; el mecanismo único de eventos (`dispatchTable` por `data-action`) y las filas del pie en `index.html` dan el punto de cableado; el arnés QUnit (`TestKit.resetApp`/`fixture`) y el módulo `export and import documents` de `tests.html` alojan las pruebas nuevas. La descarga del archivo y la codificación del enlace se apoyan en APIs del navegador (`Blob`, `URL.createObjectURL`, `encodeURIComponent`) más helpers pequeños que la propia tarea crea dentro de su alcance. La recepción del enlace —leer el fragmento y ofrecer la importación— es alcance de la tarea 022, no una carencia.

## Plan técnico

**Subsistema:** capas por archivo con namespace `window.Todo` —`todo-core` (helpers neutros), `todo-domain` (`TaskList` con `toDocument`/`importDocument`), `todo-storage` (localStorage), `todo-ui` (render + dispatch delegado por `data-action`), `app` (fachada)—. El documento `{app, version, lists, tasks}` ya sale por `App.exportDocument()`; la tarea añade dos salidas —archivo descargable y enlace autocontenido— cableadas como acciones del pie.

Decisiones transversales del plan: el codec del enlace vive en `todo-core` junto a las constantes del documento; los efectos de navegador (anchor temporal de descarga, `prompt`, `alert`) viven en `UI`, que ya posee los diálogos; el cableado usa el mecanismo único de `data-action`.

- [x] Codec y composición del enlace en `todo-core.js`: codificar el documento a una cadena segura para URL y decodificarla de vuelta, la clave del fragmento (`export`), el límite del enlace (`EXPORT_LINK_MAX`, ~8000 caracteres) y la composición `base + #export= + payload` que devuelve un resultado discriminable (`{ok, url}` / `{ok:false, reason}`)
  - Aporta: convierte el documento en una carga portable y compacta (base64url sobre UTF-8), declara el límite que la interfaz comunicará y concentra la forma del enlace en un punto puro y probado; la decodificación cierra el par —la suite verifica el viaje de ida y vuelta y la tarea 022 la consumirá al recibir—
  - Contexto: el fragmento usa una clave propia (`#export=`) distinta de los `href="#/…"` de filtros y vistas, que son solo disparadores y nunca se leen; `TextEncoder` + `btoa` cubren UTF-8 sin dependencias
- [x] `App.exportFile()` y `App.exportLink()` en `app.js`, con sus pasarelas en `App.actions`
  - Aporta: la fachada orquesta la salida —serializa el documento en JSON legible para el archivo, y para el enlace delega en el codec pasando la base de `location` sin fragmento, así el enlace apunta a la propia app dondequiera que viva— y entrega a la vista un resultado que ella traduce a diálogo
  - Contexto: `exportDocument()` ya existe; el nombre de archivo es fijo (`todo-app.json`)
- [x] Efectos de navegador en `todo-ui.js`: `UI.downloadFile(name, text)` (Blob + `URL.createObjectURL` + anchor temporal) y las entradas `export-file`/`export-link` del `dispatchTable`
  - Aporta: concentra los efectos DOM y de diálogo en la capa que ya los posee (`prompt` en `add-list`); el enlace se presenta en un `prompt` para copiarlo a mano y el exceso de tamaño en un `alert`, sin listeners por render
  - Contexto: `navigator.clipboard` no está garantizado sobre `file://`, de ahí `prompt` en lugar de copia automática
- [x] Fila de acciones de exportación en `index.html` y su estilo en `style.css` con los tokens de `DESIGN.md`
  - Aporta: las dos acciones quedan visibles y discretas en una fila nueva del pie (patrón de `.views-row`/`.filters-row`), como acciones secundarias —texto en `--color-text-muted`, hover en acento, `font-label`— con etiquetas cortas en español
  - Contexto: al implementar se aplica la guía de estilo (skill `aplicar-guia-estilo`); si la fila nueva exige declarar el patrón en `DESIGN.md`, se evalúa al cierre con `documentar-guia-estilo`
- [x] Pruebas en `tests.html`: módulo nuevo para archivo y enlace, con las costuras del arnés —stubs de `prompt`, `alert`, `URL.createObjectURL` y del click del anchor— restauradas en `afterEach`
  - Aporta: cubre la generación del archivo y del enlace, el viaje de ida y vuelta y el límite, sin descargas ni navegación reales
  - Contexto: el patrón de stub ya existe en el módulo `list management` (`window.prompt` guardado y restaurado)

## Suite de pruebas esperada

Casos de uso: **CU1** exportar el estado como archivo descargable; **CU2** producir el enlace portable; **CU3** comunicar el límite de tamaño.

- CU1 — La acción de exportar produce una descarga cuyo contenido es el documento bien formado del estado actual: marcador, versión, todas las listas y todas las tareas. (I)
- CU1 — Con el estado vacío, la descarga sigue produciendo un documento válido —la entrada sola, sin tareas—. (Z)
- CU2 — La acción del enlace produce una URL completa hacia la propia página con el documento codificado en el fragmento; decodificarlo devuelve el mismo documento que el archivo, sin tocar el almacenamiento local. (I)
- CU2 — El enlace transporta íntegros los textos con caracteres fuera de ASCII (tildes, emoji). (B)
- CU2 — Con varias listas y tareas —incluidas archivadas y recurrentes— el enlace transporta el estado completo. (M)
- CU3 — Un estado que excede el límite no produce enlace: la aplicación lo indica en lugar de entregar una URL truncada. (E)
- CU3 — El límite se mide sobre la URL completa, base incluida: con una base lo bastante larga, incluso un estado pequeño puede quedar sin enlace. (B)
- El pie expone las dos acciones de exportación. *(regresión de interfaz, sin letra)*

## Revisión

- Subagente: 2026-09-28 — Aprueba
- Usuario: 2026-09-28 — Aprueba
