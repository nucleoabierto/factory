# Materializar la aprobación vía PR

## Estado

**[ ] Pendiente** | [~] En progreso | [r] En revisión | [x] Completada | [!] Bloqueada

## Tipo

desarrollo

## Objetivo

Materializar el flujo de aprobación vía PR según lo que determine la investigación de la tarea 129: la secuencia de cierre con **dos puertas humanas** —la de ejecución, el cambio revisado vía PR con su bucle de comentarios, y la de cierre, la aprobación final tras los sensores antes de cerrar el PR—, el skill encargado de crear el PR con la descripción orientada al revisor y de procesar los comentarios de GitHub como plan de mejoras, y el re-cableado de `ejecutar-tareas` y los skills del cierre.

## Dependencias

- Tarea 129 (`docs/tasks/129-investigacion-prs-punto-revision.md`): fija la secuencia, el formato del PR y el tratamiento de los comentarios.

## Entrada

- El documento de investigación de la tarea 129.
- Las convenciones de skills vigentes (D003, D004, D005).

## Resultado esperado

- `.agents/skills/<nombre>/SKILL.md` —el nombre lo decide la investigación— con frontmatter y convenciones: creación del PR con la descripción orientada al revisor y procesamiento de comentarios como plan de mejoras.
- `ejecutar-tareas/SKILL.md` ajustado: la secuencia de cierre con las dos puertas y el commit antes de la revisión humana.
- Cableado de los skills del cierre que la investigación determine y `README.md` actualizado.

## Criterios de calidad

- Implementa la recomendación de la investigación sin ampliarla.
- Las dos puertas quedan en la secuencia del ciclo: la de ejecución antes de los sensores y la de cierre después, antes de cerrar el PR.
- El PR se genera con la descripción que la investigación determine —el cambio y los puntos de atención del revisor, sin resumir el plan—.
- Los comentarios de GitHub disparan el plan de mejoras y el bucle vuelve a la revisión.
- Ambas aprobaciones quedan registradas en el archivo de tarea.
- `README.md` lista el skill nuevo.

## Procedimiento sugerido

1. Releer el documento de investigación y sus recomendaciones.
2. Escribir el `SKILL.md` con revisión de redacción y pulido mecánico preventivos.
3. Cablear `ejecutar-tareas` y los consumidores que la investigación determine; registrar el skill en el README.

## Notas

- Ninguna

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario: [fecha] — [Aprueba | Solicita cambios]
