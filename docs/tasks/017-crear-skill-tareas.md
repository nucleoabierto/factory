# Crear skill para crear tareas

## Estado

[x] Completada

## Objetivo

Crear un skill formal bajo el estándar Agent Skills que enseñe a un agente a crear tareas de forma interactiva, usando las plantillas existentes y confirmando con el usuario antes de generar las tareas finales.

## Dependencias

- Ninguna

## Entrada

- `docs/templates/task.txt`
- `TODO.txt`
- `docs/research/skills-best-practices.md`

## Resultado esperado

- `.agents/skills/crear-tareas/SKILL.md` con frontmatter, cuándo usar, procedimiento y finalización.
- El skill pasa revisión de redacción y pulido mecánico.
- El usuario aprueba la forma final antes de cerrar la tarea.

## Criterios de calidad

- Sigue el estándar Agent Skills.
- Es corto y sencillo: el trabajo es simple.
- Solicita captura interactiva de tareas.
- Usa `docs/templates/task.txt` como plantilla.
- Confirma con el usuario antes de generar las tareas finales, explicando qué se va a hacer para validar alineación con la solicitud inicial.
- Pasa revisión de redacción y pulido mecánico secuencialmente.

## Procedimiento sugerido

1. Proponer la estructura del skill al usuario.
2. Redactar el SKILL.md.
3. Aplicar revisión de redacción y pulido mecánico.
4. Presentar al usuario para aprobación.

## Notas

- El skill debe ser breve: el trabajo de crear tareas es simple y no requiere referencias detalladas.
