# Skill de planeación de implementación

## Estado

[ ] Pendiente | [ ] En progreso | [ ] En revisión | [x] Completada | [ ] Bloqueada

## Objetivo

Construir el skill que produce el plan de una tarea de desarrollo antes de escribir código: entendimiento del subsistema, plan técnico conceptual con storytelling y suite de pruebas esperada guiada por ZOMBIE.

## Dependencias

- Ninguna

## Entrada

- La investigación `docs/research/2026-09-flujo-desarrollo.md`: fases de planeación técnica y de testing, con los ajustes aprobados (entendimiento previo, granularidad flexible).
- La tarea de desarrollo a planear y el plan técnico de su épica como guía de arquitectura.
- El formato de los skills del proyecto (`.agents/skills/`).

## Resultado esperado

- Un skill nuevo en `.agents/skills/` que, dada una tarea de desarrollo, produce dos artefactos agregados al archivo de la tarea:
  - El plan técnico: acciones a nivel conceptual (crear una clase, agregar un método, dividir un módulo) cada una con su explicación de cómo aporta al desarrollo; admite referencias a archivos concretos solo cuando el detalle previene un error costoso.
  - La suite de pruebas esperada: casos determinados con ZOMBIE como guía de generación, expresados como expectativas sobre lo que el sistema hace (el qué, no el cómo); cada prueba trazable a un caso de uso.

## Criterios de calidad

- El skill incluye un paso de entendimiento previo: el agente lee y resume el subsistema afectado antes de escribir el plan.
- El plan respeta el nivel conceptual como norma y declara cuándo se permite detalle a nivel de archivo.
- La suite no declara su relación con ZOMBIE ni con la implementación; describe expectativas sobre el comportamiento.
- El plan técnico de la épica es la guía que el plan de la tarea sigue.
- El skill sigue la estructura y convenciones de los skills existentes.

## Procedimiento sugerido

1. Revisar skills existentes para seguir su estructura (cuándo usar, entrada, salida, principios, procedimiento, finalización).
2. Redactar el skill con las dos producciones (plan técnico y suite) como salidas del mismo procedimiento, dado que la suite se agrega al plan técnico.
3. Aplicar revisión de redacción y pulido mecánico preventivos.

## Notas

- Si el skill resulta demasiado extenso, puede dividirse en uno de planeación técnica y otro de planeación de testing; decidirlo al construirlo.

## Revisión

- Subagente: 2026-09-21 — Aprueba
- Usuario: 2026-09-21 — Aprueba
