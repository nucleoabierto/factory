# La vista «hoy» y las listas archivadas

## Estado

[ ] Pendiente | [ ] En progreso | [ ] En revisión | [x] Completada | [ ] Bloqueada

## Tipo

desarrollo

## Objetivo

Decidir y aplicar si la vista «hoy» —transversal— incluye las tareas de listas archivadas. El concepto de lista archivada la declara fuera de la navegación y de las vistas, pero la consulta transversal actual itera todas las tareas sin mirar el flag: «hoy» muestra lo aparcado. La opción coherente con el concepto es excluirlas.

## Dependencias

- 018

## Entrada

- La rama `today` de `TaskList.visibleTasks`, que recorre todas las tareas sin consultar `list.archived`.
- El hallazgo 3 del informe de revisión de la tarea 018 y la divergencia registrada en el documento de dominio `docs/domains/001-lista-de-tareas.md`.

## Resultado esperado

- La decisión queda aplicada en el dominio y documentada: si se excluyen, una lista archivada con tareas vencidas o de hoy no aporta nada a «hoy»; si se incluyen, el documento de dominio y el concepto de archivada se actualizan para reflejar la excepción.
- La divergencia del estado de salud del dominio queda resuelta en uno u otro sentido.

## Criterios de calidad

- El comportamiento elegido se cumple en `visibleTasks` y en `pendingCount` (ambos comparten la pertenencia por vista).
- La documentación de dominio queda coherente con lo implementado.
- La suite de `tests.html` pasa en verde con tests nuevos del caso.

## Procedimiento sugerido

1. Confirmar la decisión con el usuario si hace falta.
2. Ajustar la consulta transversal (o el documento, según la decisión).
3. Escribir los tests y verificar en el navegador.

## Notas

- Los commits de este proyecto llevan el ámbito `todo-app` en Conventional Commits (`tipo(todo-app): descripción`).

## Contexto

- Archivos similares:
  - `app.js` — `TaskList.visibleTasks` (rama `today`, líneas ~229-245) y `pendingCount` (~222), que la delega; `TaskList.#lists` con el flag `archived` y las guardas existentes en `archiveList`/`setActiveList`/`moveTask`; el comentario de `visibleTasks` documenta la semántica de cada vista.
  - `tests.html` — el módulo `views: main and today` (líneas ~1384+) como modelo de los tests nuevos, con el helper `day(offset)` que fija fechas relativas; el módulo `archiving lists` (~894+) muestra cómo se archiva una lista en los tests.
  - `docs/domains/001-lista-de-tareas.md` — declara la divergencia conocida que esta tarea resuelve y define el concepto «lista archivada» («fuera de la navegación y de las vistas») y la vista «hoy» como transversal.
- Patrones:
  - La pertenencia por vista la decide el dominio (`TaskList`), nunca la presentación; `pendingCount` se deriva de `visibleTasks`, así que un solo punto fija la pertenencia.
  - El estado de listas es privado (`#lists`); las consultas internas lo leen directamente y lo público sale por `lists()` como copia.
  - Los tests se escriben en inglés, con módulo QUnit con fixture propio, `localStorage` limpio en `beforeEach` y `window.App` como fachada.
  - Vanilla JS sin build; Conventional Commits con ámbito `todo-app`.
- Lecciones:
  - `idioma-del-codigo`: identificadores, nombres de tests y comentarios en inglés; la documentación en español.
  - `comunicacion-en-codigo`: nombres que no presuponen lo que se verifica; comentarios que explican razones duraderas (el comentario de `visibleTasks` debe actualizarse para reflejar la exclusión, no narrar la corrección).
  - `fidelidad-al-plan`: el diff se ciñe al plan aprobado; extras se declaran como desviación.
  - `scope-del-subproyecto`: los artefactos de esta tarea viven en `todo-app/`, no en la raíz.
- Decisiones:
  - Ninguna propia del subproyecto con índice en `todo-app/docs/`; el plan técnico de la épica 003 (`docs/epics/003-planificacion-temporal.md`) es la guía vigente: la vista «hoy» es transversal y la pertenencia la decide el dominio.

## Conectividad

- Veredicto: **conectada**.
- Justificación: todo lo que la tarea asume existe con la forma esperada: la rama `today` de `TaskList.visibleTasks` recorre `this.#tasks` sin consultar el flag (`app.js`, ~línea 230); `TaskList.#lists` lleva el flag `archived` y las guardas de lista archivada ya existen en `archiveList`, `setActiveList` y `moveTask`; `pendingCount` delega en `visibleTasks`, así que la pertenencia se fija en un solo punto. La suite QUnit de `tests.html` tiene los módulos hermanos (`views: main and today`, `archiving lists`) y el helper `day()` para cubrir el caso, y `docs/domains/001-lista-de-tareas.md` ya registra la divergencia que esta tarea resuelve. No falta capacidad base.

## Plan técnico

`TaskList` mantiene `#tasks` y `#lists` como estado privado; `visibleTasks(filter, listId, view, today)` fija primero el alcance por vista —`main` acota a una lista y oculta lo futuro, `today` recorre todas las tareas por su clasificación temporal— y después aplica el filtro. `pendingCount` se deriva de `visibleTasks`, así que la pertenencia se decide en un solo punto. La decisión tomada: la vista «hoy» **excluye** las tareas de listas archivadas, coherente con el concepto de lista archivada («fuera de la navegación y de las vistas»).

- [x] Excluir de la rama `today` de `visibleTasks` las tareas cuya lista está archivada
  - Aporta: la vista transversal deja de mostrar lo aparcado, coherente con el concepto de lista archivada
  - Contexto: resolver la pertenencia contra `#lists` (un `Set` de ids archivados construido una vez por llamada); `pendingCount` hereda el comportamiento sin tocarla; actualizar el comentario del método para que describa la exclusión como semántica de la vista, no como narrativa de la corrección
- [x] Cubrir el caso en el módulo `views: main and today` de `tests.html`
  - Aporta: fija el comportamiento decidido donde viven los tests hermanos de la vista «hoy» y de archivado
- [x] Actualizar `docs/domains/001-lista-de-tareas.md`
  - Aporta: declara que «hoy» excluye listas archivadas en la descripción de la vista y del concepto de archivada, y retira la divergencia conocida del estado de salud
  - Contexto: la línea de divergencia citaba esta misma tarea como la que la resolvería

## Suite de pruebas esperada

- En la vista «hoy», una lista archivada con tarea de hoy o vencida no aporta nada; las tareas del día en listas vivas siguen apareciendo (caso de uso: consulta transversal del día).
- Con filtro `completed` en «hoy», tampoco aparecen completadas de listas archivadas (mismo caso de uso, rama de filtro).
- El contador de pendientes en la vista «hoy» no cuenta tareas de listas archivadas (caso de uso: contador de la vista activa).
- Al reactivar una lista archivada, sus tareas del día vuelven a aparecer en «hoy» (caso de uso: reactivar lista).
- La vista principal no cambia: sigue acotada a la lista activa (regresión).

## Revisión

- Subagente: 2026-09-26 — Aprueba (segunda pasada; la primera detectó una aserción incorrecta en el test de regresión de la vista principal, corregida)
- Usuario: 2026-09-26 — Aprueba
