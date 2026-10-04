# PRs como punto de revisión

**Fecha:** 2026-10 · **Profundidad:** profunda (varias fuentes por afirmación clave) · **Propósito:** determinar cómo incorporar el PR al ciclo de tareas como punto de revisión —qué contiene una descripción eficaz orientada al revisor, cómo funciona el bucle de comentarios y qué cambia en la secuencia de cierre, que pasa a tener dos puertas humanas.

## Contexto

Hoy el ciclo tiene una sola puerta humana: el subagente independiente aprueba técnicamente y el usuario aprueba en la conversación, sobre el informe y el resumen del ejecutor —no sobre el diff en su hábitat—. Después de esa aprobación corren los sensores de cierre, que escriben artefactos (changelog, dominios, producto, PRD, roadmap, cierre de conjunto) sin que ningún humano los revise. La observación de origen: el plan ya vive en el archivo de la tarea y fue aprobado; si el PR repite el plan y pide «verifica que el plan se ejecutó», la revisión se degrada a confirmar.

La decisión de entregar el cambio vía PR está aplazada desde una investigación previa: al evaluar la separación de `ejecutar-tareas` se concluyó que la orquestación de entrega de código —pipeline con aislamiento, PR, verificación y merge, con puerta humana de merge— es estructuralmente distinta del ciclo genérico, pero se mantuvo el ciclo actual hasta que existieran los flujos de gestión a nivel de código, señal declarada para reabrir la decisión («Separación de ejecutar-tareas», 2026-09). Esta investigación es esa reapertura, acotada al punto de revisión.

## Análisis externo

### Qué contiene una descripción eficaz

- **Taxonomía de ocho elementos**, derivada de 22 guías de la industria: propósito, razón del cambio, explicación del código, enlace a los issues, tipo de feedback esperado, orden sugerido de revisión de archivos, explicación de las pruebas y capturas de pantalla —esta última solo en cambios de UI— (Pirouzkhah, Wurzel Gonçalves y Bacchelli, MSR '26).
- **Los elementos interactivos son los más predictivos:** pedir un tipo de feedback concreto —presente en solo el 16 % de las descripciones— se asocia a un 64-72 % más de probabilidad de merge y a discusiones más largas; la explicación del código suma un 12-20 %. Los elementos descriptivos (propósito, razón, enlace) se valoran en casi todos los PRs; los de dirección al revisor son los que mejor predicen aceptación y participación (misma fuente).
- **Las descripciones son adaptativas, no formales:** más frecuentes en proyectos maduros y en cambios complejos —se escriben cuando son útiles— (misma fuente).
- **Qué y por qué como registro permanente:** la descripción es registro público del cambio; la primera línea debe sostenerse sola; los enlaces externos mueren, así que el contexto esencial va en el cuerpo; conviene revisar la descripción antes del merge porque el cambio evoluciona durante la revisión (Google eng-practices).
- **Propósito, resumen, contexto y guía de lectura:** propósito del PR, resumen de los cambios, enlaces a issues o conversaciones, tipo de feedback necesario y orden de revisión cuando hay muchos archivos; PRs pequeños de un solo propósito; auto-revisión del propio PR antes de enviarlo (GitHub Docs).
- **Audiencia presente y futura:** la descripción comunica la intención a los revisores de hoy y a quien depure el cambio mañana con `git blame`; el nivel de detalle se calibra por el conocimiento del revisor (Race Condition).

### El PR como punto de revisión, no de alineación

- **La descripción enmarca la conducta del revisor:** el elemento que más participación genera es el tipo de feedback pedido —lo que pides determina lo que recibes—. Pedir «verifica que el plan se ejecutó» es pedir conformidad, no hallazgos.
- **El anclaje en revisión está documentado:** los sesgos cognitivos —confirmación, anclaje— aparecen durante la revisión y afectan a cómo se crea e interpreta el feedback (Jetzen et al., debiasing). En un experimento controlado, los comentarios visibles primaron a los revisores solo para el tipo de bug no habitual del que trataban —efecto acotado, pero que muestra que lo que el revisor ve primero dirige su atención— (Çalikli et al., ICSE '20).
- **Revisar código de agente es calibrar confianza, no leer un diff:** los desarrolladores piden señales de riesgo a tres niveles —panorámica, archivo, fragmento—, no una repetición del plan (arXiv 2606.01969, estudio con JetBrains).
- **La degradación sin puerta ya ocurre:** alrededor del 80 % de los PRs co-escritos por agentes en OSS se mergean sin revisión explícita y más rápido que los de humanos («On Autopilot?», MSR '26); la revisión solo existe si el proceso la exige.

### El bucle de comentarios

- **Intención explícita por etiqueta:** Conventional Comments tipa cada comentario —issue, suggestion, question, nitpick, todo, thought, chore, note, praise— con decoración *blocking* o *non-blocking* —y etiquetas expresivas adicionales como `typo`, `polish` y `quibble`—; hace la severidad explícita y es parseable por máquina (conventionalcomments.org). Las guías prácticas convergen en prefijos de severidad —`nit:`, `question:`, `blocker:`— y en aprobar con comentarios menores sin forzar otra ronda (Gitmore).
- **Aprobar lo que mejora, no lo perfecto:** el estándar de Google favorece la aprobación cuando el cambio mejora la salud del código; lo no crítico se marca `nit:`; los hechos técnicos mandan sobre las opiniones; el conflicto busca consenso y escala, nunca deja el cambio parado (Google eng-practices, estándar).
- **Cuándo un comentario genera cambio:** si el revisor no entiende algo, la primera respuesta es clarificar el código —un comentario de código después, y la respuesta en la herramienta solo al final—; el desacuerdo se resuelve con hechos, no con defensa (Google, handling-comments). La responsabilidad de corregir es del autor; el revisor señala el problema y explica el porqué, balanceando dirección y autonomía (Google, comments).
- **La mecánica del ciclo:** reviews con veredicto Comment/Approve/Request changes; sugerencias aplicables agrupadas en un solo commit; conversaciones marcadas como resueltas; nueva petición de revisión tras cambios sustanciales; el feedback fuera de alcance se deriva a un issue nuevo (GitHub Docs).
- **Los bucles deben converger:** en PRs escritos por agentes, la participación del revisor es el predictor más fuerte de integración —iterar mucho no basta; lo que integra es el bucle accionable que converge a las expectativas del revisor, y los force pushes perturban la coordinación— («When AI Teammates Meet Code Review», MSR '26).

### PRs en flujos conducidos por agentes

- **El PR es la entrega:** el coding agent de Copilot abre rama y PR, pide revisión humana e itera sobre los comentarios del PR; no puede aprobar ni mergear su propio trabajo —la aprobación humana es requerida y la CI no corre hasta ella— (GitHub Docs y blog). El patrón de industria es «agente como junior»: rama aislada, CI más estricta que la humana, merge propiedad del humano y rollback preparado (Karkoh).
- **Las revisiones de agente son consultivas:** la review de Copilot se postea como Comment por defecto —no cuenta como aprobación requerida— (GitHub Docs); las pipelines agente-a-agente postean COMMENT y nunca bloquean (multi-agent-review).
- **La revisión escala por niveles de detalle:** revisar cambios de un LLM que tocan varios archivos exige zoom —panorámica, archivo, fragmento— con señales de riesgo; los desarrolladores esperan menor esfuerzo con herramientas que hacen visible el riesgo (calibración de confianza, arXiv 2606.01969).

## Análisis interno

1. **La puerta humana ve un resumen, no el cambio:** la aprobación actual se da en la conversación, sobre el informe del subagente y el resumen del ejecutor. El PR trae el diff navegable con comentarios por línea —el hábitat natural de la revisión— y un registro persistente de la discusión.
2. **Los sensores escriben sin ojos humanos:** tras la aprobación corren changelog, dominios, producto, PRD, decisiones, roadmap y cierre de conjunto; el paquete final que se commitea nunca se revisa. La segunda puerta cubre exactamente ese delta.
3. **El orden se invierte:** hoy el commit es el último acto del cierre; con PR la rama con commits debe existir antes de la revisión —el commit deja de ser cierre y pasa a ser condición de la revisión.
4. **El registro de veredictos crece:** `## Revisión` registra hoy subagente y usuario; el modelo de dos puertas registra tres.
5. **Lo que ya está resuelto no se duplica:** en el sub-flujo de desarrollo el subagente ya hace la verificación nominal del plan (`revisar-implementacion`); pedirla otra vez en el PR es el antipatrón de alineación. El PR pide juicio sobre el cambio, no conformidad con el plan.

## Evaluación comparativa

Alternativas para la posición de la puerta humana:

- **PR como única puerta** —sustituir la aprobación en conversación—: los sensores correrían después sin revisión humana y el paquete de cierre quedaría sin ojos.
- **Dos puertas: ejecución vía PR y cierre tras sensores** —elegida—: cada puerta revisa lo que solo ella puede ver, el cambio en la primera y el paquete completo en la segunda; la segunda es barata porque revisa solo el delta de los sensores, no el diff otra vez.
- **Re-revisión completa en la segunda puerta:** duplica la primera sin añadir filtro.

Alternativas para el momento de apertura:

- **PR borrador desde el inicio** —patrón de Copilot para trabajo asíncrono—: expone trabajo en curso; es útil cuando no hay supervisor técnico, redundante aquí porque la revisión del subagente precede.
- **PR tras la aprobación técnica** —elegida—: el humano solo ve diffs que ya pasaron el filtro.

Alternativas para quién responde los comentarios:

- **Cada comentario lo decide el usuario:** anula la delegación; el bucle sería lectura en voz alta.
- **Triaje mecánico con escalado** —elegido—: el agente procesa por tipo y escala al usuario lo que cambia el objetivo o queda en desacuerdo, coherente con el modelo de desviaciones del sub-flujo de desarrollo.

## Recomendación

### Secuencia del cierre con dos puertas

1. Ejecutar la tarea, marcarla `[r]` y correr la revisión técnica del subagente iterando hasta «aprueba» —sin cambio—.
2. Commit del trabajo, push de la rama y apertura del PR con la descripción orientada al revisor. El commit por tarea deja de ser el último acto: pasa a ser condición de la revisión.
3. **Puerta de ejecución:** el usuario revisa el PR y comenta; el agente procesa el bucle hasta obtener la aprobación del PR. Se registra `Usuario (ejecución): fecha — Aprueba`.
4. Sensores de cierre —experiencias, changelog, dominio, producto, PRD, decisiones, roadmap y cierre de conjunto—: sus escrituras se commitean a la rama del PR.
5. **Puerta de cierre:** el usuario revisa el paquete de cierre —entradas de sensores y estado del índice— y aprueba.
6. Mutaciones finales: `[x]` en el índice, «Completada» y `Usuario (cierre): fecha — Aprueba` en `## Revisión`; commit de cierre en la rama y merge del PR.

### Qué cambia en cada skill

- **`ejecutar-tareas`:** adopta la secuencia anterior; la aprobación única del usuario se divide en dos puertas y el bucle de comentarios entra como procedimiento.
- **`commit`:** su invocación se adelanta —commit de apertura, commits por ronda de comentarios y commit de cierre—; el «un commit por tarea» pasa a «un PR por tarea con sus commits».
- **`revisar-implementacion`:** conserva su rol de filtro técnico previo al PR; su informe alimenta los puntos de atención de la descripción.
- **Sensores de cierre:** misma lógica y otra ubicación de escritura —la rama del PR en lugar del árbol sin commitear—.
- **`registrar-experiencias`:** las correcciones del usuario incluyen las hechas vía comentarios del PR, no solo las conversacionales.
- **`actualizar-artefactos` (`registrar-revision`):** los autores pasan de dos a tres —`Subagente`, `Usuario (ejecución)`, `Usuario (cierre)`—.
- **`crear-tareas`:** recibe los comentarios fuera de alcance del bucle.
- **`mapa-de-flujos`:** actualiza el ciclo, las puertas humanas y los artefactos de estado —el PR pasa a ser artefacto de estado transitorio—.
- **Operación mecánica nueva:** empujar la rama y abrir el PR —`gh` o equivalente— es un paso mecánico nuevo del ciclo; puede entrar en el catálogo de scripts o resolverse inline.

### Descripción del PR orientada al revisor

- **Propósito y trazabilidad:** enlace al archivo de la tarea —el plan vive ahí y ya fue aprobado; re-resumirlo es redundante y puede divergir—. El porqué se responde con el enlace y una frase de contexto.
- **Qué cambia:** la explicación del cambio a nivel de diff —qué se hizo y qué decisiones toma el código, no qué se planeó—.
- **Puntos de atención del revisor:** dónde empezar, orden de archivos si hay muchos, desviaciones registradas, compromisos conocidos y el tipo de feedback buscado —la pregunta explícita sobre lo que se duda—. Explícitamente no «verifica que el plan se ejecutó»: eso degrada la revisión a confirmar —la petición enmarca la atención del revisor— y el sub-flujo de desarrollo ya lo verificó nominalmente con el subagente.
- **Condicionales:** cómo se probó cuando no es obvio; capturas si el cambio toca UI.

### El bucle de comentarios

Triaje por comentario:

- `issue` o bloqueante → genera cambio en la misma ronda: commit y push.
- `question` → clarificar el código primero; comentario de código si no basta; responder en el hilo al final.
- `suggestion` o `nit` no bloqueante → aplicar si mejora, o justificar y resolver.
- Fuera de alcance → `crear-tareas`; no se corrige en el PR.
- Desacuerdo → consenso con hechos técnicos; si persiste, decide el usuario —es su puerta—.

Cada ronda termina respondiendo las conversaciones, marcándolas resueltas y re-pidiendo revisión. El **plan de mejoras** de cada ronda es la lista clasificada —comentario y acción— que el agente reporta al cerrarla: no se improvisa comentario a comentario, se procesa el lote. Es el mismo principio que el registro de desviaciones del sub-flujo de desarrollo.

### Registro de las aprobaciones

`## Revisión` pasa a tres líneas:

- `Subagente: fecha — Aprueba` — la revisión técnica previa al PR.
- `Usuario (ejecución): fecha — Aprueba` — la puerta del PR.
- `Usuario (cierre): fecha — Aprueba` — la puerta del paquete final.

## Limitaciones

- La evidencia sobre elementos de descripción es correlacional —regresiones sobre 80K PRs—, no causal; los propios autores lo declaran como amenaza a la validez.
- Los estudios de sesgo provienen de revisión humana sobre código humano; la extrapolación a revisión humana de código de agente se apoya en el estudio de calibración de confianza y en los de PRs de agentes, pero el campo es reciente —todo el material es de 2026—.
- El modelo asume una plataforma con PRs —GitHub vía `gh`—; el concepto es genérico —punto de revisión con bucle de comentarios—, pero la mecánica concreta —plataforma, creación y aislamiento de la rama— queda para la materialización (tarea 130).
- La puerta de cierre añade una interacción por tarea; si los sensores emiten «sin entrada» a menudo, puede volverse ceremonial —su calibración también queda para la materialización—.

## Referencias

- Pirouzkhah, Wurzel Gonçalves y Bacchelli, «The Value of Effective Pull Request Description» (MSR '26) — arxiv.org/abs/2602.14611
- GitHub Docs, «Helping others review your changes», «About pull request reviews», «Incorporating feedback in your pull request» y «Resolving reviews» — docs.github.com/en/pull-requests
- Google eng-practices, «Writing good CL descriptions», «The Standard of Code Review», «How to handle reviewer comments» y «How to write code review comments» — google.github.io/eng-practices
- Conventional Comments — conventionalcomments.org
- Gitmore, «Code Review Process Checklist» — gitmore.io/resources/checklists/code-review-process-checklist
- Race Condition, «High-Quality Pull-Request Descriptions» — racecondition.software/blog/pr-descriptions
- Çalikli et al., «Primers or Reminders? The Effects of Existing Review Comments on Code Review» (ICSE '20) — dl.acm.org/doi/10.1145/3377811.3380385
- Jetzen et al., «Towards debiasing code review support» — arxiv.org/abs/2407.01407
- «Trust-Calibrated Code Review: A Participatory Design Study of Review Workflows for LLM-Generated Multi-File Changes» — arxiv.org/abs/2606.01969
- «When AI Teammates Meet Code Review: Collaboration Signals Shaping the Integration of Agent-Authored Pull Requests» (MSR '26) — dl.acm.org/doi/10.1145/3793302.3793561
- «On Autopilot? An Empirical Study of Human–AI Teaming and Review Practices in Open Source» (MSR '26) — dl.acm.org/doi/10.1145/3793302.3793573
- GitHub, «Assigning and completing issues with coding agent in GitHub Copilot» y «Copilot coding agent 101» — github.blog; docs.github.com/en/copilot
- Karkoh, «AI Coding Agent Pull Request Workflow with CI Gates» — faisalkarkoh.com/blog/ai-coding-agent-pull-request-workflow
- TheCraigHewitt, «multi-agent-review» — github.com/TheCraigHewitt/multi-agent-review
- `docs/research/2026-09-separacion-ejecutar-tareas.md` — investigación previa que aplazó la entrega vía PR y declaró la señal de reapertura.
- `docs/tasks/129-investigacion-prs-punto-revision.md` — tarea que motiva la investigación.
