# Ejecutar el desarrollo de una tarea de todo-app como PoC

## Estado

[ ] Pendiente | [ ] En progreso | [ ] En revisión | [x] Completada | [ ] Bloqueada

## Tipo

desarrollo

## Objetivo

Validar el pipeline de desarrollo extremo a extremo ejecutando una tarea real de `todo-app` —la primera del conjunto, estructura base— a través del enrutado por tipo de `ejecutar-tareas`: el skill `desarrollo` orquesta `planear-implementacion` y `ejecutar-implementacion`, y la revisión pasa por `revisar-implementacion`.

## Dependencias

- 058 (las tareas de todo-app deben existir promovidas y agrupadas en su épica)

## Entrada

- El sub-flujo de desarrollo construido en las tareas 064 a 068: `desarrollo`, `planear-implementacion`, `ejecutar-implementacion`, `revisar-implementacion` y el enrutado de `ejecutar-tareas`.
- Las tareas de `todo-app` promovidas y agrupadas bajo su épica, tras completar la tarea 058.

## Resultado esperado

- La primera tarea de `todo-app` ejecutada por el sub-flujo de desarrollo, con `## Plan técnico`, `## Suite de pruebas esperada` y, si las hubo, `## Desviaciones del plan` en su archivo.
- Las observaciones de la validación —qué funcionó, qué no— anotadas en las notas de esta tarea.

## Criterios de calidad

- El enrutado ocurre por el tipo declarado de la tarea, sin intervención manual.
- La planeación, la ejecución y la revisión siguen los skills del sub-flujo.
- Si el pipeline falla o produce algo inservible, se registra la brecha y se deriva la corrección en lugar de forzar el resultado a mano.

## Procedimiento sugerido

1. Verificar que la tarea 058 está completada y las tareas de todo-app agrupadas bajo su épica.
2. Ejecutar la primera tarea de todo-app a través del enrutado de `ejecutar-tareas`.
3. Revisar el resultado contra los criterios de calidad y anotar las observaciones.

## Notas

- Esta tarea es la primera aplicación real del sub-flujo de desarrollo: los hallazgos alimentan el sistema de aprendizaje (`registrar-experiencias`) si el usuario corrige algo durante la validación.

### Observaciones de la validación (2026-09-21)

- El enrutado funcionó como se diseñó: la tarea 002 de todo-app declara `Tipo: desarrollo` y el ejecutor la derivó al skill `desarrollo` sin intervención manual, que orquestó `planear-implementacion` → `ejecutar-implementacion`; la revisión pasó por `revisar-implementacion`.
- La puerta humana de la planeación funcionó: el plan técnico y la suite se presentaron al usuario antes de materializarse en el archivo de la tarea.
- La revisión técnica detectó una desviación menor real (`style.css` adelantaba `.filters a.selected`, clase de estado de la tarea 005): el usuario pidió eliminarla y la re-revisión aprobó. El pipeline produjo una corrección verificable, no solo un visto bueno.
- Brecha encontrada fuera del pipeline: la tarea semilla 001 de todo-app quedó marcada `[~]` aunque su trabajo (la planeación) ya se había completado y aprobado en la validación de la tarea 058; se cerró manualmente al inicio de esta PoC. El flujo no tiene hoy un paso que garantice cerrar la tarea semilla tras promover su propuesta.
- Brecha de scope resuelta por el usuario: `registrar-experiencias` apunta al `EXPERIENCIAS.md` de la raíz del proyecto; para trabajo dentro de `todo-app/` el usuario pidió un `EXPERIENCIAS.md` propio, coherente con el `TODO.txt` propio. Las dos correcciones de la sesión quedaron registradas ahí.
- Sin forzado manual del resultado: los artefactos (`## Plan técnico`, `## Suite de pruebas esperada`, código y test de humo) los produjo el sub-flujo; la edición manual se limitó a la corrección aprobada por el usuario.

## Revisión

- Subagente: 2026-09-21 — Aprueba (hallazgo menor resuelto: Ids duplicados en EXPERIENCIAS.md de todo-app)
- Usuario: 2026-09-21 — Aprueba
