# Liberar la versión 0.7.0

## Estado

[r] En revisión

## Tipo

mantenimiento

## Objetivo

Promover la sección Unreleased del changelog —seis entradas acumuladas de las tareas 142–144 (priorización por escenarios) y 149–151 (brechas clasificadas)— a la versión 0.7.0 con su fecha, siguiendo el flujo del skill `liberar-version`: curación de los no liberados, bump semver justificado por los tipos de cambio y promoción confirmada por el usuario.

## Dependencias

- Ninguna

## Entrada

- `CHANGELOG.md` — sección Unreleased con las entradas a promover.
- `teleprompter.json` — fuente de versión detectable (hoy `0.6.0`).
- El skill `liberar-version` como ejecutor del flujo.

## Resultado esperado

- `CHANGELOG.md` con `## [0.7.0] - <fecha>` conteniendo las entradas promovidas, Unreleased de vuelta a su estado vacío y los enlaces comparativos (`[Unreleased]`, `[0.7.0]`) actualizados.
- `teleprompter.json` con `"version": "0.7.0"`.
- Etiqueta git `v0.7.0` si el flujo de liberación la produce.

## Criterios de calidad

- El bump propuesto es minor: los no liberados acumulan Added y Changed sin breaking —0.7.0 es el número justificado—.
- Ninguna entrada promovida se pierde ni se reescribe en el fondo; la curación es de forma, no de contenido.
- Los enlaces comparativos del pie apuntan a los rangos correctos (`v0.6.0...v0.7.0`, `v0.7.0...HEAD`).

## Procedimiento sugerido

1. Invocar `liberar-version` y seguir su flujo: volcado de no liberados, propuesta de bump justificada y confirmación del usuario.
2. Promover la sección con la fecha del día y actualizar la fuente de versión detectable.
3. Verificar los enlaces comparativos del pie del changelog.

## Notas

- Tarea suelta en `General`; la liberación recoge dos capacidades entregadas: priorización por escenarios y brechas clasificadas con sus dos vías (carril técnico ligero y vuelta a la demanda).

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario (ejecución): [fecha] — [Aprueba | Solicita cambios]
- Usuario (cierre): [fecha] — [Aprueba | Solicita cambios]
