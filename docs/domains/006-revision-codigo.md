# Revisión de código

## Propósito

Someter cualquier *pull request* del proyecto evaluado a la revisión independiente del sistema, en ambos sentidos: un PR ajeno recibe un informe con veredicto y comentarios publicables, y la revisión que un PR propio recibe se convierte en un triage accionable que guía la mejora del cambio.

## Referencia del modelo

- **Lenguaje ubicuo:**
  - **Informe de revisión:** documento que un subagente revisor de contexto aislado y rol adversarial produce sobre un PR —hallazgos por severidad (`blocker`/`important`/`nit`), veredicto (`merge`/`improve`/`blocked`) y preguntas abiertas—.
    - Ancla: `assets/informe.md` en `.agents/skills/revisar-pr/`
    - Origen: `docs/epics/004-revision-codigo-producto.md`
  - **Documento de triage:** estado local acumulable por rondas que clasifica cada hilo abierto de la revisión recibida en `corregir`, `responder` o `aplazar`, con su propuesta, severidad y ronda de entrada.
    - Ancla: `assets/triage.md` en `.agents/skills/clasificar-comentarios/`
    - Origen: `docs/epics/004-revision-codigo-producto.md`
  - **Bloque revisor / bloque autor:** las dos mitades del dominio según quién obra —`revisar-pr` y `comentar-pr` operan sobre PRs ajenos; `clasificar-comentarios` y `mejorar-pr`, sobre la revisión recibida en un PR propio—.
    - Ancla: secciones «Cuándo usar» de los cuatro `SKILL.md`
  - **Par vivo `visto:`/`estado:`:** fecha del último comentario del hilo y su estado en la plataforma, registrados en cada entrada del triage; la actividad posterior del revisor —réplica o reapertura— reentra a clasificación como entrada nueva.
    - Ancla: `assets/triage.md` en `.agents/skills/clasificar-comentarios/`
    - Origen: `docs/tasks/141-skill-mejorar-pr.md`
- **Entidades / estado:**
  - Informe `pr-<n>-<yyyymmdd>[-k].md` y triage `pr-<n>-triage-<yyyymmdd>.md`: artefactos del dominio persistidos en el directorio de la convención `dir_revisiones_pr` —`.git/factory/pr-reviews` por defecto; los consumidores sustituyen el prefijo `.git/` por `git rev-parse --git-common-dir`—, estado local efímero fuera del control de versiones que `gestionar-pr` elimina al cerrar el PR.
    - Ancla: paso de limpieza del cierre en `.agents/skills/gestionar-pr/SKILL.md`
  - Entrada de triage: una línea por hilo con sub-ítems `hilo:` —el `node_id` de GraphQL, clave de deduplicación—, `visto:`, `estado:`, `veredicto:`, `severidad:`, `propuesta:`, `razón:`, `ronda:` y `resultado:` —la entrada nace sin `resultado:`; `mejorar-pr` lo anota al ejecutarla—.
    - Ancla: `assets/triage.md` en `.agents/skills/clasificar-comentarios/`
- **Invariantes:**
  - Ningún efecto lateral —publicar comentarios, responder hilos, resolverlos, *push*— ocurre sin confirmación del usuario.
    - Ancla: procedimientos de `.agents/skills/comentar-pr/SKILL.md` y `.agents/skills/mejorar-pr/SKILL.md`
  - Cada hilo abierto se clasifica exactamente una vez: la deduplicación es por `hilo:`, no por ancla ni cita —las líneas derivan al empujar correcciones—.
    - Ancla: `assets/triage.md` y paso de acumulación en `.agents/skills/clasificar-comentarios/SKILL.md`
  - Un informe que no corresponde al head actual del PR está obsoleto: la publicación exige la coincidencia del SHA.
    - Ancla: campo de cabecera en `.agents/skills/revisar-pr/assets/informe.md` y paso de frescura en `.agents/skills/comentar-pr/SKILL.md`
  - «No hay hallazgos» es un veredicto válido y la intención ambigua va a preguntas abiertas, nunca a suposición.
    - Ancla: `.agents/skills/revisar-pr/SKILL.md` y `.agents/skills/clasificar-comentarios/SKILL.md`
  - Los ítems de la cuenta autenticada no son revisión —son respuestas del propio flujo— salvo la salida que `comentar-pr` publica marcada `<!-- factory:revision -->`: cuando el autor ejecuta la revisión mediante el propio agente, ambos papeles comparten cuenta y el marcador los distingue.
    - Ancla: paso de publicación en `.agents/skills/comentar-pr/SKILL.md` y filtro de cuenta en `.agents/skills/clasificar-comentarios/SKILL.md` y `.agents/skills/mejorar-pr/SKILL.md`
    - Origen: `docs/tasks/141-skill-mejorar-pr.md`
- **Operaciones:**
  - Revisar un PR: `revisar-pr` reconstruye diff, historial e hilos existentes y produce el informe persistido.
  - Comentar la revisión: `comentar-pr` publica los hallazgos como *conventional comments* en una sola review tras confirmación.
  - Clasificar la revisión recibida: `clasificar-comentarios` produce o acumula el documento de triage sin tocar el cambio.
  - Mejorar el cambio: `mejorar-pr` aplica los `corregir` al árbol, publica las respuestas de los `responder`, documenta los `aplazar` con su razón y resuelve los hilos atendidos.
    - Anclas: los `SKILL.md` de los cuatro skills

## Explicación del dominio

- **Fronteras:**
  - Dentro: los cuatro skills del lazo —revisar, comentar, clasificar, mejorar— y sus dos artefactos efímeros.
  - Fuera: la revisión técnica interna del ciclo de tareas —`revisar-implementacion`, dominio `003-subflujo-desarrollo`—; el ciclo de vida del PR —apertura, bucle de comentarios como plan de mejoras, merge—, que es `gestionar-pr` del dominio `001-ciclo-de-tareas`; las puertas mecánicas del proyecto evaluado —tests, lint, build—; las plataformas que `gh` no cubre.
  - Relaciones: los artefactos viven bajo la convención `dir_revisiones_pr`, que `gestionar-pr` limpia al cerrar; `mejorar-pr` deriva a `crear-tareas` el trabajo fuera de alcance, convención del dominio `001-ciclo-de-tareas`.
- **Decisiones relevantes:**
  - `docs/decisions/D034-aprobacion-via-pr-con-dos-puertas.md` — la puerta humana sobre el PR es el mismo principio que rige los efectos laterales de este dominio.

## Estado de salud

- Última revisión: 2026-10-13 — dominio documentado al cerrarse la tarea 141.
- Divergencias conocidas: el lazo se verificó de forma desigual —`revisar-pr` corrió nueve rondas reales sobre el PR 14, pero el bloque autor no tiene ejecución registrada sobre un PR real (sin hilos de revisión que clasificar ni comentarios publicados por `comentar-pr`); la brecha quedó elevada al usuario en el cierre de la épica 004.
