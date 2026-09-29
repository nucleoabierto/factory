# Formato versionado del estado y su serialización bidireccional validada

## Estado

[ ] Pendiente | [ ] En progreso | [ ] En revisión | [x] Completada | [ ] Bloqueada

## Tipo

desarrollo

## Objetivo

Definir el documento de exportación —formato propio, legible y versionado— y darle al dominio la capacidad de producirlo desde el estado y de consumirlo con validación, tolerando datos corruptos o de versión desconocida. Sin cambios visibles para el usuario todavía.

## Dependencias

- Ninguna.

## Entrada

- El modelo `TaskList` en `app.js` con sus invariantes y la validación `isValidTask` al cargar.
- La capa `Storage` como referencia del contrato de datos actual.
- La suite QUnit en `tests.html` con aislamiento de `localStorage`.

## Resultado esperado

- Existe un formato de documento propio, legible (JSON o equivalente), con campo de versión explícito, que cubre el estado completo: las tareas y lo que las épicas anteriores hayan añadido cuando se ejecute (listas, fechas).
- El dominio puede serializar el estado actual a ese documento y reconstruir el estado desde un documento válido.
- La validación de entrada rechaza documentos corruptos, malformados o de versión desconocida sin tocar el estado actual, e informa del motivo.
- Los identificadores del documento importado pueden reasignarse al incorporarlo, de modo que no colisionen con los existentes.

## Criterios de calidad

- Exportar y reimportar el mismo estado produce un estado equivalente (ida y vuelta sin pérdida).
- Un documento con JSON corrupto, estructura inesperada o versión desconocida se rechaza sin romper la app ni alterar el estado.
- Al incorporar un documento junto a un estado existente, no quedan identificadores duplicados.
- Las invariantes existentes se mantienen tras importar: sin tareas vacías, identificadores únicos y crecientes.
- La suite de `tests.html` pasa en verde con tests nuevos del formato, la validación y la reasignación de identificadores.
- Sin errores en consola.

## Procedimiento sugerido

1. Diseñar el documento: campos, versión y correspondencia con el estado del dominio; documentarlo en el propio formato o en una nota del propio archivo.
2. Implementar la serialización estado→documento y la deserialización documento→estado con validación estricta y reasignación de identificadores.
3. Decidir cómo se incorpora lo importado (reemplazo vs. copia) a nivel de dominio, dejando la elección para la capa superior.
4. Escribir los tests de ida y vuelta, rechazo de entradas inválidas y reasignación; verificar en el navegador.

## Notas

- Los commits de este proyecto llevan el ámbito `todo-app` en Conventional Commits (`tipo(todo-app): descripción`).
- El formato versionado es la decisión transversal de la propuesta: permite que listas y fechas se sumen al documento cuando existan, sin romper exportaciones anteriores.

## Contexto

- Archivos similares:
  - `todo-domain.js`: `TaskList.load` es hoy el único punto de entrada masiva y ya tolera dos formas persistidas saneando por ítem (`isValidTask`/`isValidList`, deduplicación de listas, descarte de huérfanas, `date`/`recur` que degradan solos); `tasks()`/`lists()` devuelven copias —la fuente de la serialización—; `#nextId`/`nextId()` gobiernan la unicidad de ids para la reasignación; `reset()` fija la semántica de reemplazo.
  - `todo-storage.js`: `loadTasks`/`saveTasks` fijan el patrón de tolerancia JSON (parse con try/catch, rechazo de no-objetos) y la frontera de infraestructura: mueve datos, no conoce el modelo.
  - `todo-core.js`: hogar de las constantes neutras (`INBOX`, `RECURS`) y validadores puros (`isValidDate`); candidato natural para la constante de versión del formato.
  - `app.js`: `App.save` ya produce `{lists, tasks}` —el documento de exportación cubre ese mismo estado más la versión—; la fachada decide reemplazar vs. incorporar (paso 3 del procedimiento).
  - `tests.html`: el módulo `lists and migration` fija el patrón de tests de `load` con datos buenos, corruptos y migrados; arnés `TestKit.resetApp`/`fixture`.
- Patrones:
  - Estado privado en `TaskList` con lecturas que devuelven copias; toda mutación pasa por operaciones que notifican.
  - Validación por ítem con degradación local en `load` —un campo malo cae solo, el ítem sobrevive— frente a la validación de documento de esta tarea, que es estricta y rechaza el todo sin tocar el estado.
  - Errores comunicados por valor de retorno (`null`), no por excepciones.
  - Scripts clásicos con IIFE y namespace `global.Todo`; nada de ES modules.
- Lecciones:
  - `idioma-del-codigo`: código y tests en inglés, documentación en español.
  - `comunicacion-en-codigo`: parámetros bajo verificación se nombran `candidate` o equivalente, no con el nombre del tipo validado; los comentarios explican razones duraderas (p. ej. por qué la importación es estricta mientras `load` es tolerante).
  - `fidelidad-al-plan`: el diff es fiel al plan aprobado; extras se declaran en `## Desviaciones` o se revierten.
  - `scope-del-subproyecto`: los artefactos de esta tarea viven dentro de `todo-app/`.
- Decisiones:
  - D001: cada capa vive en su archivo compartiendo `window.Todo`; la serialización del estado pertenece al dominio (`todo-domain.js`), no a `Storage`.
  - Épica 004 (`docs/epics/004-portabilidad-y-compartir.md`): documento legible, versionado y autocontenido; validación de entrada estricta que nunca toca el estado ante datos inválidos e informa del motivo; al incorporar como copia los identificadores se reasignan; el formato tolera lo añadido por las épicas 002 y 003 (listas, archivado, fechas, recurrencia), que ya existen.

## Conectividad

Veredicto: **conectada**.

Todo lo asumido existe: `TaskList` con su estado privado y lecturas en
copia (`tasks()`/`lists()`/`nextId()`), la validación por ítem
(`isValidTask`/`isValidList`/`isValidDate`) y la entrada masiva
tolerante (`load`), `reset()` como semántica de reemplazo, el contrato
de datos `{lists, tasks}` que `App.save` ya produce, y la suite QUnit
con aislamiento en `TestKit`. Las capacidades nuevas —serializar a un
documento versionado, validarlo estricto y reasignar ids al incorporar—
son el objeto mismo de la tarea, no infraestructura previa que falte.

## Plan técnico

El estado vive privado en `TaskList` (`todo-domain.js`): se lee por
copias (`tasks()`, `lists()`, `nextId()`) y solo entra en masa por
`load`, que es tolerante —sanea ítem a ítem y degrada campos malos en
solitario—. `Storage` solo mueve JSON entre el modelo y `localStorage`;
`App` compone las capas y expone la API pública. La tarea añade al
dominio un segundo contrato de datos, el documento de exportación:
versionado, autocontenido y de validación estricta —al contrario que
`load`, un ítem inválido rechaza el documento entero sin tocar el
estado—.

Decisiones transversales del plan:

- El documento es un objeto JSON legible:
  `{ app: 'todo-app', version: 1, lists: [...], tasks: [...] }`, con
  `lists` y `tasks` en la misma forma que el estado persistido
  —incluidos `archived`, `date` y `recur`— y la entrada como una lista
  más.
- La entrada se parte en dos tiempos: `parseDocument` valida sin tocar
  el estado e `importDocument` aplica. Así la capa superior podrá
  validar antes de pedir la elección reemplazar/incorporar (tarea 022).
- El rechazo informa con códigos de motivo en inglés
  (`'malformed-json'`, `'unknown-format'`, `'unsupported-version'`,
  `'invalid-lists'`, `'invalid-tasks'`…), no con excepciones.

- [x] Declarar el contrato del formato en `todo-core.js`: `EXPORT_APP`
  (`'todo-app'`), `EXPORT_VERSION` (`1`) e `IMPORT_MODES`
  (`['replace', 'copy']`)
  - Aporta: el documento tiene un hogar declarativo único que dominio y
    fachada comparten; el versionado queda explícito desde el primer
    día.
- [x] Añadir `TaskList.toDocument()`, que devuelve
  `{ app, version, lists, tasks }` a partir de las lecturas en copia
  - Aporta: la serialización de ida sin exponer el estado interno.
- [x] Añadir `TaskList.parseDocument(candidate)`: acepta texto JSON u
  objeto, valida estricto y devuelve `{ ok: true, document }` o
  `{ ok: false, reason }` sin mutar nada
  - Aporta: la puerta estricta de entrada, separada de la aplicación del
    documento.
  - Contexto: cualquier ítem inválido —lista o tarea mal formada, id o
    nombre de lista duplicado, `listId` sin lista, `date` o `recur`
    presentes e inválidos— rechaza el documento; los campos opcionales
    ausentes (`archived`, `date`, `recur`) se aceptan para tolerar
    exportaciones anteriores a las épicas 002/003, y `recur` exige
    `date` válida como en el dominio.
- [x] Añadir `TaskList.importDocument(candidate, mode)`: delega en
  `parseDocument`; con `'replace'` aplica el documento como estado
  completo reutilizando `load`, y con `'copy'` incorpora el contenido
  como copias —listas con id `list-N` fresco y nombre único por sufijo,
  la entrada del documento mapea a la entrada existente, tareas con ids
  nuevos y `listId` remapeado—; notifica una sola vez y devuelve
  `{ ok: true }` o el rechazo del parseo
  - Aporta: las dos semánticas de incorporación decididas a nivel de
    dominio; la elección queda para la capa superior.
  - Contexto: `load` basta para `'replace'` porque el documento ya
    llega validado; la colisión de nombres en `'copy'` se resuelve con
    el sufijo `' (copia)'` y, si persiste, `' (copia 2)'`,
    `' (copia 3)'`…
- [x] Cablear las pasarelas en `App`: `exportDocument()` e
  `importDocument(candidate, mode)`
  - Aporta: la API pública gana las operaciones sin exponer el modelo;
    los tests las ejercitan por la fachada como el resto de la suite.
- [x] Añadir un módulo nuevo de tests en `tests.html` con la suite
  esperada y verificar suite QUnit + `index.html` sobre `file://`
  - Aporta: la red que fija el formato, el rechazo estricto con motivo
    y la reasignación sin colisiones.

## Desviaciones del plan

- Menor: `App.importDocument` corrige el estado de vista tras una
  importación aceptada —la lista activa cae a la entrada si el
  reemplazo la eliminó, y la sesión de edición se cierra— y repite el
  render cuando la notificación del modelo ya había corrido con la
  vista obsoleta; sin ello la vista quedaría apuntando a una lista
  inexistente.
- Menor, tras revisión: la validación estricta rechaza también listas
  del documento cuyo nombre colisiona con el de la entrada
  permanente —el estado importado siempre la contiene— e `idMap` del
  modo copia es un `Map`, no un objeto plano, para tolerar ids foráneos
  como `__proto__`.

## Suite de pruebas esperada

Caso de uso: «Exportar el estado» — producir un documento portable.

- El documento exportado es legible, lleva marcador de aplicación y
  versión 1, y cubre todo el estado: listas con nombre y archivado,
  tareas con lista, fecha y recurrencia (O, M).

Caso de uso: «Importar un documento reemplazando el estado».

- Un documento válido reemplaza el estado completo: lo previo desaparece
  y el contenido del documento queda con sus ids y pertenencias (O).
- Ida y vuelta: exportar un estado variado —varias listas, una
  archivada, fechas y una recurrente— y reimportarlo reemplazando
  produce un estado equivalente (M).
- Un documento sin listas propias ni tareas deja el estado mínimo: solo
  la entrada (Z).
- Un documento sin los campos opcionales (`archived`, `date`, `recur`)
  importa igualmente: tolera exportaciones previas (B).

Caso de uso: «Importar un documento como copia».

- Con estado existente, las tareas incorporadas reciben ids nuevos por
  encima del mayor previo —sin duplicados— y conservan texto, estado,
  fecha y recurrencia (M).
- Una lista del documento cuyo id o nombre colisiona entra con id y
  nombre reasignados, y sus tareas apuntan a la lista nueva (B).
- Las tareas de la entrada del documento se incorporan a la entrada
  existente, que nunca se duplica (B).

Caso de uso: «Rechazar un documento inválido».

- Texto que no es JSON, valor que no es documento, marcador distinto o
  versión desconocida: rechazo con motivo y estado intacto (E).
- Un documento con un ítem inválido —tarea sin texto, lista sin nombre,
  `listId` sin lista— se rechaza entero, sin entrada parcial (E).
- Un modo de incorporación desconocido se rechaza sin tocar el estado
  (E).
- Tras una importación aceptada, el estado persistido refleja el
  contenido nuevo: la operación notifica como cualquier otra (I).

## Revisión

- Subagente: 2026-09-28 — Aprueba
- Usuario: 2026-09-28 — Aprueba
