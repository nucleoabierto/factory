# Roadmap

## Dirección

Completar la todo app en vanilla JS conforme a TodoMVC (D018 del repositorio raíz) hasta un producto usable y portable: primero una base de código moderna, después las capacidades de organización y planificación, y por último la portabilidad del estado.

## Líneas de trabajo

- 1. docs/tasks/015-migrar-es5-a-es2024.md — Migrar el código de ES5 a ES2024
  - Justificación: reescribe `app.js` completo y su costo depende de la posición. Ejecutarla primero migra el código actual en una pasada acotada y las épicas nacen ya en sintaxis moderna; ejecutarla después obliga a migrar también todo el código que las épicas añadan —doble trabajo y mezcla de estilos durante más tiempo.
- 2. docs/epics/002-multiples-listas.md — Múltiples listas: organizar las tareas por contexto
  - Justificación: reestructura el modelo y la persistencia en torno a las listas; conviene antes que la épica 003 para que la planificación temporal y su «vista hoy» nazcan transversales a listas en lugar de integrarse después con una estructura que aún no existe.
- 3. docs/epics/003-planificacion-temporal.md — Planificación temporal: fechas límite, programación y vista de hoy
  - Justificación: extiende el modelo con la fecha sin reestructurarlo; encaja tras la épica 002 porque su vista «hoy» se declara transversal aunque existan listas, y antes que la 004 para que el formato de exportación cubra el estado con fechas.
- 4. docs/epics/004-portabilidad-y-compartir.md — Portabilidad y listas compartidas sin servidor
  - Justificación: su plan técnico declara que el formato de exportación tolera las épicas 002 y 003 según el orden de ejecución; ejecutarla última exporta el estado con su forma final y evita redefinir el formato versionado a mitad de camino.

## Revisión

- Usuario: 2026-09-24 — Aprueba
