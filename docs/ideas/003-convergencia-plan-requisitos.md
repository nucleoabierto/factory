# Convergencia plan↔requisitos: verificar antes de ejecutar que el plan cubre lo declarado

> **Tipo:** idea de funcionalidad — tamaño conjunto (complejidad media)
> **Fecha:** 2026-10
> **Orden sugerido:** 3 de 5 — asume la clasificación de `brechas-clasificadas` para devolver trabajo al diagnóstico

## Problema

Los requisitos de un conjunto se declaran antes de planear, con sus casos de uso y su comportamiento esperado, pero entre esa declaración y la ejecución no hay verificación: nada comprueba que el plan de cada pieza cubre lo declarado ni que el detalle de los requisitos no esconde bloqueos. La divergencia se descubre ejecutando —aparece registrada como desviación— y el requisito se corrige a posteriori, cuando el coste ya se pagó.

Afecta a quien ejecuta —trabaja sobre un plan que puede ignorar parte de lo pedido— y a quien declara —sus requisitos no tienen garantía de cobertura—. Ocurre en cada conjunto con comportamiento de producto, y el coste es retrabajo más una declaración que persigue la ejecución en lugar de guiarla.

## Qué desbloquea

- **Detección temprana:** las lagunas del plan respecto a lo declarado salen antes de ejecutar, no como desviación.
- **Vuelta al diagnóstico:** un bloqueo escondido en el detalle devuelve el trabajo a la evaluación de brechas en lugar de empujarlo hacia delante.
- **Requisitos que mandan:** la declaración guía la ejecución en lugar de perseguirla.

## Flujos de trabajo que se hacen viables

- Al terminar de planear una pieza de un conjunto con requisitos, la cobertura queda verificada caso a caso antes de escribir código.
- Un caso de uso sin pieza que lo cubra se eleva como laguna en su momento, no al cerrar.
- Un bloqueo descubierto en el detalle de un requisito vuelve al diagnóstico con la pieza marcada, no se resuelve en silencio.

## Ventajas como producto

- **Puerta de convergencia:** completa el par declaro→verifico→ejecuto, simétrico a la revisión técnica que ya verifica el resultado.
- **Confianza en la declaración:** quien escribe requisitos sabe que se verificarán, lo que hace que declararlos bien importe.

## Tensión que introduce en el roadmap

Tercera de las cinco ideas del mismo origen; comparte origen con `priorizacion-declarada`, `brechas-clasificadas`, `carril-de-baja-friccion` y `validacion-de-resultado`. Depende de `brechas-clasificadas` —su vuelta al diagnóstico reutiliza la clasificación— y solo aplica a conjuntos que declaran comportamiento, así que su valor crece con cada conjunto nuevo.
