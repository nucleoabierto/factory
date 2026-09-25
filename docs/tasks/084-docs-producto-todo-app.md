# Crear el directorio de documentación de producto de todo-app con contenido inicial

## Estado

[ ] Pendiente | [~] En progreso | [r] En revisión | [x] Completada | [!] Bloqueada

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

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario: [fecha] — [Aprueba | Solicita cambios]
