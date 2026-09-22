# Revisión de arquitectura y documentación de dominio

> **Fecha:** 2026-09

## Propósito

Determinar cómo incorporar al proyecto dos capacidades de mantenimiento continuo —la revisión de la arquitectura de un dominio con criterios de Domain Driven Design y la documentación viva de dominios ligada al ciclo de desarrollo—, a partir de la evaluación de la PoC de `todo-app/` y de las mejores prácticas de la industria.

## Contexto

La PoC de `todo-app/` completó el ciclo de desarrollo (épica, cuatro tareas tipo `desarrollo`, revisión dual). El resultado funciona, pero nada en el flujo evalúa la estructura del código frente al dominio ni mantiene documentación del dominio a medida que cambia. El usuario propone un skill de revisión de arquitectura basado en DDD y un skill de documentación de dominio que se ejecute en cada flujo de desarrollo, detectando cuándo un cambio implica actualizar la documentación sin forzar cambios en cada tarea.

## Análisis

### 1. Fundamentos de DDD aplicables a la revisión

DDD distingue diseño estratégico (subdominios, contextos delimitados, lenguaje ubicuo, mapas de contexto) de diseño táctico (entidades, objetos de valor, agregados, servicios de dominio, repositorios, factorías) [1][2]. El lenguaje ubicuo es la piedra angular: los nombres del código deben coincidir con los términos del experto del dominio; términos genéricos como `Entity`, `Item` o `Data` son señal de alarma [3][4]. Una frontera que no se hace cumplir es solo una sugerencia: la deriva entre contextos se detecta con reglas de dependencia y acoplamiento, no con buena voluntad [5].

Las revisiones de arquitectura con DDD existentes evalúan tres capas —estratégica, táctica y arquitectónica— con criterios como: el dominio no depende de infraestructura, los agregados hacen cumplir invariantes, los objetos de valor son inmutables, los límites de contexto están documentados y no hay fuga de modelo entre contextos [3][6][7]. La evaluación holística añade consistencia terminológica entre artefactos, alineación entre fronteras de agregados y de contextos, completitud (cada evento con definición) y análisis de acoplamiento inter-contexto [7].

### 2. Cómo se evalúa la arquitectura de sistemas

La industria ofrece un espectro de métodos, del más pesado al más ligero:

- **ATAM (SEI):** el método de referencia; evalúa la arquitectura frente a atributos de calidad mediante escenarios, produciendo riesgos, puntos de sensibilidad y puntos de compromiso. Una evaluación típica dura 3-4 días con equipo entrenado y stakeholders [8][9].
- **Revisión por escenarios y por expertos:** preguntas «¿qué pasa si…?» sobre vistas de descomposición, despliegue, datos e integración; la variante más ligera es un grupo pequeño de arquitectos desafiando supuestos [10].
- **Checklists calibradas:** instrumentos que codifican las dimensiones no funcionales relevantes para la clase del sistema y se refinan con cada incidente de producción; el riesgo es la revisión ceremonial de tachar casillas [11].
- **Funciones de idoneidad (fitness functions):** assertions automatizadas sobre características arquitectónicas («el contexto Billing no importa de Shipping salvo por su interfaz publicada») que corren en CI y fallan ante violaciones [5][12].
- **Funciones de idoneidad agénticas:** extensión reciente donde un agente evalúa evidencia acotada contra rúbricas versionadas y devuelve veredicto estructurado con confianza y escalado a humanos; cubre el espacio entre la regla determinista y la revisión humana —justo donde vive el juicio arquitectónico [13].
- **Revisión de impacto arquitectónico del cambio:** medir el delta antes→después de un PR (acoplamiento, ciclos, cohesión, radio de explosión) en lugar de revisar líneas; la señal estructural es invisible en un diff línea a línea [14].

Convergencia clara: la evaluación continua y acotada al cambio supera a la revisión periódica y exhaustiva; el juicio de un agente complementa (no sustituye) las reglas deterministas y la decisión humana [13][14].

### 3. Detección de patrones y antipatrones

La industria distingue tres niveles de anomalías, con catálogos y estrategias de detección propios [21][22][23]:

- **Smells arquitectónicos** (sobre el grafo de dependencias entre componentes): dependencia cíclica, componente dios (god component), dependencia inestable, interfaz ambigua, concentración de características, funcionalidad dispersa, estructura densa, dependencia en hub. Se detectan sobre el grafo de dependencias con algoritmos de ciclos (Tarjan SCC, DFS) y umbrales de tamaño/acoplamiento; herramientas de referencia: Arcan y Designite [21][22][24].
- **Smells de diseño** (violaciones de principios OO): abstracción imperativa/innecesaria/multifacética, encapsulación deficiente, modularización rota/insuficiente/en hub, jerarquías anchas/profundas/rotas, feature envy. Requieren análisis de código más profundo que las métricas puras [22][23].
- **Smells de implementación** (los clásicos de Fowler): método largo, clase grande, lista de parámetros larga, data clumps, primitive obsession, shotgun surgery, etc. Detectables por análisis estático con umbrales configurables [25].
- **Antipatrones de frontera y juicio** (donde las herramientas deterministas no llegan): fuga de tipos entre contextos, monolito distribuido, abstracción prematura, lava flow, modelo de dominio anémico. Los detectores basados en agentes catalogan ~107 patrones y combinan detección determinista (p. ej., Tarjan para ciclos) con un archivo de intención declarada (`intent.yaml`) contra el que evaluar violaciones de capa [26].

Mejores prácticas convergentes para la detección:

1. **Declarar la intención primero:** la detección de violaciones solo es posible contra una arquitectura declarada (reglas, fronteras, capas) —sin ella no hay «violación», solo forma [5][26].
2. **Combinar determinismo y juicio:** lo mecánicamente decidible (ciclos, tamaño, dependencias prohibidas) lo cubren reglas; lo semántico (¿este nombre pertenece al lenguaje ubicuo?, ¿este módulo mezcla dos responsabilidades del dominio?) lo evalúa el agente con rúbrica [13][26].
3. **Umbrales calibrados, no universales:** los umbrales fijos (p. ej., 27 000 LOC para god component) se sustituyen por valores relativos al sistema [22].
4. **Reportar como orden de reparación:** el hallazgo útil incluye regla violada, objetivo, restricciones y validación —no un log vago [27].

### 4. Formatos y estructuras de documentación

- **arc42:** la plantilla de referencia para documentación de arquitectura: 12 secciones (introducción y metas, restricciones, contexto y alcance, estrategia de solución, vista de bloques, vista de ejecución, despliegue, conceptos transversales, decisiones, requisitos de calidad, riesgos y deuda técnica, glosario). Su valor no es el peso sino que «cada tipo de información tiene un cajón»; se adapta a sistemas pequeños reduciendo secciones, y su sección 12 es justamente el lenguaje ubicuo [28][29].
- **C4:** cuatro niveles de zoom (contexto → contenedor → componente → código); los niveles 1-2 dan el 90 % del valor y el nivel 4 se autogenera o se omite. Se integra con DDD mapeando dominio→contexto, contexto delimitado→contenedor, agregados→componentes [19][20][30].
- **ADR:** registros de decisión numerados en el repo (el proyecto ya tiene `docs/decisions/` con este rol) [31].
- **Documentación viva:** los glosarios vivos por contexto delimitado y el anclaje doc↔código son los patrones centrales de Martraire [15]; los invariantes prácticos son: un hogar por hecho, indexación obligatoria, superseder en lugar de reescribir, y anclas con huella del código para detectar deriva [16][17].
- **Extracción desde el código:** la documentación arquitectónica puede extraerse del propio código (puntos de entrada, operaciones de dominio, eventos) para reducir el trabajo manual de mantenerla [18].

Para el proyecto, la estructura que encaja con sus convenciones (un documento por cosa, índice, formatos ligeros al estilo de un arc42 reducido):

```
docs/domains/
  README.md            — índice de dominios (obligatorio: «indexado o no existe»)
  NNN-slug.md          — un documento por dominio/contexto
```

Cada documento de dominio con secciones planas (consistencia de formatos del proyecto): propósito, lenguaje ubicuo (glosario término→definición→elemento de código ancla), modelo (entidades, invariantes), fronteras (qué entra y qué no, relaciones con otros dominios), decisiones relevantes (enlaces a `docs/decisions/`) y estado de salud (última revisión, divergencias conocidas).

### 5. Evaluación de la PoC

**La aplicación.** `app.js` es un objeto `App` monolítico (~290 líneas) que mezcla: modelo de dominio (tarea con `id`, `text`, `done`; invariantes como «no hay tareas vacías»), persistencia (`localStorage`), estado de UI (`editingId`, `filter`) y renderizado DOM. En términos de smells: es un candidato a *feature concentration* (un componente realiza más de una preocupación arquitectónica: dominio + infraestructura + presentación) y, en vocabulario de Evans, al antipatrón *smart UI* [2][22]. La intuición del usuario (separar vista/modelo/controlador) apunta a una separación real; en DDD sería aislar la capa de dominio de aplicación e infraestructura. Para una PoC deliberadamente vanilla sin framework la fusión es defensible como decisión de simplicidad, pero el flujo no produce ningún artefacto que la haga explícita ni la evalúe.

**El proceso.** La épica documenta decisiones transversales; cada tarea lleva plan técnico y suite esperada. Faltan: un glosario del dominio («tarea», «pendiente», «filtro» se usan sin definición formal), un artefacto que describa el modelo de dominio, y cualquier paso que revise si la estructura sigue siendo adecuada al crecer.

### 6. Opciones de encaje

- **Un solo skill combinado** (revisión + documentación): acopla dos responsabilidades con entradas y salidas distintas.
- **Dos skills separados, revisión bajo demanda:** la revisión se invoca explícitamente sobre un dominio; la documentación corre tras cada flujo de desarrollo.
- **Dos skills separados, ambos en el ciclo:** revisión y documentación tras cada tarea de desarrollo —coste alto por tarea.
- **Revisión como paso del skill `desarrollo`:** mezcla el pipeline de implementación con una evaluación de distinto alcance.

## Evaluación comparativa

### Coste por tarea
- **Combinado:** medio-alto; ejecuta ambas cosas siempre.
- **Separados, revisión bajo demanda:** bajo; la revisión solo corre cuando el dominio lo amerita.
- **Separados, ambos en ciclo:** alto; la revisión completa por tarea es desproporcionada.

### Fidelidad a las convenciones del proyecto
- **Combinado:** baja; un skill con dos salidas rompe la responsabilidad única que siguen los demás skills.
- **Separados:** alta; encaja con `decisiones-diseno` (paso tras tareas con cambios estructurales) y con el enrutado por tipo de `ejecutar-tareas`.

### Capacidad de detectar deriva
- **Separados, revisión bajo demanda:** media; depende de que alguien la invoque. Mitigable si la documentación de dominio —que sí corre en el ciclo— actúa como sensor: al detectar divergencia entre doc y código, recomienda una revisión de arquitectura.

## Recomendación

**Dos skills separados:** `revisar-arquitectura` (bajo demanda, evalúa un dominio con rúbrica DDD y produce un informe con mejoras priorizadas) y `documentar-dominio` (invocado al cerrar cada flujo de desarrollo, mantiene `docs/domains/` y detecta divergencias que ameriten actualización o una revisión de arquitectura).

Justificación:

- Respeta la responsabilidad única de los skills y el enrutado existente.
- La documentación viva es el sensor continuo barato; la revisión es la evaluación profunda ocasional que el sensor dispara. Es la división que la industria hace entre regla continua y juicio agéntico [13].
- La revisión queda sin sesgo de arquitectura concreta: evalúa el dominio con DDD (lenguaje ubicuo, fronteras, invariantes, capas, smells) y puede llegar a conclusiones como separar modelo/vista/controlador sin prescribirlas.
- El encaje natural de `documentar-dominio` es el paso de cierre de `ejecutar-tareas` para tareas tipo `desarrollo`, en la misma fase en que hoy puede invocarse `decisiones-diseno` (el ejecutor aún no lo cablea; ambas invocaciones se añadirían al cierre): tras el diff, evaluar si el cambio altera el modelo, el glosario o las fronteras, y solo entonces actualizar.
- La opción de hacer la revisión un paso del skill `desarrollo` se descarta: ese especialista orquesta el pipeline de implementación de una sola tarea, y una evaluación de arquitectura del dominio tiene otro alcance, otras entradas y otro ritmo.

## Formato o procedimiento

### `documentar-dominio`

- **Entrada:** el diff de la tarea de desarrollo completada y `docs/domains/`.
- **Salida:** documentación actualizada solo si el diff altera conceptos, invariantes o fronteras del dominio; en caso contrario, veredicto explícito de «sin impacto». Si detecta divergencia estructural, recomienda invocar `revisar-arquitectura`.
- **Reglas:** un hogar por hecho; índice obligatorio; anclas a elementos de código por nombre; superseder en lugar de reescribir [16][17].

### `revisar-arquitectura`

- **Entrada:** el dominio a evaluar (código + documentación de dominio + decisiones).
- **Salida:** informe con veredicto por criterio —lenguaje ubicuo, capas, fronteras, invariantes, acoplamiento, smells del catálogo (§3)— con evidencia, hallazgos priorizados y recomendaciones como orden de reparación; sin implementar cambios.
- **Reglas:** rúbrica abierta y extensible; los hallazgos derivan en tareas vía `crear-tareas` o en decisiones vía `decisiones-diseno`.

## Limitaciones

- La evaluación de la PoC es del agente; no hay criterio externo que la contradiga ni la confirme.
- Las herramientas citadas (`livedocs`, `archfit`, skills DDD de terceros, catálogos de antipatrones para agentes) son recientes; su adopción real es difícil de medir desde las fuentes.
- Los catálogos de smells provienen en su mayoría del ecosistema Java/OO; su aplicación a JavaScript vanilla requiere adaptar umbrales y estrategias.
- La integración concreta (punto exacto de invocación en `ejecutar-tareas`) es una propuesta a validar al construir los skills.

## Referencias

- [1] Microsoft Learn, «Use Tactical DDD to Design Microservices» — learn.microsoft.com/azure/architecture/microservices/model/tactical-domain-driven-design
- [2] Eric Evans, *Domain-Driven Design* (2003) — fabiofumarola.github.io/nosql/readingMaterial/Evans03.pdf
- [3] svngoku/coding-agents-skills, «DDD code review criteria» — github.com/svngoku/coding-agents-skills
- [4] DEV Community, «Strategic vs Tactical DDD» — dev.to/godofgeeks/strategic-vs-tactical-ddd-2amd
- [5] «Architecture Fitness Functions for Bounded Contexts» — learninternetgrow.com/bounded-context-fitness-functions/
- [6] skills.rest, «evaluate-ddd» — skills.rest/skill/evaluate-ddd
- [7] forceinjection/domain-driven-design-skills, «ddd-model-review» — github.com/forceinjection/domain-driven-design-skills
- [8] SEI/CMU, «ATAM: Method for Architecture Evaluation» (2000) — sei.cmu.edu/library/atam-method-for-architecture-evaluation/
- [9] SEI/CMU, «Architecture Tradeoff Analysis Method Collection» — sei.cmu.edu/library/architecture-tradeoff-analysis-method-collection/
- [10] Software Architecture Guild, «Architecture Evaluation» — software-architecture-guild.com/guide/architecture/validation/architecture-evaluation/
- [11] Ascendion Engineering, «Architecture Review Checklist» — ascendion.engineering/checklists/architecture/
- [12] InfoQ, «Fitness Functions for Your Architecture» — infoq.com/articles/fitness-functions-architecture/
- [13] InfoQ, «Agentic Fitness Functions» — infoq.com/articles/agentic-fitness-functions-evolutionary-architecture/
- [14] jonatasfernandespimenta/arch-fitness-review — github.com/jonatasfernandespimenta/arch-fitness-review
- [15] Cyrille Martraire, *Living Documentation* — informit.com/store/living-documentation-continuous-knowledge-sharing-by-9780134689449
- [16] ejklock/living-docs-skill — github.com/ejklock/living-docs-skill
- [17] gkastanis/livedocs — github.com/gkastanis/livedocs
- [18] Nick Tune, «Enterprise-wide Software Architecture as DDD Living Documentation» — medium.com/nick-tune-tech-strategy-blog
- [19] kinhluan/skills, «C4 & DDD Mapping Guide» — github.com/kinhluan/skills
- [20] arnaudp.dev, «How C4 Model + DDD Fixed My Team's Architecture Diagrams» — arnaudp.dev
- [21] Arcan Documentation, «Architectural smells» — docs.arcan.tech/latest/architectural_smells/
- [22] Designite, «Features: architecture smells» — designite-tools.com/docs/features.html
- [23] T. Sharma, «Designite — A Software Design Quality Assessment Tool» — tusharma.in/preprints/Designite_preprint.pdf
- [24] «A Systematic Mapping Study on Architectural Smells Detection» (JSS 2020) — kblincoe.github.io/publications/2020_JSS_ArchSmellsSMS.pdf
- [25] refactoring-assistant/StaticNose — github.com/refactoring-assistant/StaticNose
- [26] johncoleman-thoughtworks/codeup-vscx — github.com/johncoleman-thoughtworks/codeup-vscx
- [27] alexei-led/archfit — github.com/alexei-led/archfit
- [28] arc42, «Template Overview» — arc42.org/overview/
- [29] arc42, «Documentation» — arc42.org/documentation/
- [30] bitsmuggler, «arc42 + C4 documentation example» — github.com/bitsmuggler/arc42-c4-software-architecture-documentation-example
- [31] Codelit, «Software Architecture Documentation: C4, ADRs and Living Docs» — codelit.io/blog/software-architecture-documentation-c4-adr-guide
