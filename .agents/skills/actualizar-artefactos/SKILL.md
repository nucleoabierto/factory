---
name: actualizar-artefactos
description: >
  Ejecuta escrituras mecánicas sobre los artefactos del sistema
  —índice de tareas, archivos de tarea, propuestas y épicas, ideas
  persistidas y la promoción de borradores— preservando los formatos
  y escribiendo la forma canónica, para que los consumidores
  deleguen la mutación en lugar de re-describirla.
  Usar cuando un trabajo necesite mutar un artefacto del proyecto
  evaluado con una operación del catálogo.
  Sinónimos: actualizar artefactos, escritura de artefactos,
  mutación mecánica, cambiar estado de una tarea, actualizar el
  índice.
---

# Actualizar artefactos

Instrucciones para que un agente ejecute escrituras mecánicas sobre los artefactos del sistema. El skill recibe la orden delegada —artefacto objetivo, operación y términos— y la resuelve aplicando el documento de reglas del artefacto, que declara su formato, su escritura canónica y cada operación: el agente muta el artefacto directamente, preservando lo que no toca. Es la mitad de escritura del mecanismo de delegación: las consultas corresponden a `consultar-artefactos`.

## Cuándo usar

- Cuando un skill necesite mutar un artefacto del sistema —marcar una línea del índice, cambiar el `## Estado` de una tarea, insertar una sección, registrar un veredicto, mover líneas entre agrupaciones, marcar una idea como procesada, promover borradores— y la mutación sea una operación del catálogo.

## Cuándo no usar

- Para escrituras con juicio —redacción de contenido, reformulación, veredictos—: el skill ejecuta mecánica; qué escribir lo decide el consumidor.
- Para consultar los artefactos: eso corresponde a `consultar-artefactos`.
- Para mutaciones no cubiertas por el catálogo: el consumidor edita directamente; la operación puede incorporarse después en el documento de reglas del artefacto.

## Entrada

- La acción delegada del consumidor en términos de dominio —«marcar la tarea completada», «registrar el veredicto», «promover los borradores de la propuesta»— con las referencias de dominio que la acción pida: la tarea, la propuesta, la épica o la idea por su referencia; nunca una ubicación, marca o sección que el documento de reglas resuelve.

## Salida

- El artefacto mutado en su ubicación. Las operaciones que producen un dato —`encabezado`, `promover`— lo devuelven en formato parseable. Una mutación que no puede ejecutarse falla con diagnóstico, sin escribir.

## Principios rectores

1. **Preservar lo que no se toca:** las mutaciones reescriben solo lo que la operación declara: sublistas de bloqueo, comentarios de épica, secciones ajenas y contenido quedan intactos.
2. **La acción es completa:** el consumidor delega la acción y sus referencias de dominio; el gestor resuelve ubicación, formato y aplicación —qué artefactos toca un estado, con qué marca y etiqueta— desde el documento de reglas de cada artefacto; las decisiones —qué estado poner, qué texto escribir— son del consumidor.
3. **Escritura canónica, lectura tolerante:** `## Estado` se escribe siempre en la forma canónica que declara `references/tarea.md` aunque la entrada sea una variante histórica; las secciones nuevas van en la posición que el documento fija —antes de `## Desviaciones del plan`, o en su defecto antes de `## Revisión`— (D033).
4. **Falla sin escribir:** ante un formato inesperado —sección ausente, referencia no localizada, línea de opciones no parseada— la operación falla con diagnóstico y no modifica el archivo.
5. **Promoción sin reescritura:** la promoción de borradores mueve archivos, inyecta las secciones que faltan y renumera referencias; no reformula el contenido aprobado (D014).
6. **Contrato único:** las operaciones devuelven datos parseables cuando producen un dato, reportan el fallo con diagnóstico y no escriben cuando no pueden ejecutarse; la entrada ausente o la invocación inválida también son fallo (D033).

## Procedimiento

1. **Recibir la acción delegada:** el consumidor indica la acción de dominio y sus referencias.
2. **Resolver la operación y leer el documento de reglas:** la acción mapea a las operaciones del catálogo; el objetivo —el artefacto a mutar— y los literales —marcas, etiquetas de estado, nombres de sección, formatos de línea— los declara el documento de reglas del artefacto, salvo la referencia de dominio pasada.
3. **Operar el archivo directamente** siguiendo las reglas de escritura del documento de cada operación de la expansión —una acción puede componer varias—; el cuerpo de las secciones nuevas lo da el consumidor.
4. **Transmitir el resultado al consumidor:** un fallo se comunica con su diagnóstico, sin reinterpretarlo.

## Acciones

El consumidor delega la acción de dominio; el gestor la expande a las operaciones del catálogo y resuelve lo que la acción no nombra. Los estados se nombran en el vocabulario del dominio —`pendiente`, `en-progreso`, `en-revision`, `completada`, `bloqueada`, `borrador`, `pendiente-de-revision`, `aprobada`, `descartada`, `planificada`— y el gestor los traduce a la marca y la etiqueta que declara el documento de reglas. Las secciones se nombran por su concepto —`estado`, `revision`, `dependencias`, `plan`, `suite`, `contexto`, `conectividad`, `desviaciones`, `borradores`, `piezas`— y el gestor las traduce al nombre declarado.

- «marcar la tarea `<ref>` como `<estado>`»: `marcar` sobre el índice con la marca declarada del estado y `estado` sobre el archivo de la tarea con su etiqueta —las dos mutaciones que el estado implica—.
- «declarar la tarea `<ref>` bloqueada por `<refs>`»: la misma acción de estado con `bloqueada`, pasando los bloqueantes a `marcar`.
- «dar de alta la tarea `<ref>` «`<título>`» bajo `<agrupación>`»: compone la línea con el formato declarado —marca pendiente, referencia, título— y `añadir`; `<agrupación>` `general` o `propuestas` denota las secciones fijas, otro texto casa con un encabezado.
- «dar de alta la propuesta `<dir>` «`<título>`» (`<n>` borradores)»: compone la línea de propuesta en revisión con el formato declarado —marca de propuesta, directorio, título y cuenta— y `añadir` sobre la sección de propuestas.
- «retirar `<ref>` del índice»: `retirar`.
- «mover `<ref>` bajo `<agrupación>`»: `mover`.
- «recolocar `<ref>` `antes-de`|`después-de` `<ref2>`|`final`»: `recolocar`.
- «retirar la agrupación `<ref>`»: `retirar-grupo`.
- «crear la agrupación «`<título>`» [con épica `<ref>`]»: `encabezado`; devuelve el encabezado creado.
- «inicializar el índice»: `inicializar`.
- «cambiar el estado de `<ref>` a `<estado>`»: `estado` sobre el documento indicado —la propuesta, la épica u otro documento con línea de estado—.
- «marcar la opción `<estado>` del estado de `<ref>`»: `marcar-opcion` —el estado acumulativo de las épicas—.
- «registrar el veredicto `<autor>` `<veredicto>` en `<ref>`»: compone la línea con el formato declarado —autor, fecha de hoy, veredicto— y `registrar-revision`.
- «insertar la sección `<concepto>` en `<ref>` con el cuerpo dado»: `insertar-seccion` con el cuerpo dado por el consumidor.
- «añadir la línea `<línea>` a la sección `<concepto>` de `<ref>`»: `añadir-linea`.
- «marcar completado el ítem `<texto>` de la sección `<concepto>` de `<ref>`»: `marcar-item`.
- «sustituir el ítem `<texto>` de la sección `<concepto>` de `<ref>` por el cuerpo dado»: `sustituir-item` con el cuerpo dado por el consumidor.
- «marcar la idea `<ref>` procesada en `<destino>`»: `procesada`.
- «promover los borradores de la propuesta `<dir>`»: `promover`, con el directorio de tareas y el índice que declara el documento de reglas; devuelve la correspondencia `MM→NNN→ruta` por borrador.

## Catálogo de operaciones

Cada operación se resuelve aplicando la sección de su nombre en el documento de reglas que encabeza su grupo —el agente muta el archivo directamente con las herramientas habituales, sin scripts—. Las referencias `<ref>` y los `<texto>` casan por subcadena con la línea o el encabezado; conviene pasar la ruta del archivo o el encabezado completo para que sean únicas —las excepciones las declara cada documento—. Toda mutación que no puede ejecutarse es fallo con diagnóstico y sin escribir; solo `encabezado` y `promover` devuelven un dato.

### `references/indice-tareas.md` — el índice de tareas (`TODO.md`)

- `marcar <ref> <marca> [bloqueante…]`
- `añadir <sección> <línea>`
- `retirar <ref>`
- `mover <ref> <encabezado>`
- `recolocar <ref> <pos> [ref2]`
- `retirar-grupo <ref>`
- `encabezado <título> [épica]`
- `inicializar`

### `references/tarea.md` — un archivo de tarea, propuesta o épica

Las particularidades de propuestas y épicas las declaran `propuesta.md` y `epica.md` del mismo directorio.

- `estado <etiqueta>`
- `marcar-opcion <etiqueta>`
- `insertar-seccion <título>`
- `registrar-revision <línea>`
- `añadir-linea <sección> <línea>`
- `marcar-item <sección> <texto>`
- `sustituir-item <sección> <texto>`

### `references/idea.md` — un archivo de idea persistida

- `procesada <destino>`

### `references/propuesta.md` — la promoción de borradores

- `promover`

El cambio de estado del `propuesta.md` a aprobada y la retirada de su línea del índice son órdenes aparte, que delega el consumidor —`estado` del documento de tarea y `retirar` del índice—.

### Cobertura

Todas las operaciones tienen al menos un skill consumidor. Los artefactos del ciclo aún sin operación delegada figuran en la sección Cobertura de `consultar-artefactos`.

## Finalización

El skill ha terminado cuando el artefacto quedó mutado según la orden —o el consumidor recibió el diagnóstico de la operación fallida—.

## Referencias

- `docs/decisions/D033-pasos-mecanicos-skills-utilidad-scripts.md` — El mecanismo de delegación y las formas canónicas que estas operaciones escriben; los scripts que introdujo fueron sustituidos por los documentos de reglas.
- `references/` — Los documentos de reglas de los artefactos: `indice-tareas.md`, `tarea.md`, `propuesta.md`, `epica.md`, `idea.md`.
- `.agents/skills/consultar-artefactos/SKILL.md` — La mitad de lectura del mecanismo.
