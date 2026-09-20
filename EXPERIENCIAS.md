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
  Estado: pendiente
