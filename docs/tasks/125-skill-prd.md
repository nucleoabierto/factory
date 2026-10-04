# Crear el skill de PRD

## Estado

[ ] Pendiente | [~] En progreso | [r] En revisión | **[x] Completada** | [!] Bloqueada

## Tipo

desarrollo

## Objetivo

Materializar el skill encargado de generar el PRD según lo que determine la investigación de la tarea 124: cuándo se genera —hito o épica—, qué información captura de las tareas, dónde vive y cómo lo consumen la planeación y la ejecución.

## Dependencias

- Tarea 124 (`docs/tasks/124-investigacion-prd-planeacion.md`): fija la forma, el momento y el consumo del PRD.

## Entrada

- El documento de investigación de la tarea 124.
- Las convenciones de skills vigentes (D003, D004, D005).

## Resultado esperado

- `.agents/skills/<nombre>/SKILL.md` —el nombre lo decide la investigación— con frontmatter y convenciones.
- Cableado en los flujos que la investigación determine.
- `README.md` actualizado.

## Criterios de calidad

- Implementa la recomendación de la investigación sin ampliarla.
- La `description` declara capacidad, no mecánica (D004, D005).
- `README.md` lista el skill.

## Procedimiento sugerido

1. Releer el documento de investigación y sus recomendaciones.
2. Escribir el `SKILL.md` con revisión de redacción y pulido mecánico preventivos.
3. Cablear los consumidores que la investigación determine y registrar el skill en el README.

## Notas

- Ninguna

## Desviaciones del plan

- A petición del usuario, durante la revisión: `recopilar-contexto` incorpora el PRD del conjunto como fuente de contexto —Entrada, lista de fuentes y localización—, y la trazabilidad se ajusta para mantener la documentación de producto pública limpia: el escenario se redacta desde el vocabulario del PRD sin imprimir identificadores; la remontada corre por el ancla a la prueba, que traza al CU-N en la suite.

## Revisión

- Subagente: 2026-10-04 — Aprueba (segunda revisión; la primera solicitó cambios —el eslabón documentar-producto de la trazabilidad— y se corrigió; las absorciones del usuario validadas sin perder validez)
- Usuario: 2026-10-04 — Aprueba (con dos absorciones: el PRD como fuente de recopilar-contexto y la documentación de producto pública limpia de identificadores)
