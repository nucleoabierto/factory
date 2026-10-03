# Decidir el modelo de estado del dominio

## Estado

[x] Completada

## Tipo

investigación

## Objetivo

Decidir y registrar cómo se representa el estado del dominio en React —estado local con reducers, store externa u otra opción— sopesando el coste que cada opción impone a la persistencia local de esta épica y a las fronteras futuras: backend (idea 003) y sincronización (idea 005).

## Dependencias

- Ninguna.

## Entrada

- La pila fijada en la decisión D001 (React + TypeScript estricto + Vitest).
- La tensión declarada por la idea: esta elección condiciona el coste de `003-backend-persistencia` y de `005-offline-sincronizacion`; una elección ingenua se paga dos veces.
- Las operaciones del dominio que la spec TodoMVC exige: colección de tareas con mutaciones frecuentes, edición transitoria que no se persiste y filtro de vista que sí se persiste entre recargas.

## Resultado esperado

- Un documento de investigación en `docs/research/` comparando las opciones representativas del modelo de estado para este dominio.
- Una decisión registrada en `docs/decisions/D002-*.md` con la opción elegida, su justificación y sus consecuencias.

## Criterios de calidad

- Comparación de al menos tres opciones reales del ecosistema React con criterios declarados: idiomaticidad, superficie de prueba con Vitest, coste de evolucionar hacia backend y sincronización, dependencias nuevas.
- La decisión queda registrada como decisión de diseño del subproyecto, al igual que D001.
- Las referencias del documento son verificables.

## Procedimiento sugerido

1. Recopilar las restricciones del dominio (mutaciones, persistencia local, filtro de vista, edición transitoria) y las tensiones con las ideas 003 y 005.
2. Investigar las opciones del ecosistema React con evidencia (estado nativo con `useReducer`, stores externas ligeras y completas, modelos de server state si aplican).
3. Sintetizar el documento de investigación y registrar la decisión en `docs/decisions/`.

## Revisión

- Subagente: 2026-10-03 — Aprueba
- Usuario: 2026-10-03 — Aprueba
