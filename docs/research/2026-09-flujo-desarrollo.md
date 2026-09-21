# Flujo de desarrollo por tarea: planeación, ejecución y revisión

> **Fecha:** 2026-09

## Propósito

Evaluar la viabilidad del flujo de desarrollo propuesto en la tarea 061 —planeación técnica conceptual, planeación de testing guiada por ZOMBIE, ejecución siguiendo el plan y revisión independiente contra las convenciones del proyecto—, contrastarlo con las mejores prácticas de la industria y determinar la forma que tomaría cada fase como skill, así como su relación con `ejecutar-tareas`.

## Contexto

El usuario propone un flujo de desarrollo en cuatro fases [23]:

1. **Planeación técnica:** plan de la tarea individual siguiendo los lineamientos de la épica. Acciones a nivel conceptual, sin rutas, fragmentos de código ni decisiones de implementación final; cada acción lleva una explicación de cómo aporta al desarrollo («storytelling técnico»).
2. **Planeación de testing:** con ZOMBIE (*zero, one, many, boundary, interface, exception*) como guía para determinar casos, se define la suite de pruebas esperada. La suite no declara su relación con ZOMBIE; describe expectativas sobre lo que el sistema hace. Una prueba sin caso de uso asociado es de baja calidad. La suite se agrega al plan técnico.
3. **Ejecución:** desarrollo siguiendo el plan generado.
4. **Revisión:** un agente nuevo compara el plan contra el desarrollo y revisa archivos hermanos o de funcionalidad similar para verificar consistencia con las convenciones del proyecto.

`ejecutar-tareas` es hoy un ejecutor general: ejecuta tareas de mantenimiento, investigación, desarrollo y otras, invocando capacidades especialistas según la tarea lo requiera (`investigar`, `commit`, `revisar-redaccion`) [24]. Una investigación previa recomendó mantenerlo como orquestador genérico y aplazar la decisión de crear un orquestador del dominio de código hasta que existieran los flujos de gestión a nivel de código [21]. El flujo propuesto es la primera materialización parcial de ese dominio, y la forma de integrarlo decide si `ejecutar-tareas` conserva su carácter general.

## Análisis

### Planeación técnica: el plan escrito antes del código es práctica consolidada

- El patrón *plan-first loop* —describir el subsistema, corregir malentendidos, co-crear un plan escrito, aprobarlo e implementar— es la práctica recomendada para tareas no triviales. El equipo de Sora para Android de OpenAI pasó de prompts de implementación directa a este bucle porque el código resultante funcionaba pero era arquitectónicamente inconsistente [1][5].
- El contenido habitual del plan: qué archivos cambian y por qué, qué estado o lógica nueva se introduce, cómo se integra con los patrones existentes y cuáles son los criterios de éxito [1].
- El plan se persiste como archivo para sobrevivir los límites de contexto y servir de artefacto de coordinación y registro de decisiones [1][4][5]. VS Code guarda el plan del agente en un archivo de memoria de sesión [3], y spec-kit encadena artefactos Markdown entre fases [10][11].
- Sobre el nivel de detalle, la guía de planeación con agentes recomienda declarar el resultado, las restricciones, las decisiones arriesgadas y la línea de llegada, y dejar que el agente proponga los pasos mecánicos tras inspeccionar el repositorio: el detalle se añade cuando previene un error costoso, no porque un plan largo parezca minucioso [2].
- Las rondas de autocrítica del plan antes de ejecutar son útiles en tareas complejas o de errores costosos, e innecesarias en tareas simples [1].
- Existen herramientas dedicadas a revisar el plan antes de ejecutarlo: Seldon verifica rutas, dependencias y secuenciación contra el código real [12], y claude-replan lanza subagentes paralelos que revisan alineación con el código, mejores prácticas, viabilidad, perspectiva fresca y estándares del proyecto [13].

Evaluación: la fase propuesta coincide con la práctica dominante, con dos diferencias y una aportación propia:

1. La propuesta excluye rutas y fragmentos de código; la industria suele incluir el alcance por archivo [1][5], aunque la guía de granularidad de Plannotator avala el nivel conceptual cuando el detalle no previene errores costosos [2]. La diferencia es de grado, no de fondo.
2. La industria añade un paso previo que la propuesta no tiene: el agente lee y resume el subsistema antes de planear, para exponer malentendidos antes de que se conviertan en plan [1][4].
3. El storytelling técnico —cada acción explica cómo aporta— no tiene fuente directa; la práctica cercana es el documento de diseño con justificación. Es coherente con el rol del plan como artefacto de alineación, pero su forma narrativa es una aportación del proyecto (inferencia).

### Planeación de testing: la suite antes del código, anclada en requisitos

- ZOMBIES es un acrónimo de James Grenning para rebanar un problema en TDD: un eje ZOM (*zero, one, many*) de progresión de simple a complejo y un eje BIE (*boundary, interface, exceptions*), unidos por escenarios y soluciones simples. Es parcialmente secuencial, no una lista rígida [6][7].
- El método sirve para generar una lista inicial de pruebas que se actualiza de forma iterativa [7].
- El anclaje en requisitos (*requirement anchoring*) sostiene que, en desarrollo con IA, el documento de plan de pruebas precede al código de pruebas y al código de negocio, y que las pruebas se anclan en los requisitos, no en la implementación: verificar que el requisito se cumple, no que la función devuelve un valor concreto [8].
- Probar el comportamiento y no la implementación es el principio consolidado: si cambia el cómo sin cambiar el qué, la prueba debe seguir pasando (Khorikov, Metz, Cooper) [9].
- Toda prueba debe trazarse a un requisito, según la matriz de trazabilidad de requisitos de ISO/IEC/IEEE 29148 [8].

Evaluación: coincidencia fuerte. ZOMBIE como guía de generación de casos —y no como taxonomía que la suite declare— es exactamente su uso original [6][7]. «Una prueba sin caso de uso es de baja calidad» equivale a la trazabilidad requisito↔prueba del anclaje en requisitos [8]. «El qué, no el cómo» es el principio de caja negra [9].

### Ejecución: seguir el plan con desviaciones registradas

- Con el plan aprobado, la implementación ejecuta un enfoque conocido; la desviación del alcance del plan es señal de detenerse y reexaminar, no de continuar [1].
- La planeación continúa durante la implementación: la evidencia nueva puede devolver el trabajo a la exploración o a un plan revisado, y las desviaciones se registran como evidencia para el siguiente plan [2].
- Spec-kit cierra su pipeline con una fase de convergencia que compara la implementación contra la especificación, el plan y las tareas [10].

Evaluación: la propuesta dice «seguir el plan»; la industria añade un mecanismo explícito —registrar las desviaciones y replanificar cuando la evidencia lo exige— en lugar de una adherencia rígida [1][2].

### Revisión: verificar contra el código base y las convenciones, con contexto aislado

- La investigación interna ya estableció la revisión dual con subagente adversarial de contexto aislado [20]. La evidencia externa la confirma: la autoevaluación del agente difiere de la evaluación independiente en torno al 31 % de los casos [15], y la verificación independiente contra requisitos mejora la precisión un 28 % (Chain-of-Verification) [14].
- Revisar la implementación contra el plan es práctica explícita: `/recheck` verifica que la implementación coincide con el plan [13], spec-kit converge contra especificación, plan y tareas [10], y Seldon verifica el plan contra el código real [12].
- Revisar la consistencia con el código base es práctica reconocida: leer al menos tres archivos hermanos para extraer el patrón canónico antes de escribir o al revisar [17], y revisores dedicados a las reglas declaradas del proyecto que citan la regla concreta violada [18][19].
- La revisión por capas distingue lo mecánico (ejecutar las puertas del propio proyecto: lint, tests), lo estructural (las reglas declaradas del proyecto) y el juicio (profundidad, promesas sin prueba que las respalde) [16]. «No hay nada que cortar» es un veredicto válido: un revisor obligado a producir hallazgos acaba inventándolos [16].

Evaluación: la fase propuesta coincide en su núcleo —consistencia con archivos hermanos y convenciones—. La industria añade dos capas que el proyecto decide posponer: la ejecución de las puertas mecánicas del proyecto (tests, lint, build) como primera capa de la revisión [16], y la verificación nominal plan↔implementación, cada elemento del plan contra su realización [10][13].

### Relación con ejecutar-tareas: ejecutor general y skill especialista

`ejecutar-tareas` es un ejecutor general: su ciclo (tomar tarea, ejecutar, revisar, commitear) es el mismo para una tarea de mantenimiento, de investigación o de desarrollo [24]. Esto plantea dos formas de integrar el flujo propuesto:

- **Fases como pasos condicionales de `ejecutar-tareas`.** El procedimiento diría «si la tarea es de desarrollo, planear, planear la suite, ejecutar, revisar la implementación». El ejecutor seguiría teniendo un ciclo general, pero contendría enrutado por dominio y el pipeline completo de desarrollo. Es la opción «extender» que la investigación previa evaluó como la peor: mezcla lógica genérica con lógica de dominio y añade bifurcaciones que dificultan razonar sobre el flujo [21].
- **Pipeline encapsulado en un skill especialista.** `ejecutar-tareas` no conoce las fases; en su paso de ejecución invoca la capacidad que la tarea declara, igual que hoy invoca `investigar` o `commit`. Para las tareas de desarrollo, un único skill especialista encapsula el sub-flujo completo: entender el subsistema, planear, planear la suite y ejecutar revisando el plan en curso. Es el patrón *orchestrator-and-specialists*: el orquestador conserva alcance y decisiones y delega trabajo acotado [21][22].

Evaluación: la segunda opción mantiene a `ejecutar-tareas` en su forma general sin ambigüedad. El precio es que el skill especialista se convierte en un mini-orquestador del sub-flujo dentro de una tarea —sin worktree, pull request ni merge—, que es lo que la investigación previa anticipaba como orquestador por dominio, acotado [21]. La única bifurcación que queda en el ejecutor general es el enrutado: identificar el tipo de la tarea, declarado en el archivo de tarea o determinado por la épica, sin que el orquestador conozca las fases del dominio.

## Recomendación

**El flujo propuesto es viable y coincide con la práctica consolidada de la industria; conviene adoptarlo encapsulado en un skill especialista de desarrollo, con dos ajustes incorporados y dos pospuestos.**

Ajustes incorporados:

1. **Paso de entendimiento previo a la planeación:** el agente lee y resume el subsistema afectado antes de escribir el plan, para exponer malentendidos a tiempo [1][4].
2. **Revisión del plan durante el desarrollo:** la ejecución confronta el trabajo con el plan a medida que avanza; si se desvía, el agente se detiene, registra la desviación y replanifica o pide confirmación [1][2].

Ajustes pospuestos (registrados como trabajo futuro, no incorporados ahora):

3. **Capa mecánica en la revisión:** ejecutar las puertas del propio proyecto (tests, lint, build) como primera capa de la revisión [16].
4. **Verificación formal del plan:** la comparación nominal plan↔implementación y la revisión del plan por un subagente antes de ejecutar [10][12][13].

Sobre la granularidad del plan: la propuesta excluye rutas y fragmentos de código; la industria los permite cuando previenen errores costosos [2]. Se mantiene el nivel conceptual como norma, admitiendo referencias a archivos concretos solo cuando el detalle previene un error costoso.

Forma que tomaría el flujo:

- **`ejecutar-tareas` se mantiene como ejecutor general,** sin conocer las fases de desarrollo. En su paso de ejecución enruta por el tipo de la tarea —declarado en el archivo de tarea o determinado por la épica— hacia el skill especialista correspondiente. La revisión dual con subagente y usuario se conserva.
- **Skill especialista de desarrollo:** encapsula el sub-flujo dentro de una tarea: entendimiento del subsistema, planeación técnica con storytelling, planeación de la suite con ZOMBIE y ejecución con revisión del plan en curso. Toma el plan técnico de la épica como guía y produce el diff y el registro de desviaciones. Si su tamaño lo aconseja, puede dividirse en sub-skills de planeación y ejecución.
- **Skill de revisión de implementación:** invocado en el paso de revisión del orquestador para tareas de desarrollo; revisa el diff contra las convenciones del proyecto y los archivos hermanos o de funcionalidad similar [17][18][19]. Las capas mecánica y de verificación del plan se añadirán cuando se des-pospongan.

El plan y la suite se agregan al archivo de la tarea, como propone el flujo, manteniendo un solo artefacto por tarea.

## Limitaciones

- Las fuentes son de la industria —documentación de herramientas, guías de patrones y blogs técnicos—, no académicas con revisión por pares; describen prácticas consolidadas en herramientas de 2025-2026.
- El storytelling técnico como formato de plan no tiene precedente directo en las fuentes; se evalúa por coherencia con el rol del plan como artefacto de alineación (inferencia).
- Las herramientas de revisión de planes (Seldon, claude-replan) son recientes y carecen de evaluación independiente de su eficacia; su valor aquí es evidenciar que la revisión del plan es práctica reconocida, no validar esas herramientas.
- El enrutado por tipo de tarea presupone un mecanismo de declaración de tipo que hoy no existe en el archivo de tarea ni en la épica; su diseño queda para las tareas derivadas.
- No se investigó cómo medir la calidad de un plan ni qué métricas tendría el flujo.

## Referencias

- [1] AgentPatterns, «The Plan-First Loop» — agentpatterns.ai/workflows/plan-first-loop/
- [2] Plannotator, «How to Plan with AI Coding Agents» — docs.plannotator.ai/learn/planning/how-to-plan-with-ai-coding-agents
- [3] Visual Studio Code, «Planning with agents» — code.visualstudio.com/docs/agents/run/planning
- [4] aiHola, «How to Use Claude Code with a Plan-First Workflow» — aihola.com/article/claude-code-plan-annotate-workflow
- [5] OpenAI, «Shipping Sora for Android with Codex» — openai.com/index/shipping-sora-for-android-with-codex/
- [6] James Grenning, «TDD Guided by ZOMBIES» — blog.wingman-sw.com/tdd-guided-by-zombies
- [7] Samman Coaching, «Slicing a task using ZOMBIES» — sammancoaching.org/learning_hours/small_steps/zombies.html
- [8] Alex Wang, «Write Test Plans Before Test Code: Requirement Anchoring in AI Development» — blog.chuanxilu.net/en/posts/2026/04/test-doc-before-test-code-reverse-anchoring/
- [9] Omar Crosby, «Black-box unit tests: testing behavior, not implementation» — omarcrosby.com/posts/testing-behavior-not-implementation/
- [10] GitHub, «Spec Kit» — github.com/github/spec-kit
- [11] GitHub Blog, «Spec-driven development with AI» — github.blog/ai-and-ml/generative-ai/spec-driven-development-with-ai-get-started-with-a-new-open-source-toolkit/
- [12] Seldon, «Independent Plan Review for AI Coding Agents» — degrammer.github.io/seldon/
- [13] kojott, «claude-replan» — github.com/kojott/claude-replan
- [14] vertti, «se-cove-claude-plugin» — github.com/vertti/se-cove-claude-plugin
- [15] tt-a1i, «harnessed» — github.com/tt-a1i/harnessed
- [16] mahmoudmoe84, «review-toolkit» — github.com/mahmoudmoe84/review-toolkit
- [17] skills.rest, «codebase-conformity» — skills.rest/skill/codebase-conformity
- [18] etr, «groundwork: conventions-reviewer» — github.com/etr/groundwork
- [19] marcusrbrown, «systematic: project-standards-reviewer» — github.com/marcusrbrown/systematic
- [20] Investigación previa, «Flujo de revisión de tareas» — `docs/research/flujo-revision-tareas.md`
- [21] Investigación previa, «Separación de ejecutar-tareas» — `docs/research/2026-09-separacion-ejecutar-tareas.md`
- [22] Investigación previa, «Flujos de idea a tarea y de ejecución de tarea» — `docs/research/2026-09-flujos-idea-tarea-ejecucion.md`
- [23] Tarea 061 — `docs/tasks/061-investigar-flujo-desarrollo.md`
- [24] Skill `ejecutar-tareas` — `.agents/skills/ejecutar-tareas/SKILL.md`
