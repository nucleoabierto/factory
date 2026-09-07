# Investigación por agentes de IA

> **Fecha:** 2026-09

## Propósito

Definir principios, estructura y criterios de calidad para que un agente de IA realice investigaciones: descubrimiento, análisis, síntesis y documentación. Servir de base para un skill `investigar` agnóstico al arnés que sea útil tanto para investigaciones técnicas (mejores prácticas, formatos, convenciones) como para investigaciones de flujos, procesos y especificaciones de dominios.

## Contexto

El proyecto ha acumulado investigaciones en `docs/research/` como parte de su flujo de trabajo: cada vez que una tarea requiere descubrir opciones, comparar enfoques o recopilar mejores prácticas, se produce un documento de investigación antes de actuar. Hasta ahora, el proceso de investigación ha sido implícito: el agente lo ejecutaba siguiendo el patrón de las investigaciones anteriores, sin un skill que lo formalice. La tarea 030 pide explicitar ese proceso en un skill `investigar` que sea útil para la tarea 031 y para futuras investigaciones, y que sea portable a otros proyectos.

## Qué es una investigación

Una investigación es un proceso deliberado de búsqueda, análisis y síntesis que produce un documento con conclusiones justificadas, referencias verificables y marca temporal. No es una respuesta de chat ni un resumen de una sola fuente: es un razonamiento estructurado que parte de una pregunta, recopila evidencia de múltiples fuentes, la evalúa y llega a una recomendación o a una caracterización del estado de un tema.

La marca temporal es esencial porque la investigación tiene validez cuando usa fuentes, pero las fuentes pueden dejar de ser válidas cuando hay nuevas investigaciones que presentan nueva evidencia. La fecha permite al lector valorar si el conocimiento sigue vigente o si conviene revalidar.

La investigación se distingue de otras actividades del agente:

- **Respuesta de chat:** responde una pregunta con conocimiento del modelo o con una búsqueda rápida. No produce un documento ni justifica sus fuentes de forma estructurada.
- **Tarea:** ejecuta un cambio en el proyecto (código, configuración, documento). La investigación produce conocimiento, no artefactos.
- **Decisión de diseño:** registra una elección justificada. La investigación la precede y la alimenta, pero no es la decisión en sí.

## Dos tipos de investigación

Las investigaciones se agrupan en dos tipos, según la pregunta que responden. El tipo determina el procedimiento, las condiciones de parada y el formato de salida.

### Investigación abierta (comparación de opciones)

El agente parte de una pregunta amplia con múltiples respuestas posibles y debe descubrir qué aspectos investigar, comparar enfoques y proponer una recomendación.

**Características:**

- Búsqueda divergente: el agente amplía el alcance a medida que descubre nuevos ángulos.
- Sin definición cerrada de «hecho»: las condiciones de parada son un problema de diseño.
- Calidad medida por cobertura, fidelidad de citas y calibración de la incertidumbre.
- El plan debe ser revisable: lo que el agente aprende al principio puede cambiar lo que investiga después.

**Ejemplos:** «¿Qué biblioteca de autenticación usar?», «¿Qué formato de configuración adoptar?», «¿Qué arquitectura de mensajería conviene a este sistema?».

### Investigación dirigida (síntesis de mejores prácticas o especificación de un dominio)

El agente parte de una pregunta concreta sobre mejores prácticas, convenciones o especificaciones, y debe recopilar evidencia de múltiples fuentes y sintetizarla en principios estructurados. Cuando la pregunta pide especificar un dominio para un componente, la síntesis se organiza por categorías del dominio y se añaden secciones extensibles (`Alcance`, `Entradas`, `Salidas`) a la plantilla.

**Características:**

- Búsqueda convergente: el agente se enfoca en recopilar y sintetizar.
- Definición más clara de «hecho»: la síntesis está respaldada por las fuentes o no lo está.
- Calidad medida por precisión, fidelidad de citas y solidez de la evidencia.
- El plan es más lineal: buscar, leer, sintetizar.

**Ejemplos:** «¿Cuáles son las mejores prácticas para manejo de errores?», «¿Qué debe validar un linter de Python?», «¿Qué normativa aplica a la corrección de textos en español?».

## Principios de la investigación por agentes

### 1. Trazabilidad de fuentes

Cada afirmación sustantiva del documento final debe tener una fuente atribuible. El lector debe poder verificar de dónde viene cada afirmación. La investigación sin trazabilidad es texto plausible sin valor de verificación.

La literatura es contundente: el modo de fallo más común de los agentes de investigación no es encontrar información, sino **perder la atribución** al sintetizar [1][2]. El agente hace buena investigación pero, al escribir el informe, las conexiones entre afirmaciones y fuentes se diluyen o se falsean.

**Mecanismo:** registrar la fuente junto con cada afirmación desde el momento de la extracción, no reconstruir la atribución al final. Si una afirmación no tiene fuente, no entra en el documento o se marca explícitamente como inferencia del agente.

### 2. Compresión al leer

El agente debe extraer y comprimir la información relevante en cuanto la lee, no acumular texto en bruto para resumir al final. Esto mantiene el contexto compacto, preserva la conexión afirmación-fuente desde el principio y permite leer más fuentes antes de que la presión de contexto se acumule [1].

El patrón «comprimir al leer» (*compress-as-you-read*) es uno de los patrones de mayor impacto en el diseño de agentes de investigación: el contexto de trabajo del agente contiene una lista creciente de afirmaciones estructuradas con su fuente, no documentos en bruto [1].

### 3. Preferencia por fuentes primarias

- **Primaria sobre secundaria:** la especificación original sobre el artículo que la resume. El comunicado de prensa sobre la noticia que lo reporta.
- **Reciente sobre antigua:** para preguntas sobre estado actual, datos del año en curso, no datos de hace tres años extrapolados.
- **Específica sobre genérica:** una página que aborda la pregunta exacta sobre un artículo general que la menciona de paso.
- **Autorizada sobre agregadora:** el blog de la empresa sobre el agregador que lo republicó.

Sin estas preferencias explícitas, el agente tiende a tomar lo que la búsqueda devuelve primero, que suele estar optimizado para SEO, no para precisión [1].

### 4. Calibración de la incertidumbre

El agente debe reconocer y declarar lo que no sabe. Una investigación honesta marca las lagunas, las afirmaciones disputadas y los límites del análisis. Inflar el conocimiento con afirmaciones no verificadas erosiona la confianza que la trazabilidad de fuentes construye.

La regla «sin fuente, sin afirmación» es la versión estricta: si no hay fuente que respalde una afirmación, la afirmación no entra en el documento. El agente tiene permiso explícito para omitir y para decir «no se pudo determinar» [1].

### 5. Condiciones de parada explícitas

Un agente de investigación sin condiciones de parada tiende a dos modos de fallo: parar demasiado pronto (sintetizar después de 3 búsquedas cuando 7 habrían producido un documento mucho mejor) o parar demasiado tarde (caer en una espiral de investigaciones cada vez más específicas hasta agotar el presupuesto, produciendo un documento inflado y de baja señal) [3][4].

Las condiciones de parada efectivas combinan varias señales:

- **Cobertura:** si la pregunta se descompuso en subpreguntas, parar cuando todas están investigadas a profundidad aceptable.
- **Rendimientos decrecientes:** si las búsquedas nuevas devuelven las mismas fuentes o afirmaciones ya cubiertas, es señal de parar [3].
- **Presupuesto:** un techo de llamadas a herramientas o de tiempo evita espirales patológicas.
- **Decisión del usuario:** el usuario puede definir la profundidad deseada antes de empezar.

### 6. Separación de exploración y síntesis

Explorar y sintetizar son tareas cognitivas distintas. La exploración requiere formular búsquedas, leer resultados, evaluar relevancia. La síntesis requiere integrar hallazgos, resolver conflictos, estructurar el documento. Intentar hacer ambas a la vez degrada ambas [1].

En la práctica, esto se traduce en dos fases: una fase de recopilación donde el agente busca y extrae afirmaciones con sus fuentes, y una fase de síntesis donde el agente integra las afirmaciones en un documento coherente. El skill no necesita orquestar subagentes para esto, pero sí debe separar las fases conceptualmente: primero recopilar, luego sintetizar.

### 7. Marca temporal

Toda investigación incluye una marca temporal (año-mes) que permite al lector valorar si el conocimiento sigue vigente o ha cambiado. La investigación tiene validez cuando usa fuentes, pero las fuentes pueden dejar de ser válidas cuando hay nuevas investigaciones que presentan nueva evidencia. La fecha es la referencia para decidir si conviene revalidar.

## Estructura del documento de investigación

El documento sigue una plantilla según el tipo de investigación. Las plantillas están detalladas en el skill `investigar` (`.agents/skills/investigar/references/patron-investigacion.md`), con la estructura de cada sección, ejemplos incrustados y reglas sobre cuándo usar tablas.

Las secciones obligatorias según el tipo:

- **Abierta:** Fecha, Propósito, Análisis, Recomendación, Referencias. (Contexto, Evaluación comparativa, Formato o procedimiento y Limitaciones son opcionales según la pregunta.)
- **Dirigida:** Fecha, Propósito, Hallazgos, Conclusión, Referencias. (Alcance es obligatoria cuando la pregunta especifica un dominio; Entradas, Salidas y Limitaciones son opcionales según la pregunta.)

### Sobre el uso de tablas

La evaluación comparativa usa lista anidada por defecto. Usar tabla solo cuando las celdas contienen una o dos palabras y la estructura es regular. Si una celda necesita más de un par de frases, contiene listas o párrafos, o las columnas no son comparables, se sustituye por lista anidada. Esta regla sigue la guía de pulido mecánico del proyecto: una tabla no es la opción correcta cuando el texto crece dentro de las celdas.

## Criterios de calidad

Un documento de investigación de calidad cumple:

1. **Marca temporal:** incluye la fecha (año-mes) de realización, en el documento y en el nombre del archivo (`yyyy-mm-titulo.md`).
2. **Propósito claro:** el documento responde a una pregunta definida y declarada.
3. **Trazabilidad:** cada afirmación sustantiva tiene una fuente atribuible.
4. **Fuentes primarias:** prefiere fuentes primarias, recientes, específicas y autorizadas sobre secundarias, antiguas, genéricas y agregadoras.
5. **Análisis comparativo:** cuando la pregunta involucra alternativas, las evalúa contra criterios explícitos, usando lista anidada por defecto y tabla solo para datos compactos.
6. **Recomendación justificada:** la conclusión o recomendación explica por qué sobre las demás opciones.
7. **Calibración de incertidumbre:** declara lagunas, afirmaciones disputadas y límites del análisis en una sección `Limitaciones`.
8. **Estructura consistente:** sigue la plantilla según su tipo (abierta o dirigida).
9. **Redacción pulida:** pasa revisión de redacción y pulido mecánico antes de presentarse.

## Limitaciones

Esta investigación se basa en una combinación de literatura académica reciente (revisiones sobre agentes de investigación profunda, 2025-2026) y guías prácticas de la industria (entradas de blog y documentación de productos). Las fuentes académicas son prepublicaciones en arXiv y pueden no haber pasado por revisión por pares. Las fuentes de la industria reflejan la práctica de equipos que han construido sistemas de investigación en producción, pero son contenido editorial, no investigación revisada por pares.

El campo de los agentes de investigación evoluciona rápidamente: los artículos citados son de 2025 y 2026, y las recomendaciones pueden cambiar a medida que se acumula evidencia. Los principios extraídos (trazabilidad, compresión al leer, condiciones de parada) son estables porque derivan de limitaciones estructurales de los LLMs, no de implementaciones específicas.

## Referencias

- [1] Menu Agentic, «Research agents: open-ended search, citation-required outputs» — https://menuagentic.com/field-guide/research/
- [2] arXiv, «Who is the Agent to Blame? Localizing Faithfulness and Citation Mistakes in Agentic Deep Research» — https://arxiv.org/abs/2608.24306
- [3] arXiv, «When Deep Research Agents Stagnate: Enhancing Reasoning with Retrieval-Aware Agent Control» — https://arxiv.org/abs/2608.15191
- [4] arXiv, «Evidence-Carrying Termination for Tool-Using LLMs» — https://arxiv.org/abs/2608.23623
- [5] arXiv, «Deep Research Agents: A Systematic Examination And Roadmap» — https://arxiv.org/abs/2506.18096
- [6] arXiv, «Deep Research: A Survey of Autonomous Research Agents» — https://arxiv.org/abs/2508.12752
- [7] arXiv, «Explore Before Committing: Hypothesis-Guided Search for Deep Research Agents» — https://arxiv.org/abs/2609.01294
- [8] arXiv, «From Fluent to Verifiable: Claim-Level Auditability for Deep Research Agents» — https://arxiv.org/abs/2602.13855
- [9] AI Skill Certs, «Diagnosing Attribution Loss in Synthesis» — https://aiskillcerts.com/concepts/agentic-architecture/diagnosing-attribution-loss-in-synthesis
- [10] Pickaxe, «How to Build an AI Research Agent That Cites Sources» — https://pickaxe.co/post/ai-research-agent
