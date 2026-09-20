# Construir capacidad de propuesta de forma de solución

## Estado

[x] Completada

## Objetivo

Construir la capacidad que, dado un problema formulado, determina la forma que tomaría la solución a alto nivel dentro del contexto del producto, sin entrar en detalles de implementación. Es la segunda fase del flujo 1.

## Dependencias

- 035 (Registrar decisiones de diseño del flujo 1)

## Entrada

- Problema + oportunidad, salida de la capacidad de descubrimiento.
- Investigación 032 en `docs/research/2026-09-flujo-1-propuesta-borradores.md`.
- Decisiones de diseño D012-D015.

## Resultado esperado

- Un skill que categoriza la forma de solución (cambio de UX, cambio de UI, flujo nuevo, paso nuevo en un flujo existente o fuera de alcance).
- Lista al menos dos alternativas consideradas con las razones de su rechazo.
- Define el fuera de alcance de forma explícita.
- Valida con el usuario que la forma de solución es la correcta.
- Produce como salida: forma de solución + alternativas + fuera de alcance.

## Criterios de calidad

- La forma de solución se expresa a alto nivel, sin detalles de implementación.
- Documenta al menos dos alternativas con las razones de su rechazo.
- El fuera de alcance lista explícitamente lo que podría asumirse dentro del alcance.
- Incluye una puerta de validación interactiva con el usuario.
- Sigue el estándar de skills del proyecto.
- Pasa revisión técnica por subagente independiente.

## Procedimiento sugerido

1. Definir el nombre y la estructura del skill.
2. Escribir el `SKILL.md` con el procedimiento de propuesta de forma de solución.
3. Validar la separación what/how con un ejemplo.
4. Someter a revisión dual.

## Notas

- La investigación 032 describe el resultado que la capacidad debe producir, no cómo se implementa ni cómo se nombra el skill.

## Revisión

- Subagente: 2026-09-20 — Aprueba tras cambios menores
- Usuario: 2026-09-20 — Aprueba
