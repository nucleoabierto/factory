# Paso 0 de recolección de contexto en el sub-flujo de desarrollo

## Estado

[ ] Pendiente | [ ] En progreso | [ ] En revisión | [x] Completada | [ ] Bloqueada

## Tipo

mantenimiento

## Objetivo

Añadir al sub-flujo de desarrollo una fase previa a `planear-implementacion` que recoja el contexto necesario para planear y ejecutar con coherencia: archivos hermanos o de funcionalidad similar, patrones vigentes del codebase, lecciones aprendidas aplicables y decisiones de diseño relevantes. El contexto queda registrado en el archivo de la tarea para que la planeación y la ejecución partan de él.

## Dependencias

- 089

## Entrada

- `desarrollo`, `planear-implementacion` y `ejecutar-implementacion` en su estado actual.
- `consultar-lecciones` y `consultar-decisiones` (tarea 089) como capacidades de recuperación.
- La fase «Entender el subsistema» de `planear-implementacion`, que hoy cubre parcialmente esta función.

## Resultado esperado

- Una capacidad de recolección de contexto —skill propio (p. ej. `recopilar-contexto`) o fase acotada— que produce una sección `## Contexto` (o equivalente) en el archivo de la tarea con: archivos similares identificados, patrones a seguir, lecciones y decisiones aplicables.
- `desarrollo` invoca esa capacidad como paso 0, antes de decidir si hace falta planear.
- `planear-implementacion` consume el contexto registrado en lugar de repetir la exploración desde cero; su fase «Entender el subsistema» se ajusta para apoyarse en él.
- La decisión entre skill propio y fase acotada queda documentada en Notas o, si es estructural, registrada con `decisiones-diseno`.

## Criterios de calidad

- El contexto recopilado incluye las cuatro fuentes: archivos similares, patrones del codebase, lecciones y decisiones.
- La sección resultante vive en el archivo de la tarea, coherente con «un solo artefacto por tarea».
- `planear-implementacion` no duplica el trabajo de exploración: lee el contexto y lo enriquece solo si detecta vacíos.
- El sub-flujo conserva sus puertas humanas y su carácter acotado.

## Procedimiento sugerido

1. Revisar qué parte de «Entender el subsistema» de `planear-implementacion` se traslada a la recolección de contexto y qué queda en la planeación.
2. Decidir skill propio vs. fase; redactar la capacidad.
3. Actualizar `desarrollo` (paso 0) y `planear-implementacion` (consumo del contexto).
4. Aplicar revisión de redacción y pulido mecánico en modo preventivo.

## Notas

- Inspirado en `generar-brief-contexto` del proyecto hermano `../factory`, adaptado a la simplicidad de este proyecto.
- Se optó por un skill propio (`recopilar-contexto`) frente a una fase acotada dentro de `desarrollo`: la recolección es una capacidad con entradas y salida propias —la sección `## Contexto`—, invocable también fuera del sub-flujo y reutilizable por `planear-implementacion` cuando se llama directamente; una fase interna la escondería dentro del orquestador y duplicaría su invocación. Sigue el patrón orquestador/especialistas ya aplicado en el sub-flujo.

## Revisión

- Subagente: 2026-09-26 — Aprueba
- Usuario: 2026-09-26 — Aprueba
