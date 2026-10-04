# Crear el skill de prueba de concepto

## Estado

**[ ] Pendiente** | [~] En progreso | [r] En revisión | [x] Completada | [!] Bloqueada

## Tipo

desarrollo

## Objetivo

Crear el skill `prueba-concepto`: ejecuta pruebas de validación vía código —tests, scripts temporales, prototipos desechables— para resolver incertidumbre técnica durante la planeación, y se cablea como capacidad de `planear-implementacion` —plan técnico— y de `refinar-propuesta` —borradores— para que las planeaciones se apoyen en evidencia ejecutada y no solo en lectura del codebase.

## Dependencias

- Tarea 122 (`docs/tasks/122-investigacion-en-propuesta.md`): ambas editan `refinar-propuesta`; el cableado de esta tarea se hace sobre el skill ya actualizado.

## Entrada

- Las convenciones de skills vigentes (D003, D004, D005) y el catálogo de consumidores.
- Los formatos del plan técnico y de los borradores de propuesta.

## Resultado esperado

- `.agents/skills/prueba-concepto/SKILL.md` con frontmatter y convenciones del ciclo de vida del artefacto de la prueba.
- Cableado de `planear-implementacion` y `refinar-propuesta` para invocarlo cuando la planeación encuentre incertidumbre que el código puede resolver.
- `README.md` actualizado.

## Criterios de calidad

- La `description` declara capacidad, no mecánica (D004, D005).
- Define el ciclo de vida del artefacto: dónde vive, cuándo se descarta y qué se conserva —la conclusión validada, no el código desechable—.
- Los consumidores invocan el skill en el punto donde la incertidumbre aparece, con la orden necesaria.
- `README.md` lista el skill.

## Procedimiento sugerido

1. Releer las convenciones de skills y los dos consumidores a cablear.
2. Escribir el `SKILL.md` con revisión de redacción y pulido mecánico preventivos.
3. Cablear los consumidores y registrar el skill en el README.

## Notas

- El nombre fue elegido por el usuario entre `sondeo-tecnico`, `spike` y `prueba-concepto`.

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario: [fecha] — [Aprueba | Solicita cambios]
