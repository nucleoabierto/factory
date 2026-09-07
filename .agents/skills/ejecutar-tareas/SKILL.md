---
name: ejecutar-tareas
description: >
  Ejecuta el ciclo de tareas del proyecto: lee TODO.txt, toma la próxima
  tarea pendiente, la ejecuta siguiendo su archivo de tarea, marca el
  progreso y commitea. Repite hasta que no quedan tareas pendientes.
  Usar cuando se pida ejecutar tareas, continuar con el trabajo, retomar
  el ciclo, avanzar tareas o procesar TODO.txt.
  Sinónimos: ejecutar tarea, correr tareas, avanzar tareas, siguiente
  tarea, procesar TODO, retomar trabajo, ciclo de tareas.
---

# Ejecutar tareas

Ejecuta iterativamente el ciclo de tareas del proyecto: lee el índice, toma la próxima tarea pendiente, la ejecuta y commitea, hasta que no quedan tareas pendientes.

## Cuándo usar

- Cuando se pida ejecutar, avanzar o continuar con las tareas del proyecto.
- Cuando se quiera procesar `TODO.txt` y ejecutar la próxima tarea pendiente.
- Al iniciar una sesión de trabajo para retomar el ciclo donde se dejó.

## Cuándo no usar

- Cuando se pida crear tareas nuevas: usar el skill `crear-tareas`.
- Cuando se pida commitear sin haber ejecutado una tarea: usar el skill `commit`.
- Cuando no haya tareas pendientes y el usuario no haya solicitado continuar el ciclo.

## Entrada

- `TODO.txt` como índice de tareas del proyecto.
- Archivos de tarea en `docs/tasks/` referenciados desde `TODO.txt`.

## Salida

- Tareas pendientes ejecutadas y marcadas como completadas en `TODO.txt` y en su archivo de tarea.
- Un commit por tarea completada.
- `TODO.txt` actualizado con los cambios de estado.

## Principios rectores

1. **Una tarea a la vez:** ejecuta una sola tarea pendiente por iteración del ciclo, de principio a fin, antes de tomar la siguiente.
2. **Seguir el archivo de tarea:** cada tarea define su objetivo, procedimiento y criterios de calidad; respétalos como contrato.
3. **Trazabilidad:** marca el estado en `TODO.txt` y en el campo «Estado» del archivo de tarea para que el progreso sea visible sin inspeccionar el repositorio.
4. **Commits atómicos:** un commit por tarea completada, antes de comenzar la siguiente, para que el historial refleje el avance real.
5. **No inventar tareas:** si descubres trabajo nuevo durante la ejecución, dalo de alta con `crear-tareas`; no lo ejecutes directamente.

## Procedimiento

1. **Leer `TODO.txt`** para obtener el índice de tareas. Cada línea tiene el formato `- [estado] docs/tasks/NNN-slug.md — título`, donde el estado es `[ ]` pendiente, `[~]` en progreso, `[x]` completada o `[!]` bloqueada.
2. **Identificar la próxima tarea pendiente** (`[ ]`) que no esté bloqueada. Si hay una tarea ya en progreso (`[~]`), retomarla en lugar de empezar una nueva.
3. **Si no hay tareas pendientes**, preguntar al usuario qué hacer y, si propone trabajo nuevo, usar el skill `crear-tareas` para darlo de alta. Terminar el ciclo.
4. **Marcar la tarea como en progreso** cambiando `[ ]` a `[~]` tanto en `TODO.txt` como en el campo «Estado» del archivo de tarea, antes de empezar a trabajar. Esto evita que otra sesión tome la misma tarea.
5. **Leer el archivo de tarea** referenciado y seguir su objetivo, procedimiento y criterios de calidad. Si el procedimiento sugiere validación con el usuario, pedir confirmación antes de continuar.
6. **Si durante la ejecución se descubren nuevas tareas**, usar el skill `crear-tareas` para darlas de alta. No ejecutarlas dentro de la iteración actual; se procesarán en iteraciones posteriores del ciclo.
7. **Si la tarea no se puede realizar porque depende de otra aún no completada**, marcarla como bloqueada `[!]` en `TODO.txt` y, debajo de esa línea, crear una sublista con las tareas bloqueantes. Pasar a la siguiente tarea pendiente no bloqueada.
8. **Al terminar la tarea**, marcarla como completada `[x]` en `TODO.txt` y en el campo «Estado» del archivo de tarea.
9. **Commitear la tarea completada** usando el skill `commit` antes de comenzar la siguiente. El commit debe registrar los cambios de la tarea y la actualización de estado en `TODO.txt`.
10. **Volver al paso 1** y repetir el ciclo hasta que no queden tareas pendientes no bloqueadas.
11. **Si no quedan tareas pendientes**, preguntar al usuario qué hacer y, si propone trabajo nuevo, usar el skill `crear-tareas`. Terminar el ciclo.

## Formato de salida

No hay un formato de salida fijo. El resultado del ciclo es el estado actualizado de `TODO.txt`, los archivos de tarea y el historial de commits. Al terminar cada iteración, informar brevemente al usuario de la tarea completada y de la siguiente que se va a ejecutar.

## Finalización

El skill ha terminado cuando:

- No quedan tareas pendientes `[ ]` ni en progreso `[~]` en `TODO.txt`.
- Todas las tareas completadas tienen su commit correspondiente.
- Se ha informado al usuario del estado final.
