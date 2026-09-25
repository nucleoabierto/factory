# D023: MkDocs como SSG de la documentación de producto

## Estado

Aceptada

## Contexto

La documentación de producto de todo-app vive en un directorio de Markdown puro, legible directamente en el repositorio, sin build obligatorio. Cuando se quiera publicar el sitio navegable, hace falta un generador de sitio estático cuya entrada sea ese directorio sin configuración obligatoria y cuya configuración sea opcional e incremental. Los candidatos evaluados fueron MkDocs, Zensical, VitePress, mdBook y docsify; Sphinx ya estaba descartado.

## Decisión

Usamos MkDocs como generador del sitio de documentación de producto, con un `mkdocs.yml` que declare solo `site_name` como nivel cero de configuración.

## Justificación

Es el candidato que mejor satisface el criterio estructural: con una línea de configuración —externa al directorio de documentos— produce un sitio con índice navegable autogenerado y búsqueda, mientras el contenido sigue siendo Markdown puro. La personalización es incremental (`nav` → Material → plugins) y la instalación como herramienta aislada con `pipx` evita gestionar entornos. VitePress y docsify cumplen el cero configuración literal pero no generan índice sin configuración adicional; mdBook exige el manifiesto `SUMMARY.md`; Zensical (0.1.0) es aún inmaduro, pero lee `mkdocs.yml` nativamente, así que esta elección deja abierta la migración a Zensical casi sin coste.

## Referencias

- `docs/research/2026-09-ssg-markdown-first.md` — investigación comparativa
- `docs/tasks/083-investigar-ssg-markdown.md` — tarea que la produjo
- `docs/epics/001-documentacion-producto-y-direccion.md` — épica del conjunto
