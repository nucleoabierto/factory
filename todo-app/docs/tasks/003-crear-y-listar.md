# Crear tareas, listarlas, contar pendientes y persistir

## Estado

[ ] Pendiente | [ ] En progreso | [ ] En revisión | [ ] Completada | [ ] Bloqueada

## Tipo

desarrollo

## Objetivo

Permitir crear tareas desde el campo de entrada, mostrarlas en la lista, ver cuántas quedan pendientes y conservar la lista entre recargas. Cada comportamiento queda cubierto por tests.

## Dependencias

- 002

## Entrada

- La estructura de la página y el arnés QUnit creados en la tarea 002.

## Resultado esperado

- Al escribir un texto y confirmar, la tarea aparece en la lista.
- La lista se renderiza desde el estado en memoria.
- La capa de persistencia guarda la lista en `localStorage` en cada cambio y la carga al iniciar, con una clave propia y tolerancia a datos ausentes o corruptos.
- El contador muestra el número de tareas pendientes y se actualiza al crear.
- Tests QUnit en `tests.html` que cubren el modelo, la creación (incluido el rechazo de textos vacíos), el contador y la persistencia. El aislamiento de `localStorage` entre tests es obligatorio.

## Criterios de calidad

- Crear una tarea la muestra en la lista y persiste al recargar la página.
- No se crean tareas vacías ni de solo espacios.
- El contador refleja el número correcto de pendientes tras crear varias tareas y recargar.
- Si `localStorage` contiene datos corruptos en la clave, la carga devuelve una lista vacía sin romperse.
- La suite de `tests.html` pasa en verde, incluidos los tests nuevos.
- Sin errores en consola.

## Procedimiento sugerido

1. Definir el modelo de una tarea (texto, estado completada, identificador) y el estado en memoria, expuestos en el objeto de lógica de la tarea 002.
2. Implementar la persistencia: guardar en `localStorage` en cada cambio y cargar al iniciar, con manejo de errores de parseo.
3. Implementar el renderizado de la lista a partir del estado.
4. Conectar el campo de entrada (formulario o tecla Enter) con la creación de tareas, validando texto no vacío.
5. Implementar el contador de pendientes y actualizarlo en cada renderizado.
6. Escribir los tests QUnit de cada comportamiento y verificar en el navegador tanto `index.html` como `tests.html`.

## Notas

- Los commits de este proyecto llevan el ámbito `todo-app` en Conventional Commits (`tipo(todo-app): descripción`).

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario: [fecha] — [Aprueba | Solicita cambios]
