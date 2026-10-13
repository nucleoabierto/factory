# Triage de la revisión recibida en un pull request propio

## Estado

[ ] Pendiente | [~] En progreso | [r] En revisión | **[x] Completada** | [!] Bloqueada

## Tipo

desarrollo

## Objetivo

Crear el skill `clasificar-comentarios`: la primera mitad del bloque autor. Clasifica los hilos de revisión abiertos de un PR propio en acciones —corregir, responder, aplazar— con la respuesta o corrección propuesta por hilo, y produce el documento de triage.

## Dependencias

- Ninguna — es el bloque autor, independiente del bloque revisor; conviene coordinar formatos con los borradores 01-02 si ya existen.

## Entrada

- Un PR propio con comentarios de revisión —identificable por número o por la rama actual—.
- La convención de clasificación: cada hilo abierto recibe un veredicto —corregir, responder, aplazar— con su propuesta concreta.

## Resultado esperado

- `.agents/skills/clasificar-comentarios/SKILL.md` con su declaración y procedimiento, registrado en el manifiesto.
- Procedimiento que cubre: resolución del PR; carga de los hilos de revisión con su estado —abiertos; los resueltos o ya triagiados se omiten—; clasificación de cada hilo abierto en corregir / responder / aplazar, con la corrección o respuesta propuesta y la severidad que el hilo merece; producción del documento de triage persistido, con resumen en chat.
- Hilos con intención poco clara van a preguntas abiertas del documento, no a suposiciones.
- Hilos agrupables por tema pueden delegarse en subagentes paralelos, siguiendo el patrón de delegación ya establecido.

## Criterios de calidad

- Solo análisis: el skill no responde, no resuelve hilos, no modifica el cambio; su producto es el documento de triage.
- Cada hilo abierto queda clasificado exactamente una vez; los resueltos no entran salvo que aporten contexto a uno abierto.
- Un hilo ya procesado en un triage anterior no se vuelve a clasificar —el documento es acumulable por rondas de revisión—.
- Las propuestas de corrección citan el código y la regla o intención del comentario; un aplazamiento lleva su razón.
- Ubicación del documento por convención, coherente con la del informe de revisión del bloque revisor.

## Procedimiento sugerido

1. Definir el formato del documento de triage —por hilo: veredicto, severidad, propuesta, razón del aplazamiento si aplica— y su ubicación por convención.
2. Definir la obtención de hilos vía `gh` —estado abierto vs. resuelto— y el criterio de omisión de los ya triagiados.
3. Escribir el `SKILL.md`, registrarlo en el manifiesto.

## Notas

- El documento de triage es la entrada natural del borrador 04, que aplica las correcciones; conviene dejar el formato pensado para ese consumo.

## Contexto

- `Archivos similares:` `.agents/skills/revisar-pr/SKILL.md` — modelo de carga de hilos de revisión en las tres superficies con `--paginate` y del uso de `gh` sobre PRs; `.agents/skills/revisar-pr/assets/informe.md` — referencia de la plantilla de artefacto en `assets/`; `.agents/skills/comentar-pr/SKILL.md` — hermano que ya resuelve `dir_revisiones_pr` con sustitución de `.git/` y confronta el head del PR.
- `Patrones:` estructura común del SKILL.md; ubicaciones configurables resueltas con la operación `convencion` de `consultar-artefactos` y prefijo `.git/` sustituido por `git rev-parse --git-common-dir`; artefacto producido como plantilla en `assets/`; estado local efímero con ciclo de vida ligado al cierre del PR; delegación a subagentes paralelos del patrón de `revisar-pr`/`ejecutar-tareas`.
- `Dominio:` `docs/domains/001-ciclo-de-tareas.md` — el ciclo con pull request al que el bloque autor se suma.
- `Producto:` `product-docs/vision.md` — la revisión de código como brecha que esta tarea sigue cerrando.
- `PRD:` `docs/prd/004-revision-codigo-producto.md` — CU-3 «Clasificar la revisión recibida»: cada hilo abierto clasificado en corregir/responder/aplazar con propuesta; documento de triage acumulable.
- `Lecciones:` `diseno-de-artefactos.md` — el triage es estado efímero fuera del control de versiones con ciclo de vida declarado; `contratos-de-skills.md` — formato en plantilla `assets/`, referencias autocontenidas; `consistencia-de-formatos.md`; `vocabulario.md`.
- `Decisiones:` D003 — skill autocontenido; D004 — estándar Agent Skills; D005 — cuerpo bajo 500 líneas; D033 — delegación mecánica cuando aplica.

## Conectividad

**Veredicto: conectada.**

Todo lo que la tarea asume existe en el codebase: la convención `dir_revisiones_pr` está registrada y resuelve `.git/factory/pr-reviews`; `gh` está autenticado contra GitHub y los tres endpoints de lectura de la revisión recibida son los mismos ya verificados en las tareas 138-139 —GraphQL `reviewThreads` con `isResolved`/`isOutdated`, `pulls/<n>/reviews` e `issues/<n>/comments`, todos con `--paginate`—; `gestionar-pr` ya limpia `pr-<n>-*.md` al cerrar, lo que cubre el ciclo de vida del documento `pr-<n>-triage-*.md` sin clave nueva de catálogo. El patrón del comentario «lee el hilo» → mejorar el código ya existe en `gestionar-pr`.

## Plan técnico

**Subsistema:** `clasificar-comentarios` es la primera mitad del bloque autor: lee la revisión que un PR propio recibió y produce el documento de triage que `mejorar-pr` (141) consumirá. Decisiones heredadas: el documento es estado local efímero —misma convención `dir_revisiones_pr`, patrón `pr-<n>-triage-<fecha>.md` cubierto por la limpieza `pr-<n>-*.md` de `gestionar-pr`, sin clave nueva—; el formato vive en plantilla `assets/triage.md` con listas anidadas, no tablas (corrección del usuario).

### Acciones

- [x] **`assets/triage.md`** — plantilla del documento con listas anidadas: cabecera (fecha, PR, head triagiado, ronda), resumen anidado por veredicto, una entrada por hilo —ancla + cita + autor como ítem, hilo/veredicto/severidad/propuesta/razón/ronda como sub-ítems— y preguntas abiertas.
- [x] **`.agents/skills/clasificar-comentarios/SKILL.md`**: entrada (referencia del PR por número o rama actual; sin PR → informar y terminar); carga de las tres superficies con `--paginate` (hilos inline GraphQL con `isResolved`/`isOutdated`, reviews, conversación); omisión (resueltos no entran salvo como contexto de uno abierto; ya triagiados en un documento previo del mismo PR no se reclasifican —documento acumulable por rondas); clasificación por hilo (`corregir` con propuesta citando código y regla o intención; `responder` con respuesta redactada —si la respuesta sería «lee el hilo», el código falló y la propuesta es mejorarlo: patrón de `gestionar-pr`; `aplazar` con razón obligatoria); severidad como revisor-autor; intención ambigua → preguntas abiertas, nunca suposición; delegación opcional en subagentes paralelos por tema; frontera (solo análisis —no responde, no resuelve, no modifica: eso es `mejorar-pr`).
- [x] **`teleprompter.json`** — registro alfabético.
- [x] **Documentos vivos** — `README.md`, `docs/mapa-de-flujos.md`, `docs/definicion-proyecto.md` si aplica.

## Suite de pruebas esperada

Trazadas a CU-3 del PRD:

- Sobre un PR con hilos abiertos, produce el documento con una entrada por hilo —veredicto, severidad, propuesta— (O)
- Hilos resueltos y ya triagiados se omiten; cada abierto queda clasificado exactamente una vez (B)
- Un aplazamiento siempre lleva razón; una corrección cita código y regla/intención (B)
- Intención ambigua → preguntas abiertas, no suposición (E)
- Sin hilos abiertos → informar y terminar (E)
- No responde, no resuelve, no modifica — solo análisis (B)
- Documento bajo `dir_revisiones_pr` con patrón `pr-<n>-triage-<fecha>.md`, en plantilla `assets/` con listas anidadas, eliminado al cierre del PR (B)
- Manifiesto válido y alfabético; `bash -n`/`json.tool` si aplica

## Desviaciones del plan

- **`comentar-pr` estrecha su glob de descubrimiento.** Hallazgo `important` de la revisión técnica: el patrón `pr-<n>-*.md` del paso de localización del informe casaba también los documentos de triage `pr-<n>-triage-*.md`; el patrón quedó como `pr-<n>-<yyyymmdd>*.md` —la fecha sigue inmediata al número—.
- **La entrada del triage registra el identificador de hilo.** Otro `important` de la misma revisión: la deduplicación por ancla+cita falla tras empujar correcciones —las líneas derivan—; cada entrada gana el sub-ítem `hilo:` con el id de plataforma (`PRRT_…`, review o comentario), clave primaria de deduplicación y lo que `mejorar-pr` necesita para responder o resolver. En el mismo pase: carga explícita del diff y de archivos del head vía `git show`, uso declarado de `isOutdated` antes de clasificar `corregir`, y aclaración del sufijo ordinal frente a la acumulación in situ.
- **`responder` cubre la refutación de un comentario incorrecto.** Aclaración del usuario: un comentario inválido —no por alcance sino por incorrecto— es una discrepancia que se responde con la refutación redactada y el código como evidencia; `aplazar` lo validaría implícitamente. Se aplicó además una ronda de `revisar-redaccion` + `pulir-escritura` sobre el skill y la plantilla.

## Revisión

- Subagente: 2026-10-12 — Aprueba
- Usuario (ejecución): 2026-10-12 — Aprueba
- Usuario (cierre): [fecha] — [Aprueba | Solicita cambios]
