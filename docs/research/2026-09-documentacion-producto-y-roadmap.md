# Documentación de producto y roadmap de largo horizonte

> **Fecha:** 2026-09

## Propósito

Determinar cómo evolucionar el sistema en tres frentes que hoy están desatendidos: la documentación de dominio (mejorar lo que produce `documentar-dominio`), la documentación formal de producto al estilo del ecosistema Sphinx/Read the Docs (guías, flujos y funcionalidades), y el diseño del roadmap para desarrollos de largo horizonte con múltiples épicas.

## Contexto

La PoC de `todo-app/` ya produce documentación interna de proceso —tareas, épicas, decisiones, investigaciones— y un documento de dominio vivo (`todo-app/docs/domains/001-lista-de-tareas.md`) que actúa como sensor de deriva según D021. El roadmap (`todo-app/ROADMAP.md`, D022) es una lista ordenada de líneas de trabajo con justificación por posición. Tres carencias motivan esta investigación: el documento de dominio describe el modelo estático pero no el comportamiento observable de la aplicación; no existe ninguna documentación del producto para un lector que quiera entender qué hace la app o cómo usarla (la épica 004 introducirá un formato versionado de exportación sin hogar documental); y el roadmap lineal no distingue niveles de compromiso ni da hogar a trabajo aparcado, algo que pesará al gestionar horizontes largos y varias épicas.

## Análisis

### 1. Qué tipo de documentación falta: el marco Diátaxis

Diátaxis —marco adoptado por Django, Gatsby y Cloudflare entre otros— sostiene que hay cuatro tipos de documentación que responden a necesidades distintas: tutoriales (aprender), guías how-to (lograr un objetivo), referencia (informar) y explicación (entender) [1][2]. El valor del marco es diagnóstico: permite ver qué tipo de necesidad cubre cada documento y cuáles quedan huérfanas; su propia guía advierte contra crear las cuatro secciones vacías —es un mapa para evaluar, no un plan a completar [3].

Contra ese mapa, la documentación actual de todo-app cubre «referencia» (glosario, modelo, invariantes) y parcialmente «explicación» (fronteras, estado de salud), pero solo para el lector interno que mantiene el dominio. Quedan fuera las funcionalidades y flujos vistos desde el usuario: crear una lista, mover una tarea, archivar, exportar el estado. Es la capa que un manual de producto —o una documentación tipo Read the Docs— pondría primero.

### 2. Documentación formal de producto: lecciones del ecosistema Python

El ecosistema Sphinx + Read the Docs aporta tres prácticas independientes de la herramienta concreta [4][5]:

- **Docs-as-code:** la documentación vive en el repositorio junto al código, se versiona con él y se revisa en el mismo ciclo; el proyecto ya practica esto con todo su `docs/`.
- **Índice navegable (toctree):** una jerarquía explícita de documentos con orden y relaciones, no una carpeta de archivos sueltos. Equivalente al patrón «índice obligatorio» que el proyecto ya aplica en `docs/domains/README.md` y `docs/lessons/README.md`.
- **Referencia generada del código (autodoc):** Sphinx extrae la API de los docstrings para que la referencia no se escriba a mano. En todo-app el análogo natural es la suite QUnit de `tests.html`: los escenarios ejecutables ya describen el comportamiento.

Sobre el formato concreto, la comparación Sphinx vs MkDocs es clara para este contexto [6][7][8]:

- **Sphinx:** el estándar del ecosistema Python; reStructuredText como lengua nativa (Markdown vía MyST), autodoc potente, múltiples formatos de salida, más peso y curva de aprendizaje. Su autodoc asume Python y docstrings en RST: poco útil sobre `app.js`.
- **MkDocs (Material):** generador ligero, Markdown nativo, configuración en un YAML, vista previa en vivo, búsqueda y navegación pulidas; autodoc más limitado. Recomendado como equilibrio estructura/simplicidad para proyectos pequeños [7].
- **Markdown estructurado sin generador:** cero infraestructura, coherente con las convenciones del repositorio y consumible después por cualquier generador sin reescritura; pierde búsqueda, navegación renderizada y publicación.

### 3. Documentación de funcionalidades: el patrón living documentation

La «documentación viva» del mundo BDD describe las funcionalidades como escenarios en lenguaje de negocio —qué hace la aplicación, con qué reglas— idealmente generados o verificados por la suite de tests, de modo que no pueden quedar obsoletos sin que un test lo delate [9][10]. Martraire la sitúa como aplicación directa de DDD: el mismo lenguaje ubicuo que describe el modelo describe los escenarios [11].

La suite QUnit de `tests.html` ya contiene esos escenarios de facto («crear tarea con texto vacío no la añade», «eliminar una lista reasigna sus tareas a la entrada»). El patrón sugiere un documento de funcionalidades que los organice por flujo de usuario y los ancle a los tests —no a los símbolos internos—, cerrando el circuito test↔doc que hoy es unidireccional.

### 4. Roadmaps de largo horizonte: Now/Next/Later y afines

El formato dominante para roadmaps sin fechas comprometidas es **Now/Next/Later** (Janna Bastow / ProdPad, ~2013; hoy formato nativo en Productboard, Roadmunk y Aha!) [12]: tres horizontes por nivel de confianza —*Now* comprometido y en vuelo, *Next* validado y próximo, *Later* dirección sin compromiso— que cambian precisión temporal por honestidad sobre la incertidumbre [12][13]. Prácticas asociadas convergentes [13][14]:

- **Temas, no features:** cada línea nombra el problema u objetivo («reducir fricción de entrada»), no la solución; los temas sobreviven cuando la implementación cambia.
- **Trazabilidad a objetivos:** toda línea del roadmap remite a un objetivo del periodo; una línea sin objetivo indica un objetivo faltante o una línea de más.
- **«No hacemos» explícito:** una sección de lo descartado/aparcado comunica dirección tanto como lo incluido y da hogar a las ideas que no caben sin perderlas.
- **Límites por horizonte:** *Now* se acota (3-5 elementos) para forzar priorización; *Later* no es un vertedero de backlog [14].
- **Estado por línea y revisión periódica:** los backlogs git-native añaden campo de estado por ítem y reconciliación periódica entre lo declarado y lo ejecutado [15].

El roadmap actual (orden lineal con justificación por posición) es compatible con estos patrones: los horizontes añaden la dimensión de confianza que el orden lineal aplana, y la justificación por posición sigue siendo el mecanismo dentro de cada horizonte. La jerarquía iniciativa→épica→feature que D022 descartó es una dimensión distinta —profundidad— y su descarte no bloquea los horizontes.

## Evaluación comparativa

### Documentación formal de producto

**Coste y mantenimiento:**
- **Markdown estructurado:** bajo. Sin build, sin dependencias; se lee en el editor y en GitHub tal cual.
- **MkDocs:** medio. Un `mkdocs.yml`, `pip install`, build en CI si se publica.
- **Sphinx:** alto para este contexto. RST/MyST, `conf.py` en Python, autodoc inútil sobre JS vanilla.

**Coherencia con las convenciones del proyecto:**
- **Markdown estructurado:** alta. Todo el `docs/` del proyecto es markdown con índices obligatorios.
- **MkDocs:** media. El contenido sigue siendo markdown; añade una herramienta externa al ciclo.
- **Sphinx:** baja. Introduce un segundo lenguaje de marcado y tooling Python para una app sin build.

**Capacidad de publicar:**
- **Markdown estructurado:** baja hoy; alta portabilidad mañana (MkDocs/Sphinx+MyST lo consumen sin reescritura).
- **MkDocs / Sphinx:** alta. Sitio navegable con búsqueda desde el primer build.

### Roadmap

**Orden lineal (actual):** simple, ya implementado; aplana la distinción entre «comprometido» y «dirección» y no da hogar a lo aparcado.

**Horizontes Now/Next/Later:** añade confianza como dimensión explícita y sección de aparcados; encaja con la justificación por posición existente y con la puerta humana del skill. Coste: el documento gana una sección y el índice pierde reflejo directo del orden en horizontes lejanos (un «Later» no necesita orden de ejecución).

**Timeline/fechas:** descartado por la propia literatura: las fechas en roadmap de software crean falsos compromisos [12][14]; además el sistema no gestiona calendario en ninguna otra parte.

## Recomendación

**Evolucionar en tres piezas, en este orden:**

1. **Documento de funcionalidades anclado a tests.** Nuevo artefacto bajo `todo-app/docs/` que describe las funcionalidades como escenarios en lenguaje de negocio organizados por flujo de usuario, con ancla a la suite QUnit. Cierra el circuito test↔doc del patrón living documentation sin herramientas nuevas, y es la pieza que el documento de dominio no cubre: el dominio documenta el modelo, las funcionalidades documentan el comportamiento.

2. **Documentación formal en Markdown estructurado con toctree explícito.** Adoptar la organización Diátaxis ligera (guías de uso, referencia de formatos de datos, explicación) bajo un índice navegable en `todo-app/docs/`, sin generador. La decisión de publicar con MkDocs se pospone sin coste: el markdown es consumible directo. Sphinx se descarta: autodoc y RST no aportan sobre JS vanilla. La épica 004 (formato de exportación versionado) es el primer contenido de «referencia» con necesidad real.

3. **Roadmap con horizontes.** Extender `ROADMAP.md` y `planificar-roadmap` con horizontes Now/Next/Later, estado por línea, sección de aparcados («no ahora») y justificación mantenida dentro de cada horizonte. El orden del índice `TODO.txt` sigue reflejando solo los horizontes comprometidos (Now/Next); Later vive solo en el roadmap, que es su hogar natural como documento de dirección.

## Formato o procedimiento

Esbozo de las tres piezas, a afinar en las tareas que las materialicen:

### Documento de funcionalidades

```
todo-app/docs/features/
  README.md          — índice obligatorio (patrón del proyecto)
  NNN-slug.md        — un documento por funcionalidad o flujo
```

Secciones por documento: nombre de la funcionalidad en lenguaje ubicuo, flujo del usuario (pasos observables), reglas de negocio que aplican, escenarios con ancla al test que los verifica (`tests.html`, nombre del módulo/caso), y estado. Un hecho de dominio sigue viviendo en `docs/domains/`; el documento de funcionalidad lo referencia, no lo repite.

### Documentación de producto

```
todo-app/docs/ (o docs/producto/ si convive con los artefactos de proceso)
  index.md           — portada + toctree explícito de la documentación
  guias/             — how-to por objetivo del usuario
  referencia/        — formatos de datos, comportamiento exacto
  explicacion/       — por qué es así (puede enlazar a domains/decisions)
```

### Roadmap con horizontes

```markdown
## Dirección
## Now      — líneas comprometidas (3-5 máx.), orden justificado, estado
## Next     — validadas, próximas; orden preferente justificado
## Later    — dirección sin compromiso; temas, sin orden interno
## No ahora — aparcadas explícitamente, con la razón
## Revisión
```

## Limitaciones

- La investigación es de profundidad media: 1-2 fuentes por afirmación clave; las citas de Now/Next/Later recaen en fuentes de producto (ProdPad, agregadores) más que en literatura primaria.
- La decisión markdown-sin-generador se basa en el tamaño actual de todo-app (PoC de ~600 líneas); si el producto crece o se publica a usuarios externos, MkDocs gana peso y conviene reevaluar.
- El encaje del documento de funcionalidades con el ciclo de `ejecutar-tareas` (quién lo mantiene, cuándo se actualiza) es una propuesta a validar al escribir las tareas, no una conclusión de esta investigación.
- No se evaluó el impacto sobre el skill `documentar-dominio` más allá de delimitar responsabilidades; la extensión formal del skill queda para el trabajo derivado.

## Referencias

- [1] Diátaxis — diataxis.fr
- [2] Diátaxis, «The map» — diataxis.fr/map/
- [3] Diátaxis, «How to use Diátaxis» — diataxis.fr/how-to-use-diataxis/
- [4] Sphinx, «Getting Started» (toctree, conf.py) — sphinx-doc.org/en/master/usage/quickstart.html
- [5] Read the Docs, «Deploying Sphinx on Read the Docs» — docs.readthedocs.com/platform/stable/intro/sphinx.html
- [6] Imperial College London, «mkdocs vs sphinx» (discusión) — github.com/ImperialCollegeLondon/virtual_ecosystem/discussions/5
- [7] The Passionate Coder, «Choosing a Documentation Tool» — thepassionatecoder.com/post/building-in-public-choosing-a-documentation-tool
- [8] Python Snacks, «Python Documentation: MkDocs vs Sphinx» — pythonsnacks.com/p/python-documentation-generator
- [9] Serenity BDD, «Living Documentation» — serenity-bdd.github.io/docs/reporting/living_documentation
- [10] SmartBear/CucumberStudio, «Living documentation» — support.smartbear.com/cucumberstudio/docs/bdd/living-doc.html
- [11] Cyrille Martraire, *Living Documentation* — informit.com/store/living-documentation-continuous-knowledge-sharing-by-9780134689449
- [12] Unified Product Graph, «Now-Next-Later» — unifiedproductgraph.org/frameworks/now-next-later
- [13] SkillMedev/skills, «product-roadmap/SKILL.md» — github.com/SkillMedev/skills
- [14] Features.Vote, «Now-Next-Later Roadmap Guide» — features.vote/now-next-later-roadmap
- [15] yrangana/Plans, «docs/reference.md» (estado por ítem, reconciliación con git log) — github.com/yrangana/Plans
