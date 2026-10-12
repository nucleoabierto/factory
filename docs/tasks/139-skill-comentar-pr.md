# Comentarios publicables de la revisión con confirmación

## Estado

[ ] Pendiente | [~] En progreso | **[r] En revisión** | [x] Completada | [!] Bloqueada

## Tipo

desarrollo

## Objetivo

Crear el skill `comentar-pr`: la mitad de publicación del bloque revisor. A partir del informe de `revisar-pr`, produce los comentarios de revisión —*conventional comments*, autocontenidos—, los presenta al usuario para confirmación y, solo con su aprobación, los publica en el PR vía `gh`.

## Dependencias

- 138 — necesita el formato del informe de `revisar-pr` como fuente de hallazgos.

## Entrada

- El informe de revisión producido por `revisar-pr` y la referencia del PR.
- La convención *conventional comments* (tipo: `fix`, `suggestion`, `question`, `nitpick`, `issue`…) como formato de cada comentario.

## Resultado esperado

- `.agents/skills/comentar-pr/SKILL.md` con su declaración y procedimiento, registrado en el manifiesto.
- Procedimiento que cubre: selección de los hallazgos comentables del informe; redacción de cada comentario como *conventional comment* autocontenido —expresa el problema, el anclaje en el código y el contexto que el autor necesita, sin remitir al informe ni a artefactos que el autor pueda no tener—; presentación del lote al usuario; publicación en el PR vía `gh` únicamente tras la confirmación; registro en el informe o en el resumen de qué se publicó.
- Separación explícita: los comentarios no se guardan en el informe; el informe es la evidencia, los comentarios son la acción publicada.

## Criterios de calidad

- Cada comentario se sostiene solo: un autor que nunca vio el informe puede entender el problema, el lugar y la razón sin más contexto que el propio comentario.
- El skill no publica sin confirmación explícita del usuario —la publicación es la puerta humana del bloque revisor—; presenta el lote completo antes de publicar nada.
- Sin confirmación, no hay efecto lateral: ningún comentario llega a la plataforma.
- Formato *conventional comments* en cada comentario; el tipo refleja la severidad del hallazgo de origen.
- Solo publica comentarios: no resuelve hilos, no responde en nombre del usuario a comentarios del autor, no edita el PR.

## Procedimiento sugerido

1. Definir el mapeo hallazgo→comentario: qué severidades se comentan y con qué tipo *conventional comment*.
2. Definir la regla de autocontención: qué debe llevar cada comentario para que el autor lo entienda sin el informe.
3. Escribir el `SKILL.md` con la puerta de confirmación antes de cualquier llamada de publicación, y registrarlo en el manifiesto.

## Notas

- Los comentarios que el usuario descarte en la confirmación simplemente no se publican; no hace falta artefacto de «comentarios rechazados» en esta iteración.
- Conectividad verificada 2026-10-12: `gh api` resuelve `:owner/:repo`, el SHA head del PR es accesible y el endpoint `/pulls/<n>/reviews` responde. La publicación real solo ocurre tras la puerta humana.

## Plan técnico

**Subsistema:** `comentar-pr` es la mitad de publicación del bloque revisor: consume el informe que `revisar-pr` deja en `dir_revisiones_pr` y publica los hallazgos como comentarios en el PR. Mecanismo de plataforma verificado: una única `gh api repos/:owner/:repo/pulls/<n>/reviews -X POST` con `event: COMMENT`, `commit_id` (SHA head) y `comments[]` de línea —una sola review, no comentario a comentario—. Lección aplicada: referencias autocontenidas —el skill solo enlaza material del paquete—; la de la plantilla en `assets/` no aplica, el skill no produce artefacto persistido.

### Acciones

- [x] **Escribir `.agents/skills/comentar-pr/SKILL.md`**: entrada (referencia del PR + informe más reciente en `dir_revisiones_pr` por patrón `pr-<n>-*.md`; sin informe → informar y terminar); selección (blocker/important/nit comentables, preguntas abiertas como `question` opcionales); mapeo severidad→tipo (blocker→`issue (blocking)`, important→`issue`/`suggestion`, nit→`nitpick`/`suggestion`, pregunta→`question`); regla de colocación (anclado a línea si el hallazgo apunta a un lugar del diff; general al cuerpo de la review si es transversal o no anclable); regla de propuesta (anclado lleva bloque `suggestion` de código o pseudocódigo; general lleva propuesta en prosa); autocontención verificable; puerta humana con el lote completo antes de publicar; publicación como una sola review `COMMENT` vía `gh api`; resumen en chat con enlaces —el informe no muta.
- [x] **`teleprompter.json`** — registro alfabético.
- [x] **Documentos vivos** — `README.md`, `docs/mapa-de-flujos.md`, `docs/definicion-proyecto.md` si aplica.

## Suite de pruebas esperada

Trazadas a CU-2 del PRD:

- Sobre un informe con hallazgos, produce el lote con un comentario por hallazgo, mapeado a su tipo conventional (O)
- Cada comentario se entiende sin el informe —problema + anclaje + razón— (B)
- El skill decide por hallazgo entre comentario anclado y general según el criterio de colocación (B)
- Todo comentario anclado lleva propuesta —`suggestion` de código o pseudocódigo— (B)
- El hallazgo transversal o no anclable llega al cuerpo de la review, no se descarta (B)
- Sin confirmación del usuario, nada llega a la plataforma (E)
- Lo descartado en la confirmación no se publica (B)
- Sin informe para el PR, informa y termina sin efecto lateral (E)
- No resuelve hilos, no responde al autor, no edita el PR (B)
- `bash -n`/JSON válido y manifiesto en orden

## Desviaciones del plan

- **La plantilla del informe registra el SHA head revisado y `comentar-pr` lo confronta.** Hallazgo `important` de la revisión dogfooding: sin esa verificación, commits posteriores a la revisión dejarían obsoleto el informe y se publicarían hallazgos que ya no aplican. `assets/informe.md` de `revisar-pr` gana el campo en la cabecera y `comentar-pr` exige la coincidencia antes de publicar.
- **`comentar-pr` no republica hallazgos ya publicados.** Nit de la misma revisión: el procedimiento carga los comentarios existentes del PR y omite los equivalentes —re-ejecución segura—; también se declaró el lote vacío (veredicto `merge` sin hallazgos) y la dirección del anclaje multilínea (`start_*` primera línea, `line`/`side` última).
- **La deduplicación cubre también las reviews, no solo los comentarios de línea.** Segunda ronda dogfooding: los comentarios generales viajan en el `body` de la review, que `pulls/<n>/comments` no devuelve; el paso carga ambos endpoints con `--paginate`. Además `commit_id` quedó declarado como el SHA verificado en el paso de frescura.

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario (ejecución): [fecha] — [Aprueba | Solicita cambios]
- Usuario (cierre): [fecha] — [Aprueba | Solicita cambios]
