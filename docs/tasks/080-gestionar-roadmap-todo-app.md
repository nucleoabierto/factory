# Crear la gestión de roadmap para el motor externo y aplicarla a todo-app

## Estado

[ ] Pendiente | [ ] En progreso | [ ] En revisión | [ ] Completada | [ ] Bloqueada

## Tipo

desarrollo

## Objetivo

Dotar al motor externo del nivel por encima de la épica —decidir la forma que toma (artefacto, skill, orquestador o combinación) y construirla— y aplicarla de inmediato a todo-app, que hoy tiene tres líneas de trabajo abiertas sin orden ni dirección declarados: las épicas 002 (múltiples listas) y 003 (planificación temporal), el conjunto de exportación 020–022 sin épica que lo agrupe, y el refactor 015 (ES5→ES2024) cuyo orden respecto a las demás cambia el costo de todas.

## Dependencias

- Ninguna

## Entrada

- `docs/research/2026-09-siguientes-elementos-proyecto.md` — prioridad 3 (roadmap y releases) con patrones externos de referencia: roadmap en el repositorio como fuente única, backlogs git-native con jerarquía iniciativa → épica → feature.
- `todo-app/TODO.txt`, `todo-app/docs/epics/` y `todo-app/docs/tasks/` — estado actual: dos épicas planificadas e independientes entre sí, un conjunto de tareas (020–022) que forma una épica de facto sin agrupar, y una tarea de mantenimiento (015) que reescribe `app.js` completo.
- `.agents/skills/planificar/` — la capacidad de épica existente, nivel inmediatamente inferior al que se construye.
- `docs/definicion-proyecto.md` y `docs/vision-proyecto.md` — encaje con la trayectoria del motor externo.

## Resultado esperado

- La forma de la gestión de roadmap decidida y justificada (qué artefacto, cómo se relaciona con épicas y TODO.txt, si requiere skill u orquestador nuevo o extensión de uno existente).
- La capacidad construida: el roadmap como nivel que agrupa épicas y trabajo suelto, declara prioridad y orden, y da trazabilidad visión ↔ ejecución.
- Debe poder absorber trabajo existente sin épica, no solo ordenar épicas ya formadas — caso inmediato: 020–022.
- El roadmap de todo-app producido como primera aplicación: orden entre las tres líneas de trabajo y posición de 015 justificada por su impacto (primero como base moderna, último como pasada única, o la opción que resulte con su costo explicitado).

## Criterios de calidad

- La decisión de forma contrasta las alternativas de la investigación y declara por qué la elegida encaja con la simplicidad de Factory.
- El artefacto resultante vive en el repositorio del producto (todo-app), coherente con el patrón «roadmap en el repo» y con cómo viven hoy épicas y tareas.
- La ordenación de todo-app explicita el impacto del refactor 015 sobre las épicas: qué orden minimiza conflictos y doble trabajo, y por qué.
- Los cambios a skills existentes respetan sus convenciones de escritura actuales.

## Procedimiento sugerido

1. Decidir la forma de la solución a partir de la investigación y del estado de todo-app.
2. Construir la capacidad (artefacto y/o skill según la decisión).
3. Aplicarla a todo-app: agrupar 020–022, ordenar las líneas de trabajo y situar 015 con justificación.

## Notas

- Origen: recomendación prioridad 3 de la investigación de siguientes elementos; la fricción que el documento marcaba como ausente («con una sola épica el vacío no ha dolido») ya se manifestó: tres frentes abiertos y un refactor cuyo orden importa.
- Se descartó una tarea de investigación previa: la investigación ya cubrió los patrones externos; lo pendiente es diseño y construcción, no exploración.

## Revisión

-
