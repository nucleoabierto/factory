# Fundamentar la guía de estilo en el skill documentar-guia-estilo

## Estado

[ ] Pendiente | [~] En progreso | [r] En revisión | **[x] Completada** | [!] Bloqueada

## Tipo

mantenimiento

## Objetivo

Las secciones que el skill `documentar-guia-estilo` produce —Componentes, Estados, Layout— transcriben la mecánica aplicada (qué token, qué valor) sin las razones: comparadas contra el código son tautológicas y no permiten entender por qué la estructura visual tiene su forma actual. La tarea mejora el skill para que la guía que produce documente tres capas: principios que arbitran decisiones, cada regla acompañada de la razón de su decisión —qué protege, qué trade-off resuelve— conservando la referencia a tokens, y orientación generativa para derivar el estilo de componentes o pantallas que aún no existen. El contrato verificable no se relaja: todo valor visual sigue proviniendo de tokens.

## Dependencias

- Ninguna

## Entrada

- El skill `documentar-guia-estilo` y el skill de validación `aplicar-guia-estilo`.
- `modern-todo-app/DESIGN.md` como guía real de referencia y proyecto de validación.
- Las mejores prácticas relevadas de documentación de sistemas de diseño: explicar el porqué y no solo el qué (IBM, Atlassian), principios explícitos que arbitran decisiones (Figma), intención además de valor en los tokens (Storybook) y documentar la realidad en lugar de aspiraciones.

## Resultado esperado

- `.agents/skills/documentar-guia-estilo/SKILL.md` con las convenciones de las tres capas: principios, reglas con razón y orientación generativa.
- Como efecto secundario de aplicar el skill mejorado, `modern-todo-app/DESIGN.md` reescrito con las tres capas.
- La validación de `aplicar-guia-estilo` en verde sobre la guía resultante.

## Criterios de calidad

- Los tokens no cambian; la guía sigue siendo contrato verificable.
- Cada regla declara la razón de su decisión: no hay reglas sin razón ni razones sin regla.
- Los principios se derivan de las decisiones existentes, no son aspiraciones.
- Un componente nuevo razonable —p. ej. un botón primario o un campo de búsqueda— puede diseñarse aplicando principios y orientación sin leer el código.

## Procedimiento sugerido

1. Releer el skill, el skill de validación y el `DESIGN.md` de modern-todo-app; identificar las convenciones a cambiar.
2. Redactar las nuevas convenciones con revisión de redacción y pulido mecánico preventivos.
3. Aplicar el skill mejorado a `modern-todo-app/DESIGN.md`.
4. Validar la guía resultante con `aplicar-guia-estilo`.

## Notas

- Si la mejora revela ajustes necesarios en `aplicar-guia-estilo`, se registran como tarea descubierta en lugar de ampliar el alcance.

## Desviaciones del plan

- La segunda revisión encontró que la guía declaraba como vigente UI que el código no renderiza —pie con contador, filtros, limpiar completadas: la lógica de dominio existe pero falta la interfaz—; contenido aspiracional preexistente a esta tarea. Resuelto marcándolos «(pendiente de implementación)» con la convención nueva de la plantilla, que el validador trata como brecha del código, no como deriva.
- A petición del usuario se añadió `references/ejemplo-design-md.md`: un ejemplo completo de guía que cumple las reglas —proyecto ficticio para no duplicar la guía real de MTA y evitar deriva entre copias—, con el mapeo de cada sección a la regla que demuestra; cableado en la Entrada y Referencias del skill y en el encabezado de la plantilla.


## Revisión

- Subagente: 2026-10-04 — Aprueba (iteración 3; la iteración 2 solicitó cambios —UI aspiracional declarada como vigente— corregidos con el marcador «pendiente de implementación»)
- Usuario: 2026-10-04 — Aprueba (con dos absorciones durante la revisión: razones en dos dimensiones UI+UX y ejemplo de referencia)
