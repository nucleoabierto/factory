# Construir la capacidad de planeación

## Estado

[ ] Pendiente | [ ] En progreso | [ ] En revisión | [x] Completada | [ ] Bloqueada

## Objetivo

Construir la capacidad que produce la épica y el plan técnico de un conjunto de trabajo, siguiendo la decisión registrada, de modo que el paso de planeación exista en el flujo.

## Dependencias

- 056

## Entrada

- La decisión `DNNN` registrada por la tarea 056.
- Los skills existentes como referencia de estructura: `ejecutar-tareas`, `crear-tareas`, `refinar-propuesta` (orquestación, plantillas en `assets/`, detalle en `references/`).
- El estándar Agent Skills y las convenciones del proyecto (cuerpo por debajo de 500 líneas, español, `assets/` para plantillas).

## Resultado esperado

- Un skill nuevo (por ejemplo, `planificar`) en `.agents/skills/` que:
  - Reciba una intención de conjunto y el trabajo ya descompuesto (tareas existentes, propuestas aprobadas o ambas).
  - Produzca el documento de épica con objetivo, alcance, piezas y plan técnico, en la ubicación fijada por la decisión.
  - Cubra la planeación retroactiva: agrupar tareas ya creadas bajo una épica nueva.
  - Enlace la épica con la agrupación correspondiente del índice, según lo decidido.
  - Respete la puerta de revisión humana antes de considerar el conjunto planificado.
- Las referencias o plantillas que el skill necesite, en `assets/` o `references/`.

## Criterios de calidad

- El skill sigue la estructura de los existentes: cuándo usar, cuándo no, entrada, salida, principios, procedimiento, finalización y referencias.
- Una ejecución de la capacidad sobre tareas sueltas produce una épica completa sin editar a mano ningún artefacto.
- El índice de tareas sigue siendo la fuente de la ejecución; la épica aporta el contexto que el índice no contiene.
- El cuerpo del skill queda por debajo de 500 líneas y el detalle vive en `references/`.

## Procedimiento sugerido

1. Releer la decisión del borrador 02 y los skills de orquestación existentes.
2. Redactar el skill y sus plantillas iterando sección a sección.
3. Aplicar revisión de redacción y pulido mecánico preventivos antes de darlo por terminado.
4. Verificar los criterios de calidad contra el resultado.

## Notas

- Si la decisión exige cambios en `ejecutar-tareas` o `crear-tareas` (por ejemplo, para que la ejecución consulte la épica del hito), incluirlos como parte de esta tarea o documentarlos como trabajo descubierto con `crear-tareas`.

## Revisión

- Subagente: 2026-09-21 — Aprueba
- Usuario: 2026-09-21 — Aprueba
