# Separación de ejecutar-tareas: orquestación de desarrollo

> **Fecha:** 2026-09

## Propósito

Investigar si conviene separar `ejecutar-tareas` en un skill de orquestación de desarrollo con vocabulario y pasos específicos del dominio de código, o si basta con que `ejecutar-tareas` invoque skills de desarrollo en el paso 4, y proponer una recomendación entre separar, extender o mantener.

## Contexto

`ejecutar-tareas` orquesta hoy el flujo de ejecución → commit: lee `TODO.txt`, toma la próxima tarea pendiente, la ejecuta, la somete a revisión dual (subagente + usuario) y commitea [15]. Es un ciclo genérico de tareas: no contiene pasos ni vocabulario del dominio de código (branching, *worktrees*, *pull requests*, verificación de CI, revisión de código, *merge*).

La definición del proyecto lista explícitamente «Gestión a nivel de código: *branching*, *pull requests*, revisión de código» como capacidad faltante que pertenece a un hito futuro del producto entregable [12]. La investigación previa de flujos concluyó que el flujo ejecución → commit está cubierto por los skills existentes y aplazó la evaluación de la separación hasta que existan los flujos de código, «porque hoy esos flujos no existen y la decisión de separarlo se tomaría sin evidencia» [13]. La investigación del flujo 1 completo reitera el mismo aplazamiento [14].

La pregunta es si, a la luz de precedentes externos, conviene anticipar la separación, extender el skill actual o mantenerlo e invocar skills de desarrollo en el paso 4.

## Análisis

### Pasos del dominio de desarrollo que `ejecutar-tareas` no cubre hoy

El procedimiento actual de `ejecutar-tareas` no incluye ninguno de los pasos que la literatura de orquestadores de entrega de código identifica como específicos del dominio [4][5][6][7][8][9][10]:

- **Aislamiento en *worktree* o rama.** Cada tarea de código se ejecuta en un *git worktree* o rama independiente, no en la copia de trabajo principal [4][8][9].
- **Creación de *pull request*.** El cambio se entrega como PR, no como commit directo a la rama principal [4][5][6][8].
- **Verificación contra CI y tests.** Los comandos de test y build se ejecutan en el *worktree* antes de abrir el PR [4][7][10].
- **Revisión de código independiente.** Un revisor distinto al implementador examina el diff, con acceso solo al cambio, no al resumen del implementador [4][6].
- **Puerta de *merge* humana.** El PR no se mergea automáticamente; un humano decide [4][5][6][8].
- **Resolución de conflictos y *rebase*.** Si el PR no se puede rebasar limpiamente, se desvía por un estado de resolución de conflictos antes de volver a validación [5].
- **Máquina de estados del dominio.** Estados como `implementing`, `validating`, `fixing`, `in_review`, `resolving_conflict`, `done` [5][6][10], distintos de los estados de tarea (`[ ]`, `[~]`, `[r]`, `[x]`, `[!]`) que maneja `ejecutar-tareas` hoy [15].

`ejecutar-tareas` cubre un subconjunto: ejecución autónoma, revisión por subagente y commit. No cubre aislamiento, PR, verificación de CI, revisión de código, *merge* ni resolución de conflictos.

### Si la lógica de orquestación es realmente distinta

La evidencia externa indica que la orquestación de entrega de código es estructuralmente distinta de un ciclo genérico de tareas. Los orquestadores de entrega de código comparten un *pipeline* de fases —planificar → aislar → implementar → revisar → verificar → PR → *merge*— con una máquina de estados propia y puertas humanas en los límites de fase [4][5][6][7][8][9][10]. Este *pipeline* no es una simple invocación de skills dentro de un paso de ejecución: introduce pasos nuevos (aislamiento, PR, verificación, *merge*), estados nuevos y transiciones condicionales (conflictos, fallos de CI) que un ciclo genérico no prevé.

El patrón *orchestrator-and-specialists* describe un orquestador que coordina especialistas en paralelo, donde el orquestador mantiene el alcance y las decisiones mientras delega el trabajo acotado [1]. La guía de mejores prácticas de skills distingue los *orchestration skills*, cuyo `SKILL.md` contiene «orquestación, enrutado y flujo de control», frente a los skills especialistas que contienen el conocimiento del dominio [2]. Esto sugiere que la orquestación es una capa distinta, pero no determina si debe haber un orquestador por dominio o uno genérico que enrute a especialistas.

### Vocabulario y pasos de un skill de orquestación de desarrollo

A partir de los orquestadores de entrega de código analizados, un skill de orquestación de desarrollo tendría:

- **Vocabulario:** rama, *worktree*, *pull request*, CI, tests, build, diff, revisión de código, *merge*, *rebase*, conflicto.
- **Pasos:**
  1. Crear rama y *worktree* aislados para la tarea [4][8][9].
  2. Ejecutar la implementación en el *worktree*, invocando skills de desarrollo [7][10].
  3. Ejecutar verificación: tests, build y lint en el *worktree* [4][7][10].
  4. Revisión de código independiente sobre el diff, sin acceso al resumen del implementador [4][6].
  5. Si la revisión o la verificación fallan, corregir y repetir desde el paso 3 [4][7].
  6. Crear *pull request* con el diff y el informe de revisión [4][5][6].
  7. Puerta humana de *merge*: el usuario aprueba o solicita cambios [4][5][6][8].
  8. Si hay conflictos de *rebase*, resolver y volver a verificar [5].
  9. Tras el *merge*, marcar la tarea como completada y commitear el estado [11].

### Precedentes en la industria de orquestadores separados por dominio

El precedente es consistente: todos los sistemas de entrega de código analizados usan un orquestador dedicado al dominio de código, no un orquestador genérico de tareas que invoque skills de código [4][5][6][8][9][10]. Ninguno reutiliza un ciclo genérico de tareas para orquestar la entrega de PRs. La separación es la norma, no la excepción, en el dominio de entrega de código.

Sin embargo, estos son sistemas autónomos, no skills dentro de un ecosistema de skills como Factory. El análogo más cercano al modelo de Factory es el patrón de *orchestration skills* que enrutan a especialistas [2][3], donde un único orquestador puede delegar en skills de dominio. La evidencia no muestra un caso de un ecosistema de skills que separe orquestadores por dominio; muestra sistemas autónomos que son, ellos mismos, orquestadores de un solo dominio.

### Opción 1: Separar

Crear un skill de orquestación de desarrollo distinto de `ejecutar-tareas`, con el *pipeline* y el vocabulario del dominio de código. `ejecutar-tareas` se mantiene como ciclo genérico de tareas.

**Ventajas:**

- Separación clara de responsabilidades: cada orquestador tiene su dominio y su vocabulario.
- Sigue el precedente de la industria, donde la entrega de código tiene un *pipeline* propio [4][5][6][8][9][10].
- Respeta el criterio de mantenibilidad del proyecto (skills autocontenidos, cuerpo por debajo de 500 líneas) [12] y el principio de división progresiva de D003 [16].

**Desventajas:**

- Duplicación del núcleo común: lectura de `TODO.txt`, marcas de estado, revisión dual y commit aparecen en ambos orquestadores.
- Prematura sin flujos de código: diseñar el *pipeline* sin requisitos concretos produce un diseño especulativo [13][14].
- Dos orquestadores que mantener y sincronizar.

### Opción 2: Extender

Añadir a `ejecutar-tareas` los pasos del dominio de código de forma condicional, según el tipo de tarea.

**Ventajas:**

- Un solo orquestador: sin duplicación del núcleo común.
- Reutiliza el flujo de revisión dual y commit ya existente.

**Desventajas:**

- `ejecutar-tareas` mezcla lógica genérica de tareas con lógica específica de código, aumentando su complejidad y reduciendo la claridad de la división por dominio.
- Bifurcaciones condicionales según el dominio de la tarea, que dificultan el razonamiento sobre el flujo.
- Anticipa pasos (aislamiento, PR, *merge*) sin que los flujos de código existan, con el mismo problema de diseño especulativo que la opción 1.

### Opción 3: Mantener

Conservar `ejecutar-tareas` tal cual, invocando skills de desarrollo en el paso 4 cuando la tarea los requiera. No añadir pasos del dominio de código.

**Ventajas:**

- La opción más simple y coherente con el principio *bootstrap* del proyecto, según el cual cada nueva capacidad se construye usando el propio sistema [12]; aplicado aquí, construir la orquestación de código cuando los flujos de código existan, no antes.
- No duplica ni complica el skill actual.
- Coherente con el aplazamiento explícito de las investigaciones previas [13][14].

**Desventajas:**

- Cuando los flujos de código existan, el paso 4 puede quedar sobrecargado si la orquestación de entrega de código requiere pasos y estados propios.
- No captura la máquina de estados del dominio de código, que la evidencia muestra estructuralmente distinta [4][5][6][10].

## Evaluación comparativa

### Evidencia disponible hoy

- **Opción 1 (separar):** baja. Los flujos de código no existen; el diseño se basa en anticipación, no en requisitos [13][14].
- **Opción 2 (extender):** baja, con el agravante de complicar el skill actual.
- **Opción 3 (mantener):** alta. El flujo actual está cubierto y la opción no compromete decisiones futuras.

### Coste de revertir

- **Opción 1:** alto. Un skill nuevo con su *pipeline* es costoso de construir y de revertir si los requisitos reales difieren.
- **Opción 2:** medio. Los cambios a `ejecutar-tareas` se pueden deshacer, pero ensucian el skill mientras tanto.
- **Opción 3:** nulo. No introduce cambios.

### Coherencia con el principio *bootstrap*

- **Opción 1:** baja. Diseña antes de tener evidencia.
- **Opción 2:** baja. Igual que la opción 1, sobre un skill existente.
- **Opción 3:** alta. Construir cuando haya evidencia [12].

### Riesgo de bloquear la decisión futura

- **Opción 1:** medio. Un skill separado temprano puede fijar un diseño que luego no encaje.
- **Opción 2:** medio. Los cambios condicionales pueden arraigar.
- **Opción 3:** nulo. Mantener no compromete la decisión de separar o extender cuando lleguen los flujos de código.

## Recomendación

**Mantener `ejecutar-tareas` tal cual y posponer la decisión hasta que existan los flujos de gestión a nivel de código.**

La evidencia externa muestra que la orquestación de entrega de código es estructuralmente distinta de un ciclo genérico de tareas —*pipeline* de fases, máquina de estados propia, pasos de aislamiento, PR, verificación y *merge* que `ejecutar-tareas` no cubre hoy [4][5][6][7][8][9][10]—, por lo que es razonable anticipar que, cuando los flujos de código existan, la separación o la extensión serán necesarias. Pero diseñar el *pipeline* ahora, sin requisitos concretos, produce un diseño especulativo que contradice el principio *bootstrap* del proyecto [12] y el aplazamiento explícito de las investigaciones previas [13][14].

Mantener no compromete la decisión futura: cuando se construyan los flujos de código, la evidencia será concreta y la elección entre separar (opción 1) y extender (opción 2) podrá tomarse con requisitos reales. El coste de revertir de mantener es nulo, y el de las otras dos opciones hoy es medio o alto sin contrapartida.

La decisión aplazada encaja en la visión de flujo asíncrono del proyecto: los orquestadores de entrega de código sitúan puertas humanas de *merge* que siguen el mismo patrón de aprobación asíncrona que las puertas del flujo 1 y del flujo 2 actuales [13]. Cuando los flujos de código existan, la orquestación heredará ese patrón, no lo inventará.

La señal para reabrir la decisión es la construcción efectiva de los flujos de gestión a nivel de código (*branching*, *pull requests*, revisión de código), que la definición del proyecto sitúa en un hito futuro [12].

## Limitaciones

- Los orquestadores de entrega de código analizados son sistemas autónomos, no skills dentro de un ecosistema de skills como Factory. La evidencia de separación por dominio es fuerte en sistemas autónomos, pero no hay un caso directo de un ecosistema de skills que separe orquestadores por dominio.
- Los flujos de gestión a nivel de código no existen en el proyecto, por lo que el análisis de qué pasos y vocabulario tendría un skill de orquestación de desarrollo se basa en precedentes externos y en anticipación, no en requisitos internos.
- No se evalúa la integración con los flujos futuros de planeación de épicas ni de gestión de producto; la coherencia entre flujos se validará cuando estos se diseñen.

## Referencias

- [1] Cheesecakelabs, «Skills, Subagents, and the Orchestrator Pattern: The Layer Most Teams Confuse» — cheesecakelabs.com/blog/skills-and-subagents/
- [2] nyosegawa, «agent-skill-best-practices.md» — github.com/nyosegawa/skills/blob/main/agent-skill-best-practices.md
- [3] oaustegard, «orchestrating-skills/SKILL.md» — github.com/oaustegard/claude-skills/blob/main/orchestrating-skills/SKILL.md
- [4] noktohq, «nokto-agent-orchestrator» — github.com/noktohq/nokto-agent-orchestrator
- [5] geserdugarov, «agent-orchestrator» — github.com/geserdugarov/agent-orchestrator
- [6] jwbron, «egg» — github.com/jwbron/egg
- [7] Horizon, «Autonomous Dev Loops: From PRD to Pull Request» — usehorizon.ai/engineering-resources/building-autonomous-development-loops
- [8] AgentWrapper, «agent-orchestrator» — github.com/AgentWrapper/agent-orchestrator
- [9] dimileeh, «agent-workspace-fabric» — github.com/dimileeh/agent-workspace-fabric
- [10] tzone85, «px-dispatch (project-x)» — github.com/tzone85/project-x
- [11] jasonjgarcia24, «agent-pr-flow» — github.com/jasonjgarcia24/agent-pr-flow
- [12] Definición del proyecto — `docs/definicion-proyecto.md`
- [13] Investigación previa, «Flujos de idea a tarea y de ejecución de tarea» — `docs/research/2026-09-flujos-idea-tarea-ejecucion.md`
- [14] Investigación previa, «Flujo 1 completo: propuesta, borradores y procedimiento» — `docs/research/2026-09-flujo-1-propuesta-borradores.md`
- [15] Skill `ejecutar-tareas` — `.agents/skills/ejecutar-tareas/SKILL.md`
- [16] D003, «Skills como unidades autocontenidas, no reglas sueltas» — `docs/decisions/D003-skills-como-unidades-autocontenidas.md`
