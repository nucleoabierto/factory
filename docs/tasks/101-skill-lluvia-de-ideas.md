# Crear el skill lluvia-de-ideas

## Estado

[ ] Pendiente | [~] En progreso | [r] En revisión | [x] Completada | [!] Bloqueada

## Tipo

desarrollo

## Objetivo

Crear un skill que acompañe al usuario en una conversación de lluvia de ideas: escucha la propuesta, detecta si describe una idea única o varias ideas distinguibles —funcionalidades, flujos de trabajo, iteraciones o épicas implícitas— y genera un archivo por idea en `docs/ideas/` con el formato que el flujo de idea a planeación consume. Hoy una descripción rica desde el inicio (como la que originó todo-app) se procesa como una sola idea y se pierde la descomposición temprana en épicas.

## Dependencias

- Ninguna

## Entrada

- `todo-app/docs/ideas/` como ejemplos del formato entregable (`001-multiples-listas.md`, `002-planificacion-temporal.md`, `003-portabilidad-y-compartir.md`).
- `descubrir-problema`, `idea-a-tarea` y `refinar-propuesta` para entender qué espera el arranque del flujo de planeación de cada idea: el archivo de idea debe aportar problema y oportunidad suficientes para que `descubrir-problema` arranque sin rehacer el trabajo.
- Los estándares de skill: D003 (unidades autocontenidas), D004 (frontmatter Agent Skills), D005 (división progresiva con `references/`).

## Resultado esperado

- `.agents/skills/lluvia-de-ideas/SKILL.md` conforme al estándar Agent Skills, con `references/` si el cuerpo supera lo razonable, que cubra:
  - La conversación: cómo conducir el diálogo con el usuario para madurar la propuesta sin convertirla aún en solución.
  - La detección de multiplicidad: criterios para distinguir una idea única de un conjunto de ideas (líneas de funcionalidad independientes, flujos de usuario separables, iteraciones o fases con valor propio, épicas implícitas) y cómo confirmar la descomposición con el usuario antes de escribir.
  - El entregable: `docs/ideas/NNN-slug.md` por idea —un archivo cuando la idea es única— con el formato ejemplarizado en `todo-app/docs/ideas/` (problema, qué desbloquea, flujos de trabajo que se hacen viables, ventajas como producto, tensión con el roadmap) o el formato que el skill defina si decide mejorarlo, justificando la elección.
  - El encaje con el flujo: qué espera `idea-a-tarea`/`descubrir-problema` como entrada y cómo el archivo de idea lo satisface, incluyendo el caso de varias ideas (orden sugerido, referencias cruzadas entre ideas del mismo origen).
- `README.md` o el índice de skills actualizado con la nueva capacidad, si el proyecto lo mantiene.

## Criterios de calidad

- El frontmatter tiene solo `name` y `description`, con sinónimos suficientes para que el enrutado lo encuentre ante «lluvia de ideas», «brainstorming», «tengo varias ideas».
- El skill explica cómo detectar múltiples ideas con criterios comprobables y con un ejemplo de referencia: la descripción completa que originó todo-app debería descomponerse en las épicas hoy existentes en `todo-app/docs/ideas/`.
- El formato del archivo de idea declarado coincide con lo que `descubrir-problema` necesita para arrancar, o declara explícitamente el ajuste del flujo si se desvía.
- El SKILL.md queda por debajo de 500 líneas; el material detallado (formato de archivo, ejemplo de detección) vive en `references/`.

## Procedimiento sugerido

1. Leer `todo-app/docs/ideas/` completo y reconstruir la conversación implícita: qué descripción inicial habría generado esos tres archivos.
2. Leer `descubrir-problema` e `idea-a-tarea` para fijar el contrato de entrada del flujo de planeación.
3. Redactar el SKILL.md siguiendo la estructura de los skills hermanos (cuándo usar, entrada, salida, principios rectores, procedimiento, finalización, referencias).
4. Extraer a `references/` el formato de archivo y el ejemplo de detección de multiplicidad.
5. Pasar `revisar-redaccion` y `pulir-escritura` en modo preventivo antes de presentar.

## Notas

- Imaginar el caso guía: «quiero una todo app con listas múltiples, planificación temporal y que pueda compartirse» debería producir tres archivos de idea, no uno; el skill debe reconocer las tres líneas y proponerlas al usuario.

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario: [fecha] — [Aprueba | Solicita cambios]
