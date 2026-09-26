# Extender el roadmap a horizontes Now/Next/Later

## Estado

[ ] Pendiente | [ ] En progreso | [ ] En revisión | [x] Completada | [ ] Bloqueada

## Tipo

desarrollo

## Objetivo

Extender `planificar-roadmap` y la plantilla `assets/roadmap.md` para que el roadmap organice las líneas de trabajo en horizontes de confianza —Now, Next, Later— con estado por línea y una sección «No ahora» para lo explícitamente aparcado, manteniendo la justificación por posición dentro de cada horizonte.

## Dependencias

- Ninguna

## Entrada

- `.agents/skills/planificar-roadmap/SKILL.md` y `assets/roadmap.md` — el formato actual de orden lineal justificado.
- `docs/decisions/D022-roadmap-como-nivel-de-direccion.md` — el roadmap como fuente de dirección y su relación con `TODO.txt`.
- `docs/research/2026-09-documentacion-producto-y-roadmap.md`, sección 4 — el patrón Now/Next/Later, límites por horizonte, «No hacemos» y trazabilidad a objetivos.

## Resultado esperado

- La plantilla `assets/roadmap.md` con las secciones Dirección, Now, Next, Later, No ahora y Revisión.
- `SKILL.md` de `planificar-roadmap` actualizado: criterios de pertenencia a cada horizonte (Now = comprometido y en vuelo, acotado; Next = validado y próximo; Later = dirección sin compromiso ni orden interno; No ahora = aparcado con su razón), estado por línea y nueva regla de reflejo: `TODO.txt` solo refleja Now y Next; Later y No ahora viven solo en el roadmap.

## Criterios de calidad

- La justificación por posición se mantiene como mecanismo dentro de Now y Next; Later agrupa por tema sin orden.
- Los principios rectores existentes (roadmap decide/índice ejecuta, orden preferente no bloqueo, puerta humana) se conservan o se adaptan declarándolo.
- La relación con `TODO.txt` queda redefinida sin ambigüedad: qué horizontes se reflejan y cómo.
- El documento sigue siendo vivo y único, sin serie de roadmaps ni fechas comprometidas.
- La decisión de diseño resultante queda registrada en `docs/decisions/` como parte del cierre de la tarea.

## Procedimiento sugerido

1. Redactar la estructura nueva de `assets/roadmap.md` con la semántica de cada horizonte.
2. Actualizar el procedimiento del skill: inventario de líneas, asignación de horizonte (con la justificación como evidencia), reflejo parcial en `TODO.txt`.
3. Revisar coherencia con `planificar` (la épica no cambia) y con D022.
4. Aplicar revisión de redacción y pulido en modo preventivo.
5. Registrar con `decisiones-diseno` la decisión que consolida esta tarea: la extensión del roadmap a horizontes, declarada como extensión de D022 y no como sustitución.

## Notas

- La relación Later↔propuestas en revisión de `TODO.txt` conviene declararla: una propuesta `[p]` no es una línea del roadmap hasta que se aprueba y planifica.

## Revisión

- Subagente: 2026-09-25 — Aprueba (observación menor: el frontmatter no declaraba el reflejo parcial; corregida en la misma revisión)
- Usuario: 2026-09-25 — Aprueba
