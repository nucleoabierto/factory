# Añadir la verificación plan↔implementación a la revisión

## Estado

[ ] Pendiente | [ ] En progreso | [ ] En revisión | [ ] Completada | [ ] Bloqueada

## Objetivo

Extender el skill de revisión de implementación con la verificación nominal del plan: cada elemento del plan técnico y de la suite de pruebas confrontado contra su realización en el diff.

## Dependencias

- 066 (Skill de revisión de implementación): la verificación se añade como capa del revisor.
- 064 (Skill de planeación de implementación): el plan y la suite verificados son los que la planeación produce.
- 065 (Skill de ejecución de implementación): produce el registro de desviaciones que la verificación contrasta.

## Entrada

- La investigación `docs/research/2026-09-flujo-desarrollo.md`: la verificación plan↔implementación como práctica de la industria (spec-kit converge, claude-replan recheck) pospuesta en la construcción inicial.
- El skill de revisión de implementación construido en la tarea 066.
- El registro de desviaciones producido por la ejecución (tarea 065).

## Resultado esperado

- El skill de revisión de implementación actualizado: además de convenciones y archivos hermanos, el revisor verifica que cada acción del plan técnico tiene su realización en el diff (o una desviación registrada) y que la suite de pruebas planeada existe.

## Criterios de calidad

- La verificación es nominal: elemento del plan contra realización, no una inspección general.
- Las desviaciones registradas durante la ejecución cuentan como realización declarada; el revisor verifica que estén registradas y sean coherentes.
- El veredicto distingue «plan no seguido sin desviación registrada» de «desviación registrada», que puede requerir confirmación del usuario.
- «No hay hallazgos» sigue siendo un veredicto válido.

## Procedimiento sugerido

1. Revisar el skill de revisión de implementación y el formato del plan en el archivo de tarea.
2. Añadir la capa de verificación plan↔diff al procedimiento del revisor.
3. Aplicar revisión de redacción y pulido mecánico preventivos.

## Notas

- La capa mecánica (ejecutar tests, lint, build) sigue pospuesta; esta tarea cubre solo la verificación contra el plan.

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario: [fecha] — [Aprueba | Solicita cambios]
