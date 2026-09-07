# Investigar flujos de idea a tarea y de ejecución de tarea

## Estado

[x] Completada

## Objetivo

Investigar los pasos y eventos de los primeros dos flujos del producto entregable: convertir una idea en una tarea y ejecutar una tarea. Identificar cómo se apalancan los skills existentes (`commit`, `crear-tareas`, `ejecutar-tareas`, `revisar-redaccion`, `pulir-escritura`, `decisiones-diseno`, `investigar`) y qué skills nuevos se necesitan. Mantener la alineación con el flujo asíncrono: el agente avanza lo que puede y se detiene en los puntos que requieren aprobación del usuario.

## Dependencias

- 030

## Entrada

- Skill `investigar` creado en la tarea 030.
- Skills existentes en `.agents/skills/`.
- Documento de visión y definición del proyecto.
- Decisiones de diseño en `docs/decisions/`.

## Resultado esperado

- Investigación en `docs/research/2026-09-flujos-idea-tarea-ejecucion.md` que mapee:
  - Los pasos de cada flujo (idea → tarea, ejecución → commit).
  - Los puntos de control humano (dónde el usuario aprueba, dónde el agente avanza solo).
  - Qué skills existentes se reutilizan en cada paso.
  - Qué skills nuevos se necesitan.
  - Cómo se integran los skills en un flujo coherente.

## Criterios de calidad

- Mapea los dos flujos paso a paso, identificando qué hace el agente y qué hace el usuario en cada paso.
- Identifica explícitamente los puntos de control humano asíncrono.
- Especifica qué skills existentes se reutilizan y dónde.
- Identifica qué skills nuevos se necesitan y para qué.
- Es coherente con la visión de flujo asíncrono y el principio bootstrap.
- Usa el skill `investigar` de la tarea 030.
- Pasa revisión de redacción y pulido mecánico.
- Pasa revisión técnica por subagente independiente.

## Procedimiento sugerido

1. Usar el skill `investigar` para definir el alcance: dos flujos (idea → tarea, ejecución → commit).
2. Analizar cada flujo paso a paso, identificando qué hace el agente y qué hace el usuario.
3. Mapear los skills existentes a cada paso donde apliquen.
4. Identificar los gaps: qué pasos no tienen skill y necesitan uno nuevo.
5. Documentar los hallazgos en `docs/research/2026-09-flujos-idea-tarea-ejecucion.md`.
6. Aplicar revisión de redacción y pulido mecánico.
7. Presentar al usuario para aprobación.

## Notas

- El flujo de idea a tarea incluye: refinamiento de la idea, propuesta estructurada, aprobación del usuario, creación de la tarea. El skill `crear-tareas` ya cubre parte de este flujo.
- El flujo de ejecución incluye: tomar la tarea, ejecutarla, revisar, corregir, commitear. Los skills `ejecutar-tareas`, `commit`, `revisar-redaccion`, `pulir-escritura` y `decisiones-diseno` ya cubren partes de este flujo.
- El objetivo es identificar qué falta, no rediseñar lo que ya funciona.

## Revisión

- Subagente: 2026-09-07 — Aprueba
- Usuario: 2026-09-07 — Aprueba
