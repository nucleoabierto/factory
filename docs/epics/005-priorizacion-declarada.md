# Priorización declarada de las líneas de trabajo

## Estado

[x] Planificada | [x] Completada

## Objetivo

Ordenar las líneas de trabajo deja de ser orden de inserción: la planeación de dirección produce escenarios de priorización con atributos declarados e implicaciones explícitas, validados por el usuario, y la revisita se dispara sola en los momentos informativos —cierre de conjunto e incorporación de demanda— además de bajo demanda.

## Alcance

- **Dentro:** la capacidad de comparación por escenarios —norte declarado, atributos relativos, confianza e incertidumbre, alternativas con implicaciones—; su integración como paso de la planeación de dirección; los disparadores de revisita en el cierre de conjunto y la incorporación de demanda; la invocación bajo demanda.
- **Fuera:** ordenación de tareas dentro de un conjunto; política de capacidad por tipo de trabajo; calibración de atributos con métricas de resultado; captura de demanda externa; reordenación sin puerta humana.

## Piezas

- [x] docs/tasks/142-capacidad-escenarios-priorizacion.md — Crear la capacidad de comparación por escenarios de las líneas
- [x] docs/tasks/143-paso-priorizacion-planeacion-direccion.md — Integrar la priorización como paso de la planeación de dirección
- [x] docs/tasks/144-disparadores-revisita-prioridad.md — Conectar los momentos informativos que disparan la revisita

## Plan técnico

Guía de arquitectura del conjunto: la comparación es una capacidad invocable de forma independiente —no una parte privada de la planeación—, de modo que el paso de la planeación de dirección, los disparadores y la llamada bajo demanda comparten la misma lógica sin replicarla. Los tres consumidores delegan las lecturas y escrituras mecánicas de los artefactos en los skills de utilidad, como el resto del sistema.

- **Orden:** 142 → 143 → 144, derivado de las dependencias: 143 integra la capacidad que 142 crea y 144 cablea los disparadores sobre ambas.
- **Dependencias:** 143 depende de 142; 144 depende de 142 y 143.
- **Decisiones transversales:**
  - El mecanismo de comparación es relativo tipo WSJF adaptado —atributos valor, criticidad temporal, habilitación/riesgo y tamaño estimados entre las líneas, nunca en unidades absolutas— con confianza en escala cerrada y factores de incertidumbre que escalan a revisión (docs/research/2026-10-metodos-priorizacion-lineas.md).
  - La salida son siempre dos o más alternativas con implicaciones en beneficios y costes; nunca un único veredicto.
  - El norte lo declara el usuario —uno o dos temas— y guía la alineación de todas las líneas.
  - Ningún orden se aplica sin puerta humana, y la decisión queda registrada con contexto, alternativas y límites.

## Criterio de cierre

Planificar la dirección produce un orden salido de escenarios decididos —no de inserción—, y al cerrar un conjunto o incorporar una demanda la revisita sale propuesta sin que nadie la invoque a mano.

## Revisión

- Usuario: 2026-10-25 — Aprueba
