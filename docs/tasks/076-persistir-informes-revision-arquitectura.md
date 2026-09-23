# Persistir los informes de revisión de arquitectura

## Estado

[ ] Pendiente | [ ] En progreso | [ ] En revisión | [ ] Completada | [ ] Bloqueada

## Tipo

mantenimiento

## Objetivo

Extender el skill `revisar-arquitectura` para que el informe quede almacenado de forma persistente en el proyecto que contiene el dominio evaluado (p. ej. `docs/reviews/`), en lugar de existir solo en la conversación, de modo que las tareas y decisiones derivadas puedan referenciarlo.

## Dependencias

- Ninguna

## Entrada

- `.agents/skills/revisar-arquitectura/SKILL.md` — hoy la salida dice «se presenta al usuario; no crea archivos».
- Fricción observada en la primera ejecución real (tarea 007 de todo-app): el informe no quedó persistido y las tareas derivadas 008-010 hubieron de reescribirse para apuntar a `todo-app/docs/reviews/001-revision-arquitectura-dominio.md`.
- `todo-app/docs/reviews/` como precedente de ubicación.

## Resultado esperado

- El skill define dónde vive el informe (`docs/reviews/` del proyecto del dominio), su formato/nomenclatura (serie propia o fecha, consistente con las convenciones de documentación del proyecto) y si lleva índice.
- Los hallazgos derivados referencian el informe almacenado.
- La sección «Salida» del skill y la rúbrica quedan actualizadas.

## Criterios de calidad

- Consistente con la lección de anclas y trazabilidad: el informe es el origen estable que las tareas citan.
- La ubicación sigue la misma regla que `docs/domains/`: junto al código del dominio evaluado.
- Las listas de categorías siguen declaradas abiertas y extensibles.

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario: [fecha] — [Aprueba | Solicita cambios]
