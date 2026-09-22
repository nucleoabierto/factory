# Incluir las lecciones en la revisión técnica del subagente

## Estado

[ ] Pendiente | [ ] En progreso | [ ] En revisión | [x] Completada | [ ] Bloqueada

## Tipo

mantenimiento

## Objetivo

Que la revisión técnica del ciclo de tareas coteje el diff contra las lecciones aprendidas aplicables, no solo contra las convenciones generales. Hoy el subagente de revisión recibe el diff y la tarea, pero nadie le pasa las lecciones: la tarea 074 mostró que la revisión mejora cuando se contrasta con `docs/lessons/` (la detectó el usuario, no el proceso).

## Dependencias

- Ninguna

## Entrada

- `ejecutar-tareas`, paso de revisión técnica (lanzamiento del subagente genérico) y `revisar-implementacion` (revisión para tareas de tipo `desarrollo`).
- El skill `consultar-lecciones`, que ya resuelve qué lecciones aplican a una descripción de trabajo.
- `docs/lessons/README.md` como índice de disparadores.

## Resultado esperado

- `ejecutar-tareas` y `revisar-implementacion` actualizados para que el paquete de revisión incluya las lecciones aplicables: el encargo del subagente (o el propio revisor) coteja el diff contra las notas de `docs/lessons/` cuyos disparadores coincidan con los archivos y acciones del cambio.
- La instrucción debe permitir que el subagente de contexto aislado consulte las lecciones por sí mismo (ruta + criterio de coincidencia por disparadores), no solo recibirlas pre-cargadas.

## Criterios de calidad

- El encargo de revisión menciona explícitamente el cotejo contra `docs/lessons/` y cómo descubrir las lecciones aplicables (disparadores del índice).
- El cambio no duplica la consulta de lecciones que `ejecutar-tareas` ya hace para el ejecutor: la revisión verifica que el diff no repita errores ya aprendidos, aunque el ejecutor las haya aplicado bien.
- Las reglas se describen inline en los skills (lección de estabilidad temporal).

## Procedimiento sugerido

1. Actualizar el paso de revisión de `ejecutar-tareas` para que el encargo del subagente incluya el cotejo con `docs/lessons/`.
2. Actualizar `revisar-implementacion` con la misma instrucción en el encargo del revisor independiente.

## Notas

- Origen: corrección del usuario durante la revisión de la tarea 074 («revisa las lecciones y usalas como parte de la revision tecnica»).

## Revisión

- Subagente: 2026-09-21 — Aprueba (con una asimetría menor corregida)
- Usuario: 2026-09-22 — Aprueba (tras corrección de redacción: «leccionados» → «aprendidos»)
