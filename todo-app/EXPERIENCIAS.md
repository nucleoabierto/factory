# Experiencias

Registro append-only de las correcciones que el usuario hizo durante las tareas de este proyecto. Cada entrada documenta la brecha entre el resultado esperado y el obtenido. `consolidar-lecciones` las agrupa después en notas de lecciones aprendidas bajo `docs/lessons/`; las entradas nunca se editan ni se borran, solo cambian su `Estado` a `consolidada`.

- Id: 20260921T170817
  Tarea: docs/tasks/002-estructura-base.md
  Esperado: que el diff fuera estrictamente fiel al plan aprobado, que declaraba no adelantar clases de estado de tareas posteriores.
  Obtenido: style.css incluía la regla `.filters a.selected`, un estilo de estado correspondiente a la tarea 005, no registrada como desviación.
  Corrección: el usuario pidió eliminar la regla para seguir el plan.
  Estado: pendiente

- Id: 20260921T170817
  Tarea: escenario todo-app (tarea meta 069 del proyecto padre)
  Esperado: que las experiencias generadas dentro de todo-app se registren en un EXPERIENCIAS.md propio, manteniendo el scope del subproyecto como hace TODO.txt.
  Obtenido: el agente iba a registrar la corrección en el EXPERIENCIAS.md de la raíz del meta-proyecto.
  Corrección: el usuario indicó crear EXPERIENCIAS.md dentro de todo-app/.
  Estado: pendiente
