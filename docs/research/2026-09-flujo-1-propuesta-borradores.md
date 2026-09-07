# Flujo 1 completo: propuesta, borradores y procedimiento

> **Fecha:** 2026-09

## Propósito

Especificar el formato de la propuesta que produce el refinamiento, el mecanismo de borradores para trabajo asíncrono, el procedimiento de cada capacidad del flujo 1 (idea → tarea) y los cambios necesarios en `crear-tareas`, para guiar la construcción de las capacidades.

## Alcance

- **Cubierto:** formato de la propuesta, mecanismo de borradores (creación, ubicación, ciclo de vida, reflejo en `TODO.txt`), procedimiento de las cuatro capacidades del flujo 1, cambios concretos en `crear-tareas` y decisiones de diseño a registrar antes de construir.
- **Excluido:** implementación concreta (nombres de skills, código), flujos posteriores (planeación de épicas, gestión de código, gestión de producto) e integración con flujos futuros. La separación de `ejecutar-tareas` es objeto de la tarea 033.

## Entradas

- Una idea suelta del usuario o descubierta durante la ejecución de otra tarea.
- Investigaciones de apoyo en `docs/research/` cuando el refinamiento las requiera.
- `TODO.txt` y `docs/tasks/` como estado actual del sistema de tareas.

## Salidas

- Una propuesta en `docs/proposals/NNN-slug/` con `propuesta.md` y borradores independientes, en estado pendiente de revisión y reflejada en `TODO.txt`.
- Tareas definitivas en `docs/tasks/` y entradas en `TODO.txt` tras la aprobación.

## Hallazgos

### Patrones externos de propuesta como contenedor con borradores

Los sistemas que transforman ideas en tareas mediante agentes comparten un patrón: un *contenedor de propuesta* que agrupa el problema, la forma de solución y los borradores de las tareas, con una puerta de aprobación antes de materializar los borradores en tareas reales.

- Chorus modela la propuesta como un contenedor que incluye borradores de documentos (PRD, diseño técnico) y borradores de tareas con criterios de aceptación y un DAG de dependencias. El flujo es: crear propuesta vacía → añadir borradores → validar → enviar a revisión → aprobación del administrador → materialización de borradores en documentos y tareas reales [1].
- AgentBoard sigue un flujo análogo orientado a aceptación: el humano crea una tarea en estado *draft*, el agente escribe un plan de implementación que pasa a *pending_review*, el humano aprueba, el agente implementa y el humano acepta el resultado [2].
- Ambos sistemas separan la fase de planeación (donde se producen los borradores) de la fase de ejecución (donde los borradores aprobados se materializan), y sitúan una puerta humana explícita entre ambas.

### Patrones externos de puerta de aprobación asíncrona

La puerta asíncrona se caracteriza por un estado persistente que sobrevive la espera, una semántica de bloqueo (el agente no continúa sin decisión explícita) y una precondición determinista que decide cuándo se activa.

- AgentDraft modela la puerta con una máquina de estados: `IDLE/PLANNING` → `PENDING_APPROVAL` → `APPROVED`/`DENIED`/`EXPIRED`. El agente genera la acción candidata, persiste el contexto, pausa la ejecución y abre una solicitud con un resumen y un objeto de evidencia [3].
- 100monkeys modela la puerta como un estado `kind: Human` en el manifiesto del flujo, con un *prompt* para el revisor, un *timeout* y transiciones `approved`/`rejected` que determinan el siguiente estado [4].
- En ambos casos, la puerta es un punto de guardado durable: el estado sobrevive entre sesiones, de modo que el humano puede revisar cuando pueda y el agente reanuda al recibir la decisión.

### Patrones externos de formulación del problema separada de la solución

Las plantillas de especificación técnica consolidan una práctica: enmarcar el problema de forma independiente de la solución, declarar lo que queda fuera de alcance y documentar las alternativas descartadas.

- Las plantillas de especificación técnica exigen que el enunciado del problema no contenga lenguaje de solución, que el fuera de alcance cierre supuestos explícitos y que se documenten al menos dos alternativas con las razones de su rechazo [5][6][7].
- El enfoque *problem-oriented* formula los requisitos en términos de para qué se usará el sistema y qué problemas debe eliminar, dejando la solución a quien la proponga [8].
- La separación entre *what* (requisitos), *how* (diseño) y *when* (plan) evita que el enunciado del problema prejuzgue la forma de la solución [6].

### Estado actual del sistema

El sistema actual cubre la creación y ejecución de tareas, pero no el refinamiento de ideas. `crear-tareas` descompone una solicitud articulada del usuario y crea los archivos en la misma sesión, de forma síncrona [9]. `TODO.txt` es el índice único de tareas, con estados `[ ]`, `[~]`, `[r]`, `[x]`, `[!]` [10]. Las tareas viven en `docs/tasks/` con una plantilla de objetivo, dependencias, entrada, resultado esperado, criterios de calidad, procedimiento y revisión [11]. El flujo 2 (ejecución → commit) está cubierto por los skills existentes; el flujo 1 (idea → tarea) requiere capacidades nuevas y un mecanismo de borradores que hoy no existe [12].

## Conclusión

El flujo 1 se especifica en cuatro elementos coherentes con los patrones externos y con los principios del proyecto (simplicidad, archivos de texto en el repositorio, `TODO.txt` como punto de entrada único, principio *bootstrap*):

1. **La propuesta** es un archivo en `docs/proposals/NNN-slug/propuesta.md` que contiene el problema, la oportunidad, la forma de solución, las alternativas descartadas, el fuera de alcance, las investigaciones de apoyo y un índice de borradores. Es la unidad de revisión asíncrona y se mantiene acotada: el detalle de cada tarea vive en su propio archivo de borrador.
2. **El mecanismo de borradores** usa archivos independientes en `docs/proposals/NNN-slug/MM-titulo.md`. Cada borrador usa los mismos campos que la plantilla de tarea definitiva (objetivo, dependencias, entrada, resultado esperado, criterios de calidad, procedimiento sugerido y notas), sin Estado ni Revisión, que se añaden al promocionar. Los borradores se crean de forma progresiva durante el refinamiento, uno a uno, y se iteran de forma independiente. El ciclo de vida del borrador sigue el de la propuesta: borrador → pendiente de revisión → aprobada o descartada. El estado se refleja en `TODO.txt` con una sección dedicada y un marcador `[p]`.
3. **El procedimiento de cada capacidad** describe qué produce, no cómo se implementa ni cómo se nombra el skill que la cubra. Las cuatro capacidades son: descubrimiento del problema, propuesta de forma de solución, refinamiento con borradores y orquestación del flujo 1.
4. **Los cambios en `crear-tareas`** le añaden un segundo modo de operación sin alterar el primero. El modo independiente (motor interno) crea tareas desde una entrada articulada, como hoy; el modo flujo 1 promociona borradores aprobados a tareas definitivas. Ambos modos comparten un núcleo común (crear archivos en `docs/tasks/` y líneas en `TODO.txt`) y se bifurcan solo en la entrada, para que la estructura del skill no se vuelva compleja.

Antes de construir las capacidades se deben registrar cuatro decisiones de diseño: el formato y la ubicación de las propuestas, el mecanismo de borradores y su reflejo en `TODO.txt`, la función dual de `crear-tareas` y la extensión de D001 para que `TODO.txt` incluya propuestas en revisión.

## Formato o procedimiento

### Formato de la propuesta

La propuesta es un directorio `docs/proposals/NNN-slug/` que contiene el archivo `propuesta.md` y los borradores como archivos independientes `MM-titulo.md`. La numeración de propuestas es independiente de la de las tareas (el directorio distingue ambos); el número se obtiene consultando el número más alto existente en `docs/proposals/` y sumando uno. Plantilla de `propuesta.md`:

```markdown
# [Título de la propuesta]

## Estado

[ ] Borrador | [p] Pendiente de revisión | [a] Aprobada | [d] Descartada

## Origen

- [Cómo se descubrió la idea: solicitud del usuario o tarea donde se descubrió.]

## Problema

[De dos a tres párrafos. Qué problema representa la idea y qué oportunidad de
mejora supone resolverlo. Sin lenguaje de solución.]

## Oportunidad

[Por qué vale la pena resolverlo. Qué beneficio aporta. Qué alternativas
existentes supera.]

## Forma de solución

[Alto nivel: cambio de UX, cambio de UI, flujo nuevo, paso nuevo en un flujo
existente o fuera de alcance. Sin detalles de implementación.]

## Alternativas consideradas

- [Alternativa 1]: [por qué se descarta].
- [Alternativa 2]: [por qué se descarta].

## Fuera de alcance

- [Lo que explícitamente no se incluye, para cerrar supuestos de alcance.]

## Investigaciones de apoyo

- [Referencia a docs/research/NNN-xxx.md, si aplica. «Ninguna» si no.]

## Borradores

- `01-titulo.md` — título breve
- `02-titulo.md` — título breve (depende de 01)

## Revisión

- Usuario: [fecha] — [Aprueba | Solicita cambios | Rechaza]
```

Plantilla de cada borrador en `MM-titulo.md`:

```markdown
# [Título del borrador]

## Objetivo

[Descripción concisa del objetivo.]

## Dependencias

- [Borradores previos (p. ej., «Borrador 01») o «Ninguna».]

## Entrada

- [Qué se necesita para ejecutar la tarea.]

## Resultado esperado

- [Descripción del resultado.]

## Criterios de calidad

- [Criterio verificable 1.]
- [Criterio verificable 2.]

## Procedimiento sugerido

1. [Paso 1.]

## Notas

- [Observaciones, si aplica. Omitir la sección si no.]
```

#### Reglas del formato

1. El enunciado del problema no contiene lenguaje de solución [5][8].
2. La forma de solución se expresa a alto nivel, sin detalles de implementación.
3. Se documentan al menos dos alternativas con las razones de su rechazo [5][6].
4. El fuera de alcance lista explícitamente lo que podría asumirse dentro del alcance [5][6].
5. `propuesta.md` contiene el enmarcado del problema y la solución, más un índice de borradores. No contiene el detalle de las tareas: ese vive en los archivos de borrador. Esto mantiene el archivo acotado.
6. Cada borrador es un archivo independiente que usa los mismos campos que la plantilla de tarea definitiva (`assets/task.txt`), sin Estado ni Revisión, que se añaden al promocionar.
7. Las dependencias entre borradores se expresan por número de borrador dentro de la propuesta (p. ej., «Borrador 01»).
8. Los borradores se numeran con dos dígitos (`01`, `02`, …) para mantener el orden alfabético del directorio.

### Mecanismo de borradores

#### Ubicación

Los borradores son archivos independientes `MM-titulo.md` en el directorio de la propuesta. Esto mantiene `propuesta.md` acotado al enmarcado del problema y la solución, y permite que el refinamiento sea progresivo: los borradores se crean y se iteran de uno en uno, sin reabrir el archivo de propuesta para editar cada tarea. Al promocionar, `crear-tareas` mueve cada borrador a `docs/tasks/NNN-slug.md` con su número de tarea definitivo.

#### Reflejo en TODO.txt

`TODO.txt` gana una sección dedicada al final, después de los hitos:

```markdown
## Propuestas en revisión

- [p] docs/proposals/NNN-slug/ — título (N borradores)
```

El marcador `[p]` distingue las propuestas de las tareas. Esta sección es el punto de entrada para reanudar el flujo 1: el agente la lee al iniciar una sesión y detecta las propuestas que esperan revisión.

#### Ciclo de vida del borrador

El borrador no tiene ciclo de vida propio: sigue el de la propuesta, que es:

1. **Creación.** Durante el refinamiento, el agente crea el directorio `docs/proposals/NNN-slug/` con `propuesta.md` en estado `[ ]` Borrador y va añadiendo borradores como `MM-titulo.md` de forma progresiva, uno a uno. La propuesta no aparece todavía en `TODO.txt`.
2. **Envío a revisión.** Cuando el refinamiento termina, el agente cambia el estado de `propuesta.md` a `[p]` Pendiente de revisión y añade la línea a la sección de propuestas de `TODO.txt`. El agente se detiene: la puerta humana asíncrona está activa [3][4].
3. **Revisión asíncrona.** El usuario revisa en otra sesión. Puede aprobar, solicitar cambios o rechazar. La revisión incluye `propuesta.md` y cada borrador individual.
4. **Aprobación.** El usuario aprueba; el agente registra la decisión en el campo Revisión de `propuesta.md`. `crear-tareas` promociona los borradores a tareas definitivas. Por cada borrador, en orden de numeración: aplicar revisión de redacción y pulido mecánico en modo preventivo, asignar el siguiente número de tarea disponible, mover el archivo a `docs/tasks/NNN-slug.md`, añadir Estado `[ ]` y Revisión vacío, y renumerar las dependencias al número de tarea definitivo. Después: actualizar el índice `## Borradores` de `propuesta.md` para apuntar a las tareas definitivas, añadir las líneas de tarea a `TODO.txt` bajo el hito correspondiente, eliminar la línea de la propuesta de la sección de propuestas y cambiar el estado de `propuesta.md` a `[a]` Aprobada.
5. **Cambios solicitados.** El agente retira la línea `[p]` de `TODO.txt`, actualiza la propuesta y los borradores afectados, vuelve al estado `[ ]` Borrador, refina de nuevo y reenvía a revisión (vuelve a `[p]` y repone la línea).
6. **Rechazo.** El agente elimina la línea de `TODO.txt` y cambia el estado de `propuesta.md` a `[d]` Descartada. El directorio se conserva para trazabilidad.

### Procedimiento de cada capacidad

Las capacidades se describen por su resultado y su procedimiento, sin predeterminar nombres de skills.

#### Capacidad de descubrimiento del problema

- **Entrada:** una idea suelta del usuario o descubierta durante la ejecución.
- **Procedimiento:**
  1. Dialogar con el usuario, de forma interactiva, para identificar qué problema representa la idea.
  2. Evaluar si el problema es real, si supera las alternativas existentes y qué beneficio aporta resolverlo.
  3. Formular el problema y la oportunidad sin proponer solución.
  4. Validar con el usuario que el problema está correctamente enmarcado.
- **Salida:** problema + oportunidad.
- **Puerta:** validación interactiva con el usuario.

#### Capacidad de propuesta de forma de solución

- **Entrada:** problema + oportunidad.
- **Procedimiento:**
  1. Determinar la forma que tomaría la solución dentro del contexto del producto.
  2. Categorizar: cambio de UX, cambio de UI, flujo nuevo, paso nuevo en un flujo existente o fuera de alcance.
  3. Listar las alternativas consideradas y por qué se descartan.
  4. Definir el fuera de alcance.
  5. Validar con el usuario que la forma de solución es la correcta.
- **Salida:** forma de solución + alternativas + fuera de alcance.
- **Puerta:** validación interactiva con el usuario.

#### Capacidad de refinamiento con borradores

- **Entrada:** problema + forma de solución.
- **Procedimiento:**
  1. Invocar la capacidad de investigación cuando el refinamiento requiera evidencia externa.
  2. Crear el directorio `docs/proposals/NNN-slug/` con `propuesta.md` (problema, forma de solución, alternativas, fuera de alcance, investigaciones) en estado `[ ]` Borrador.
  3. Descomponer la forma de solución en borradores de tarea. Crear cada borrador como archivo independiente `MM-titulo.md` en el directorio de la propuesta, de forma progresiva: uno a uno, iterando cada uno antes de pasar al siguiente.
  4. Actualizar el índice de borradores en `propuesta.md` a medida que se añaden.
  5. Al terminar, cambiar el estado a `[p]` Pendiente de revisión y añadir la línea a `TODO.txt`.
  6. Detenerse. La puerta humana asíncrona está activa.
- **Salida:** propuesta con borradores independientes, listada en `TODO.txt`.
- **Puerta:** humana asíncrona.

#### Capacidad de orquestación del flujo 1

- **Entrada:** una idea suelta o una propuesta pendiente detectada en `TODO.txt`.
- **Procedimiento:**
  1. Leer `TODO.txt`. Si hay propuestas pendientes `[p]`, retomar la revisión con el usuario.
  2. Si no, tomar la idea suelta y coordinar las transiciones: descubrimiento del problema → propuesta de forma de solución → refinamiento con borradores.
  3. Tras la aprobación del usuario, registrar la decisión en el campo Revisión de `propuesta.md` e invocar la promoción de borradores a tareas definitivas (cubierta por `crear-tareas`, que se modifica para este rol).
  4. Tras el rechazo, marcar la propuesta como descartada.
- **Salida:** tareas definitivas en `docs/tasks/` y `TODO.txt`, o propuesta descartada.

### Cambios en crear-tareas

#### Función dual

`crear-tareas` debe funcionar de dos formas que comparten un núcleo común, sin que su estructura interna se vuelva compleja:

- **Modo independiente (motor interno):** crea tareas desde una entrada articulada, sin propuesta. Es el comportamiento actual [9], que se mantiene para que el motor interno siga operando por sí solo.
- **Modo flujo 1:** promociona los borradores aprobados de una propuesta a tareas definitivas.

Ambos modos producen lo mismo: archivos en `docs/tasks/` y líneas en `TODO.txt`. La diferencia está solo en la entrada. La estructura del skill se organiza alrededor del núcleo común, con una bifurcación al inicio según el tipo de entrada.

#### Núcleo común

- Crear archivos en `docs/tasks/NNN-slug.md` siguiendo la plantilla de `assets/task.txt`.
- Añadir líneas a `TODO.txt` bajo el hito correspondiente.
- Numeración secuencial y agrupación por hitos.

#### Modo independiente

- **Entrada:** tareas articuladas con los campos mínimos (objetivo, resultado esperado y al menos un criterio de calidad), provenientes del usuario o descubiertas durante la ejecución. Si la entrada es una solicitud sin articular, descomponerla en tareas antes de crear.
- **Salida:** archivos en `docs/tasks/` y líneas en `TODO.txt`, sin propuesta intermedia.

#### Modo flujo 1

- **Entrada:** una propuesta en estado `[p]` Pendiente de revisión cuya aprobación humana se ha recibido (directorio `docs/proposals/NNN-slug/` con `propuesta.md` y borradores `MM-titulo.md`).
- **Promoción:** por cada borrador `MM-titulo.md`, en orden de numeración: aplicar revisión de redacción y pulido mecánico en modo preventivo, asignar el siguiente número de tarea disponible, moverlo a `docs/tasks/NNN-slug.md`, añadir la sección Estado con `[ ]` y la sección Revisión vacía, y renumerar las dependencias de «Borrador NN» al número de tarea definitivo correspondiente (p. ej., `035`). Después: actualizar el índice `## Borradores` de `propuesta.md` para apuntar a las tareas definitivas (p. ej., `- docs/tasks/035-slug.md — título breve`), añadir las líneas de tarea a `TODO.txt` bajo el hito correspondiente, eliminar la línea de la propuesta de la sección de propuestas y cambiar el estado de `propuesta.md` a `[a]` Aprobada.

#### Lo que se mantiene

- La plantilla de tarea en `assets/task.txt`.
- El formato de línea en `TODO.txt`: `- [ ] docs/tasks/NNN-slug.md — título breve`.
- La numeración secuencial de tareas.
- La agrupación por hitos.
- El modo independiente como comportamiento autónomo del motor interno.

### Decisiones de diseño a registrar antes de construir

Antes de construir las capacidades del flujo 1, se registran cuatro decisiones de diseño:

1. **Formato y ubicación de las propuestas.** `docs/proposals/NNN-slug/` con `propuesta.md` (enmarcado del problema y la solución, más índice de borradores) y `MM-titulo.md` (detalle de cada tarea), con estado propio.
2. **Mecanismo de borradores y su reflejo en `TODO.txt`.** Sección de propuestas en `TODO.txt` con marcador `[p]`, ciclo de vida borrador → pendiente de revisión → aprobada o descartada.
3. **Función dual de `crear-tareas`.** Modo independiente (motor interno: crear desde entrada articulada) y modo flujo 1 (promocionar borradores aprobados), con núcleo común y bifurcación solo en la entrada.
4. **Extensión de D001.** `TODO.txt` pasa de índice único de tareas a índice de tareas y propuestas en revisión. La decisión D001 se actualiza o se sustituye por una nueva que refleje el alcance ampliado.

## Limitaciones

- El diseño se basa en la documentación interna del proyecto y en fuentes externas de la industria publicadas en 2026. Las fuentes externas describen prácticas de sistemas en producción, no estándares académicos con revisión por pares.
- La integración con flujos futuros (planeación de épicas, gestión de código, gestión de producto) no se evalúa. La coherencia entre flujos se validará cuando estos se diseñen.
- La numeración independiente de propuestas y tareas puede generar confusión visual si ambos crecen; se reevaluará si el volumen lo justifica.
- El modo independiente de `crear-tareas` permite crear tareas sin pasar por el flujo 1. Esto es necesario para el motor interno, pero diluye ligeramente el principio de que toda idea pasa por refinamiento. El equilibrio entre ambos modos se confirmará al usar el flujo 1 en la práctica.

## Referencias

- [1] Chorus, «Proposal Skill» — github.com/Chorus-AIDLC/Chorus/blob/main/public/skill/proposal-chorus/SKILL.md
- [2] seoshmeo, «AgentBoard» — github.com/seoshmeo/agentboard
- [3] AgentDraft, «AI Agent Human Approval Workflow Design Guide» — agentdraft.io/blog/ai-agent-human-approval-workflow-guide
- [4] 100monkeys, «Human Approvals» — docs.100monkeys.ai/docs/workflows/human-approvals
- [5] mohitagw15856, «Technical Spec Template Skill» — github.com/mohitagw15856/pm-claude-skills/blob/main/exports/zed/pm-delivery/technical-spec-template/technical-spec-template.md
- [6] StackPractices, «Technical Specification Template» — stackpractices.com/docs/technical-spec-template/
- [7] danielkov, «Technical proposal template» — github.com/danielkov/docs/blob/master/templates/technical-proposal-template.md
- [8] Søren Lauesen, «Problem-oriented Requirements SL-07, Guide and Contract» — itu.dk/~slauesen/Reqs/GuideSL-07-online.pdf
- [9] Skill `crear-tareas` — `.agents/skills/crear-tareas/SKILL.md`
- [10] Decisión D001, «TODO.txt como índice único de tareas» — `docs/decisions/D001-todo-txt-como-indice-unico.md`
- [11] Decisión D002, «Tareas individuales en docs/tasks/» — `docs/decisions/D002-tareas-individuales-en-docs-tasks.md`
- [12] Investigación previa, «Flujos de idea a tarea y de ejecución de tarea» — `docs/research/2026-09-flujos-idea-tarea-ejecucion.md`
