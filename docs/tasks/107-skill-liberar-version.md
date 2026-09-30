# Crear el skill de liberación de versiones

## Estado

[ ] Pendiente | [~] En progreso | [r] En revisión | [x] **Completada** | [!] Bloqueada

## Tipo

mantenimiento

## Objetivo

Crear el skill que gestiona la liberación de versiones del proyecto evaluado de forma agnóstica de tecnología: lee los cambios no liberados del changelog, propone el bump semver —major, minor o patch— según los tipos de cambio acumulados con su justificación, lo confirma con el usuario y materializa la liberación promoviendo la sección de no liberados a la nueva versión con su fecha. El nombre del skill se decide en la ejecución (`liberar-version` es el tentativo).

## Dependencias

- Tarea 104 (`docs/tasks/104-investigar-changelog-y-versionado.md`): fija la correspondencia entre tipos de entrada y bump semver, y el procedimiento de promoción de no liberados.
- Tarea 105 (`docs/tasks/105-skill-mantener-changelog.md`): define el formato del changelog y de la sección de no liberados que este skill consume.

## Entrada

- El documento de investigación producido por la tarea 104 — correspondencia semver y ciclo de vida de liberación.
- El skill hermano de changelog creado en la tarea 105 — formato del artefacto que lee y reescribe.
- Las decisiones y lecciones que rigen la creación de skills: D003, D004, D005, lecciones `contratos-de-skills` —incluido el modo interactivo para artefactos decididos por humanos—, `consistencia-de-formatos`, `vocabulario`, `diseno-de-artefactos` y `nomenclatura`.

## Resultado esperado

- `.agents/skills/<nombre>/SKILL.md` con frontmatter `name` y `description` a nivel de capacidad, siguiendo la estructura común de los skills del proyecto.
- El procedimiento cubre: lectura de los cambios no liberados, propuesta de bump semver justificada por los tipos acumulados, confirmación del usuario —la versión es un artefacto decidido por humanos— y materialización: promover `Unreleased` a `[X.Y.Z]` con fecha y dejar la sección de no liberados vacía lista para el siguiente ciclo.
- La fuente de verdad de la versión actual —changelog, manifiesto del proyecto u otra— se detecta o se pregunta, sin acoplar a un formato de manifiesto concreto.
- `references/` con el detalle del procedimiento de promoción si el cuerpo crece por encima de lo razonable (D005).
- Actualización del `README.md` en la sección de skills disponibles.

## Criterios de calidad

- El `SKILL.md` cumple D004 y D005.
- La `description` declara capacidad y resultado, no mecánica (lección `contratos-de-skills`).
- El artefacto es genérico y agnóstico: funciona sobre cualquier proyecto con un changelog en el formato acordado; la fuente de la versión actual es dato de entrada o pregunta al usuario, nunca una ruta fija de un gestor concreto (lección `diseno-de-artefactos`).
- La propuesta de bump es derivable y justificada: cada recomendación cita los tipos de cambio acumulados que la producen.
- La materialización exige confirmación del usuario antes de escribir.
- El skill aparece en `README.md`.

## Procedimiento sugerido

1. Leer el documento de investigación de la tarea 104 y el skill hermano de la tarea 105.
2. Redactar `SKILL.md` y las referencias, revisar redacción y pulir antes de escribir.
3. Actualizar `README.md`.

## Notas

- El nombre definitivo del skill se decide en la ejecución, nombrando por la capacidad completa que ofrece (lección `contratos-de-skills`).
- Queda fuera de alcance toda publicación real —tags de git, paquetes, despliegues—: el skill gestiona la anotación de la versión y la promoción del changelog; la distribución es decisión de cada proyecto.

## Revisión

- Subagente: 2026-09-29 — Aprueba
- Usuario: 2026-09-29 — Aprueba
