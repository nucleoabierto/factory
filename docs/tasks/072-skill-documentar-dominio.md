# Skill de documentación de dominio

## Estado

[ ] Pendiente | [ ] En progreso | [ ] En revisión | [ ] Completada | [ ] Bloqueada

## Tipo

mantenimiento

## Objetivo

Crear el skill `documentar-dominio`, que mantiene la documentación viva de los dominios del proyecto bajo `docs/domains/` y actúa como sensor continuo: tras cada tarea de desarrollo evalúa si el diff altera conceptos, invariantes o fronteras del dominio y solo entonces actualiza; si detecta divergencia estructural, recomienda invocar la revisión de arquitectura.

## Dependencias

- 071

## Entrada

- La investigación `docs/research/2026-09-revision-arquitectura-y-documentacion-dominio.md`, en particular las secciones 4 (formatos y estructuras) y «Formato o procedimiento».
- La estructura propuesta: `docs/domains/README.md` como índice obligatorio y un documento por dominio `NNN-slug.md` con secciones planas: propósito, lenguaje ubicuo (glosario término→definición→elemento de código ancla), modelo (entidades, invariantes), fronteras (qué entra y qué no, relaciones con otros dominios), decisiones relevantes (enlaces a `docs/decisions/`) y estado de salud (última revisión, divergencias conocidas).
- El skill `ejecutar-tareas`, donde se define el punto de invocación en el cierre de tareas de tipo `desarrollo`.
- Las convenciones de skills del proyecto: frontmatter con `name`, `description` y sinónimos; secciones Cuándo usar / Cuándo no usar / Entrada / Salida / Principios rectores / Procedimiento / Finalización / Referencias.

## Resultado esperado

- `.agents/skills/documentar-dominio/SKILL.md` creado siguiendo las convenciones del proyecto.
- Plantilla del documento de dominio como asset del skill (p. ej. `assets/domain.txt`), consistente con las plantillas existentes.
- `ejecutar-tareas` actualizado con el punto de invocación: tras completar una tarea de tipo `desarrollo`, invocar `documentar-dominio` con el diff de la tarea antes del commit. El ejecutor no invoca hoy `decisiones-diseno` en ese paso; la adición de ambas invocaciones al cierre puede evaluarse en la misma tarea.

## Criterios de calidad

- El skill no fuerza actualizaciones: produce un veredicto explícito de «sin impacto» cuando el diff no altera el dominio.
- Los documentos de dominio anclan las afirmaciones a elementos de código por nombre, para poder detectar deriva.
- Las reglas se describen inline en el skill; las citas a decisiones u otros documentos van solo en la sección de referencias (lección de estabilidad temporal).
- Las listas de categorías o criterios se declaran abiertas y extensibles (lección de flexibilidad en procesos).
- La plantilla mantiene la estructura común de los formatos del proyecto (lección de consistencia de formatos).

## Procedimiento sugerido

1. Revisar un skill existente con assets (p. ej. `crear-tareas`) para replicar convenciones.
2. Redactar `SKILL.md` de `documentar-dominio` y su plantilla `assets/domain.txt`.
3. Actualizar `ejecutar-tareas` con el punto de invocación en el cierre de tareas de desarrollo.
4. Crear `docs/domains/README.md` con el índice vacío y las reglas del formato.

## Notas

- La recomendación de revisión de arquitectura referencia el skill `revisar-arquitectura` por nombre; si aún no existe al escribir este skill, describir la recomendación de forma que siga siendo válida cuando se cree.

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario: [fecha] — [Aprueba | Solicita cambios]
