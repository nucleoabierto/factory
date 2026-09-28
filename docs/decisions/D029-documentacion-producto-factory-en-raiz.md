# D029: La documentación de producto de Factory vive en `product-docs/` en la raíz

## Estado

Aceptada

## Contexto

Factory documenta su proceso bajo `docs/` —tareas, decisiones, investigaciones, dominios— pero su contenido de producto no tenía hogar propio: la visión del proyecto vivía como `docs/vision-proyecto.md`, mezclada con los artefactos de proceso. Faltaba decidir dónde vive la documentación de producto del propio Factory: qué es, para quién y hacia dónde va.

## Decisión

La documentación de producto de Factory vive en `product-docs/`, un directorio propio en la raíz del repositorio, separado del `docs/` de proceso y consumible por MkDocs sin configuración obligatoria. El `mkdocs.yml` de la raíz declara solo `site_name` y `docs_dir: product-docs`. La visión se traslada a `product-docs/vision.md` y todas las referencias del repositorio —vivas e históricas— se actualizan a la nueva ruta.

## Justificación

Separar el directorio mantiene «un hogar por hecho»: el producto documenta qué es Factory y hacia dónde va, `docs/` documenta cómo se trabaja, y ningún artefacto de proceso entra en el sitio. La configuración del SSG vive fuera del directorio de documentos, que contiene solo Markdown puro; `docs_dir` es el mínimo funcional necesario para apuntar a `product-docs/`. Las referencias a la ruta antigua se actualizan también en los documentos históricos: en este caso la actualización es un cambio mecánico de ruta que no altera el contenido registrado, así que no compromete la estabilidad temporal —que protege el sentido de los documentos de entrada, no una ruta que hoy estaría rota.

## Referencias

- `docs/tasks/100-documentacion-producto-y-dominios-factory.md` — tarea que la consolida
- `docs/lessons/estabilidad-temporal.md` — el principio que delimita qué se reescribe y qué no en documentos históricos
