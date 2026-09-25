# Reestructurar la plantilla del documento de dominio

## Tipo

mantenimiento

## Objetivo

Mejorar la estructura del documento de dominio separando con claridad la referencia del modelo (glosario, entidades, invariantes, operaciones) de la explicación del dominio (propósito, fronteras, decisiones, salud), inspirada en Diátaxis/arc42, y aplicar la plantilla nueva al documento existente de todo-app.

## Dependencias

- Ninguna

## Entrada

- `.agents/skills/documentar-dominio/SKILL.md` y `assets/domain.txt` — la plantilla actual.
- `todo-app/docs/domains/001-lista-de-tareas.md` — el único documento existente, a reestructurar.
- `docs/research/2026-09-documentacion-producto-y-roadmap.md`, sección 1 — la lectura Diátaxis del documento actual (mezcla referencia y explicación).
- `docs/research/2026-09-revision-arquitectura-y-documentacion-dominio.md`, sección 4 — arc42 reducido que motivó el formato actual.

## Resultado esperado

- `assets/domain.txt` con la estructura nueva y `SKILL.md` actualizado donde la plantilla se describa.
- `todo-app/docs/domains/001-lista-de-tareas.md` reestructurado conservando todo su contenido: anclas al código, orígenes, estado de salud.

## Criterios de calidad

- La plantilla nueva mantiene las invariantes del formato: un hogar por hecho, índice obligatorio, anclas a elementos de código, superseder y estado de salud.
- La separación referencia/explicación es visible en la estructura (secciones o agrupación), no solo en la redacción.
- El documento reestructurado de todo-app no pierde afirmaciones: cada glosario, invariante y frontera del original sigue presente con su ancla.
- El rol de sensor no cambia: el criterio de cuándo actualizar («sin impacto») queda intacto en el SKILL.md.
- La decisión de diseño resultante queda registrada en `docs/decisions/` como parte del cierre de la tarea.

## Procedimiento sugerido

1. Diseñar la estructura nueva marcando qué secciones son referencia (hechos consultables) y cuáles explicación (contexto y juicio), a partir del formato actual.
2. Actualizar `assets/domain.txt` y las menciones a la plantilla en `SKILL.md`.
3. Reestructurar `todo-app/docs/domains/001-lista-de-tareas.md` moviendo contenido, no reescribiéndolo; verificar contra el original que nada se pierde.
4. Revisar `todo-app/docs/domains/README.md` por si la descripción del formato quedó desactualizada.
5. Registrar con `decisiones-diseno` la decisión que consolida esta tarea: la estructura nueva del documento de dominio y su lectura referencia/explicación.

## Notas

- La frontera con la documentación de producto (borrador 03) no es parte de esta tarea: aquí solo cambia la estructura interna del documento de dominio.
