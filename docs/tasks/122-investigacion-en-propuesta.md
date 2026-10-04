# Investigación dentro del proceso de propuesta

## Estado

**[ ] Pendiente** | [~] En progreso | [r] En revisión | [x] Completada | [!] Bloqueada

## Tipo

mantenimiento

## Objetivo

`refinar-propuesta` casi siempre genera como primer borrador una investigación de la que dependen los demás borradores: si la investigación cambia el enfoque, las tareas dependientes quedan condicionadas a un resultado posterior. La tarea mueve la investigación al proceso de la propuesta misma: se resuelve durante el refinamiento —antes de enviar a revisión— y las tareas resultantes nacen con el enfoque ya validado, sin borrador de investigación propio.

## Dependencias

- Ninguna

## Entrada

- `.agents/skills/refinar-propuesta/SKILL.md` actual.
- Las propuestas históricas de `docs/proposals/` como evidencia del patrón.

## Resultado esperado

- `.agents/skills/refinar-propuesta/SKILL.md` actualizado: la investigación es una fase del refinamiento, no un borrador; el flujo ya no produce tareas de investigación como primer elemento del conjunto.

## Criterios de calidad

- El flujo ya no produce borradores de investigación; la incertidumbre se resuelve antes de enviar la propuesta a revisión.
- Las propuestas históricas no se reescriben: el cambio aplica hacia adelante.
- Coherente con `idea-a-tarea` y `crear-tareas` en modo flujo de idea a tarea.

## Procedimiento sugerido

1. Releer el skill y revisar las propuestas históricas para confirmar el patrón.
2. Redactar la nueva fase de investigación con revisión de redacción y pulido mecánico preventivos.
3. Verificar la coherencia con `idea-a-tarea` y `crear-tareas`.

## Notas

- Si la investigación resulta innecesaria para una propuesta simple, el refinamiento lo declara y continúa sin ella.

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario: [fecha] — [Aprueba | Solicita cambios]
