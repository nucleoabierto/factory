# Vista acotada a la lista activa con selector y contadores

## Estado

[ ] Pendiente | [ ] En progreso | [ ] En revisión | [x] Completada | [ ] Bloqueada

## Tipo

desarrollo

## Objetivo

Permitir elegir la lista activa y trabajar dentro de ella: la vista muestra solo sus tareas, los filtros de estado y el contador se acotan a ella, las tareas nuevas caen en la lista activa y la elección se conserva entre visitas.

## Dependencias

- 011

## Entrada

- El dominio con listas nombradas y la lista de entrada de la tarea 011.
- La persistencia de la lista activa, análoga a la del filtro (`loadFilter`/`saveFilter`).

## Resultado esperado

- La interfaz ofrece un selector de listas (título de la lista activa con opción de cambiar a otra, o navegación equivalente) que enumera las listas existentes.
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

## Plan técnico

El subsistema es `app.js`: `TaskList` (dominio, ya con listas nombradas desde la tarea 011), `Storage` (persistencia tolerante), `UI` (render y eventos) y `App` (fachada y raíz de composición). Hoy `App` acota `visibleTasks`, `pendingCount` y `clearCompleted` con `INBOX.id` fijo y `addTask` cae en la entrada por defecto; el cambio sustituye ese fijo por una lista activa persistida y añade el selector a la interfaz.

- [x] Añadir `loadActiveList`/`saveActiveList` a `Storage` con la clave `todoapp-active-list`
  - Aporta: la elección de lista sobrevive entre visitas, al estilo del filtro
  - Contexto: el almacenamiento devuelve el id crudo sin validar existencia — la forma es de la capa de persistencia, la pertenencia la verifica el modelo en `App.load`
- [x] Añadir a `App` el estado `activeListId` y la operación `setActiveList(id)`
  - Aporta: la fachada conoce la lista activa y permite cambiarla con validación contra el modelo, persistencia, cancelación de la edición en curso y re-render
  - Contexto: `App.load` debe resolver la activa después de `taskList.load(...)`, porque la validez del id persistido depende de las listas cargadas; id ausente o inexistente → `INBOX.id`
- [x] Acotar `addTask`, `visibleTasks`, `pendingCount` y `clearCompleted` de `App` a `activeListId`
  - Aporta: la vista, el contador, los filtros y la creación se acotan a la lista elegida en lugar de la entrada fija
- [x] Renderizar el selector de listas con contadores en `UI.render` y cablear `change` en `UI.bindEvents`
  - Aporta: la interfaz ofrece la navegación entre listas con el pendiente de cada una visible
  - Contexto: el elemento es un `<select id="list-select">` nuevo en el header de `index.html`; cada opción muestra nombre y contador de pendientes propio
- [x] Escribir los tests del acotado, la captura en la lista activa y la restauración al cargar
  - Aporta: la suite cubre los criterios de calidad de la tarea
  - Contexto: módulo nuevo en `tests.html` cuyo fixture incluye el `#list-select`, siguiendo el patrón de `beforeEach` de los módulos existentes

## Suite de pruebas esperada

- Cambiar a otra lista muestra solo sus tareas y las de otras listas desaparecen de la vista (acotar la vista).
- El contador de pendientes refleja solo la lista activa (acotar el contador).
- Los filtros todas/pendientes/completadas operan dentro de la lista activa (acotar los filtros).
- Crear una tarea con otra lista activa la asigna a esa lista, no a la entrada (captura en la lista activa).
- El selector enumera todas las listas, marca la activa y muestra el contador de pendientes de cada una (navegar entre listas).
- Al recargar se restaura la lista activa persistida (persistencia de la elección).
- Con el id persistido ausente, corrupto o de una lista inexistente, la activa vuelve a la entrada (tolerancia de persistencia).
- Limpiar completadas solo vacía la lista activa y conserva las de las demás (acotar operaciones).

## Revisión

- Subagente: 2026-09-25 — Aprueba
- Usuario: 2026-09-25 — Aprueba
