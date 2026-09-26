# Proyección de colecciones y mecanismo único de eventos en la vista

## Estado

[x] Completada

## Tipo

mantenimiento (refactoring)

## Objetivo

Completar el contrato de vista: el view-model entrega las colecciones ya proyectadas (`navigableLists`, `archivedLists`, destinos de «mover a…» por tarea) de modo que el render no vuelva a filtrar por reglas del dominio, y la vinculación de eventos usa un solo mecanismo. Hallazgos H2 y H3 de `docs/architecture-reviews/002-revision-arquitectura-vista.md`.

## Dependencias

- docs/tasks/023-contrato-de-vista.md — la proyección se calcula donde se construye el view-model y el mecanismo de eventos queda subordinado al dispatch definido allí.

## Entrada

- `app.js` tras la tarea 023: `UI.render(viewModel)` y el dispatch de acciones ya definidos
- Filtros actuales a eliminar de la vista: `app.js:403` (opciones de «mover a…»), `:427-429` (selector de listas), `:452` (sección de archivadas)
- Informe origen: `docs/architecture-reviews/002-revision-arquitectura-vista.md`

## Resultado esperado

- `app.js` modificado: la proyección de colecciones vive en la capa que construye el view-model (no dentro de `TaskList`, que sigue siendo consulta pura); `UI.render` no evalúa `archived` ni otras reglas de pertenencia.
- Un único mecanismo de eventos en la vista: delegación en contenedores estables con `data-action`, o listeners por región declarados junto a su render; desaparece la dualidad `bindEvents` estático / listeners inline por render.

## Criterios de calidad

- Ninguna expresión de `UI.render` evalúa `archived`; un cambio en la regla «las archivadas salen de la navegación» toca un solo sitio.
- Ningún `addEventListener` dentro del bucle de tareas del render.
- El foco en el input de edición tras el re-render se conserva.
- Misma suite de `tests.html` en verde y mismo comportamiento observable.
- Decisiones respetadas: D018 —vanilla JS sin build ni framework.

## Procedimiento sugerido

1. Añadir las colecciones proyectadas al view-model y sustituir los filtros del render por su consumo directo.
2. Elegir el mecanismo único de eventos (delegación recomendada por la escala) y migrar los listeners dinámicos.
3. Ejecutar `tests.html`.

## Notas

- El `<select>` de «mover a…» por fila es hoy la parte más costosa del re-render; con delegación puede mantenerse la reconstrucción simple sin penalización perceptible a esta escala.

## Plan técnico

`UI` renderiza por regiones (`renderTasks`, `renderListBar`, `renderArchived`, `renderFooter`) a partir del view-model que compone `App.viewModel()`, y los eventos salen por `UI.actions`. Persisten dos erosiones que esta tarea cierra: el render re-filtra por `archived` en tres sitios (`moveSelect`, selector de listas, sección de archivadas) y hay doble mecanismo de eventos (vinculación estática en `bind` más listeners inline por fila en cada render). El arnés renderiza `UI` con view-models literales y dispara eventos DOM reales sobre `#qunit-fixture`, que está dentro de `document`: la delegación a nivel `document` funciona sin mover el fixture.

- [x] Proyectar las colecciones en `App.viewModel`: `navigableLists` y `archivedLists` con `pendingCount` embebido por lista, `moveTargets` por tarea (listas navegables menos la suya) y `pendingCount` como dato escalar para el pie
  - Aporta: la proyección vive en la capa que compone; `TaskList` sigue siendo consulta pura y el view-model pasa a ser datos planos
- [x] Reescribir el render por regiones para consumir las proyecciones: selector con `navigableLists`, archivadas con `archivedLists`, «mover a…» con `task.moveTargets`, pie con `vm.pendingCount`
  - Aporta: cierra H2 —ninguna expresión del render evalúa `archived` y «las archivadas salen de la navegación» se decide en un solo sitio
- [x] Adoptar la delegación como mecanismo único: `UI.bind` registra listeners delegados (`click`, `change`, `keydown`, `dblclick`) sobre `document` con una tabla de dispatch por `data-action`; desaparecen los listeners inline del render
  - Aporta: un solo protocolo de eventos, ningún `addEventListener` dentro del bucle de tareas; el foco en `input.edit` se conserva porque el render sigue enfocándolo
  - Contexto: los `prompt` de gestión de listas quedan en los manejadores de la tabla (concern de vista); `actions.activeListName` se mantiene para el prompt de renombrar
- [x] Declarar `data-action` en los controles estáticos de `index.html` (selector, botones de lista, `new-todo`, filtros, limpiar completadas) y migrar los fixtures del arnés en `tests.html` con los mismos atributos
  - Aporta: el marcado estático y el dinámico usan el mismo contrato; los eventos sintéticos de los tests llegan por burbujeo a `document`
- [x] Migrar los view-models literales del arnés a la forma nueva (`navigableLists`, `archivedLists`, `moveTargets` por tarea, `pendingCount` escalar)
  - Aporta: la suite verde valida el contrato nuevo, no el viejo
- [x] Ejecutar `tests.html`
  - Aporta: misma suite en verde, misma API pública y mismo comportamiento observable, como exige el perfil refactoring

## Suite de pruebas esperada

- Al renderizar, cada tarea produce su fila y una tarea hecha lleva su clase (caso de uso: ver el estado de la lista).
- El selector de listas muestra solo las listas navegables con su contador de pendientes y marca la activa (caso de uso: navegar entre listas).
- La sección de archivadas aparece solo cuando hay listas archivadas, con su contador (caso de uso: recuperar listas aparcadas).
- El desplegable «mover a…» de una tarea ofrece las listas navegables distintas de la suya (caso de uso: mover una tarea entre listas).
- Completar, borrar, editar con Enter, cancelar con Escape, entrar en edición con doble clic, mover entre listas y reactivar una archivada despachan las acciones declaradas tras re-renders sucesivos (caso de uso: operar sobre tareas y listas desde la vista).
- El foco permanece en el input de edición tras el re-render (caso de uso: editar una tarea).
- El pie muestra el contador de pendientes de la lista activa y marca el filtro seleccionado (caso de uso: filtrar la vista).
- Toda la suite existente de `tests.html` en verde, con los view-models literales y fixtures migrados al contrato nuevo.

## Revisión

- Subagente: 2026-09-25 — Aprueba (solicitó cobertura de `dblclick` en la primera ronda; resuelta y aprobada en la segunda)
- Usuario: 2026-09-25 — Aprueba
