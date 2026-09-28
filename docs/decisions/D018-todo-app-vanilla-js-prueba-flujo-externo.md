# D018: Todo app en vanilla JS como prueba del flujo externo

## Estado

Aceptada

## Contexto

La visión declara que el producto entregable se valida construyendo un proyecto real con el sistema, no solo usándolo sobre sí mismo. El motor interno está completo (idea → tarea → commit, con revisión dual y aprendizaje) y es hora de probarlo sobre un proyecto externo. Las opciones para el proyecto de prueba eran varias; la todo app destaca por ser el estándar de facto de ejemplos, con especificación escrita. Las opciones de stack eran framework o vanilla JS; las de ubicación, repositorio independiente o subcarpeta del propio proyecto.

## Decisión

Adoptamos una todo app conforme a la especificación TodoMVC como proyecto de validación externa. La construimos en vanilla JS, sin frameworks, dentro de la subcarpeta `todo-app/` del repositorio.

## Justificación

La todo app es el ejemplo de comparación estándar desde hace más de una década y cuenta con una especificación escrita (`app-spec.md`) que ya define la forma esperada: nueve requisitos funcionales verificables, estructura de archivos y convenciones. Eso convierte la validación en una comprobación objetiva, no en una apreciación. Vanilla JS elimina la variable del framework: la prueba mide el proceso (flujo de idea a tarea a commit), no el desarrollo ni la idoneidad de una tecnología. La subcarpeta, frente a un repositorio independiente, mantiene la prueba de concepto conviviendo con el sistema que la produce —versionada junto a las decisiones y lecciones que la motiven— sin necesidad de coordinar dos repos.

El alcance de la validación queda delimitado: cubre la portabilidad de los skills y el ciclo completo idea → propuesta → tareas → ejecución → commit; no cubre gestión de pull requests, revisión de código ni épicas, capacidades que el sistema aún no tiene. Las lagunas que la prueba revele se registrarán como experiencias y nuevas tareas.

## Referencias

- TodoMVC, especificación de la aplicación (`app-spec.md`) — github.com/tastejs/todomvc
- Visión del proyecto, «Validar externamente» — `product-docs/vision.md`
- Investigación «Todo apps como base de trabajo para la prueba de concepto» — `docs/research/2026-09-todo-apps-base-trabajo.md`
- Tarea 051 — `docs/tasks/051-registrar-decision-todo-app-poc.md`
