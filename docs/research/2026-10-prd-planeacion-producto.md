# PRD y planeación de producto

**Fecha:** 2026-10 · **Profundidad:** profunda (múltiples fuentes por afirmación) · **Propósito:** determinar si el sistema necesita un PRD por hito o épica, qué contendría, dónde viviría y en qué punto de los flujos se produce y consume.

## Contexto

La observación de origen: quien planea una tarea genera también los casos de uso que anclan su suite — `planear-implementacion` (paso 9) «extrae los casos de uso del objetivo y los criterios de calidad de la tarea», es decir, los inventa y luego deriva las pruebas de ellos. La épica (D019) declara objetivo, alcance, piezas, plan técnico y criterio de cierre: todo es de ingeniería; nada declara el comportamiento esperado del producto. La documentación de producto (D024/D025) describe lo construido —es un sensor de cierre—, no lo intentado.

## Análisis externo

### Qué contiene un PRD

- **Responde qué y por qué, nunca cómo:** problema, usuarios, casos de uso, comportamiento esperado, criterios de éxito y fuera de alcance. La implementación pertenece a documentos de ingeniería que lo referencian (Atlassian; mdkit: «lo que no está en la lista: detalles de implementación, arquitectura técnica, esquemas de base de datos — pertenecen al design doc que referencia al PRD»; Docsio: «el PRD responde el WHAT y el WHY; el HOW es del design doc y los tickets»).
- **Secciones convergentes entre fuentes:** propósito y problema; usuarios/personas; casos de uso y propuesta de valor; funcionalidades y comportamiento; historias o jobs; flujos de usuario; criterios de éxito y métricas; criterios de release; riesgos; requisitos no funcionales; supuestos, dependencias y restricciones; fuera de alcance (Figma, Docsio, Perforce).
- **Las 10 preguntas de Cagan** para evaluar la oportunidad antes de construir —problema, para quién, tamaño, alternativas, diferenciador, por qué ahora, go-to-market, métricas, factores críticos, recomendación go/no-go— y su distinción de niveles: el MRD describe la oportunidad, el PRD describe el producto que la atiende, y el PRD describe un release concreto a lo largo del roadmap (SVPG). Nuestro sistema ya reparte esto: la propuesta cubre problema/oportunidad/alternativas y el roadmap cubre dirección; falta el nivel «producto de este conjunto».
- **El antipatrón semántico central:** la solución disfrazada de problema —«el usuario necesita un botón de exportación» es una solución; el problema es lo que el usuario pierde hoy— (mdkit).

### Cuándo se escribe y su relación con épicas y tareas

- **La secuencia canónica de descomposición es PRD → épicas → historias con criterios de aceptación:** primero el límite del release, luego los flujos mayores como épicas, luego las unidades de valor con criterios observables y dependencias (Codalio; Perforce: el PRD ágil es un artefacto vivo con historias, épicas y criterios de aceptación).
- **Amazon lo valida desde 2004 con PR/FAQ (Working Backwards):** escribir el comunicado de prensa del producto terminado y sus preguntas frecuentes ANTES de asignar ingenieros; el documento describe la experiencia del cliente, no las features; la mayoría de los PR/FAQ no se aprueban —y es una virtud: mata ideas baratas antes de gastar desarrollo—; se itera en decenas de borradores con revisión de liderazgo (Working Backwards LLC/Bryar-Carr; aboutamazon.com).
- **Los casos de uso y las historias son complementarios, no sinónimos:** el caso de uso es la foto completa —«todas las formas de usar el sistema para lograr un objetivo», del evento inicial al valor o al fallo—; la historia es un placeholder para conversación, acotada a un timebox. Tratar la historia como especificación la vicia (Jacobson/AISel).
- **La trazabilidad es el criterio de calidad:** los criterios de aceptación llevan ID preservados de extremo a extremo para que un fallo de test mapee de vuelta al criterio (ATDD/BDD, testland); el escenario BDD (Given/When/Then) es el flujo comprobable del caso de uso (Ken Pugh); y la documentación viva captura los requisitos —no las historias, que una vez entregadas no documentan nada (ACCU)—.

### El PRD en el desarrollo conducido por agentes

- **Spec-Driven Development es hoy práctica establecida para agentes:** GitHub Spec Kit operacionaliza Spec → Plan → Tasks → Implement; la spec describe journeys de usuario, experiencias y qué es éxito —no stack ni arquitectura— y es un artefacto vivo; cada fase produce un artefacto Markdown que alimenta a la siguiente, dando al agente contexto estructurado en lugar de prompts ad hoc (github.blog, github/spec-kit).
- **El mapeo es directo con nuestro sistema:** nuestra épica es el Plan, nuestras tareas son las Tasks, `ejecutar-implementacion` es el Implement. La pieza que falta es exactamente la Spec: el documento de producto que precede al plan.
- **La ceguera de contexto es el fallo documentado:** los artefactos intermedios de un agente pueden ser coherentes entre sí y a la vez incompatibles con el repositorio real; el grounding por fase —probar los artefactos contra evidencia del repositorio— mejora la calidad medida (arXiv 2604.05278, Spec Kit Agents). Un PRD con casos de uso declarados es el grounding de la planeación de producto.
- **La spec para agentes debe ser precisa y auto-comprobable:** criterios de aceptación pass/fail, restricciones explícitas y un «hecho» verificable sin preguntar —«el agente ejecuta lo que escribiste, no lo que quisiste»— (Sfora); y compacta: el contexto del agente es finito, cada palabra del PRD compite con el código (Specd).
- **La cadena de persistencia distingue lo durable de lo temporal:** PRD persistente (requisitos de negocio, vive en `docs/prds/`) → especificación temporal (guía de implementación, se archiva al usarse) → implementación. El PRD es registro histórico para referencia humana y del agente solo cuando se le referencia explícitamente (CodeSignal, Foundations of Spec-Driven Development).
- **Pipeline con evidencia primero:** verificar cada nombre contra el código vivo antes de escribir los requisitos reduce los símbolos alucinados; la validación precede a la implementación (rashee1997/prd-pipeline).

### Ciclo de vida

- **Artefacto vivo por etapas:** una página en descubrimiento (brief del problema), solución en diseño, ejecución en entrega; evoluciona con el ciclo, no se escribe de una vez (Reforge).
- **El antipatrón de fin de vida:** no actualizar el PRD cuando empieza el desarrollo lo convierte en mentira (AgileSeekers). La gestión por estados —activa, completada, archivada— con actualización regular del estado es la práctica documentada (projectrules.ai).
- **Si la feature cambia después:** se parte del PRD (¿siguen vigentes los requisitos de negocio?) y se genera una especificación nueva, sin editar la vieja (CodeSignal) — el mismo criterio de estabilidad temporal que el proyecto ya aplica a sus documentos de entrada.

## Análisis interno

1. **Los casos de uso nacen tarde y auto-referenciados:** los propone el planner de cada tarea desde su propio objetivo (`planear-implementacion`, paso 9). Nadie los valida contra una intención de producto; dos tareas de la misma épica pueden inventar vocabularios de comportamiento distintos, y la suite —el contrato de aceptación— queda anclada a casos que el propio planner redactó.
2. **La épica no tiene capa de producto:** su plan técnico es guía de arquitectura; el «qué hace el producto» queda implícito en piezas y objetivo. El criterio de cierre es de ingeniería (piezas completas), no de producto (comportamiento entregado).
3. **`documentar-producto` llega después:** ancla escenarios a la suite construida —no puede ser dueño de los casos de uso antes de planear—. Pero es el destino natural de la trazabilidad: el escenario que documenta debería remontar a un caso de uso declarado antes de planear.
4. **La propuesta muere pronto:** su ciclo termina al aprobarse y sus borradores se promocionan; el conocimiento de producto que contiene no tiene un hogar que viva mientras el conjunto se construye.

## Evaluación comparativa (dónde vive)

- **Como sección de la épica:** un solo artefacto, pero mezcla audiencias y ritmos —el PRD es de producto y vivo, el plan técnico de ingeniería y estable—; la épica ya es densa y su plantilla no distingue qué/por qué de cómo.
- **En la propuesta:** su ciclo termina al aprobarse; el PRD debe vivir mientras el conjunto vive y alimentar tareas que llegan después de la aprobación.
- **Documento propio por épica (`docs/prd/NNN-slug.md`):** separa qué/por qué de cómo como la industria; coincide con la cadena de persistencia (PRD durable, plan y tareas de ejecución); da a los casos de uso un dueño con ciclo propio y un hogar trazable. **Elegido.**

## Recomendación

1. **Artefacto:** un PRD por épica —o por hito ligero con conjunto— en `docs/prd/NNN-slug.md`, con: problema y objetivo de producto, usuarios, **casos de uso en lenguaje de negocio con ID**, comportamiento esperado por área de funcionalidad, criterios de éxito y fuera de alcance de producto. Sin arquitectura, sin tareas, sin rutas —el cómo vive en la épica y en los planes—. Compacto: el PRD compite por el contexto del agente con el código.
2. **Producción:** al crear la épica — `planificar`, en modo promoción o bajo demanda, la redacta con la información de la propuesta y de las piezas, y la somete a la puerta humana junto con la épica. La mayoría de los PRD no sobrevive intacta a esta puerta: es la virtud del PR/FAQ de Amazon aplicada al conjunto.
3. **Consumo:** `planear-implementacion` toma los casos de uso del PRD de la épica y baja los que la tarea toca —los extrae del PRD, no de su propio objetivo—; si la tarea necesita uno que el PRD no declara, es una laguna que se eleva o actualiza el PRD, nunca se inventa. La suite traza cada expectativa a su caso de uso con el ID del PRD.
4. **Trazabilidad de extremo a extremo:** caso de uso del PRD → expectativa de la suite → escenario de `documentar-producto` → test, con el ID preservado en toda la cadena (patrón ATDD); un fallo de test remonta a la intención de producto que falló.
5. **Ciclo de vida:** vivo mientras el conjunto vive —las desviaciones de ejecución que cambian comportamiento actualizan el PRD en el mismo cierre, con el sensor correspondiente—; al agotarse la épica, el PRD se archiva o su contenido se fusiona con la documentación de producto, según decida el cierre. Los componentes decididos sin implementar usan el marcador «pendiente de implementación» ya establecido en la guía de estilo.
6. **Materialización:** la tarea 125 crea el skill que produce y mantiene el PRD según esta recomendación.

## Limitaciones

- La práctica externa proviene de contextos con equipos de producto dedicados y releases coordinados; la adaptación a un sistema conducido por agentes es una extrapolación justificada por el auge del SDD (Spec Kit), no una copia.
- El coste de mantener el PRD sincronizado con las desviaciones de ejecución queda para la materialización (tarea 125); la recomendación lo asigna al sensor de cierre pero su calibración —evitar que el PRD sea una carga— es un riesgo abierto.
- La medición de éxito (métricas de producto) está fuera del alcance del sistema actual: el PRD las declara, pero nada las verifica automáticamente.

## Referencias

- Atlassian, «What is a Product Requirements Document?» — atlassian.com/agile/product-management/requirements
- Figma, «How to create a product requirements document» — figma.com/resource-library/product-requirements-document
- mdkit, «How to write a PRD» — mdkit.io/blog/how-to-write-prd
- Docsio, «PRD template» — docsio.co/blog/prd-template
- Perforce, «How to write a PRD» — perforce.com/blog/alm/how-write-product-requirements-document-prd
- Marty Cagan, «Assessing Product Opportunities» y «How To Write a Good PRD» — svpg.com
- Working Backwards (Bryar-Carr), «The PR/FAQ process» — workingbackwards.com; aboutamazon.com
- Codalio, «PRD to Jira user stories» — codalio.com/blog/prd-to-jira-user-stories
- Jacobson/Ivar Jacobson, «Integration of Use Cases and User Stories» — ivarjacobson.com; AISel, «Synergistically Employing User Stories and Use Cases»
- Ken Pugh, «Use Case Foundation and ATDD/BDD» — kenpugh.com
- ACCU Overload, «User Stories and BDD, Part 4» — accu.org
- GitHub, «Spec-driven development with AI» — github.blog; github/spec-kit
- arXiv 2604.05278, «Spec Kit Agents: Context-Grounded Agentic Workflows»
- Sfora, «Writing PRDs for AI coding agents» — sfora.ai; Specd — specd.app
- CodeSignal, «PRD as Persistent Documentation» — codesignal.com
- Reforge, «Write and update PRDs» — reforge.com; projectrules.ai; AgileSeekers
- `docs/tasks/124-investigacion-prd-planeacion.md` — tarea que motiva la investigación.
