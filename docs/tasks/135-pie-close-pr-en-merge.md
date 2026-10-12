# Pie «Closes #N» en el commit de merge del PR

## Estado

[ ] Pendiente | [~] En progreso | [r] En revisión | **[x] Completada** | [!] Bloqueada

## Tipo

mantenimiento

## Objetivo

El merge squash del pull request produce un commit con mensaje personalizado —asunto del título y cuerpo redactado— pero pierde la referencia al número del PR, útil para remontar del commit a su revisión. Declarar en `gestionar-pr` que el cuerpo del mensaje termina con el pie `Closes #<n>`.

## Dependencias

- Ninguna

## Entrada

- `.agents/skills/gestionar-pr/SKILL.md`, procedimiento de Cierre, paso del merge.

## Resultado esperado

- El paso del merge declara que el cuerpo del commit termina con `Closes #<número del PR>`.

## Criterios de calidad

- La instrucción queda en el paso de merge del procedimiento de Cierre.
- El formato del pie es el que GitHub vincula (`Closes #N`).

## Procedimiento sugerido

1. Editar el paso 3 del procedimiento de Cierre de `gestionar-pr`.
2. Verificar la redacción.

## Notas

- Se declara como nota en el paso, sin cambiar la estructura del procedimiento.

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario (ejecución): 2026-10-12 — Aprueba
- Usuario (cierre): 2026-10-12 — Aprueba
