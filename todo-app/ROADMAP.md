# Roadmap

## Dirección

Completar la todo app en vanilla JS conforme a TodoMVC (D018 del repositorio raíz) hasta un producto usable y portable: consolidar primero el contrato de la vista, después las capacidades de planificación temporal, y por último la portabilidad del estado.

## Líneas de trabajo

- 1. docs/tasks/023-contrato-de-vista.md — Contrato de vista: snapshot y dispatch de acciones
  - Justificación: rompe el ciclo `App` ↔ `UI` y declara el contrato de la vista (hallazgo H1 de `docs/architecture-reviews/002-revision-arquitectura-vista.md`). Ejecutarla ahora hace que las regiones de vista de la épica 003 —fecha en la tarea, «vista hoy»— nazcan sobre el contrato nuevo; ejecutarla después obliga a migrar código recién escrito.
- 2. docs/tasks/024-proyeccion-y-eventos-unificados.md — Proyección de colecciones y mecanismo único de eventos
  - Justificación: completa el contrato de la tarea 023 —de la que depende— moviendo la proyección de colecciones al view-model y unificando la vinculación de eventos (hallazgos H2 y H3 del mismo informe). Va pegada a la 023 porque ambas forman un único refactor de la vista.
- 3. docs/epics/003-planificacion-temporal.md — Planificación temporal: fechas límite, programación y vista de hoy
  - Justificación: extiende el modelo con la fecha sin reestructurarlo y añade regiones de vista que, tras el par de refactor, se construyen sobre el contrato declarado en lugar de engrosar el render monolítico.
- 4. docs/epics/004-portabilidad-y-compartir.md — Portabilidad y listas compartidas sin servidor
  - Justificación: su plan técnico declara que el formato de exportación tolera las épicas anteriores según el orden de ejecución; ejecutarla última exporta el estado con su forma final y evita redefinir el formato versionado a mitad de camino.

## Revisión

- Usuario: 2026-09-25 — Aprueba
