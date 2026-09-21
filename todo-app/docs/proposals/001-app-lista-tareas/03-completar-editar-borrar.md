# Completar, editar y borrar tareas

## Objetivo

Permitir marcar una tarea como completada, editar su texto y borrarla de la lista, con tests que lo verifiquen.

## Dependencias

- Borrador 02

## Entrada

- La lista funcional con creación, contador, persistencia y tests del borrador 02.

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
