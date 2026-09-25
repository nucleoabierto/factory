# D024: Documentación de producto separada y anclada a la suite

## Estado

Aceptada

## Contexto

todo-app ya tiene documentación de proceso bajo `docs/` (tareas, dominios, épica) y un documento de dominio que describe el modelo. Faltaba la capa de producto: qué hace la aplicación y cómo usarla. El patrón de living documentation pide además que las funcionalidades se anclen a la suite de pruebas para no quedar obsoletas sin que un test lo delate.

## Decisión

La documentación de producto vive en `product-docs/`, un directorio propio en la raíz de todo-app, separado del `docs/` de proceso y consumible por MkDocs sin configuración obligatoria. Los documentos de funcionalidad declaran escenarios en lenguaje ubicuo anclados a la suite de pruebas del proyecto por nombre de módulo y título de prueba; los hechos de dominio no se repiten: se referencia el documento de dominio.

## Justificación

Separar el directorio mantiene «un hogar por hecho»: producto documenta el comportamiento, dominio el modelo, y `docs/` el proceso; ningún artefacto de proceso entra en el sitio. La configuración del SSG vive fuera del directorio de documentos (`todo-app/mkdocs.yml`), que contiene solo contenido: borrarla no toca ni un markdown. El ancla por nombre —módulo y título del test, no número de línea— es estable frente a reordenamientos de la suite. La estructura Diátaxis ligera (guías, funcionalidades, referencia) da hogar a cada tipo de contenido sin multiplicar directorios.

## Referencias

- `docs/tasks/084-docs-producto-todo-app.md` — tarea que la consolida
- `docs/research/2026-09-documentacion-producto-y-roadmap.md` — patrón de documentos de funcionalidad y estructura Diátaxis ligera
- D023 — el SSG adoptado (MkDocs)
- `todo-app/docs/domains/001-lista-de-tareas.md` — documento de dominio referenciado, no duplicado
