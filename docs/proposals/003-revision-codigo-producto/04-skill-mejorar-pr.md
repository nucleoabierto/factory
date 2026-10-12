# Aplicar el triage sobre el cambio propio

## Tipo

desarrollo

## Objetivo

Crear el skill `mejorar-pr`: la segunda mitad del bloque autor y el cierre del lazo de revisión. A partir del documento de triage de `clasificar-comentarios`, aplica las correcciones al cambio propio, prepara las respuestas a los hilos marcados como responder y documenta los aplazamientos.

## Dependencias

- Borrador 03 — consume el documento de triage que produce `clasificar-comentarios`.

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
