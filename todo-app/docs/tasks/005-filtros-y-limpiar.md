# Filtros de vista y limpieza de completadas

## Estado

[ ] Pendiente | [ ] En progreso | [ ] En revisión | [x] Completada | [ ] Bloqueada

## Tipo

desarrollo

## Objetivo

Permitir filtrar la lista por todas / pendientes / completadas y limpiar de una vez las tareas completadas, con tests que lo verifiquen.

## Dependencias

- 004

## Entrada

- La aplicación con creación, listado, contador, operaciones sobre tareas y suite de tests de las tareas anteriores.

## Resultado esperado

- Tres filtros determinan qué tareas se muestran: todas, solo pendientes, solo completadas, con el filtro activo distinguible.
- Una acción «limpiar completadas» elimina de una vez todas las tareas completadas.
- Filtros y limpieza se coordinan con el contador y la persistencia.
- Tests QUnit nuevos que cubren los filtros y la limpieza.

## Criterios de calidad

- Cada filtro muestra exactamente el subconjunto correspondiente y el activo es reconocible.
- Limpiar completadas las borra todas y persiste el resultado al recargar.
- Las operaciones sobre tareas (crear, completar, editar, borrar) siguen funcionando con cualquier filtro activo.
- El contador sigue mostrando el total de pendientes, no el de las tareas visibles con el filtro activo.
- La suite de `tests.html` pasa en verde, incluidos los tests nuevos.
- Sin errores en consola.

## Procedimiento sugerido

1. Añadir el estado de filtro activo y la lógica de filtrado y limpieza al objeto de lógica definido en la tarea 002, con sus tests QUnit.
2. Conectar los controles de filtro, marcar el filtro activo y aplicar el filtro durante el renderizado.
3. Implementar la limpieza de completadas sobre el estado y la persistencia.
4. Verificar en el navegador la combinación de filtros con las operaciones existentes, la recarga y que la suite sigue en verde.

## Notas

- Los commits de este proyecto llevan el ámbito `todo-app` en Conventional Commits (`tipo(todo-app): descripción`).

## Plan técnico

Subsistema: `app.js` expone `App` con el modelo `{id, text, done}`, persistencia de la lista en `localStorage` (clave `todoapp-tasks`), operaciones de crear, completar, editar y borrar, `render` que reconstruye `#todo-list` y `init` que enlaza Enter en `#new-todo`. En `index.html` ya existen los tres enlaces de filtro (`#filter-all`, `#filter-active`, `#filter-completed`) y el botón `#clear-completed`, sin cablear.

Decisiones documentadas:
- El filtro activo (`'all' | 'active' | 'completed'`) se persiste en `localStorage` bajo una clave propia (`todoapp-filter`), separada de la lista para no cambiar el formato ya guardado; se restaura al cargar y tolera valores ausentes o inválidos volviendo a `'all'`.
- Los enlaces de filtro se cablean por clic con `preventDefault`, sin enrutado por hash.
- La clase `selected` marca el enlace del filtro activo; ahora sí está en alcance (se retiró en la tarea 002 por adelantarse).

1. Añadir a `App` el estado `filter`, la operación `setFilter(name)` —que guarda la clave propia y re-renderiza—, `visibleTasks()` —subconjunto según el filtro— y `clearCompleted()` —elimina las `done`, guarda y re-renderiza—. Aporta el modelo de las dos funciones.
2. Extender la persistencia: `load()` restaura también el filtro desde su clave, con valor `'all'` si está ausente o es inválido; `setFilter` lo persiste en cada cambio. Aporta la conservación del filtro entre recargas.
3. Filtrar en el render: iterar `visibleTasks()` en lugar de `tasks`; el contador sigue usando `pendingCount()` sobre todas las tareas. Aporta que el filtro afecte solo a la vista.
4. Marcar el filtro activo en cada render: poner o quitar `selected` en los tres enlaces según `App.filter`. Aporta el reconocimiento visual del filtro vigente.
5. Cablear en `init()`: clics de los tres enlaces (con `preventDefault`) que llaman a `setFilter`, y clic de `#clear-completed` que llama a `clearCompleted`. Aporta la conexión de los controles ya presentes en el HTML.
6. Añadir en `style.css` la regla `.filters a.selected` con el borde visible del hover. Aporta la distinción del filtro activo.
7. Escribir los tests en `tests.html` en un módulo nuevo con el mismo aislamiento de `localStorage`. Aporta la cobertura de filtros, limpieza y persistencia del filtro.

## Suite de pruebas esperada

- Con tareas mezcladas, el filtro de pendientes muestra solo las no completadas y el de completadas solo las hechas; «todas» muestra todo (caso de uso: filtrar la vista).
- El enlace del filtro activo lleva `selected` y los demás no (caso de uso: reconocer el filtro vigente).
- Limpiar completadas elimina todas las `done` del estado, la vista y el almacenamiento, conservando las pendientes (caso de uso: limpieza masiva).
- Crear, completar, editar y borrar siguen funcionando con un filtro distinto de «todas» activo (caso de uso: operar bajo filtro).
- Con el filtro de completadas activo, el contador muestra el total de pendientes, no el de visibles (borde del contador).
- Limpiar completadas y recargar mantiene el resultado; cambiar de filtro y recargar restaura el filtro elegido, y un valor corrupto en su clave vuelve a «todas» (persistencia y tolerancia).
- Los módulos anteriores siguen en verde (caso de uso: regresión).

## Revisión

- Subagente: 2026-09-21 — Aprueba
- Usuario: 2026-09-21 — Aprueba (con un cambio menor: el filtro se persiste en localStorage)
