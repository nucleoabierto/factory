# Crear, renombrar, eliminar listas y mover tareas entre ellas

## Tipo

desarrollo

## Objetivo

Dar a la persona el control sobre sus listas: crear una lista nueva, renombrarla, eliminarla sin perder tareas por descuido y mover tareas de una lista a otra para clasificar la captura rápida.

## Dependencias

- Borrador 02.

## Entrada

- La navegación por lista activa del borrador 02.
- La lista de entrada permanente del borrador 01.

## Resultado esperado

- Se puede crear una lista nueva con nombre no vacío; aparece en el selector y puede activarse.
- Se puede renombrar una lista existente, salvo la lista de entrada.
- Se puede eliminar una lista, salvo la de entrada: sus tareas pasan a la lista de entrada y, si era la activa, la vista vuelve a ella.
- Se puede mover una tarea de la lista activa a otra lista existente (mecanismo de clasificación posterior a la captura).
- Los nombres de lista no pueden quedar vacíos ni de solo espacios; se permite duplicados o se rechazan según se decida en la implementación, documentando la elección.

## Criterios de calidad

- Crear, renombrar y eliminar listas persiste entre recargas.
- Eliminar una lista no destruye tareas: reaparecen en la lista de entrada.
- La lista de entrada no puede renombrarse ni eliminarse.
- Mover una tarea la quita de la lista activa y la hace visible en la lista destino.
- La suite de `tests.html` pasa en verde con tests nuevos de cada operación.
- Sin errores en consola.

## Procedimiento sugerido

1. Añadir al dominio las operaciones de lista: crear, renombrar, eliminar (con reasignación de sus tareas a la entrada) y mover tarea entre listas.
2. Extender la persistencia si la forma de los datos lo requiere.
3. Cablear en la interfaz: creación de lista, renombrado, eliminación con su consecuencia visible y el gesto de mover una tarea a otra lista.
4. Escribir los tests de cada operación y de la protección de la lista de entrada; verificar en el navegador.

## Notas

- Los commits de este proyecto llevan el ámbito `todo-app` en Conventional Commits (`tipo(todo-app): descripción`).
- El gesto de «mover tarea» es la pieza que hace real el flujo de vaciado de bandeja descrito en la idea: capturar en Entrada y clasificar después.
