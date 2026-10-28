# Roadmap

## Dirección

Cubrir el ciclo de vida completo del desarrollo de producto con skills autocontenidos y portables —de la idea suelta a la integración—, extendiendo el motor interno, hoy completo, hacia la gestión a nivel de código y de producto que el producto entregable aún no cubre, y validándolo en proyectos reales construidos con el propio sistema (docs/definicion-proyecto.md).

## Now

- 1. docs/epics/005-priorizacion-declarada.md — Planeación y gestión a nivel de producto
  - Estado: en curso
  - Justificación: la línea está en vuelo —dos de las tres piezas del hito (escenarios de priorización y su paso en la planeación) ya están integradas; resta cablear los disparadores de revisita—. Formalizar la gestión es lo que convierte el sistema en gestor de producto y no solo ejecutor. Temas de la línea:
  - Diagnóstico de brechas con dos vías: un detalle de implementación toma un track técnico ligero (restricción → alternativas → decisión documentada) mientras una capacidad independiente produce una idea derivada que compite por prioridad en el backlog, dejando la original bloqueada con trazabilidad — en lugar del tratamiento uniforme de tareas puente.
  - Priorización cuantificada de las líneas (valor, impacto, confianza, esfuerzo) y backlog unificado con política de capacidad por tipo de trabajo.
  - Planeación por casos de uso con happy path, alternativas y casos límite; detección de bloqueos ocultos en el detalle del PRD que devuelva el trabajo al diagnóstico de brecha.
  - Puerta de convergencia plan↔PRD antes de ejecutar: verificar que los requisitos funcionales y las decisiones técnicas están alineados.
  - Carril rápido para cambios triviales: gate de trivialidad y revisión mínima en lugar del ciclo completo.
  - Artefacto de registro de feedback de usuarios, aún inexistente.

## Next

## Later

- Validación externa continuada — `modern-todo-app` como segundo proyecto real tras `todo-app`: práctica permanente del criterio de éxito, no una línea planificable; alimenta lecciones y ejercita las capacidades nuevas sobre toolchain real.
- Comprensión y enseñanza — módulo transversal: puerta de comprensión en vivo para el humano y documentos explicativos de un cambio, para que la revisión humana que el flujo exige sea informada y no un acto de fe.

## No ahora

- Despliegue y CI/CD — fuera del alcance del producto por definición: se gestionan con los sistemas existentes en cada proyecto evaluado.

## Revisión

- Usuario: 2026-10-12 — Aprueba
- Usuario: 2026-10-26 — Aprueba
