# Skill de revisión de arquitectura

## Estado

[ ] Pendiente | [ ] En progreso | [ ] En revisión | [x] Completada | [ ] Bloqueada

## Tipo

mantenimiento

## Objetivo

Crear el skill `revisar-arquitectura`, que evalúa la arquitectura de un dominio con criterios de Domain Driven Design y produce un informe con evidencia, hallazgos priorizados y recomendaciones como órdenes de reparación, sin implementar cambios. Es una capacidad bajo demanda: la invoca el usuario o la recomienda `documentar-dominio` al detectar divergencia estructural.

## Dependencias

- 071
- 072 (crea `docs/domains/`, que este skill usa como fuente de intención declarada)

## Entrada

- La investigación `docs/research/2026-09-revision-arquitectura-y-documentacion-dominio.md`, en particular las secciones 1 (fundamentos DDD), 2 (métodos de evaluación) y 3 (catálogo de patrones y antipatrones con sus estrategias de detección).
- La rúbrica de evaluación: lenguaje ubicuo, separación de capas (dominio vs. aplicación/infraestructura/presentación), fronteras del contexto, invariantes del modelo, acoplamiento, y smells del catálogo (dependencia cíclica, componente dios, concentración de características, funcionalidad dispersa, modelo anémico, etc.).
- `docs/domains/` como fuente de intención declarada: la revisión evalúa el código contra la arquitectura y el glosario documentados.
- Las convenciones de skills del proyecto: frontmatter con `name`, `description` y sinónimos; secciones Cuándo usar / Cuándo no usar / Entrada / Salida / Principios rectores / Procedimiento / Finalización / Referencias.

## Resultado esperado

- `.agents/skills/revisar-arquitectura/SKILL.md` creado siguiendo las convenciones del proyecto.
- La rúbrica y el catálogo de smells como referencia del skill (p. ej. `references/rubrica.md`), declarada abierta y extensible.
- El informe de revisión con formato definido: veredicto por criterio con evidencia, hallazgos priorizados y recomendaciones como orden de reparación (regla violada, objetivo, restricciones, validación).

## Criterios de calidad

- El skill evalúa el dominio con DDD sin prescribir una arquitectura concreta: puede llegar a conclusiones como separar modelo/vista/controlador sin sesgarse hacia ellas.
- El skill no implementa cambios: los hallazgos derivan en tareas vía `crear-tareas` o en decisiones vía `decisiones-diseno`.
- Distingue lo mecánicamente comprobable (ciclos de dependencias, tamaño, nombres del glosario ausentes en el código) de lo que requiere juicio, y calibra la confianza de cada veredicto.
- Las reglas se describen inline; las citas a documentos van solo en la sección de referencias (lección de estabilidad temporal).
- La rúbrica se declara abierta y extensible (lección de flexibilidad en procesos).

## Procedimiento sugerido

1. Revisar un skill de revisión existente (`revisar-implementacion`, `revisar-redaccion`) para replicar convenciones de informe y veredicto.
2. Redactar `references/rubrica.md` con los criterios DDD y el catálogo de smells con sus estrategias de detección.
3. Redactar `SKILL.md` con el procedimiento: delimitar el dominio, recopilar evidencia, evaluar por criterio, priorizar hallazgos, emitir informe.

## Notas

- La evaluación de la PoC en la investigación sirve como caso de ejemplo esperado: un componente que concentra dominio, persistencia y presentación debería producir un hallazgo de concentración de características.

## Revisión

- Subagente: 2026-09-21 — Aprueba (con observaciones menores corregidas: catálogo como subconjunto deliberado, capas sin presuponer arquitectura, atribución a Referencias)
- Usuario: 2026-09-21 — Aprueba
