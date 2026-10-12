# Renombrar los archivos .txt existentes a Markdown

## Estado

[ ] Pendiente | [~] En progreso | **[r] En revisión** | [x] Completada | [!] Bloqueada

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

## Contexto

Tres proyectos gestionados conservan su índice como TODO.txt. Distinciones de la instalación de cada uno: la raíz y todo-app comparten la instalación de skills —todo-app/.agents es un enlace simbólico a ../.agents—, así que ambos resuelven ya indice_tareas=TODO.md tras la 133 sin configuración propia; modern-todo-app no tiene instalación de skills (sin .agents ni convenciones.sh): su renombrado es solo del archivo y de las menciones internas —README.md y .prettierignore—. Los .txt de node_modules son licencias de terceros, fuera de alcance. Menciones que se conservan por ser registro histórico: todo-app/EXPERIENCIAS.md y los archivos de tarea de modern-todo-app/docs/tasks/.

## Conectividad

Todas las capacidades asumidas existen: la convención indice_tareas ya vale TODO.md tras la 133 y los gestores compartidos resuelven el nombre nuevo; los archivos a renombrar y las menciones internas están inventariados. Veredicto: conectada.

## Plan técnico

Acciones:
1. Renombrar TODO.txt → TODO.md en los tres proyectos (raíz, todo-app/, modern-todo-app/).
2. Barrido de otros .txt de documentación en los tres proyectos —hoy solo los índices; lo verifica la suite—.
3. Actualizar las menciones internas vivas: modern-todo-app/README.md (línea 31) y modern-todo-app/.prettierignore (línea 5).
4. Verificar resolución por convención: raíz y todo-app comparten instalación (symlink .agents) → indice_tareas=TODO.md ya; modern-todo-app no tiene instalación —solo el archivo y sus menciones.

Se conservan por registro histórico: todo-app/EXPERIENCIAS.md (append-only) y docs/tasks/ de mta. Los LICENSE*.txt de node_modules quedan fuera.

## Suite de pruebas esperada

- Ningún .txt de documentación fuera de node_modules en los tres proyectos (M)
- siguiente/marcar delegados funcionan sobre los índices renombrados de raíz y todo-app —convención resuelta, no ruta inyectada— (O)
- Ninguna referencia a TODO.txt en archivos vivos de los tres proyectos (M)
- .prettierignore y README.md de mta apuntan al nombre nuevo (M)

## Revisión

- Subagente: 2026-10-12 — Aprueba
- Usuario (ejecución): [fecha] — [Aprueba | Solicita cambios]
- Usuario (cierre): [fecha] — [Aprueba | Solicita cambios]
