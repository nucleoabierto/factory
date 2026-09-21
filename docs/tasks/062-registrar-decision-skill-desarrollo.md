# Registrar la decisión: desarrollo como skill especialista

## Estado

[ ] Pendiente | [ ] En progreso | [ ] En revisión | [ ] Completada | [ ] Bloqueada

## Objetivo

Registrar la decisión de diseño de encapsular el flujo de desarrollo en un skill especialista, manteniendo `ejecutar-tareas` como ejecutor general, para que la razón de la arquitectura quede documentada antes de construir el flujo.

## Dependencias

- Ninguna

## Entrada

- La investigación `docs/research/2026-09-flujo-desarrollo.md`, en particular su sección «Relación con ejecutar-tareas» y su recomendación.
- La investigación `docs/research/2026-09-separacion-ejecutar-tareas.md`, que anticipó esta decisión.
- El skill `decisiones-diseno` y el formato de `docs/decisions/`.

## Resultado esperado

- Un archivo de decisión en `docs/decisions/` con el contexto (ejecutor general vs. especializado, opciones consideradas), la decisión tomada (skill especialista encapsulado, enrutado por tipo de tarea) y su estado.

## Criterios de calidad

- La decisión explica por qué se descartó añadir las fases como pasos condicionales de `ejecutar-tareas`.
- La decisión referencia la investigación que la fundamenta y la que la anticipó.
- El documento sigue el formato de las decisiones existentes en `docs/decisions/`.

## Procedimiento sugerido

1. Revisar el formato de una decisión existente en `docs/decisions/`.
2. Redactar la decisión: contexto, opciones (extender `ejecutar-tareas` vs. skill especialista), decisión y consecuencias.
3. Crear el archivo con el skill `decisiones-diseno`.

## Notas

- Decisión aprobada por el usuario durante la ejecución de la tarea 061: el ejecutor general no debe contener el pipeline de desarrollo como pasos condicionales.

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario: [fecha] — [Aprueba | Solicita cambios]
