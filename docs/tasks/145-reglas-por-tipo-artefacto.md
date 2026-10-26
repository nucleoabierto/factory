# Escribir los documentos de reglas por tipo de artefacto

## Estado

[ ] Pendiente | [~] En progreso | **[r] En revisión** | [x] Completada | [!] Bloqueada

## Tipo

desarrollo

## Objetivo

Crear un documento de reglas por cada tipo de artefacto del sistema, que declare su formato —marcas, secciones, orden, forma canónica— y las operaciones de dominio que los gestores hoy resuelven con scripts bash, trasladando con precisión lo que el código de `assets/*.sh` tiene embebido: la lectura tolerante a variantes históricas y la escritura canónica.

## Dependencias

- Ninguna.

## Entrada

- Los scripts de `consultar-artefactos` —`todo.sh`, `tarea.sh`, `ideas.sh`, `indice.sh`, `series.sh`, `convencion.sh`, `convenciones.sh`— y de `actualizar-artefactos` —los mismos más `promocion.sh`—.
- Los scripts de `operar-experiencias` y `operar-changelog` con sus catálogos.
- `PERSONALIZE.md` — el catálogo de convenciones configurables— y la decisión del mecanismo vigente (D033).
- Los artefactos reales como referencia del formato vivo.

## Resultado esperado

- Un documento de reglas por tipo de artefacto —índice de tareas, archivo de tarea, propuesta, épica, idea, índices de decisiones y lecciones, registro de experiencias, changelog, series numeradas y convenciones— escrito para que un agente lea y escriba el artefacto directamente, sin script.
- Los documentos quedan ubicados donde los gestores los consumirán, declarada la regla de ubicación para artefactos compartidos por varios gestores —el índice y las tareas los operan `consultar` y `actualizar` a la vez—.

## Criterios de calidad

- Cada documento cubre formato, lectura tolerante y escritura canónica del artefacto, sin depender de lógica ejecutable.
- Toda operación del catálogo vigente de los cuatro gestores queda expresable como regla sobre algún documento; ninguna se pierde.
- Las convenciones configurables de `PERSONALIZE.md` siguen resolubles: los valores viven declarados en el documento correspondiente.
- La precisión de la escritura canónica no baja respecto a lo que los scripts imponen hoy.

## Procedimiento sugerido

1. Inventariar las operaciones del catálogo de los cuatro gestores y los formatos que cada script impone.
2. Redactar el documento de reglas de cada artefacto trasladando el conocimiento del script: gramática de líneas, marcas, secciones, formas históricas aceptadas y forma canónica de escritura.
3. Verificar cobertura operación a operación contra el catálogo.
4. Decidir y declarar la ubicación de los documentos para que no se dupliquen entre gestores.

## Notas

- El punto delicado es el artefacto compartido: `consultar` y `actualizar` operan sobre los mismos tipos; conviene un único hogar por documento de reglas —p. ej. en `references/` de `actualizar-artefactos` para escritura y formato, referenciado por `consultar`— o un directorio común. La decisión queda en la tarea.

## Contexto


- Archivos similares:
  - `.agents/skills/commit/references/convenciones.md` — modelo de documento de referencia: material declarativo que el cuerpo del skill carga cuando lo necesita (patrón de D005).
  - Los `SKILL.md` de los cuatro gestores (`consultar-artefactos`, `actualizar-artefactos`, `operar-experiencias`, `operar-changelog`) — declaran el contrato de dominio que los documentos de reglas deben preservar: acciones delegadas, operaciones del catálogo y sus salidas.
  - Los scripts de `assets/` de los cuatro gestores — la fuente del conocimiento a trasladar: gramáticas de línea, variantes históricas toleradas, formas canónicas de escritura y condiciones de fallo.
- Patrones:
  - `references/` para material detallado que el cuerpo del skill carga bajo demanda (D005); `assets/` hoy mezcla plantillas con los scripts a sustituir.
  - Lectura tolerante, escritura canónica: los documentos deben declarar las variantes históricas aceptadas y la única forma que se escribe (D033).
  - Frontera dominio/convención de `PERSONALIZE.md`: las acciones nombran artefactos del dominio; ubicaciones, marcas, etiquetas y formatos de línea son convención personalizable.
  - `convenciones.sh` es hoy un archivo `CLAVE=valor` idéntico en los cuatro gestores que el instalador reescribe. Corrección del usuario en la puerta del plan: no habrá documento de convenciones —los literales se embeben en el documento de reglas que los usa y `PERSONALIZE.md` pasará a indicar qué archivo editar, sin índice de claves (tarea 147); la operación `convencion` desaparece y los consumidores de convenciones ajenas a artefactos embeben su literal (tarea 146).
- Dominio:
  - `docs/domains/001-ciclo-de-tareas.md` — el modelo del índice y del archivo de tarea: estado en dos sitios sincronizados, sublista de bloqueantes, veredictos.
  - `docs/domains/002-flujo-idea-a-tarea.md` — propuestas, borradores, épicas e ideas: el ciclo que las operaciones de promoción y procesado soportan.
  - `docs/domains/005-aprendizaje.md` — el registro append-only de experiencias y los índices por disparadores.
- Producto: `product-docs/vision.md` — el cambio es interno del motor; solo aporta el objetivo de portabilidad del paquete (los documentos viajan con los skills).
- PRD: ninguno — el hito es un encabezado ligero sin épica.
- Lecciones:
  - `contratos-de-skills` — las reglas van inline o en material que viaja con el paquete; las citas resolubles viven en Referencias; los formatos de artefactos producidos viven en `assets/` o `references/`, no re-descritos.
  - `diseno-de-artefactos` — diseño genérico sin acoplar a rutas del proyecto validado; publicar solo lo que tiene consumidor.
  - `consistencia-de-formatos` — estructura común entre los documentos nuevos; campos con varios datos como listas anidadas.
  - `validacion` — ejercitar cada variante de formato en todas sus posiciones significativas antes de la aprobación.
  - `flexibilidad-en-procesos` — listas declarativas abiertas: el catálogo de operaciones admite casos no listados.
  - `vocabulario` — español llano, sin derivaciones inventadas.
- Decisiones:
  - `D033` — el mecanismo que esta tarea rediseña: contrato único de los scripts, forma canónica de `## Estado` y posición de `## Desviaciones del plan`, que los documentos deben trasladar con la misma precisión.
  - `D003` — skills autocontenidos: condiciona dónde pueden vivir los documentos compartidos por varios gestores.
  - `D005` — el patrón `references/` es el hogar natural del material de reglas.
  - `D001`, `D002`, `D008`, `D010`, `D012`, `D014`, `D015`, `D017`, `D019` — los formatos de índice, tarea, propuesta, decisión e idea que los documentos describen.

## Conectividad


**Veredicto:** conectada.

Todo lo que la tarea asume existe: los cuatro gestores con sus scripts en `assets/` —fuente del conocimiento a trasladar—, el patrón `references/` vigente en doce skills como hogar del material declarativo (D005), el catálogo de convenciones en `PERSONALIZE.md` y los artefactos reales como referencia del formato vivo. Los directorios `references/` aún no existen dentro de los cuatro gestores —se crean dentro del alcance de la tarea—.

## Plan técnico


Los cuatro gestores mecánicos resuelven acciones de dominio ejecutando scripts bash propios que tienen embebida la gramática de cada artefacto —líneas, marcas, secciones, variantes históricas y forma canónica—. El cambio traslada ese conocimiento a documentos declarativos en `references/` (D005) con los literales de convención embebidos en cada documento —sin catálogo central—: el agente leerá el documento del artefacto y operará directamente sobre el archivo, sin script.

- [x] Definir la estructura común de los documentos de reglas y la regla de ubicación
  - Aporta: fija el contrato que da consistencia a los nueve documentos —identificación del artefacto y sus consumidores, ubicación y literales embebidos con valores por defecto, formato, lectura tolerante, escritura canónica y operaciones con sus condiciones de fallo— y resuelve el artefacto compartido sin duplicar reglas.
  - Contexto: el hogar es el `references/` del gestor dueño de la escritura canónica; los demás gestores lo referencian por ruta relativa `../<gestor>/references/<doc>.md` —permitido porque el material viaja con el paquete (lección de contratos de skills)—. La distribución: `actualizar-artefactos` aloja índice de tareas, tarea, propuesta, épica, idea y series; `consultar-artefactos` aloja el índice por disparadores; `operar-experiencias` y `operar-changelog` alojan los suyos.
- [x] Escribir los documentos de los artefactos mutables en `references/` de `actualizar-artefactos`: `indice-tareas.md`, `tarea.md`, `propuesta.md` —incluida la promoción de borradores—, `epica.md`, `idea.md` y - Aporta: cubre los artefactos compartidos por consulta y escritura con un único documento hogar; lo necesita la promoción.
  - Contexto: cada documento traslada del script correspondiente las gramáticas, las variantes toleradas, las formas canónicas y las condiciones de fallo; `## Estado` se escribe en forma canónica —línea completa de opciones con la vigente en negrita— y `## Desviaciones del plan` va antes de `## Revisión` (D033). Los literales van embebidos con los valores por defecto de la convención; la personalización posterior la guía `PERSONALIZE.md` por archivo (anotado en la tarea 147).
- [x] Escribir `indice-disparadores.md` en `references/` de `consultar-artefactos`
  - Aporta: cubre el único artefacto que solo el gestor de lectura opera —el formato de los `README.md` de decisiones y lecciones y la regla de `coincidencias`—.
  - Contexto: estos índices no tienen escritura delegada —los consumidores los escriben a mano—; el documento sirve de guía de formato además de regla de lectura.
- [x] Escribir `experiencias.md` y `changelog.md` en `references/` de sus gestores
  - Aporta: los dos gestores de un solo artefacto quedan autocontenidos con su documento propio.
  - Contexto: trasladar de `experiencias.sh` la forma canónica de la entrada y el invariante append-only, y de `changelog.sh` las seis categorías en orden canónico y el «sin no liberados» distinguible.
- [x] Verificar la cobertura operación a operación
  - Aporta: el criterio «toda operación expresable, ninguna perdida» queda demostrado con una matriz de los cuatro catálogos contra las reglas escritas —ninguna operación sin regla, ninguna regla huérfana—.
  - Contexto: la operación `convencion` desaparece por diseño —los literales quedan embebidos—; la tarea 146 lleva anotado que los consumidores de convenciones ajenas a artefactos embeben el suyo.
- [x] Verificar la equivalencia sobre casos fijos
  - Aporta: demuestra que la precisión de la escritura canónica no baja respecto a los scripts antes de que la tarea 146 los retire.
  - Contexto: aplicar las reglas a mano sobre una batería de artefactos representativos —cada variante de `## Estado` en posiciones no canónicas, las operaciones del índice, una entrada de experiencias, las secciones del changelog— y contrastar con la salida real de los scripts, que siguen presentes; la lección de validación pide ejercitar cada variante en todas sus posiciones significativas.

## Suite de pruebas esperada


Sin PRD —hito ligero—; las expectativas derivan del objetivo y los criterios de calidad. La verificación es manual: cobertura contra los catálogos y equivalencia contra la salida real de los scripts.

- Dado un documento de reglas y una operación del catálogo, un agente la ejecuta leyendo solo el documento —sin abrir el script ni el `SKILL.md` del gestor— (regresión del mecanismo).
- Dado `## Estado` en cualquier variante histórica —casilla suelta marcada o no, línea de opciones con la activa en negrita, negrita solo en la etiqueta— y con la marca en cualquier posición de la línea de opciones, la lectura por reglas resuelve el mismo estado que el script —`[x] En revisión` devuelve `en-revision`, nunca `completada` por la marca—. (B)
- Dada una mutación con formato de entrada no reconocido —sección ausente, referencia no localizada, línea de opciones no parseada—, la regla declara el fallo sin escribir, igual que el exit distinto de cero del script. (E)
- Dado el índice de tareas, sus cinco operaciones de consulta y sus ocho de escritura quedan cubiertas por reglas del mismo documento. (M)
- Dado un artefacto operado por dos gestores —el índice y las tareas—, su documento de reglas existe una sola vez y ambos gestores lo resuelven. (I)
- Dado un documento de reglas, los literales de convención que usa —rutas, marcas, etiquetas, formatos— están embebidos en él con los valores por defecto, sin catálogo externo que consultar. (I)
- Dado un artefacto sin resultados —índice sin tareas abiertas, registro sin entradas—, las reglas de lectura declaran el vacío legítimo como resultado y no como error. (Z)
- Dados los nueve tipos del inventario —índice, tarea, propuesta, épica, idea, índice por disparadores, experiencias, changelog, series—, existe un documento por tipo con la estructura común. (M)

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario (ejecución): [fecha] — [Aprueba | Solicita cambios]
- Usuario (cierre): [fecha] — [Aprueba | Solicita cambios]
