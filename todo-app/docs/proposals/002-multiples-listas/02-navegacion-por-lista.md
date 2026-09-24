# Vista acotada a la lista activa con selector y contadores

## Tipo

desarrollo

## Objetivo

Permitir elegir la lista activa y trabajar dentro de ella: la vista muestra solo sus tareas, los filtros de estado y el contador se acotan a ella, las tareas nuevas caen en la lista activa y la elección se conserva entre visitas.

## Dependencias

- Borrador 01.

## Entrada

- El dominio con listas nombradas y la lista de entrada del borrador 01.
- La persistencia de la lista activa, análoga a la del filtro (`loadFilter`/`saveFilter`).

## Resultado esperado

- La interfaz ofrece un selector de listas (título de la lista activa con forma de cambiar a otra, o navegación equivalente) que lista las listas existentes.
- Al cambiar de lista, la vista, los filtros todas/pendientes/completadas y el contador de pendientes se acotan a la lista elegida.
- Crear una tarea la añade a la lista activa.
- La lista activa se persiste y se restaura al recargar; si la persistida ya no existe, se vuelve a la lista de entrada.
- Cada lista puede mostrar su propio contador de pendientes en el selector o la navegación.

## Criterios de calidad

- Cambiar de lista cambia exactamente las tareas visibles y el contador; las de otras listas no aparecen.
- Las tareas nuevas caen en la lista activa, no siempre en la de entrada.
- Al recargar, la lista activa se restaura; con el dato persistido ausente o inválido, se usa la lista de entrada.
- La suite de `tests.html` pasa en verde con tests nuevos del acotado por lista y la persistencia de la activa.
- Sin errores en consola.

## Procedimiento sugerido

1. Exponer en el dominio la lista de listas y las operaciones de consulta acotadas por lista.
2. Añadir a `App` la noción de lista activa, con persistencia propia en `Storage` al estilo del filtro.
3. Conectar la creación de tareas a la lista activa.
4. Renderizar el selector de listas con contadores y cablear el cambio de lista.
5. Escribir los tests del acotado, la captura en la lista activa y la restauración al cargar; verificar en el navegador.

## Notas

- Los commits de este proyecto llevan el ámbito `todo-app` en Conventional Commits (`tipo(todo-app): descripción`).
