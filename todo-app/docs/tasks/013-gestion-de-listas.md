# Crear, renombrar, eliminar listas y mover tareas entre ellas

## Estado

[ ] Pendiente | [ ] En progreso | [ ] En revisión | [x] Completada | [ ] Bloqueada

## Tipo

desarrollo

## Objetivo

Dar a la persona el control sobre sus listas: crear una lista nueva, renombrarla, eliminarla sin perder tareas por descuido y mover tareas de una lista a otra para clasificar la captura rápida.

## Dependencias

- 012

## Entrada

- La navegación por lista activa de la tarea 012.
- La lista de entrada permanente de la tarea 011.

## Resultado esperado

- Se puede crear una lista nueva con nombre no vacío; aparece en el selector y puede activarse.
- Se puede renombrar una lista existente, salvo la lista de entrada.
- Se puede eliminar una lista, salvo la de entrada: sus tareas pasan a la lista de entrada y, si era la activa, la vista vuelve a ella.
- Se puede mover una tarea de la lista activa a otra lista existente (mecanismo de clasificación posterior a la captura).
- Los nombres de lista no pueden quedar vacíos ni de solo espacios; se permiten duplicados o se rechazan según se decida en la implementación, documentando la elección.

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
3. Cablear en la interfaz: creación de lista, renombrado, eliminación con su consecuencia visible y la acción de mover una tarea a otra lista.
4. Escribir los tests de cada operación y de la protección de la lista de entrada; verificar en el navegador.

## Notas

- Los commits de este proyecto llevan el ámbito `todo-app` en Conventional Commits (`tipo(todo-app): descripción`).
- La acción de «mover tarea» es la pieza que hace real el flujo de vaciado de bandeja descrito en la idea: capturar en Entrada y clasificar después.

## Plan técnico

El subsistema es `app.js`: `TaskList` (dominio con listas nombradas y lista activa ya cableada en `App`), `Storage`, `UI` y `App` (fachada). La gestión añade operaciones de lista al dominio, las expone por la fachada y las ofrece en la interfaz con controles junto al selector y un «mover a…» por tarea.

- [x] Añadir a `TaskList` las operaciones `addList(name)`, `renameList(id, name)`, `deleteList(id)` y `moveTask(taskId, listId)`
  - Aporta: el dominio conoce la gestión de listas con sus invariantes: nombres no vacíos tras trim, nombre e id únicos (rechazo de duplicados), entrada no renombrable ni eliminable, eliminar reasigna sus tareas a la entrada y mover exige tarea y destino existentes
  - Contexto: el id de una lista nueva se genera único entre los existentes (prefijo `list-`); la unicidad de nombre se compara insensible a mayúsculas tras trim — elección de implementación: nombres duplicados rechazados
- [x] Exponer en `App` las cuatro operaciones delegando en el modelo
  - Aporta: la fachada ofrece la gestión completa; `deleteList` devuelve `activeListId` a la entrada y persiste la corrección cuando la lista eliminada era la activa
- [x] Cablear la gestión en `UI` e `index.html`: botones crear/renombrar/eliminar junto al selector y select «mover a…» en cada tarea
  - Aporta: la interfaz ofrece las cuatro operaciones; renombrar y eliminar se deshabilitan cuando la lista activa es la entrada
  - Contexto: crear y renombrar piden el nombre con `window.prompt` — stubbable en tests—; el «mover a…» por `<li>` lista las demás listas y se muestra solo al hover, como `.destroy`
- [x] Estilar los controles nuevos en `style.css` coherentes con la paleta y el patrón visual existente
  - Aporta: los elementos nuevos llegan terminados también en lo visual, no solo en lo funcional
  - Contexto: experiencia registrada en la tarea 012 — la parte visual entra en el plan, no como corrección posterior
- [x] Escribir los tests de cada operación, la protección de la entrada y la persistencia entre recargas
  - Aporta: la suite cubre los criterios de calidad de la tarea
  - Contexto: módulo nuevo en `tests.html` siguiendo el patrón `beforeEach` existente, con el fixture ampliado a los controles de gestión

## Suite de pruebas esperada

- Crear una lista con nombre válido la añade al modelo, al selector y puede activarse, persistiendo entre recargas (crear lista).
- Crear con nombre vacío o de solo espacios no crea nada (validación de nombre).
- Crear o renombrar con un nombre ya usado por otra lista no cambia el estado (unicidad de nombre).
- Renombrar una lista actualiza su nombre en el selector y sobrevive a la recarga; la entrada no puede renombrarse ni quedar con nombre vacío (renombrar con protección).
- Eliminar una lista reasigna sus tareas a la entrada —visibles allí— y, si era la activa, la vista vuelve a la entrada; la entrada no puede eliminarse (eliminar sin pérdida).
- Mover una tarea la quita de la lista activa, la hace visible en la lista destino y persiste (clasificar tras la captura).

## Revisión

- Subagente: 2026-09-25 — Aprueba
- Usuario: 2026-09-25 — Aprueba
