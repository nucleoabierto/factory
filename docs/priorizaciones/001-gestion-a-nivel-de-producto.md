# Escenario de priorización — gestión a nivel de producto

- **Disparador:** llamada directa
- **Norte:** gestión a nivel de producto — ayudar a las personas a gestionar el desarrollo del producto desde el producto, no desde el código
- **Fecha:** 2026-10-29

## Comparación

- Brechas clasificadas (docs/ideas/002-brechas-clasificadas.md)
  - Valor: alta — convierte problemas de ejecución en señal de producto: la brecha de capacidad vuelve a la demanda en lugar de improvisarse.
  - Criticidad temporal: media — sin urgencia externa, pero cada ejecución sin clasificar produce trabajo puente opaco.
  - Habilitación/riesgo: alta — `convergencia-plan-requisitos` la requiere; `carril-de-baja-friccion` la aprovecha; produce coste y confianza para priorizar.
  - Tamaño: media — conjunto de complejidad media.
  - Confianza: alta
  - Factores de incertidumbre: ninguno
- Convergencia plan↔requisitos (docs/ideas/003-convergencia-plan-requisitos.md)
  - Valor: alta — hace que los requisitos manden sobre la ejecución: declaro→verifico→ejecuto, el núcleo de gestionar producto.
  - Criticidad temporal: media — su valor crece con cada conjunto que declare requisitos; tardarla deja más conjuntos sin verificar.
  - Habilitación/riesgo: media — reduce el riesgo de divergencia, pero depende de brechas clasificadas: no puede arrancar antes.
  - Tamaño: media
  - Confianza: media — depende de brechas entregada y solo aplica a conjuntos con requisitos declarados.
  - Factores de incertidumbre: dependencia de brechas clasificadas; adopción de la práctica de declarar requisitos.
- Carril de baja fricción (docs/ideas/004-carril-de-baja-friccion.md)
  - Valor: alta con el norte — permite a perfiles de gestión aportar sin ejecutar el ciclo completo; la barrera de entrada es hoy un coste de producto.
  - Criticidad temporal: media — los cambios pequeños se acumulan o se cuelan sin registro, pero el daño es gradual.
  - Habilitación/riesgo: media — reserva la revisión humana para lo que la merece; la más independiente del conjunto.
  - Tamaño: media, la más pequeña de las cuatro ideas.
  - Confianza: alta
  - Factores de incertidumbre: el umbral de «trivial» puede costar de definir.
- Validación de resultado (docs/ideas/005-validacion-de-resultado.md)
  - Valor: alta — la línea más de producto del conjunto: cierra el lazo problema declarado → efecto entregado.
  - Criticidad temporal: baja — sin usuarios externos su señal es hoy interna; crece cuando llegue la captura de demanda.
  - Habilitación/riesgo: media — alimenta la ordenación con historial de resultados; depende de la trazabilidad que el resto consolida.
  - Tamaño: media
  - Confianza: media — la evidencia más débil del conjunto (la propia idea lo declara).
  - Factores de incertidumbre: señal interna débil sin usuarios externos; depende de la trazabilidad problema→entrega.
- Validación externa continuada (modern-todo-app)
  - Valor: media — no añade capacidad; ejercita la existente y alimenta lecciones.
  - Criticidad temporal: baja — práctica permanente, nada decae.
  - Habilitación/riesgo: media — ejercitaría la maquinaria nueva sobre toolchain real.
  - Tamaño: pequeña — continua, sin entrega.
  - Confianza: alta
  - Factores de incertidumbre: ninguno
- Comprensión y enseñanza
  - Valor: media con este norte — hace la revisión humana informada, pero es transversal, no específica de producto.
  - Criticidad temporal: baja
  - Habilitación/riesgo: media — refuerza todas las puertas.
  - Tamaño: grande — módulo transversal con alcance difuso.
  - Confianza: media (tamaño — alcance sin acotar)
  - Factores de incertidumbre: alcance sin definir; esfuerzo transversal difícil de estimar.

## Alternativas

### A — Norte y habilitación

brechas → convergencia → validación de resultado → carril → validación externa → comprensión — implicaciones: construye el lazo completo de gestión lo antes posible (diagnosticar brechas, verificar la cobertura del plan, comprobar el resultado); acepta que el alivio de fricción espera detrás de tres conjuntos y que la práctica externa y la comprensión van últimas.

### B — Alivio temprano, cadena detrás

carril → brechas → convergencia → validación de resultado → comprensión → validación externa — implicaciones: adelanta la línea más independiente y la que baja la barrera a perfiles de gestión; coste: la maquinaria de diagnóstico arranca un puesto después y convergencia llega más tarde.

## Decisión

Alternativa A, elegida por el usuario sin ajustes: brechas clasificadas → convergencia plan↔requisitos → validación de resultado → carril de baja fricción → validación externa continuada → comprensión y enseñanza.

## Límites de la decisión

Las líneas comparadas son candidatas de dirección —ideas persistidas y líneas del roadmap—, no trabajo materializado: las estimaciones descansan en los enunciados de las ideas y pueden moverse cuando cada línea se planifique. «Validación externa» es una práctica continua más que una línea con entrega: su puesto marca cuándo se retoma con foco, no una espera bloqueante. La confianza media de convergencia y de validación de resultado refleja sus dependencias —la primera requiere brechas entregada; la segunda, trazabilidad problema→entrega y hoy solo señal interna—. Conviene revisitar si entra demanda externa nueva o si el diagnóstico de brechas revela un coste distinto al estimado.

## Confirmaciones
