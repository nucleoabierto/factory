# Investigar revisión de arquitectura y documentación de dominio

## Estado

[ ] Pendiente | [ ] En progreso | [ ] En revisión | [x] Completada | [ ] Bloqueada

## Tipo

investigación

## Objetivo

Investigar cómo incorporar al proyecto dos capacidades de mantenimiento continuo —una revisión de arquitectura basada en Domain Driven Design que evalúe un dominio y proponga mejoras, y una documentación de dominio que se mantenga al día con cada flujo de desarrollo—, revisando la PoC de `todo-app/` (la aplicación resultante y el proceso que la produjo: tareas, épica, planes) como caso concreto, y generar las tareas que materialicen ambas capacidades como skills.

## Dependencias

- Ninguna

## Entrada

- La solicitud del usuario: un skill que revise la arquitectura de un dominio con DDD y determine mejoras (la sugerencia concreta del usuario —clases separadas para vista, modelo y controlador— es un ejemplo, no la forma de la solución); y un skill que documente los dominios, ejecutado en cada flujo de desarrollo, capaz de detectar cambios que impliquen actualizar la documentación sin generar necesariamente cambios en cada tarea.
- La PoC en `todo-app/`: `app.js`, `index.html`, `style.css`, `tests.html` y su proceso en `todo-app/docs/` (épica, propuesta y tareas).
- El proceso del proyecto: skills en `.agents/skills/` (en particular `desarrollo`, `ejecutar-tareas`, `decisiones-diseno`), `docs/epics/`, `docs/tasks/` y las lecciones de `docs/lessons/`.
- Mejores prácticas de la industria: Domain Driven Design (lenguaje ubicuo, contextos delimitados), revisión de arquitectura por agentes y documentación viva de dominio.

## Resultado esperado

- Un documento en `docs/research/` con las conclusiones justificadas: evaluación de la PoC (app y proceso), forma que tomaría cada capacidad como skill, su encaje en el flujo existente (puntos de invocación, entradas y salidas) y cómo el skill de documentación detecta cambios relevantes sin forzar actualizaciones en cada tarea.
- Las tareas que materialicen ambas capacidades creadas con `crear-tareas` **después** de la investigación, usando sus conclusiones como entrada —no antes ni con información parcial.

## Criterios de calidad

- La investigación evalúa la PoC real (código y proceso) y no solo el concepto en abstracto.
- La investigación distingue las dos capacidades y determina si convienen como skills separados o uno combinado, con la decisión justificada.
- El encaje propuesto referencia los flujos y skills por su nombre y describe las reglas inline, según las lecciones del proyecto.
- Las tareas se crean solo cuando la investigación está completa y reflejan sus conclusiones.
- Si la investigación sugiere cambios sustanciales a lo propuesto por el usuario, se presentan antes de crear las tareas.

## Procedimiento sugerido

1. Revisar la PoC: código de `todo-app/` y artefactos de su proceso (épica, propuesta, tareas), más los skills que intervendrían.
2. Ejecutar el skill `investigar` sobre las dos capacidades, las mejores prácticas de DDD y el encaje en el flujo existente.
3. Presentar las conclusiones al usuario, especialmente si difieren de lo propuesto.
4. Con la investigación validada, usar `crear-tareas` en modo independiente para dar de alta las tareas de los skills.

## Notas

- La propuesta del usuario sobre separar vista, modelo y controlador es un ejemplo de hallazgo que la revisión debería poder producir; el skill no debe quedar sesgado hacia una arquitectura concreta (MVC u otra), sino evaluar el dominio con DDD.
- Este paso se enmarca como mantenimiento continuo: el siguiente paso lógico tras completar el ciclo de desarrollo de la PoC.

## Revisión

- Subagente: 2026-09-21 — Aprueba
- Usuario: 2026-09-21 — Aprueba
