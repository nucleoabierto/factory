# Roadmap

## Dirección

Completar la todo app en vanilla JS conforme a TodoMVC (D018 del repositorio raíz) hasta un producto usable y portable: con el contrato de la vista ya cerrado, consolidar la planificación temporal corrigiendo primero la coherencia de la vista «hoy», y por último la portabilidad del estado.

## Now

- 1. docs/tasks/027-vista-hoy-y-listas-archivadas.md — La vista «hoy» y las listas archivadas
  - Estado: pendiente de arrancar
  - Justificación: decide el alcance de la consulta transversal «hoy» —si incluye o no las listas archivadas—, y esa decisión condiciona qué muestran y sobre qué actúan las otras dos correcciones de la vista. Va primero porque fija el conjunto de tareas que 025 y 026 manejan.
- 2. docs/tasks/025-limpiar-completadas-en-vista-hoy.md — Limpiar completadas coherente con la vista activa
  - Estado: pendiente de arrancar
  - Justificación: alinea «Limpiar completadas» con lo que el filtro «Completadas» muestra en «hoy». Va después de 027 porque su dominio de actuación es exactamente el conjunto que 027 define.
- 3. docs/tasks/026-crear-tarea-en-vista-hoy.md — La tarea creada desde la vista «hoy» no desaparece al crearla
  - Estado: pendiente de arrancar
  - Justificación: caso borde acotado e independiente; se resuelve sobre la semántica de «hoy» ya fijada por las dos anteriores.
- 4. docs/tasks/019-tareas-recurrentes.md — Periodicidad simple que regenera la tarea al completarla
  - Estado: pendiente de arrancar
  - Justificación: cierra la épica 003. Modifica el flujo de completar y de limpiar completadas, así que conviene construirla sobre el comportamiento ya corregido y no encima de los hallazgos abiertos.

## Next

- 1. docs/epics/004-portabilidad-y-compartir.md — Portabilidad y listas compartidas sin servidor
  - Justificación: su plan técnico declara que el formato de exportación tolera las épicas anteriores según el orden de ejecución; ejecutarla última exporta el estado con su forma final —incluida la recurrencia de la épica 003— y evita redefinir el formato versionado a mitad de camino.

## Later

- Ninguna línea: todo el trabajo abierto está comprometido; esta sección recogerá la dirección siguiente cuando aparezca.

## No ahora

- Sincronización continua y colaboración en vivo — aparcada: exige un servidor, contra el principio sin backend que rige el producto (fuera de la épica 004). Se reconsideraría si apareciera una forma de compartir sin servidor que la habilite.
- Integración con calendarios y vista de calendario — aparcada: fuera del alcance de la planificación temporal, que cubre solo fechas límite y vista «hoy» (fuera de la épica 003).
- Organización avanzada de listas — jerarquía, reordenado manual y métricas — aparcada: la épica 002 la descartó para mantener el modelo simple; cabría si el uso real la demanda.
- Productividad avanzada — prioridades, etiquetas, búsqueda, deshacer — aparcada: fuera de la épica 001; encarecerían el modelo y la vista sin que TodoMVC lo exija.

## Revisión

- Usuario: 2026-09-26 — Aprueba
