# Portabilidad y listas compartidas sin servidor

## Estado

[x] Planificada | [ ] Completada

## Objetivo

Abriendo `index.html`, la persona puede exportar su estado a un archivo descargable o a un enlace autocontenido, e importar un archivo o enlace recibido eligiendo entre reemplazar su estado o incorporarlo como copia. Un documento inválido se rechaza sin tocar el estado, y los datos exportados pueden volver a entrar sin pérdida.

## Alcance

- **Dentro:** formato de exportación propio y versionado del estado completo, serialización bidireccional validada, exportación como archivo y como enlace portable, importación con elección reemplazar/incorporar y reasignación de identificadores.
- **Fuera:** sincronización continua y colaboración en vivo, cifrado del contenido, fusión de estados divergentes, formatos ajenos y respaldo automático.

## Piezas

- [ ] docs/tasks/020-formato-de-exportacion.md — Formato versionado del estado y su serialización bidireccional validada
- [ ] docs/tasks/021-exportar-contenido.md — Exportar el estado como archivo descargable y como enlace portable
- [ ] docs/tasks/022-importar-contenido.md — Importar desde archivo o enlace, reemplazando o incorporando como copia

## Plan técnico

- **Orden:** 020 → 021 → 022, estrictamente secuencial: el formato precede a la exportación y esta a la importación.
- **Dependencias:** cada pieza extiende el mismo `TaskList`/`Storage`/`UI`/`App` de `app.js` y alimenta la suite QUnit de `tests.html`.
- **Decisiones transversales:** el documento de exportación es legible, versionado y autocontenido; la validación de entrada es estricta y nunca toca el estado ante datos inválidos; al incorporar como copia los identificadores se reasignan; el enlace viaja en claro y su límite de tamaño se comunica; el formato tolera las épicas 002 y 003 según el orden de ejecución; vanilla JS sin build, QUnit por CDN con aislamiento, Conventional Commits con ámbito `todo-app`.

## Criterio de cierre

Las tres piezas completadas, la suite de `tests.html` en verde, la aplicación funcional sin errores en consola y un estado exportado que vuelve a entrar equivalente, por archivo y por enlace.

## Revisión

- Usuario: 2026-09-24 — Aprueba
