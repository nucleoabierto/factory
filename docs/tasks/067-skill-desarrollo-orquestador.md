# Skill especialista de desarrollo que orquesta el sub-flujo

## Estado

[ ] Pendiente | [ ] En progreso | [ ] En revisión | [ ] Completada | [ ] Bloqueada

## Objetivo

Construir el skill especialista que encapsula el pipeline de desarrollo dentro de una tarea —entendimiento, planeación, ejecución con revisión del plan en curso y entrega del diff— e integrarlo con el enrutado de `ejecutar-tareas`, de modo que el ejecutor general delegue las tareas de desarrollo sin conocer sus fases.

## Dependencias

- 063 (Declarar el tipo de tarea para el enrutado)
- 064 (Skill de planeación de implementación)
- 065 (Skill de ejecución de implementación)
- 066 (Skill de revisión de implementación)

## Entrada

- La investigación `docs/research/2026-09-flujo-desarrollo.md`, en particular su recomendación sobre la forma del flujo.
- Los skills especialistas construidos en las tareas dependientes.
- El mecanismo de enrutado por tipo de tarea.

## Resultado esperado

- Un skill nuevo en `.agents/skills/` que orquesta el sub-flujo de desarrollo de una tarea: invoca la planeación, luego la ejecución, y devuelve el diff y el registro de desviaciones al orquestador general.
- `ejecutar-tareas` actualizado para invocar este especialista en el paso de ejecución cuando la tarea es de tipo desarrollo, y el skill de revisión de implementación en el paso de revisión.

## Criterios de calidad

- `ejecutar-tareas` no contiene las fases de desarrollo: solo enruta por el tipo declarado de la tarea.
- El especialista coordina las capacidades internas sin duplicar la lógica de ciclo de tareas del orquestador general.
- La revisión dual con subagente y usuario del ciclo general se conserva.
- El skill sigue la estructura y convenciones de los skills existentes.

## Procedimiento sugerido

1. Revisar `idea-a-tarea` como referencia de orquestador de flujo dentro del proyecto.
2. Redactar el skill especialista con su procedimiento de coordinación.
3. Actualizar `ejecutar-tareas` con los dos puntos de integración (ejecución y revisión).
4. Aplicar revisión de redacción y pulido mecánico preventivos.

## Notas

- Este skill es un mini-orquestador acotado a una tarea; no introduce worktree, pull request ni merge, que pertenecen a los flujos de gestión a nivel de código (hito futuro).

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario: [fecha] — [Aprueba | Solicita cambios]
