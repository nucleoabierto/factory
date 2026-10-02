# Crear el skill de operación del changelog

## Estado

**[ ] Pendiente** | [~] En progreso | [r] En revisión | [x] Completada | [!] Bloqueada

## Tipo

mantenimiento

## Objetivo

Crear el skill de utilidad que ejecuta las operaciones mecánicas del changelog del proyecto evaluado mediante scripts bash propios: localizar el archivo (`CHANGELOG.md` y alternativas), volcar la sección `## [Unreleased]` y buscar en ella la entrada de una agrupación, anotar una línea bajo la categoría correcta creando el `###` en orden canónico si falta, reportar el estado (presencia/vacuidad de no liberados, última versión, enlaces comparativos), proponer el bump semver a partir de las categorías presentes, promover los no liberados a `## [X.Y.Z] - fecha` abriendo un `## [Unreleased]` vacío y actualizando los enlaces de pie cuando existen, y marcar una versión `[YANKED]`. La promoción es cirugía multiedit sobre formato fijo con casos borde ya especificados —primera versión, host sin enlaces—, exactamente donde la edición ad hoc falla. El nombre se decide en la ejecución (`operar-changelog` tentativo).

## Dependencias

- Tarea 113 (`docs/tasks/113-delegacion-mecanica-scripts.md`): fija la decisión y el contrato de los scripts.

## Entrada

- La decisión y el contrato producidos por la tarea 113.
- El formato Keep a Changelog verificado en `CHANGELOG.md` del repo y en `mantener-changelog/references/formato-y-agregacion.md` y `liberar-version/references/promocion-y-semver.md` (categorías fijas y su orden, correspondencia categoría→bump, mecánica de promoción y enlaces).
- Los dos consumidores: `mantener-changelog` (localizar, volcar no liberados, anotar) y `liberar-version` (estado, propuesta de bump, promoción, yank).

## Resultado esperado

- `.agents/skills/<nombre>/SKILL.md` con el contrato delegado y los scripts bash en `assets/`.
- `mantener-changelog` y `liberar-version` actualizados para delegar la mecánica de archivo; conservan intactos sus juicios (notabilidad, agregación, curación, confirmación del usuario).
- Actualización del `README.md`.

## Criterios de calidad

- El `SKILL.md` cumple D004 y D005; la `description` declara capacidad, no mecánica.
- La promoción es atómica y cubre los casos borde especificados: primera versión sin enlace previo, ausencia de enlaces comparativos, `Unreleased` vacío (exit distinguishible).
- La anotación valida la categoría contra la lista fija e inserta el `###` en el orden canónico; el texto de la entrada lo produce el consumidor.
- El skill aparece en `README.md`.

## Procedimiento sugerido

1. Escribir los scripts probándolos sobre el `CHANGELOG.md` real del repo y sobre un changelog sintético con enlaces de pie.
2. Redactar el `SKILL.md`, revisar redacción y pulir.
3. Actualizar los consumidores y el `README.md`.

## Notas

- La curación de entradas, la decisión de notabilidad, la elección de categoría y la confirmación del bump son juicio del consumidor o del usuario; los scripts reciben contenido ya decidido.

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario: [fecha] — [Aprueba | Solicita cambios]
