# Descripción a nivel de capacidad en consultar-lecciones

## Estado

[ ] Pendiente | [ ] En progreso | [ ] En revisión | [x] Completada | [ ] Bloqueada

## Tipo

mantenimiento

## Objetivo

Corregir la `description` del front-matter de `consultar-lecciones`, que narra la mecánica interna del skill, para que declare la capacidad y el resultado como hacen sus hermanos tras la corrección aplicada a `consultar-decisiones` en la tarea 089.

## Dependencias

- Ninguna

## Entrada

- `.agents/skills/consultar-lecciones/SKILL.md`, cuya `description` actual describe el procedimiento («dada una descripción… busca los disparadores aplicables en el índice… y trae las notas»).
- La `description` de `consultar-decisiones` como referencia del nivel de abstracción esperado.
- La lección `contratos-de-skills` de `docs/lessons/`, que ya documenta esta regla.

## Resultado esperado

- La `description` de `consultar-lecciones` declara qué capacidad ofrece y qué resultado produce —recuperar las lecciones vigentes que aplican al trabajo y traerlas al contexto— sin describir el mecanismo de índice y disparadores, que vive en el cuerpo del skill.
- El resto del skill no cambia.

## Criterios de calidad

- La `description` no menciona `docs/lessons/README.md`, disparadores ni el procedimiento de búsqueda.
- Mantiene las cláusulas de cuándo usar y los sinónimos, ajustados si es necesario.
- Coherente en nivel de abstracción con la `description` de `consultar-decisiones`.

## Procedimiento sugerido

1. Releer la `description` actual y la de `consultar-decisiones`.
2. Reescribirla a nivel de capacidad y resultado.
3. Aplicar revisión de redacción y pulido mecánico en modo preventivo.

## Notas

- Trabajo descubierto durante la tarea 089: la descripción corregida de `consultar-decisiones` había heredado el patrón acoplado de `consultar-lecciones`.

## Revisión

- Subagente: 2026-09-26 — Aprueba
- Usuario: 2026-09-26 — Aprueba
