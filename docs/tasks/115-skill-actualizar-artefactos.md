# Crear el skill de actualización de artefactos

## Estado

**[ ] Pendiente** | [~] En progreso | [r] En revisión | [x] Completada | [!] Bloqueada

## Tipo

mantenimiento

## Objetivo

Crear el skill de utilidad que ejecuta las escrituras mecánicas sobre los artefactos del sistema mediante scripts bash propios. Son las operaciones donde el formato es estricto y el error frecuente: transición de estado dual (marcador en `TODO.txt` + `## Estado` del archivo de tarea, incluido `[!]` con su sublista de bloqueantes), inserción de secciones antes de `## Revisión`, registro en `## Revisión`, escrituras del índice (añadir tarea o propuesta, retirar línea, mover líneas bajo un encabezado, crear encabezado de hito con su comentario de épica, reordenar agrupaciones sin tocar estados, inicializar el índice), marcado `Procesada en` de una idea, marcado de ítem de la checklist del plan y promoción de borradores (mover `MM-*.md` a `docs/tasks/NNN-`, inyectar `## Estado` y `## Revisión`, renumerar las dependencias «Borrador NN» y el índice de `propuesta.md`, cambiarla a `[a]` y retirar su `[p]`). El nombre se decide en la ejecución (`actualizar-artefactos` tentativo).

## Dependencias

- Tarea 113 (`docs/tasks/113-delegacion-mecanica-scripts.md`): fija la decisión, el contrato de los scripts y las formas canónicas a escribir.

## Entrada

- La decisión y el contrato producidos por la tarea 113.
- Los formatos estrictos verificados: línea `- [estado] ruta — título` con sublistas de bloqueo y comentarios que deben viajar con su línea al moverse; `## Estado` en sus tres convenciones (se escribe la canónica); `## Revisión` con sus bullets; `assets/task.txt` para las secciones inyectadas en la promoción.
- Los informes de la revisión con los puntos de uso: `ejecutar-tareas` (transiciones `[~]`/`[r]`/`[x]`/`[!]` y revisión dual), `idea-a-tarea` (estados de propuesta, retirada de `[p]`), `refinar-propuesta` (envío a revisión), `crear-tareas` (promoción, entradas en el índice), `planificar` (encabezado y movimiento), `planificar-roadmap` (reordenación), `recopilar-contexto`, `evaluar-conectividad`, `planear-implementacion`, `ejecutar-implementacion` (inserciones de sección y checklist).

## Resultado esperado

- `.agents/skills/<nombre>/SKILL.md` que declara la capacidad de escritura delegada y el catálogo de operaciones; los scripts bash en `assets/` implementándolas.
- Los skills consumidores actualizados para delegar las escrituras; el texto de formato se sustituye por la delegación.
- Actualización del `README.md` en la sección de skills disponibles.

## Criterios de calidad

- El `SKILL.md` cumple D004 y D005; la `description` declara capacidad, no mecánica.
- Las mutaciones preservan lo que no tocan: sublistas de bloqueo, comentarios de épica, secciones ajenas; la promoción de borradores no reformula contenido (D014, promoción sin reescritura).
- `## Estado` se escribe siempre en la forma canónica fijada por la tarea 113.
- Ante formato inesperado el script falla con código distinto de 0 y diagnóstico a stderr —nunca escribe sobre lo que no parseó—.
- El skill aparece en `README.md`.

## Procedimiento sugerido

1. Escribir los scripts por orden de riesgo —transiciones de estado e inserción de sección primero, promoción al final— probándolos contra los artefactos reales.
2. Redactar el `SKILL.md`, revisar redacción y pulir antes de escribir.
3. Actualizar los consumidores y el `README.md`.

## Notas

- La promoción de borradores es el bloque mecánico mayor del sistema; si el SKILL.md crece por ella, su detalle va a `references/` (D005).
- Las decisiones que el script no toma —qué estado poner, qué sección escribir, el destino de una línea— las declara el consumidor en la orden delegada.

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario: [fecha] — [Aprueba | Solicita cambios]
