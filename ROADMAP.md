# Roadmap

## Dirección

Cubrir el ciclo de vida completo del desarrollo de producto con skills autocontenidos y portables —de la idea suelta a la integración—, extendiendo el motor interno, hoy completo, hacia la gestión a nivel de código y de producto que el producto entregable aún no cubre, y validándolo en proyectos reales construidos con el propio sistema (docs/definicion-proyecto.md).

## Now

- 1. Revisión de código como capacidad del producto — línea de dirección, sin artefacto propio todavía
  - Estado: pendiente de arrancar; se materializa por el flujo de idea a tarea.
  - Justificación: el sistema ya revisa sus propios cambios en el ciclo de tareas (`revisar-implementacion`, subagente de revisión, cotejo de lecciones); convertir esa capacidad en un skill invocable sobre diffs arbitrarios del proyecto evaluado es la mayor brecha hacia el producto entregable y la que más habilita a las demás líneas, que producen código ajeno al flujo interno.
  - Documentación de producto ya alineada con esta dirección (tarea 137, completada).

## Next

- 1. Planeación y gestión a nivel de producto — formalizar cómo el producto decide y ordena el trabajo, no solo cómo lo ejecuta
  - Justificación: la planeación actual asigna horizontes con criterio cualitativo y detecta brechas de conectividad sin clasificarlas; formalizarla es lo que convierte el sistema en gestor de producto y no solo ejecutor. Temas de la línea:
  - Diagnóstico de brechas con dos vías: un detalle de implementación toma un track técnico ligero (restricción → alternativas → decisión documentada) mientras una capacidad independiente produce una idea derivada que compite por prioridad en el backlog, dejando la original bloqueada con trazabilidad — en lugar del tratamiento uniforme de tareas puente.
  - Priorización cuantificada de las líneas (valor, impacto, confianza, esfuerzo) y backlog unificado con política de capacidad por tipo de trabajo.
  - Planeación por casos de uso con happy path, alternativas y casos límite; detección de bloqueos ocultos en el detalle del PRD que devuelva el trabajo al diagnóstico de brecha.
  - Puerta de convergencia plan↔PRD antes de ejecutar: verificar que los requisitos funcionales y las decisiones técnicas están alineados.
  - Carril rápido para cambios triviales: gate de trivialidad y revisión mínima en lugar del ciclo completo.
  - Artefacto de registro de feedback de usuarios, aún inexistente.

## Later

- Validación externa continuada — `modern-todo-app` como segundo proyecto real tras `todo-app`: práctica permanente del criterio de éxito, no una línea planificable; alimenta lecciones y ejercita las capacidades nuevas sobre toolchain real.
- Comprensión y enseñanza — módulo transversal: puerta de comprensión en vivo para el humano y documentos explicativos de un cambio, para que la revisión humana que el flujo exige sea informada y no un acto de fe.

## No ahora

- Despliegue y CI/CD — fuera del alcance del producto por definición: se gestionan con los sistemas existentes en cada proyecto evaluado.

## Revisión

- Usuario: 2026-10-12 — Aprueba
