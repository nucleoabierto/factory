# Crear la gestión de roadmap para el motor externo y aplicarla a todo-app

## Estado

[ ] Pendiente | [ ] En progreso | [ ] En revisión | [x] Completada | [ ] Bloqueada

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

## Plan técnico

**Subsistema:** el nivel de planeación existente es la épica (`docs/epics/`, skill `planificar`, D019): `TODO.txt` es la fuente de ejecución y estado de las tareas y la épica es la fuente del objetivo, el alcance y la guía de arquitectura de un conjunto. No existe nivel que ordene las épicas entre sí ni posicione el trabajo suelto. En todo-app hay tres épicas planificadas (002, 003 y 004) y una tarea suelta (015); las tareas 020–022 ya figuran agrupadas bajo la épica 004 —la tarea las describe «sin épica», pero la agrupación ya ocurrió, así que el trabajo suelto a posicionar es la 015.

**Forma de la solución:** artefacto más skill nuevo, sin orquestador. `ROADMAP.md` en la raíz del repo del producto es la fuente de verdad de prioridad y dirección —patrón «roadmap en el repo» de la investigación— mientras `TODO.txt` sigue siendo la fuente de ejecución; la relación replica la de épica e índice: el roadmap decide y el índice ejecuta, con el orden de `TODO.txt` como reflejo mecánico. Se descarta extender `planificar` (mezclaría niveles: la épica planea un conjunto, el roadmap secuencia conjuntos) y un orquestador (no hay pipeline de capacidades que coordinar; es una sola capacidad con puerta humana). La jerarquía iniciativa→épica→feature de los backlogs git-native añade niveles que el proyecto no necesita hoy.

**Acciones:**

1. Registrar la decisión de forma con `decisiones-diseno` — la creación de un nivel nuevo de planeación es una decisión estructural que debe quedar trazada.
2. Crear el skill `planificar-roadmap` en `.agents/skills/` con su plantilla `assets/roadmap.md`: reúne las líneas de trabajo del producto (épicas, hitos ligeros, tareas sueltas), las ordena con una justificación por posición, pasa la puerta humana y refleja el orden resultante en `TODO.txt`. Aporta el procedimiento reproducible del nivel.
3. Actualizar el «Cuándo no usar» de `planificar`, que hoy declara la secuenciación de conjuntos «fuera de alcance», para apuntar al nuevo skill.
4. Producir `todo-app/ROADMAP.md` como primera aplicación: orden 015 → 002 → 003 → 004, con la justificación de cada posición — 015 primero porque migra el código actual en una pasada acotada antes de que las épicas añadan código ES5 que habría que remigrar; 004 última porque su formato de exportación tolera la forma final del estado; 002 antes de 003 porque la reestructuración del modelo precede a la fecha. Como la 015 ya vive en `## General`, que precede a los hitos, el orden del índice ya coincide y no requiere reordenación.
5. Actualizar `definicion-proyecto.md`: la planeación de roadmap deja de figurar en «lo que falta» del producto entregable.

## Suite de pruebas esperada

- Ejecutar la capacidad sobre todo-app produce un `ROADMAP.md` en su raíz que declara las cuatro líneas de trabajo en el orden decidido, cada una con la justificación de su posición — caso de uso: planear un roadmap.
- El trabajo suelto sin épica (la tarea 015) queda posicionado en el roadmap con justificación explícita del impacto que motiva su orden — caso de uso: absorber trabajo sin épica.
- Una línea ya agrupada en épica no se desagrupa ni se replantea: el roadmap la ordena tal cual — caso de uso: ordenar épicas existentes.
- `todo-app/TODO.txt` refleja el orden declarado en el roadmap sin cambiar el estado de ninguna tarea — caso de uso: el índice ejecuta lo que el roadmap decide.
- El skill resultante sigue la estructura de los skills existentes y su «Cuándo no usar» declara las fronteras del nivel (no ordena tareas dentro de un conjunto, no ejecuta) — caso de uso: reusar la capacidad en otro proyecto.

## Desviaciones del plan

- El plan no incluyó sincronizar `README.md` —documento de cabecera mantenido al estado real— que seguía declarando el roadmap como pendiente y no listaba el nuevo skill ni la decisión D022. La revisión técnica lo detectó; se actualizó el README dentro de la misma tarea por coherencia con el criterio de que los documentos de cabecera reflejan el estado actual.
- La línea «Dos niveles» de `definicion-proyecto.md` declaraba el roadmap como extensión futura del producto entregable aunque el plan solo pedía sacarlo de «lo que falta»; se corrigió la frase para que no contradiga el estado ya actualizado.

## Revisión

- Subagente: 2026-09-24 — Aprueba (primera pasada solicitó cambios: README desactualizado y frase residual en definicion-proyecto.md; resueltos y registrados como desviaciones)
- Usuario: 2026-09-24 — Aprueba (corrección durante la revisión: el roadmap es documento vivo, sin campo de estado ni serie de roadmaps)
