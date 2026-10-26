# PRD — Priorización declarada de las líneas de trabajo

El orden del trabajo pendiente sigue el orden de llegada y no se revisita cuando la información mejora —al cerrar un conjunto o al incorporar demanda—, así que el orden óptimo solo se descubre en retrospectiva. Este conjunto introduce la comparación objetiva de líneas con escenarios alternativos que el usuario decide, para que la prioridad sea una decisión revisable y repetible.

## Usuarios

Quien dirige el producto con el sistema —un perfil de gestión o un desarrollador que decide qué se construye después— y el agente que propone el orden.

## Casos de uso

- **CU-1 — Priorizar en la planeación de dirección:** al planear la dirección, el usuario declara uno o dos temas-norte; el sistema compara las líneas abiertas y presenta dos o más planificaciones alternativas con sus implicaciones; el usuario elige una, la pule si quiere, y el orden queda reflejado con su justificación.
  - Variante: el usuario rechaza las alternativas y el orden queda como estaba, con la revisita registrada.
- **CU-2 — Revisita al cerrar un conjunto:** al agotarse una agrupación, el sistema propone revisitar el orden con la información recién ganada —coste real y sinergias—; el usuario decide reordenar o mantener.
  - Borde: posponer la revisita queda registrado, no silenciado.
- **CU-3 — Revisita al incorporar demanda:** una línea nueva que entra a la dirección se compara contra las abiertas en lugar de caer al final de la cola.
  - Borde: si la línea llega fuera de la planeación —una propuesta promovida, una idea procesada—, la comparación sale propuesta en ese punto.
- **CU-4 — Revisita bajo demanda:** el usuario invoca la comparación fuera de los momentos informativos y recorre el mismo flujo de escenarios.

## Comportamiento esperado

- **Comparación:** toda línea abierta se puntúa sobre los mismos atributos declarados, estimados relativamente entre líneas —nunca en unidades absolutas— con confianza e incertidumbre explícitas.
- **Alternativas:** la salida son siempre al menos dos planificaciones con implicaciones en beneficios y costes; nunca un único orden.
- **Norte:** la directriz que declara el usuario guía la alineación de todas las líneas, no solo la cabeza del orden.
- **Puerta:** ningún orden se aplica sin validación humana; la decisión queda registrada con contexto, alternativas y límites.
- **Disparadores:** el cierre de conjunto y la incorporación de demanda proponen la revisita sin bloquear su propio flujo; el aplazamiento queda constancia.

## Criterios de éxito

- Planear la dirección produce órdenes justificados por atributos comparables y revisables después.
- Los dos momentos informativos disparan la revisita por su cuenta.
- El usuario decide entre alternativas con implicaciones, no valida cálculos opacos.

## Fuera de alcance

- La ordenación de piezas dentro de un conjunto.
- La política de capacidad por tipo de trabajo.
- La calibración de atributos con métricas de resultado —corresponde a la idea hermana `validacion-de-resultado`—.
- La demanda externa como entrada de los atributos.
