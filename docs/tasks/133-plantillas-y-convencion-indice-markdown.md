# Plantillas y convención del índice a Markdown

## Estado

[ ] Pendiente | [~] En progreso | [r] En revisión | [x] Completada | [!] Bloqueada

## Tipo

mantenimiento (refactoring)

## Objetivo

Las plantillas de los skills y el nombre por defecto del índice de tareas conservan la extensión `.txt` pese a contener Markdown. Unificar la convención: todo documento Markdown del sistema lleva extensión `.md`, tanto en las plantillas como en la convención `indice_tareas` —sin renombrar todavía los archivos existentes de los proyectos, que es trabajo de la tarea siguiente.

## Dependencias

- Ninguna

## Entrada

- Las tres plantillas `.txt`: `.agents/skills/crear-tareas/assets/task.txt`, `.agents/skills/documentar-dominio/assets/domain.txt`, `.agents/skills/documentar-producto/assets/feature.txt` —las otras plantillas de `assets/` (`borrador`, `propuesta`, `roadmap`, `prd`, `epica`) ya son `.md`—.
- El catálogo de convenciones de `PERSONALIZE.md`, los cuatro `convenciones.sh` de los gestores y los defaults embebidos de `convencion.sh`, donde `indice_tareas` vale `TODO.txt`.
- Las menciones a `TODO.txt` en skills, plantillas y comentarios que formen parte del contrato del sistema.

## Resultado esperado

- Las plantillas `.txt` renombradas a `.md` y todas sus referencias en `SKILL.md` actualizadas.
- `indice_tareas` con valor por defecto `TODO.md` en el catálogo, las cuatro configuraciones y `convencion.sh`; el comentario de cabecera de la plantilla del índice (donde se nombre a sí mismo) actualizado.
- Barrido sin menciones residuales de `TODO.txt` en contratos del sistema.

## Criterios de calidad

- No queda ningún `*.txt` bajo `.agents/skills/*/assets/`.
- `convencion indice_tareas` devuelve `TODO.md`.
- La batería mecánica sigue en verde y `bash -n` pasa en los scripts tocados.
- Las referencias a las plantillas en los `SKILL.md` apuntan a los nombres nuevos.

## Procedimiento sugerido

1. Inventariar plantillas `.txt` y menciones de `TODO.txt` en el sistema.
2. Renombrar plantillas y actualizar referencias.
3. Cambiar el default de `indice_tareas` en catálogo, configuraciones y `convencion.sh`.
4. Verificar: batería, `bash -n`, barrido de residuales.

## Notas

- El `TODO.txt` de la raíz y los de los proyectos evaluados no se renombran aquí: pertenecen a la tarea 134.

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario (ejecución): [fecha] — [Aprueba | Solicita cambios]
- Usuario (cierre): [fecha] — [Aprueba | Solicita cambios]
