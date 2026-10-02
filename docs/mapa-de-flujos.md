# Mapa de flujos

Cómo se conectan los skills de `.agents/skills/` en flujos: qué orquestadores hay, qué capacidades invoca cada uno y en qué orden, qué artefactos transportan el estado entre invocaciones, dónde están las puertas humanas y qué skills se activan sin invocación explícita. Describe el cableado vigente —la fuente de verdad son los `SKILL.md`— y se actualiza cuando el cableado cambia.

## Grados de conexión

Toda conexión entre skills cae en uno de tres grados:

- **Invocación explícita:** el `SKILL.md` del llamador nombra al skill invocado en su procedimiento. Ejemplo: `ejecutar-tareas` invoca `mantener-changelog` al cerrar cada tarea.
- **Convención del arnés:** ningún skill lo invoca; su propia descripción declara cuándo aplica y el agente lo activa al reconocer la condición. Ejemplo: `aplicar-guia-estilo` entra cuando un trabajo toca frontend en un proyecto con `DESIGN.md`, sin que ningún orquestador lo nombre.
- **Uso bajo demanda:** solo entra en juego cuando el usuario lo pide. Ejemplo: `liberar-version`.

El grado es de la conexión, no del skill: casi todos los skills declaran además un «Cuándo usar» bajo demanda (`crear-tareas` atiende solicitudes articuladas, `commit` commitea cuando se pide, las capacidades internas de los flujos se pueden invocar sueltas). Las secciones siguientes describen las conexiones que forman los flujos; la demanda directa del usuario siempre existe como puerta adicional.

## Flujo de idea a tarea

- **Orquestador:** `idea-a-tarea`.
- **Puntos de entrada:**
  - Una idea suelta que el usuario trae a la conversación.
  - Las propuestas pendientes `[p]` de la sección «Propuestas en revisión» de `TODO.txt`, que el orquestador procesa primero —una propuesta sin resolver bloquea el inicio de un flujo nuevo.
  - Las ideas persistidas sin procesar de `docs/ideas/` —archivos escritos por `lluvia-de-ideas`, que actúa bajo demanda—, reconocibles por la ausencia de la marca «Procesada en» en su cabecera y ordenadas por su «Orden sugerido».
- **Capacidades en orden:** `descubrir-problema` (produce problema + oportunidad en la conversación, sin archivo) → `proponer-forma-solucion` (produce forma de solución + alternativas + fuera de alcance, también en la conversación) → `refinar-propuesta` (materializa `docs/proposals/NNN-slug/` con `propuesta.md` y un borrador `MM-titulo.md` por tarea, y añade la línea `[p]` a `TODO.txt`). El orquestador transporta la salida de cada capacidad completa a la siguiente; no la resume ni la reformula.
- **Capacidad auxiliar:** `refinar-propuesta` invoca `investigar` cuando un borrador necesita evidencia externa para definirse; la referencia queda en «Investigaciones de apoyo» de `propuesta.md`.
- **Puerta asíncrona:** tras `refinar-propuesta` el agente se detiene con la propuesta en `[p]`. La decisión del usuario puede llegar en otra sesión, por eso la primera acción del orquestador es siempre leer `TODO.txt`.
- **Resolución de la propuesta:**
  - Aprobada → `crear-tareas` en modo flujo de idea a tarea: registra la decisión en el campo Revisión de `propuesta.md`, promociona cada borrador a `docs/tasks/NNN-slug.md` sin reescritura, deja las entradas en `## General` de `TODO.txt` y marca la propuesta `[a]` Aprobada. A continuación `planificar` en modo promoción agrupa el conjunto: épica en `docs/epics/NNN-slug.md` con su encabezado y comentario de enlace en `TODO.txt`, o encabezado ligero sin documento si el conjunto no la amerita.
  - Cambios solicitados → la línea `[p]` se retira, la propuesta vuelve a `[ ]` Borrador, se aplican los cambios y se reenvía a revisión siguiendo la sección de envío de `refinar-propuesta`.
  - Rechazada → la línea se elimina y `propuesta.md` pasa a `[d]` Descartada; el directorio se conserva para trazabilidad.
  - Borrador de épica rechazado → las tareas quedan en `## General` sin agrupar y la propuesta se considera procesada igualmente.
- **Puertas humanas:** validación del problema enmarcado; validación de la forma de solución; decisión sobre la propuesta (asíncrona); aprobación del borrador de épica dentro de `planificar`.
- **Artefactos de estado:** `TODO.txt` (marcador `[p]` y agrupación resultante), `propuesta.md` (ciclo `[ ]` → `[p]` → `[a]`/`[d]` y campo Revisión), los borradores `MM-titulo.md`, `docs/ideas/NNN-slug.md` (cabecera con «Orden sugerido» y marca «Procesada en»), `docs/epics/NNN-slug.md`.
- **Cruce con el ciclo de tareas:** `ejecutar-tareas` detecta las líneas `[p]` al leer el índice, informa al usuario y deriva su procesamiento a este flujo antes de tomar la siguiente tarea pendiente.

## Ciclo de tareas

- **Orquestador:** `ejecutar-tareas`.
- **Punto de entrada:** `TODO.txt`, que indexa tareas por hitos o sueltas en «General» más las propuestas en revisión.
- **Por iteración:**
  1. Toma la siguiente tarea `[ ]` no bloqueada —o retoma la `[~]`— y la marca en progreso en `TODO.txt` y en el campo «Estado» de su archivo.
  2. Invoca `consultar-lecciones` con la descripción de la tarea.
  3. Si la tarea figura bajo un encabezado con comentario `<!-- épica: docs/epics/NNN-slug.md -->`, lee la épica: su plan técnico es la guía de arquitectura de la ejecución.
  4. Enruta por el campo «Tipo» del archivo según el registro «Enrutado por tipo» del propio skill (ver el sub-flujo de desarrollo). Sin tipo o sin especialista registrado, la ejecuta con el comportamiento general.
  5. El trabajo descubierto se da de alta con `crear-tareas` en modo independiente y no se ejecuta en la iteración; una dependencia no resuelta marca la tarea `[!]` con sublista de bloqueantes.
- **Revisión dual:** al terminar, la tarea pasa a `[r]` y un subagente de contexto aislado revisa el diff —recibe el archivo de tarea y la ubicación de los cambios, no el razonamiento del ejecutor— y coteja contra las lecciones de `docs/lessons/`. Para tareas del sub-flujo de desarrollo la revisión corre por el skill `revisar-implementacion`; para el resto es el subagente genérico descrito en el procedimiento. Si aprueba, el usuario da la aprobación final; ambos veredictos quedan en el campo «Revisión» del archivo.
- **Cierre:** con la doble aprobación, la tarea pasa a `[x]` en `TODO.txt` y en su archivo, y corren los sensores de cierre (sección siguiente) antes del `commit`. El ciclo repite hasta que no quedan tareas pendientes.
- **Puertas humanas:** la aprobación del plan dentro del sub-flujo de desarrollo; la confirmación de desviaciones mayores dentro de `ejecutar-implementacion`; la aprobación final de cada tarea; la validación de las entradas de `EXPERIENCIAS.md` antes de escribirlas.
- **Artefactos de estado:** `TODO.txt` (marcadores, bloqueos y agrupaciones) y el archivo de tarea, que acumula «Estado», «Tipo» y las secciones del sub-flujo más «Revisión» —cada sección registrada es un estado resumible: una sesión nueva continúa desde las secciones presentes, no de memoria.

## Sub-flujo de desarrollo

Corre dentro de una tarea del ciclo cuando su tipo es `desarrollo` o `mantenimiento (refactoring)`. `ejecutar-tareas` elige el punto de entrada según el estado de planeación registrado en el archivo de la tarea, no según la sesión.

- **Mitad de planeación — `planear-tarea`** (sin `## Plan técnico` y `## Suite de pruebas esperada` aprobados):
  1. Revisa las dependencias: una dependencia con plan aprobado pero sin ejecutar sirve de base; una sin plan bloquea la planeación.
  2. `recopilar-contexto` escribe `## Contexto` —archivos similares, patrones, documentación de dominio y de producto, lecciones vía `consultar-lecciones` y decisiones vía `consultar-decisiones`—; es la única capacidad que invoca `consultar-decisiones`.
  3. `evaluar-conectividad` escribe `## Conectividad` con el veredicto; si es `desconectada`, `planear-tarea` da de alta la tarea puente con `crear-tareas`, declara la dependencia bloqueante y el ejecutor marca la tarea `[!]`.
  4. `planear-implementacion` produce `## Plan técnico` —checklist de acciones conceptuales con `Aporta:` y, cuando procede, `Contexto:`— y `## Suite de pruebas esperada` —expectativas trazadas a casos de uso con su letra ZOMBIE—, sometidos a la puerta humana.
- **Mitad de ejecución — `desarrollar-tarea`** (con plan y suite aprobados): valida las secciones e invoca `ejecutar-implementacion`, que implementa la checklist en orden, cubre la suite, marca cada acción `[x]` y registra `## Desviaciones del plan` si las hubo. Puede delegar acciones independientes a subagentes —la acción y su `Contexto:` viajan inline en el encargo— y escala al usuario las desviaciones que cambian objetivo, alcance o la guía de la épica. Si la planeación termina aprobada dentro de la misma iteración, el ejecutor continúa directamente con `desarrollar-tarea`.
- **Revisión:** `revisar-implementacion` ocupa el paso de revisión del ciclo, con verificación nominal del plan —cada acción contra su realización en el diff o su desviación registrada— además de los criterios de calidad.
- **Sensores de cierre específicos:** además de los comunes, `documentar-dominio` y `documentar-producto` evalúan el diff —cada uno puede terminar en «sin impacto»— y `decisiones-diseno` se invoca si el diff introdujo una decisión estructural implícita. Si `documentar-dominio` detecta divergencia estructural, el ejecutor comunica la recomendación de `revisar-arquitectura`: se recomienda, no se ejecuta.

## Sensores de cierre

Invocaciones que `ejecutar-tareas` dispara al cerrar una tarea, tras la doble aprobación y antes del commit. Los sensores de diff —`mantener-changelog`, `documentar-dominio` y `documentar-producto`— reciben la ubicación de los cambios, árbol de trabajo sin commitear, y reconstruyen el diff por sí mismos; `registrar-experiencias` trabaja sobre la conversación de la sesión y `decisiones-diseno` sobre la decisión estructural que el ejecutor identifica en el diff.

- **Para todo tipo de tarea:** `registrar-experiencias` —solo si el usuario corrigió durante la tarea— y `mantener-changelog`, que evalúa si el cambio tiene impacto observable para el consumidor y emite «sin entrada» cuando no.
- **Solo para el sub-flujo de desarrollo:** `documentar-dominio`, `documentar-producto` y, cuando procede, `decisiones-diseno`.
- **Commit:** el skill `commit` registra los cambios de la tarea y la actualización de `TODO.txt`.

## Artefactos que transportan estado

El estado entre invocaciones —y entre sesiones— viaja en artefactos, no en la conversación:

- **`TODO.txt`:** índice único de trabajo activo. `refinar-propuesta` añade las líneas `[p]`; `idea-a-tarea` las procesa; `crear-tareas` añade las entradas de tarea; `planificar` las agrupa bajo encabezados con comentario de épica; `planificar-roadmap` reordena las agrupaciones para reflejar los horizontes Now y Next del roadmap; `ejecutar-tareas` mantiene los marcadores de estado. Los hitos completados se eliminan del índice.
- **`docs/tasks/NNN-slug.md`:** el archivo de la tarea porta su estado interno: «Estado» sincronizado con `TODO.txt`, «Tipo» para el enrutado, las secciones acumulativas del sub-flujo de desarrollo (`## Contexto`, `## Conectividad`, `## Plan técnico`, `## Suite de pruebas esperada`, `## Desviaciones del plan`) y «Revisión».
- **`docs/proposals/NNN-slug/`:** `propuesta.md` con su ciclo de vida en el campo Estado y las decisiones del usuario en «Revisión»; los borradores `MM-titulo.md` se mueven a `docs/tasks/` sin reescritura al promocionar.
- **`docs/ideas/NNN-slug.md`:** entrada persistida del flujo de idea a tarea, escrita por `lluvia-de-ideas`; `idea-a-tarea` la marca «Procesada en» al consumirla.
- **`docs/epics/NNN-slug.md`:** objetivo, alcance, piezas, plan técnico —la guía de arquitectura que `planear-implementacion` y `ejecutar-implementacion` respetan—, criterio de cierre y estado. Enlazada desde el encabezado de su agrupación en `TODO.txt`.
- **`ROADMAP.md`:** líneas de trabajo por horizontes de confianza, escrito por `planificar-roadmap`; `TODO.txt` refleja mecánicamente solo Now y Next.
- **`EXPERIENCIAS.md`:** log append-only de correcciones del usuario; `registrar-experiencias` lo escribe al cierre y `consolidar-lecciones` lo lee y marca las entradas consolidadas, sin borrarlas.
- **`docs/lessons/` y su `README.md`:** lecciones consolidadas por tema con disparadores; `consultar-lecciones` las recupera al inicio de cada tarea y el subagente de revisión las coteja contra el diff.
- **`docs/decisions/` y su `README.md`:** decisiones vigentes con disparadores y estado; `consultar-decisiones` las recupera, invocado por `recopilar-contexto` o en cualquier punto de una sesión.
- **`docs/domains/` y su `README.md`:** documentación viva del modelo de dominio, escrita por `documentar-dominio`; la leen `recopilar-contexto` y `revisar-arquitectura`.
- **Documentación de producto del proyecto evaluado** (en Factory, `product-docs/`): comportamiento observable anclado a la suite de pruebas, escrita por `documentar-producto`; la lee `recopilar-contexto`.
- **`CHANGELOG.md` del proyecto evaluado:** `mantener-changelog` acumula los no liberados al cerrar cada tarea; `liberar-version` los cura y promueve a versión bajo demanda.
- **`DESIGN.md` del proyecto evaluado:** contrato de diseño mantenido por `documentar-guia-estilo` y consumido por `aplicar-guia-estilo`.
- **`docs/research/`:** investigaciones producidas por `investigar`; las propuestas las referencian en «Investigaciones de apoyo» y los skills en sus secciones «Referencias».
- **`docs/architecture-reviews/`:** informes persistidos por `revisar-arquitectura`; el campo «Derivado en» de cada hallazgo enlaza la tarea o decisión que lo materializó.

## Conexiones por convención del arnés

- **El par de guía de estilo:** `documentar-guia-estilo` y `aplicar-guia-estilo` no los invoca ningún orquestador ni sensor. Sus descripciones declaran las condiciones —trabajo que toca frontend, proyecto con `DESIGN.md`, validación de un cambio visual— y el agente los activa al reconocerlas; el ciclo de tareas no los cablea.
- **Revisión y pulido preventivos:** `revisar-redaccion` seguido de `pulir-escritura` es una invocación explícita pero condicionada —«si el arnés lo permite»— declarada por nombre en los skills que producen texto consolidado: `descubrir-problema`, `proponer-forma-solucion`, `refinar-propuesta`, `crear-tareas`, `planificar`, `planificar-roadmap`, `planear-implementacion`, `decisiones-diseno` y `lluvia-de-ideas`; `investigar` declara la misma invocación por capacidad —«skills o herramientas de revisión de redacción y pulido mecánico»— sin nombrarlos. `pulir-escritura` exige que el texto haya pasado antes por la revisión de redacción.
- **El subagente de revisión genérico** del ciclo de tareas es mecánica inline del procedimiento de `ejecutar-tareas`, no un skill: solo el sub-flujo de desarrollo lo sustituye por `revisar-implementacion`.
- **`revisar-arquitectura` por recomendación:** `documentar-dominio` puede recomendarla al detectar divergencia estructural; el ejecutor la comunica al usuario y solo se ejecuta si el usuario la pide —una recomendación no es una invocación. Cuando corre, sus hallazgos derivan en tareas o decisiones vía `crear-tareas` y `decisiones-diseno`, siempre con aprobación del usuario.

## Referencias

- `docs/decisions/D001-todo-txt-como-indice-unico.md` y `docs/decisions/D015-extension-de-d001-para-indice-de-propuestas.md` — `TODO.txt` como índice de tareas y propuestas.
- `docs/decisions/D008-organizacion-por-hitos-en-todo.md` y `docs/decisions/D017-todo-txt-indice-de-trabajo-activo.md` — Agrupación por hitos e índice de solo trabajo activo.
- `docs/decisions/D009-flujo-revision-dual.md` — La revisión dual del ciclo de tareas.
- `docs/decisions/D012-formato-y-ubicacion-de-las-propuestas.md`, `docs/decisions/D013-mecanismo-borradores-reflejo-todo.md` y `docs/decisions/D016-campos-de-propuesta-md.md` — El artefacto propuesta y su ciclo de vida.
- `docs/decisions/D014-funcion-dual-crear-tareas.md` — Los dos modos de `crear-tareas`.
- `docs/decisions/D019-epica-como-artefacto-de-planeacion.md` — La épica como guía de arquitectura del conjunto.
- `docs/decisions/D021-documentacion-dominio-y-revision-arquitectura.md` y `docs/decisions/D025-sensor-documentacion-producto.md` — La división sensor continuo / evaluación bajo demanda, en dominio y en producto.
- `docs/decisions/D022-roadmap-como-nivel-de-direccion.md` y `docs/decisions/D027-roadmap-horizontes-now-next-later.md` — El roadmap como nivel de dirección y su reflejo en el índice.
- `docs/decisions/D030-ideas-persistidas-en-docs-ideas.md` — `docs/ideas/` como entrada persistida del flujo.
- `docs/decisions/D031-flujo-desarrollo-dividido-en-planear-y-ejecutar.md` — El sub-flujo de desarrollo dividido en `planear-tarea` y `desarrollar-tarea` (sustituye a D020).
- `docs/decisions/D006-skills-redaccion-separados.md` — La cadena revisar-redaccion → pulir-escritura.
