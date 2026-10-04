# Investigación: PRs como punto de revisión

## Estado

[ ] Pendiente | [~] En progreso | [r] En revisión | **[x] Completada** | [!] Bloqueada

## Tipo

investigación

## Objetivo

Investigar cómo incorporar el PR al ciclo de tareas en dos frentes. Externo: mejores prácticas de PRs —qué contiene una descripción eficaz: la explicación del cambio y los puntos de atención del revisor—, el PR como punto adicional de revisión y no como herramienta de alineación —el plan ya vive en el archivo de la tarea y resumirlo sería redundante; si el mensaje de entrada del revisor es «verifica que el plan se ejecutó», su trabajo se degrada a confirmar en vez de revisar—, las prácticas de manejo de comentarios y del bucle de feedback, y los PRs en flujos conducidos por agentes. Interno: rediseñar la secuencia de cierre con **dos puertas humanas** —la de ejecución, el cambio revisado vía PR con su bucle de comentarios, y la de cierre, la aprobación final tras los sensores antes de cerrar el PR— y determinar qué cambia en cada skill del ciclo y cómo se registran ambas aprobaciones en el archivo de tarea. Contexto de validación: el ciclo actual de `ejecutar-tareas`.

## Dependencias

- Ninguna

## Entrada

- `docs/mapa-de-flujos.md` y los skills del ciclo vigentes (`ejecutar-tareas`, `revisar-implementacion`, los sensores de cierre).
- El skill `investigar` para conducir el proceso, a profundidad profunda.

## Resultado esperado

- Documento de investigación con conclusiones justificadas, referencias verificables y marca temporal.
- Recomendación ejecutable: la secuencia exacta del cierre con las dos puertas, el formato de la descripción del PR —orientada al revisor—, el mecanismo del bucle de comentarios —cuándo un comentario genera cambio y cómo se estructura el plan de mejoras— y el registro de ambas aprobaciones en la tarea.

## Criterios de calidad

- Conclusiones justificadas con referencias verificables y marca temporal.
- Alternativas evaluadas y descartadas con su razón.
- La recomendación es ejecutable: define el punto exacto de cada puerta, el contenido del PR y el tratamiento de los comentarios.

## Procedimiento sugerido

1. Conducir el frente externo con el skill `investigar`: mejores prácticas de descripciones de PR, el PR como revisión adicional, manejo de comentarios y PRs con agentes.
2. Conducir el frente interno: mapear la secuencia de cierre actual y rediseñarla con las dos puertas.
3. Sintetizar la recomendación y presentarla al usuario.

## Notas

- La materialización es la tarea 130, que depende de esta.

## Revisión

- Subagente: 2026-10-04 — Aprueba (segunda ronda; correcciones de cita y precedente verificadas)
- Usuario: 2026-10-04 — Aprueba
