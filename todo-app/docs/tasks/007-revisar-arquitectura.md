# Revisar la arquitectura del dominio

## Estado

[ ] Pendiente | [ ] En progreso | [ ] En revisión | [ ] Completada | [ ] Bloqueada

## Tipo

mantenimiento

## Objetivo

Ejecutar el skill `revisar-arquitectura` sobre el dominio de todo-app como primera validación de la capacidad: evaluar `app.js` con la rúbrica DDD (lenguaje ubicuo, separación del modelo frente a persistencia y presentación, fronteras, invariantes, catálogo de smells) y producir el informe con hallazgos priorizados como órdenes de reparación.

## Dependencias

- 006 (el documento de dominio es la intención declarada contra la que se evalúa)

## Entrada

- El skill `revisar-arquitectura` y su `references/rubrica.md`.
- `todo-app/app.js` como código del dominio.
- El documento de dominio creado en la tarea 006 (`docs/domains/001-*.md` del proyecto raíz) y las decisiones `docs/decisions/` relevantes (p. ej. D018: vanilla JS como decisión de la PoC).

## Resultado esperado

- Un informe de revisión presentado al usuario: veredicto por criterio con evidencia y confianza, hallazgos priorizados como órdenes de reparación (criterio, evidencia, objetivo, restricciones, validación, confianza) y recomendaciones.
- Los hallazgos que el usuario apruebe actuar se dan de alta como tareas con `crear-tareas` en el contexto de todo-app; nada se corrige directamente.

## Criterios de calidad

- El informe evalúa el dominio sin prescribir una arquitectura concreta: si detecta concentración de características, la recomendación emerge del hallazgo, no de una plantilla.
- Cada hallazgo cita evidencia concreta de `app.js` (elemento y comportamiento).
- Se respeta la decisión registrada de vanilla JS sin framework: una recomendación que la contradiga debe explicitarlo.

## Procedimiento sugerido

1. Invocar `revisar-arquitectura` sobre el dominio de todo-app.
2. Presentar el informe; derivar a tareas o decisiones solo lo que el usuario apruebe.

## Notas

- Es la primera ejecución real del skill: las fricciones encontradas son material para `EXPERIENCIAS.md`.

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario: [fecha] — [Aprueba | Solicita cambios]
