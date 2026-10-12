# Aprendizaje síncrono al estilo TIL

## Estado

[ ] Pendiente | [~] En progreso | [r] En revisión | [x] Completada | [!] Bloqueada

**[ ] Pendiente**

## Tipo

mantenimiento

## Objetivo

Hoy el aprendizaje es un pipeline de dos pasos asíncronos: `registrar-experiencias` anexa la corrección en `EXPERIENCIAS.md` al cerrar la tarea y `consolidar-lecciones` destila las pendientes en notas de lecciones en una sesión posterior e independiente. El modelo TIL (Today I Learned) demuestra que capturar la lección **en el momento** —nota corta por tema, sin paso intermedio— elimina la fricción y la pérdida de contexto que produce la distancia. Fusionar ambos skills en uno solo que escriba la lección directamente al cerrar la tarea.

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

- Un único skill de aprendizaje que, al cerrar una tarea con correcciones del usuario (o cuando el usuario pida dejar constancia), destile la corrección directamente en la nota de lecciones del tema correspondiente —añadiendo la lección a una nota existente o creándola— y actualice el índice de lecciones en el mismo acto.
- El paso intermedio asíncrono eliminado: decidir si `EXPERIENCIAS.md` y `operar-experiencias` quedan sin consumidor y se retiran (aplica la lección YAGNI de `diseno-de-artefactos`), o si el registro se conserva con un rol redefinido —la decisión queda documentada en la tarea o en una decisión de diseño.
- `consolidar-lecciones` y `registrar-experiencias` retirados o absorbidos; los puntos del sistema que los invocaban (sensor de cierre en `ejecutar-tareas`, flujo de revisión, referencias cruzadas entre skills) apuntan al skill unificado.
- `consultar-lecciones` sigue resolviendo las notas igual —el cambio es el pipeline, no el artefacto destino.

## Criterios de calidad

- Al cerrar una tarea con corrección del usuario, la lección queda escrita en `docs/lessons/` en el mismo acto de cierre —sin quedar «pendiente de consolidación».
- La agrupación por temas sigue existiendo: lecciones del mismo tema conviven en una nota; el skill decide añadir vs. crear nota comparando disparadores.
- Ningún skill huérfano: no quedan referencias a `registrar-experiencias`/`consolidar-lecciones`/`operar-experiencias` salvo las retiradas documentadas.
- El formato de las notas de lección y del índice no cambia —`consultar-lecciones` y los disparadores funcionan igual.
- Si `EXPERIENCIAS.md` se retira, su contenido histórico se preserva (append-only) o su eliminación queda justificada por decisión.

## Procedimiento sugerido

1. Diseñar el skill unificado: entrada (corrección + contexto de la tarea), decisión nota-existente vs. nota-nueva, escritura atómica.
2. Reescribir el skill y absorber en su procedimiento lo que hoy vive en los otros dos; retirar los skills absorbidos y `operar-experiencias` si queda sin consumidor.
3. Actualizar los consumidores: sensor de cierre de `ejecutar-tareas`, referencias cruzadas, `PERSONALIZE.md` si hay convenciones nuevas o retiradas.
4. Migrar el estado: verificar que no quedan experiencias «pendientes» huérfanas; consolidar las que haya con el nuevo flujo.
5. Verificar end-to-end simulando un cierre con corrección.

## Notas

- Inspiración TIL: «escríbelo ahora, 5 minutos» — la lección se destila con el contexto fresco de la sesión, no en una sesión posterior que ya lo perdió.
- La validación humana del borrador se conserva: el cierre propone la lección y el usuario la aprueba antes de anexarla, como hoy.

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario (ejecución): [fecha] — [Aprueba | Solicita cambios]
- Usuario (cierre): [fecha] — [Aprueba | Solicita cambios]
