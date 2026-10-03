# Cablear el cierre de conjunto y el reflejo del roadmap en el ciclo

## Estado

[ ] Pendiente | [~] En progreso | [r] En revisión | **[x] Completada** | [!] Bloqueada

## Tipo

mantenimiento

## Objetivo

Conectar en `ejecutar-tareas` los dos puntos que mantienen coherentes el índice, las épicas y el roadmap: al completarse una tarea, detectar si su agrupación quedó agotada —todas sus líneas `[x]`— e invocar el skill de cierre de conjunto, e invocar el reflector del roadmap en el bloque de sensores del cierre. Hoy el ciclo no tiene ningún paso que observe la frontera entre tareas y conjuntos, y ninguna escritura sobre `ROADMAP.md` fuera de la planeación.

## Dependencias

- Tarea 109 (`docs/tasks/109-skill-cierre-conjunto.md`): crea el skill de cierre de conjunto que esta tarea invoca.
- Tarea 110 (`docs/tasks/110-skill-mantener-roadmap.md`): crea el reflector del roadmap que esta tarea invoca.

## Entrada

- Los dos skills creados por las tareas 109 y 110, con sus contratos de entrada.
- `ejecutar-tareas` (`SKILL.md`), cuyo procedimiento y enrutado se extienden.
- `planificar-roadmap` (`SKILL.md`), cuya sección «Cuándo usar» debe declarar la invocación por el reflector.
- Las decisiones que rigen el punto de cierre y los artefactos: D017 (limpieza del índice), D022 y D027 (roadmap), y la convención de sensores de cierre del propio `ejecutar-tareas`.

## Resultado esperado

- `ejecutar-tareas` con un paso de cierre que detecta la agrupación agotada —incluidos el hito ligero sin épica y la tarea suelta que es línea del roadmap— e invoca el skill de cierre de conjunto, y con el reflector del roadmap integrado en el bloque de sensores junto a `mantener-changelog`, para cualquier tipo de tarea.
- El orden de invocación entre cierre de conjunto y reflector queda declarado y resuelve el retiro de la línea completada sin ambigüedad.
- `planificar-roadmap` declara en «Cuándo usar» la invocación por el reflector cuando detecta divergencia de dirección.
- La decisión de diseño del punto de conexión registrada con `decisiones-diseno`, como corresponde a un cambio en la estructura del ciclo.

## Criterios de calidad

- La detección de agrupación agotada usa el encabezado de `TODO.txt` y el comentario `<!-- épica: … -->`, sin acoplar el ejecutor a la estructura interna de las épicas.
- El reflector corre para todo tipo de tarea, igual que `mantener-changelog`: cualquier tarea puede ser la última de una línea del roadmap.
- Los documentos de entrada de los skills invocados se les entregan tal como los declara su contrato; el orden de invocación no hace depender una salida de otra.
- `planificar-roadmap` sigue siendo el único punto con puerta humana para dirección; el cableado no introduce escritura de dirección en el ciclo.

## Procedimiento sugerido

1. Leer el procedimiento de `ejecutar-tareas` y localizar el punto de cierre (pasos 13-17 actuales) y el formato del bloque de sensores.
2. Añadir la detección de agrupación agotada y las invocaciones, declarando el orden.
3. Actualizar «Cuándo usar» de `planificar-roadmap` y registrar la decisión de diseño.

## Notas

- Si el cableado revela que el reflector necesita saber qué agrupación se cerró —porque el índice ya no la muestra—, la resolución natural es que el cierre de conjunto corra después del reflector, o que el contrato del reflector reciba la señal de cierre; decidirlo en la ejecución y dejarlo escrito en ambos skills si afecta a sus entradas.

## Revisión

- Subagente: 2026-10-03 — Aprueba
- Usuario: 2026-10-03 — Aprueba
