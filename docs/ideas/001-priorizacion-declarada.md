# Priorización declarada: ordenar el trabajo con criterio explícito

> **Tipo:** idea de funcionalidad — tamaño conjunto (complejidad media)
> **Fecha:** 2026-10
> **Orden sugerido:** 1 de 5 — es la etapa más temprana del embudo; una vez construida, el propio sistema la usa para ordenar a sus hermanas
> **Procesada en:** docs/proposals/004-priorizacion-declarada/

## Problema

Cuando varias líneas de trabajo compiten por el siguiente hueco, el orden se decide con criterio cualitativo que queda en la cabeza de quien decide. La dirección guarda la justificación como prosa, pero no hay atributos comparables entre líneas —valor, confianza, esfuerzo— ni una forma declarada de pesarlos. La decisión se toma, pero no se puede revisar, delegar ni repetir.

Afecta a quien dirige el producto —un perfil de gestión que quiera apoyar no tiene con qué comparar— y al propio sistema, que no puede razonar sobre prioridad más allá de la intuición del momento. Ocurre cada vez que se abre una línea nueva o se agota una comprometida, y el coste es una priorización opaca, decisiones que no se aprenden y un trabajo pendiente que se ordena por lo que se mencionó más recientemente, no por lo que conviene.

## Qué desbloquea

- **Decisión comparable:** cada línea declara los mismos atributos y el orden se justifica sobre ellos, no sobre prosa.
- **Delegación:** el agente puede proponer un orden fundamentado que el usuario solo valida.
- **Aprendizaje de decisiones:** revisitar por qué se priorizó algo es posible porque el criterio quedó escrito.

## Flujos de trabajo que se hacen viables

- Quien revisa la dirección entiende por qué una línea está en un horizonte y otra en el siguiente sin tener que preguntar.
- Al incorporar una demanda nueva, esta se posiciona contra las existentes sobre los mismos ejes.
- Una política de capacidad —cuánto trabajo de cada tipo cabe en el horizonte comprometido— se apoya en el mismo criterio.

## Ventajas como producto

- **Postura de gestor:** convierte al sistema en quien propone un orden con razones, no solo en quien ejecuta lo ya ordenado.
- **Base para las hermanas:** las estimaciones de coste y confianza que produce son el insumo natural de `brechas-clasificadas` y `validacion-de-resultado`.

## Tensión que introduce en el roadmap

Primera de las cinco ideas nacidas de la línea de gestión de producto; comparte origen con `brechas-clasificadas`, `convergencia-plan-requisitos`, `carril-de-baja-friccion` y `validacion-de-resultado`. Va primera porque su salida —atributos comparables por línea— ordena el resto; solo compite por la cabeza con `carril-de-baja-friccion`, si se prefiriera alivio temprano.
