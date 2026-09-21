# Aplicación de lista de tareas

## Estado

[x] Planificada | [x] Completada

## Objetivo

La aplicación de lista de tareas funciona en el navegador abriendo `index.html`: permite crear, completar, editar y borrar tareas, ver cuántas quedan pendientes, filtrar la vista y limpiar las completadas, con la lista persistida en `localStorage` y cada comportamiento cubierto por la suite QUnit de `tests.html`.

## Alcance

- **Dentro:** la página única con su arnés de tests, las operaciones sobre tareas, el contador, los filtros y la persistencia local.
- **Fuera:** multiusuario, sincronización, fechas límite, prioridades, etiquetas, búsqueda, deshacer, reordenar, importar/exportar y cualquier dependencia de build, framework o backend.

## Piezas

- [x] docs/tasks/002-estructura-base.md — Estructura de la página y arnés de tests
- [x] docs/tasks/003-crear-y-listar.md — Crear tareas, listarlas, contar pendientes y persistir
- [x] docs/tasks/004-completar-editar-borrar.md — Completar, editar y borrar tareas
- [x] docs/tasks/005-filtros-y-limpiar.md — Filtros de vista y limpieza de completadas

## Plan técnico

- **Orden:** 002 → 003 → 004 → 005, estrictamente secuencial por dependencias en cadena.
- **Dependencias:** cada pieza usa el objeto de lógica global que 002 define y alimenta la suite QUnit del mismo arnés.
- **Decisiones transversales:** vanilla JS sin build ni módulos ES (script clásico que expone un objeto `App` accesible); persistencia en `localStorage` con clave propia y tolerancia a datos corruptos; tests QUnit por CDN en `tests.html` con aislamiento de `localStorage`; commits Conventional Commits con ámbito `todo-app`.

## Criterio de cierre

Las cuatro piezas completadas, la suite de `tests.html` en verde y la aplicación funcional al abrir `index.html` sin errores en consola.

## Revisión

- Usuario: 2026-09-21 — Aprueba
