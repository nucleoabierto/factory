# Skill de ejecución de implementación

## Estado

[ ] Pendiente | [ ] En progreso | [ ] En revisión | [ ] Completada | [ ] Bloqueada

## Objetivo

Construir el skill que ejecuta el desarrollo de una tarea siguiendo su plan, confrontando el trabajo con el plan a medida que avanza y registrando las desviaciones.

## Dependencias

- 064 (Skill de planeación de implementación): la ejecución consume el plan y la suite que la planeación produce.

## Entrada

- La investigación `docs/research/2026-09-flujo-desarrollo.md`: fase de ejecución con el ajuste aprobado de revisión del plan durante el desarrollo.
- Una tarea de desarrollo con plan técnico y suite de pruebas en su archivo.
- El formato de los skills del proyecto.

## Resultado esperado

- Un skill nuevo en `.agents/skills/` que ejecuta la implementación siguiendo el plan de la tarea y produce el diff de los cambios junto con un registro de las desviaciones respecto al plan.

## Criterios de calidad

- La ejecución confronta el trabajo con el plan durante el desarrollo, no solo al final.
- Al detectar una desviación del alcance del plan, el agente se detiene, registra la desviación y replanifica o pide confirmación; no continúa por inercia.
- Las desviaciones quedan registradas en el archivo de la tarea o en un lugar revisable.
- El skill sigue la estructura y convenciones de los skills existentes.

## Procedimiento sugerido

1. Revisar skills existentes para seguir su estructura.
2. Redactar el skill: entrada (tarea con plan), procedimiento (implementar por pasos del plan, chequeo continuo, manejo de desviaciones), salida (diff + registro).
3. Aplicar revisión de redacción y pulido mecánico preventivos.

## Notas

- La desviación del plan es señal de reexaminar, no un fallo en sí mismo: la planeación continúa durante la implementación cuando aparece evidencia nueva.

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario: [fecha] — [Aprueba | Solicita cambios]
