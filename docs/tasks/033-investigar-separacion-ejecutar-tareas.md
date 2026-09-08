# Investigar separación de ejecutar-tareas

## Estado

[x] Completada

## Objetivo

Investigar si conviene separar `ejecutar-tareas` en un skill de orquestación de desarrollo con vocabulario y pasos específicos del dominio de código, o si basta con que `ejecutar-tareas` invoque skills de desarrollo en el paso 4.

## Dependencias

Ninguna

## Entrada

- Skill `ejecutar-tareas` en `.agents/skills/ejecutar-tareas/SKILL.md`.
- Investigación de la tarea 031 en `docs/research/2026-09-flujos-idea-tarea-ejecucion.md`.
- Documento de visión y definición del proyecto.
- Decisiones de diseño en `docs/decisions/`.

## Resultado esperado

- Investigación en `docs/research/` que responda:
  - Qué pasos específicos del dominio de desarrollo no cubre `ejecutar-tareas` hoy.
  - Si la lógica de orquestación es realmente distinta o si basta con que `ejecutar-tareas` invoque skills de desarrollo en el paso 4.
  - Qué vocabulario y pasos específicos tendría un skill de orquestación de desarrollo.
  - Si hay precedentes en la industria de separar orquestadores por dominio.
  - Recomendación: separar, extender o mantener.

## Criterios de calidad

- Analiza concretamente qué pasos del dominio de desarrollo no cubre `ejecutar-tareas` hoy.
- Compara las opciones (separar, extender, mantener) contra criterios relevantes.
- Justifica la recomendación con evidencia, no con preferencia.
- Es coherente con la visión de flujo asíncrono y el principio bootstrap.
- Usa el skill `investigar`.
- Pasa revisión de redacción y pulido mecánico.
- Pasa revisión técnica por subagente independiente.

## Procedimiento sugerido

1. Usar el skill `investigar` para definir el alcance: separar, extender o mantener `ejecutar-tareas`.
2. Analizar el procedimiento actual de `ejecutar-tareas` e identificar qué pasos cambiarían con flujos de código.
3. Buscar precedentes en la industria de orquestadores separados por dominio.
4. Comparar las opciones contra criterios relevantes.
5. Documentar los hallazgos en `docs/research/`.
6. Aplicar revisión de redacción y pulido mecánico.
7. Presentar al usuario para aprobación.

## Notas

- Los flujos de gestión a nivel de código (branching, PRs) no existen todavía. La investigación debe basarse en lo que se puede anticipar y en precedentes, no en implementación concreta.
- La recomendación puede ser posponer la decisión hasta que existan los flujos de código, si la evidencia no es suficiente.

## Revisión

- Subagente: 2026-09-07 — Aprueba
- Usuario: 2026-09-07 — Aprueba
