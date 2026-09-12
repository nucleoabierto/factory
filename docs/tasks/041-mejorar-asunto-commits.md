# Mejorar explicitud del asunto en los commits

## Estado

[x] Completada

## Objetivo

Mejorar la guía del skill `commit` para que los asuntos de commit sean autodescriptivos: cualquier persona que lea el historial debe entender de qué trata el cambio sin conocer la estructura interna del proyecto.

## Dependencias

- Ninguna

## Entrada

- Skill `commit` en `.agents/skills/commit/SKILL.md` y `references/convenciones.md`.
- Historial de commits del proyecto (`git log --oneline`).

## Resultado esperado

- Actualización de `references/convenciones.md` (o del `SKILL.md` si procede) con una guía sobre cómo redactar asuntos autodescriptivos, incluyendo:
  - Evitar referencias a numeración interna del proyecto (hitos, números de tarea) como información principal del asunto.
  - Describir el contenido del cambio en términos concretos que no requieran contexto del proyecto.
  - Preferir el tema del cambio sobre la agrupación administrativa.
- Ejemplos de asuntos malos y buenos que ilustren la diferencia.

## Criterios de calidad

- La guía es específica y verificable: dado un asunto, se puede determinar si la cumple.
- Incluye al menos un ejemplo malo (asunto que referencia estructura interna) y uno bueno (asunto autodescriptivo).
- No contradice las siete reglas universales ni las convenciones de Conventional Commits ya establecidas.
- Mantiene el límite de 50 caracteres del asunto.
- Pasa revisión técnica por subagente independiente.

## Procedimiento sugerido

1. Revisar el historial de commits del proyecto e identificar asuntos que requieren contexto interno para entenderse.
2. Extraer el patrón: qué tienen en común los asuntos poco claros (referencias a hitos, numeración de tareas, descripciones abstractas).
3. Redactar la guía con criterios concretos y ejemplos malo/bueno.
4. Añadir la guía a `references/convenciones.md` en la sección que corresponda.
5. Someter a revisión dual.

## Notas

- El problema: asuntos como «chore: añade tareas del Hito 4 (flujo 1)» requieren saber qué es el Hito 4 y qué es el flujo 1. Un asunto como «chore: añade tareas del flujo de descubrimiento» es autodescriptivo: cualquier lector del historial entiende de qué trata sin conocer la estructura del proyecto.
- La solución: la guía debe indicar que el asunto describe el tema concreto del cambio, no la agrupación administrativa (hito, número de tarea). La numeración interna puede ir en el cuerpo si aporta trazabilidad, pero no como información principal del asunto.
- No cambiar la estructura del skill ni las siete reglas; añadir la guía como criterio adicional de redacción del asunto.

## Revisión

- Subagente: 2026-09-11 — Aprueba
- Usuario: 2026-09-11 — Aprueba
