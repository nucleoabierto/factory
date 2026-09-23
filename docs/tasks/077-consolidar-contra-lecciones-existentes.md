# Cotejar experiencias contra las lecciones existentes al consolidar

## Estado

[ ] Pendiente | [ ] En progreso | [ ] En revisión | [ ] Completada | [ ] Bloqueada

## Tipo

mantenimiento

## Objetivo

Mejorar el skill `consolidar-lecciones` para que, antes de proponer la agrupación por temas, coteje cada experiencia pendiente contra el índice de lecciones existentes: si una experiencia ya está cubierta por una lección, se indica (refuerza la nota o no requiere nueva); si la contradice, se plantea al usuario. La agrupación propuesta debe informar este cotejo.

## Dependencias

- Ninguna

## Entrada

- `.agents/skills/consolidar-lecciones/SKILL.md` — hoy solo revisa las lecciones «del tema» tras agrupar (paso 4).
- `docs/lessons/README.md` como contrato de descubrimiento por disparadores.
- Fricción observada al consolidar las experiencias de todo-app (sesión 2026-09-22/23).

## Resultado esperado

- El procedimiento incluye un paso de cotejo previo a la agrupación: leer el índice de lecciones del proyecto, mapear cada experiencia pendiente a las lecciones cuyos disparadores coincidan, y declarar para cada una si ya está cubierta, si refuerza una nota existente o si requiere tema nuevo.
- La propuesta de agrupación al usuario incluye ese mapeo.

## Criterios de calidad

- El cotejo usa los disparadores del índice, consistente con `consultar-lecciones`.
- No se duplican lecciones ya existentes ni se contradicen sin plantearlo.

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario: [fecha] — [Aprueba | Solicita cambios]
