# Revisar que la visión y los documentos de cabecera reflejen el estado actual

## Estado

[ ] Pendiente | [ ] En progreso | [ ] En revisión | [ ] Completada | [ ] Bloqueada

## Tipo

mantenimiento

## Objetivo

Cotejar la visión del proyecto y los documentos de cabecera (README y similares) contra el estado real del proyecto —skills existentes, flujos, lecciones, decisiones y trabajo completado— y actualizar lo que esté desfasado, de modo que la entrada al proyecto describa lo que hoy es cierto.

## Dependencias

- Ninguna

## Entrada

- `README.md` y cualquier documento de visión o de cabecera del proyecto.
- El estado real: `.agents/skills/`, `TODO.txt`, `docs/decisions/`, `docs/lessons/`, `docs/domains/`, `docs/epics/`.

## Resultado esperado

- Los documentos de cabecera actualizados donde el estado real diverja, o la confirmación explícita de que están al día.
- Las divergencias que no correspondan a esta tarea reportadas o registradas como trabajo descubierto, no corregidas directamente.

## Criterios de calidad

- Cada afirmación del documento de visión es verificable contra el repositorio.
- No se editan retroactivamente documentos históricos (investigaciones, registros): los cambios de criterio se registran como decisiones nuevas.
- El resultado refleja el estado actual, no una aspiración.

## Procedimiento sugerido

1. Inventariar los documentos de cabecera (README, visión si existe como documento propio).
2. Contrastar cada afirmación con el estado real del proyecto.
3. Actualizar lo desfasado; reportar o registrar lo que quede fuera de alcance.

## Notas

-

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario: [fecha] — [Aprueba | Solicita cambios]
