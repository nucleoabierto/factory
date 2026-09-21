# Skill de revisión de implementación

## Estado

[ ] Pendiente | [ ] En progreso | [ ] En revisión | [ ] Completada | [ ] Bloqueada

## Objetivo

Construir el skill de revisión técnica de una implementación: un subagente de contexto aislado que revisa el diff contra las convenciones del proyecto y los archivos hermanos o de funcionalidad similar.

## Dependencias

- Ninguna

## Entrada

- La investigación `docs/research/2026-09-flujo-desarrollo.md`: fase de revisión, con las capas mecánica y de verificación formal del plan pospuestas.
- La investigación `docs/research/flujo-revision-tareas.md`: separación de contextos y rol adversarial del revisor.
- El diff de los cambios y el archivo de la tarea.

## Resultado esperado

- Un skill nuevo en `.agents/skills/` que define la revisión de implementación por subagente independiente: recibe el diff y el archivo de tarea (no el razonamiento del ejecutor), revisa la consistencia con archivos hermanos y con las reglas declaradas del proyecto, y produce un informe con veredicto (aprueba o solicita cambios).

## Criterios de calidad

- El revisor arranca con contexto aislado: ve el diff y los criterios, no el razonamiento del ejecutor.
- La revisión verifica consistencia con archivos hermanos o de funcionalidad similar, no solo con el enunciado de la tarea.
- El informe cita la regla o patrón concreto que cada hallazgo infringe.
- «No hay hallazgos» es un veredicto válido: el revisor no está obligado a producir problemas.
- El skill sigue la estructura y convenciones de los skills existentes.

## Procedimiento sugerido

1. Revisar cómo `ejecutar-tareas` lanza hoy el subagente de revisión para reutilizar el mecanismo.
2. Redactar el skill con el prompt/procedimiento del revisor: inspección de archivos hermanos, reglas declaradas del proyecto, veredicto.
3. Aplicar revisión de redacción y pulido mecánico preventivos.

## Notas

- La capa mecánica (ejecutar tests, lint, build como primera capa) queda pospuesta.
- La verificación nominal plan↔implementación se añade en la tarea 068.

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario: [fecha] — [Aprueba | Solicita cambios]
