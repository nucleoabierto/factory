# Investigar formatos de épica y planeación técnica

## Objetivo

Determinar con evidencia qué debe contener la épica como artefacto de planeación y cómo se produce un plan técnico de conjunto, antes de fijar el diseño en una decisión.

## Dependencias

- Ninguna

## Entrada

- Propuesta `docs/proposals/001-planeacion-epicas/propuesta.md`.
- Contexto interno: `docs/definicion-proyecto.md`, `docs/vision-proyecto.md`, `docs/decisions/D008-organizacion-por-hitos-en-todo.md`, el ciclo de vida de las propuestas (D012-D016) y la estructura actual de `TODO.txt`.

## Resultado esperado

- Un documento en `docs/research/` que cubra:
  - Qué campos suele tener una épica y cuáles aplican a un sistema gestionado por un agente (objetivo, alcance, piezas, criterio de cierre).
  - Cómo se produce un plan técnico de conjunto: orden de implementación, dependencias técnicas, decisiones transversales, y en qué momento del flujo se toman.
  - Cómo se relaciona la épica con las propuestas, las tareas existentes y los hitos del índice, incluido el caso de agrupar tareas ya creadas (planeación retroactiva).
  - Recomendaciones justificadas con referencias verificables.

## Criterios de calidad

- La investigación compara al menos dos formas de situar el paso de planeación en el flujo (antes de la descomposición, después de la promoción, bajo demanda).
- Trata explícitamente el caso de agrupar tareas ya existentes en una épica.
- Las recomendaciones citan las fuentes internas y externas que las justifican.
- El documento lleva marca temporal y sección de limitaciones, siguiendo la convención de `docs/research/`.

## Procedimiento sugerido

1. Invocar el skill `investigar` con el alcance descrito.
2. Revisar cómo gestionan épicas y planes técnicos los sistemas de gestión de producto y los flujos con agentes.
3. Contrastar con las restricciones internas (índice único en `TODO.txt`, propuestas como unidad de revisión, ciclo asíncrono).

## Notas

- La investigación previa `docs/research/2026-09-flujos-idea-tarea-ejecucion.md` excluyó esta materia por alcance; este documento cubre ese vacío.
