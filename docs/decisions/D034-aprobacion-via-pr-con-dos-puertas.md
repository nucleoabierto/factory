# D034: Aprobación de tareas vía pull request con dos puertas humanas

## Estado

Aceptada

## Contexto

D009 fijó la revisión dual —subagente técnico y aprobación del usuario en sesión— sobre el diff en el árbol de trabajo. La investigación sobre los pull requests como punto de revisión mostró que la aprobación en sesión deja la revisión humana sin artefacto: sin conversación asociada al cambio, sin asíncronía real y con la validación de los sensores mezclada en la misma aprobación.

## Decisión

Sustituimos la aprobación única en sesión por un pull request por tarea con dos puertas humanas: la de ejecución —el usuario aprueba el PR tras un bucle de comentarios clasificados— y la de cierre —aprueba el paquete tras los sensores, antes del merge squash—. Toda la iteración corre en la rama de la tarea y el «Revisión» del archivo registra tres veredictos.

## Justificación

El PR convierte la revisión humana en un proceso asíncrono con artefacto propio: los comentarios quedan hilados al diff y cada ronda de mejoras vuelve a revisión. Separar las puertas hace visible qué se aprueba —el cambio en la de ejecución, las escrituras de los sensores en la de cierre—. El coste es una dependencia dura del remoto y de `gh`: el ciclo no tiene modo degradado. De D009 se conserva la revisión técnica por subagente y el estado `[r]`; cambia el mecanismo y el alcance de la aprobación humana.

## Referencias

- `docs/research/2026-10-prs-punto-revision.md`
- `docs/tasks/130-materializar-aprobacion-via-pr.md`
- Sustituye a `docs/decisions/D009-flujo-revision-dual.md`
