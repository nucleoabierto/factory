# Integrar el changelog en el cierre de tareas

## Estado

[ ] Pendiente | [~] En progreso | [r] En revisión | [x] **Completada** | [!] Bloqueada

## Tipo

mantenimiento

## Objetivo

Conectar el skill de mantenimiento del changelog al cierre del ciclo de tareas, de modo que cada tarea completada pase por la evaluación de entrada de changelog en el mismo punto que los sensores de documentación de dominio y producto (D021, D025). Hoy el cierre documenta el modelo y el comportamiento observable, pero ningún paso registra el cambio de cara a los usuarios del proyecto evaluado.

## Dependencias

- Tarea 105 (`docs/tasks/105-skill-mantener-changelog.md`): crea el skill que esta tarea integra.

## Entrada

- `.agents/skills/ejecutar-tareas/SKILL.md` — el skill donde vive el ciclo de tareas y su paso de cierre.
- El skill de changelog creado en la tarea 105.
- Los puntos de invocación de `documentar-dominio` y `documentar-producto` como precedente del lugar del cierre donde encaja el nuevo sensor.
- Las decisiones y lecciones que rigen la edición de skills: D003, D004, D005, lección `contratos-de-skills`.

## Resultado esperado

- `ejecutar-tareas` actualizado para invocar el skill de changelog al cerrar cada tarea, de forma coherente con cómo invoca a los sensores de documentación existentes.
- Si el punto de cierre real vive en otro skill del flujo —por ejemplo, en el sub-flujo de desarrollo—, la integración se ubica donde corresponda y `ejecutar-tareas` queda coherente con ello.
- Todas las secciones de los skills tocados quedan coherentes entre sí (description, cuándo usar, procedimiento, finalización).

## Criterios de calidad

- El punto de invocación es el mismo del cierre que usan los sensores existentes, o una diferencia justificada y documentada.
- La integración no rompe el enrutado por tipo de tarea ni la revisión dual.
- Los skills modificados siguen cumpliendo D004 y D005.
- El skill de changelog se invoca sobre cualquier tipo de tarea, no solo desarrollo, o la restricción queda justificada.

## Procedimiento sugerido

1. Releer `ejecutar-tareas` completo y localizar el paso de cierre donde se invocan `documentar-dominio` y `documentar-producto`.
2. Redactar la integración, revisar redacción y pulir antes de escribir.
3. Verificar coherencia de todas las secciones de los skills tocados.

## Notas

- Integración acordada como tarea separada por decisión del usuario al crear el conjunto: la tarea 105 crea la capacidad y esta la conecta.

## Revisión

- Subagente: 2026-09-29 — Aprueba
- Usuario: 2026-09-29 — Aprueba
