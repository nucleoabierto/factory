# Aplicar el triage sobre el cambio propio

## Estado

[ ] Pendiente | [~] En progreso | **[r] En revisión** | [x] Completada | [!] Bloqueada

## Tipo

desarrollo

## Objetivo

Crear el skill `mejorar-pr`: la segunda mitad del bloque autor y el cierre del lazo de revisión. A partir del documento de triage de `clasificar-comentarios`, aplica las correcciones al cambio propio, prepara las respuestas a los hilos marcados como responder y documenta los aplazamientos.

## Dependencias

- 140 — consume el documento de triage que produce `clasificar-comentarios`.

## Entrada

- El documento de triage de un PR propio y el propio PR —su rama local con el árbol de trabajo.
- Las convenciones del proyecto evaluado para aplicar correcciones coherentes con el código base.

## Resultado esperado

- `.agents/skills/mejorar-pr/SKILL.md` con su declaración y procedimiento, registrado en el manifiesto.
- Procedimiento que cubre: lectura del triage; aplicación de cada corrección marcada «corregir» sobre el árbol de trabajo, respetando las convenciones del proyecto; redacción de las respuestas a los hilos marcados «responder»; documentación de los aplazamientos con su razón en el propio documento de triage; resumen del trabajo en chat.
- Las respuestas preparadas y las correcciones aplicadas se presentan al usuario; la publicación de respuestas y el push siguen siendo puerta humana, como en el resto del sistema.

## Criterios de calidad

- Solo actúa sobre los hilos clasificados «corregir»; un hilo «responder» produce la respuesta redactada, no un cambio de código, y un «aplazar» queda documentado, no corregido.
- Cada corrección respeta las convenciones y lecciones del proyecto evaluado —el mismo estándar que exige la revisión del bloque revisor—.
- El skill no publica respuestas ni resuelve hilos en la plataforma sin confirmación; el efecto lateral queda tras la puerta humana, coherente con `comentar-pr`.
- Si el triage pide una corrección que contradice el cambio o una convención, el conflicto se presenta al usuario en lugar de resolverse en silencio.
- Tras aplicar las correcciones, el diff revisado vuelve a ser candidato a revisión —el lazo puede repetirse; el skill lo declara sin orquestarlo él mismo—.

## Procedimiento sugerido

1. Leer el triage y separar los hilos por veredicto.
2. Aplicar las correcciones una a una sobre el árbol de trabajo, verificando convenciones y lecciones aplicables.
3. Redactar las respuestas y documentar los aplazamientos.
4. Escribir el `SKILL.md` —el procedimiento arriba es del skill, no solo de esta tarea—, registrarlo en el manifiesto.

## Notas

- Con este borrador el lazo queda cerrado: revisar → comentar | clasificar → mejorar, con los dos actores separados y las puertas humanas en los efectos laterales.

## Contexto


- `Archivos similares:` `.agents/skills/clasificar-comentarios/SKILL.md` y `assets/triage.md` — productor y formato del documento que este skill consume, con el identificador `hilo:` de cada entrada; `.agents/skills/comentar-pr/SKILL.md` — hermano que ya resuelve `dir_revisiones_pr`, confronta la frescura del artefacto con el head del PR y publica bajo puerta humana; `.agents/skills/gestionar-pr/SKILL.md` — bucle de comentarios como plan de mejoras y convención «fuera de alcance → `crear-tareas` + responder con la referencia».
- `Patrones:` estructura común del SKILL.md; ubicaciones configurables resueltas con la operación `convencion` de `consultar-artefactos` y prefijo `.git/` sustituido por `git rev-parse --git-common-dir`; puerta humana literal antes de cada efecto lateral; una acción publicada por lote, no una lluvia de llamadas.
- `Dominio:` `docs/domains/001-ciclo-de-tareas.md` — el ciclo con pull request del que el lazo de revisión forma parte.
- `Producto:` `product-docs/vision.md` — la revisión de código como brecha que esta tarea cierra.
- `PRD:` `docs/prd/004-revision-codigo-producto.md` — CU-4 «Mejorar el cambio»: correcciones al árbol, respuestas redactadas, aplazamientos documentados, conflicto elevado al usuario.
- `Lecciones:` `contratos-de-skills.md` — referencias autocontenidas al paquete; `diseno-de-artefactos.md` — el triage es estado efímero con ciclo de vida declarado; `consistencia-de-formatos.md`; `vocabulario.md`.
- `Decisiones:` D003 — skill autocontenido; D004 — estándar Agent Skills; D005 — cuerpo bajo 500 líneas; D034 — las puertas humanas sobre los efectos laterales.

## Conectividad


**Veredicto: conectada.**

Todo lo que la tarea asume existe en el codebase: el documento de triage `pr-<n>-triage-<yyyymmdd>.md` lo produce `clasificar-comentarios` bajo `dir_revisiones_pr` con el identificador `hilo:` por entrada; `gh` está autenticado y las mutaciones de la mecánica nueva se verificaron por introspección del esquema —`addPullRequestReviewThreadReply` para responder hilos de línea, `resolveReviewThread`/`unresolveReviewThread` para resolverlos—; los cuerpos de review y la conversación no tienen hilo que responder —su respuesta es un comentario de conversación vía `issues/<n>/comments`—; `gestionar-pr` ya limpia `pr-<n>-*.md` al cerrar, lo que cubre el ciclo de vida del triage consumido sin clave nueva de catálogo.

## Plan técnico


**Subsistema:** `mejorar-pr` es la segunda mitad del bloque autor y cierra el lazo de revisión: consume el triage que `clasificar-comentarios` deja en `dir_revisiones_pr`, aplica los `corregir` al árbol de trabajo, publica las respuestas redactadas de los `responder`, documenta los `aplazar` y resuelve los hilos — todo efecto lateral tras confirmación. Mecánica verificada: los hilos de línea se responden con `addPullRequestReviewThreadReply` sobre el `hilo:` `PRRT_…` y se resuelven con `resolveReviewThread`; los cuerpos de review y la conversación no tienen hilo que responder ni resolver — su respuesta es un comentario de conversación que cita el origen.

### Acciones

- [x] **`.agents/skills/mejorar-pr/SKILL.md`** — el procedimiento completo:
  - Entrada (referencia del PR por número o rama actual; el árbol debe estar en la rama head del PR —`gh pr checkout` cuando no lo esté—).
  - Localización del triage (`dir_revisiones_pr` + `pr-<n>-triage-*.md`, mayor fecha y sufijo, con la sustitución `.git/` → `git rev-parse --git-common-dir`; sin triage → informar, sugerir `clasificar-comentarios`, terminar).
  - Frescura del triage (cargar los hilos abiertos de la plataforma; un hilo abierto sin entrada significa revisión nueva no clasificada → informar y proponer `clasificar-comentarios` antes de actuar).
  - `corregir` (aplicar cada corrección sobre el árbol respetando convenciones y lecciones —`consultar-lecciones`—; la corrección que contradice el cambio o una convención se eleva al usuario, nunca resolución silenciosa; commit con el skill `commit`; push tras confirmación).
  - `responder` (la respuesta ya viene redactada en la `propuesta` del triage; lote presentado y publicado solo tras confirmación, por el endpoint que dicta el `hilo:` —`PRRT_…` → `addPullRequestReviewThreadReply`; id de review o de comentario → comentario de conversación que cita a qué responde—).
  - `aplazar` (queda documentado con su razón en el triage; se redacta además la respuesta de aplazamiento al revisor —publicable bajo la misma puerta— y, cuando la razón es trabajo posterior, se ofrece registrarla con `crear-tareas` citando la referencia en la respuesta, convención de `gestionar-pr`).
  - Resolver (solo los hilos de línea `PRRT_…` con `resolveReviewThread`, después de que aterrice su resultado —`corregir` tras el push, `responder`/`aplazar` tras publicar la respuesta—; bajo la misma puerta).
  - Frontera (el diff corregido se declara candidato a una nueva revisión sin orquestarla; sin efectos silenciosos) y resumen en chat (qué se aplicó, qué se publicó, qué se resolvió).
- [x] **`teleprompter.json`** — registro alfabético.
- [x] **Documentos vivos** — `README.md`, `docs/mapa-de-flujos.md`, `docs/definicion-proyecto.md`.

## Suite de pruebas esperada


Trazadas a CU-4 del PRD:

- Solo los `corregir` modifican código; un `responder` produce respuesta, un `aplazar` queda documentado (B)
- Cada corrección respeta convenciones y lecciones del proyecto (B)
- Una corrección que contradice el cambio o una convención se eleva al usuario, nunca se resuelve en silencio (E)
- Cada respuesta llega al hilo correcto vía `hilo:` —`PRRT_` reply de hilo; review/conversación, respuesta citando el origen (B)
- Sin confirmación del usuario no hay push, publicación ni resolución (E)
- Solo los hilos de línea se resuelven, y después de que aterriza su resultado (B)
- Sin triage → informar y terminar; con hilos abiertos no triagiados → proponer `clasificar-comentarios` primero (B)
- El diff corregido se declara candidato a nueva revisión sin orquestarla (B)
- Manifiesto válido y alfabético; `bash -n`/`json.tool` si aplica

## Desviaciones del plan


- **La plantilla del triage gana `resultado:` y `hilo:` en preguntas abiertas.** Dos `important` de la revisión técnica, ambos del contrato entre skills: el consumidor escribía `resultado:` sin que el formato lo declarara, y una pregunta abierta sin `hilo:` ni ancla era irreconocible para la frescura —disparaba la alarma de «revisión nueva» en cada ejecución y no era deduplicable—. La plantilla `assets/triage.md` de `clasificar-comentarios` declara ahora el sub-ítem `resultado:` —que nace ausente— y exige `hilo:` en las preguntas abiertas; el paso de deduplicación del productor las cubre explícitamente.
- **Frescura bidireccional y respuestas condicionadas al push.** Los nits aplicables de la misma revisión: una entrada pendiente cuyo hilo ya se resolvió en la plataforma se omite con `resultado: resuelto en plataforma`; las correcciones se aplican en orden de severidad —el campo que el productor registra «para ordenar la ejecución» ya no viaja muerto—; las correcciones corren las verificaciones que correspondan antes de commitear —patrón de `gestionar-pr`—; y la respuesta de un `corregir` solo entra al lote si el push aterrizó —citar un commit ausente del remoto publica una referencia rota—.
- **Descartes anotados y frescura con head movido.** Ronda dogfooding de `revisar-pr` sobre el propio PR: `omitido — <motivo>` se declaraba en la plantilla sin escritor —un descarte del usuario se reproponía en cada ejecución—; ahora lo descartado en las puertas se anota igual que lo ejecutado. La frescura también confronta el `head triagiado` con el head actual y revalida los `corregir` pendientes —`isOutdated` incluido—; y la `propuesta:` de un `aplazar` quedó definida —la respuesta la redacta el consumidor desde la `razón`—.
- **Preguntas con camino de vuelta, ids GraphQL y estados no terminales.** Segunda ronda dogfooding: una pregunta abierta respondida por el usuario se promueve a entrada clasificada en la misma ejecución —la deduplicación la había vuelto terminal—; `hilo:` queda fijado al `node_id` de GraphQL en las tres superficies —el `id` numérico de REST no casa con la recarga—; y `resultado:` gana el estado no terminal `aplicado en <sha> — pendiente de push y respuesta`, que se retoma sin reaplicar. Nits aplicables: `propuesta` ya no se promete universal en la Salida, `crear-tareas` se amplía a todo aplazamiento que produce trabajo posterior y `resolveReviewThread` nombra su `threadId`.
- **Actividad posterior detectable vía `visto:`.** Tercera ronda dogfooding: la deduplicación por `hilo:` solo capturaba identidad —una réplica del revisor sobre un hilo ya triagiado o resuelto era invisible—; cada entrada registra ahora `visto:` —fecha del último comentario al triagiar— y la actividad posterior reentra a clasificación como entrada nueva de la ronda. Nits aplicables: prefijos de `node_id` corregidos a los reales (`PRRT_`/`PRR_`/`IC_` —`PRRP_` no existe—), la promoción de pregunta declara severidad y ronda, la recarga cubre hilos desaparecidos y premisas obsoletas con su anotación, `resultado:` compone efectos múltiples, `gh pr checkout` se complementa con `git pull` y la clave `dir_revisiones_pr` de `PERSONALIZE.md` cubre los triages.
- **Cierre del mecanismo `visto:`.** Cuarta ronda dogfooding: los resueltos se descartaban antes de la excepción de actividad —justo donde aterriza la réplica del revisor—, así que los registrados sobreviven al filtro; la reapertura se detecta por cambio de estado porque no genera comentario; y la anotación de `resultado:` avanza el `visto:` del hilo —sin ello las respuestas del propio flujo dispararían la alarma—, complementado por el filtro de la cuenta autenticada. `visto:` cubre también las preguntas abiertas y la promoción.
- **Línea base de resolución y reversión del descarte.** Quinta ronda dogfooding: la reapertura necesita un referente persistido —el componente `resuelto` del `resultado:` compuesto lo es—; y la corrección rechazada en la puerta del diff se revierte del árbol antes de commitear —aplicada sin registro divergiría del remoto—. Nits: el `visto:` más reciente por `hilo:` desempata entradas reentradas —la pendiente anterior se anota superada—, la pregunta promovida queda anotada, la revalidación por head movido cubre también `responder`/`aplazar` y el filtro de cuenta autenticada precisa su granularidad.
- **El par (`visto:`, `estado:`) como contrato de actividad.** Sexta ronda dogfooding —que además advirtió que la frescura llegaba al límite de la prosa—: la entrada nacida de actividad sobre un hilo resuelto era descartada por la regla «resuelto → omitir» porque el documento no registraba el estado al clasificar; la entrada gana `estado:` (`abierto`/`resuelto`), la detección queda como divergencia del par —comentario nuevo o reapertura— y la regla de omisión exime a la entrada que nació sobre hilo cerrado. Nits: `resuelto` se nombra en la anotación, el `pendiente` superado conserva el commit local referenciado, la promoción de pregunta tiene su `resultado:` declarado y el principio rector y la Finalización de `clasificar-comentarios` se alinean al contrato nuevo.

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario (ejecución): [fecha] — [Aprueba | Solicita cambios]
- Usuario (cierre): [fecha] — [Aprueba | Solicita cambios]
