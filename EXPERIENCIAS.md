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

- Id: 20260923T151159
  Tarea: docs/tasks/076-persistir-informes-revision-arquitectura.md
  Esperado: que el directorio donde viven los informes declarara qué tipo de revisión contiene
  Obtenido: se propuso `docs/reviews/`, un nombre genérico que no distingue revisiones de arquitectura de revisiones de planes, PRs, commits o redacción
  Corrección: usar `docs/architecture-reviews/` —el nombre del directorio debe ser específico del artefacto que almacena
  Estado: consolidada

- Id: 20260924T023719
  Tarea: docs/tasks/080-gestionar-roadmap-todo-app.md
  Esperado: que el modelo del artefacto (documento único en la raíz) y sus campos fueran coherentes
  Obtenido: la plantilla del roadmap declaraba un campo Estado (Vigente/Superado) propio de una serie de documentos, imposible en un único archivo en la raíz
  Corrección: el roadmap es un documento vivo — se actualiza in situ, la historia la da git; sin campo de estado ni serie de roadmaps
  Estado: consolidada

- Id: 20260925T113207
  Tarea: docs/tasks/082-acciones-plan-checklist-delegable.md
  Esperado: la `description` del front-matter de un skill declara la capacidad y su resultado, como hacen los demás skills del proyecto.
  Obtenido: la descripción de `ejecutar-implementacion` narraba la mecánica interna («marcando cada acción de la checklist… delegando a subagentes…»), acoplando el contrato al procedimiento.
  Corrección: la descripción va a nivel de resultado («devuelve el diff con el registro de desviaciones»); el procedimiento vive en el cuerpo del skill.
  Estado: consolidada

- Id: 20260925T113208
  Tarea: docs/tasks/082-acciones-plan-checklist-delegable.md
  Esperado: al delegar una acción, el subagente realiza el cambio y devuelve la explicación de lo que hizo más la lista de archivos que tocó; el ejecutor valora la complejidad según la explicación y el tamaño de la acción y decide si revisa o confía antes de marcar.
  Obtenido: la delegación se diseñó como «el subagente devuelve un diff que el ejecutor aplica y verifica».
  Corrección: el retorno es la explicación de cambios más los archivos, no un diff; la decisión revisar/confiar es del ejecutor según complejidad.
  Estado: consolidada

- Id: 20260925T145156
  Tarea: docs/proposals/002-documentacion-producto-y-direccion/propuesta.md
  Esperado: que el registro de decisiones de diseño viva dentro de cada tarea que consolida una decisión
  Obtenido: la propuesta descomponía el trabajo en una tarea independiente de «registrar decisiones» que dependía de todas las demás
  Corrección: cada tarea registra en su propio cierre la decisión que consolida; una tarea transversal de registro rompe la autonomía de las piezas y retrasa decisiones que ya están maduras
  Estado: consolidada

- Id: 20260925T145157
  Tarea: docs/proposals/002-documentacion-producto-y-direccion/propuesta.md
  Esperado: que el concepto del sistema (ancla doc↔pruebas) sea genérico —«la suite de pruebas del proyecto»— y que la tecnología concreta de la PoC aparezca solo como dato de entrada
  Obtenido: la épica y la tarea 084 hablaban de «anclar a la suite QUnit», acoplando el diseño de Factory a la implementación concreta de todo-app
  Corrección: Factory es genérico y todo-app es una PoC; los artefactos del sistema no mencionan tecnologías del producto validado —la instancia concreta vive en la Entrada de la tarea, no en el concepto
  Estado: consolidada

- Id: 20260926T102400
  Tarea: docs/tasks/089-skill-consultar-decisiones.md
  Esperado: la `description` del front-matter declara la capacidad y el resultado del skill, sin narrar la mecánica interna.
  Obtenido: la descripción de `consultar-decisiones` narraba el procedimiento («dada una descripción… busca los disparadores… trae las decisiones»), heredando el patrón de `consultar-lecciones`.
  Corrección: la descripción describe la funcionalidad («recupera las decisiones vigentes que rigen un trabajo… para que el trabajo las respete»); el mecanismo de índice y disparadores vive en el cuerpo del skill.
  Estado: consolidada

- Id: 20260926T134312
  Tarea: docs/tasks/097-investigar-guias-estilo-frontend.md
  Esperado: que el nombre propuesto para un skill describa su capacidad completa — generar y mantener viva la guía de estilo.
  Obtenido: el documento llamó `generar-guia-estilo` al skill, nombre acoplado al acto inicial de generar que no refleja el mantenimiento posterior.
  Corrección: el usuario señaló que «generar» se confunde con el propósito amplio; el skill se renombró `documentar-guia-estilo`, simétrico a `documentar-dominio`. Un skill que crea y mantiene un artefacto vivo debe nombrarse por el artefacto mantenido, no por la acción inicial.
  Estado: consolidada

- Id: 20260926T135837
  Tarea: docs/tasks/098-skill-documentar-guia-estilo.md
  Esperado: que un skill de «documentar» un artefacto vivo admita definir o actualizar el artefacto en diálogo con el usuario, no solo a partir del código o del diff.
  Obtenido: `documentar-guia-estilo` solo contemplaba crear la guía por extracción del código y mantenerla como sensor; toda decisión de diseño quedaba subordinada a la ejecución.
  Corrección: los skills que mantienen artefactos decididos por humanos deben incluir un modo interactivo —primero se decide en discusión, después se materializa—; la ejecución consume la decisión, no la sustituye.
  Estado: consolidada

- Id: 20260928T160034
  Tarea: docs/tasks/101-skill-lluvia-de-ideas.md
  Esperado: material de referencia de un skill autocontenido y general, portable a cualquier proyecto evaluado.
  Obtenido: `references/` citaba `todo-app/docs/ideas/` como modelo y ejemplo, una ruta que solo existe en este repositorio.
  Corrección: eliminar las referencias a todo-app de los archivos de referencia; el skill debe funcionar en proyectos donde esa carpeta no existe.
  Estado: consolidada

- Id: 20260928T185609
  Tarea: docs/tasks/103-docs-producto-y-dominio-en-contexto.md
  Esperado: que el contrato del skill quedara flexible: la lista de fuentes como guía abierta y la `description` a nivel de capacidad y resultado.
  Obtenido: la lista de seis fuentes quedó como requisito cerrado en salida, principios y finalización, y la `description` las enumeraba, acoplando el contrato a la implementación.
  Corrección: declarar las listas de fuentes como abiertas y extensibles, y mantener la `description` a nivel de capacidad —qué reúne y dónde queda— sin enumerar fuentes ni mecánica.
  Estado: consolidada

- Id: 20260929T185349
  Tarea: docs/tasks/106-integrar-changelog-en-cierre-de-tareas.md
  Esperado: que la invocación del sensor de cierre pase la ubicación de los cambios y el skill invocado reconstruya el diff con git, como hace revisar-implementacion.
  Obtenido: el paso de cierre y el skill de changelog declaraban «el diff de la tarea» como entrada materializada.
  Corrección: no pasar el diff; pasar la ubicación de los cambios (árbol de trabajo o rango de commits) y apoyarse en git para revisarlos, al igual que los demás skills.
  Estado: consolidada

- Id: 20260929T190800
  Tarea: docs/tasks/106-integrar-changelog-en-cierre-de-tareas.md
  Esperado: que la entrada añadida a EXPERIENCIAS.md respetara el formato vigente del archivo: un campo por línea, sin envolver.
  Obtenido: la entrada se escribió con los campos envueltos en varias líneas cortas, rompiendo el formato del resto de entradas.
  Corrección: revisar el tamaño de las líneas del archivo antes de escribir y ajustarse a su formato; si coincide, continuar, y si no, corregir primero.
  Estado: consolidada

- Id: 20261002T123944
  Tarea: docs/tasks/112-documentar-conexion-flujos.md
  Esperado: que la actualización de `docs/definicion-proyecto.md` —desfasada respecto al cableado que la propia tarea documentaba— se hiciera dentro del alcance de la tarea
  Obtenido: el agente la reportó como hallazgo fuera de alcance y propuso darla de alta como tarea nueva en lugar de actualizarla en la tarea en curso
  Corrección: cuando un hallazgo toca el mismo tema que la tarea —un documento desfasado que describe justo lo que se está documentando—, la frontera del alcance no está cerrada; ofrecer absorberlo en la tarea además de registrarlo aparte
  Estado: consolidada

- Id: 20261003T150000
  Tarea: docs/tasks/114-skill-consultar-artefactos.md
  Esperado: que las pruebas del parser de `## Estado` cubrieran las variantes semánticas de cada convención antes de pedir aprobación
  Obtenido: las pruebas cubrían las formas felices de cada convención pero no que el marcador activo pudiera caer en cualquier posición: el parser mapeaba marcador→estado y devolvía `completada` ante `[x] En revisión`; la batería de pruebas reales pedida por el usuario tras la aprobación detectó el bug
  Corrección: al probar parsers de formatos con variantes, ejercitar cada variante en todas sus posiciones significativas —no solo la forma canónica de cada una— y hacerlo antes de presentar la tarea a aprobación
  Estado: consolidada
