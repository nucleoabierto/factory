# Sistema de aprendizaje por experiencias para agentes

> **Fecha:** 2026-09

## Propósito

Investigar cómo registrar las divergencias entre el comportamiento de los agentes y las expectativas del usuario, cómo estructurarlas como lecciones recuperables y cómo integrarlas como referencia en la resolución de tareas futuras del proyecto.

## Contexto

El proyecto quiere un sistema de aprendizaje en dos fases. En la primera, al terminar cada tarea, un skill registra en `EXPERIENCIAS.md` las acciones que el usuario corrigió, con la brecha entre el resultado esperado y el obtenido. En la segunda, en una sesión independiente, las experiencias acumuladas se agrupan por temas y se consolidan en notas individuales de lecciones aprendidas.

Quedan por decidir: el formato del registro, la estructura de descubrimiento de las lecciones (el usuario sugirió un árbol binario de decisiones y preguntó por árboles fuzzy), la ubicación de las notas, la forma de la consolidación (skill nuevo o no) y el punto del ciclo de tareas donde se consultan las lecciones.

## Análisis

### Registro de cada experiencia

Tres enfoques documentados sobre qué y cómo registrar.

**Reflexión verbal (Reflexion).** El patrón Reflexion almacena en una memoria episódica una lección en lenguaje natural tras cada intento fallido: qué acción falló, por qué y qué hacer la próxima vez [1]. La implementación de referencia descarta deliberadamente guardar tuplas estructuradas del tipo `(fallo → corrección)`: el siguiente lector de la lección también es un LLM, y los LLM razonan mejor sobre lenguaje natural que sobre deltas estructurados; el esquema de reflexión exige dos campos, causa raíz y corrección [2].

**Libro de correcciones (AgentRecall-X).** Sistema de memoria persistente para agentes centrado en correcciones: cada corrección del usuario se guarda como registro estructurado con severidad, evidencia y seguimiento del resultado (si la corrección fue atendida o si el error recayó) [4]. Su ciclo de vida define tres momentos: carga de contexto al inicio de sesión, registro de la corrección cuando ocurre y consolidación al cierre de sesión [4].

**Lección de una frase con disparador (Recall/agentsmesh).** Sistema en producción que acumuló 542 lecciones en tres meses: cada lección es una frase imperativa, un tema y un disparador (un patrón de archivo, de comando o una palabra clave) [3]. La lección aparece en el contexto del agente justo antes de la acción donde aplica, no al inicio de la sesión [3].

**Log inmutable con árbol de fusión (OptMem).** OptMem separa la memoria en dos capas: un log append-only de notas de una línea (la evidencia, que nunca se edita) y un árbol binario de fusiones sobre ese log (la capa derivada, una caché reconstruible desde el log) [11]. La destilación es geométrica y no por política: cada bloque que vence se comprime en una línea, y la compresión la escribe el propio agente en su turno, sin procesos en segundo plano [11]. La recuperación distingue dos modos: `wake` imprime una portada del árbol ajustada a un presupuesto de líneas (orientación al inicio de sesión: lo reciente verbatim, lo antiguo comprimido) y `recall` busca por expresión regular sobre el log completo (consulta puntual) [11]. Sin embeddings ni índices: la posición del registro es su identidad y cada lectura es un acceso directo [11]. Si todo cabe en el presupuesto, no se comprime nada [11].

Convergencia de los cuatro enfoques: el registro mínimo combina el contenido de la lección (qué falló, por qué, qué hacer) con el contexto de activación (cuándo aplica). Las diferencias están en el grado de estructura, en cuándo se consolida y en el seguimiento de utilidad.

### Estructuras de descubrimiento

El problema es recuperar las lecciones relevantes al ejecutar una tarea futura. Es el problema clásico de recuperación de casos del razonamiento basado en casos (CBR) [6].

**Índice temático plano.** En CBR corresponde a la memoria plana: cada lección nueva se añade sin coste de reorganización y la recuperación compara el caso actual contra todas las lecciones [6]. Es el enfoque de Recall: las lecciones se agrupan por tema y cada una lleva disparadores léxicos [3]. La recuperación es lineal, pero a la escala de cientos de lecciones es trivial [3].

**Árbol de decisión.** En CBR corresponde a las memorias jerárquicas (redes de discriminación): la búsqueda recorre la jerarquía y solo evalúa los casos de la rama elegida [6]. Es más eficiente en recuperación, pero exige mantener la estructura al añadir casos y puede perder casos relevantes si la búsqueda entra en la rama equivocada [6]. Confirma la intuición del usuario: un árbol necesita caminos de decisión muy específicos, y las lecciones de este proyecto rara vez caen en categorías disjuntas.

**Árbol fuzzy.** Los árboles de decisión fuzzy existen como técnica de clasificación supervisada: combinan árboles con lógica difusa para que una instancia active varias ramas con grados de pertenencia [8]. Se construyen por inducción sobre datos de entrenamiento y resuelven problemas de clasificación, no de recuperación de conocimiento [8]. Para una colección de notas en Markdown son un artefacto desproporcionado: no hay datos de entrenamiento ni una función de clasificación que aprender.

**Coincidencia léxica (disparadores + BM25).** Recall puntúa el texto de la tarea contra la redacción de cada lección con un índice BM25: una lección se activa si comparte al menos dos términos significativos, con tope de tres sugerencias y prioridad a las coincidencias por disparador exacto [3]. El autor evaluó embeddings y los descartó: solo 8 de 542 lecciones necesitaban coincidencia semántica, frente al coste de cargar un modelo en cada invocación [3]. En la literatura académica, el marco ReMe propone la misma idea con más formalidad: cada experiencia se indexa por su «escenario de uso» (cuándo aplica) y se rerankea contra las restricciones de la tarea nueva [5].

**Búsqueda semántica.** Sistemas como agent-knowledge combinan búsqueda semántica con TF-IDF sobre una base de conocimiento versionada en Git [9]. Es la opción que escala a miles de entradas y a redacciones heterogéneas, pero añade un pipeline de embeddings y peso de ejecución [9].

### Cuándo y cómo se consultan las lecciones

La evidencia converge en dos reglas. Primera, la lección debe llegar **antes de la acción** donde aplica: Recall mostraba reglas después de la llamada a herramienta y ese consejo era inaplicable; al restringir la recuperación al momento previo, el ruido se redujo a la mitad sin coste [3]. Segunda, la memoria que se repite se ignora: una regla ya mostrada permanece en silencio el resto de la sesión, salvo que caiga fuera del contexto por compactación [3].

Sobre la carga al inicio de sesión, Claude Code limita la memoria automática a las primeras 200 líneas o 25 KB, lo que confirma que el volumen precargable es pequeño y debe ser selectivo [7]. La recomendación general de los manuales de operación de agentes es mantener estos archivos cortos y específicos: instrucciones largas o irrelevantes reducen la adherencia [10].

### Destilar y descubrir: dos problemas distintos

La intuición del usuario —que destilar es la parte fácil y descubrir la difícil— coincide con la experiencia reportada. El autor de Recall lo formula directamente: «almacenar lecciones es fácil; saber cuáles siguen importando es el trabajo real» [3]. Las dos fases responden a preguntas distintas y conviene diseñarlas por separado.

**Destilación.** Agrupar experiencias por temas y redactar una lección por grupo es una operación de síntesis que un agente hace bien sin infraestructura: la entrada es una lista de bullets, la salida una nota por tema. OptMem la convierte incluso en un paso mecánico continuo: cuando un bloque del log vence, el propio comando `note` imprime la petición de compresión y el agente la resuelve en su siguiente acción [11]. El punto delicado no es generar la nota sino **conservar la evidencia**: en OptMem el log es append-only y el árbol de resúmenes es una caché reconstruible, de modo que una mala destilación se corrige recomputando, nunca editando la evidencia [11].

**Descubribilidad.** Recuperar la lección correcta antes de la acción donde aplica es el problema real. Los sistemas examinados lo resuelven sin vectores: OptMem usa búsqueda literal por expresión regular sobre el log y una portada presupuestada al inicio de sesión [11]; Recall usa disparadores explícitos más un índice BM25, y descartó embeddings tras comprobar que solo 8 de 542 lecciones los necesitaban [3]. La búsqueda semántica sí aparece en sistemas que indexan transcripciones heterogéneas de múltiples herramientas (agent-knowledge combina embeddings con TF-IDF) [9], un problema de escala y heterogeneidad que este proyecto no tiene.

**¿Un índice vectorial?** La evidencia disponible aconseja no añadirlo ahora, por tres razones:

- **Coste desproporcionado:** un índice vectorial exige dependencias, regeneración del índice y un modelo de embeddings; los dos sistemas minimalistas examinados lo rechazaron explícitamente [3][11].
- **Beneficio marginal a esta escala:** con decenas de lecciones, la recuperación léxica cubre la casi totalidad de los casos; el déficit medido de lo léxico era del orden del 1,5 % de las lecciones [3].
- **Contra la trazabilidad del proyecto:** un índice opaco no es legible ni versionable en Git, a diferencia de los disparadores explícitos en cada nota.

La ruta de escalado, si la recuperación léxica falla empíricamente, es: primero coincidencia BM25 sobre el texto de la tarea (sin modelo auxiliar), y solo después embeddings —el mismo orden que siguieron los sistemas citados [3][9].

### Coordinación de las tres fases

Captura, destilación y descubrimiento se coordinan por contratos, no por integración directa:

1. **La captura registra lo que el descubrimiento necesita.** Cada experiencia lleva la tarea, la brecha esperado-obtenido y la corrección; cada lección consolidada añade los disparadores (archivos, comandos, palabras clave) que la harán recuperable. El formato de registro es el contrato entre las fases.
2. **Evidencia separada de la capa derivada.** `EXPERIENCIAS.md` es el log: append-only, las experiencias consolidadas se marcan, no se borran. `docs/lessons/` es la capa derivada: las notas se pueden reescribir, fusionar o retirar porque la evidencia persiste. Es el principio de OptMem trasladado: una mala lección se corrige recomputando desde las experiencias, no editando la historia [11].
3. **Dos momentos de recuperación, no uno.** Siguiendo la distinción de OptMem entre orientación y consulta [11]: al leer una tarea, `ejecutar-tareas` recupera las notas cuyos disparadores coinciden (orientación: «qué lecciones aplican aquí»); el usuario o el agente pueden además buscar en `EXPERIENCIAS.md` y `docs/lessons/` cuando sospechan que falta algo (consulta puntual).
4. **Quién escribe importa.** OptMem prohíbe que los subagentes registren memorias porque no pueden juzgar qué es conocido ni evaluar el contexto completo [11]. La misma restricción aplica aquí: el subagente de revisión no debería registrar experiencias; el registro corresponde a la sesión donde el usuario corrige.

### Ubicación y forma de las notas

La convención del proyecto organiza `docs/` por tipo de artefacto (`research/`, `decisions/`, `tasks/`), según la estructura documentada en `README.md`. Una carpeta `docs/lessons/` con una nota por tema sigue esa convención y mantiene las lecciones versionadas y revisables como el resto de la documentación.

Sobre la consolidación, la observación del repositorio muestra que los flujos del proyecto están empaquetados como skills en `.agents/skills/` (inferencia del agente a partir del contenido del directorio). Agrupar experiencias por temas exige juicio (elegir el tema, decidir cuándo fusionar, redactar la lección), y ese juicio es exactamente lo que el proyecto empaqueta como skill interactivo. Un proceso documentado informal rompería la convención sin aportar nada.

## Evaluación comparativa

Criterios: coste de mantenimiento, precisión de recuperación a la escala del proyecto, escala mínima necesaria y coherencia con el proyecto.

### Coste de mantenimiento

- **Índice temático plano:** bajo. Añadir una lección es escribir una nota con sus disparadores.
- **Árbol de decisión:** medio-alto. Cada lección nueva puede exigir revisar la jerarquía; una lección que aplica a varios casos fuerza duplicación o reestructuración.
- **Árbol fuzzy:** alto. Requiere datos de entrenamiento y un algoritmo de inducción; no hay nada que mantener «a mano».
- **Coincidencia léxica:** bajo. El índice se deriva de las propias notas.
- **Búsqueda semántica:** medio. Requiere pipeline de embeddings y regeneración del índice.

### Precisión de recuperación a escala pequeña (decenas de lecciones)

- **Índice temático plano:** alta si el agente lee el índice completo; el volumen es asumible en una consulta.
- **Árbol de decisión:** media. Riesgo de perder lecciones por entrar en la rama equivocada [6].
- **Árbol fuzzy:** no aplicable sin datos de entrenamiento.
- **Coincidencia léxica:** alta en disparadores explícitos, media en lecciones conceptuales sin términos compartidos [3].
- **Búsqueda semántica:** alta, pero sin ventaja real a esta escala [3].

### Escala mínima para que rinda

- **Índice temático plano y coincidencia léxica:** desde la primera lección.
- **Árbol de decisión:** decenas de lecciones con rasgos discriminativos claros.
- **Árbol fuzzy:** cientos de casos etiquetados.
- **Búsqueda semántica:** cientos de lecciones con redacción heterogénea.

### Coherencia con el proyecto

- **Índice temático plano y coincidencia léxica:** encajan con el principio de simplicidad del sistema de tareas (archivos de texto, índices legibles, sin infraestructura).
- **Árboles y búsqueda semántica:** introducen maquinaria que el proyecto no necesita y que contradice la trazabilidad legible de `docs/`.

## Recomendación

**Índice plano por temas con disparadores léxicos, consultado al inicio de cada tarea.**

Es la opción que mejor equilibra las cuatro cualidades para la escala del proyecto:

- No requiere infraestructura: las notas son Markdown en `docs/lessons/` y el índice vive en un encabezado o archivo índice.
- Funciona desde la primera lección, sin umbral de escala.
- El mecanismo de recuperación es transparente y revisable: tema + disparadores + coincidencia de términos, sin modelos auxiliares.
- Los árboles (binarios o fuzzy) resuelven un problema que este sistema no tiene: las lecciones no son mutuamente excluyentes y no hay datos para entrenar una partición difusa.

Los disparadores combinan tres clases según el tipo de lección: patrón de archivo, patrón de comando y palabras clave de la tarea. Si el volumen crece hasta el punto de que la lectura completa del índice sea costosa, la evolución natural es la coincidencia léxica (BM25) y, solo después, la semántica —el orden que siguieron los sistemas citados [3][9].

Sobre las decisiones pendientes:

- **Formato de registro:** cada experiencia en `EXPERIENCIAS.md` como bullet con referencia a la tarea, lo esperado, lo obtenido y la corrección del usuario —suficiente para la consolidación posterior. La lección consolidada, en cambio, se redacta en lenguaje natural imperativo (qué hacer, por qué, cuándo aplica), siguiendo la evidencia de que el lector futuro es un LLM [1][2].
- **Separación de capas:** `EXPERIENCIAS.md` actúa como log de evidencia append-only (las experiencias consolidadas se marcan, no se borran) y `docs/lessons/` como capa derivada reescribible, replicando la arquitectura de OptMem [11].
- **Índice vectorial:** no se recomienda a esta escala; los disparadores léxicos y el índice por temas bastan. Si la recuperación falla en la práctica, la ruta de escalado es BM25 y, solo después, embeddings [3][9][11].
- **Ubicación de las notas:** `docs/lessons/`, una nota por tema.
- **Forma de la consolidación:** skill nuevo (`consolidar-lecciones` o nombre equivalente), ejecutado por el usuario en sesión independiente.
- **Punto de consulta:** se propone que `ejecutar-tareas` consulte las lecciones al leer el archivo de tarea, trayendo las notas cuyos disparadores coincidan con la tarea; las experiencias se registrarían al cierre de la tarea, en la misma sesión.

## Formato o procedimiento

Formato mínimo de una experiencia en `EXPERIENCIAS.md`:

```markdown
- Tarea: docs/tasks/NNN-slug.md
  Esperado: [qué esperaba el usuario]
  Obtenido: [qué produjo el agente]
  Corrección: [lo que el usuario indicó]
  Estado: pendiente | consolidada
```

Formato mínimo de una nota de lección en `docs/lessons/`:

```markdown
# [Tema]

## Lecciones

- **[Regla imperativa en una frase].** [Por qué: la brecha esperado-obtenido que la originó.]
  Disparadores: [patrones de archivo, de comando o palabras clave]
  Origen: docs/tasks/NNN-slug.md
```

El índice de lecciones puede convivir en `docs/lessons/README.md` o integrarse en el flujo del skill de consolidación; la decisión concreta se toma en la tarea de implementación.

## Limitaciones

Las fuentes principales son industriales (entradas de blog, repositorios y documentación de producto), no literatura revisada por pares; el campo de la memoria en agentes de codificación es joven y las cifras citadas (542 lecciones, 8 lecciones semánticas) provienen de un solo sistema en producción [3]. El repositorio de OptMem no tiene licencia: el análisis de sus mecanismos procede de una lectura de terceros y sirve como referencia conceptual, no como base para reutilizar código [11]. La literatura de CBR es estable pero anterior a los LLM; su aplicación a recuperación de lecciones en texto natural es una analogía, no una validación empírica [6]. No se encontró una comparación experimental de estructuras de descubrimiento a la escala de este proyecto (decenas de lecciones); la recomendación descansa en coste, transparencia y coherencia con el proyecto más que en métricas de recuperación.

## Referencias

- [1] Shinn et al., «Reflexion: Language Agents with Verbal Reinforcement Learning» — https://arxiv.org/abs/2303.11366
- [2] Agentic Architectures, «Reflexion — verbal self-reflection stored in episodic memory» — https://fareedkhan-dev.github.io/all-agentic-architectures/architectures/18_reflexion/
- [3] Serhii Zhabskyi, «AI Coding Agents With Project Memory: 3 Months and 500 Lessons Later» — https://dev.to/samplex_283d61d7a/ai-coding-agents-with-project-memory-3-months-and-500-lessons-later-48ie
- [4] Goldentrii, «AgentRecall-X: Correction-first persistent memory for AI agents» — https://github.com/Goldentrii/AgentRecall-X
- [5] «Remember Me, Refine Me: A Dynamic Procedural Memory Framework for Experience-Driven Agent Evolution» — https://aclanthology.org/2026.findings-acl.829.pdf
- [6] «Principles of Case-Based Reasoning» — https://www.cs.upc.edu/~miquel/sel/CBR-intro.pdf
- [7] Anthropic, «Claude Code memory» — https://code.claude.com/docs/en/memory
- [8] «Fuzzy Decision Trees for Explainable Brain Tumor Classification» — https://doi.org/10.1007/s10796-025-10683-2
- [9] keshrath, «agent-knowledge» — https://github.com/keshrath/agent-knowledge
- [10] Chatcode, «AGENTS.md and CLAUDE.md: What Actually Helps Agents» — https://chatcode.dev/articles/agents-md-claude-md-best-practices
- [11] Agent Memory Atlas, «OptMem» (análisis de VictorTaelin/OptMem) — https://neoneye.github.io/agent-memory-atlas/systems/optmem/ y https://github.com/VictorTaelin/OptMem
