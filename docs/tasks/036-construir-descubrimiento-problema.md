# Construir capacidad de descubrimiento del problema

## Estado

[x] Completada

## Objetivo

Construir la capacidad que transforma una idea suelta en un problema formulado con su oportunidad de mejora, sin proponer solución. Es la primera fase del flujo 1 (idea → tarea).

## Dependencias

- 035 (Registrar decisiones de diseño del flujo 1)

## Entrada

- Una idea suelta del usuario o descubierta durante la ejecución de otra tarea.
- Investigación 032 en `docs/research/2026-09-flujo-1-propuesta-borradores.md`.
- Decisiones de diseño D012-D015.

## Resultado esperado

- Un skill que dialoga con el usuario, de forma interactiva, para identificar qué problema representa la idea.
- Evalúa si el problema es real, si supera las alternativas existentes y qué beneficio aporta resolverlo.
- Formula el problema y la oportunidad sin lenguaje de solución.
- Valida con el usuario que el problema está correctamente enmarcado.
- Produce como salida: problema + oportunidad.

## Criterios de calidad

- El enunciado del problema no contiene lenguaje de solución.
- Evalúa explícitamente si el problema es real y qué alternativas supera.
- Incluye una puerta de validación interactiva con el usuario.
- Sigue el estándar de skills del proyecto (autocontenidos, división progresiva con `references/`).
- Pasa revisión técnica por subagente independiente.

## Procedimiento sugerido

1. Definir el nombre y la estructura del skill.
2. Escribir el `SKILL.md` con el procedimiento de descubrimiento.
3. Validar el enunciado libre de lenguaje de solución con un ejemplo.
4. Someter a revisión dual.

## Notas

- La investigación 032 describe el resultado que la capacidad debe producir, no cómo se implementa ni cómo se nombra el skill. La decisión sobre el nombre se toma durante la ejecución.

## Revisión

- Subagente: 2026-09-20 — Aprueba
- Usuario: 2026-09-20 — Aprueba
