# Modelo de clasificación de brechas

## Tipo

desarrollo

## Objetivo

Definir el modelo que discrimina la naturaleza de una brecha —detalle de implementación frente a capacidad ausente— y la forma del veredicto enrutado que la evaluación de conectividad emite por cada pieza desconectada, de modo que los dos destinos (carril técnico ligero y vuelta a la demanda) consuman la misma clasificación.

## Dependencias

- Ninguna

## Entrada

- La propuesta `docs/proposals/005-brechas-clasificadas/propuesta.md` y la idea `docs/ideas/002-brechas-clasificadas.md`.
- El skill `evaluar-conectividad`: cómo declara hoy una pieza desconectada.
- Los precedentes del propio repositorio: trabajo puente creado al vuelo y bloqueos sin causa declarada.

## Resultado esperado

- Un documento de referencia del modelo —en el `references/` del consumidor que lo aplica— con las dos categorías, los criterios que las discriminan, la forma del veredicto por pieza y los casos límite declarados.

## Criterios de calidad

- Cada categoría tiene un criterio discriminatorio observable en la pieza, no una intuición del evaluador.
- La forma del veredicto declara por pieza desconectada su clase y su destino, en formato que los consumidores lean sin reinterpretar.
- Los casos límite están declarados —brecha mixta, brecha dudosa— con su comportamiento (la duda escala, no se adivina).
- El documento no prescribe la implementación de las dos vías: eso es de los borradores siguientes.

## Procedimiento sugerido

1. Leer `evaluar-conectividad` para situar dónde y cómo se declara hoy una pieza desconectada.
2. Buscar en el repositorio los precedentes de brecha mal tratada (trabajo puente, bloqueos sin causa) para anclar los criterios en evidencia propia.
3. Redactar el modelo: categorías, criterios, forma del veredicto, casos límite.
4. Revisión de redacción preventiva sobre el documento final.

## Notas

- La distinción decisiva que la idea declara: un detalle se resuelve con un ajuste local dentro de la pieza; una capacidad ausente exige algo que el proyecto no tiene y que merece competir por prioridad.
