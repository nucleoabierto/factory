# Métodos de priorización objetiva para líneas de trabajo

> **Fecha:** 2026-10

## Propósito

Comparar los métodos de priorización objetiva aplicables a líneas de trabajo de producto y recomendar el mecanismo que conviene a un sistema donde un agente propone el orden y un humano lo valida, sin datos de mercado ni de usuarios disponibles.

## Contexto

Factory ordena las líneas de trabajo del *roadmap* con criterio cualitativo: el orden es de inserción y no se revisita en los momentos en que la información mejora —el cierre de un conjunto y la incorporación de una demanda—. La propuesta de priorización declarada introduce una capacidad que compara líneas y produce una propuesta de orden justificada, validada por el usuario. Esta investigación alimenta su diseño: qué atributos comparan las líneas, con qué escala, cuándo se dispara la revisita y cómo queda declarada la justificación.

## Análisis

### 1. WSJF — *Weighted Shortest Job First*

El coste de demora —valor para el usuario-negocio, criticidad temporal y reducción de riesgo u habilitación de oportunidad— dividido por el tamaño del trabajo [1][2]. SAFe lo estima de forma *relativa* con Fibonacci modificado: los ítems se comparan entre sí, no contra unidades absolutas [2]. En un sistema de flujo la priorización es continua —«job sequencing produces best results rather than theoretical ROI»— e ignora costes hundidos [1].

- **Ventajas:** dimensión temporal explícita —saca a la superficie el trabajo cuyo valor decae—; el eje riesgo/habilitación da peso al trabajo habilitador que otros métodos infra-priorizan [3]; favorece piezas pequeñas [3]; la estimación relativa no exige datos absolutos [2][4].
- **Desventajas:** más complejo de aplicar y de explicar que RICE [3]; *overkill* para backlogs pequeños [3]; el coste de demora en dólares es adivinanza sin cifras de ingreso [5].

### 2. RICE

*Reach × Impact × Confidence ÷ Effort*, con escalas cerradas: impacto 3/2/1/0.5/0.25, confianza 100/80/50 %, esfuerzo en persona-mes [6][7]. El ranking es «el punto de partida de una conversación, no la conclusión» [8].

- **Ventajas:** el factor *Confidence* penaliza estimaciones entusiastas sin evidencia [6][7]; las escalas cerradas reducen la parálisis y la falsa precisión; fácil de explicar.
- **Desventajas:** *Reach* exige contar usuarios reales por periodo [6][7] —sin datos de mercado no aplica—; *Effort* en persona-mes pide datos de equipo.

### 3. ICE y *scoring* ponderado simple

*Impact × Confidence × Ease* [3]; el *weighted scoring* genérico permite criterios a medida.

- **Ventajas:** el más simple; no exige alcance; personalizable.
- **Desventajas:** sin dimensión temporal ni de habilitación; multiplicar factores subjetivos produce apariencia de objetividad sin el rigor de las escalas de RICE [3].

### 4. MoSCoW

Categorías por consecuencia —*Must/Should/Could/Won't*— [3][9]. Responde «qué entra y qué sale de un periodo», no «en qué orden» [3].

- **Ventajas:** comprensible sin fórmula; el *Won't* documenta lo descartado.
- **Desventajas:** no ordena dentro de cada categoría ni ofrece forma transparente de decidir entre *Must* y *Should* [3] —responde una pregunta distinta—.

### 5. Comparación por pares — AHP y variantes

Ordenar por comparación binaria sistemática de ítems [10].

- **Ventajas:** relativa por naturaleza, sin unidades absolutas.
- **Desventajas:** los juicios raramente son consistentes y la derivación produce reordenamientos [10][11]; el número de comparaciones crece cuadráticamente —escala mal—.

### 6. Señales comparativas sin puntuación (práctica de agentes)

Práctica emergente para priorización por agente con control humano: comparar candidatos sobre señales declaradas —impacto, sensibilidad temporal, valor de desbloqueo, preparación, riesgo/reversibilidad— con el efecto esperado descrito en lenguaje plano; «consistency, not a fake mathematical score» [12]. La confianza se extrae de forma estructurada —el agente lista sus factores de incertidumbre— en lugar de una probabilidad cruda [13].

- **Ventajas:** diseñada para quien estima sin datos y justifica ante un revisor; la incertidumbre explícita dispara la escalación [13][14].
- **Desventajas:** menos compacta que un *score*; la comparación queda más legible pero menos resumible.

### Cuándo re-priorizar

- **Flujo continuo:** SAFe prioriza el backlog continuamente, no en eventos [1].
- **Disparadores fuera de ciclo:** escalación de cliente, pivote estratégico, cambio de dependencia [15][16][20].
- **Barrido de fondo:** revisión completa del backlog con periodicidad mensual, además del refinamiento continuo de la cabeza [16][17].
- **Salud:** re-priorizar semanal o por sprint se considera adaptativo; mensual o menos, rígido [17].

### Justificación auditable

El registro de decisión —contexto en el momento, alternativas consideradas, evidencia y sus límites, consecuencias, disparador de revisión ligado a cambios de evidencia— es el formato maduro para decisiones caras de revertir o discutibles después [18][19]. El revisor necesita el contexto completo —razonamiento, acción propuesta, datos— en el mismo punto donde aprueba [14].

## Evaluación comparativa

- **Encaje sin datos de mercado:** WSJF relativo, señales y pares encajan; RICE queda fuera por *Reach* [2][6][12]; MoSCoW no responde a orden [3].
- **Dimensión temporal y habilitación:** solo WSJF y las señales cubren ambas —*time criticality*, *risk reduction/opportunity enablement* y sus equivalentes [1][3][12].
- **Honestidad del estimador:** la confianza en escala cerrada de RICE y los factores de incertidumbre explícitos de la práctica de agentes son las dos herramientas documentadas [6][13].
- **Coste del validador:** el *score* único se revisa de un vistazo pero es opaco; las señales en lenguaje plano son más legibles y menos compactas; la decisión registrada con contexto y alternativas es el formato auditable [8][12][18].

## Recomendación

**Comparación relativa tipo WSJF adaptada, con confianza e incertidumbre explícitas y justificación por decisión.**

- Las líneas se comparan sobre un coste de demora adaptado —**valor** (qué mejora o habilita en el producto), **criticidad temporal** (qué decae si espera) y **habilitación/riesgo** (qué desbloquea de lo demás)— dividido por **tamaño**, estimado *relativamente* entre las líneas abiertas y nunca en unidades absolutas [1][2][4]. MoSCoW, *Reach* de RICE y el CoD en dólares quedan descartados por exigir datos ausentes [5][6].
- El agente acompaña cada puntuación con su **confianza** en escala cerrada —alta, media, baja— y la lista de **factores de incertidumbre**; confianza baja o tres o más factores escalan el punto a revisión explícita [6][13].
- El resultado es una **propuesta de orden con la tabla comparada y la razón por línea** —el *score* como inicio de conversación [8]—, validada por la puerta humana; el contexto de la decisión queda disponible en el punto de aprobación [14] y la decisión se registra con contexto, alternativas y límites [18][19].
- La revisita se dispara **en los dos momentos informativos** —cierre de conjunto e incorporación de demanda— siguiendo el patrón de disparadores fuera de ciclo [15][16][20], además de la invocación bajo demanda; un barrido periódico queda como opción si ninguno ocurre [16][17].

## Limitaciones

- La práctica de priorización por agentes es literatura joven e industrial —blogs de herramientas de agentes—, no un cuerpo consolidado; las señales propuestas son plausibles pero sin validación empírica [12][13].
- La estimación relativa viene de SAFe y la literatura de CoD; su traslación a un backlog gestionado por agente es inferencia del análisis.
- No se encontró literatura sobre priorización objetiva aplicada a trabajo de proceso o *skills* como unidad: «línea de trabajo» se asimila a *feature*/iniciativa.
- El nivel de formalización del resultado —*score* numérico frente a tabla cualitativa— queda como decisión de diseño de la capacidad; la investigación respalda la comparación relativa declarada, no una fórmula concreta.

## Referencias

- [1] Scaled Agile Framework, «WSJF — Extended Guidance» — framework.scaledagile.com/wsjf
- [2] Highberg, «WSJF for backlog prioritization» — highberg.com/insights/wsjf-for-backlog-prioritization/
- [3] Ideaplan, «How to Prioritize Features: 7 Frameworks Compared» — ideaplan.io/guides/how-to-prioritize-features; Fygurs, «Product Prioritization Frameworks Compared» — fygurs.com
- [4] Ten Agile, «Quantifying Cost of Delay» (*The End of Busywork*, cap. 12) — tenagile.com
- [5] Portfolio Hub, «Project Scoring Model with RICE vs WSJF vs Weighted Scoring» — portfoliohub.io
- [6] Sean McBride (Intercom), «RICE: Simple prioritization for product managers» — intercom.com/blog/rice-simple-prioritization-for-product-managers (vía espejo brennanknotts.com); Productboard, «Model common prioritization frameworks» — support.productboard.com
- [7] Productfolio, «RICE Scoring Method» — productfolio.com/rice-scoring/
- [8] Unified Product Graph, «RICE Scoring» — unifiedproductgraph.org/frameworks/rice-scoring
- [9] TryHamster, «MoSCoW vs RICE, ICE and WSJF» — tryhamster.com
- [10] PLOS One, «Uncertainty related to the inexactitude of prioritization based on consistent pairwise comparisons» — journals.plos.org/plosone/article?id=10.1371/journal.pone.0290751
- [11] Entropy (MDPI), «On the Statistical Discrepancy and Affinity of Priority Vector Heuristics» — mdpi.com
- [12] FocusClaw, «AI Agent Task Prioritization: A Human-Controlled Framework» — focusclaw.app/blog/ai-agent-task-prioritization
- [13] Facio, «Confidence Thresholds and Escalation» — facio.bot/blog/confidence-thresholds-escalation-agent-human-review
- [14] AWS Well-Architected, Agentic AI Lens, «Human-in-the-loop for critical decisions» — docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/agentsec04-bp02.html
- [15] Gartner, «Enabling Responsive Portfolio Reprioritization» — gartnerweb.com
- [16] Contribyte, «Product Owner Backlog Management Guide» — contribyte.fi
- [17] Ragan McGill, «Measure frequency of backlog reprioritisation» — raganmcgill.co.uk
- [18] HelixGate, «Architecture Decision Records» — helixgate.io; UPG, «ADR Log» — unifiedproductgraph.org
- [19] reStruggle, «Product Decision Records: Preserve Reasoning» — restruggle.com/blog/product-decision-records
- [20] mittuled/skill-os, «backlog-groomer SKILL.md» — github.com/mittuled/skill-os
