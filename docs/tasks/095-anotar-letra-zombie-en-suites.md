# Declarar la letra ZOMBIE en las suites de pruebas

## Estado

[ ] Pendiente | [ ] En progreso | [ ] En revisión | [x] Completada | [ ] Bloqueada

## Tipo

mantenimiento

## Objetivo

Hacer explícito el uso de ZOMBIE como guía de generación de la `## Suite de pruebas esperada`: cada expectativa declara, entre paréntesis y cuando aplique, la letra del parámetro ZOMBIE (Z, O, M, B, I, E) que se usó para derivarla. El cambio actualiza la convención en `planear-implementacion` para las suites futuras, de modo que la cobertura de los ejes quede visible y revisable sin reconstruir el razonamiento.

## Dependencias

- Ninguna

## Entrada

- `.agents/skills/planear-implementacion/SKILL.md`, cuya fase «Redactar la suite de pruebas esperada» usa ZOMBIE como guía interna y declara que la suite «no declara su relación con ZOMBIE ni con la implementación».
- El significado del acrónimo ZOMBIE: *zero, one, many, boundary, interface, exception*.

## Resultado esperado

- `planear-implementacion` actualizado: la suite declara por expectativa la letra ZOMBIE que la derivó cuando aplica —las pruebas de regresión o de arnés pueden quedar sin anotar— con un formato uniforme, p. ej. `(Z)` junto a la expectativa. La regla que prohibía declarar la relación con ZOMBIE se ajusta solo en ese punto: la suite sigue sin acoplarse a la implementación.
- Las suites ya escritas no se reanotan: la convención aplica solo hacia adelante (ver Notas).

## Criterios de calidad

- El formato de anotación es uniforme y queda definido en un solo lugar del skill.
- Solo se anota donde un parámetro ZOMBIE aplicó de verdad; no se fuerza la letra en expectativas de regresión o de arnés.
- La anotación es consistente entre suites: el mismo tipo de parámetro recibe la misma letra.
- La suite sigue describiendo el qué (expectativas sobre el comportamiento), no el cómo.

## Procedimiento sugerido

1. Definir el formato de anotación en `planear-implementacion`, ajustando la fase de suite, el principio 8 y la `description`.
2. Aplicar revisión de redacción y pulido mecánico en modo preventivo.

## Notas

- Solicitada por el usuario al revisar todo-app: los planes no seguían bien la convención ZOMBIE porque la suite no declaraba qué parámetro derivó cada prueba.
- Alcance ajustado durante la ejecución: el usuario indicó no anotar las suites históricas de todo-app —son documentos de entrada ya escritos y la lección de estabilidad temporal prohíbe reeditarlos retroactivamente. La convención aplica solo a las suites futuras vía `planear-implementacion`.
- Si el cambio de convención se considera estructural, registrar la decisión con `decisiones-diseno` y actualizar el índice `docs/decisions/README.md`. Se consideró estructural: registrada como D028.

## Revisión

- Subagente: 2026-09-26 — Aprueba
- Usuario: 2026-09-26 — Aprueba
