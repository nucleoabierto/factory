# Roadmap

## Dirección

Completar la todo app en vanilla JS conforme a TodoMVC (D018 del repositorio raíz) hasta un producto usable y portable: consolidar primero el contrato de la vista, después las capacidades de planificación temporal, y por último la portabilidad del estado.

## Now

- 1. docs/tasks/024-proyeccion-y-eventos-unificados.md — Proyección de colecciones y mecanismo único de eventos
  - Estado: pendiente de arrancar
  - Justificación: completa el contrato de la vista que la tarea 023 estableció en una primera entrega —moviendo la proyección de colecciones al view-model y unificando la vinculación de eventos (hallazgos H2 y H3 de `docs/architecture-reviews/002-revision-arquitectura-vista.md`)—. Va ahora porque la épica 003 construye regiones de vista nuevas que deben nacer sobre el contrato cerrado, no sobre el render monolítico.

## Next

- 1. docs/epics/003-planificacion-temporal.md — Planificación temporal: fechas límite, programación y vista de hoy
  - Justificación: extiende el modelo con la fecha sin reestructurarlo y añade regiones de vista que, tras el par de refactor, se construyen sobre el contrato declarado. Es la siguiente línea validada cuando Now se vacía.
- 2. docs/epics/004-portabilidad-y-compartir.md — Portabilidad y listas compartidas sin servidor
  - Justificación: su plan técnico declara que el formato de exportación tolera las épicas anteriores según el orden de ejecución; ejecutarla última exporta el estado con su forma final y evita redefinir el formato versionado a mitad de camino.

## Later

- Ninguna línea: todo el trabajo abierto está comprometido; esta sección recogerá la dirección siguiente cuando aparezca.

## No ahora

- Sincronización continua y colaboración en vivo — aparcada: exige un servidor, contra el principio sin backend que rige el producto (fuera de la épica 004). Se reconsideraría si apareciera una forma de compartir sin servidor que la habilite.
- Integración con calendarios y vista de calendario — aparcada: fuera del alcance de la planificación temporal, que cubre solo fechas límite y vista «hoy» (fuera de la épica 003).
- Organización avanzada de listas — jerarquía, reordenado manual y métricas — aparcada: la épica 002 la descartó para mantener el modelo simple; cabría si el uso real la demanda.
- Productividad avanzada — prioridades, etiquetas, búsqueda, deshacer — aparcada: fuera de la épica 001; encarecerían el modelo y la vista sin que TodoMVC lo exija.

## Revisión

- Usuario: 2026-09-25 — Aprueba
