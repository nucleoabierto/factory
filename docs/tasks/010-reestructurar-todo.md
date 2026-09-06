# Reestructurar TODO.txt

## Estado

[x] Completada

## Objetivo

Ajustar `TODO.txt` para que sea una colección de tareas que se documentan usando la plantilla `docs/templates/task.txt`. Después de este ajuste, `TODO.txt` debe apuntar a los archivos de las tareas individuales para que el agente use el archivo como un control de avance y los detalles se conserven en un archivo individual.

## Dependencias

- `docs/tasks/009-crear-plantilla-tareas.md`

## Entrada

- `docs/templates/task.txt`
- `TODO.txt` (estado actual)
- Aprobación del usuario para la estructura propuesta.

## Resultado esperado

- `TODO.txt` reescrito como índice con el formato: `[estado] docs/tasks/NNN-slug.md — título breve`.
- `docs/tasks/` con un archivo por cada tarea existente, usando la plantilla.
- Las tareas completadas se migran con estado `[x]`.

## Criterios de calidad

- `TODO.txt` no contiene descripciones largas; solo referencias a archivos individuales.
- Cada archivo de tarea usa la plantilla `docs/templates/task.txt`.
- Los nombres de archivo siguen el patrón `NNN-slug-descriptivo.md`.
- Las tareas bloqueadas mantienen su sublista de bloqueantes.
- La migración se realiza al finalizar la tarea, no durante.

## Procedimiento sugerido

1. Proponer la estructura al usuario y esperar aprobación.
2. Crear `docs/tasks/` con un archivo por cada tarea existente.
3. Reescribir `TODO.txt` como índice.
4. Commit.

## Notas

- Estructura aprobada por el usuario con ajuste: numeración `NNN` (tres dígitos) y migración al final.
