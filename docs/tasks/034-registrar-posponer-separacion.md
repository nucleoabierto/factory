# Registrar decisión de posponer separación de ejecutar-tareas

## Estado

[ ] Pendiente | [~] En progreso | [r] En revisión | [x] Completada | [!] Bloqueada

## Objetivo

Registrar una decisión de diseño (ADR) que documente que la separación de `ejecutar-tareas` en un skill de orquestación de desarrollo se evaluó y se pospone hasta que existan los flujos de gestión a nivel de código, con la justificación de la investigación 033.

## Dependencias

- Ninguna

## Entrada

- Investigación 033 en `docs/research/2026-09-separacion-ejecutar-tareas.md`.
- Decisiones de diseño existentes en `docs/decisions/`.
- Skill `decisiones-diseno`.

## Resultado esperado

- Un ADR en `docs/decisions/D011-posponer-separacion-ejecutar-tareas.md` con el formato híbrido del proyecto, que registre la decisión de posponer, su contexto y su justificación.

## Criterios de calidad

- Sigue el formato de decisiones de diseño del proyecto.
- Cita la investigación 033 como evidencia.
- Declara la señal para reabrir la decisión (construcción de los flujos de gestión a nivel de código).
- Pasa revisión técnica por subagente independiente.

## Procedimiento sugerido

1. Usar el skill `decisiones-diseno` para registrar la decisión.
2. Referenciar la investigación 033 como justificación.
3. Declarar explícitamente la condición para reabrir la decisión.
4. Someter a revisión dual.

## Notas

- Esta decisión es de bajo coste de registro pero alta trazabilidad: deja constancia de que la separación se evaluó con evidencia y se pospuso deliberadamente, no por omisión.

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario: [fecha] — [Aprueba | Solicita cambios]
