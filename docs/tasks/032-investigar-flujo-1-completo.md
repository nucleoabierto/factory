# Investigar el flujo 1 completo

## Estado

[ ] Pendiente | [~] En progreso | [r] En revisión | [x] Completada | [!] Bloqueada

## Objetivo

Investigar el flujo 1 (idea → tarea) completo, especificando el formato de la propuesta, el mecanismo de borradores para trabajo asíncrono, el procedimiento de cada capacidad (descubrimiento del problema, propuesta de forma de solución, refinamiento con borradores, orquestación) y los cambios necesarios en `crear-tareas`.

## Dependencias

- 031

## Entrada

- Investigación de la tarea 031 en `docs/research/2026-09-flujos-idea-tarea-ejecucion.md`.
- Skills existentes en `.agents/skills/`, en particular `crear-tareas` e `investigar`.
- Documento de visión y definición del proyecto.
- Decisiones de diseño en `docs/decisions/`.

## Resultado esperado

- Investigación en `docs/research/` que especifique:
  - El formato de la propuesta que produce el refinamiento (estructura, campos, cómo se incluyen los borradores de las tareas).
  - El mecanismo de borradores para trabajo asíncrono (estado en `TODO.txt`, ubicación de archivos, ciclo de vida del borrador: creación, revisión, promoción o descarte).
  - El procedimiento de cada capacidad del flujo 1: descubrimiento del problema, propuesta de forma de solución, refinamiento con borradores y orquestación.
  - Los cambios necesarios en `crear-tareas` para pasar de descomponer + crear a promocionar borradores aprobados.
  - Qué decisiones de diseño se deben registrar antes de construir las capacidades.

## Criterios de calidad

- Especifica el formato de la propuesta con suficiente detalle para guiar la implementación.
- Define el mecanismo de borradores: cómo se crean, dónde viven, cómo se promocionan o se descartan, y cómo se reflejan en `TODO.txt`.
- Describe el procedimiento de cada capacidad del flujo 1 sin predeterminar nombres de skills.
- Identifica los cambios concretos que necesita `crear-tareas` y qué se mantiene del comportamiento actual.
- Es coherente con el flujo asíncrono y el principio bootstrap.
- Usa el skill `investigar`.
- Pasa revisión de redacción y pulido mecánico.
- Pasa revisión técnica por subagente independiente.

## Procedimiento sugerido

1. Usar el skill `investigar` para definir el alcance: formato de propuesta, mecanismo de borradores, procedimiento de cada capacidad y cambios a `crear-tareas`.
2. Analizar el flujo 1 mapeado en la investigación de la tarea 031.
3. Diseñar el formato de la propuesta y el mecanismo de borradores.
4. Describir el procedimiento de cada capacidad.
5. Identificar los cambios necesarios en `crear-tareas`.
6. Documentar los hallazgos en `docs/research/`.
7. Aplicar revisión de redacción y pulido mecánico.
8. Presentar al usuario para aprobación.

## Notas

- La investigación de la tarea 031 describe capacidades por sus resultados, no por nombres de skills. Esta investigación debe mantener ese principio: describir el qué, no el cómo.
- El mecanismo de borradores es la novedad estructural más importante: hoy no existe ningún estado de borrador en el sistema.
- Los cambios a `crear-tareas` deben preservar la trazabilidad y el formato actual de las tareas definitivas.

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario: [fecha] — [Aprueba | Solicita cambios]
