# Crear el skill lluvia-de-ideas

## Estado

[ ] Pendiente | [~] En progreso | [r] En revisión | [x] **Completada** | [!] Bloqueada

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

## Contexto

- **Archivos similares:**
  - `todo-app/docs/ideas/001-003` — tres documentos de idea ya existentes que ejemplifican el entregable: cabecera con tipo y fecha, y secciones Problema, Qué desbloquea, Flujos de trabajo que se hacen viables, Ventajas como producto y Tensión que introduce en el roadmap.
  - `.agents/skills/descubrir-problema/SKILL.md` — primera capacidad del flujo; su entrada es «una idea suelta» y produce problema + oportunidad por diálogo, sin archivo.
  - `.agents/skills/idea-a-tarea/SKILL.md` — orquestador del flujo; hoy recibe una idea suelta y la procesa como una sola unidad.
  - `.agents/skills/descubrir-problema/references/guia-dialogo.md` — patrón de references/ con guía de diálogo, modelo para el material detallado del nuevo skill.
- **Patrones:**
  - Estructura común de los skills: frontmatter `name`/`description`, Cuándo usar / Cuándo no usar / Entrada / Salida / Principios rectores / Procedimiento / Finalización / Referencias; cuerpo <500 líneas con detalle en `references/`.
  - Los artefactos numerados usan `NNN-slug.md` con serie propia del directorio.
  - Los skills que dialogan validan con el usuario antes de producir archivos (mismo patrón que `descubrir-problema` y `crear-tareas` modo independiente).
- **Lecciones:**
  - `contratos-de-skills` — la description habla de capacidad, no de mecánica; reglas inline.
  - `consistencia-de-formatos` — el formato del archivo de idea mantiene la estructura común (bullets etiquetados, listas anidadas si hay varios campos).
  - `flexibilidad-en-procesos` — los criterios de detección de multiplicidad se declaran como lista abierta y extensible.
  - `nomenclatura` — `docs/ideas/` nombra el contenido (ideas), no la operación.
  - `vocabulario` — vocabulario llano del español en el SKILL.md y en las plantillas.
- **Decisiones:**
  - D003 — el skill es una unidad autocontenida que se carga solo cuando es relevante.
  - D004 — frontmatter estándar Agent Skills, solo `name` y `description`.
  - D005 — cuerpo por debajo de 500 líneas; el formato de archivo y el ejemplo de detección van en `references/`.
  - D006 — el pulido del SKILL.md exige pasar antes por `revisar-redaccion`.

## Conectividad

- **Veredicto:** conectada.
- **Justificación:** todo lo que la tarea asume existe: `.agents/skills/` alberga los 25 skills hermanos con la estructura común y `references/` (p. ej. `descubrir-problema/references/guia-dialogo.md`); los tres documentos de idea ejemplares existen en `todo-app/docs/ideas/`; el flujo consumidor existe —`idea-a-tarea` orquesta y `descubrir-problema` recibe la idea suelta—. El directorio `docs/ideas/` del proyecto evaluado no existe aún, pero es absorbible: el propio skill lo crea al escribir el primer archivo de idea, no es capacidad base faltante.

## Plan técnico

Subsistema: los skills viven en `.agents/skills/<nombre>/` con `SKILL.md` de estructura común y `references/` opcional. El flujo de idea a tarea arranca en `idea-a-tarea`, que hoy solo acepta «una idea suelta» en conversación; no existe forma persistida de idea ni detección de multiplicidad. El nuevo skill se sitúa antes del flujo: convierte una propuesta rica en archivos `docs/ideas/NNN-slug.md` que el flujo consume después.

- [x] Crear `.agents/skills/lluvia-de-ideas/SKILL.md` siguiendo la estructura común de los skills hermanos
  - Aporta: es la pieza central de la tarea: cubre la conversación de maduración, la detección de multiplicidad con criterios abiertos, la confirmación del usuario antes de escribir y el entregable en `docs/ideas/`.
  - Contexto: frontmatter solo `name`/`description` (D004) con sinónimos «lluvia de ideas», «brainstorming», «tengo varias ideas»; description a nivel de resultado (lección de contratos); criterios de detección declarados como lista abierta y extensible (lección de flexibilidad).
- [x] Crear `references/formato-idea.md` con la plantilla del archivo de idea
  - Aporta: fija el entregable —cabecera con tipo y fecha, y secciones Problema, Qué desbloquea, Flujos de trabajo que se hacen viables, Ventajas como producto y Tensión que introduce en el roadmap—, que coincide con lo que `descubrir-problema` necesita para arrancar sin rehacer el trabajo.
  - Contexto: modelo son los tres archivos de `todo-app/docs/ideas/`; el material detallado vive en `references/` por D005.
- [x] Crear `references/deteccion-multiplicidad.md` con los criterios comprobables y el ejemplo de referencia
  - Aporta: da al skill el criterio de descomposición y su prueba de fuego: la descripción que originó todo-app se descompone en las tres ideas existentes en `todo-app/docs/ideas/`.
- [x] Cablear el consumo de ideas en `idea-a-tarea`
  - Aporta: cierra el encaje: el orquestador revisa `docs/ideas/` del proyecto evaluado por ideas sin procesar y, al consumir una, la marca con la referencia a la propuesta creada para no reprocesarla.
  - Contexto: la marca es una línea en el propio archivo de idea (`> **Procesada en:** docs/proposals/NNN-slug/`), suficiente para detectar las pendientes sin índice nuevo.
- [x] Registrar el skill en la tabla del `README.md`, sección «Flujo de idea a tarea»
  - Aporta: el índice de skills refleja la capacidad nueva.
- [x] Pasar `revisar-redaccion` y `pulir-escritura` en modo preventivo sobre el SKILL.md antes de presentar
  - Aporta: cumple D006 y el procedimiento sugerido de la tarea.

## Suite de pruebas esperada

- El skill es invocable por nombre, con frontmatter conforme a D004 y sinónimos que cubren «lluvia de ideas», «brainstorming» y «tengo varias ideas» (regresión de formato).
- Una descripción de idea única produce un solo archivo en `docs/ideas/` (O).
- Una descripción con varias líneas de funcionalidad independientes produce un archivo por idea tras la confirmación del usuario —el caso guía produce tres (M).
- Ningún archivo se escribe sin que el usuario confirme la descomposición propuesta (I).
- El archivo de idea aporta problema y oportunidad suficientes para que `descubrir-problema` arranque sin rehacer el trabajo (I).
- Una idea ya consumida por `idea-a-tarea` queda marcada con la referencia a su propuesta y no se reprocesa (E).

## Notas

- Imaginar el caso guía: «quiero una todo app con listas múltiples, planificación temporal y que pueda compartirse» debería producir tres archivos de idea, no uno; el skill debe reconocer las tres líneas y proponerlas al usuario.

## Revisión

- Subagente: 2026-09-28 — Aprueba (tras corregir dos hallazgos de contrato)
- Usuario: 2026-09-28 — Aprueba
