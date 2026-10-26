# Validación de resultado: cerrar el lazo entre el problema declarado y lo entregado

> **Tipo:** idea de funcionalidad — tamaño conjunto (complejidad media)
> **Fecha:** 2026-10
> **Orden sugerido:** 5 de 5 — es la etapa final del pipeline y la de evidencia más débil hoy; cierra el lazo

## Problema

El flujo verifica que el trabajo se construyó —el conjunto comprueba su criterio de cierre, la revisión comprueba el cambio— pero nada revisita si el problema que lo motivó desapareció. El enunciado del problema viaja hasta la propuesta y ahí se queda: tras la integración, nadie pregunta si la situación descrita sigue ocurriendo. El ciclo se cierra sobre la construcción, no sobre el resultado.

Afecta a quien dirige el producto —no sabe si lo entregado resolvió lo que dolía— y al aprendizaje del sistema —las lecciones capturan correcciones de proceso, no aciertos ni fallos de resultado—. Ocurre al agotarse cada conjunto, y el coste es entregar sin saber si importó y priorizar a ciegas sobre problemas quizá ya resueltos.

## Qué desbloquea

- **Lazo de producto:** cada conjunto termina respondiendo si el problema declarado se resolvió.
- **Demanda informada:** el resultado de lo entregado alimenta la ordenación de lo pendiente.
- **Aprendizaje de producto:** además de cómo se trabajó, queda registrado qué efecto tuvo.

## Flujos de trabajo que se hacen viables

- Al cerrar un conjunto, el problema declarado en su propuesta se revisita y el resultado queda constancia —resuelto, parcial, sin efecto—.
- La ordenación de líneas futuras cuenta con el historial de resultados, no solo con la lista de lo construido.
- Cuando exista demanda externa, sus reportes se contrastan con resultados ya verificados.

## Ventajas como producto

- **Ciclo completo de gestión:** la gestión deja de terminar en la entrega y llega hasta el efecto.
- **Base para la demanda externa:** la etapa de feedback aparcada en la dirección encuentra aquí su consumidor natural.

## Tensión que introduce en el roadmap

Quinta y última de las ideas del mismo origen; comparte origen con `priorizacion-declarada`, `brechas-clasificadas`, `convergencia-plan-requisitos` y `carril-de-baja-friccion`. Va la última porque depende de la trazabilidad problema→entrega que el resto consolida, y porque sin usuarios externos su validación es hoy interna —la evidencia más débil del conjunto—. Si la captura de demanda externa aparcada en la dirección se activa, esta idea la consume.
