# Investigar flujo de revisión de tareas

## Estado

[ ] Pendiente

## Objetivo

Investigar cómo añadir un paso de revisión antes de marcar una tarea como completada: quién revisa, qué criterios, cómo se refleja el estado de revisión en la plantilla y en `TODO.txt`.

## Dependencias

- Ninguna

## Entrada

- Plantilla `assets/task.txt` del skill `crear-tareas`.
- `TODO.txt` en su formato actual.
- Skills existentes como referencia de estilo.

## Resultado esperado

- Documento de investigación en `docs/research/` con análisis de opciones de flujo de revisión y una recomendación.

## Criterios de calidad

- Analiza quién revisa (el propio agente, el usuario, ambos).
- Analiza qué criterios disparan revisión (todas las tareas, solo cambios estructurales, solo a petición).
- Analiza cómo se refleja el estado de revisión en la plantilla y en `TODO.txt`.
- La recomendación es concreta: incluye los cambios a la plantilla y al formato de `TODO.txt`.
- Pasa revisión de redacción y pulido mecánico.

## Procedimiento sugerido

1. Examinar la plantilla actual y el flujo del skill `ejecutar-tareas`.
2. Investigar enfoques de flujo de revisión en sistemas de tareas.
3. Evaluar cada enfoque contra la simplicidad actual del sistema.
4. Proponer una recomendación con los cambios concretos.
5. Aplicar revisión de redacción y pulido mecánico.

## Notas

- El flujo de revisión no debe añadir burocracia innecesaria al ciclo de tareas.
