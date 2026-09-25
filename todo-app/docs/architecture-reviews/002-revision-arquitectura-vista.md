# Revisión de arquitectura — capa de presentación

- Fecha: 2026-09-25
- Dominio evaluado: capa de presentación de todo-app —el objeto `UI` y su relación con la fachada `App`— en `app.js:340-568, 572-773`
- Intención declarada: `docs/domains/001-lista-de-tareas.md`, sección «Fronteras» (el renderizado DOM y los eventos quedan fuera del dominio, en el objeto `UI`)
- Decisiones respetadas: D018 «todo-app en vanilla JS» (docs/decisions/ del repositorio raíz)
- Punto de partida: evaluar la hipótesis «vista como función de un snapshot + dispatch de acciones» (la vista recibe datos planos y callbacks declarados, no la fachada entera)
- Skill: `revisar-arquitectura`; complementa la revisión 001, que evaluó el dominio cuando la separación aún no existía

## Veredictos por criterio

| Criterio | Veredicto | Confianza |
|---|---|---|
| Lenguaje ubicuo | Correcto | Alta |
| Separación de capas | Mejorable | Alta |
| Fronteras del contexto | Mejorable | Alta |
| Invariantes y modelo | Mejorable | Media |
| Acoplamiento y estructura | Deficiente | Alta |

### Lenguaje ubicuo — correcto

La vista usa los términos del glosario: lista activa (`list-select`, `activeListId`), archivada (`archived-section`, `reactivate`), filtro (`filter-*`), pendiente (`todo-count`). `UI` y `render` son términos técnicos, aceptables por estar fuera de la frontera del dominio. `editingId` no está en el glosario —observación ya hecha en la revisión 001— pero pertenece al vocabulario de la vista, no al del dominio.

### Separación de capas — mejorable

La dirección general es la correcta (`UI` → `App` → `TaskList`), pero la vista depende de la fachada entera: `UI.render(App)` y `UI.bindEvents(App)` reciben el objeto completo (`app.js:345, 495`) y pescan de él lo que necesitan (`App.visibleTasks()`, `App.lists`, `App.activeListId`, `App.filter`, `App.pendingCount()`). La vista no declara su contrato de datos: añadir una consulta al render no cambia ninguna firma, así que el acoplamiento real es invisible. La hipótesis evaluada —vista contra snapshot— ataca exactamente esto.

### Fronteras del contexto — mejorable

La frontera declarada («fuera: renderizado DOM y eventos, objeto `UI`») se respeta en lo grueso, con dos erosiones:

1. `App` alcanza dentro de `UI`: `editingId` está declarado en `UI` (`app.js:343`) pero lo mutan `App.editTask` (:609), `App.deleteTask` (:617-619), `App.setActiveList` (:650), `App.deleteList` (:685), `App.archiveList` (:705), además del par `startEdit`/`cancelEdit`. El estado de la vista es copropiedad de la fachada —frontera difusa.
2. Conocimiento de dominio re-filtrado en la vista: «las archivadas salen de la navegación» lo defiende el modelo (`TaskList.moveTask`, `App.setActiveList`) y lo vuelve a filtrar el render (`app.js:403, 427-429, 452`). La vista decide pertenencia que el modelo ya decidió.

### Invariantes y modelo — mejorable

Las invariantes de la vista (una sola tarea en edición, la edición se cancela al cambiar de lista o al desaparecer la tarea) no tienen un defensor único: se reparten como efectos secundarios en seis métodos de `App`. Funciona, pero cada operación nueva sobre listas debe recordar limpiar `editingId` —el comentario de `app.js:683-684` ya documenta una de estas obligaciones como excepción razonada.

### Acoplamiento y estructura — deficiente

Dependencia cíclica entre componentes, detectable mecánicamente: `App` llama a `UI.render`/`UI.bindEvents` y muta `UI.editingId`; `UI` llama a `App.*` en cada listener. `App` ↔ `UI` forman un componente fuertemente conexo disfrazado de dos. Además, `App` concentra tres roles: raíz de composición, controlador de sesión (`filter`, `activeListId`, persistencia de ambos) y copropietario del estado de vista.

## Hallazgos priorizados

### H1 — Dependencia cíclica `App` ↔ `UI` y contrato de vista implícito

- **Criterio o patrón:** dependencia cíclica + interfaz ambigua (la vista no declara qué necesita).
- **Evidencia:** `UI.render(App)`/`UI.bindEvents(App)` con acceso indiscriminado a la fachada (`app.js:345-567`); mutaciones de `UI.editingId` desde `App` (`app.js:609, 617-619, 650, 685, 705`); ciclo de ida y vuelta `UI` → `App` → `UI`.
- **Objetivo:** la vista es una función de un view-model explícito: `UI.render(viewModel)` recibe datos planos (`tasks`, `lists`, `activeListId`, `filter`, `editingId`, contadores) y los eventos despachan acciones declaradas —`bindEvents(actions)` o `data-action` con dispatch— en vez de llamar a `App` por nombre. `editingId` vive en el estado de vista, que un solo componente posee.
- **Restricciones:** D018 —vanilla JS sin build ni framework—; el arnés de tests consume `App.editingId`, `App.filter` y `App.tasks` (`tests.html:28-31, 136-139`): la fachada mantiene su superficie o el arnés se migra en la misma tarea.
- **Validación:** `UI.render` ejecutable en tests con un objeto literal construido a mano, sin `App` ni `localStorage`; ninguna línea de `App` accede a miembros de `UI`.
- **Confianza:** alta.
- **Derivado en:** `docs/tasks/023-contrato-de-vista.md`

### H2 — La vista re-decide pertenencia que el modelo ya defiende

- **Criterio o patrón:** frontera difusa / conocimiento de dominio duplicado.
- **Evidencia:** filtros de `archived` en `app.js:403` (opciones del «mover a…»), `:427-429` (selector de listas) y `:452` (sección de archivadas), redundantes con las guardas del modelo en `TaskList.moveTask` (:250-254) y `App.setActiveList` (:644-648).
- **Objetivo:** el view-model entrega las colecciones ya proyectadas (`navigableLists`, `archivedLists`, `moveTargets` por tarea); la vista renderiza lo que recibe sin filtrar por reglas del dominio.
- **Restricciones:** la proyección se calcula en la capa que compone (presenter/fachada), no dentro de `TaskList`, que ya es consulta pura.
- **Validación:** ninguna expresión de `render` evalúa `archived`; un cambio en la regla de navegación toca un solo sitio.
- **Confianza:** alta.
- **Derivado en:** `docs/tasks/024-proyeccion-y-eventos-unificados.md`

### H3 — Doble mecanismo de vinculación de eventos

- **Criterio o patrón:** interfaz ambigua de la vista: los elementos estáticos se vinculan una vez en `bindEvents` y los dinámicos reciben listeners inline en cada render; dos protocolos para la misma preocupación.
- **Evidencia:** `bindEvents` (`app.js:495-567`) frente a los listeners creados por elemento dentro del bucle de render (:364-414, 465-474); el `<select>` de «mover a…» se reconstruye entero por fila y por render.
- **Objetivo:** un solo mecanismo: delegación de eventos en contenedores estables con `data-action`, o listeners por región declarados junto a su render. El mecanismo elegido queda subordinado al contrato de H1 (dispatch de acciones).
- **Restricciones:** conservar el foco en el input de edición tras el re-render (`app.js:418-421`).
- **Validación:** `bindEvents` desaparece o queda como único punto de vinculación; ningún `addEventListener` dentro del bucle de tareas.
- **Confianza:** media (la duplicidad es evidente; la forma óptima depende de H1).
- **Derivado en:** `docs/tasks/024-proyeccion-y-eventos-unificados.md`

## Recomendaciones

H1 es el hallazgo estructural y confirma la hipótesis evaluada: la vista debe renderizar un snapshot y despachar acciones, no conocer la fachada. Conviene ejecutarlo como un único refactor que absorba H2 y H3 —ambos son detalles del mismo contrato (qué datos entran, cómo salen los eventos)— y puede dividirse en dos tareas: primero el contrato view-model/dispatch con `editingId` reubicado, después la proyección de colecciones y la unificación de eventos.

Observación fuera de la rúbrica (smell de implementación, corresponde a la revisión de código de la tarea que lo toque): `render` crece una región por funcionalidad —150 líneas y seis regiones—; dividirlo en render por región es el primer paso natural dentro de H1.

## Referencias

- Revisión anterior del mismo dominio: `docs/architecture-reviews/001-revision-arquitectura-dominio.md`
- Documento de dominio: `docs/domains/001-lista-de-tareas.md`
- Decisión de stack: `docs/decisions/D018` del repositorio raíz
