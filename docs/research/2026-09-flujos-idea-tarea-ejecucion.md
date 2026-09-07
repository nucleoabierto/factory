# Flujos de idea a tarea y de ejecución de tarea

> **Fecha:** 2026-09

## Propósito

Mapear paso a paso los dos primeros flujos del producto entregable —convertir una idea en una tarea y ejecutar una tarea hasta el commit—, identificar qué skills existentes se reutilizan en cada paso, qué skills nuevos se necesitan y dónde se sitúan los puntos de control humano del flujo asíncrono.

## Alcance

- **Flujos cubiertos:** idea → tarea (descubrimiento del problema, propuesta de forma de solución, refinamiento con borradores y promoción a tareas definitivas) y ejecución → commit (toma, ejecución, revisión y commit).
- **Flujos excluidos:** planeación de épicas y *roadmap*, gestión a nivel de código (*branching*, *pull requests*, revisión de código) y gestión a nivel de producto (*features*, *releases*, *feedback*). Estos pertenecen a hitos posteriores del producto entregable.
- **Fuentes:** documentación interna del proyecto (skills, visión, definición, decisiones de diseño, investigaciones previas) y fuentes externas sobre patrones de flujo con agentes y aprobación humana asíncrona.

## Hallazgos

### Patrones externos de flujo idea → ejecución con aprobación asíncrona

Los flujos con agentes que transforman una idea vaga en un resultado entregable comparten una estructura común en la literatura reciente: fases de clarificación y planeación seguidas de puertas de aprobación humana antes de la ejecución y antes de la finalización.

- El patrón *idea-to-completion* describe un flujo de idea burda → clarificar (investigación) → planear → **puerta 1: aprobación del plan** → implementar → verificar → **puerta 2: aprobación de la implementación** → finalización. El agente se detiene en cada puerta; el humano aprueba, refina o aborta [1].
- El patrón *ideation workflow* añade fases de validación y consenso entre subagentes antes de crear épicos y desglosar trabajo, con una recomendación explícita de proceder, aplazar o rechazar [2].
- El patrón *human-in-the-loop* asíncrono caracteriza la puerta de aprobación por tres propiedades: una precondición determinista que decide si la puerta se activa, una semántica de bloqueo (el agente no continúa sin decisión explícita y registrada) y un punto de guardado de estado durable que sobrevive la espera [4].
- Las puertas de aprobación se sitúan en puntos bien definidos: antes de acciones irreversibles, antes de cruzar umbrales de alcance, y antes de decisiones de baja confianza y alto impacto. Fuera de esos puntos, la puerta añade fricción sin aportar seguridad [3][4].

### Flujo 1: idea → tarea

#### Pasos del flujo

1. **Idea suelta.** El usuario expresa una idea vaga o de alto nivel, o el agente descubre trabajo nuevo durante la ejecución de otra tarea. La idea no tiene alcance, criterios de aceptación ni descomposición.
2. **Descubrimiento del problema.** El agente trabaja con el usuario, de forma interactiva, para identificar qué problema representa la idea y qué oportunidad de mejora supone resolverlo. Se evalúa si el problema es real, si supera las alternativas existentes y qué beneficio aporta. No se propone solución.
3. **Propuesta de forma de solución.** Dado el problema, el agente determina la forma que tomaría la solución dentro del contexto del producto: cambio de UX, cambio de UI, flujo nuevo, paso nuevo en un flujo existente, o fuera de alcance. No entra en detalles de implementación.
4. **Refinamiento.** Con problema y forma de solución conocidos, el agente refina de forma focalizada: investiga (invocando `investigar` cuando aplique) y descompone en tareas con título, objetivo, dependencias, resultado esperado y criterios de calidad. El refinamiento produce una propuesta que incluye los borradores de las tareas.
5. **Puerta humana asíncrona: revisión de la propuesta y los borradores.** El agente presenta la propuesta con los borradores incluidos y se detiene. El usuario revisa cuando puede, en otra sesión. Aprueba, solicita cambios o rechaza. El agente no promociona los borradores a tareas definitivas hasta recibir aprobación.
6. **Promoción a tareas definitivas.** Tras la aprobación, `crear-tareas` promociona los borradores a tareas definitivas en `docs/tasks/` y añade las entradas a `TODO.txt`.

#### Skills existentes que se reutilizan

- `crear-tareas`: cubre el paso 6. Hoy descompone y crea archivos; en el flujo asíncrono, su rol cambia a promocionar borradores aprobados a tareas definitivas y actualizar `TODO.txt`. Necesita modificación para recibir borradores en lugar de descomponer desde cero.
- `investigar`: se reutiliza en el paso 4 cuando el refinamiento requiere investigación focalizada (comparar enfoques, recopilar mejores prácticas, verificar una hipótesis). Produce un documento en `docs/research/` que fundamenta la propuesta.

#### Capacidades nuevas necesarias

El flujo 1 requiere capacidades que no existen hoy. La investigación describe qué resultado debe producir cada capacidad, sin predeterminar cómo se implementan ni cómo se nombran los skills que las cubran:

- **Capacidad de descubrimiento del problema** (paso 2): transforma una idea suelta en un problema formulado con su oportunidad de mejora. Evalúa si el problema es real, si supera alternativas existentes y qué beneficio aporta resolverlo. No propone solución.
- **Capacidad de propuesta de forma de solución** (paso 3): dado el problema, determina la forma que tomaría la solución dentro del contexto del producto, sin entrar en detalles de implementación.
- **Capacidad de refinamiento con borradores** (paso 4): dado el problema y la forma de solución, refina de forma focalizada e incluye los borradores de las tareas como parte de la propuesta. Invoca `investigar` cuando aplique.
- **Capacidad de orquestación del flujo 1**: coordina las transiciones entre las capacidades anteriores y `crear-tareas`, análoga a cómo `ejecutar-tareas` orquesta el flujo 2.

#### Cambios en skills existentes

- **`crear-tareas`**: pasa de descomponer + crear a promocionar borradores aprobados a tareas definitivas. Necesita un mecanismo de borradores (estado o ubicación) que permita trabajo asíncrono: el agente genera los borradores durante el refinamiento, se detiene, y el usuario los revisa en otra sesión.

#### Laguna identificada

Los pasos 2 a 4 —descubrimiento del problema, propuesta de forma de solución y refinamiento con borradores— no están cubiertos por ningún skill existente. `crear-tareas` asume hoy una entrada articulada y produce la descomposición en la misma sesión, lo que hace el flujo síncrono. La definición del proyecto lista explícitamente «Refinamiento de ideas: transformar ideas sueltas en propuestas accionables antes de convertirlas en tareas» como capacidad faltante [5]. Adicionalmente, el mecanismo de borradores para trabajo asíncrono no existe hoy en el sistema.

### Flujo 2: ejecución → commit

#### Pasos del flujo

1. **Lectura del índice.** El agente lee `TODO.txt` e identifica la próxima tarea pendiente `[ ]` no bloqueada. Si hay una tarea en progreso `[~]`, la retoma.
2. **Marca de en progreso.** El agente cambia `[ ]` a `[~]` en `TODO.txt` y en el campo «Estado» del archivo de tarea.
3. **Lectura del archivo de tarea.** El agente lee el archivo referenciado y sigue su objetivo, procedimiento y criterios de calidad.
4. **Ejecución autónoma.** El agente ejecuta el trabajo, invocando otros skills según lo requiera la tarea.
5. **Marca de en revisión.** Al terminar, el agente cambia `[~]` a `[r]` en `TODO.txt` y en el archivo de tarea.
6. **Puerta automática: revisión técnica por subagente.** Se lanza un subagente independiente con contexto aislado (diff y archivo de tarea, sin el razonamiento del ejecutor). Verifica cada criterio de calidad y produce un veredicto: aprueba o solicita cambios.
7. **Corrección si el subagente solicita cambios.** El agente ejecutor corrige y repite desde el paso 5.
8. **Presentación al usuario.** Si el subagente aprueba, el agente presenta el informe de revisión y un resumen del trabajo.
9. **Puerta humana asíncrona: aprobación final.** El usuario aprueba o solicita cambios.
10. **Corrección si el usuario solicita cambios.** El agente ejecutor corrige y repite desde el paso 5.
11. **Marca de completada.** Si el usuario aprueba, el agente cambia `[r]` a `[x]` y registra la revisión en el campo «Revisión» del archivo de tarea.
12. **Commit.** El agente commitea la tarea completada usando el skill `commit`.
13. **Repetición.** El agente vuelve al paso 1 hasta que no quedan tareas pendientes no bloqueadas.

#### Skills existentes que se reutilizan

- `ejecutar-tareas`: orquesta todo el flujo, del paso 1 al 13. Es el skill coordinador que invoca los demás en los puntos que corresponden.
- `investigar`: se invoca en el paso 4 cuando la tarea requiere investigación previa (la tarea 031 es un ejemplo).
- `decisiones-diseno`: se invoca en el paso 4 cuando la ejecución introduce una decisión estructural, o como parte del flujo de revisión si se identifica una decisión implícita que merece quedar registrada.
- `revisar-redaccion` y `pulir-escritura`: se invocan en el paso 4 cuando la tarea produce documentos o textos largos, en modo preventivo antes de presentarlos.
- `crear-tareas`: se invoca en el paso 4 cuando se descubren nuevas tareas durante la ejecución. El flujo es explícito: no se ejecutan dentro de la iteración actual; se dan de alta para procesarse en iteraciones posteriores.
- `commit`: se invoca en el paso 12 para registrar la tarea completada con un commit atómico.

#### Laguna identificada

Según el mapeo realizado, el flujo ejecución → commit está cubierto por los skills existentes. `ejecutar-tareas` orquesta el ciclo y los skills de apoyo cubren los puntos que requieren capacidades específicas. No se identifican skills nuevos faltantes para este flujo.

### Puntos de control asíncronos

Los dos flujos tienen tres puertas de control, dos humanas y una automática, que encajan en el patrón de aprobación asíncrona: el agente avanza lo que puede y se detiene en los puntos que requieren decisión.

- **Flujo 1, puerta 1 (humana asíncrona): revisión de la propuesta y los borradores.** El agente refina la idea, produce la propuesta con los borradores de las tareas incluidos y se detiene. El usuario revisa cuando puede, en otra sesión. Aprueba, pide cambios o rechaza. Precondición: la propuesta con borradores está completa. Semántica de bloqueo: no se promocionan los borradores a tareas definitivas hasta la decisión. Es análoga a la *gate 1* del patrón *idea-to-completion* [1], con la diferencia de que la revisión es asíncrona: el usuario no necesita estar en la sesión cuando el agente termina.
- **Flujo 2, puerta 1 (automática): revisión técnica por subagente.** El agente termina la ejecución y se detiene; un subagente independiente revisa con contexto aislado. Precondición: la ejecución terminó. Semántica de bloqueo: no se presenta al usuario hasta que el subagente aprueba. Es un filtro técnico que no requiere intervención humana y que descarga al usuario de verificar criterios puramente técnicos [6].
- **Flujo 2, puerta 2 (humana asíncrona): aprobación final.** El subagente aprueba; el agente presenta el informe y se detiene. El usuario aprueba o solicita cambios. Precondición: el subagente aprobó. Semántica de bloqueo: no se marca completada ni se commitea hasta la decisión. Es análoga a la *gate 2* del patrón *idea-to-completion* [1].

## Conclusión

Los dos flujos se integran en un ciclo coherente. El flujo 2 está cubierto por los skills existentes; el flujo 1 requiere capacidades nuevas, una orquestación y cambios en `crear-tareas`.

**Flujo 1 (idea → tarea):** se divide en cuatro fases: descubrimiento del problema (idea → problema + oportunidad), propuesta de forma de solución (problema → forma de la solución), refinamiento con borradores (forma de solución → propuesta con borradores de tareas) y promoción a tareas definitivas (borradores aprobados → tareas en `TODO.txt`). Cada fase requiere una capacidad que hoy no existe. Una capacidad de orquestación coordina las transiciones, análoga a `ejecutar-tareas`. La puerta humana es asíncrona: el agente produce la propuesta con los borradores incluidos y se detiene; el usuario revisa en otra sesión. `crear-tareas` cambia de rol: pasa de descomponer + crear a promocionar borradores aprobados, lo que requiere un mecanismo de borradores que hoy no existe.

**Flujo 2 (ejecución → commit):** según el mapeo realizado, está cubierto por los skills existentes. `ejecutar-tareas` orquesta el ciclo e invoca `investigar`, `decisiones-diseno`, `revisar-redaccion`, `pulir-escritura`, `crear-tareas` y `commit` en los puntos que corresponden. Las dos puertas —revisión técnica automática por subagente y aprobación final del usuario— siguen el patrón de aprobación asíncrona con precondición, bloqueo explícito y estado guardado en `TODO.txt` y el archivo de tarea.

**Capacidades nuevas a construir:** descubrimiento del problema, propuesta de forma de solución, refinamiento con borradores y orquestación del flujo 1. La investigación describe los resultados que cada capacidad debe producir, no cómo se implementan ni cómo se nombran los skills que las cubran. Siguiendo el principio *bootstrap* del proyecto, la construcción de cada una se realiza con el propio sistema: registro de la decisión de diseño, creación de la tarea, ejecución con revisión dual y commit [5]. Antes de construirlas, se necesita una investigación del flujo 1 completo que especifique el formato de la propuesta, el mecanismo de borradores, el procedimiento de cada capacidad y los cambios a `crear-tareas`.

**Skills existentes a modificar:** `crear-tareas`, para soportar borradores asíncronos y promocionarlos tras aprobación en lugar de descomponer desde cero.

**Consideraciones de diseño futuras:** la separación de `ejecutar-tareas` en un skill de orquestación de desarrollo se evaluará cuando se construyan los flujos de gestión a nivel de código (branching, PRs), que son hito futuro. Hoy esos flujos no existen y la decisión de separarlo se tomaría sin evidencia.

**Skills no necesarios para estos flujos:** la planeación de épicas y *roadmap*, la gestión a nivel de código y la gestión a nivel de producto pertenecen a flujos posteriores del producto entregable y no se abordan aquí.

## Limitaciones

- El análisis se basa en la documentación interna del proyecto y en fuentes externas publicadas en 2026 sobre patrones de flujo con agentes. Las fuentes externas son de la industria, no académicas con revisión por pares, pero describen prácticas consolidadas en sistemas en producción.
- El diseño de las capacidades del flujo 1 (descubrimiento del problema, propuesta de forma de solución, refinamiento con borradores, orquestación) y los cambios a `crear-tareas` se identifican como necesidades, pero su especificación detallada (formato de la propuesta, mecanismo de borradores, procedimiento de cada capacidad, criterios de calidad, número y nombre de los skills que las cubran) queda fuera del alcance de esta investigación y será objeto de una tarea posterior.
- No se evalúa la integración con flujos futuros (planeación, código, producto); la coherencia entre flujos se validará cuando estos se diseñen.

## Referencias

- [1] wchen02, «Agent Framework: Idea to Completion (Loop + Human-in-the-Loop)» — github.com/wchen02/cursor-agent-learning/blob/main/examples/agent-frameworks/idea-to-completion.md
- [2] rjmurillo, «Ideation Workflow» — github.com/rjmurillo/ai-agents/blob/HEAD/docs/ideation-workflow.md
- [3] Engineering Playbook, «Human-in-the-Loop — Agentic» — engineering-playbook.vercel.app/agentic/human-in-the-loop
- [4] metacto, «AI Approval Workflows: Designing Agent Approval Gates» — metacto.com/blogs/ai-approval-workflows
- [5] Definición del proyecto — `docs/definicion-proyecto.md`
- [6] Investigación previa, «Flujo de revisión de tareas» — `docs/research/flujo-revision-tareas.md`
