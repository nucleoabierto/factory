# Actualizar la documentación de producto y de dominios de Factory

## Estado

[ ] Pendiente | [~] En progreso | [r] En revisión | [x] **Completada** | [!] Bloqueada

## Tipo

mantenimiento

## Objetivo

Completar la documentación del propio proyecto Factory, que hoy tiene dos huecos: la visión (`docs/vision-proyecto.md`) vive en el `docs/` de proceso en lugar de en la documentación de producto que la propia arquitectura del sistema prescribe (D024), y `docs/domains/` está vacío —solo el índice con «Ninguno todavía»— pese a que el sistema de skills ya constituye un dominio documentable.

## Dependencias

- Ninguna

## Entrada

- `docs/vision-proyecto.md` como contenido a reubicar.
- `docs/decisions/D024-documentacion-producto-separada-anclas-suite.md` y `D023-mkdocs-ssg-documentacion-producto.md` como marco de la documentación de producto.
- `docs/decisions/D026-documento-dominio-referencia-explicacion.md` y la plantilla del skill `documentar-dominio` como formato de los documentos de dominio.
- `docs/domains/README.md` como índice a completar.
- `.agents/skills/` como código documentable.

## Resultado esperado

- Un directorio de documentación de producto para Factory (siguiendo D024: `product-docs/` separado de `docs/`, con su `mkdocs.yml` mínimo conforme a D023 si procede) que incluya la visión movida desde `docs/vision-proyecto.md`, con las referencias actualizadas donde aparezca la ruta antigua.
- Los documentos de dominio en `docs/domains/NNN-slug.md` que cubran los dominios identificables del sistema (p. ej. ciclo de tareas y `TODO.txt`, flujo de idea a tarea y propuestas, sub-flujo de desarrollo, documentación viva, sistema de aprendizaje por experiencias), con referencia del modelo —lenguaje ubicuo con anclas a los archivos— y explicación del dominio —fronteras, invariantes, decisiones relevantes enlazadas.
- `docs/domains/README.md` actualizado con una línea por dominio.
- Las decisiones nuevas que la tarea introduzca (p. ej. ubicación exacta de la documentación de producto del propio Factory) registradas con `decisiones-diseno`.

## Criterios de calidad

- `docs/vision-proyecto.md` ya no existe en su ubicación original o queda como referencia a la nueva ubicación; ninguna referencia del repositorio apunta a una ruta rota.
- Cada documento de dominio sigue la plantilla vigente: referencia del modelo con anclas verificables a los archivos del proyecto y explicación con fronteras y decisiones enlazadas a `docs/decisions/`.
- `docs/domains/README.md` lista todos los documentos creados; ningún documento queda sin entrada.
- La documentación de producto respeta la separación `product-docs/` frente a `docs/` decidida en D024.

## Procedimiento sugerido

1. Invocar `consultar-decisiones` y `consultar-lecciones` para el trabajo.
2. Revisar `documentar-dominio` (plantilla y reglas del índice) y `documentar-producto` (estructura de `product-docs/`, incluido el de `todo-app/` como referencia).
3. Definir la estructura de `product-docs/` de Factory, mover la visión y actualizar referencias (`README.md`, `docs/definicion-proyecto.md`, skills que la mencionen).
4. Identificar los dominios del sistema y crear cada documento; actualizar `docs/domains/README.md`.
5. Registrar con `decisiones-diseno` cualquier decisión estructural nueva.

## Notas

- La visión es contenido de producto, no de proceso: su traslado alinea al propio Factory con la arquitectura que exige a los proyectos evaluados.

## Revisión

- Subagente: 2026-09-28 — Aprueba
- Usuario: 2026-09-28 — Aprueba
