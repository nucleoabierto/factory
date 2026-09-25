# Crear el directorio de documentación de producto de todo-app con contenido inicial

## Estado

[ ] Pendiente | [ ] En progreso | [ ] En revisión | [x] Completada | [ ] Bloqueada

## Tipo

desarrollo

## Objetivo

Crear en `todo-app/` el directorio propio de documentación de producto —separado del `docs/` de proceso— con su índice navegable, la configuración mínima del SSG elegido y el contenido inicial: guías de uso, referencia y documentos de funcionalidad con escenarios anclados a la suite de pruebas del proyecto.

## Dependencias

- 083

## Entrada

- El SSG elegido por la tarea 083 y su convención de configuración mínima.
- `docs/research/2026-09-documentacion-producto-y-roadmap.md`, secciones 1-3 y «Formato o procedimiento» — estructura Diátaxis ligera y patrón del documento de funcionalidades.
- El comportamiento actual de todo-app: `app.js`, su suite de pruebas (`tests.html`, donde viven los escenarios que servirán de ancla) y `todo-app/docs/domains/001-lista-de-tareas.md`.

## Resultado esperado

- Un directorio de documentación de producto en `todo-app/` (nombre por el tipo específico de contenido, según la lección de nomenclatura) que un lector puede recorrer desde su índice sin build.
- Configuración mínima del SSG adoptado: con ella el sitio se construye localmente; sin ella, los markdowns se leen igual de bien.
- Contenido inicial: portada/índice, una guía de uso, referencia del estado persistido y documentos de funcionalidad que cubren las capacidades ya implementadas (tareas, listas, archivado), con escenarios en lenguaje de negocio anclados a la suite de pruebas.

## Criterios de calidad

- Cada documento de funcionalidad declara sus escenarios en lenguaje ubicuo y los ancla a la prueba de la suite que los verifica; ningún hecho de dominio se duplica: se referencia `docs/domains/`.
- El índice navegable declara el orden y la jerarquía de los documentos (toctree o equivalente del SSG elegido).
- La configuración del SSG es opcional: borrarla no rompe la lectura de los markdowns en el repo.
- Ningún artefacto de proceso (`docs/tasks`, `docs/epics`, `docs/decisions`, `docs/domains`) entra en el sitio.
- La decisión de diseño resultante queda registrada en `docs/decisions/` como parte del cierre de la tarea.

## Procedimiento sugerido

1. Definir el nombre y la estructura del directorio (índice + secciones guías/referencia/funcionalidades) y la convención de ancla doc↔test.
2. Escribir la configuración mínima del SSG.
3. Redactar el contenido inicial recorriendo `app.js` y `tests.html`; aplicar `revisar-redaccion` y `pulir-escritura` en modo preventivo.
4. Verificar la construcción local del sitio si el SSG está disponible; si no, verificar que los markdowns se sostienen solos.
5. Registrar con `decisiones-diseno` la decisión que consolida esta tarea: la documentación de producto como artefacto separado, el SSG adoptado y la convención de ancla doc↔test.

## Notas

- La documentación de funcionalidades sigue el patrón living documentation: escenarios en lenguaje de negocio, no transcripción de aserciones.
- Los commits de todo-app llevan el ámbito `todo-app` en Conventional Commits (`tipo(todo-app): descripción`).

## Plan técnico

Subsistema: `todo-app/` es una aplicación en vanilla JS sin build; `TaskList` contiene el modelo (tareas, listas, invariantes), `Storage` la persistencia en `localStorage` y `UI` la presentación, compuestos en la fachada `App` (`app.js`). Los artefactos de proceso ya viven en `todo-app/docs/` (tasks, domains, epics); la documentación de producto necesita un directorio propio en la raíz de `todo-app/`, nombrado por su tipo de contenido: `product-docs/`. La suite `tests.html` contiene siete módulos QUnit que cubren el comportamiento completo y sirven de ancla a los escenarios.

- [x] Crear `todo-app/product-docs/` con `index.md`, `guias/`, `referencia/` y `funcionalidades/`, y redactar la portada con el índice navegable
  - Aporta: es la entrada del sitio y del repo; declara el orden y la jerarquía de los documentos sin depender del SSG.
- [x] Escribir `todo-app/mkdocs.yml` mínimo (`site_name` y `docs_dir: product-docs`)
  - Aporta: permite `mkdocs build`/`serve` sin tocar el contenido; borrarla no rompe la lectura de los markdowns.
  - Contexto: el archivo vive en la raíz de `todo-app/`, fuera del directorio de documentos, según D023.
- [x] Redactar `guias/usar-la-lista.md` recorriendo los flujos de `index.html` y `app.js`
  - Aporta: cubre el «cómo» para el usuario —capturar tareas, completarlas, organizarlas en listas, archivar— en lenguaje de uso, no de implementación.
- [x] Redactar `referencia/estado-persistido.md`
  - Aporta: documenta el contrato de `localStorage` (las tres claves, el formato `{lists, tasks}` y la migración del array plano) que hoy solo existe en el código.
- [x] Redactar `funcionalidades/001-tareas.md`, `002-listas.md` y `003-archivar-listas.md` con escenarios en lenguaje ubicuo, cada uno anclado al módulo y título de la prueba de `tests.html` que lo verifica
  - Aporta: es la capa de living documentation; el ancla por nombre (módulo + título del test) es estable frente a reordenamientos del archivo.
  - Contexto: el concepto es «la suite de pruebas del proyecto»; `tests.html`/QUnit es su instancia en esta PoC. Ningún hecho de dominio se repite: se referencia `docs/domains/001-lista-de-tareas.md`.
- [x] Verificar la construcción local con `mkdocs build` vía pipx; si no está disponible, verificar que los markdowns se sostienen solos
  - Aporta: cierra el criterio de cierre de la épica (sitio construible con el SSG elegido).
- [x] Registrar en `docs/decisions/` la decisión consolidada: la documentación de producto como artefacto separado y la convención de ancla doc↔test
  - Aporta: la elección del SSG ya está en D023; esta decisión cubre la estructura del directorio y la convención de anclaje.

## Suite de pruebas esperada

- Un lector abre `product-docs/index.md` en el repositorio y recorre toda la documentación siguiendo solo enlaces, sin build.
- `mkdocs build` en `todo-app/` produce un sitio navegable con los tres tipos de contenido (guía, referencia, funcionalidades).
- Eliminar `mkdocs.yml` no altera ni rompe ningún markdown.
- Cada escenario declarado en `funcionalidades/` cita el módulo y el título de la prueba de `tests.html` que lo verifica, y la cita existe.
- Ningún archivo bajo `todo-app/docs/` (artefactos de proceso) aparece en `product-docs/` ni en el índice.
- Las invariantes y el glosario no se duplican: los documentos enlazan a `docs/domains/001-lista-de-tareas.md`.

## Desviaciones del plan

- Se añadió `todo-app/.gitignore` con `site/` para mantener la salida del build fuera de git. Motivo: el plan no preveía el artefacto generado; al construir el sitio localmente apareció `todo-app/site/` sin ignorar. Decisión: crear el `.gitignore` (desviación menor, sin efecto en objetivo ni criterios).

## Revisión

- Subagente: 2026-09-25 — Aprueba
- Usuario: 2026-09-25 — Aprueba
