# Crear el skill de consulta de artefactos

## Estado

[ ] Pendiente | [~] En progreso | [r] En revisión | **[x] Completada** | [!] Bloqueada

## Tipo

mantenimiento

## Objetivo

Crear el skill de utilidad que responde consultas deterministas sobre los artefactos del sistema, ejecutándolas mediante scripts bash propios. Recibe la orden delegada —archivo objetivo, operación, términos— y devuelve datos. Hoy cada skill re-describe y re-parsea estos formatos por su cuenta. Consultas cubiertas: estado del índice `TODO.txt` (próxima pendiente, líneas por estado, propuestas `[p]`, secciones con su épica enlazada, agrupación agotada), estado de planeación de un archivo de tarea (secciones `## Contexto`/`## Conectividad`/`## Plan técnico`/`## Suite de pruebas esperada` presentes), clasificación de dependencias, lectura de la checklist del plan, ideas pendientes de `docs/ideas/` (sin `Procesada en`, por orden sugerido), inventario de líneas abiertas para el roadmap, coincidencia por disparadores en los índices de `docs/decisions/` y `docs/lessons/`, y siguiente número de una serie (`NNN`, `DNNN`, `MM`). El nombre se decide en la ejecución (`consultar-artefactos` tentativo).

## Dependencias

- Tarea 113 (`docs/tasks/113-delegacion-mecanica-scripts.md`): fija la decisión, el contrato de los scripts y las formas canónicas de los formatos a parsear.

## Entrada

- La decisión y el contrato producidos por la tarea 113.
- Los formatos reales verificados en la revisión: `TODO.txt` (estados, encabezados, comentario `<!-- épica: -->`, sublistas de bloqueo), archivos de tarea (las tres convenciones de `## Estado`, secciones antes de `## Revisión`), índices con `- Disparadores:`, `docs/ideas/` (cabeceras `> **Procesada en:**` y `> **Orden sugerido:**`), `docs/epics/` (estado `Planificada`).
- Los informes de la revisión con la lista de puntos de uso por skill consumidor.

## Resultado esperado

- `.agents/skills/<nombre>/SKILL.md` que declara la capacidad de consulta, su contrato de entrada delegada (archivo + operación + términos) y el catálogo de operaciones con sus fallbacks; los scripts bash en `assets/` implementando cada operación.
- Los skills consumidores actualizados para delegar: `ejecutar-tareas` (estado del índice, agrupación agotada, enrutado por planeación), `planear-tarea` (estado de planeación, dependencias), `desarrollar-tarea` (validación de entrada), `recopilar-contexto`/`evaluar-conectividad`/`planear-implementacion` (consultas previas), `ejecutar-implementacion` y `revisar-implementacion` (checklist), `idea-a-tarea` (propuestas, ideas pendientes), `planificar` (siguiente número de épica), `planificar-roadmap` (inventario de líneas), `consultar-decisiones`/`consultar-lecciones`/`consolidar-lecciones` (búsqueda por disparadores), `crear-tareas`/`refinar-propuesta`/`lluvia-de-ideas` (siguiente número).
- El texto simplificado en cada consumidor: la descripción del formato se sustituye por la delegación.
- Actualización del `README.md` en la sección de skills disponibles.

## Criterios de calidad

- El `SKILL.md` cumple D004 y D005; la `description` declara la capacidad de consulta, no los scripts (lección `contratos-de-skills`).
- Cada script cumple el contrato de la tarea 113: stdout solo datos, exit 2 si falta la entrada, vacío legítimo sin error.
- El parser de `## Estado` tolera las tres convenciones observadas y lee correctamente la forma canónica.
- La búsqueda por disparadores devuelve archivo + estado (cuando existe el campo) + resumen por coincidencia, igual o mejor que el `grep -iEB1` hoy sugerido.
- Las consultas nunca sintetizan datos: ausencia de archivo o de resultados se reporta como tal.
- El skill aparece en `README.md`.

## Procedimiento sugerido

1. Definir el catálogo de operaciones a partir de los informes y escribir los scripts con sus fallbacks, probándolos contra los artefactos reales del repo y de `todo-app/`.
2. Redactar el `SKILL.md`, revisar redacción y pulir antes de escribir.
3. Actualizar los consumidores para delegar y el `README.md`.

## Notas

- Solo consultas: las escrituras corresponden al skill de la tarea 115. El reparto consulta/escritura puede revisarse en la ejecución si el SKILL.md resulta demasiado largo (D005).
- Las consultas triviales que el arnés resuelve con `read`/`grep` directo no entran al catálogo; el criterio es formato interpretado o join entre archivos.

## Revisión

- Subagente: 2026-10-03 — Aprueba tras corrección (el parser de `## Estado` moría ante la variante de negrita solo en etiqueta; corregido y re-verificado)
- Usuario: 2026-10-03 — Aprueba
