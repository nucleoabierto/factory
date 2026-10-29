# Roadmap

## Dirección

Cubrir el ciclo de vida completo del desarrollo de producto con skills autocontenidos y portables —de la idea suelta a la integración—, extendiendo el motor interno, hoy completo, hacia la gestión a nivel de código y de producto que el producto entregable aún no cubre, y validándolo en proyectos reales construidos con el propio sistema (docs/definicion-proyecto.md).

## Now

- 1. docs/ideas/002-brechas-clasificadas.md — Brechas clasificadas
  - Estado: pendiente de arrancar
  - Justificación: encabeza el orden porque es la maquinaria de diagnóstico que consume el resto de la cadena —`convergencia` la requiere y `carril` la aprovecha— y convierte los problemas de ejecución en señal de producto.
  - Comparación:
    - Valor: alta
    - Criticidad temporal: media
    - Habilitación/riesgo: alta
    - Tamaño: media
    - Confianza: alta
  - Escenario: docs/priorizaciones/001-gestion-a-nivel-de-producto.md

## Next

- 1. docs/ideas/003-convergencia-plan-requisitos.md — Convergencia plan↔requisitos
  - Estado: bloqueada por brechas clasificadas
  - Justificación: segunda del orden por dependencia —su vuelta al diagnóstico reutiliza la clasificación de brechas— y por valor: hace que los requisitos declarados manden sobre la ejecución.
  - Comparación:
    - Valor: alta
    - Criticidad temporal: media
    - Habilitación/riesgo: media
    - Tamaño: media
    - Confianza: media
  - Escenario: docs/priorizaciones/001-gestion-a-nivel-de-producto.md
- 2. docs/ideas/005-validacion-de-resultado.md — Validación de resultado
  - Estado: pendiente de arrancar
  - Justificación: cierra el lazo de producto —revisita si el problema declarado se resolvió—; va tras la cadena que consolida la trazabilidad problema→entrega de la que depende.
  - Comparación:
    - Valor: alta
    - Criticidad temporal: baja
    - Habilitación/riesgo: media
    - Tamaño: media
    - Confianza: media
  - Escenario: docs/priorizaciones/001-gestion-a-nivel-de-producto.md
- 3. docs/ideas/004-carril-de-baja-friccion.md — Carril de baja fricción
  - Estado: pendiente de arrancar
  - Justificación: la más independiente del conjunto —podría adelantarse si se buscara alivio inmediato—; baja la barrera de entrada a perfiles de gestión y reserva la revisión humana para lo que la merece.
  - Comparación:
    - Valor: alta
    - Criticidad temporal: media
    - Habilitación/riesgo: media
    - Tamaño: media
    - Confianza: alta
  - Escenario: docs/priorizaciones/001-gestion-a-nivel-de-producto.md

## Later

- Validación externa continuada — `modern-todo-app` como segundo proyecto real tras `todo-app`: práctica permanente del criterio de éxito, no una línea planificable; alimenta lecciones y ejercita las capacidades nuevas sobre toolchain real.
- Comprensión y enseñanza — módulo transversal: puerta de comprensión en vivo para el humano y documentos explicativos de un cambio, para que la revisión humana que el flujo exige sea informada y no un acto de fe.

## No ahora

- Despliegue y CI/CD — fuera del alcance del producto por definición: se gestionan con los sistemas existentes en cada proyecto evaluado.

## Revisión

- Usuario: 2026-10-12 — Aprueba
- Usuario: 2026-10-26 — Aprueba
- Usuario: 2026-10-29 — Aprueba
