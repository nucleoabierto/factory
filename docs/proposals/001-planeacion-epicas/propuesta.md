# Planeación de conjuntos de trabajo

## Estado

[ ] Borrador | [p] **Pendiente de revisión** | [a] Aprobada | [d] Descartada

## Problema

El trabajo se planifica únicamente al nivel de una propuesta individual. Cuando un esfuerzo crece más allá de una sola idea —varias propuestas relacionadas, tareas que nacen sueltas, mantenimiento continuo— no existe un lugar donde ese conjunto tenga un objetivo explícito y verificable. Hoy la propuesta hace las veces de contenedor del grupo, aunque solo describe una idea, y las agrupaciones del índice de tareas son etiquetas sin contenido: nombran el conjunto pero no dicen qué lo une ni cuándo estará completo.

Además, entre la decisión de qué construir y la ejecución no hay un paso en el que se decida cómo. La descomposición en tareas recoge qué hacer pieza a pieza, pero las decisiones que atraviesan el conjunto —orden real de implementación, dependencias técnicas, enfoque compartido— quedan repartidas entre las piezas o se resuelven improvisadamente durante la ejecución, cuando corregirlas ya cuesta rehacer trabajo.

Afecta a quien planea el producto con el sistema, cada vez que el trabajo supera el alcance de una propuesta. El coste de no resolverlo es una ejecución sin dirección común verificable y decisiones transversales tomadas tarde, a mitad del camino.

## Oportunidad

Resolverlo daría a cada conjunto de trabajo un objetivo propio explícito —con independencia de cuántas ideas lo originaron— y un momento de decisión anterior a la ejecución donde se fija el cómo del conjunto. Supera a la alternativa actual —la propuesta como contenedor improvisado y las etiquetas sin contenido del índice— porque aquella solo cubre trabajo nacido de una única idea y no registra las decisiones transversales; su única ventaja es que no exige ningún paso adicional.

## Forma de solución

Quien planea el producto puede, antes de ejecutar, reunir un conjunto de trabajo —las tareas de una o varias propuestas, o tareas sueltas— bajo un objetivo propio explícito con su alcance y sus decisiones transversales ya tomadas: el recorrido existente de idea a ejecución gana el eslabón que hoy falta entre «tareas creadas» y «tareas en ejecución», de modo que el grupo sepa qué lo une, qué contiene y cómo se construirá antes de empezar. Categoría: paso nuevo en un flujo existente.

## Solución

Se introduce la épica como artefacto de planeación: un documento propio que declara el objetivo del conjunto, su alcance, las piezas que lo componen —tareas existentes o por crear— y el plan técnico que fija el orden de implementación y las decisiones transversales. Una capacidad nueva de planeación produce la épica a partir de una intención y del trabajo ya descompuesto, incluido el caso de agrupar tareas sueltas ya creadas.

La épica se refleja en el índice de tareas como la agrupación del conjunto, de modo que la lista siga siendo el punto de entrada de la ejecución y la épica aporte el porqué y el cómo que el índice no puede contener.

## Alternativas consideradas

- La propuesta como contenedor permanente del conjunto: se descarta porque solo alberga trabajo nacido de una única idea; las tareas sueltas y los esfuerzos que cruzan varias propuestas quedan sin hogar, y un documento que registra una decisión no sirve para planear de forma continua.
- Enriquecer las agrupaciones del índice de tareas con más contenido: se descarta porque el índice es una lista de trabajo, no un documento; un objetivo con alcance y decisiones transversales no cabe en una etiqueta, y mantenerlo ahí duplicaría el índice con contenido que no es índice.
- Planeación de producto completa con secuenciación de conjuntos: se descarta por ahora porque el problema observado es dar hogar y decisión técnica a un conjunto de trabajo; la ordenación de varios conjuntos en el tiempo es un problema posterior que aún no tiene evidencia en el proyecto.

## Fuera de alcance

- Secuenciación de varios conjuntos en el tiempo (el nivel *roadmap*).
- Seguimiento del avance del conjunto: porcentajes, velocidad o alertas de desviación.
- Estimaciones de esfuerzo o duración de las piezas.
- Replaneación automática cuando cambian las piezas del conjunto.

## Investigaciones de apoyo

- Ninguna.

## Borradores

- `01-investigar-planeacion-epicas.md` — Investigar formatos de épica y planeación técnica
- `02-registrar-decision-epica.md` — Registrar la decisión de la épica como artefacto (depende de 01)
- `03-construir-capacidad-planificar.md` — Construir la capacidad de planeación (depende de 02)
- `04-validar-planeacion-todo-app.md` — Validar la planeación sobre las tareas de todo-app (depende de 03)

## Revisión

- Usuario: [fecha] — [Aprueba | Solicita cambios | Rechaza]
