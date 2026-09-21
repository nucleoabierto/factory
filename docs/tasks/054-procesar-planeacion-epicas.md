# Procesar la planeación de épicas por el flujo de idea a tarea

## Estado

[ ] Pendiente | [~] En progreso | [r] En revisión | [x] Completada | [!] Bloqueada

## Objetivo

Someter la idea «planeación de épicas y plan técnico» al flujo de idea a tarea para que el propio sistema evalúe las formas de solución posibles —épica como artefacto, extensión de la propuesta, solo hitos en `TODO.txt`— y produzca la propuesta con sus borradores, en lugar de comprometer el diseño sin comparar alternativas.

## Dependencias

- Ninguna

## Entrada

- Idea suelta: el producto necesita una capacidad de planeación que agrupe propuestas y tareas en épicas y produzca un plan técnico antes de la ejecución. La visión la lista como capacidad faltante («planeación de épicas y roadmap», `docs/vision-proyecto.md`, `docs/definicion-proyecto.md`).
- La investigación `docs/research/2026-09-flujos-idea-tarea-ejecucion.md` excluyó la planeación por alcance: no hay alternativas evaluadas.
- Caso de uso de validación: la épica generada debe poder albergar las tareas ya existentes de `todo-app/` (las promovidas desde la propuesta `todo-app/docs/proposals/001-app-lista-tareas/`), incluido el caso de planificar tareas sueltas ya creadas.

## Resultado esperado

- Una propuesta en `docs/proposals/NNN-slug/` con problema, oportunidad, forma de solución validada con el usuario, alternativas consideradas y borradores de las tareas de construcción, en estado `[p]` pendiente de revisión.
- El flujo completo ejecutado por `idea-a-tarea`: descubrimiento del problema, propuesta de forma de solución, refinamiento con borradores y envío a revisión.

## Criterios de calidad

- La propuesta documenta al menos dos alternativas de forma de solución con su motivo de descarte.
- La propuesta contempla explícitamente el caso de agrupar tareas ya existentes en una épica (planeación retroactiva).
- Cada borrador tiene objetivo, dependencias, entrada, resultado esperado y criterios de calidad verificables.
- El proceso se detiene en la puerta de revisión: nada se promociona a tareas antes de la aprobación del usuario.

## Procedimiento sugerido

1. Invocar el skill `idea-a-tarea` con la idea descrita en la entrada.
2. Seguir sus fases: descubrir el problema, proponer la forma de solución, refinar con borradores.
3. Dejar la propuesta en `[p]` e informar al usuario.

## Notas

- Esta tarea ejecuta el flujo sobre la propia idea; las tareas de construcción de la capacidad saldrán de los borradores que la propuesta produzca.
- La promoción de los borradores de `todo-app/docs/proposals/001-app-lista-tareas/` es trabajo independiente y puede avanzar en paralelo con `crear-tareas` una vez aprobada.

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario: [fecha] — [Aprueba | Solicita cambios]
