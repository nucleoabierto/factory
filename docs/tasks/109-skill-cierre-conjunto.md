# Crear el skill de cierre de conjunto

## Estado

[ ] Pendiente | [~] En progreso | [r] En revisión | **[x] Completada** | [!] Bloqueada

## Tipo

mantenimiento

## Objetivo

Crear el skill que cierra un conjunto de trabajo agotado: cuando la última tarea de una agrupación —épica, hito ligero o línea suelta— queda completada, verifica el criterio de cierre declarado en la épica, marca su estado como `Completada` y elimina el encabezado y las líneas de la agrupación del índice. Hoy nadie ejecuta ese cierre: las épicas quedan `Planificada` para siempre —`planificar-roadmap` las inventaría de nuevo como líneas abiertas— y la limpieza del índice que D017 manda al completarse un hito solo se ha hecho como tarea dedicada. El nombre del skill se decide en la ejecución (`cerrar-epica` es el tentativo, aunque la capacidad cubre también hitos ligeros y líneas sueltas).

## Dependencias

- Ninguna.

## Entrada

- La tarea recién completada y `TODO.txt`, comunicados por `ejecutar-tareas` en su punto de cierre —la detección de que la agrupación se agotó se cablea en la tarea 111.
- `docs/epics/` del proyecto evaluado, para localizar la épica enlazada por el comentario `<!-- épica: docs/epics/NNN-slug.md -->` cuando la agrupación la tiene.
- Las decisiones que rigen los artefactos que el skill toca: D017 (índice de trabajo activo), D019 (épica y su criterio de cierre), D008 (encabezados de agrupación).
- Los sensores de cierre existentes (`mantener-changelog`, `documentar-dominio`) como modelo de estructura y de contrato de entrada.
- Las decisiones y lecciones que rigen la creación de skills: D003, D004, D005, lecciones `contratos-de-skills`, `consistencia-de-formatos`, `vocabulario`, `diseno-de-artefactos` y `nomenclatura`.

## Resultado esperado

- `.agents/skills/<nombre>/SKILL.md` con frontmatter `name` y `description` a nivel de capacidad, siguiendo la estructura común de los skills del proyecto.
- El procedimiento cubre: localización de la agrupación de la tarea completada en el índice; verificación del criterio de cierre de la épica contra el resultado real —no solo el recuento de tareas—, elevando al usuario cuando no se cumple; marcado del estado `Completada` en el documento de épica; eliminación del encabezado y las líneas de la agrupación de `TODO.txt`, incluido el caso sin épica (hito ligero) y el de tarea suelta sin agrupación.
- `references/` con el detalle si el cuerpo crece por encima de lo razonable (D005).
- Actualización del `README.md` en la sección de skills disponibles.

## Criterios de calidad

- El `SKILL.md` cumple D004 y D005.
- La `description` declara capacidad y resultado, no mecánica (lección `contratos-de-skills`).
- El cierre de la épica verifica su criterio de cierre declarado; un criterio incumplido eleva al usuario en lugar de cerrar a ciegas.
- El skill no escribe `ROADMAP.md`: el reflejo del cierre en el roadmap corresponde al skill de la tarea 110, único escritor mecánico del documento.
- El artefacto es genérico: opera sobre cualquier proyecto evaluado, sin acoplar a todo-app ni a Factory (lección `diseno-de-artefactos`).
- El skill aparece en `README.md`.

## Procedimiento sugerido

1. Leer D017, D019 y D008, y un sensor de cierre existente como modelo de estructura.
2. Redactar `SKILL.md` y las referencias, revisar redacción y pulir antes de escribir.
3. Actualizar `README.md`.

## Notas

- La conexión del skill en el ciclo —quién lo invoca y en qué punto— queda en la tarea 111: esta tarea crea la capacidad, no la conexión.
- El nombre definitivo del skill se decide en la ejecución, nombrando por la capacidad completa que ofrece (lección `contratos-de-skills`).

## Revisión

- Subagente: 2026-10-03 — Aprueba
- Usuario: 2026-10-03 — Aprueba
