# Revisión de código como capacidad del producto

## Estado

[ ] Borrador | [p] Pendiente de revisión | **[a] Aprobada** | [d] Descartada

## Problema

La revisión de cambios solo es posible cuando el propio sistema produjo el cambio. La calidad de revisión que se aplica al trabajo interno —un revisor independiente que reconstruye el diff, lo confronta con las convenciones del proyecto y con la memoria de errores ya cometidos, y produce un veredicto fundamentado— no alcanza a los cambios que llegan de fuera. Cuando un *pull request* lo abre otro agente, un colaborador humano o un flujo distinto, quien gestiona el producto tiene dos opciones: revisarlo manualmente, con el coste y la inconsistencia que eso implica, o confiar en la evaluación del propio autor, que juzga su trabajo con el sesgo de quien ya conoce su intención.

La situación afecta a quien usa el sistema para gestionar un producto real: el ciclo de vida que el producto promete cubrir incluye integrar cambios de origen diverso, y la revisión es el punto donde más se gana o se pierde calidad. Hoy ese punto queda fuera de la capacidad entregable —la competencia de revisar bien existe, pero no se puede invocar sobre trabajo ajeno—.

En sentido contrario ocurre algo simétrico: cuando un cambio propio recibe revisión externa, los comentarios llegan como una lista sin orden ni prioridad que hay que clasificar a mano —qué exige corrección, qué merece respuesta, qué se puede aplazar— antes de poder actuar. Cada PR revisado repite ese trabajo de clasificación desde cero.

## Oportunidad

Resolverlo convertiría la competencia de revisión que el sistema ya demuestra en su ciclo interno en un servicio invocable sobre cualquier *pull request* del proyecto evaluado, con veredicto fundamentado y comentarios que el autor puede entender por sí solo. La mitad simétrica —clasificar la revisión recibida en acciones claras antes de responder— cierra el lazo para el que recibe. Supera a las alternativas existentes —la revisión manual y la autoevaluación del autor— en independencia, en consistencia de criterio y en el aprovechamiento de la memoria acumulada del proyecto, que hoy solo alcanza al trabajo interno.

## Forma de solución

El usuario puede someter cualquier *pull request* del proyecto evaluado a la misma revisión independiente que hoy solo recibe el trabajo interno: un análisis que reconstruye el diff, lo confronta con las convenciones y la memoria del proyecto, y devuelve un informe con hallazgos por severidad y un veredicto —acompañado de comentarios autocontenidos, listos para publicar bajo confirmación del usuario—. En sentido contrario, puede someter los comentarios de revisión que un PR propio ha recibido a una clasificación que los ordena en acciones —corregir, responder, aplazar— y actuar sobre el cambio a partir de ella. Los dos sentidos responden a actores distintos —quien revisa y quien es revisado— y se materializan como capacidades separadas e invocables de forma independiente. Categoría: flujo nuevo.

## Solución

Cuatro capacidades nuevas, organizadas en dos bloques por el actor al que sirven:

**Bloque revisor** — quien revisa un PR ajeno:

- `revisar-pr`: somete un PR arbitrario del proyecto evaluado a revisión independiente. Reconstruye el diff, lo confronta con las convenciones del proyecto, los archivos hermanos y las lecciones aprendidas, carga los hilos de revisión existentes para no duplicar feedback ya resuelto, y produce un informe persistido con hallazgos por severidad y un veredicto —merge, improve o blocked—.
- `comentar-pr`: a partir del informe, produce los comentarios publicables —*conventional comments*, cada uno autocontenido porque el autor puede no tener acceso al informe— y los publica en el PR vía `gh`, previa confirmación explícita del usuario. Los comentarios no se guardan en el informe: se presentan, se confirman y se publican.

**Bloque autor** — quien recibe revisión en un PR propio:

- `clasificar-comentarios`: clasifica los hilos de revisión abiertos de un PR en acciones —corregir, responder, aplazar— con la respuesta o corrección propuesta por hilo, y produce el documento de triage. Solo análisis: no responde ni resuelve en la plataforma.
- `mejorar-pr`: aplica el triage al cambio propio —implementa las correcciones, prepara las respuestas y documenta los aplazamientos—, completando el lazo de revisión.

## Alternativas consideradas

- Extender `revisar-implementacion` para aceptar PRs arbitrarios: se descarta porque su contrato de entrada es el archivo de tarea con su plan y su suite; forzar ambos contratos en una sola capacidad los degrada, y el ciclo interno puede consumir `revisar-pr` después.
- Informe sin comentarios publicables: se descarta porque deja al usuario traduciendo hallazgos a feedback a mano —la fricción que motiva el problema—.
- Una capacidad única que revise y mejore: se descarta porque confunde al revisor con el autor en un solo bloque y reintroduce el sesgo de autoaprobación que la separación de contextos combate.
- Revisión solo en chat, sin informe persistido: se descarta porque pierde la trazabilidad que la visión declara como objetivo.

## Fuera de alcance

- Revisar diffs que no sean un PR —árbol de trabajo local, rangos de commits sueltos—: el PR es la unidad de entrada; un modo local puede evaluarse después.
- Ejecutar las puertas mecánicas del proyecto evaluado (tests, lint, build): la capacidad es de análisis.
- Publicar comentarios sin confirmación, resolver hilos o responder al autor automáticamente: la publicación es puerta humana.
- Fusionar el PR revisado ni reescribir el código del autor: el bloque autor mejora cambios propios, no ajenos.
- Rewirear el ciclo interno para consumir `revisar-pr` en lugar de `revisar-implementacion`: posible convergencia futura, no parte de esta propuesta.
- Plataformas de código distintas de la que `gh` ya cubre.

## Investigaciones de apoyo

- Ninguna.

## Borradores

- `docs/tasks/138-skill-revisar-pr.md` — capacidad de revisión de PR arbitrario con informe y veredicto
- `docs/tasks/139-skill-comentar-pr.md` — comentarios autocontenidos publicables con confirmación (depende de 138)
- `docs/tasks/140-skill-clasificar-comentarios.md` — triage de la revisión recibida en un PR propio
- `docs/tasks/141-skill-mejorar-pr.md` — aplicar el triage sobre el cambio propio (depende de 140)

## Revisión

- Usuario: 2026-10-12 — Aprueba
