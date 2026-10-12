# Renombrar los archivos .txt existentes a Markdown

## Estado

[ ] Pendiente | [~] En progreso | [r] En revisión | [x] Completada | [!] Bloqueada

## Tipo

mantenimiento (refactoring)

## Objetivo

Aplicar la convención Markdown sobre los archivos de documentación `.txt` ya existentes en los proyectos gestionados —el índice de tareas y cualquier otro documento `.txt` que aparezca— sin romper la resolución por convención que la instalación declara.

## Dependencias

- docs/tasks/133-plantillas-y-convencion-indice-markdown.md

## Entrada

- Los archivos `.txt` existentes fuera de dependencias (`node_modules`): hoy `TODO.txt` en la raíz, `todo-app/` y `modern-todo-app/`; el barrido de ejecución decidirá si hay más.
- La configuración de convenciones instalada en cada proyecto (`convenciones.sh` de los gestores instalados o la que corresponda en cada instalación).
- Las menciones internas de cada proyecto a sus propios nombres de archivo —comentario de cabecera del índice, documentación local—.

## Resultado esperado

- `TODO.txt` → `TODO.md` en la raíz del proyecto principal, `todo-app/` y `modern-todo-app/`, y todo otro archivo de documentación `.txt` hallado migrado a `.md`.
- La configuración de cada proyecto apuntando a los nombres nuevos.
- Menciones internas actualizadas en cada proyecto.

## Criterios de calidad

- No queda ningún `.txt` de documentación fuera de `node_modules` en los tres proyectos.
- Las operaciones delegadas de `consultar-artefactos` y `actualizar-artefactos` funcionan idénticas sobre el índice renombrado en cada instalación.
- Ninguna referencia residual apunta a un nombre `.txt` retirado.

## Procedimiento sugerido

1. Barrido de `*.txt` de documentación en los tres proyectos.
2. Renombrar archivos y actualizar la configuración instalada de cada proyecto.
3. Actualizar menciones internas.
4. Verificar operaciones delegadas en cada instalación.

## Notas

- Los `LICENSE*.txt` y archivos dentro de `node_modules` quedan fuera: son artefactos de terceros.

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario (ejecución): [fecha] — [Aprueba | Solicita cambios]
- Usuario (cierre): [fecha] — [Aprueba | Solicita cambios]
