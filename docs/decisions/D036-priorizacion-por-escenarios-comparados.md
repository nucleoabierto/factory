# D036: Priorización por escenarios comparados

## Estado

Aceptada

## Contexto

El orden de las líneas de trabajo sigue el orden de inserción: `planificar-roadmap` posiciona con criterio cualitativo y la prioridad no se revisita cuando la información mejora —al cerrar un conjunto o al incorporar demanda—. La investigación `2026-10-metodos-priorizacion-lineas` comparó los métodos de priorización objetiva aplicables sin datos de mercado y recomendó la comparación relativa tipo WSJF adaptada con confianza e incertidumbre explícitas y justificación por decisión.

## Decisión

La comparación de líneas vive en un skill invocable propio, `priorizar-lineas`: capacidad independiente que los consumidores —la planeación de dirección y los disparadores de revisita— comparten sin replicarla, y que el usuario puede invocar bajo demanda. El modelo compara cada línea sobre cuatro atributos estimados relativamente entre las abiertas —valor, criticidad temporal, habilitación/riesgo y tamaño—, con confianza en escala cerrada (alta/media/baja) y factores de incertidumbre por línea; confianza baja o tres o más factores escalan el punto a revisión explícita. La salida son siempre dos o más planificaciones alternativas con implicaciones en beneficios y costes —nunca un único veredicto— sobre las que el usuario elige y pule antes de confirmar la aplicación; el rechazo o el aplazamiento también quedan registrados. Cada revisita se persiste como escenario en `docs/priorizaciones/NNN-slug.md`, serie numerada propia, con disparador, norte, comparación, alternativas, decisión y límites.

## Justificación

La capacidad separada del consumidor responde a la guía de la épica: la misma lógica sirve a la planeación, a los disparadores y a la llamada directa, y un paso privado de `planificar-roadmap` obligaría a replicarla en los disparadores. La estimación relativa descarta los métodos que exigen datos ausentes —*Reach* de RICE, el coste de demora en unidades— y las alternativas con implicaciones reemplazan el *score* único: el usuario decide entre órdenes cuyas consecuencias ve, no valida un cálculo opaco. La persistencia del escenario —en lugar de solo el orden resultante— mantiene auditable la decisión cuando cambian las condiciones, y el directorio propio separa estas decisiones de producto del registro de decisiones de diseño, que registra otro tipo de objeto. La doble puerta —elección entre alternativas y confirmación de aplicación— conserva el principio de que ningún orden se aplica sin el humano.

## Referencias

- `docs/tasks/142-capacidad-escenarios-priorizacion.md` — tarea que consolida la decisión.
- `docs/epics/005-priorizacion-declarada.md` — épica que la enmarca.
- `docs/research/2026-10-metodos-priorizacion-lineas.md` — la investigación que fundamenta el modelo.
- `.agents/skills/priorizar-lineas/SKILL.md` — el skill que la materializa.
