# D021: Documentación de dominio como sensor y revisión de arquitectura bajo demanda

## Estado

Aceptada

## Contexto

Con el ciclo de desarrollo ya validado sobre la PoC de todo-app, el proyecto no tenía mecanismo de mantenimiento continuo: nada evaluaba si la estructura del código seguía siendo adecuada frente al dominio ni mantenía documentación del dominio a medida que cambiaba. Las opciones eran un solo skill combinado, ambas capacidades dentro del ciclo de cada tarea, o separar un sensor barato continuo de una evaluación profunda ocasional.

## Decisión

Mantenemos la documentación viva de dominios bajo `docs/domains/` con el skill `documentar-dominio`, invocado al cerrar cada tarea de desarrollo (invocación ya cableada en el ciclo de `ejecutar-tareas` por la tarea `docs/tasks/072-skill-documentar-dominio.md`); y la revisión de arquitectura con `revisar-arquitectura`, bajo demanda —la invoca el usuario o la recomienda el sensor cuando detecta divergencia estructural.

## Justificación

La división sigue la que la industria hace entre regla continua y juicio agéntico: la documentación es el sensor barato que corre siempre y suele terminar en «sin impacto»; la revisión es la evaluación profunda que solo corre cuando el dominio lo amerita. Dos skills separados respetan la responsabilidad única que siguen los demás skills del proyecto, y la revisión queda sin sesgo de arquitectura concreta: evalúa el dominio con criterios de DDD sin prescribir una solución. Se descartó combinar ambas en un solo skill (acopla entradas y salidas distintas) y ejecutar la revisión en cada tarea (coste desproporcionado).

## Referencias

- `docs/research/2026-09-revision-arquitectura-y-documentacion-dominio.md` — Investigación que motiva la decisión.
- `.agents/skills/documentar-dominio/SKILL.md` — El sensor continuo.
- `.agents/skills/revisar-arquitectura/SKILL.md` — La evaluación bajo demanda.
