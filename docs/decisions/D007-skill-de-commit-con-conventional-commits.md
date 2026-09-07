# D007: Skill de commit con Conventional Commits en español

## Estado

Aceptada

## Contexto

El proyecto necesita que el agente commitee de forma consistente: cuándo commitear, qué mensaje escribir y qué convención seguir. Las opciones van desde mensajes libres hasta Conventional Commits, pasando por convenciones personalizadas. Además, el procedimiento de commit debe ser reutilizable y no reinventado en cada sesión.

## Decisión

Encapsulamos el procedimiento de commit en un skill (`commit`) que aplica Conventional Commits con tipos (`feat`, `fix`, `chore`, etc.), asunto en voz imperativa, máximo 50 caracteres, y cuerpo que explica el *porqué*. Los mensajes se escriben en español. El skill se invoca al terminar una tarea o cambio lógico.

## Justificación

Conventional Commits añade estructura legible por humanos y máquinas sin imponer ceremonia excesiva. Los tipos permiten generar changelogs y integrarse con versionado semántico. Las siete reglas universales (asunto breve, voz imperativa, cuerpo a 72 caracteres) garantizan mensajes legibles en `git log --oneline`. El español mantiene la coherencia con el resto del proyecto. Encapsular el procedimiento en un skill asegura que la convención se aplica de forma consistente sin que cada sesión la redescubra. La investigación en `docs/research/commits-best-practices.md` documentó y justificó esta elección.
