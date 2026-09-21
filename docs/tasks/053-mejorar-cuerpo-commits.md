# Mejorar el cuerpo de los mensajes de commit

## Estado

[ ] Pendiente | [~] En progreso | [r] En revisión | [x] Completada | [!] Bloqueada

## Objetivo

Mejorar el skill `commit` para que los cuerpos de los mensajes expliquen el razonamiento del cambio —la decisión y su motivación— en lugar de narrar el proceso que lo produjo, y para que toda referencia a artefactos internos del proyecto (decisiones, tareas, propuestas, convenciones) sea comprensible sin conocer el contexto de la sesión.

## Dependencias

- Ninguna

## Entrada

- `.agents/skills/commit/SKILL.md` y su referencia `references/convenciones.md`.
- Diagnóstico de los commits `70e6c60`..`ea9201b`: los asuntos cumplen la forma, pero los cuerpos usan referencias implícitas ("la tarea 001", "D017", "[p] en TODO.txt", "la prueba externa") que exigen conocer artefactos del proyecto, y varios narran el proceso ("resultado del flujo de idea a tarea", "primera aplicación de D017") en lugar de exponer el razonamiento.

## Resultado esperado

- `SKILL.md` del skill `commit` actualizado con dos reglas explícitas:
  1. **Contexto explícito:** toda referencia a un artefacto del proyecto debe ser autodescriptiva o ir acompañada de una referencia resoluble (ruta o descripción), de modo que el mensaje sea comprensible para quien solo tiene el historial de git.
  2. **Razonamiento, no proceso:** el cuerpo explica la motivación y la decisión; no narra el flujo de trabajo, la sesión ni los pasos que produjeron el cambio.
- Las reglas integradas donde corresponda: principios rectores, regla 7 del cuerpo y procedimiento de redacción.
- Si `references/convenciones.md` trata el tema, actualizarlo de forma coherente.

## Criterios de calidad

- Un lector que solo ve `git log` puede entender cada cuerpo sin abrir archivos del proyecto ni conocer sus convenciones de numeración.
- El skill distingue explícitamente entre razonamiento (qué se decidió y por qué) y proceso (cómo se llegó ahí), y prohíbe narrar el segundo.
- La redacción de las reglas nuevas sigue el estilo y la estructura existentes del skill.
- Las siete reglas y el procedimiento quedan coherentes con los principios rectores.

## Procedimiento sugerido

1. Releer `SKILL.md` y `references/convenciones.md` para ubicar dónde encaja cada regla.
2. Redactar las dos reglas nuevas en el estilo del skill.
3. Aplicar revisión de redacción y pulido mecánico preventivos antes de escribir.
4. Editar el skill y verificar la coherencia interna del documento completo.

## Notas

- Ejemplos del problema detectados en el historial: `ea9201b` ("la tarea 001", "[p] en TODO.txt"), `4a584af` ("primera aplicación de D017"), `70e6c60` ("D017 decide…"), `e271382`/`23e7dbd` ("la prueba externa", "la PoC").
- La tarea 041 ya mejoró los asuntos; esta se centra en los cuerpos.

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario: [fecha] — [Aprueba | Solicita cambios]
