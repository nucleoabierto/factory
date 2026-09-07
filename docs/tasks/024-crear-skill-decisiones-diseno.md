# Crear skill para registrar decisiones de diseño

## Estado

[x] Completada

## Objetivo

Crear un skill formal que enseñe a registrar decisiones de diseño siguiendo el formato recomendado en la tarea 023. El skill debe ser invocable cuando se tome una decisión relevante, y también como parte del flujo de revisión tras completar una tarea que introduzca cambios estructurales.

## Dependencias

- 023

## Entrada

- Recomendación de formato de la tarea 023.
- `docs/research/skills-best-practices.md` como referencia para la estructura del skill.
- Skills existentes como referencia de estilo.

## Resultado esperado

- `.agents/skills/decisiones-diseno/SKILL.md` (o el nombre que se acuerde) con frontmatter, cuándo usar, cuándo no usar, entrada, salida, principios rectores, procedimiento y finalización.
- Pasa revisión de redacción y pulido mecánico.

## Criterios de calidad

- Sigue el estándar Agent Skills y la plantilla de `docs/research/skills-best-practices.md`.
- Define claramente qué constituye una decisión de diseño y qué no.
- El procedimiento guía la redacción de una nueva decisión de diseño paso a paso.
- Indica cuándo invocar el skill: tras cambios estructurales, al tomar decisiones de diseño, o como parte del flujo de revisión.
- Autosuficiente, límites claros, entrada y salida definidas, criterios de finalización explícitos.
- Pasa revisión de redacción y pulido mecánico.

## Procedimiento sugerido

1. Redactar el `SKILL.md` siguiendo la plantilla.
2. Aplicar revisión de redacción y pulido mecánico.
3. Presentar al usuario para aprobación.

## Notas

- El nombre del skill puede ajustarse durante la redacción (p. ej. `decisiones-diseno`, `registrar-decision`, `adr`).

## Revisión

- Subagente: 2026-09-07 — Aprueba
- Usuario: 2026-09-07 — Aprueba
