# Changelogs y versionado semántico mantenidos por agentes

> **Fecha:** 2026-09

## Propósito

Sintetizar las mejores prácticas para mantener un changelog gestionado por agentes —formato, control del volumen, correspondencia con semver y ciclo de vida de liberación— como base para diseñar dos skills: uno que registre el cambio al cerrar cada tarea y otro que anote versiones y promueva los cambios no liberados a una versión.

## Hallazgos

### Formato y estructura

- Keep a Changelog 2.0.0 es la convención de facto: preámbulo `# Changelog`, una sección `## [Unreleased]` arriba como zona de preparación, una sección `## [X.Y.Z] - YYYY-MM-DD` por versión —la más reciente primero— y enlaces de referencia al final que apuntan cada versión a su diff comparativo [1].
- Las categorías son seis y fijas —Added, Changed, Deprecated, Removed, Fixed, Security— y no crecen a propósito: el tipo de cambio va en la categoría y el porqué importa va en la redacción. Los cambios internos rara vez son notables [1].
- Los cambios incompatibles se marcan en línea con `**Breaking:**` dentro de su categoría, no en una sección aparte, y conviene declarar qué interfaz cubre el esquema de versionado (API, CLI, formato de archivo, configuración) [1].
- Common Changelog, un subconjunto más estricto, difiere en dos puntos: no tiene `Unreleased` —genera el borrador en el momento de liberar— y exige entradas en imperativo, autodescriptivas y con referencias a commits o pull requests entre paréntesis [2].
- La tensión entre ambos es dónde ocurre la curación: Keep a Changelog la distribuye —escribir al incorporar cada cambio— y Common Changelog la concentra —redactar al liberar—. Los dos coinciden en que el resultado publicado es curado, nunca un volcado de commits [1][2].

### Granularidad y control de volumen

- El criterio de inclusión es el impacto para el consumidor: entran funcionalidades, correcciones, cambios de comportamiento, deprecaciones y seguridad; quedan fuera dotfiles, dependencias de desarrollo y cambios de estilo o formato —pero no refactorings, cambios de entornos soportados ni documentación nueva, que pueden tener efectos [2][3].
- La curación sigue un proceso explícito: generar borrador → eliminar ruido → reformular → fusionar cambios relacionados → omitir los que se anulan entre sí → separar el mensaje breve de la descripción larga [2].
- Un cambio que abarca varios commits se lista como uno solo, con sus referencias combinadas [2]. Los proyectos con alto volumen agrupan commits relacionados y abren cada versión con un resumen destacado [4].
- Una entrada es una línea: las explicaciones largas viven en la referencia enlazada o en una guía de migración [1][2].
- En monorepos, Keep a Changelog recomienda un changelog central como resumen más uno por componente como detalle: el lector no debería leer doce archivos para entender una versión [1].

### Correspondencia con semver

- MAJOR para cambios incompatibles de la API pública, MINOR para funcionalidad compatible hacia atrás —incluidas las deprecaciones— y PATCH para correcciones compatibles [5].
- Por tanto: `Removed` y las entradas con `**Breaking:**` implican major; `Added`, `Deprecated` y `Changed` compatible implican minor; `Fixed` implica patch; `Security` es normalmente patch salvo que sea incompatible. Cuando conviven varios tipos, el bump es la señal más fuerte presente [6].
- Semver solo opera sobre una API pública declarada: sin saber qué interfaz es pública no se puede clasificar una ruptura [5][1].
- Los cambios sin impacto en la API pública no mueven la versión; el filtro de notabilidad y el cálculo del bump comparten el mismo criterio de impacto [5].
- Conventional Commits fija la correspondencia equivalente desde los mensajes: `feat` → minor, `fix` → patch, `BREAKING CHANGE` → major [7].

### Ciclo de vida de liberación

- Al liberar, `Unreleased` se renombra a `## [X.Y.Z] - YYYY-MM-DD` y se abre una sección `Unreleased` vacía; los enlaces de referencia al final se actualizan, de modo que el nuevo `Unreleased` compara la última etiqueta con HEAD [1].
- Antes de promover, la sección se vuelve a curar: combinar duplicados, quitar detalle interno, clarificar el impacto y hacer visibles las rupturas [3].
- Las versiones retiradas no se ocultan: se listan con el marcador `[YANKED]` [1].
- La independencia de tecnología viene de que el changelog es un archivo plano del repositorio y la versión vive en etiquetas o manifiestos: la fuente de verdad de la versión es un dato del proyecto, no del formato [1][8].

### Herramientas automáticas como referencia

- Generación desde commits (semantic-release, conventional-changelog, git-cliff): autonomía total, pero exige disciplina estricta de mensajes y produce borradores, no producto final —un commit y una entrada están escritos para lectores distintos [1][9].
- PR de liberación (release-please): un bot acumula cambios en un PR de release que un humano revisa y fusiona; es una puerta de aprobación humana sobre lo generado [9].
- Fragmentos por cambio (changesets, towncrier): cada cambio deposita un pequeño archivo que declara tipo y descripción, ensamblado al liberar; evita conflictos de edición concurrente y desacopla el registro de la liberación [9][10].
- CLI agnóstico (changie): gestiona el formato Keep a Changelog, valida estructura y ejecuta el bump desde etiquetas de git sin atarse a un ecosistema de paquetes [8].
- Consenso transversal: las máquinas pueden redactar, pero los humanos curan. La automatización queda en rol auxiliar —mover `Unreleased`, validar formato— y convertir la entrada en un check obligatorio llena el changelog de ruido [1].

## Conclusión

Las prácticas convergen en un modelo de dos momentos —registro incremental y curación al liberar— que encaja con el ciclo de tareas del proyecto:

1. **Formato:** Keep a Changelog 2.0.0. `CHANGELOG.md` en la raíz del proyecto evaluado, `Unreleased` arriba, las seis categorías, `**Breaking:**` en línea, fechas ISO y enlaces comparativos al pie cuando el repositorio esté alojado en un host que los soporte.
2. **Registro al cerrar la tarea:** la entrada se escribe en el momento del cierre, cuando el agente tiene el diff y el contexto presentes —la ventaja que la literatura concede a quien hizo el cambio—, declarada como material en borrador que el pase de liberación volverá a curar.
3. **Agregación por agrupación:** la unidad de entrada es el cambio notable para el usuario, no la tarea. Si la tarea pertenece a una agrupación —épica, propuesta o encabezado ligero— y esa agrupación ya tiene entrada en `Unreleased`, el cambio se fusiona en ella; si no la tiene y el conjunto es notable como unidad, se crea la entrada de la agrupación; solo una tarea suelta y notable genera entrada propia. La referencia de la entrada apunta al artefacto de agrupación, no a cada tarea. Los cambios sin impacto observable —trabajo de proceso interno— no se registran.
4. **Bump derivable:** con las entradas clasificadas y las rupturas marcadas, el skill de liberación calcula la señal más fuerte presente —breaking → major; added, deprecated o changed compatible → minor; fixed y security → patch— y la propone con justificación.
5. **Promoción confirmada:** renombrar `Unreleased` a `[X.Y.Z] - fecha`, actualizar los enlaces y abrir un `Unreleased` nuevo y vacío. La versión se confirma con el usuario y la fuente de verdad —etiqueta, manifiesto u otra— se detecta o se pregunta, nunca se asume.

## Limitaciones

- La agregación por épica o propuesta es una extrapolación de la regla de fusionar cambios relacionados: ninguna fuente trata changelogs en sistemas con artefactos de agrupación como los de este proyecto. Es la inferencia principal del documento.
- Las fuentes son convenciones y guías de practicantes, no estándares formales; el propio Keep a Changelog declara no aspirar a ser el estándar único.
- Parte de la literatura asume despliegue continuo sin versiones (SaaS); esas guías aportan criterio de redacción de entradas más que de estructura.
- No se evaluó el caso de proyectos sin API pública estable; semver se asume como esquema por su prevalencia y por el encargo de la tarea.

## Referencias

- [1] Keep a Changelog 2.0.0 — https://keepachangelog.com/en/2.0.0/
- [2] Common Changelog — https://common-changelog.org/
- [3] FOSSHub, «How to Maintain a Changelog» — https://www.fosshub.com/resources/development/changelog/
- [4] Bitsfolio, «Squashing Changelog Noise When Your OSS Project Gets Hundreds» — https://bitsfolio.com/squashing-changelog-noise-oss-project/
- [5] Semantic Versioning 2.0.0 — https://semver.org/spec/v2.0.0.html
- [6] Simplified, «Changelog Generator» — https://www.simplified.tools/generate_changelog
- [7] ReleaseRay, «Release Notes Best Practices» — https://www.releaseray.com/blog/release-notes-best-practices
- [8] changie — https://github.com/peiman/changie
- [9] Oleksii Popov, «NPM Release Automation: Semantic Release vs Release Please vs Changesets» — https://oleksiipopov.com/blog/npm-release-automation/
- [10] towncrier documentation — https://towncrier.readthedocs.io/en/stable/
