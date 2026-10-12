# Plantillas y convención del índice a Markdown

## Estado

[ ] Pendiente | [~] En progreso | **[r] En revisión** | [x] Completada | [!] Bloqueada

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

## Contexto

El sistema conserva tres plantillas de skill con contenido Markdown bajo extensión .txt (task, domain, feature), y el nombre por defecto del índice de tareas es TODO.txt en el catálogo de convenciones (PERSONALIZE.md), las cuatro configuraciones convenciones.sh y los defaults de convencion.sh. Las menciones de TODO.txt en contratos del sistema se agrupan en: configuración y defaults (convenciones.sh, convencion.sh, comentarios de todo.sh), descriptores en SKILL.md de los gestores, documentación viva (README.md, docs/mapa-de-flujos.md, docs/definicion-proyecto.md, docs/domains/) y documentación histórica que no se reescribe (docs/tasks/, docs/research/, docs/decisions/, docs/epics/, docs/proposals/ —incluidos los ejemplos de decisiones-diseno que citan la decisión real D001, cuyo título es histórico—).

Resultado esperado: toda plantilla con contenido Markdown usa extensión .md y el índice se llama por defecto TODO.md. Restricción conocida: entre el merge de esta tarea y el de la 134 el valor por defecto dirá TODO.md mientras el archivo raíz sigue siendo TODO.txt —transitorio aceptado al dividir el trabajo.

## Conectividad

Todas las capacidades que el plan asume existen: la convención indice_tareas está publicada en el catálogo y es resoluble por convencion.sh; los gestores cargan su convenciones.sh propio y toleran el cambio de valor sin tocar código —es precisamente lo que la 132 construyó—; las plantillas viven en assets/ propios de cada skill. La tarea es puramente mecánica: renombrar, actualizar referencias y cambiar el valor por defecto. Veredicto: conectada.

## Plan técnico

Resumen: tres plantillas .txt con contenido Markdown y el default TODO.txt del índice son restos de la convención anterior a la unificación; cambiarlos es mecánico porque la configuración por convenciones (132) ya absorbe el valor.

Acciones:
1. Renombrar las tres plantillas a .md (task, domain, feature) y actualizar sus referencias en los tres SKILL.md.
2. Cambiar el valor por defecto de indice_tareas de TODO.txt a TODO.md en PERSONALIZE.md (catálogo), los cuatro convenciones.sh y la tabla de defaults de convencion.sh.
3. Actualizar las menciones contrato del índice: encabezados de catálogo en los SKILL.md de los gestores, comentarios de los todo.sh y la documentación viva —README.md, docs/mapa-de-flujos.md, docs/definicion-proyecto.md, docs/domains/.
4. No tocar la documentación histórica —docs/tasks/, docs/research/, docs/decisions/, docs/epics/, docs/proposals/— ni los ejemplos de decisiones-diseno que citan la decisión real D001-todo-txt.
5. Verificar: convencion indice_tareas → TODO.md; batería y bash -n verdes; barrido residual.

## Suite de pruebas esperada

- No queda *.txt bajo .agents/skills/*/assets/ (M)
- convencion indice_tareas devuelve TODO.md; las cuatro configuraciones y el catálogo coinciden (O, M)
- Ninguna referencia a task.txt/domain.txt/feature.txt sobrevive en los SKILL.md (M)
- TODO.txt solo persiste en documentación histórica y ejemplos que citan D001 —ninguna en contratos ni documentación viva (M)
- Batería mecánica 144/144 y bash -n en los scripts tocados (regresión)

## Revisión

- Subagente: 2026-10-12 — Aprueba
- Usuario (ejecución): [fecha] — [Aprueba | Solicita cambios]
- Usuario (cierre): [fecha] — [Aprueba | Solicita cambios]
