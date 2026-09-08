# Extender crear-tareas con modo flujo 1

## Objetivo

Añadir a `crear-tareas` un segundo modo de operación que promocione los borradores aprobados de una propuesta a tareas definitivas, manteniendo el modo independiente actual.

## Dependencias

- 038 (Construir capacidad de refinamiento con borradores)

## Entrada

- Skill `crear-tareas` en `.agents/skills/crear-tareas/`.
- Investigación 032 en `docs/research/2026-09-flujo-1-propuesta-borradores.md`.
- Decisión de diseño D014 (función dual de `crear-tareas`).
- Formato final de los borradores definido por la tarea 038.

## Resultado esperado

- `crear-tareas` funciona en dos modos que comparten un núcleo común:
  - **Modo independiente (motor interno):** crea tareas desde una entrada articulada, como hoy.
  - **Modo flujo 1:** promociona los borradores aprobados de una propuesta a tareas definitivas.
- La promoción, por cada borrador en orden de numeración: aplica revisión de redacción y pulido mecánico en modo preventivo, asigna el siguiente número de tarea disponible, mueve el archivo a `docs/tasks/NNN-slug.md`, añade Estado `[ ]` y Revisión vacío, y renumera las dependencias al número de tarea definitivo.
- Tras la promoción: actualiza el índice de borradores de `propuesta.md`, añade las líneas de tarea a `TODO.txt`, elimina la línea de la propuesta y cambia el estado de `propuesta.md` a `[a]` Aprobada.

## Criterios de calidad

- El modo independiente se mantiene sin cambios.
- Ambos modos comparten el núcleo común (crear archivos en `docs/tasks/` y líneas en `TODO.txt`).
- La bifurcación entre modos ocurre solo en la entrada, no en el núcleo.
- La promoción renumera las dependencias de «Borrador NN» al número de tarea definitivo.
- Sigue el estándar de skills del proyecto.
- Pasa revisión técnica por subagente independiente.

## Procedimiento sugerido

1. Reescribir el `SKILL.md` de `crear-tareas` con la función dual.
2. Mantener el núcleo común y bifurcar solo en la entrada.
3. Probar la promoción con una propuesta de prueba.
4. Someter a revisión dual.

## Notas

- Depende de la tarea 038 porque la promoción necesita conocer el formato final de los borradores que el refinamiento produce.

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario: [fecha] — [Aprueba | Solicita cambios]
