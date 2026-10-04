# Lista operable: captura, completar, eliminar y marcar todas

## Estado

[x] Completada

## Tipo

desarrollo

## Objetivo

Convertir la pantalla en una lista de tareas operable: captura de tareas nuevas, ítems que se completan y se eliminan, casilla de «marcar todas» y visibilidad de lista y pie ligada al estado vacío — todo conforme a la especificación TodoMVC y a la guía de estilo.

## Dependencias

- 005 — los tokens de diseño disponibles.
- 007 — el dominio implementado.

## Entrada

- La pantalla mínima actual y los tokens declarados en `DESIGN.md`.
- El dominio implementado por la tarea 007, con el modelo de estado de D002.
- La especificación TodoMVC: input con foco al cargar, Enter crea y limpia, recorte de espacios y rechazo de vacíos, casilla por ítem con clase `completed` en el `<li>`, botón de eliminar visible al hover, «marcar todas» sincronizada con los ítems, y lista y pie ocultos cuando no hay tareas.

## Resultado esperado

- El input de captura crea la tarea al pulsar Enter, recorta los espacios, rechaza entradas vacías y queda listo para la siguiente.
- Cada ítem muestra su título, una casilla de completar que marca el `<li>` como `completed` y un botón de eliminar que aparece al hover.
- La casilla de «marcar todas» alterna el estado de todos los ítems y refleja el estado agregado: se marca cuando todos están completados y se desmarca al quedar alguno pendiente.
- La lista y el pie se ocultan cuando no hay tareas; reaparecen al capturar la primera.

## Criterios de calidad

- Cada comportamiento de la spec cubierto por una prueba de Testing Library, consultando por roles y texto visible y no por detalles internos.
- Todo el estilo nuevo usa tokens de `DESIGN.md`, verificado con `aplicar-guia-estilo` en estático y con evidencia renderizada.
- `npm run verify` en verde con cobertura al 100%.

## Procedimiento sugerido

1. Conectar el dominio a la vista con el modelo de estado decidido, sustituyendo la pantalla estática por la estructura de la spec (cabecera, captura, lista, pie).
2. Implementar la captura y los ítems con sus interacciones, escribiendo primero las pruebas.
3. Implementar «marcar todas» y la visibilidad condicional de lista y pie.
4. Aplicar la guía de estilo con evidencia renderizada.
5. Dejar `npm run verify` en verde.

## Notas

- La edición inline se deja a la tarea 009: esta tarea deja el ítem funcional sin doble clic.
- El pie se implementa vacío o con su estructura mínima; su contenido completo (contador, filtros, limpieza) pertenece a la tarea 010.

## Contexto

- Archivos similares: `src/components/App.tsx` + `App.css` + `App.test.tsx` — el cascarón a sustituir y el modelo de prueba vigente (Testing Library, consultas por rol y texto visible, enunciados en inglés); `src/state/TodoProvider.test.tsx` — el patrón de integración con el provider (`localStorage.clear()` en `beforeEach`, sonda que renderiza el contexto); `src/index.css` — los tokens ya materializados y el `:focus-visible` global en `--color-accent`. Precedente externo: `todo-app/todo-ui.js` del proyecto hermano — el vocabulario DOM de la spec (`toggle`, `destroy`, clase `completed` en el `<li>`, `toggle-all`, lista y pie ocultos sin tareas); sirve de referencia de marcado, no de forma (aquí la vista es React declarativa).
- Patrones: la vista consume el dominio solo por los hooks `useTodoState`/`useTodoDispatch` de `src/state/todo-context.ts` y despacha acciones con los creadores de `src/domain/tasks.ts` — nunca importa el reducer ni revalida invariantes (el recorte y el rechazo de vacíos son del dominio); el estado transitorio del input es `useState` local, fuera del modelo (D002); las pruebas viven junto al archivo (`*.test.tsx`), con enunciados en inglés (convención fijada en la revisión de la 007) y consultas por roles y texto visible; todo valor visual referencia tokens de `DESIGN.md`/`index.css` — un literal fuera de `:root` es deriva (`aplicar-guia-estilo`); `npm run verify` con cobertura al 100% es el contrato de cierre.
- Dominio: `docs/domains/001-lista-de-tareas.md` — vocabulario y frontera: la vista solo orquesta acciones (`add`, `toggle`, `remove`, `setAllCompleted`) y lecturas; las invariantes de título y los no-op sobre ids inexistentes ya los garantiza el dominio.
- Producto: ninguna aplica — no hay `product-docs/`; esta tarea produce el primer comportamiento observable del producto, candidato a documentación de uso al cierre (sensor `documentar-producto`).
- Lecciones: `consistencia-de-formatos` (el archivo de la tarea tiene formato establecido por las 005–007); `alcance` (hallazgos ajenos a la lista operable se reportan, no se corrigen); `anclas-y-trazabilidad` (si el documento de dominio se toca al cierre, los anclas apuntan al código); `vocabulario` (documentos en español llano); `estabilidad-temporal` (los documentos de entrada no se reescriben).
- Decisiones: `D001` del subproyecto (pila fijada: React, TS estricto, Vitest + Testing Library); `D002` del subproyecto (la vista consume el dominio vía `useReducer` + Context; la edición en curso es transitoria y no se persiste); `D028` del repositorio (cada expectativa de la suite declara su letra ZOMBIE); `D024` del repositorio (la documentación de producto vive en `product-docs/` con escenarios anclados a la suite — pertinente al cierre, primera funcionalidad observable); `D032` del repositorio (orden de sensores al cierre).
- Guía de estilo: `DESIGN.md` — contrato visual de la tarea: patrones declarados para campo de captura (`new-todo`), ítem con checkbox y separador, toggle con `accent-color`, acción destructiva descubrible al hover o foco, «marcar todas» discreto junto a la captura, lista y pie dentro de la tarjeta; anti-patrones vetados (literales fuera de tokens, foco del navegador sin personalizar, `visibility: hidden` en acciones, glifos crípticos como único indicio).

## Conectividad

**Conectada.** Todo lo que la tarea asume existe: el dominio ofrece ya las cuatro operaciones que la vista necesita (`addTask`, `toggleTask`, `removeTask`, `setAllCompleted` en `src/domain/tasks.ts`); los hooks `useTodoState`/`useTodoDispatch` y el `TodoProvider` montado en `main.tsx` están implementados; los tokens de `DESIGN.md` están materializados en `src/index.css` con el `:focus-visible` global; el arnés de pruebas usa `fireEvent` (convención vigente — no hay `user-event` instalado) y jsdom responde a teclado, clic y cambio; y el proyecto es servible con `npm run dev`/`preview` para la evidencia renderizada que exige `aplicar-guia-estilo`. No requiere piezas externas ni dependencias nuevas.

## Plan técnico

Subsistema: la vista hoy es un cascarón estático (`App.tsx` con título y estado vacío); debajo ya existe el circuito completo — dominio puro, provider montado en `main.tsx`, hooks de acceso y tokens en `index.css`. La tarea sustituye el cascarón por la estructura TodoMVC: cabecera, captura, «marcar todas», lista de ítems y pie mínimo — la vista solo orquesta acciones del dominio, sin revalidar invariantes.

- [x] Reescribir `src/components/App.test.tsx` como suite de comportamiento, pruebas primero: renderiza `<TodoProvider><App /></TodoProvider>` con `localStorage` limpio — la forma real de montaje, que además ejercita la persistencia de extremo a extremo
  - Aporta: fija el contrato observable de la spec antes de tocar la vista.
  - Contexto: `localStorage.clear()` en `beforeEach` (patrón de `TodoProvider.test.tsx`); enunciados en inglés; consultas por roles y texto visible; `fireEvent` — no hay `user-event` instalado.
- [x] Crear `src/components/TaskInput.tsx`: formulario de captura con `useState` local, `autoFocus`, Enter envía `addTask` y limpia el campo
  - Aporta: la captura con su estado transitorio, fuera del modelo (D002).
  - Contexto: el componente no valida el título — el dominio ya recorta y rechaza vacíos; el campo se limpia tras cada envío.
- [x] Crear `src/components/TaskItem.tsx` y `src/components/TaskList.tsx`: cada `<li>` lleva checkbox con nombre accesible que despacha `toggleTask`, el título visible, clase `completed` cuando procede, y botón `destroy` que despacha `removeTask`
  - Aporta: las interacciones por ítem de la spec — completar/reactivar y eliminar.
  - Contexto: el destroy no puede ser solo un glifo (anti-patrón de `DESIGN.md`) — precedente `todo-app/todo-ui.js`: `×` + `aria-label`/`title` «Eliminar tarea»; la casilla se nombra con el título de la tarea.
- [x] Reescribir `src/components/App.tsx`: composición con cabecera, captura, «marcar todas» sincronizada —marcada solo cuando todas están completadas, su cambio despacha `setAllCompleted`—, `TaskList` y un pie con estructura mínima; marcar-todas, lista y pie solo se renderizan con tareas presentes; el mensaje de vacío se conserva
  - Aporta: la estructura de la spec y la visibilidad ligada al estado vacío.
  - Contexto: `activeCount` del dominio da el estado agregado; el pie queda vacío de contenido — contador, filtros y limpieza son la 010; la edición inline es la 009, sin doble clic aquí.
- [x] Reescribir `src/components/App.css` con los patrones declarados en `DESIGN.md`: `new-todo`, ítem con separador `--color-border`, `completed` tachado en `--color-text-done`, `toggle` con `accent-color`, `destroy` en `--color-danger` con opacidad reducida en reposo y plena al hover/foco, marcar-todas discreto, pie con separador
  - Aporta: todo el estilo nuevo desde tokens — cero literales fuera de `:root`.
  - Contexto: el `:focus-visible` global ya da el anillo en `--color-accent`; el destroy nunca `visibility: hidden` — opacidad, y descubrible en táctil.
- [x] `npm run verify` en verde con cobertura al 100% + evidencia `aplicar-guia-estilo`: estática (sin literales fuera de `:root`) y renderizada (app servida, estados vacío/con tareas/completada, ambos temas si el medio lo permite)
  - Aporta: cierra los dos criterios de calidad restantes.

## Suite de pruebas esperada

Caso de uso «capturar una tarea»:

1. Al cargar, el foco está en el campo de captura (I).
2. Escribir un título y pulsar Enter crea el ítem con ese título y el campo queda vacío para la siguiente (O).
3. Un título con espacios alrededor se muestra recortado (B).
4. Enter con el campo vacío o de solo espacios no crea nada y la lista sigue oculta (Z/B).
5. Capturar varias tareas las muestra en orden de inserción (M).

Caso de uso «completar y eliminar ítems»:

6. La casilla de un ítem lo marca completado —el `<li>` lleva `completed`— y al desactivarla lo reactiva (O).
7. En una lista de varios ítems, cada casilla y cada botón actúan sobre su propio ítem (M).
8. El botón de eliminar quita el ítem de la lista (O); eliminar el último deja la pantalla como al inicio (B).

Caso de uso «marcar todas»:

9. Marcar todas en una lista mixta completa todos los ítems y la casilla queda marcada (M).
10. Con todas completadas, desmarcarla las reactiva todas (M).
11. La casilla refleja el estado agregado: se desmarca sola al reactivar cualquier ítem (I).

Caso de uso «visibilidad ligada al estado vacío»:

12. Sin tareas no hay lista ni pie y se ve el mensaje de vacío (Z).
13. Al capturar la primera tarea aparecen lista y pie; al quedar cero vuelven a ocultarse (B).
14. Con tareas capturadas, remontar la app con el mismo storage muestra la lista conservada (I).

15. Regresión: `npm run verify` pasa con cobertura al 100% (arnés, sin letra).

## Desviaciones del plan

- Las pruebas de captura disparan el envío del formulario (`fireEvent.submit`) en lugar de la tecla Enter. Motivo: jsdom no implementa el envío implícito de formularios, así que `keyDown Enter` no llega al `onSubmit`. Decisión: el componente mantiene `<form onSubmit>` —la plataforma mapea Enter al envío en navegadores reales— y la prueba ejercita el mismo evento que Enter produce; la correspondencia Enter→submit es comportamiento de plataforma, fuera del alcance de prueba unitaria. Verificado en Firefox: completar el campo y pulsar Enter crea la tarea.
- La casilla por ítem toma su nombre accesible del `<label>` del título vía `aria-labelledby` en lugar de `htmlFor`. Motivo: `htmlFor` haría que un clic sobre el título marcara la casilla, y la tarea 009 necesita el label libre para el doble clic de edición (precedente `todo-app/todo-ui.js`, donde el label no está asociado). Decisión: nombrar sin asociar — el nombre accesible es el propio título.
- El pie quedó sin renderizar pese a figurar en el Resultado esperado, el plan y la expectativa 13. Motivo: en la revisión de UI el usuario observó que una banda vacía con borde parece un defecto; decidió retirarlo y que la tarea 010 lo introduzca ya con su contenido (contador, filtros, limpieza). Decisión: no se renderiza elemento de pie en esta tarea; las expectativas 12 y 13 se verifican sobre la lista y «marcar todas», que siguen gateados por `hasTasks`.
- «Marcar todas» no quedó «discreto junto a la captura» como describía la guía: en la revisión de UI el usuario señaló que junto al input se leía como casilla del campo y eligió la fila alineada con la columna de casillas, con etiqueta visible «Todas». La misma revisión corrigió el doble separador del último ítem, añadió el token `--size-toggle` 20px (casillas antes en `--space-3`), redujo `--font-display` a `clamp(24px, 6vw, 32px)` y compactó el padding del campo de captura a `--space-1` vertical/`--space-2` horizontal. Decisión: `DESIGN.md` e `index.css` se actualizaron en el mismo cambio — la guía es la fuente y el código su materialización (`documentar-guia-estilo`).

## Revisión

- Subagente: 2026-10-04 — Aprueba (primera pasada: 2 correcciones menores aplicadas — `--font-label` en `destroy` y pie consultable por rol; segunda: aprueba; tercera: aprueba tras las correcciones de UI del usuario — separador único, `--size-toggle`, fila maestra; cuarta: solicita cambios solo por la trazabilidad del pie, resuelta con su entrada en Desviaciones)
- Usuario: 2026-10-04 — Aprueba (con mejoras de UI incorporadas durante la revisión: fila maestra con etiqueta «Todas», pie diferido a la 010, `--font-display` reducido, `--size-toggle` fijado en 20px, padding de captura compactado)
