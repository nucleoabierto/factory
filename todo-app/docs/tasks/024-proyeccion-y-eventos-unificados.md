# Proyección de colecciones y mecanismo único de eventos en la vista

## Estado

[ ] Pendiente

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

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario: [fecha] — [Aprueba | Solicita cambios]
