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
  Estado: consolidada

- Id: 20260921T000145
  Tarea: docs/tasks/053-mejorar-cuerpo-commits.md
  Esperado: que las referencias a conjuntos de commits sean estables y resolubles en el futuro
  Obtenido: la tarea citaba «los últimos 10 commits», una referencia relativa que cambia con cada commit nuevo
  Corrección: las referencias a commits se hacen por hash o rango de hashes, que son permanentes; las referencias relativas («los últimos N») dejan de apuntar a lo mismo en cuanto avanza el historial
  Estado: consolidada

- Id: 20260921T011500
  Tarea: docs/tasks/057-construir-capacidad-planificar.md
  Esperado: que las plantillas nuevas mantengan coherencia y estructura común con las existentes, para que los formatos del proyecto sean consistentes entre sí —no seguir convenciones por seguirlas
  Obtenido: la plantilla de épica tenía tres subsecciones ### bajo «Plan técnico» y alcance con estructura más pesada que la de las tareas
  Corrección: buscar el balance entre el formato completo y el plano; la estructura interna detallada la decide quien planea, no la plantilla —los campos obligatorios se sugieren como bullets etiquetados, no como subsecciones
  Estado: consolidada

- Id: 20260921T011530
  Tarea: docs/tasks/057-construir-capacidad-planificar.md
  Esperado: que las reglas dentro de un skill se describan inline, de modo que el lector entienda qué hacer sin abrir otro documento
  Obtenido: el skill citaba «(D019)» y «siguiendo la decisión D019» sin explicar qué decidía, obligando a abrir el archivo de decisión
  Corrección: las citas desnudas a decisiones no aportan contexto; la regla se escribe inline y la referencia resoluble (ruta + descripción) va solo en la sección Referencias
  Estado: consolidada

- Id: 20260921T011600
  Tarea: docs/tasks/057-construir-capacidad-planificar.md
  Esperado: que la auditoría de referencias se limitara a los archivos del cambio de la tarea
  Obtenido: al buscar otros casos de la regla se corrigió también un comentario de TODO.txt («(D017)»), fuera del alcance de la tarea
  Corrección: al revisar casos de una regla durante una tarea, los hallazgos fuera de alcance se reportan al usuario o se registran como trabajo descubierto, no se corrigen directamente
  Estado: consolidada

- Id: 20260921T183814
  Tarea: docs/tasks/072-skill-documentar-dominio.md
  Esperado: que el diseño del ancla en la documentación de dominio considerara tanto la detección de deriva como la trazabilidad
  Obtenido: el ancla apuntaba solo al código, sin referencia a la tarea o épica que introdujo el concepto
  Corrección: distinguir el ancla (apunta a lo que cambia: el código, y sirve para detectar deriva) de la procedencia (apunta a la historia: tarea o épica, como campo «Origen» opcional)
  Estado: consolidada

- Id: 20260921T183815
  Tarea: docs/tasks/072-skill-documentar-dominio.md
  Esperado: que los campos de una entrada de plantilla no produzcan líneas excesivamente largas
  Obtenido: el glosario de la plantilla domain.txt ponía definición, ancla y origen en una sola línea por término
  Corrección: usar listas anidadas para los campos de cada entrada, manteniendo líneas cortas y legibles
  Estado: consolidada

- Id: 20260922T123008
  Tarea: docs/tasks/075-lecciones-en-revision-tecnica.md
  Esperado: que la redacción use vocabulario estándar del español
  Obtenido: el texto usaba «errores ya leccionados», una derivación forzada de «lección»
  Corrección: usar «ya aprendidos»; no acuñar participios a partir de «lección» cuando existe la forma llana
  Estado: consolidada

- Id: 20260922T123502
  Tarea: todo-app/docs/tasks/006-documentar-dominio.md
  Esperado: que la documentación de un dominio viva junto al código que describe
  Obtenido: el documento de dominio de todo-app se creó en docs/domains/ de la raíz del repositorio, lejos del código en todo-app/
  Corrección: el directorio docs/domains/ pertenece al proyecto que contiene el código del dominio; si el repo tiene sub-proyectos con su propio docs/, el dominio se documenta ahí
  Estado: pendiente

- Id: 20260922T140000
  Tarea: todo-app/docs/tasks/009-validar-tareas-al-cargar.md
  Esperado: que el nombre del parámetro no presuponga lo que la función verifica
  Obtenido: `isValidTask` recibía el parámetro `t`, nombre que asume que el valor ya es una tarea
  Corrección: usar `candidate` para un valor cuya condición de tarea está en verificación; `t` es aceptable donde el valor ya es una tarea (filtros, búsquedas)
  Estado: pendiente

- Id: 20260923T000000
  Tarea: todo-app/docs/tasks/010-proteger-estado-del-modelo.md
  Esperado: que los comentarios del código sean útiles a lo largo del tiempo
  Obtenido: el comentario de `reset()` narraba el razonamiento del proceso de la sesión (operación del arnés, no del dominio)
  Corrección: los comentarios explican la razón duradera del código; no se incluye narrativa transitoria de la sesión ni del proceso
  Estado: pendiente
