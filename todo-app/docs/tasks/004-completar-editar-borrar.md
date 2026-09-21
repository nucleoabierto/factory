# Completar, editar y borrar tareas

## Estado

[ ] Pendiente | [ ] En progreso | [ ] En revisión | [x] Completada | [ ] Bloqueada

## Tipo

desarrollo

## Objetivo

Permitir marcar una tarea como completada, editar su texto y borrarla de la lista, con tests que lo verifiquen.

## Dependencias

- 003

## Entrada

- La lista funcional con creación, contador, persistencia y tests de la tarea 003.

## Resultado esperado

- Cada tarea muestra un control para alternar completada/pendiente, un modo de edición en línea y un control de borrado.
- Todos los cambios se reflejan en la vista, en el contador y en `localStorage`.
- Tests QUnit nuevos que cubren completar/desmarcar, editar y borrar.

## Criterios de calidad

- Marcar una tarea como completada la distingue visualmente y descuenta el contador; desmarcarla lo revierte.
- Editar una tarea actualiza su texto; confirmar con el campo vacío no deja una tarea sin texto: la edición se cancela o la tarea se borra, según la decisión que se documente.
- Borrar una tarea la elimina de la lista y del almacenamiento.
- Todos los cambios persisten al recargar la página.
- La suite de `tests.html` pasa en verde, incluidos los tests nuevos.
- Sin errores en consola.

## Procedimiento sugerido

1. Añadir a la lógica expuesta las operaciones de completar, editar y borrar, con sus tests QUnit.
2. Añadir al renderizado de cada tarea los controles correspondientes.
3. Implementar el modo edición (campo de texto sobre la tarea, confirmar/cancelar).
4. Conectar las operaciones con el estado y la persistencia, actualizando el contador.
5. Verificar en el navegador cada operación, incluida la recarga, y que la suite sigue en verde.

## Notas

- Los commits de este proyecto llevan el ámbito `todo-app` en Conventional Commits (`tipo(todo-app): descripción`).

## Plan técnico

Subsistema: `app.js` expone `App` con el modelo `{id, text, done}`, persistencia en `localStorage` (clave `todoapp-tasks`), `addTask`, `render` que reconstruye `#todo-list` con ítems de solo texto y `init` que enlaza Enter en `#new-todo`. `index.html` y `style.css` quedan como los dejó la tarea 003 salvo los estilos nuevos; los filtros y el botón de limpiar siguen sin cablear (tarea 005).

Decisión documentada: confirmar una edición con el campo vacío borra la tarea (convención TodoMVC), en lugar de cancelar la edición.

1. Añadir a `App` las operaciones `toggleTask(id)`, `editTask(id, newText)` y `deleteTask(id)`; cada una muta el estado, guarda y re-renderiza. `editTask` con texto vacío equivale a `deleteTask`. Aporta la lógica de las tres operaciones con persistencia automática.
2. Enriquecer el render: cada `li` contiene un checkbox de alternancia, el texto de la tarea y un botón de borrado; las completadas llevan la clase `done`. Aporta los puntos de interacción de las tres operaciones.
3. Añadir en `style.css` las reglas de la clase `done` (tachado) y del botón de borrado. Aporta la distinción visual exigida por los criterios.
4. Implementar el modo edición: doble clic sobre el texto sustituye el ítem por un campo de edición; Enter confirma (vacío → borra la tarea), Escape cancela sin cambios. Aporta la edición en línea.
5. Conectar los eventos por ítem dentro del render (toggle, doble clic, borrado, teclas del campo de edición). Aporta el cableado sin tocar `index.html` ni `init` salvo lo imprescindible.
6. Escribir los tests en `tests.html` en un módulo nuevo con el mismo aislamiento de `localStorage`. Aporta la cobertura de las tres operaciones y la regresión del arnés.

## Suite de pruebas esperada

- Alternar una tarea la marca como completada con su distinción visual y descuenta el contador; volver a alternarla lo revierte (caso de uso: completar y desmarcar).
- Editar una tarea actualiza su texto en el estado, la vista y el almacenamiento (caso de uso: editar).
- Confirmar una edición con el campo vacío borra la tarea, según la decisión documentada (borde de la edición).
- Cancelar la edición con Escape deja el texto original intacto (borde de la edición).
- Borrar una tarea la elimina del estado, de la vista y del almacenamiento (caso de uso: borrar).
- Completar, editar o borrar y recargar conserva los cambios (caso de uso: persistencia entre recargas).
- Los tests anteriores (arnés, crear y listar) siguen en verde (caso de uso: regresión).

## Revisión

- Subagente: 2026-09-21 — Aprueba (tras una corrección: test de regresión roto por la aserción sobre `li.textContent`; `editingId` saneado en `load`)
- Usuario: 2026-09-21 — Aprueba
