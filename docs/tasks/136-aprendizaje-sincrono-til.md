# Aprendizaje síncrono al estilo TIL

## Estado

[ ] Pendiente | [~] En progreso | **[r] En revisión** | [x] Completada | [!] Bloqueada

## Tipo

mantenimiento

## Objetivo

Hoy el aprendizaje es un pipeline de dos pasos asíncronos: `registrar-experiencias` anexa la corrección en `EXPERIENCIAS.md` al cerrar la tarea y `consolidar-lecciones` destila las pendientes en notas de lecciones en una sesión posterior e independiente. El modelo TIL (Today I Learned) demuestra que capturar la lección **en el momento** —nota corta por tema, sin esperar a una sesión posterior— elimina la fricción y la pérdida de contexto que produce la distancia. Fusionar ambos skills en uno solo que, en el mismo acto, anexe la experiencia y destile la lección al cerrar la tarea. `EXPERIENCIAS.md` permanece como fuente de verdad append-only de la evidencia; lo que desaparece es la asincronía, no el registro.

## Dependencias

- Ninguna

## Entrada

- `.agents/skills/registrar-experiencias/SKILL.md` — captura actual.
- `.agents/skills/consolidar-lecciones/SKILL.md` — destilado diferido actual.
- `.agents/skills/consultar-lecciones/SKILL.md` — lector de las notas (su contrato debe preservarse).
- `.agents/skills/operar-experiencias/` — gestor mecánico del registro intermedio.
- `docs/lessons/` y `docs/lessons/README.md` — artefacto destino, formato ya vigente.
- Referencia del modelo TIL: captura inmediata en el momento del aprendizaje, nota atómica organizada por tema, sin fase «lo escribo después».

## Resultado esperado

- Un único skill de aprendizaje que, al cerrar una tarea con correcciones del usuario (o cuando el usuario pida dejar constancia), en el mismo acto anexe la experiencia en `EXPERIENCIAS.md` y destile la lección en la nota del tema correspondiente —añadiéndola a una nota existente o creándola—, actualizando el índice de lecciones.
- `EXPERIENCIAS.md` permanece como fuente de verdad append-only: las notas de lecciones siguen siendo la capa derivada que puede reescribirse porque la evidencia persiste; las entradas procesadas se marcan como consolidadas en el mismo acto, sin borrarlas.
- `operar-experiencias` se conserva —sigue siendo el gestor mecánico del registro—; `consolidar-lecciones` y `registrar-experiencias` se retiran o absorben, y los puntos del sistema que los invocaban (sensor de cierre en `ejecutar-tareas`, flujo de revisión, referencias cruzadas entre skills) apuntan al skill unificado.
- `consultar-lecciones` sigue resolviendo las notas igual —el cambio es el pipeline, no el artefacto destino.

## Criterios de calidad

- Al cerrar una tarea con corrección del usuario, la experiencia queda anexada en `EXPERIENCIAS.md` —marcada como consolidada— y la lección escrita en `docs/lessons/` en el mismo acto de cierre —sin quedar «pendiente de consolidación».
- La agrupación por temas sigue existiendo: lecciones del mismo tema conviven en una nota; el skill decide añadir vs. crear nota comparando disparadores.
- `EXPERIENCIAS.md` conserva su invariante append-only y su rol de fuente de verdad; ninguna entrada se edita ni se borra.
- Ningún skill huérfano: no quedan referencias a `registrar-experiencias`/`consolidar-lecciones` salvo las retiradas documentadas.
- El formato de las notas de lección y del índice no cambia —`consultar-lecciones` y los disparadores funcionan igual.

## Procedimiento sugerido

1. Diseñar el skill unificado: entrada (corrección + contexto de la tarea), anexo de la experiencia, decisión nota-existente vs. nota-nueva, marcado de consolidada —todo en el mismo acto.
2. Reescribir el skill absorbiendo el procedimiento de los otros dos; retirar los skills absorbidos y conservar `operar-experiencias` como gestor del registro.
3. Actualizar los consumidores: sensor de cierre de `ejecutar-tareas`, referencias cruzadas, `PERSONALIZE.md` si hay convenciones nuevas o retiradas.
4. Migrar el estado: verificar que no quedan experiencias «pendientes» huérfanas; consolidar las que haya con el nuevo flujo.
5. Verificar end-to-end simulando un cierre con corrección.

## Notas

- Inspiración TIL: «escríbelo ahora, 5 minutos» — la lección se destila con el contexto fresco de la sesión, no en una sesión posterior que ya lo perdió.
- La validación humana del borrador se conserva: el cierre propone la lección y el usuario la aprueba antes de anexarla, como hoy.

## Contexto

Dos skills encadenan el aprendizaje de forma asíncrona: `registrar-experiencias` anexa entradas en `EXPERIENCIAS.md` al cierre y `consolidar-lecciones` destila las pendientes en notas de `docs/lessons/` en una sesión posterior. `operar-experiencias` (script `experiencias.sh`) es el gestor mecánico del registro —`id`, `listar`, `por-tarea`, `anexar`, `marcar`— y se conserva. `EXPERIENCIAS.md` es la fuente de verdad append-only; `docs/lessons/` la capa derivada con índice propio (`README.md` con disparadores, recuperación léxica vía `coincidencias` de `consultar-artefactos`). Lecciones aplicables ya consultadas: consistencia de formatos, YAGNI de superficie, higiene de ramas.

## Conectividad

Consumidores y menciones a actualizar al fusionar: `.agents/skills/ejecutar-tareas/SKILL.md` (sensor de cierre, paso 13), `.agents/skills/consultar-lecciones/SKILL.md` (Cuándo no usar), `.agents/skills/mantener-changelog/SKILL.md` (Cuándo no usar), `.agents/skills/operar-experiencias/assets/experiencias.sh` (cabecera generada del registro), `EXPERIENCIAS.md` (comentario de cabecera), `teleprompter.json` (lista de instalación, dos entradas), `docs/lessons/README.md` (cabecera del índice), `docs/mapa-de-flujos.md` (sensores y glosario), `docs/definicion-proyecto.md` (lista de memoria), `README.md` (tabla y flujo), `PERSONALIZE.md` (descripción del artefacto), `docs/domains/005-aprendizaje.md` (anclas e invariantes). Histórico que se conserva intacto: `CHANGELOG.md` liberado, `docs/research/`, archivos de tareas, `todo-app/EXPERIENCIAS.md`.

## Plan técnico

Skill unificado `destilar-lecciones`: un solo acto que anexa la experiencia en `EXPERIENCIAS.md`, destila la lección en la nota del tema —existente o nueva—, actualiza el índice de lecciones y marca la entrada consolidada. Dos modos de entrada: correcciones frescas de la sesión (cierre de tarea) y backlog de `pendiente` del registro. Una sola puerta de validación humana cubre entradas + destilación. Filtro reforzado estilo TIL: solo se registra lo transferible a trabajo futuro —detalles de implementación o correcciones menores acopladas a la tarea se descartan sin registrar—. Se retiran `registrar-experiencias` y `consolidar-lecciones`; `operar-experiencias` se conserva como gestor del registro.

## Suite de pruebas esperada

- No quedan skills `registrar-experiencias` ni `consolidar-lecciones`; `teleprompter.json` instala solo `destilar-lecciones`
- Ninguna referencia viva a los skills retirados fuera del histórico excluido
- El procedimiento del skill cubre ambos modos —corrección fresca y backlog— con una sola puerta de validación
- El filtro de transferibilidad está explícito: corrección acoplada a la tarea → no se registra
- `operar-experiencias` intacto y sus operaciones invocadas con la misma firma
- `bash -n` en `experiencias.sh` tras tocar su cabecera generada

## Revisión

- Subagente: 2026-10-12 — Aprueba
- Usuario (ejecución): [fecha] — [Aprueba | Solicita cambios]
- Usuario (cierre): [fecha] — [Aprueba | Solicita cambios]
