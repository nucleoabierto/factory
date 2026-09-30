# Roadmap

## Dirección

`modern-todo-app` es la prueba de concepto que valida el ciclo de desarrollo de Factory sobre un proyecto web moderno real —no sobre un ejemplo reducido—. La dirección del producto es construir, por capas verificables, una aplicación de lista de tareas que una persona usaría de verdad, y que a la vez obligue al proceso a enfrentar cada forma de dificultad que declara manejar.

El arco del desarrollo suma capacidades en orden creciente de compromiso arquitectónico:

1. **Terreno** — el proyecto existe con toolchain real: dependencias, tipado estricto, build y una verificación ejecutable por comando. La aplicación aún no hace nada, pero ya es un proyecto.
2. **Aplicación** — el ciclo de vida de la tarea: capturar, completar, editar, borrar, filtrar y conservar entre visitas. Es la versión más pequeña que alguien usaría, y la que fija el modelo de estado del dominio.
3. **Servicio** — la lista deja de vivir en un solo navegador: el dominio se expone por una API con contrato, persistencia real y errores de red que gestionar. El cliente pasa a ser una vista de un estado que vive fuera.
4. **Herramienta** — la gestión escala con la lista: prioridades, etiquetas, búsqueda y deshacer convierten la lista en una herramienta de organización, con los invariantes más densos del arco.
5. **Producto confiable** — la aplicación funciona sin red, encola operaciones y reconcilia al volver, con política declarada de resolución de conflictos e instalabilidad fuera del navegador.

El nivel de sofisticación esperado no es el de una demo: cada estación es un producto honesto de su categoría, y la aplicación final —persistencia real, dominio denso, operación offline reconciliada— es el tipo de software que un equipo construiría para producción. La sofisticación está al servicio de la PoC: cada salto introduce una clase de problema que la anterior no tenía —contrato distribuido, invariantes con casos borde, relojes sin autoridad única— y cada pieza queda sujeta a la misma exigencia de verificación por comando con cobertura total. Si el proceso sostiene ese nivel, sostiene el proyecto.

## Now

- 1. `docs/ideas/001-andamiaje-react-pipeline.md` — Andamiaje del proyecto
  - Estado: completada (épica `001-andamiaje-proyecto`, commit `da74a2b`).
  - Justificación: punto de partida del arco. Entregó el proyecto instalable, la verificación por comando único con cobertura al 100% y la pantalla propia; todo lo demás lo presupone.
- 2. `docs/ideas/002-nucleo-todomvc.md` — Núcleo TodoMVC
  - Estado: pendiente de arrancar (idea sin procesar).
  - Justificación: primera línea de dominio y la que todas las demás necesitan —sin ciclo de vida de la tarea no hay nada que persistir, organizar ni sincronizar—. Además es donde se decide el modelo de estado en React, la decisión que más condiciona el coste de 003 y 005.

## Next

- 1. `docs/ideas/003-backend-persistencia.md` — Backend y persistencia real
  - Justificación: antes que 004 por su efecto cruzado —con la frontera cliente-servidor ya real, cada capacidad nueva se diseña una vez contra el modelo distribuido; al revés, la API nacería completa pero a ciegas—. Además es la única pieza que 005 puede sincronizar.
- 2. `docs/ideas/004-organizacion-avanzada.md` — Organización avanzada
  - Justificación: entre 003 y 005. Concentra los invariantes más densos del arco —prioridad, etiquetas, búsqueda, deshacer— y su conflicto con la cola de sincronización («deshacer» local frente a operaciones encoladas) se decide aquí, cuando más barato sale.
- 3. `docs/ideas/005-offline-sincronizacion.md` — Offline y sincronización
  - Justificación: cierra el arco por construcción —presupone el backend y un modelo ya estabilizado por 004, porque sincronizar un modelo que aún cambia multiplica los conflictos—. Es la línea más exigente; su forma se revisará al cerrar 003 y 004.

## Later

- Identidad y pertenencia de las listas — las ideas 003 y 005 la presuponen como ancla futura (listas con dueño, dos dispositivos con identidad plena); ninguna idea la cubre todavía.
- Colaboración en tiempo real — el salto natural tras la sincronización; solo tiene sentido evaluarla con el arco actual cerrado.

## No ahora

- CI remota y despliegue — excluida expresamente del alcance del andamiaje; la verificación local por comando cubre la PoC. Se reconsidera si aparece un entorno donde desplegar.
- Guía de estilo formal (`DESIGN.md`) — la pantalla actual es deliberadamente mínima; se revisa cuando la superficie visual justifique un contrato de diseño.

## Revisión

- Usuario: 2026-09-30 — Aprueba
