# Crear el skill documentar-guia-estilo

## Estado

[ ] Pendiente | [ ] En progreso | [ ] En revisión | [x] Completada | [ ] Bloqueada

## Tipo

mantenimiento

## Objetivo

Crear el skill `documentar-guia-estilo`: genera la guía de estilo de diseño de un proyecto evaluado (`DESIGN.md` en su raíz + tokens como CSS custom properties) y la mantiene viva como sensor al cierre de tareas de frontend, simétrico a `documentar-dominio` (D021). La investigación `docs/research/2026-09-guias-estilo-frontend-agentes.md` es su fundamento.

## Dependencias

- Ninguna.

## Entrada

- `docs/research/2026-09-guias-estilo-frontend-agentes.md` — conclusiones sobre forma, contenido y mantenimiento de la guía.
- Las decisiones y lecciones que rigen la creación de skills: D003 (skills autocontenidos), D004 (estándar Agent Skills), D005 (SKILL.md < 500 líneas, detalle en `references/`), lecciones `contratos-de-skills`, `consistencia-de-formatos`, `flexibilidad-en-procesos`, `vocabulario` y `diseno-de-artefactos`.
- Los skills simétricos existentes como modelo: `.agents/skills/documentar-dominio/` y `.agents/skills/documentar-producto/`.

## Resultado esperado

- `.agents/skills/documentar-guia-estilo/SKILL.md` con frontmatter `name` y `description` a nivel de capacidad (generar y mantener viva la guía, no la mecánica), siguiendo la estructura común de los skills del proyecto: cuándo usar / cuándo no, entrada, salida, principios rectores, procedimiento, finalización.
- `references/` con el material detallado que el cuerpo cargue bajo demanda: como mínimo la plantilla/secciones del `DESIGN.md` contrato (atmósfera, color con roles, tipografía, espaciado/forma, componentes, estados, layout, movimiento, anti-patrones).
- El procedimiento cubre los dos momentos: creación inicial (extracción de valores reales del CSS existente como semilla en dos pasadas con aprobación del usuario) y mantenimiento (sensor al cierre de tareas que toquen frontend: propagación por la fuente de verdad, detección de deriva reportada no corregida en silencio).
- Actualización del `README.md` en la sección de skills disponibles.

## Criterios de calidad

- El `SKILL.md` cumple D004 y D005: frontmatter estándar, cuerpo compacto con referencias bajo demanda.
- La `description` declara capacidad y resultado, no mecánica (lección `contratos-de-skills`).
- El artefacto es genérico: no menciona tecnologías de todo-app ni de ningún proyecto concreto (lección `diseno-de-artefactos`).
- El procedimiento de creación exige la aprobación del usuario entre la dirección/tokens y la materialización, según la investigación.
- El mantenimiento declara explícitamente que la deriva detectada se reporta o registra como trabajo descubierto, no se corrige silenciosamente (lección `alcance`).
- El skill aparece en `README.md` en el grupo correspondiente.

## Procedimiento sugerido

1. Leer `documentar-dominio` y `documentar-producto` como modelos estructurales.
2. Redactar `SKILL.md` y las referencias, revisar redacción y pulir antes de escribir.
3. Actualizar `README.md`.

## Notas

- La categorización del skill en el README es abierta; puede crear su propio grupo («Diseño») o alojarse junto a la salud del dominio y del producto, según quede más claro.
- Corrección del usuario en revisión: el skill debe admitir un modo interactivo en el que la guía se define o actualiza por diálogo con el usuario, no solo a partir del código —las decisiones de diseño pueden decidirse en discusión y aplicarse después; sin ese modo todo el diseño queda en manos de la ejecución—. Incorporado al skill: modo interactivo, creación por extracción y mantenimiento sensor como tres entradas combinables.

## Revisión

- Subagente: 2026-09-26 — Aprueba
- Usuario: 2026-09-26 — Solicita cambios (añadir modo interactivo de definición/actualización por diálogo) → incorporado; description reescrita a nivel de capacidad → Aprueba
