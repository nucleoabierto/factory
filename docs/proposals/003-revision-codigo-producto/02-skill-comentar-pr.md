# Comentarios publicables de la revisión con confirmación

## Tipo

desarrollo

## Objetivo

Crear el skill `comentar-pr`: la mitad de publicación del bloque revisor. A partir del informe de `revisar-pr`, produce los comentarios de revisión —*conventional comments*, autocontenidos—, los presenta al usuario para confirmación y, solo con su aprobación, los publica en el PR vía `gh`.

## Dependencias

- Borrador 01 — necesita el formato del informe de `revisar-pr` como fuente de hallazgos.

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
