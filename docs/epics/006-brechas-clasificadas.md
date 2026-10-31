# Brechas clasificadas

## Estado

[x] Planificada | [ ] Completada

## Objetivo

Toda pieza desconectada sale de la evaluación con su naturaleza declarada y su destino enrutado —detalle de implementación al carril técnico ligero, capacidad ausente a la demanda con trazabilidad—, de modo que la improvisación deja de ser el tratamiento por defecto.

## Alcance

- **Dentro:** el modelo de clasificación con sus criterios; el punto de decisión en la evaluación de conectividad; el carril técnico ligero con su registro en la tarea; la vuelta a la demanda con idea derivada persistida y bloqueo con causa declarada.
- **Fuera:** la priorización de la idea derivada —maquinaria existente—; los consumidores de la clasificación de las líneas siguientes —convergencia plan↔requisitos, carril de baja fricción—; la reclasificación retroactiva de brechas ya resueltas; la ejecución automática del carril ligero.

## Piezas

- [ ] docs/tasks/148-modelo-clasificacion-brechas.md — Modelo de clasificación de brechas
- [ ] docs/tasks/149-clasificacion-en-evaluacion.md — Clasificación de brechas en la evaluación de conectividad
- [ ] docs/tasks/150-carril-tecnico-ligero.md — Carril técnico ligero para el detalle de implementación
- [ ] docs/tasks/151-vuelta-demanda-trazable.md — Vuelta a la demanda de la capacidad ausente

## Plan técnico

La épica introduce un punto de decisión en la evaluación de conectividad y dos vías de resolución según la naturaleza de la brecha. Las piezas comparten un único modelo de clasificación —fuente común de criterios y de la forma del veredicto enrutado— que el punto de decisión aplica y las vías consumen.

- **Orden:** 148 → 149 → 150 y 151, independientes entre sí una vez emitido el veredicto.
- **Dependencias:** 149 aplica el modelo de 148; 150 y 151 consumen el veredicto enrutado de 149.
- **Decisiones transversales:** la clasificación vive en un único documento de referencia compartido; la duda sobre la naturaleza de una brecha escala al usuario, nunca se adivina; la vuelta a la demanda produce demanda —una idea persistida—, no trabajo; el registro del carril ligero vive en el archivo de la tarea, no en un artefacto nuevo salvo justificación.

## Criterio de cierre

Una pieza declarada «detalle de implementación» se resuelve en el carril ligero con su decisión documentada en la tarea, y una declarada «capacidad ausente» produce una idea derivada con trazabilidad a la pieza que la reveló, que queda bloqueada con su causa declarada.

## Revisión

- Usuario: 2026-10-29 — Aprueba
