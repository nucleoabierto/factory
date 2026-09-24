# Investigar los siguientes elementos del proyecto usando todo-app como PoC

## Estado

[ ] Pendiente | [ ] En progreso | [ ] En revisión | [x] Completada | [ ] Bloqueada

## Tipo

investigación

## Objetivo

Investigar cuáles podrían ser los siguientes elementos a agregar al proyecto —skills, orquestadores u otras capacidades— usando todo-app como prueba de concepto y caso de estudio. La investigación debe considerar las mejores prácticas de la industria y, a la vez, la trayectoria propia de factory, para mantener la coherencia y no seguir de forma ciega a otros proyectos.

## Dependencias

- Ninguna

## Entrada

- `todo-app/` como PoC y evidencia de lo que el sistema actual ya cubre y dónde fricciona.
- `.agents/skills/` y `docs/` como inventario de las capacidades actuales.
- `docs/lessons/` del proyecto y `todo-app/docs/lessons/` del PoC: las lecciones aprendidas en ambos ámbitos como insumo de qué funciona y qué falta.
- Fuentes externas sobre prácticas de orquestación de agentes, skills y flujos de trabajo.

## Resultado esperado

- Un documento en `docs/research/` con las opciones candidatas, su justificación con evidencia verificable y una recomendación priorizada.
- Cada propuesta evaluada contra la trayectoria del proyecto: qué encaja con la dirección de factory y qué se descarta por ajeno o prematuro.

## Criterios de calidad

- Las opciones citan referencias verificables (externas o del propio repositorio).
- La recomendación distingue lo que la industria sugiere de lo que la trayectoria del proyecto justifica.
- El documento declara marca temporal y conclusiones justificadas.

## Procedimiento sugerido

1. Ejecutar la investigación con el skill `investigar`.
2. Usar todo-app como caso de estudio para identificar fricciones reales del sistema actual.
3. Contrastar las prácticas de la industria con la trayectoria de factory y priorizar.

## Notas

-

## Revisión

- Subagente: 2026-09-23 — Aprueba (segunda ronda; la primera solicitó cambios, corregidos)
- Usuario: 2026-09-23 — Aprueba
