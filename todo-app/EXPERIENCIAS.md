# Experiencias

Registro append-only de las correcciones que el usuario hizo durante las tareas de este proyecto. Cada entrada documenta la brecha entre el resultado esperado y el obtenido. `consolidar-lecciones` las agrupa después en notas de lecciones aprendidas bajo `docs/lessons/`; las entradas nunca se editan ni se borran, solo cambian su `Estado` a `consolidada`.

- Id: 20260921T170817
  Tarea: docs/tasks/002-estructura-base.md
  Esperado: que el diff fuera estrictamente fiel al plan aprobado, que declaraba no adelantar clases de estado de tareas posteriores.
  Obtenido: style.css incluía la regla `.filters a.selected`, un estilo de estado correspondiente a la tarea 005, no registrada como desviación.
  Corrección: el usuario pidió eliminar la regla para seguir el plan.
  Estado: consolidada

- Id: 20260921T170818
  Tarea: escenario todo-app (tarea meta 069 del proyecto padre)
  Esperado: que las experiencias generadas dentro de todo-app se registren en un EXPERIENCIAS.md propio, manteniendo el scope del subproyecto como hace TODO.txt.
  Obtenido: el agente iba a registrar la corrección en el EXPERIENCIAS.md de la raíz del meta-proyecto.
  Corrección: el usuario indicó crear EXPERIENCIAS.md dentro de todo-app/.
  Estado: consolidada

- Id: 20260921T172940
  Tarea: docs/tasks/003-crear-y-listar.md
  Esperado: que el código se escribiera en inglés —identificadores, claves, comentarios y también los tests— a diferencia de la documentación, que va en español.
  Obtenido: el modelo, las funciones de App, la clave de localStorage y los nombres y mensajes de los tests se implementaron en español.
  Corrección: el usuario indicó que para código es aceptable usar inglés, a diferencia de la documentación, y que los tests también cuentan como código.
  Estado: consolidada

- Id: 20260922T123502
  Tarea: todo-app/docs/tasks/006-documentar-dominio.md
  Esperado: que la documentación de un dominio viva junto al código que describe
  Obtenido: el documento de dominio de todo-app se creó en docs/domains/ de la raíz del repositorio, lejos del código en todo-app/
  Corrección: el directorio docs/domains/ pertenece al proyecto que contiene el código del dominio; si el repo tiene sub-proyectos con su propio docs/, el dominio se documenta ahí
  Estado: consolidada

- Id: 20260922T140000
  Tarea: todo-app/docs/tasks/009-validar-tareas-al-cargar.md
  Esperado: que el nombre del parámetro no presuponga lo que la función verifica
  Obtenido: `isValidTask` recibía el parámetro `t`, nombre que asume que el valor ya es una tarea
  Corrección: usar `candidate` para un valor cuya condición de tarea está en verificación; `t` es aceptable donde el valor ya es una tarea (filtros, búsquedas)
  Estado: consolidada

- Id: 20260923T000000
  Tarea: todo-app/docs/tasks/010-proteger-estado-del-modelo.md
  Esperado: que los comentarios del código sean útiles a lo largo del tiempo
  Obtenido: el comentario de `reset()` narraba el razonamiento del proceso de la sesión (operación del arnés, no del dominio)
  Corrección: los comentarios explican la razón duradera del código; no se incluye narrativa transitoria de la sesión ni del proceso
  Estado: consolidada

- Id: 20260925T114828
  Tarea: todo-app/docs/tasks/012-navegacion-por-lista.md
  Esperado: que un elemento nuevo de la interfaz llegara terminado también en lo visual, no solo en lo funcional
  Obtenido: el `<select>` de listas se entregó sin regla CSS y sin nombre accesible; se veía con el estilo por defecto del navegador, desalineado con el diseño
  Corrección: el usuario pidió revisar la parte visual y de estilos antes de aprobar; se añadió la regla `.list-select` coherente con la paleta y el `aria-label`
  Estado: pendiente

- Id: 20260925T121008
  Tarea: todo-app/docs/tasks/013-gestion-de-listas.md
  Esperado: que los controles nuevos llegaran con acabado visual uniforme, aunque sean glifos de texto
  Obtenido: los botones +, ✎ y × tenían tamaños distintos por la métrica de cada carácter
  Corrección: el usuario pidió cajas cuadradas del mismo tamaño; se resolvió con inline-flex centrado y dimensiones fijas
  Estado: pendiente

- Id: 20260925T213000
  Tarea: todo-app/docs/tasks/017-asignar-y-distinguir-fechas.md
  Esperado: que un control nuevo por fila siguiera el patrón visual de sus hermanos (mover, eliminar): oculto hasta el hover.
  Obtenido: el campo de fecha quedó siempre visible, rompiendo el patrón de la fila.
  Corrección: el usuario señaló que el campo no se oculta como el de mover o eliminar; se resolvió con visibility hidden por defecto y visible al hover o cuando la tarea tiene fecha.
  Estado: pendiente
