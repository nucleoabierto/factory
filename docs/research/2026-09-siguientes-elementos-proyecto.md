# Siguientes elementos del motor externo: candidatos y priorización

> **Fecha:** 2026-09

## Propósito

Investigar qué elementos agregar a Factory para mejorar el proceso de producción y desarrollo de un producto real, usando todo-app como prueba de concepto. La pregunta concreta: ¿qué le falta a todo-app para ser una aplicación de gran tamaño y cómo puede Factory apalancar ese proceso?

## Contexto

En términos de DDD, Factory tiene una frontera clara entre dos dominios:

- **Motor interno:** gestiona el proceso del propio Factory —sus skills, sus tareas, su memoria. Se da por completo: cubre el ciclo de la idea al commit, la documentación de dominio, las decisiones y el aprendizaje por lecciones [1].
- **Motor externo:** gestiona el ciclo de desarrollo del producto objetivo —un proyecto que no es Factory. Corresponde al «producto entregable» de la definición del proyecto; todo-app es la primera instancia.

El PoC sobre todo-app produjo seis correcciones del usuario [2] —consolidadas en cuatro lecciones— y una revisión de arquitectura que generó tareas de reparación [3]. La fricción observada es real pero el volumen es pequeño: todo-app tiene una épica, un dominio y diez tareas. La pregunta es qué necesita el motor externo cuando el producto crece.

**Fuera de alcance de esta investigación:** la gestión de código a nivel externo —GitHub, *pull requests*, revisión de PR, despliegue. Se considera en la definición del proyecto pero no se evalúa aquí.

## Análisis

### Qué le falta a todo-app para ser una aplicación grande

El estado actual de todo-app expone las carencias del motor externo:

- **Sin nivel por encima de la épica:** hay una sola épica y ningún mecanismo para decidir qué sigue —*releases*, *features*, priorización.
- **Mantenimiento reactivo:** la revisión de arquitectura se hizo una vez y generó reparaciones, pero nada vuelve a mirar el código; la entropía se acumula entre revisiones.
- **Oportunidades por casualidad:** las mejoras llegan cuando el usuario las trae o cuando una revisión las encuentra; nadie explora el dominio en busca de trabajo valioso.
- **Calidad sostenida por corrección:** los lineamientos de código (comentarios duraderos, nombres que no presuponen, idioma) se aprendieron por corrección del usuario, no por convención declarada.
- **Gestión de tareas simple:** la gestión se apoya en la disciplina del índice (`TODO.txt`), sin dependencias explícitas ni trabajo paralelo.

### El problema estructural: un solo sumidero de aprendizaje

Las cuatro lecciones del PoC no son homogéneas. Se dividen en dos clases:

- **Lineamientos universales** (verdaderos en cualquier proyecto): `comunicacion-en-codigo` (comentarios duraderos, nombres que no presuponen), `fidelidad-al-plan`.
- **Convenciones del proyecto** (varían por proyecto): `idioma-del-codigo`, `scope-del-subproyecto`.

Hoy todo va a `EXPERIENCIAS.md` → `docs/lessons/` y se recupera léxicamente por disparadores. Un lineamiento universal como lección depende de que el disparador coincida — recuperación frágil para algo que debería aplicarse siempre. Las lecciones son memoria episódica; los skills son conocimiento procedimental: cuando una lección es universal, ya maduró y debería promoverse al skill.

### 1. Absorción de lineamientos en los skills

Mecanismo dual que refleja la distinción anterior:

- **Promoción de lecciones a lineamientos de skill:** `consolidar-lecciones` gana un paso de clasificación —convención del proyecto (se queda en `docs/lessons/`) o lineamiento universal (se promueve al skill que la hubiera prevenido). El lineamiento de comentarios, por ejemplo, iría a `desarrollo` como regla de escritura y a `revisar-implementacion` como criterio de verificación: el mismo conocimiento en los dos puntos del flujo donde aplica, al escribir y al revisar.
- **Convenciones del proyecto declaradas:** un artefacto por proyecto (o consumo de AGENTS.md/README existentes) que `desarrollo` lee al inicio, en lugar de descubrir convenciones por corrección.

Ventajas:
- Ataca directamente las cuatro lecciones del PoC —las seis correcciones que las originaron.
- Conecta el sistema de aprendizaje con los skills de ejecución — la relación que hoy falta.
- Barato: extiende skills existentes.

Desventajas:
- La clasificación universal/proyecto requiere juicio; una mala promoción mete ruido en un skill.
- El artefacto de convenciones solo vale si el proyecto lo mantiene o es detectable.

### 2. Descubrimiento de oportunidades

Una capacidad que examina el estado del producto en busca de trabajo valioso: hallazgos de `revisar-arquitectura` sin tarea asociada, deriva detectada por `documentar-dominio`, patrones repetidos en las lecciones, deuda declarada en el código. La salida no es trabajo ejecutado sino ideas formuladas que entran por el flujo de idea a tarea existente.

La industria converge en «agentes de reducción de entropía»: procesos que escanean el código buscando violaciones de estándares, deriva documental y deuda técnica, y producen trabajo revisable [4][5].

Ventajas:
- Convierte el mantenimiento de reactivo a proactivo; reutiliza artefactos que ya existen (informes de arquitectura, dominios, lecciones).
- Encaja con el flujo existente: las oportunidades entran como ideas, no como un canal paralelo.

Desventajas:
- Riesgo de ruido: una exploración mal calibrada genera ideas de bajo valor que saturan la revisión del usuario.

### 3. Semántica del tipo `mantenimiento`

El tipo `mantenimiento` ya existe en el enrutado de tareas —`crear-tareas` y `refinar-propuesta` lo declaran en la lista abierta de tipos— y el PoC lo usó para trabajos de proceso (006, 007). La carencia real es de semántica: las reparaciones de código 008–010, cuyo criterio de aceptación es que *el comportamiento observable no cambia*, se clasificaron como `desarrollo` pese a que el tipo existía. La opción no es crear el tipo sino definirlo: qué criterios de calidad y qué sub-flujo le corresponden. La industria practica *refactoring* continuo con *commits* pequeños verificados por *tests*, como un «conserje supervisado» [5][6], y la literatura académica explora marcos multiagente para refactorización automática [10].

Ventajas:
- Da criterio propio al trabajo que el PoC ya produjo (008, 009, 010 fueron reparaciones, no *features*).
- Complementa el descubrimiento de oportunidades: una cosa es encontrar deuda y otra ejecutarla bien.
- Cambio acotado: definir la semántica de un tipo existente, no crear uno nuevo.

Desventajas:
- Si la única diferencia práctica con `desarrollo` es el criterio de aceptación, la distinción puede resultar más declarativa que operativa.

### 4. Planeación de *roadmap* y *releases*

El nivel por encima de la épica: *features* agrupadas en *releases*, priorización visible, trazabilidad visión ↔ ejecución. La industria está produciendo patrones concretos: *roadmaps* en el repositorio como fuente única con *briefs* por tarea [7], *backlogs* git-native compartidos entre humanos y agentes con jerarquía iniciativa → épica → *feature* [8], y adaptaciones de Scrum para agentes [9].

Ventajas:
- Es exactamente lo que le falta a todo-app para crecer: hoy no hay forma de decidir qué sigue después de la épica actual.
- Patrones externos emergentes y consistentes (*roadmap* en el repo, contexto por tarea).

Desventajas:
- Sin fricción observada todavía: con una sola épica, el vacío no ha dolido; hay riesgo de construir antes de necesitarlo.

### 5. Gestión de tareas a escala

Extender la gestión actual: dependencias explícitas entre tareas (hoy solo «bloqueada»), trabajo paralelo sin colisiones, refinamiento continuo del *backlog*.

Ventajas:
- Necesaria si el volumen crece; el formato de TODO.txt ya anticipa bloqueos.

Desventajas:
- Prematura: el PoC no alcanzó el volumen donde el índice actual genere fricción. La industria la resuelve con herramientas pesadas —tableros compartidos, grafos de dependencias, registros de zonas de trabajo— ajenas a la simplicidad de Factory [7][8].

## Evaluación comparativa

### Evidencia interna (fricción real en el PoC)

- **Lineamientos (1):** alta — las cuatro lecciones del PoC apuntan a esta carencia.
- **Mantenimiento (3):** media — tres de diez tareas fueron reparación de código clasificadas como `desarrollo` pese a existir el tipo `mantenimiento`.
- **Descubrimiento (2):** media — las reparaciones llegaron por una revisión puntual, no por un proceso.
- **Roadmap (4):** baja hoy, pero es la carencia que define el crecimiento futuro.
- **Gestión a escala (5):** ninguna.

### Evidencia externa (práctica consolidada)

- **Descubrimiento (2) y mantenimiento (3):** alta — agentes de entropía y *refactoring* continuo son patrones documentados.
- **Roadmap (4):** media-alta — hay productos y *toolkits* dedicados a *roadmaps* para agentes.
- **Lineamientos (1):** media — cubierta parcialmente por archivos de contexto; la promoción de lecciones es extensión propia.
- **Gestión a escala (5):** media — resuelta con herramientas ajenas a la filosofía de Factory.

### Coherencia con la trayectoria de Factory

- **Lineamientos (1)** encaja: extiende el sistema de aprendizaje y mejora el motor externo sin tocar el interno.
- **Descubrimiento (2) y mantenimiento (3)** encajan: reutilizan artefactos existentes y el flujo de idea a tarea.
- **Roadmap (4)** encaja con la visión declarada; es el siguiente nivel del ciclo.
- **Gestión a escala (5)** tensiona la simplicidad del sistema sin evidencia de necesidad.

## Recomendación

**Prioridad 1 — Absorción de lineamientos en los skills.** Fricción más evidenciada, costo bajo, efecto transversal sobre todo el desarrollo futuro. Incluye la promoción de lecciones universales (con `consolidar-lecciones` clasificando) y el artefacto de convenciones por proyecto.

**Prioridad 2 — Descubrimiento de oportunidades + semántica del tipo `mantenimiento`.** Juntas convierten el mantenimiento en un ciclo: encontrar deuda y ejecutarla con criterios propios. Son la pieza que hace del desarrollo un proceso continuo y no solo reactivo, y reutilizan los artefactos que el sistema ya produce.

**Prioridad 3 — *Roadmap* y *releases*.** Es lo que define el salto de todo-app a producto grande y hay patrones externos para inspirarse (*roadmap* en el repo). Conviene cuando el PoC supere su primera épica.

**Descartado por ahora:** gestión de tareas a escala — sin fricción observada y resoluble cuando el volumen lo exija.

El orden de las prioridades no es solo por evidencia: forma un arco. Primero se mejora la calidad de cada ejecución individual (lineamientos); después el ciclo se vuelve continuo y proactivo (descubrimiento + mantenimiento); por último se gana el nivel de dirección que decide hacia dónde crece el producto (*roadmap*). Invertirlo —empezar por el *roadmap*— pondría dirección sobre una ejecución que todavía genera fricción, y descubrimiento sin lineamientos generaría trabajo que repetiría los errores ya corregidos.

## Limitaciones

- La evidencia interna procede de un solo PoC pequeño; las carencias «de escala» son inferencias, no fricciones observadas.
- La clasificación de lecciones en universales frente a específicas del proyecto es una distinción propia, no un patrón de la industria.
- Las fuentes de *roadmap* y agentes de entropía son en parte productos comerciales; su evidencia es de práctica, no de resultado medido.
- Se excluyó deliberadamente la gestión de código externa (GitHub, PRs, despliegue), aunque la industria la considera parte del ciclo.

## Referencias

- [1] docs/definicion-proyecto.md, docs/vision-proyecto.md — repositorio propio
- [2] todo-app/EXPERIENCIAS.md, todo-app/docs/lessons/ — evidencia del PoC
- [3] todo-app/docs/architecture-reviews/001 — informe de revisión de arquitectura del PoC
- [4] Encyclopedia of Agentic Patterns, «Entropy Reduction Agents» — agentpatterns.ai/workflows/entropy-reduction-agents/
- [5] «A Framework for Continuous Refactoring With AI Agents» — telemetryagent.dev/articles/continuous-refactoring
- [6] bigH/continuous-refactoring — github.com/bigH/continuous-refactoring
- [7] specy-road — github.com/shanevigil/specy-road
- [8] Specboards — specboards.ai
- [9] agentic-scrum — github.com/atusy/agentic-scrum
- [10] RefAgent: A Multi-agent LLM-based Framework for Automatic Software Refactoring (IEEE/ACM ICSE 2026) — dl.acm.org/doi/10.1145/3744916.3773153
