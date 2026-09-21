# Investigar todo apps como base de trabajo

## Estado

[ ] Pendiente

## Objetivo

Investigar las todo apps de referencia (TodoMVC y su especificación) para determinar la forma esperada de la prueba de concepto y tener una expectativa realista de lo que debe producir el flujo externo.

## Dependencias

- Ninguna

## Entrada

- Búsqueda básica ya realizada: TodoMVC (github.com/tastejs/todomvc) ofrece la misma todo app implementada de forma idéntica en la mayoría de frameworks JS, con especificación común (`app-spec.md`) y ejemplos vanilla JS/ES6; es el ejemplo de enseñanza estándar y núcleo del benchmark Speedometer.

## Resultado esperado

- Un documento en `docs/research/` con: los requisitos funcionales de la especificación TodoMVC, qué cubre y qué deja fuera la implementación vanilla, y una definición de la forma esperada de la prueba de concepto (qué debe producir el flujo externo para considerarse validado).

## Criterios de calidad

- El documento sigue el formato del skill `investigar` (conclusiones justificadas, referencias verificables, marca temporal).
- Las referencias apuntan a fuentes reales consultadas (TodoMVC, `app-spec.md`, ejemplos vanilla).
- La expectativa resultante es verificable: permite comprobar al final si la prueba de concepto la cumplió.
- Pasa revisión técnica por subagente independiente.

## Procedimiento sugerido

1. Invocar `investigar` con el tema «todo apps como base de trabajo para la prueba de concepto».
2. Someter a revisión dual.

## Notas

- Su salida alimenta la decisión 051: la forma esperada y la expectativa realista son insumos para decidir el alcance de la validación.

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario: [fecha] — [Aprueba | Solicita cambios]
