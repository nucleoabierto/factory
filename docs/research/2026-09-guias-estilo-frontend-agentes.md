# Guías de estilo de diseño para agentes IA: generación, mantenimiento, aplicación y validación

> **Fecha:** 2026-09

## Propósito

Recopilar las mejores prácticas para que un agente IA genere la guía de estilo de un proyecto frontend, la mantenga sincronizada con el código, la aplique al escribir interfaz y valide su cumplimiento, como entrada para diseñar los skills `documentar-guia-estilo` (genera y mantiene viva la guía) y `aplicar-guia-estilo` (la aplica al escribir frontend y valida su cumplimiento) de Factory.

## Alcance

- **Contexto:** proyectos frontend cuyo código lo escribe o modifica un agente IA, sin diseñador humano dedicado ni herramienta de diseño externa (Figma) como fuente.
- **Cubierto:** forma de la guía (formato, contenido, ubicación), ciclo de mantenimiento, aplicación al escribir frontend y estrategias de validación.
- **Fuera de alcance:** accesibilidad como tema propio (aparece solo como dimensión de validación), frameworks CSS concretos (Tailwind, Sass) salvo como evidencia, y pipelines de diseño bidireccionales con Figma.

## Hallazgos

### Forma de la guía: qué formato consume bien un agente

La práctica emergente dominante es un documento `DESIGN.md` en la raíz del repositorio, planteado no como documentación sino como **contrato**: reglas verificables que el agente debe cumplir cada vez que produce interfaz [4][5]. Las fuentes convergen en las propiedades que lo hacen consumible por un agente:

- **Especificidad comprobable:** los principios vagos («que se sienta moderno») no son aplicables; las reglas concretas («los botones son píldora, padding 8×24px, el botón primario es negro con texto blanco») sí, porque el incumplimiento es detectable señalando la línea del archivo [4].
- **Valores, no adjetivos:** la paleta se declara con códigos hex y una función por color (fondo, superficie, texto, texto atenuado, acento, error); la tipografía como tabla de roles con familia, tamaño, peso y altura de línea; el espaciado como unidad base y radios permitidos [4][2].
- **Estructura fija por secciones:** hay convergencia en un esquema de ~9 secciones —atmósfera visual, color con roles, tipografía, espaciado y forma, componentes, layout, movimiento, estados (loading/empty/error), anti-patrones— [2][5].
- **Anti-patrones explícitos:** listar lo prohibido (valores literales, gradientes genéricos, estéticas por defecto del modelo) es tan útil como lo permitido, porque los modelos tienen sesgos visuales conocidos: Anthropic documenta que el diseño generado por IA se agrupa en tres looks recurrentes que son «defaults rather than choices» [3].

Debajo del documento, la capa de datos: los **design tokens** son la fuente de verdad de las decisiones de diseño (color, tipografía, espaciado). El Design Tokens Community Group publicó en octubre de 2025 la primera versión estable del formato DTCG: archivos JSON con `$value`, `$type`, grupos y alias, con implementaciones de referencia en Style Dictionary, Tokens Studio y Terrazzo [1]. En código CSS, la representación canónica son las custom properties en `:root`, que son además lo que los linters reconocen como «token» [7][8].

Los dos niveles responden a consumidores distintos: el JSON DTCG sirve para interoperar entre herramientas y generar salidas por plataforma; el `DESIGN.md` sirve para que el agente lea reglas en lenguaje natural con valores precisos; las custom properties sirven para que el código las use y las herramientas las cuenten. En proyectos sin Figma ni Style Dictionary, la práctica recomendada es CSS custom properties + `DESIGN.md`, sin la capa JSON [9].

### Mantenimiento: la guía como sistema vivo

La literatura sobre deriva («drift») de sistemas de diseño identifica que las guías fallan no por su forma inicial sino porque el código y la documentación divergen con el tiempo. Las prácticas convergentes:

- **Una sola fuente de verdad por superficie.** Los tokens viven en el código (custom properties), el contrato en `DESIGN.md`; las decisiones aprobadas entran siempre por la fuente, nunca directamente en componentes [9][10].
- **Generada, no mantenida a mano.** «Generated tokens beat maintained tokens»: cuando la fuente cambia, se propaga a todas las superficies que la tocan en el mismo cambio —incluidos los componentes que hardcodearon el valor viejo y la documentación—, produciendo un diff, no un despliegue [9][10].
- **Puertas permanentes («standing gates»).** Checks automatizados que corren en cada cambio, ejecutados por el agente pero diseñados por humanos «precisely because agent output cannot be taken on faith» [9].
- **Auditoría de deriva programada.** Además de las puertas por cambio, una auditoría periódica barre la superficie completa buscando lo que los gates no ven: «meaning drift, behavior drift, the component that is technically token-compliant but no longer matches the documented intent» [9].
- **Puerta de decisión humana.** Lo que la auditoría saca a la luz y no es mecánico (deprecar un token, una variación intencional o accidental) lo decide un humano; las decisiones vuelven a la fuente de verdad y el ciclo reinicia [9][10].
- **Los reportes de deriva producen issues, no ediciones.** «An agent fixing drift unattended will happily delete a token something still uses» [10].

Este ciclo encaja estructuralmente con el patrón ya usado en Factory: `documentar-dominio`/`documentar-producto` como sensores al cierre de cada tarea, y `revisar-arquitectura` como evaluación profunda bajo demanda (D021). La guía de estilo admite el mismo diseño: un sensor por cambio (validación del diff) y una auditoría bajo demanda o programada.

### Aplicación: cómo escribe el agente con la guía presente

- **Carga justo a tiempo.** El patrón de skills de Anthropic carga la guía como contexto bajo demanda cuando la tarea es de frontend, en lugar de mantenerla siempre en el contexto [3][6]. Esto coincide con el diseño de skills de Factory (D003).
- **Dos pasadas: dirección antes que implementación.** El skill `frontend-design` de Anthropic primero produce un plan de diseño compacto —sistema de tokens con color, tipografía, layout y firma visual— y solo después implementa [3]. Cuando no hay guía previa, el skill genera la dirección; cuando la hay, el brief propio del usuario siempre gana [3].
- **Tokens antes que valores.** El criterio operativo universal: todo color, espaciado, radio y tipografía proviene de los tokens aprobados; un valor literal en un componente es «the single highest-signal drift marker» [10].
- **Rúbrica de revisión con dimensiones fijas.** La crítica no es «que quede mejor» sino una lista verificable: ajuste de superficie, reutilización de componentes, disciplina de tokens, densidad, accesibilidad, estados (loading/empty/error), contención visual [11][12][14].

### Validación: dos niveles de evidencia

La práctica más madura (Agentic Design System, design-harness, design-vision-loop) separa la validación en dos niveles con autoridad distinta [11][12][13]:

**Nivel 1 — verificación estática (barata, rápida, «gameable»).** Reglas automáticas sobre el código fuente:

- `stylelint` con `color-no-hex`, `color-named: never` y `function-disallowed-list` para prohibir valores literales; plugin `declaration-strict-value` para exigir `var(--…)` por propiedad; archivo de tokens excluido del lint [7][8].
- Linters de tokens especializados: `design-lint` valida contra un catálogo DTCG y auto-corrige sustituyendo literales por `var(--token)`; `tokenlint` produce una métrica de cobertura («tokenized / (tokenized + hardcoded)») observable en CI en lugar de solo pasar/fallar [7][8].
- Límite declarado: las reglas estáticas son «gameable» y «must never be the final sign-off» — el código puede pasar el lint y verse mal [12].

**Nivel 2 — evidencia renderizada (autoritativa, no «gameable»).** Capturar lo que el usuario vería:

- Screenshots por estado y por breakpoint en navegador headless; chequeos deterministas in-page (overflow horizontal, texto cortado, objetivos táctiles, errores de consola, CLS); auditoría axe sobre el DOM vivo [12][13].
- Crítica multimodal: el agente mira los screenshots y los puntúa contra la rúbrica y la guía, iterando hasta pasar — el patrón render→screenshot→critique→iterate que estas herramientas atribuyen a la guía de Anthropic para agentes de UI [13].
- Límites declarados: la crítica visual es más cara (tokens de visión) y heurística — design-harness separa explícitamente fallos deterministas (bloquean el loop) de riesgos heurísticos (nunca bloquean) y juicios subjetivos (quedan como prompts de revisión humana) [13].

**Tensión resuelta en la práctica:** los chequeos deterministas bloquean, los heurísticos informan, lo subjetivo escala al humano [13]. La evidencia forma parte del producto: «"Looks good" is not evidence» [11].

## Conclusión

Síntesis accionable para los dos skills de Factory:

**Skill `documentar-guia-estilo` (generación y mantenimiento):**

1. La guía es un `DESIGN.md` en la raíz del proyecto evaluado, redactado como contrato verificable: valores concretos, roles semánticos, anti-patrones explícitos, estructura por secciones fijas (atmósfera, color con roles, tipografía, espaciado/forma, componentes, estados, layout, movimiento, anti-patrones).
2. La guía se materializa en el código como CSS custom properties en `:root` —la capa JSON DTCG se omite salvo que el proyecto ya use herramientas que la consuman—.
3. Dos pasadas: primero dirección/tokens, después (aprobación del usuario) materialización. En proyectos con CSS existente, el skill extrae los valores reales como semilla y los normaliza en tokens, en lugar de imponer una estética nueva.
4. Mantenimiento: la guía es fuente de verdad; los cambios de diseño entran por ella y se propagan; un sensor al cierre de tareas de frontend detecta deriva, simétrico a `documentar-dominio` (D021); la auditoría profunda queda bajo demanda.

**Skill `aplicar-guia-estilo` (aplicación y validación):**

1. Se invoca al escribir o modificar frontend: carga la guía bajo demanda, exige tokens antes que valores literales y aplica la rúbrica fija (superficie, reutilización, tokens, densidad, estados).
2. Validación en dos niveles: estático siempre que haya linter disponible (o grep de valores literales como degradación), renderizado (screenshot + crítica) cuando el proyecto sea servible.
3. Los fallos deterministas bloquean; los riesgos heurísticos se reportan; lo subjetivo escala al usuario — coherente con la revisión dual de Factory (D009).

## Limitaciones

- Las prácticas sobre `DESIGN.md` provienen de proyectos open source y guías de industria recientes (2025-2026), no de literatura consolidada; el formato no está estandarizado y cada fuente propone su esquema de secciones.
- El formato DTCG 2025.10 es el primer estable publicado; su adopción está en curso y orientado a interoperabilidad entre herramientas, no a consumo directo por agentes.
- No se investigó el coste real de la crítica multimodal por iteración ni su fiabilidad comparada entre modelos; las fuentes que la avalan son en parte los propios proveedores (Anthropic).
- La viabilidad de linters depende del toolchain del proyecto: `todo-app` es vanilla JS sin build ni npm, así que la validación estática allí se degradaría a chequeos ad hoc.

## Referencias

- [1] Design Tokens Community Group, «Design Tokens Format Module 2025.10» y anuncio de primera versión estable — w3.org/community/design-tokens/2025/10/28/design-tokens-specification-reaches-first-stable-version/, w3.org/community/reports/design-tokens/CG-FINAL-format-20251028/
- [2] oh-my-agent, «design-md-spec.md» (esquema de 9 secciones alineado con getdesign) — github.com/first-fluke/oh-my-agent
- [3] Anthropic, skill `frontend-design` y «Improving frontend design through Skills» — github.com/anthropics/skills/blob/HEAD/skills/frontend-design/SKILL.md, claude.com/blog/improving-frontend-design-through-skills
- [4] Developers Digest, «DESIGN.md: The Contract That Keeps AI Agents On Brand» — developersdigest.tech/blog/design-md-for-ai-agents
- [5] BuilderIO agent-native, skill `frontend-design` (contrato DESIGN.md con modo, audiencia y anti-referencias) — github.com/BuilderIO/agent-native
- [6] Stitch/oh-my-openagent, «stitch-skill.md» (DESIGN.md como fuente única para generación de pantallas) — cdn.jsdelivr.net/npm/oh-my-openagent
- [7] stylelint issue #6368 (enforcement de custom properties vía `color-no-hex`/`declaration-strict-value`) — github.com/stylelint/stylelint/issues/6368
- [8] design-lint (regla `design-token/colors` con catálogo DTCG y auto-fix) y tokenlint (métrica de cobertura de tokens) — design-lint.lapidist.net, github.com/hyuga611/tokenlint
- [9] Agentic Design School, «Design Systems That Maintain Themselves (Almost): Agents and Token Sync» — agenticdesign.school/articles/design-systems-that-maintain-themselves
- [10] AgentsCamp, «Maintaining a Design System with Claude Code» — agentscamp.com/guides/design/maintain-a-design-system-with-claude-code
- [11] aa-on-ai, «Agentic Design System» (loop intent→baseline→rubric→build→evidence→review) — github.com/aa-on-ai/agentic-design-system
- [12] aa-on-ai, scripts de design-review: evidencia de dos niveles («source heuristics… never the final sign-off» vs rendered) — github.com/aa-on-ai/agentic-design-system/tree/main/skills/design-review/scripts
- [13] design-harness (loop determinista con condición de parada) y aura-frog `design-vision-loop` (render→screenshot→critique→iterate) — github.com/ictechgy/design-harness, github.com/nguyenthienthanh/aura-frog
- [14] Reopt Handbook, «Agentic Design Quality Control» (context stack y rúbrica de crítica) — handbook.reopt.ai/en/books/design-systems-ai/agentic-design-control
