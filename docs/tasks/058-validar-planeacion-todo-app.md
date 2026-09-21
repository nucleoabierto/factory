# Validar la planeación sobre las tareas de todo-app

## Estado

[ ] Pendiente | [ ] En progreso | [ ] En revisión | [x] Completada | [ ] Bloqueada

## Objetivo

Ejercitar la capacidad de planeación sobre trabajo real: generar la épica que agrupa las tareas de la aplicación, incluido el caso de planeación retroactiva sobre tareas ya promovidas.

## Dependencias

- 057

## Entrada

- La capacidad de planeación construida por la tarea 057.
- Las tareas de `todo-app/` promovidas desde la propuesta `todo-app/docs/proposals/001-app-lista-tareas/` (los cuatro borradores: estructura base, crear y listar, completar/editar/borrar, filtros y limpieza).

## Resultado esperado

- Una épica generada por la capacidad dentro del espacio de `todo-app/`, que agrupe las tareas de la aplicación con objetivo, alcance y plan técnico.
- La agrupación correspondiente reflejada en `todo-app/TODO.txt`.
- Las observaciones de la validación —qué funcionó, qué no— anotadas en las notas de esta tarea.

## Criterios de calidad

- La épica la produce la capacidad, no edición manual: el artefacto es salida del skill.
- El plan técnico de la épica es coherente con las dependencias ya declaradas entre las tareas.
- La agrupación del índice enlaza con la épica según lo fijado en la decisión.
- Si la capacidad falla o produce algo inservible, se registra la brecha y se deriva la corrección en lugar de forzar el resultado a mano.

## Procedimiento sugerido

1. Verificar que las cuatro tareas de todo-app existen ya promovidas; si la propuesta aún está pendiente, promoverla primero con `crear-tareas` tras la aprobación del usuario.
2. Ejecutar la capacidad de planeación sobre esas tareas dentro de `todo-app/`.
3. Revisar la épica producida contra los criterios de calidad y anotar las observaciones.

## Notas

- Esta tarea es la primera aplicación real de la capacidad: los hallazgos alimentan el sistema de aprendizaje (`registrar-experiencias`) si el usuario corrige algo durante la validación.
- La ejecución de las tareas de todo-app no forma parte de esta tarea: aquí solo se valida la planeación.

### Observaciones de la validación (2026-09-21)

- La propuesta `001-app-lista-tareas` llegó aún en revisión `[p]`; se promovió primero con `crear-tareas` en modo flujo tras la aprobación del usuario, como prevé el procedimiento de esta tarea.
- La promoción movió los cuatro borradores a `docs/tasks/002–005` sin reformularlos y renumeró las dependencias (Borrador NN → número de tarea). Se añadió además la sección `## Tipo: desarrollo`, que los borradores no tenían porque la plantilla la incorporó después de escribirlos; fue necesaria para que el enrutado del sub-flujo de desarrollo funcione en la PoC (tarea 069).
- `planificar` en modo promoción produjo la épica `docs/epics/001-app-lista-tareas.md` con plan técnico coherente con las dependencias en cadena ya declaradas (002→003→004→005) y reflejó la agrupación en `todo-app/TODO.txt` bajo «Hito 1» con el comentario de enlace.
- La puerta humana de `planificar` funcionó: el borrador de épica se presentó al usuario antes de materializarla.
- Sin brechas detectadas: la capacidad produjo el artefacto sin edición manual del contenido.

## Revisión

- Subagente: 2026-09-21 — Aprueba
- Usuario: 2026-09-21 — Aprueba
