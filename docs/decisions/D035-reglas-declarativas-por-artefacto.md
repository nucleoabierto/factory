# D035: Reglas declarativas por artefacto en lugar de scripts

## Estado

Aceptada

## Contexto

D033 encapsuló los pasos mecánicos compartidos en skills de utilidad con scripts bash en `assets/`, bajo un contrato único de entrada y salida. En la práctica, el agente leía el artefacto y su documentación de apoyo para entender la operación y después invocaba el script que aplicaba la misma gramática: el conocimiento del formato se pagaba dos veces, una al leer y otra al invocar. Los cuatro gestores duplicaban además el catálogo de convenciones en un `convenciones.sh` idéntico por gestor. La gramática de cada artefacto ya era declarativa en esencia; el script era solo su portador.

## Decisión

Los gestores mecánicos resuelven las operaciones de su catálogo aplicando documentos de reglas declarativos, uno por tipo de artefacto, que viven en `references/` del gestor dueño de la escritura canónica: el agente lee el documento del artefacto y opera directamente sobre el archivo, sin script. Cada documento declara la ubicación del artefacto y sus literales de convención con los valores por defecto, su formato, su lectura tolerante a las variantes históricas, su escritura canónica y cada operación con sus condiciones de fallo. Un artefacto operado por varios gestores tiene un único documento hogar y los demás lo referencian por ruta relativa. Los literales de convención van embebidos en el documento que los usa, sin catálogo central ni archivo de inyección: la personalización edita cada archivo individualmente y `PERSONALIZE.md` guía qué archivo contiene cada literal. Las convenciones ajenas a un artefacto las embebe el consumidor que las usa. La operación `convencion` desaparece del catálogo; la serie numerada `siguiente`, sin artefacto propio, queda descrita en línea. El contrato único se mantiene: datos parseables, vacío legítimo sin error y fallo con diagnóstico sin escribir.

Las formas canónicas vigentes las declaran los documentos de reglas, no esta decisión. En el propio hito cambiaron dos: `## Estado` de tareas y propuestas pasa a una línea única con el estado vigente —sin la línea de opciones ni negritas que D033 fijó— y las ideas sustituyen el campo «Orden sugerido» por la dependencia explícita «Requiere», con la serie como orden de emisión y el consumidor decidiendo el de procesamiento. Esta decisión sustituye a D033 y, en lo relativo al orden de procesamiento de las ideas, a D030.

## Justificación

La observación que motivó el cambio fue directa: los agentes leen el archivo de apoyo antes de invocar el script, de modo que la gramática del artefacto se consulta dos veces en cada operación. Trasladarla a un documento de reglas que el agente aplica directamente elimina la duplicación sin perder el contrato: las operaciones siguen siendo mecánicas y verificables, y conservan la escritura canónica con lectura tolerante. El hogar único por artefacto evita el doble mantenimiento que un documento por gestor crearía; la referencia relativa es válida porque el material viaja con el paquete (lección de contratos de skills). Embeber los literales en cada documento sigue la misma lógica: el punto de lectura es también el punto de personalización. Se descartó mantener los scripts como implementación de las reglas, porque recrearía la doble lectura que motivó el cambio. El campo «Orden sugerido» dejaba de tener sentido con las ideas añadidas de forma libre —el número no gobierna nada— y la dependencia explícita expresa lo que el orden pretendía. La canonicalización sigue aplicando solo hacia adelante: los artefactos históricos conservan sus formas, que la lectura tolerante cubre.

## Referencias

- `docs/tasks/145-reglas-por-tipo-artefacto.md` — escritura de los documentos de reglas por tipo de artefacto.
- `docs/tasks/146-migrar-gestores-a-reglas.md` — migración de los gestores y eliminación de los scripts.
- `docs/tasks/147-decision-reglas-sobre-scripts.md` — esta decisión y la actualización de la documentación.
- Sustituye a `docs/decisions/D033-pasos-mecanicos-skills-utilidad-scripts.md` y, en lo relativo al orden de procesamiento de las ideas, a `docs/decisions/D030-ideas-persistidas-en-docs-ideas.md`.
