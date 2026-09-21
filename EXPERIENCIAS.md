# Experiencias

<!-- Registro append-only de las correcciones que el usuario hace al agente
     durante la ejecución de tareas. Cada entrada documenta la brecha entre
     el resultado esperado y el obtenido.

     Las entradas nunca se editan ni se borran. Gestionado por el skill
     registrar-experiencias. -->

- Id: 20260920T135408
  Tarea: docs/tasks/044-crear-consolidacion-lecciones.md
  Esperado: que el agente pruebe el proceso de consolidación generando datos sintéticos cuando no hay experiencias reales disponibles
  Obtenido: el agente preguntó si esperar a que hubiera experiencias reales en lugar de intentar la prueba de concepto
  Corrección: cuando no hay información disponible pero se pueden generar datos sintéticos para una prueba de concepto, lo mejor es intentar la prueba y validar así la tarea
  Estado: consolidada

- Id: 20260920T143451
  Tarea: docs/tasks/036-construir-descubrimiento-problema.md
  Esperado: que el skill se refiera a los flujos por su nombre («flujo de idea a tarea»), no por su número
  Obtenido: el skill mencionaba «flujo 1» como invocador, una referencia frágil que deja de ser correcta si cambia la numeración de flujos
  Corrección: en los skills no se referencian flujos por número; se usa el nombre del flujo, que es auto-descriptivo y no depende de la numeración
  Estado: consolidada

- Id: 20260920T144500
  Tarea: docs/tasks/037-construir-propuesta-solucion.md
  Esperado: que las listas de categorías declaradas en skills se presenten como taxonomías abiertas, extensibles y sin acoplamiento al origen
  Obtenido: la referencia afirmaba que la forma de solución «cae en exactamente una de estas categorías», presentando como cerrada y canónica una lista que proviene de una investigación del proyecto
  Corrección: las taxonomías en skills no se presentan como listas cerradas ni se justifican por su origen; se declaran abiertas y se contempla la extensión cuando un caso real no encaja
  Estado: consolidada

- Id: 20260920T180434
  Tarea: docs/tasks/038-construir-refinamiento-borradores.md
  Esperado: que las investigaciones se conserven como estaban cuando se produjeron, y que los cambios de formato posteriores se registren en decisiones nuevas
  Obtenido: el agente editó la investigación 032 para sincronizarla con el formato final de la propuesta, reescribiendo el documento de entrada como si siempre hubiera sido correcto
  Corrección: las investigaciones son información inicial y no se editan retroactivamente aunque resulten incorrectas o incompletas; lo que cambió se registra como decisión nueva, de modo que el historial preserve lo que se sabía al investigar
  Estado: consolidada

- Id: 20260920T222103
  Tarea: docs/tasks/052-preparar-escenario-todo-app.md
  Esperado: que la tarea semilla describa solo lo que se espera, como una tarea normal, y que el agente descubra por sí mismo que una idea suelta pasa por el flujo de idea a tarea
  Obtenido: la semilla indicaba explícitamente invocar idea-a-tarea y ejecutar-tareas, revelando el procedimiento que la prueba debía medir
  Corrección: en una semilla de prueba no se da la pista del procedimiento; la entrada expresa la idea con sus restricciones y el agente debe inferir la ruta
  Estado: pendiente
