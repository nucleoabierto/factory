# Escenario de priorización — gestión a nivel de producto, revisita tras brechas clasificadas

- **Disparador:** planeación de dirección
- **Norte:** gestión a nivel de producto — ayudar a las personas a gestionar el desarrollo del producto desde el producto, no desde el código (confirmado por el usuario, igual que en el escenario 001)
- **Fecha:** 2026-11-06

## Comparación

- Convergencia plan↔requisitos (docs/ideas/003-convergencia-plan-requisitos.md)
  - Valor: alta — los requisitos declarados mandan sobre la ejecución; es el núcleo de gestionar producto.
  - Criticidad temporal: media — su valor crece con cada conjunto que declare requisitos.
  - Habilitación/riesgo: media — ya no espera a brechas clasificadas, pero aún no abre camino a otras líneas.
  - Tamaño: media.
  - Confianza: media (habilitación/riesgo) — la adopción de declarar requisitos no está verificada.
  - Factores de incertidumbre: adopción de la práctica de declarar requisitos; qué conjuntos declaran comportamiento de producto.
- Validación de resultado (docs/ideas/005-validacion-de-resultado.md)
  - Valor: alta — cierra el lazo problema declarado → efecto entregado; es la línea más de producto del conjunto.
  - Criticidad temporal: baja — sin usuarios externos su señal es interna; crece cuando llegue la captura de demanda.
  - Habilitación/riesgo: media — se apoya en la trazabilidad que convergencia y brechas consolidan.
  - Tamaño: media.
  - Confianza: media (valor) — la evidencia es la más débil del conjunto, como declara la propia idea.
  - Factores de incertidumbre: señal interna débil; trazabilidad problema→entrega parcial.
- Carril de baja fricción (docs/ideas/004-carril-de-baja-friccion.md)
  - Valor: alta con el norte — permite a perfiles de gestión aportar sin el ciclo completo. Desde 001 aparece un solapamiento parcial con el carril técnico ligero entregado (tarea 150), que resuelve detalles de implementación, no aportes de perfiles de gestión.
  - Criticidad temporal: media — los cambios pequeños se acumulan o se cuelan sin registro, pero el daño es gradual.
  - Habilitación/riesgo: media — reserva la revisión humana para lo que la merece.
  - Tamaño: media.
  - Confianza: media (valor), por el solapamiento con el carril técnico ligero.
  - Factores de incertidumbre: el umbral de «trivial» puede costar de definir; alcance exacto del solapamiento con el carril técnico ligero.
- Validación externa continuada (modern-todo-app)
  - Valor: media — no añade capacidad; ejercita la existente y alimenta lecciones.
  - Criticidad temporal: baja — práctica permanente; nada decae.
  - Habilitación/riesgo: media — ejercitaría la maquinaria nueva sobre toolchain real.
  - Tamaño: pequeña — continua, sin entrega.
  - Confianza: alta.
  - Factores de incertidumbre: ninguno.
- Comprensión y enseñanza
  - Valor: media con este norte — hace la revisión humana informada, pero es transversal, no específica de producto.
  - Criticidad temporal: baja.
  - Habilitación/riesgo: media — refuerza todas las puertas.
  - Tamaño: grande — módulo transversal con alcance difuso.
  - Confianza: media (tamaño) — alcance sin acotar.
  - Factores de incertidumbre: alcance sin definir; esfuerzo transversal difícil de estimar.

## Alternativas

### A — Norte y habilitación

convergencia → validación de resultado → carril → validación externa → comprensión — implicaciones: construye primero el núcleo de gestión (verificar la cobertura del plan, comprobar el resultado); acepta que el alivio de fricción espera detrás de dos conjuntos y que la práctica externa y la comprensión van últimas. Es el orden del escenario 001 sin el paso de brechas, ya entregado.

### B — Alivio temprano

carril → convergencia → validación de resultado → comprensión → validación externa — implicaciones: adelanta la línea que baja la barrera a perfiles de gestión; coste: convergencia llega un puesto más tarde, mientras sus requisitos sin verificar siguen acumulándose, y el solapamiento con el carril técnico ligero debe aclararse antes de arrancar el carril.

## Decisión

Alternativa A, elegida por el usuario sin ajustes: convergencia plan↔requisitos → validación de resultado → carril de baja fricción → validación externa continuada → comprensión y enseñanza.

## Límites de la decisión

Las líneas comparadas siguen siendo candidatas de dirección —ideas persistidas y líneas del roadmap—, no trabajo materializado. La estimación del carril de baja fricción depende de aclarar su solapamiento con el carril técnico ligero: si el solapamiento resulta total, la línea sale de la comparación; si resulta parcial, su valor se reduce al terreno de perfiles de gestión. Convergencia y validación de resultado mantienen confianza media por la adopción no verificada y la señal interna débil. Conviene revisitar si entra demanda externa, si el carril de baja fricción se redefine tras aclarar el solapamiento, o si la práctica de declarar requisitos se verifica en un conjunto real.
