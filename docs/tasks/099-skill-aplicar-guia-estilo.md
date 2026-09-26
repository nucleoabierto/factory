# Crear el skill aplicar-guia-estilo

## Estado

[ ] Pendiente | [ ] En progreso | [ ] En revisión | [ ] Completada | [ ] Bloqueada

## Tipo

mantenimiento

## Objetivo

Crear el skill `aplicar-guia-estilo`: carga la guía de estilo del proyecto evaluado cuando el agente escribe o modifica frontend, exige tokens antes que valores literales y valida el cumplimiento en dos niveles —verificación estática y, cuando el proyecto es servible, evidencia renderizada— según la investigación `docs/research/2026-09-guias-estilo-frontend-agentes.md`.

## Dependencias

- Tarea 098 (`docs/tasks/098-skill-documentar-guia-estilo.md`): define el formato de la guía que este skill consume.

## Entrada

- `docs/research/2026-09-guias-estilo-frontend-agentes.md` — conclusiones sobre aplicación y validación (dos niveles de evidencia, rúbrica fija, degradación sin toolchain).
- `.agents/skills/documentar-guia-estilo/` — formato de la guía producida por el skill hermano.
- Las decisiones y lecciones que rigen la creación de skills: D003, D004, D005, lecciones `contratos-de-skills`, `consistencia-de-formatos`, `vocabulario` y `diseno-de-artefactos`.

## Resultado esperado

- `.agents/skills/aplicar-guia-estilo/SKILL.md` con frontmatter `name` y `description` a nivel de capacidad, siguiendo la estructura común de los skills del proyecto.
- El procedimiento cubre: carga justo a tiempo de la guía, aplicación al escribir frontend (tokens antes que literales, rúbrica fija de dimensiones) y validación en dos niveles con autoridad distinta —lo determinista bloquea, lo heurístico se reporta, lo subjetivo escala al usuario—, incluida la degradación para proyectos sin toolchain (chequeos ad hoc en lugar de linter).
- `references/` con la rúbrica de revisión detallada y las estrategias de validación, cargadas bajo demanda.
- Actualización del `README.md` en la sección de skills disponibles.

## Criterios de calidad

- El `SKILL.md` cumple D004 y D005.
- La `description` declara capacidad y resultado, no mecánica.
- El artefacto es genérico: funciona sobre cualquier proyecto con guía de estilo, sin acoplar a todo-app ni a un framework.
- La validación distingue explícitamente los dos niveles de evidencia y su autoridad, según la investigación.
- Degrada correctamente cuando el proyecto no tiene linter ni es servible.
- El skill aparece en `README.md`.

## Procedimiento sugerido

1. Leer el skill hermano `documentar-guia-estilo` y un skill de revisión existente como modelo.
2. Redactar `SKILL.md` y las referencias, revisar redacción y pulir antes de escribir.
3. Actualizar `README.md`.

## Notas

- La invocación de este skill desde `ejecutar-tareas` o el sub-flujo de desarrollo queda fuera de alcance: esta tarea crea la capacidad; la integración en el ciclo es trabajo separado si se decide.

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario: [fecha] — [Aprueba | Solicita cambios]
