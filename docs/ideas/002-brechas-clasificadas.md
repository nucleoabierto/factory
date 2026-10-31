# Brechas clasificadas: distinguir el detalle técnico de la capacidad ausente

> **Tipo:** idea de funcionalidad — tamaño conjunto (complejidad media)
> **Fecha:** 2026-10
> **Requiere:** ninguna — produce la clasificación que `convergencia-plan-requisitos` reutiliza al devolver trabajo al diagnóstico
> **Procesada en:** docs/proposals/005-brechas-clasificadas/

## Problema

Cuando el trabajo planeado no conecta con el código, la evaluación dice cuánto falta pero no de qué naturaleza es lo que falta: un detalle de implementación que un ajuste local resuelve y una capacidad que el proyecto no tiene reciben la misma etiqueta. La consecuencia ya observada es la improvisación —trabajo puente creado al vuelo para subsanar lo que el veredicto no distinguió— y bloqueos sin trazabilidad hacia la demanda que los causó.

Afecta a quien planea y a quien decide: la brecha se trata siempre como un problema de ejecución aunque a veces sea una señal de producto —algo que falta y merecería competir por prioridad—. Ocurre cada vez que una pieza resulta parcialmente o nada conectada, y el coste es retrabajo más decisiones de producto tomadas de tapadillo dentro de la ejecución.

## Qué desbloquea

- **Dos vías según la naturaleza de la brecha:** el detalle técnico se resuelve en su carril y la capacidad ausente vuelve a la demanda con trazabilidad.
- **Bloqueo honesto:** la pieza que no puede ejecutarse queda bloqueada con su causa declarada, no forzada.
- **Insumo para priorizar:** cada brecha clasificada deja constancia del coste y la confianza de la línea afectada.

## Flujos de trabajo que se hacen viables

- Una pieza desconectada deja de improvisar puentes: su brecha sale clasificada y enrutada.
- Una brecha de capacidad genera demanda nueva que compite en el trabajo pendiente, con la pieza original bloqueada y trazable.
- Quien revisa una planeación ve de un vistazo si el freno es un detalle o una ausencia.

## Ventajas como producto

- **Diagnóstico reutilizable:** la clasificación es la maquinaria que consumen `convergencia-plan-requisitos` —para devolver trabajo al diagnóstico— y `carril-de-baja-friccion` —para decidir qué es trivial—.
- **Señal de producto desde la ejecución:** el código que no conecta deja de ser solo un problema técnico y pasa a alimentar la demanda.

## Tensión que introduce en el roadmap

Segunda de las cinco ideas del mismo origen; comparte origen con `priorizacion-declarada`, `convergencia-plan-requisitos`, `carril-de-baja-friccion` y `validacion-de-resultado`. Va tras `priorizacion-declarada` porque sus salidas —coste y confianza por línea— alimentan el criterio de ordenación, y antes que `convergencia-plan-requisitos`, que reutiliza su clasificación.
