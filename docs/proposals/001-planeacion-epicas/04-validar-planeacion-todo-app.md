# Validar la planeación sobre las tareas de todo-app

## Objetivo

Ejercitar la capacidad de planeación sobre trabajo real: generar la épica que agrupa las tareas de la aplicación, incluido el caso de planeación retroactiva sobre tareas ya promovidas.

## Dependencias

- Borrador 03

## Entrada

- La capacidad de planeación construida por el borrador 03.
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
- La ejecución de las tareas de todo-app no forma parte de este borrador: aquí solo se valida la planeación.
