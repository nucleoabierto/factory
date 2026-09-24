# Múltiples listas: organizar las tareas por contexto

## Estado

[x] Planificada | [ ] Completada

## Objetivo

Abriendo `index.html`, la persona puede organizar sus tareas en listas nombradas: existe una lista de entrada permanente, cada tarea pertenece a una lista, la vista se acota a la lista activa con sus propios filtros y contador, se pueden crear, renombrar, eliminar y archivar listas, y mover tareas entre ellas. Los datos persistidos antes del cambio migran a la lista de entrada sin pérdida.

## Alcance

- **Dentro:** listas nombradas como agrupación exclusiva, lista de entrada permanente, lista activa con persistencia, contadores por lista, gestión de listas (crear, renombrar, eliminar reasignando sus tareas a la entrada, mover tareas) y archivar y reactivar listas.
- **Fuera:** planificación temporal (fechas, vistas por día), compartir o sincronizar, métricas por lista, jerarquía entre listas, reordenado manual de tareas ni de listas.

## Piezas

- [ ] docs/tasks/011-listas-en-el-modelo.md — Listas nombradas en el modelo y migración de la persistencia
- [ ] docs/tasks/012-navegacion-por-lista.md — Vista acotada a la lista activa con selector y contadores
- [ ] docs/tasks/013-gestion-de-listas.md — Crear, renombrar, eliminar listas y mover tareas entre ellas
- [ ] docs/tasks/014-archivar-listas.md — Archivar y reactivar listas sin perder su contenido

## Plan técnico

- **Orden:** 011 → 012 → 013 → 014, estrictamente secuencial: el modelo precede a la navegación, la navegación a la gestión y la gestión al archivo.
- **Dependencias:** cada pieza extiende el mismo `TaskList`/`Storage`/`UI`/`App` de `app.js` y alimenta la suite QUnit de `tests.html`.
- **Decisiones transversales:** la pertenencia tarea→lista es exclusiva; la lista de entrada es permanente (no se renombra, elimina ni archiva); eliminar una lista reasigna sus tareas a la entrada, nunca las destruye; la persistencia migra el formato plano anterior a la entrada; vanilla JS sin build, `localStorage` tolerante a datos corruptos, QUnit por CDN con aislamiento, Conventional Commits con ámbito `todo-app`.

## Criterio de cierre

Las cuatro piezas completadas, la suite de `tests.html` en verde, la aplicación funcional sin errores en consola y las tareas previas al cambio conservadas en la lista de entrada tras la migración.

## Revisión

- Usuario: 2026-09-24 — Aprueba
