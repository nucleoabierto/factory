# D008: Organización por hitos en TODO.txt

## Estado

Aceptada

## Contexto

Con 28 tareas, la lista plana de `TODO.txt` empezaba a ser larga y costaba distinguir las fases del proyecto. Las opciones eran: secciones con encabezados Markdown dentro del propio archivo, prefijos de hito en cada línea, o archivos separados por hito.

## Decisión

Agrupamos las tareas bajo encabezados de hito (`## Hito N: título`) dentro de `TODO.txt`. Las líneas de tarea mantienen su formato y el skill `ejecutar-tareas` no necesita cambios: sigue recorriendo la lista en orden, ignorando los encabezados.

## Justificación

Las secciones con encabezados son el enfoque que mejor equilibra estructura y simplicidad: los hitos son visibles al ojear el archivo, todo sigue en un solo archivo y no requiere cambios en el skill que procesa la lista. Si el proyecto crece hasta el punto de que el archivo es difícil de manejar, se puede migrar a archivos separados sin perder la estructura de hitos. La investigación en `docs/research/organizacion-por-hitos.md` documentó y justificó esta elección.
