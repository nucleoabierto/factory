# Vista «hoy» y exclusión de lo futuro de la vista principal

## Estado

[ ] Pendiente | [ ] En progreso | [ ] En revisión | [x] Completada | [ ] Bloqueada

## Tipo

desarrollo

## Objetivo

Hacer real la consulta «qué me toca ahora»: una vista «hoy» que acota la lista a lo vencido y lo del día, y la vista principal que deja de mostrar lo programado a futuro hasta que llega su fecha.

## Dependencias

- 017

## Entrada

- La asignación de fecha y la distinción visual de la tarea 017.
- El mecanismo de filtros de vista existente (`FILTERS`, `setFilter`, persistencia del filtro).

## Resultado esperado

- La vista principal muestra lo sin fecha, lo vencido y lo de hoy; lo programado a futuro no aparece hasta que llega su día.
- Existe una vista «hoy» —junto a los filtros o como navegación equivalente— que muestra solo lo vencido y lo del día, como jornada acotada.
- La elección de vista se conserva entre recargas, al estilo del filtro actual.
- El contador de pendientes refleja lo que la vista activa considera presente (decidir y documentar: pendientes visibles o total; la elección queda en el procedimiento).

## Criterios de calidad

- Una tarea con fecha futura no aparece en la vista principal; al llegar su día, aparece.
- La vista «hoy» muestra exactamente lo vencido y lo de hoy, nada más.
- La vista elegida se restaura al recargar; con el dato persistido inválido, se vuelve a la vista por defecto.
- Los filtros todas/pendientes/completadas siguen funcionando dentro de la vista elegida.
- La suite de `tests.html` pasa en verde con tests nuevos de la exclusión de futuras y de la vista «hoy».
- Sin errores en consola.

## Procedimiento sugerido

1. Extender la consulta de tareas visibles del dominio para excluir futuras y para la vista «hoy», usando la clasificación ya existente.
2. Añadir la vista «hoy» al mecanismo de navegación y persistir la elección.
3. Ajustar el contador a la decisión tomada y reflejarla en los tests.
4. Escribir los tests de exclusión de futuras, contenido de «hoy», persistencia de la vista y convivencia con los filtros; verificar en el navegador.

## Notas

- Los commits de este proyecto llevan el ámbito `todo-app` en Conventional Commits (`tipo(todo-app): descripción`).
- La vista «hoy» es transversal por decisión de la propuesta: si la épica de múltiples listas ya está ejecutada, «hoy» mezcla tareas de todas las listas.

## Contexto

- Archivos similares:
  - `app.js` — el mecanismo de filtros (`FILTERS`, `App.filter`, `App.setFilter`, `Storage.loadFilter/saveFilter` con fallback a `'all'`) es el modelo directo para la vista «hoy»; `TaskList.visibleTasks(filter, listId)` es la consulta a extender; `TaskList.dateStatus(date, today)` ya clasifica vencida/hoy/futura con el día de referencia inyectable; `App.viewModel` proyecta las colecciones que la vista consume.
  - `tests.html`, módulo «filters and clear completed» — patrón de tests de filtros: `beforeEach` limpia localStorage y resetea `App`, fixture HTML literal en `qunit-fixture`, helper `texts()` para leer la lista renderizada, test de persistencia y tolerancia a valor corrupto.
  - `tests.html`, módulo «task dates» — helper `day(offset)` para días relativos al día real y uso de `dateStatus` con `today` inyectado.
  - `index.html` — los enlaces de filtro en `<ul class="filters">` con `data-action="set-filter"` son el punto de extensión de la navegación.
- Patrones:
  - Estado de vista persistido: constante de clave + lista de valores válidos + `Storage.loadX` con validación y fallback + `App.setX` que guarda y renderiza.
  - Eventos por la tabla de dispatch delegada (`dispatchTable` por tipo y `data-action`); la vista no conecta listeners.
  - El view-model lleva las colecciones ya proyectadas; el render no decide reglas de pertenencia (contrato de la tarea 024).
  - La clasificación temporal es consulta del dominio (`dateStatus`), no de la presentación; «hoy» se obtiene de forma comprobable en tests.
  - Tests: módulo QUnit por funcionalidad, fixture literal, estado reseteado en `beforeEach`, días relativos con `day(offset)`.
- Lecciones:
  - `idioma-del-codigo` — identificadores, claves de storage y mensajes de test en inglés; documentación en español.
  - `comunicacion-en-codigo` — nombres de parámetros que no presuponen lo validado; comentarios sobre razones duraderas.
  - `fidelidad-al-plan` — el diff se limita al plan aprobado; extras se declaran como desviación.
  - `scope-del-subproyecto` — los artefactos viven en `todo-app/`.
- Decisiones:
  - No existe `docs/decisions/` en el subproyecto; ninguna aplica como registro. La guía vigente es el plan técnico de la épica 003: la vista «hoy» es transversal —mezcla tareas de todas las listas— y la clasificación vive en el dominio.

## Conectividad

Veredicto: **conectada**.

Todo lo que la tarea asume existe en `app.js`: `TaskList.dateStatus` clasifica fechas con el día de referencia inyectable (016), el control de fecha y la distinción `due-*` ya están cableados (017), el mecanismo de filtros (`FILTERS`, `setFilter`, `Storage.loadFilter/saveFilter`) ofrece el patrón de elección de vista persistida, `TaskList.visibleTasks(filter, listId)` es el punto de extensión de la consulta y el contrato de vista de la 024 deja la proyección en el view-model. El concepto «vista» (principal/hoy) aún no existe, pero crearlo es precisamente el alcance de esta tarea; no es capacidad base ausente.

## Plan técnico

`app.js` separa dominio (`TaskList`), persistencia (`Storage`), presentación (`UI` + tabla de dispatch delegada) y composición (`App`). El estado de vista nuevo sigue el patrón del filtro: lista de valores válidos, clave de storage propia con fallback, setter en `App` que valida, persiste y renderiza, y proyección en el view-model. La membresía temporal vive en el dominio: `dateStatus` clasifica cada fecha respecto a un día de referencia inyectable, y la vista «hoy» es transversal —ignora el acotamiento por lista— por decisión de la épica.

- [x] Extender `TaskList.visibleTasks` a `visibleTasks(filter, listId, view, today)`: la vista `main` conserva el acotamiento por lista y excluye las tareas `future`; la vista `today` recorre todas las listas y admite solo `overdue` y `today`
  - Aporta: la regla de pertenencia de cada vista queda en el dominio, con el día inyectable para tests
  - Contexto: `dateStatus(null, today)` devuelve `null`, así que lo sin fecha sobrevive en `main` y queda fuera de `today` sin casos especiales
- [x] Extender `TaskList.pendingCount` con los mismos ejes `view`/`today`: cuenta los pendientes presentes en la vista pedida
  - Aporta: el contador del pie refleja lo que la vista activa considera presente (decisión: pendientes de la vista, no total); los contadores del selector de listas no cambian —siguen con el total por lista, llamando con la vista por defecto
- [x] Añadir el estado de vista en la composición: `VIEWS`, `VIEW_KEY`, `Storage.loadView/saveView` con validación y fallback a `'main'`, `App.view`, `App.setView` (valida, limpia `editingId`, persiste y renderiza) y restauración en `App.load`
  - Aporta: la elección de vista se conserva entre recargas y tolera datos corruptos, al estilo del filtro
- [x] Proyectar `view` en el view-model y pasarla a `visibleTasks`/`pendingCount` desde `App`
  - Aporta: el contrato de vista sigue llevando colecciones ya proyectadas; el render no decide membresía
- [x] Añadir el conmutador de vistas en `index.html` y su cableado: enlaces `#view-main`/`#view-today` con `data-action="set-view"` y `data-view`, entrada `click → 'set-view'` en la tabla de dispatch y marca `.selected` en `renderFooter`
  - Aporta: la vista «hoy» es accesible como navegación equivalente a los filtros
  - Contexto: vista y filtro son ejes independientes; el conmutador va en su propia lista del footer, no dentro de `<ul class="filters">`
- [x] Escribir los tests en un módulo nuevo de `tests.html` con fixture propio (conmutador incluido) y el helper `day(offset)` para días relativos; verificar `index.html` y la suite en el navegador
  - Aporta: cubre la suite esperada sobre el comportamiento nuevo

## Suite de pruebas esperada

- Una tarea con fecha futura no aparece en la vista principal; una vencida, una de hoy y una sin fecha sí (caso de uso: exclusión de lo programado a futuro).
- En la vista «hoy» aparecen exactamente las tareas vencidas y las de hoy —ni sin fecha ni futuras— y mezcla tareas de todas las listas (caso de uso: consultar la jornada, transversal).
- Cambiar a la vista «hoy» y recargar la restaura; un valor persistido inválido devuelve a la vista principal (caso de uso: persistencia de la vista elegida).
- Dentro de la vista «hoy», los filtros todas/pendientes/completadas siguen acotando el resultado (caso de uso: convivencia de vista y filtro).
- El contador del pie refleja los pendientes presentes en la vista activa, no el total (caso de uso: contador acotado a la vista).
- El enlace de la vista activa lleva la clase `selected` y la otra no (caso de uso: navegación con estado visible).
- La suite completa pasa en verde sin errores en consola.

## Desviaciones del plan

- Tests existentes del módulo «task dates» adaptados: usaban fechas futuras (`day(1)`, `day(3)`) cuyas tareas ahora quedan ocultas al asignarlas, así que se cambiaron a fechas de hoy o vencidas. Motivo: la exclusión de futuras es el comportamiento pedido por esta tarea; los tests asumían renderizado universal. Decisión: mantener la cobertura con fechas visibles.
- La clase `due-future` ya no es alcanzable desde el estado (las futuras no se renderizan en ninguna vista), así que se verifica renderizando un view-model literal con `UI.render`, al estilo del módulo «view contract». Motivo: conservar la cobertura DOM de la distinción visual. Decisión: test nuevo con view-model literal en lugar de eliminar la cobertura.
- El conmutador de vistas reutiliza las reglas de `.filters` en `style.css` (selectores extendidos a `.views`): el plan no declaraba CSS y la lista necesitaba el aspecto de navegación existente. Decisión: compartir las reglas en lugar de duplicarlas.

## Revisión

- Subagente: 2026-09-26 — Aprueba (hallazgos menores: clearCompleted y creación en vista «hoy», inclusión de archivadas en «hoy», semántica del contador por lista; derivados a las tareas 025–027 y a la documentación de dominio)
- Usuario: 2026-09-26 — Aprueba
