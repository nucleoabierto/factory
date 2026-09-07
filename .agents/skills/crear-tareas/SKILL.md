---
name: crear-tareas
description: >
  Crea tareas de forma interactiva usando la plantilla del proyecto y
  validando con el usuario antes de generar los archivos finales.
  Usar cuando el usuario pida crear tareas o cuando se descubran nuevas
  tareas durante la ejecución de otra tarea.
  Sinónimos: crear tarea, registrar tarea, añadir tarea, dar de alta tarea.
---

# Crear tareas

Instrucciones para que un agente cree tareas validando con el usuario antes de generar los archivos finales, usando la plantilla del proyecto.

## Cuándo usar

- Cuando el usuario pide crear una o varias tareas.
- Cuando se descubren nuevas tareas durante la ejecución de otra tarea.

## Cuándo no usar

- Para acciones triviales que no necesitan seguimiento.
- Cuando el usuario pide explícitamente no crear tarea.

## Entrada

- La solicitud del usuario, que puede describir una o varias tareas.
- `TODO.txt` como índice actual de tareas.
- `assets/task.txt` como plantilla.

## Salida

- Uno o varios archivos de tarea en `docs/tasks/` siguiendo la plantilla.
- Entradas correspondientes añadidas a `TODO.txt`.

## Procedimiento

1. **Leer la plantilla** en `assets/task.txt`.
2. **Consultar `TODO.txt`** para determinar el siguiente número de tarea disponible. Si `TODO.txt` no existe, crearlo con la estructura del proyecto antes de continuar.
3. **Descomponer la solicitud** del usuario en tareas. Cada tarea debe tener:
   - Título breve.
   - Objetivo conciso.
   - Dependencias, si las hay.
   - Resultado esperado.
   - Criterios de calidad verificables.
4. **Presentar al usuario** un resumen de las tareas propuestas antes de generar los archivos. El resumen debe incluir, para cada tarea: título, objetivo y dependencias. La finalidad de este paso es validar que la descomposición está alineada con la solicitud original.
5. **Tras confirmación del usuario**, crear cada archivo de tarea en `docs/tasks/` usando la plantilla, con el número correspondiente y el contenido acordado. Si el usuario solicita cambios, ajustar la descomposición y repetir el paso 4. Si el usuario rechaza la propuesta, no crear archivos y terminar.
6. **Añadir las entradas** a `TODO.txt` con el formato `- [ ] docs/tasks/NNN-identificador.md — título breve`, donde NNN es el número de tarea y el identificador es una versión en kebab-case del título.
7. **Informar al usuario** que las tareas están creadas.

## Finalización

El skill ha terminado cuando:

- El usuario ha aprobado las tareas propuestas.
- Los archivos de tarea están creados en `docs/tasks/`.
- Las entradas están añadidas a `TODO.txt`.
