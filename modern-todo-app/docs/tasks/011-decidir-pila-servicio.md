# Decidir la pila del servicio

## Estado

[ ] Pendiente

## Tipo

investigación

## Objetivo

Decidir y registrar la pila del lado servidor —framework, almacenamiento persistente y forma del contrato cliente-servidor— sopesando la coherencia con la pila existente (D001: TypeScript estricto, npm, Vitest) y el coste que cada opción impone a la sincronización futura (idea 005).

## Dependencias

- Ninguna.

## Entrada

- La pila del cliente fijada en la decisión D001.
- La tensión declarada por la idea: la decisión del almacenamiento y del contrato se paga cara si se improvisa; la sincronización (idea 005) construirá sobre esta elección.
- Las restricciones del proyecto: mismo repositorio, npm, TypeScript estricto, verificación por comando único con cobertura al 100%, ejecución solo en entorno local de desarrollo.

## Resultado esperado

- Un documento de investigación en `docs/research/` comparando las opciones representativas en cada dimensión: framework del servicio, almacenamiento y forma del contrato.
- Una decisión registrada en `docs/decisions/` con la pila elegida, su justificación y sus consecuencias.

## Criterios de calidad

- Comparación de al menos dos opciones reales por dimensión con criterios declarados: coherencia con TypeScript estricto y Vitest, madurez, superficie de prueba, coste de evolucionar hacia sincronización, dependencias nuevas.
- La decisión queda registrada como decisión de diseño del subproyecto, al igual que D001 y D002.
- Las referencias del documento son verificables.

## Procedimiento sugerido

1. Recopilar las restricciones (operaciones del ciclo de vida, validación en servidor, esquema migrable, contrato consumible por el cliente) y las tensiones con la idea 005.
2. Investigar las opciones del ecosistema con evidencia en cada dimensión.
3. Sintetizar el documento de investigación y registrar la decisión en `docs/decisions/`.

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario: [fecha] — [Aprueba | Solicita cambios]
