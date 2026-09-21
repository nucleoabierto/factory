# Crear tareas, listarlas, contar pendientes y persistir

## Estado

[ ] Pendiente | [ ] En progreso | [ ] En revisión | [x] Completada | [ ] Bloqueada

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

## Plan técnico

Subsistema: `index.html` ya contiene el esqueleto (campo `#new-todo`, lista `#todo-list`, contador `#todo-count`, filtros y botón de limpiar que corresponden a tareas posteriores y no se tocan); `app.js` expone el objeto global `App` con `init()` vacío como costura donde cuelga esta lógica; `tests.html` aloja la suite QUnit por CDN. El cambio encaja íntegramente en `app.js` y en la sección de tests de `tests.html`.

1. Definir en `App` el modelo de tarea `{id, text, done}` y el estado como un arreglo en memoria. Aporta la representación única de la que dependen render, contador y persistencia.
2. Implementar la persistencia: funciones de cargar y guardar en `localStorage` con clave propia (`todoapp-tasks`); la carga tolera clave ausente o JSON corrupto devolviendo lista vacía; se guarda en cada mutación. Aporta la conservación entre recargas.
3. Implementar la creación: una acción que recorta espacios, rechaza cadenas vacías, crea la tarea con `done: false` e `id` único, muta el estado, persiste y re-renderiza. Aporta el caso de uso central de la tarea.
4. Implementar el renderizado: reconstruir `#todo-list` desde el estado (ítems solo con el texto; sin checkbox ni acciones, reservados a 004) y actualizar `#todo-count` con el número de pendientes. Aporta que la vista derive siempre del estado.
5. Conectar en `init()`: cargar el estado persistido, enlazar la tecla Enter de `#new-todo` con la creación, limpiar el campo tras crear y hacer el primer render. Aporta el arranque sin alterar el contrato del script clásico.
6. Escribir los tests en `tests.html` en un módulo nuevo con aislamiento de `localStorage` (limpiar la clave antes de cada test). Aporta la cobertura exigida por los criterios sin romper el test de humo existente.

## Suite de pruebas esperada

- Crear una tarea con texto válido la añade al estado y aparece en la lista (caso de uso: crear una tarea).
- Confirmar con texto vacío o solo espacios no crea ninguna tarea (caso de uso: rechazar entrada inválida).
- Crear varias tareas deja el contador en el número correcto de pendientes (caso de uso: consultar pendientes tras crear).
- Tras crear tareas, la clave de `localStorage` contiene la lista; al cargar de nuevo, el estado se restaura con las mismas tareas (caso de uso: persistir entre recargas).
- Con la clave ausente, el estado inicial es una lista vacía; con JSON corrupto en la clave, la carga devuelve lista vacía sin lanzar excepción (caso de uso: tolerar datos ausentes o corruptos).
- El test de humo de la tarea 002 sigue en verde (caso de uso: regresión del arnés).

## Desviaciones del plan

- Los ítems renderizados llevan `data-id` con el identificador de la tarea, atributo no declarado en la acción 4 del plan. Motivo: es el gancho que las tareas 004–005 necesitarán para identificar cada ítem sin parsear el DOM. Decisión: registrado como desviación menor en la revisión; no añade comportamiento visible ni adelanta funcionalidad de tareas futuras.

## Revisión

- Subagente: 2026-09-21 — Aprueba
- Usuario: 2026-09-21 — Aprueba (tras correcciones: código y tests en inglés; guard de init)
