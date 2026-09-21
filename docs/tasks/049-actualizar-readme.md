# Actualizar README con el estado real del proyecto

## Estado

[ ] Pendiente

## Objetivo

Sincronizar el README con el estado actual del proyecto: la tabla de skills está incompleta y el rango de decisiones declarado quedó desactualizado.

## Dependencias

- Ninguna

## Entrada

- `README.md` actual.
- `.agents/skills/` como fuente de la lista real de skills.
- `docs/decisions/` como fuente del rango real de decisiones (hoy D001–D016).

## Resultado esperado

- `README.md` describe todos los skills existentes: además de los ya listados, `investigar`, `descubrir-problema`, `proponer-forma-solucion`, `refinar-propuesta`, `idea-a-tarea`.
- La sección de documentación referencia el rango correcto de decisiones.
- Las secciones «Estado actual» y «Cómo funciona el ciclo de trabajo» reflejan el flujo de idea a tarea y las propuestas `[p]` en `TODO.txt`.

## Criterios de calidad

- Cada skill de `.agents/skills/` aparece en la tabla con una descripción breve.
- No quedan afirmaciones desactualizadas (rango de decisiones, lista de skills, ciclo de trabajo).
- El texto sigue el tono y formato del README existente.
- Pasa revisión técnica por subagente independiente.

## Procedimiento sugerido

1. Listar `.agents/skills/` y comparar con la tabla del README.
2. Reescribir la tabla y las secciones desactualizadas.
3. Aplicar revisión de redacción y pulido mecánico en modo preventivo.
4. Someter a revisión dual.

## Notas

- Si la tabla crece mucho, considerar agrupar los skills por fase del ciclo en lugar de una lista plana.

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario: [fecha] — [Aprueba | Solicita cambios]
