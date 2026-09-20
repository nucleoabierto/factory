# Investigar sistema de aprendizaje por experiencias

## Estado

[ ] Pendiente | [~] En progreso | [r] En revisión | **[x] Completada** | [!] Bloqueada

## Objetivo

Investigar cómo estructurar un sistema de aprendizaje que registre las divergencias entre el comportamiento de los agentes y las expectativas del usuario, consolide esas divergencias en lecciones aprendidas y las haga recuperables como referencia para la resolución de tareas futuras.

## Dependencias

Ninguna

## Entrada

- Descripción del sistema por el usuario: un registro de experiencias (correcciones del usuario al terminar cada tarea, con la brecha entre resultado esperado y obtenido) gestionado por un skill en `EXPERIENCIAS.md`, y una consolidación posterior, en sesión independiente, que agrupa las experiencias por temas en notas individuales.
- Skills existentes en `.agents/skills/` como referencia del estándar del proyecto.
- Decisiones de diseño en `docs/decisions/`.

## Resultado esperado

- Investigación en `docs/research/` que responda:
  - Cómo registrar cada experiencia (formato de los bullet points, campos mínimos, cuándo se dispara el registro).
  - Qué estructura de descubrimiento facilita recuperar lecciones relevantes al ejecutar tareas futuras: índice por temas, árbol de decisión, clasificación fuzzy, búsqueda semántica u otras opciones. Debe comparar alternativas, no solo proponer una.
  - Dónde guardar las notas de lecciones aprendidas (carpeta, formato, nomenclatura).
  - Si la consolidación en notas debe ser un skill nuevo, una extensión de un skill existente o un proceso documentado.
  - Cómo las lecciones llegan a usarse de referencia: quién las consulta, en qué momento del ciclo de tareas y cómo se indexan.
  - Recomendación justificada para cada decisión.

## Criterios de calidad

- Compara al menos dos alternativas para la estructura de descubrimiento con criterios explícitos.
- La recomendación sobre la estructura está justificada con evidencia, no con preferencia.
- Responde todas las preguntas del resultado esperado.
- Es coherente con el estándar de skills del proyecto y las decisiones de diseño registradas.
- Usa el skill `investigar`.
- Pasa revisión de redacción y pulido mecánico.
- Pasa revisión técnica por subagente independiente.

## Procedimiento sugerido

1. Usar el skill `investigar` para delimitar las preguntas a responder.
2. Revisar los skills existentes y el flujo de tareas para ubicar los puntos de enganche (fin de tarea para el registro, inicio de tarea para la consulta).
3. Investigar estructuras de descubrimiento de conocimiento aplicables a este caso (índices temáticos, árboles de decisión, enfoques fuzzy, búsqueda semántica).
4. Comparar alternativas y formular recomendaciones.
5. Documentar los hallazgos en `docs/research/`.
6. Aplicar revisión de redacción y pulido mecánico.
7. Presentar al usuario para aprobación.

## Notas

- El usuario sugirió un árbol binario de decisiones y preguntó por árboles fuzzy; la investigación debe evaluar esas opciones junto a alternativas más simples.
- La carpeta de notas y la naturaleza de la consolidación (skill nuevo o no) son decisiones que esta investigación debe resolver.

## Revisión

- Subagente: 2026-09-17 — Aprueba
- Usuario: 2026-09-17 — Aprueba
