# Carril técnico ligero para el detalle de implementación

## Estado

[ ] Pendiente

## Tipo

desarrollo

## Objetivo

Dar a la brecha clasificada como detalle de implementación una vía propia dentro del flujo de desarrollo: la restricción se declara, las alternativas se listan y la decisión queda documentada en la tarea, sin que el detalle monte el ciclo completo ni se resuelva de tapadillo.

## Dependencias

- 148
- 149

## Entrada

- El modelo de clasificación del borrador 01 y la forma del veredicto enrutado del borrador 02.
- El subflujo de desarrollo que consume el veredicto (`desarrollar-tarea` y su cadena).

## Resultado esperado

- Cuando el veredicto declara una brecha «detalle de implementación», el flujo de desarrollo la resuelve en el carril ligero: restricción declarada, alternativas consideradas, decisión documentada en el archivo de la tarea.
- La pieza no queda bloqueada ni genera demanda: su resolución es local.

## Criterios de calidad

- El carril no invoca el ciclo completo de idea a tarea ni una tarea nueva: es un mecanismo dentro del trabajo en curso.
- Toda decisión del carril queda registrada en la tarea con su restricción, sus alternativas y la elección —la improvisación deja de ser invisible.
- El carril distingue su límite: si al resolverlo el detalle resulta ser una ausencia, la brecha se reclasifica y toma la otra vía.

## Procedimiento sugerido

1. Leer el subflujo de desarrollo (`desarrollar-tarea`, `ejecutar-implementacion`) y localizar dónde consume el veredicto de conectividad.
2. Definir el carril ligero: la forma de la restricción, de las alternativas y del registro en la tarea —una sección del archivo existente, no un artefacto nuevo, salvo que el detalle lo justifique—.
3. Cablear el consumo: el veredicto «detalle» entra al carril; declarar la reclasificación cuando el detalle se revela ausencia.
4. Revisión de redacción preventiva sobre los cambios.

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario (ejecución): [fecha] — [Aprueba | Solicita cambios]
- Usuario (cierre): [fecha] — [Aprueba | Solicita cambios]
