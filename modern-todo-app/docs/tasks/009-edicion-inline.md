# Edición inline de tareas

## Estado

[x] Completada

## Tipo

desarrollo

## Objetivo

Implementar la edición inline del título de una tarea con las reglas completas de la especificación TodoMVC: activación por doble clic, foco en el campo, guardado al perder el foco y con Enter, cancelación con Escape y destrucción cuando el texto queda vacío.

## Dependencias

- 008 — la lista operable.

## Entrada

- La lista operable de la tarea 008, con ítems funcionales y dominio conectado.
- La especificación TodoMVC de edición: la clase `editing` en el `<li>` oculta el resto de controles y muestra un input con el título, que recibe el foco; el guardado recorta el texto y lo aplica, el texto vacío destruye la tarea, Escape descarta los cambios; el estado de edición no se persiste entre recargas.

## Resultado esperado

- Doble clic sobre el título de un ítem activa el modo edición con el input visible y enfocado.
- Guardar (al perder el foco o con Enter) recorta y aplica el título nuevo; si queda vacío, la tarea se elimina.
- Escape abandona la edición y descarta los cambios.
- La edición activa no se escribe en el almacenamiento: al recargar, la lista vuelve a su estado persistente.

## Criterios de calidad

- Cada regla de edición de la spec cubierta por una prueba de Testing Library.
- Los estados de edición usan tokens de `DESIGN.md`, verificados con `aplicar-guia-estilo`.
- `npm run verify` en verde con cobertura al 100%.

## Procedimiento sugerido

1. Añadir el estado de edición al modelo como estado transitorio, excluido de la persistencia.
2. Implementar las interacciones del modo edición, escribiendo primero las pruebas de cada regla.
3. Estilizar el modo edición con tokens y comprobar la evidencia renderizada.
4. Dejar `npm run verify` en verde.

## Contexto

- Archivos similares: `src/components/TaskItem.tsx` — el ítem a extender (label con `useId`, toggle y destroy despachando al dominio); `src/components/App.test.tsx` — la suite de comportamiento vigente (consultas por rol y texto visible, `fireEvent`, enunciados en inglés, `localStorage.clear()` en `beforeEach`); `src/components/App.css` — los patrones de la lista; `DESIGN.md` — el contrato visual, hoy sin patrón declarado para el campo de edición (laguna que esta tarea cierra). Precedente externo: `todo-app/todo-ui.js` — doble clic sobre el label entra en edición, input `.edit` con la clase `editing` en el `<li>`, Enter/blur guardan, Escape cancela.
- Patrones: la edición es estado transitorio de la vista —D002 lo reserva explícitamente fuera del modelo del dominio—, así que vive como `useState` local del ítem; el guardado despacha `renameTask`/`removeTask` de `src/domain/tasks.ts`, que ya recortan, destruyen al vacío e ignoran ids inexistentes; las pruebas consultan por roles y texto visible (la clase `editing` es parte de la spec TodoMVC y se verifica sobre el `listitem` por rol).
- Dominio: `docs/domains/001-lista-de-tareas.md` — `renameTask` guarda el título recortado y destruye la tarea al renombrar a vacío; la vista no revalida.
- Producto: `product-docs/funcionalidades/001-lista-de-tareas.md` — la edición añade escenarios observables que el sensor `documentar-producto` incorporará al cierre.
- Lecciones: `consistencia-de-formatos` (formato establecido del archivo de tarea); `alcance` (hallazgos ajenos se reportan); `vocabulario` (español llano); `estabilidad-temporal` (los documentos de entrada no se reescriben).
- Decisiones: `D001` del subproyecto (pila); `D002` del subproyecto (la edición en curso es transitoria de la vista y no se persiste); `D028` del repositorio (letras ZOMBIE por expectativa).

## Conectividad

**Conectada.** Todo lo que la tarea asume existe: la lista operable de la 008 está commiteada —`TaskItem` con label libre para el doble clic (la 008 dejó `htmlFor` sin asociar precisamente para esto)—, el dominio ofrece `renameTask`/`removeTask` con las invariantes de recorte y destrucción al vacío, el arnés de pruebas ejercita doble clic y teclado vía `fireEvent`, y `DESIGN.md`/`index.css` dan los tokens para el campo de edición. No requiere dependencias nuevas.

## Plan técnico

Subsistema: `TaskItem.tsx` gana el modo edición como estado local; el dominio y el provider no cambian — el guardado es un dispatch normal y la edición muere con el componente, así que no puede llegar al almacenamiento.

- [x] Pruebas primero en `src/components/App.test.tsx`: doble clic activa edición (input con el título, enfocado, `editing` en el `listitem`, controles ocultos), Enter guarda recortado, Enter con vacío elimina, Escape cancela, blur guarda, la edición no se persiste al remontar
- [x] `TaskItem.tsx`: `useState` local de edición; label con `onDoubleClick`; en edición, input `.edit` con `defaultValue`, `autoFocus`, `aria-label` «Editar {título}», Enter/Escape en `onKeyDown`, guardado en `onBlur` despachando `renameTask`/`removeTask`
- [x] `App.css` + `DESIGN.md`: patrón del campo de edición con tokens — como el campo de captura (fondo, borde, radio, foco accent), tipografía de tarea; el ítem en edición oculta toggle y destroy con `display: none`
- [x] Evidencia `aplicar-guia-estilo` renderizada en Firefox: doble clic real, guardado, cancelación
- [x] `npm run verify` en verde con cobertura al 100%

## Suite de pruebas esperada

Caso de uso «editar el título de una tarea»:

1. Doble clic sobre el título activa la edición: aparece el campo con el título actual, enfocado, el `<li>` lleva `editing` y desaparecen toggle y destroy (I).
2. Enter guarda el título recortado y sale del modo edición (O/B).
3. Enter con el campo vacío o de solo espacios elimina la tarea (B).
4. Escape abandona la edición: el título original queda intacto y sin campo visible (O).
5. Perder el foco guarda los cambios, igual que Enter (O).
6. El texto en edición no llega al almacenamiento: al remontar con el mismo storage vuelve el título persistente (I).

7. Regresión: `npm run verify` pasa con cobertura al 100% (arnés, sin letra).

## Desviaciones del plan

- Los inputs `toggle` y `edit` del ítem llevan `key` distintos. Motivo: al ocupar la misma posición en el `<li>`, React reutilizaba el `<input>` del toggle para el campo de edición en vez de montar uno nuevo —el `autoFocus` no disparaba y el checkbox controlado mutaba a no controlado—. Decisión: claves distintas fuerzan el desmontaje/montaje correcto.
- `eslint.config.js` excluye `site/` (globalIgnores). Motivo: el sitio de MkDocs generado por la tarea de documentación contiene JS de terceros que ESLint lintearía en cada `npm run verify`. Decisión: el artefacto generado se ignora como `dist` y `coverage`.
- El campo de edición quedó con borde `--color-border-strong` —no «como el campo de captura» que decía el plan— y la regla `li.editing .toggle/.destroy { display: none }` del plan no llegó al CSS final. Motivo: la revisión detectó que la guía ya declaraba el borde fuerte para la edición (rol del token y Estados) y que la regla de ocultación era código muerto —el retorno temprano no monta esos controles—. Decisión: alinear con la guía vigente y eliminar la regla muerta; `DESIGN.md` declara la diferencia del borde y que en edición solo se muestra el campo.

## Revisión

- Subagente: 2026-10-04 — Aprueba (primera pasada: solicitó cambios — la guía se autocontradecía en el borde del campo de edición y el marcador del índice; corregidos, más la eliminación de una regla CSS muerta; segunda pasada: aprueba sin regresiones)
- Usuario: 2026-10-04 — Aprueba
