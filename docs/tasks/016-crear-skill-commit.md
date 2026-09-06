# Crear skill para realizar commits

## Estado

[x] Completada

## Objetivo

Crear un skill formal bajo el estándar Agent Skills que enseñe a un agente a realizar commits de Git siguiendo las mejores prácticas investigadas. El skill debe ser agnóstico al arnés y portable.

## Dependencias

- docs/tasks/015-investigar-commits.md

## Entrada

- `docs/research/commits-best-practices.md`
- `docs/research/skills-best-practices.md`
- `.agents/skills/revisar-redaccion/SKILL.md` (como referencia de estructura)
- `.agents/skills/pulir-escritura/SKILL.md` (como referencia de estructura)

## Resultado esperado

- `.agents/skills/commit/SKILL.md` con frontmatter, modos de uso, procedimiento y finalización.
- Referencias opcionales si el contenido excede el cuerpo principal.
- El skill pasa revisión de redacción y pulido mecánico.
- El usuario aprueba la forma final antes de cerrar la tarea.

## Criterios de calidad

- Sigue el estándar Agent Skills (name, description, ubicación en .agents/skills/).
- Define cuándo usar, cuándo no usar, entrada, salida, procedimiento y finalización.
- Aplica las mejores prácticas investigadas.
- Es agnóstico al arnés: no depende de herramientas específicas.
- Pasa revisión de redacción y pulido mecánico secuencialmente.
- El usuario valida la forma final de forma interactiva.

## Procedimiento sugerido

1. Leer la investigación y las mejores prácticas para skills.
2. Proponer la estructura del skill al usuario.
3. Redactar el SKILL.md y referencias.
4. Aplicar revisión de redacción y pulido mecánico secuencialmente.
5. Presentar al usuario para aprobación.

## Notas

- El proceso debe ser interactivo: validar la estructura y las decisiones clave con el usuario antes de finalizar.
