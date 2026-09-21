# Investigar el flujo de desarrollo y generar sus tareas

## Estado

[ ] Pendiente | [ ] En progreso | [ ] En revisión | [x] Completada | [ ] Bloqueada

## Objetivo

Investigar la viabilidad del flujo de desarrollo propuesto por el usuario, contrastarlo con mejores prácticas de la industria para esta parte del desarrollo y, con la investigación como entrada, crear las tareas que materialicen el flujo completo como skills independientes.

## Dependencias

- Ninguna

## Entrada

- El flujo propuesto por el usuario, en cuatro fases:
  - **Planeación técnica:** plan de la tarea individual siguiendo los lineamientos de la épica. Acciones a nivel conceptual —sin paths, snippets ni decisiones de implementación final—: crear una clase nueva (decir cuál), agregar un método a una clase, dividir un módulo (listando las funciones a extraer y la clase receptora), etc. Cada acción lleva una explicación de cómo aporta al desarrollo: storytelling técnico, donde el bullet muestra la acción y la explicación permite entender la progresión de forma no técnica.
  - **Planeación de testing:** con ZOMBIE (zero, one, many, boundary, interface, exception) como guía para determinar casos, definir la suite de pruebas esperada. La suite no declara su relación con ZOMBIE; explica las expectativas sobre lo que el sistema hace —los tests se enfocan en el qué, no en el cómo. Una prueba sin caso de uso asociado es de baja calidad. Se agrega al plan técnico.
  - **Ejecución:** desarrollo siguiendo el plan generado.
  - **Revisión:** un agente nuevo (o subagente) compara el plan contra el desarrollo y revisa archivos hermanos o de funcionalidad similar para verificar consistencia con las convenciones del proyecto, no solo con el plan.
- El skill `investigar`, que produce el documento de conclusiones.
- El skill `ejecutar-tareas`, que hoy contiene ejecución y revisión acopladas al ciclo de tareas.
- Mejores prácticas de la industria para planeación técnica, diseño de suites de pruebas y revisión de código por agentes.

## Resultado esperado

- Un documento en `docs/research/` con las conclusiones justificadas: viabilidad del flujo propuesto, mejoras sugeridas desde la industria, forma que tomaría cada fase como skill y su relación con `ejecutar-tareas`.
- Las tareas del flujo completo creadas con `crear-tareas` **después** de la investigación, usando sus conclusiones como entrada —no antes ni con información parcial.

## Criterios de calidad

- La investigación evalúa el flujo propuesto tal como se describió e identifica dónde la industria sugiere ajustes o mejoras.
- Las tareas del flujo se crean solo cuando la investigación está completa y reflejan sus conclusiones.
- Cada fase del flujo queda como skill independiente propuesto, con su responsabilidad delimitada.
- Si la investigación sugiere cambios sustanciales al flujo propuesto, se presentan al usuario antes de crear las tareas.

## Procedimiento sugerido

1. Ejecutar el skill `investigar` sobre el flujo propuesto y las mejores prácticas de la industria.
2. Presentar las conclusiones al usuario, especialmente si difieren del flujo descrito.
3. Con la investigación validada, usar `crear-tareas` en modo independiente para dar de alta las tareas del flujo.

## Notas

- El flujo propuesto separa planeación técnica de ejecución: hoy `ejecutar-tareas` mezcla ambas. La investigación debe resolver cómo se relacionan.

## Revisión

- Subagente: 2026-09-21 — Aprueba
- Usuario: 2026-09-21 — Aprueba
