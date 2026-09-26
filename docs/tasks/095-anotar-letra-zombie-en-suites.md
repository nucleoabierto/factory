# Declarar la letra ZOMBIE en las suites de pruebas

## Estado

[ ] Pendiente | [ ] En progreso | [ ] En revisión | [ ] Completada | [ ] Bloqueada

## Tipo

mantenimiento

## Objetivo

Hacer explícito el uso de ZOMBIE como guía de generación de la `## Suite de pruebas esperada`: cada expectativa declara, entre paréntesis y cuando aplique, la letra del parámetro ZOMBIE (Z, O, M, B, I, E) que se usó para derivarla. El cambio cubre la convención en `planear-implementacion` y su aplicación retroactiva a las suites ya escritas de todo-app, de modo que la cobertura de los ejes quede visible y revisable sin reconstruir el razonamiento.

## Dependencias

- Ninguna

## Entrada

- `.agents/skills/planear-implementacion/SKILL.md`, cuya fase «Redactar la suite de pruebas esperada» usa ZOMBIE como guía interna y declara que la suite «no declara su relación con ZOMBIE ni con la implementación».
- Los archivos de tarea de `todo-app/docs/tasks/` que contienen `## Suite de pruebas esperada`.
- El significado del acrónimo ZOMBIE: *zero, one, many, boundary, interface, exception*.

## Resultado esperado

- `planear-implementacion` actualizado: la suite declara por expectativa la letra ZOMBIE que la derivó cuando aplica —las pruebas de regresión o de arnés pueden quedar sin anotar— con un formato uniforme, p. ej. `(Z)` junto a la expectativa. La regla que prohibía declarar la relación con ZOMBIE se ajusta solo en ese punto: la suite sigue sin acoplarse a la implementación.
- Las suites de las tareas de todo-app anotadas con el mismo formato: cada expectativa derivada de un parámetro ZOMBIE lleva su letra entre paréntesis, sin reescribir ni reordenar el texto.

## Criterios de calidad

- El formato de anotación es uniforme y es el mismo en el skill y en las suites de todo-app.
- Solo se anota donde un parámetro ZOMBIE aplicó de verdad; no se fuerza la letra en expectativas de regresión o de arnés.
- La anotación es consistente entre tareas: el mismo tipo de parámetro recibe la misma letra en todas las suites.
- La suite sigue describiendo el qué (expectativas sobre el comportamiento), no el cómo.

## Procedimiento sugerido

1. Definir el formato de anotación en `planear-implementacion`, ajustando la fase de suite y el principio 8.
2. Listar las tareas de todo-app con `## Suite de pruebas esperada`.
3. Para cada expectativa, determinar si deriva de un parámetro ZOMBIE y cuál, y añadir la letra sin tocar el texto.
4. Aplicar revisión de redacción y pulido mecánico en modo preventivo.

## Notas

- Solicitada por el usuario al revisar todo-app: los planes no seguían bien la convención ZOMBIE porque la suite no declaraba qué parámetro derivó cada prueba.
- Si el cambio de convención se considera estructural, registrar la decisión con `decisiones-diseno` y actualizar el índice `docs/decisions/README.md`.

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario: [fecha] — [Aprueba | Solicita cambios]
