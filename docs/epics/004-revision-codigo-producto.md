# Revisión de código como capacidad del producto

## Estado

[x] Planificada | [x] Completada

## Objetivo

Cualquier *pull request* del proyecto evaluado —lo haya producido el ciclo de tareas o no— puede someterse a la revisión independiente del sistema: informe persistido con hallazgos por severidad y veredicto, comentarios autocontenidos publicables bajo confirmación, y —para el autor— triage de la revisión recibida y mejora del cambio. Materializa la línea de Now del roadmap (propuesta `docs/proposals/003-revision-codigo-producto`).

## Alcance

- **Dentro:** cuatro skills —`revisar-pr`, `comentar-pr`, `clasificar-comentarios`, `mejorar-pr`— con sus documentos bajo las convenciones del proyecto evaluado, su registro en el manifiesto de distribución y la puerta de confirmación antes de cada efecto lateral (publicar comentarios, responder hilos, push).
- **Fuera:** diffs que no sean un PR (árbol local, rangos de commits); puertas mecánicas del proyecto evaluado (tests, lint, build); publicación sin confirmación; resolver hilos o responder al autor automáticamente; merge del PR revisado; rewiring del ciclo interno a `revisar-pr`; plataformas que `gh` no cubre.

## Piezas

- [x] docs/tasks/138-skill-revisar-pr.md — capacidad de revisión de PR arbitrario con informe y veredicto
- [x] docs/tasks/139-skill-comentar-pr.md — comentarios autocontenidos publicables con confirmación
- [x] docs/tasks/140-skill-clasificar-comentarios.md — triage de la revisión recibida en un PR propio
- [x] docs/tasks/141-skill-mejorar-pr.md — aplicar el triage sobre el cambio propio

## Plan técnico

- **Orden:** 138 → 139 (los comentarios leen el formato del informe) y 140 → 141 (la mejora consume el documento de triage). Los dos bloques pueden solaparse; el orden numérico fija primero el vocabulario del informe.
- **Dependencias:** 139 lee el formato del informe de 138; 141 consume el documento de triage de 140.
- **Decisiones transversales:**
  - El subagente revisor corre con contexto aislado y rol adversarial —los principios de `revisar-implementacion`, sin su contrato de archivo de tarea (plan nominal, suite esperada, desviaciones)—; «no hay hallazgos» es un veredicto válido.
  - Informe de revisión y documento de triage se escriben bajo ubicaciones de la convención del proyecto evaluado —configurables, como los demás artefactos—, no en literales.
  - Los comentarios publicados son *conventional comments* autocontenidos: expresan el problema, el anclaje en el código y el contexto que el autor necesita, sin remitir al informe.
  - Todo efecto lateral —publicar comentarios, responder hilos, push— va tras una confirmación humana; sin ella no hay efecto.
  - El PR se resuelve por número dado o por la rama actual vía `gh`; la intención del cambio se reconstruye desde la descripción del PR y los artefactos del proyecto, y lo no reconstruible va a preguntas abiertas, no a suposiciones.
  - Cada pieza registra su skill en el manifiesto de distribución del proyecto evaluado.

## Criterio de cierre

Los cuatro skills existen, están registrados en el manifiesto y ejecutan el lazo completo sobre un PR real del propio repositorio: `revisar-pr` produce informe y veredicto, `comentar-pr` publica tras confirmación, `clasificar-comentarios` produce el triage y `mejorar-pr` aplica las correcciones — todo dentro del alcance declarado.

## Revisión

- Usuario: 2026-10-12 — Aprueba
