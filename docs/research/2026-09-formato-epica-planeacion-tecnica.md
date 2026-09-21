# La épica como artefacto de planeación y el plan técnico de conjunto

> **Fecha:** 2026-09

## Propósito

Determinar qué debe contener la épica como artefacto de planeación y en qué punto del flujo se produce el plan técnico de conjunto, para fundamentar la decisión de diseño que fijará ambos.

## Contexto

La propuesta `docs/proposals/001-planeacion-epicas/propuesta.md` introduce la épica como un documento propio que declara el objetivo del conjunto, su alcance, sus piezas y el plan técnico, y la refleja en `TODO.txt` como la agrupación del conjunto. Hoy los hitos del índice son etiquetas sin contenido (D008) y las decisiones transversales se resuelven de forma improvisada durante la ejecución. La investigación previa `docs/research/2026-09-flujos-idea-tarea-ejecucion.md` excluyó esta materia por alcance; este documento cubre ese vacío.

## Análisis

### Qué campos suele tener una épica

En Jira, una épica es un cuerpo de trabajo grande que se descompone en historias o tareas menores; sus campos mínimos son un nombre identificador, un resumen y la lista de elementos asociados [1]. Atlassian recomienda definir un criterio de cierre explícito («definition of done») y advierte de que el alcance de una épica es flexible: las historias se añaden o quitan a medida que el equipo aprende [2][3]. Las épicas pueden abarcar varios proyectos o tableros, es decir, no están atadas a una única unidad de origen [1][2].

En SAFe, la épica tiene un formato más rico orientado a la decisión de inversión: descripción, hipótesis de resultado de negocio con estructura «si hacemos X, esperamos Y para Z, medido por W», indicadores adelantados, producto mínimo viable y un responsable (*epic owner*) [4][5]. Este formato es más pesado de lo que necesita un sistema gestionado por un agente, pero dos de sus ideas trasladan bien: el objetivo formulado como hipótesis verificable y la delimitación explícita del mínimo que valida la épica.

Para un sistema gestionado por un agente, los campos que aplican son: objetivo explícito y verificable, alcance (dentro y fuera), piezas que componen el conjunto (tareas existentes o por crear), plan técnico y criterio de cierre. Las estimaciones de esfuerzo y el seguimiento de avance quedan fuera, en coherencia con el «Fuera de alcance» de la propuesta.

### Cómo se produce un plan técnico de conjunto

El plan técnico de conjunto responde a la pregunta «en qué orden se construye y con qué decisiones compartidas» [6]. Las fuentes coinciden en tres contenidos:

- **Orden de implementación por dependencias.** El orden se deriva de un grafo de dependencias entre piezas, no de la lista de deseos: las piezas fundacionales primero, y las que pueden avanzar en paralelo se identifican explícitamente [7][8]. En el método BMad, las épicas se ordenan por dependencia y valor, con las fundacionales primero, y dentro de cada épica las historias se cortan por costuras naturales [11]. En el flujo pi-epicflow, la descomposición se materializa en un grafo acíclico de *features* con dependencias, alcance de archivos y criterios de aceptación, que el humano aprueba antes de ejecutar [7].
- **Decisiones transversales antes de la ejecución.** El desarrollo guiado por especificación (SDD) fija arquitectura, contratos y *trade-offs* antes de descomponer o ejecutar, precisamente para evitar que cada pieza resuelva por su cuenta lo que debe ser común [6][9].
- **Criterios de aceptación por pieza.** Cada unidad del plan lleva sus propios criterios de aceptación; el plan del conjunto fija solo lo transversal [7][9].

### Opciones para situar el paso de planeación

#### 1. Antes de la descomposición

El plan técnico precede a las tareas: primero se decide el cómo del conjunto y luego se descompone en piezas que ya nacen coherentes con esa decisión [6][9].

**Ventajas:**
- Las decisiones transversales se toman cuando son más baratas, antes de que exista trabajo que rehacer [6][9].
- La descomposición produce piezas alineadas desde el origen; el orden de implementación queda explícito en la propia descomposición [7][8].

**Desventajas:**
- Exige conocer el conjunto completo antes de crear ninguna tarea; no encaja con tareas que nacen sueltas ni con propuestas independientes que solo después resultan relacionadas [3].
- En el flujo actual de Factory, la descomposición la realiza `refinar-propuesta` por propuesta, sin visión de conjunto: planear antes exigiría cambiar el orden del flujo existente.

#### 2. Después de la promoción, antes de la ejecución

El plan técnico se produce una vez que el trabajo ya está descompuesto en tareas y antes de que se ejecuten: es el eslabón entre «tareas creadas» y «tareas en ejecución» que describe la propuesta. En pi-epicflow, el contrato de descomposición se aprueba explícitamente antes de empezar cualquier *feature* [7]; en SDD aplicado a Scrum, la especificación detallada se escribe cuando el trabajo se va a ejecutar, no en el refinamiento, porque nadie tiene suficiente contexto antes [8].

**Ventajas:**
- El plan se escribe con información real: las piezas ya existen y sus dependencias son observables [7][8].
- No modifica el flujo de idea a tarea: se añade un paso posterior, no se reordena el existente.
- Cubre de forma natural la planeación retroactiva (ver siguiente apartado).

**Desventajas:**
- Si la descomposición ya fijó decisiones transversales pieza a pieza, el plan posterior llega tarde y puede tener que corregirlas [9].
- Añade un punto de revisión más al ciclo asíncrono.

#### 3. Bajo demanda, en cualquier momento

La épica se crea cuando alguien detecta que un conjunto de trabajo necesita objetivo y dirección comunes, sin un lugar fijo en el flujo. Atlassian recomienda crear una épica cuando se detecta un patrón entre varias historias y se quieren agrupar [3]; Jira permite crear la épica y asociarle elementos ya existentes [1]. El SDD en Kanban lo refleja como una etapa visible más del tablero, no como un paso obligatorio previo [8].

**Ventajas:**
- Máxima flexibilidad: cubre tanto el conjunto planeado como el emergente [3].
- No impone coste cuando el trabajo no lo necesita; la especificación tiene un retorno variable y hay casos donde conviene omitirla [10].

**Desventajas:**
- Sin un punto fijo, la planeación puede no ocurrir nunca: el problema que motiva la propuesta es precisamente que hoy no existe ese momento.
- Dificulta decidir quién y cuándo la invoca; deja la disciplina al juicio del operador.

### La épica frente a propuestas, tareas e hitos

La épica es ortogonal a la propuesta: la propuesta registra la decisión de construir una idea; la épica planea cómo se construye un conjunto, cualquiera que sea su origen. Como las épicas de Jira pueden abarcar varios proyectos [1][2], una épica de Factory puede agrupar tareas nacidas de varias propuestas o de ninguna.

Frente a los hitos de `TODO.txt`, la épica aporta el contenido que el encabezado no puede contener (D008): el índice sigue siendo el punto de entrada de la ejecución y la épica es el documento que da el porqué y el cómo. En la práctica, una épica se refleja en el índice como su agrupación visible, del mismo modo que hoy lo hace un hito.

La planeación retroactiva —agrupar tareas ya creadas— es el caso donde la épica nace sin intención previa: se crea el documento, se declaran objetivo y plan, y las tareas existentes se asocian al conjunto, igual que en Jira se añaden *issues* existentes a una épica nueva [1][3].

## Evaluación comparativa

- **Corrección de decisiones transversales a bajo coste:** la opción 1 es la mejor, porque decide antes de crear trabajo; la opción 2 llega después de la descomposición pero antes de la ejecución, cuando corregir todavía es barato; la opción 3 no garantiza que el momento llegue.
- **Información disponible al planear:** la opción 1 planea sobre una intención; las opciones 2 y 3 planean sobre piezas reales con dependencias observables [7][8].
- **Compatibilidad con el flujo existente:** la opción 1 obliga a reordenar `refinar-propuesta`/`crear-tareas`; las opciones 2 y 3 se añaden sin tocar el flujo.
- **Cobertura de la planeación retroactiva:** la opción 1 no la cubre; la opción 2 la cubre si el paso puede invocarse sobre tareas ya creadas; la opción 3 la cubre por definición.

## Recomendación

**Situar el paso de planeación después de la promoción de las tareas y antes de su ejecución, invocable también bajo demanda sobre conjuntos ya creados.**

Combina las ventajas de las opciones 2 y 3 sin pagar el coste de la 1:

- El plan se produce con información real (piezas ya descompuestas), como hace pi-epicflow con su descomposición aprobada antes de ejecutar [7].
- Sigue existiendo un momento definido —antes de ejecutar— que resuelve el problema estructural de la propuesta, a diferencia de la opción 3 pura.
- Al ser invocable sobre tareas existentes, cubre la planeación retroactiva que la opción 1 no alcanza [1][3].
- No reordena el flujo de idea a tarea: la épica se produce a partir de una intención y del trabajo ya descompuesto, tal como formula la propuesta.

La mitigación de su desventaja principal —decisiones transversales fijadas pieza a pieza— es el propio plan de la épica: al revisarlo antes de ejecutar, las inconsistencias entre piezas se detectan y se corrigen cuando rehacer aún es barato [7][9].

## Formato propuesto

Campos de la épica como artefacto, sintetizados del análisis:

1. **Objetivo:** el resultado del conjunto formulado de forma verificable (adaptación de la hipótesis de SAFe [4][5]).
2. **Alcance:** qué contiene y qué queda fuera; alcance declarado flexible, como en Jira [2].
3. **Piezas:** lista de las tareas del conjunto, existentes o por crear, con referencia a sus archivos.
4. **Plan técnico:** orden de implementación derivado de dependencias, dependencias técnicas entre piezas y decisiones transversales ya tomadas [7][8][9].
5. **Criterio de cierre:** la condición bajo la que el conjunto se considera completo (equivalente a la «definition of done» de la épica [3]).
6. **Estado y reflejo en el índice:** la épica aparece en `TODO.txt` como la agrupación del conjunto, siguiendo la convención de hitos de D008.

## Limitaciones

- Las fuentes externas son documentación de producto (Atlassian, SAFe) y literatura práctica de la industria, no literatura revisada por pares; las prácticas de agentes (pi-epicflow, BMad) provienen de proyectos concretos y pueden no generalizar.
- SAFe opera a escala de portafolio empresarial; solo se trasladan sus ideas estructurales, no su proceso.
- No se encontró literatura específica sobre épicas en sistemas de gestión de tareas ejecutados por agentes con revisión asíncrona; la adaptación al contexto de Factory es una inferencia del agente a partir de las restricciones internas (índice único en `TODO.txt`, propuesta como unidad de revisión, ciclo asíncrono).
- El formato propuesto es una recomendación previa a la decisión de diseño; puede quedar ajustado por la decisión (tarea 056).

## Referencias

- [1] Atlassian, «What is an epic?» — support.atlassian.com/jira-software-cloud/docs/what-is-an-epic/
- [2] Atlassian, «Epics» — atlassian.com/agile/project-management/epics
- [3] Atlassian, «Learn to use epics in Jira» — atlassian.com/agile/tutorials/epics
- [4] Scaled Agile, «Epic» — framework.scaledagile.com/epic
- [5] Cprime, «Epic Hypothesis Statement» — cprime.com/blog/develop-a-winning-epic-hypothesis-statement-that-captivates-stakeholders/
- [6] Sayeed Joy, «How to Ship Production-Grade Applications with Spec-Driven Development» — sayeedjoy.com/blog/spec-driven-development
- [7] pi-epicflow, «Design» — cdn.jsdelivr.net/npm/pi-epicflow@0.14.2/docs/design.md
- [8] 8080.ai, «Spec-Driven Development in Scrum & Kanban» — 8080ai.hashnode.dev/spec-driven-development-scrum-kanban-agile-teams
- [9] Zencoder, «Spec-Driven Development for Tech Companies» — zencoder.ai/blog/spec-driven-development-for-technology-companies
- [10] Cadence, «How to write a technical specification that engineers actually follow» — cadence.withremote.ai/blog/technical-specification-document
- [11] BMad, «Epics and Stories — sharding» — github.com/aj-geddes/claude-code-bmad-skills (bmad-epics-and-stories/REFERENCE.md)

Fuentes internas: `docs/proposals/001-planeacion-epicas/propuesta.md`, `docs/decisions/D008-organizacion-por-hitos-en-todo.md`, `docs/definicion-proyecto.md`, `docs/research/2026-09-flujos-idea-tarea-ejecucion.md`.
