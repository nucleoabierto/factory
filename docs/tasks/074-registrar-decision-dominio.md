# Registrar la decisión de documentación de dominio y revisión de arquitectura

## Estado

[ ] Pendiente | [ ] En progreso | [ ] En revisión | [x] Completada | [ ] Bloqueada

## Tipo

mantenimiento

## Objetivo

Registrar en `docs/decisions/` la decisión de mantenimiento continuo que adopta el proyecto: la documentación viva de dominios como sensor que corre en cada flujo de desarrollo, y la revisión de arquitectura con DDD como evaluación profunda bajo demanda que el sensor puede disparar.

## Dependencias

- 071

## Entrada

- La investigación `docs/research/2026-09-revision-arquitectura-y-documentacion-dominio.md` con su recomendación justificada.
- El skill `decisiones-diseno` y el directorio `docs/decisions/` para el siguiente número disponible.

## Resultado esperado

- Un archivo `docs/decisions/DNNN-slug.md` con la decisión redactada según el formato del proyecto, estado `Aceptada`, y referencia a la investigación.

## Criterios de calidad

- La decisión registra el *porqué*: la división entre sensor continuo barato (documentación) y evaluación profunda ocasional (revisión), y por qué dos skills separados en lugar de uno combinado.
- El archivo sigue el formato de las decisiones existentes.

## Procedimiento sugerido

1. Invocar `decisiones-diseno` con la decisión: documentación viva de dominios en el ciclo de desarrollo y revisión de arquitectura bajo demanda.

## Notas

- Ninguna.

## Revisión

- Subagente: 2026-09-21 — Aprueba (con una observación menor corregida: referencia resoluble a la tarea 072)
- Usuario: 2026-09-21 — Aprueba (tras revisión contra las lecciones del proyecto)
