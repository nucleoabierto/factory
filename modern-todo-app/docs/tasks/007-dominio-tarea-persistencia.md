# Dominio de la tarea y persistencia local

## Estado

[x] Completada

## Tipo

desarrollo

## Objetivo

Implementar el dominio de la tarea —entidad con sus invariantes y las operaciones del ciclo de vida— sobre el modelo de estado decidido, con persistencia en el navegador según la especificación TodoMVC.

## Dependencias

- 006 — el modelo de estado del dominio decidido.

## Entrada

- La decisión de modelo de estado registrada en `docs/decisions/` por la tarea 006.
- La especificación TodoMVC: claves `id`, `title`, `completed` por ítem; almacenamiento local bajo el nombre `todos-react`; título recortado y no vacío; el estado de edición no se persiste.
- La suite con cobertura al 100% como contrato: todo el módulo de dominio queda probado.

## Resultado esperado

- El dominio implementado en `src/` como módulo propio, con las operaciones completas del ciclo de vida: crear con validación, completar y reactivar, renombrar, eliminar, marcar y desmarcar todas, limpiar completadas, contador de pendientes y selección por filtro.
- Persistencia local funcional: la lista se conserva entre recargas con el formato de la spec; el estado transitorio (edición) no se escribe.
- Pruebas unitarias del dominio y de la persistencia en verde, con cobertura total del módulo.

## Criterios de calidad

- Las invariantes las garantiza el dominio, no la interfaz: un título vacío o de solo espacios no crea la tarea y una edición que lo deja vacío la destruye.
- El formato persistido respeta las claves de la spec (`id`, `title`, `completed`) y el nombre de almacenamiento `todos-react`.
- `npm run verify` en verde con cobertura al 100%.

## Procedimiento sugerido

1. Diseñar el módulo de dominio y su forma de estado según la decisión registrada.
2. Implementar las operaciones e invariantes escribiendo primero las pruebas.
3. Cablear la persistencia local y probar el ciclo completo escribir-leer.
4. Dejar `npm run verify` en verde.

## Contexto

- Archivos similares: `src/components/App.tsx` + `App.test.tsx` — el único código de aplicación y el modelo de prueba vigente (Testing Library, consultas por rol y texto visible, enunciados en español); `src/setupTests.ts` y `vite.config.ts` — el arnés: jsdom, `@testing-library/jest-dom`, cobertura v8 con umbrales al 100% que excluyen `main.tsx`, `setupTests.ts` y los propios tests. Precedente externo: `todo-app/todo-domain.js` + `todo-storage.js` del proyecto hermano — mismo dominio TodoMVC modelado como módulo sin DOM ni storage, con almacenamiento tolerante a datos ausentes o corruptos; sirve de referencia de vocabulario, no de forma (la decisión D002 fija otra estructura).
- Patrones: el dominio es un módulo TypeScript puro bajo `src/`, sin dependencia de React ni de `localStorage`; las pruebas viven junto al archivo que prueban (`*.test.ts`); la persistencia se cablea a mano —hidratación perezosa, escritura tras cada cambio, validación del dato recuperado— tras un puerto intercambiable (D002); `npm run verify` con cobertura al 100% es el contrato de cierre.
- Dominio: ninguna aplica — el subproyecto no tiene `docs/domains/`; esta tarea introduce los primeros conceptos candidatos a documentar al cierre.
- Producto: ninguna aplica — no hay documentación de producto y el cambio no altera comportamiento observable todavía (la lista operable es la tarea 008).
- Lecciones: `consistencia-de-formatos` (el archivo de la tarea tiene formato establecido por las 002–006); `alcance` (hallazgos ajenos al dominio/persistencia se reportan, no se corrigen); `anclas-y-trazabilidad` (si el cierre produce el primer documento de dominio, los anclas apuntan al código, no a la tarea); `vocabulario` (documentos en español llano).
- Decisiones: `D001` del subproyecto (pila fijada: TS estricto, Vitest + Testing Library); `D002` del subproyecto (dominio como módulo puro con estado serializable y transiciones, consumido por `useReducer` + Context, persistencia tras un puerto); `D028` del repositorio (cada expectativa de la suite declara su letra ZOMBIE); `D026` del repositorio (formato del documento de dominio, si el sensor de cierre lo produce).

## Conectividad

**Conectada.** Todo lo que la tarea asume existe: la decisión de modelo de estado está registrada como `D002` en `docs/decisions/`; la toolchain verifica con `npm run verify` y cobertura al 100% (`vite.config.ts`); jsdom aporta `localStorage` a las pruebas y `setupTests.ts` ya limpia entre tests; `src/` es el hogar vigente del código de aplicación donde el módulo de dominio y el adaptador se crean dentro del propio alcance de la tarea. No requiere piezas externas nuevas ni dependencias adicionales (D002).

## Plan técnico

Subsistema: `src/` hoy solo contiene el cascarón de la pantalla (`App.tsx` + `App.css`); no existe código de dominio ni de infraestructura. La tarea crea el módulo de dominio puro (`src/domain/`), el puerto de persistencia con su adaptador `localStorage` (`src/persistence/`) y el cableado React mínimo que D002 prescribe (`useReducer` + Context) para que la aplicación hidrate y escriba; la vista sigue siendo el cascarón — las operaciones con interfaz son la tarea 008. La estructura por capas (`domain/`, `persistence/`, `state/`) es un patrón documentado en React/TypeScript — la carpeta nombra la capa y el archivo el concepto—, verificado en investigación breve durante la planeación.

- [x] Crear el dominio en `src/domain/tasks.ts`, pruebas primero: tipos `Task`/`TodoState`, vocabulario de acciones serializables, `reducer` puro y selectores (`activeCount`, `selectByFilter`); las invariantes —recorte del título, título vacío no crea, renombrar a vacío destruye— viven dentro del módulo
  - Aporta: el corazón de la tarea — todas las operaciones del ciclo de vida sobre estado serializable, sin React ni `localStorage`, testeables directamente con Vitest.
  - Contexto: las acciones son objetos serializables autocontenidos — el `id` de una tarea nueva lo genera el *action creator*, no el reducer — porque son el vocabulario que la cola de sincronización y la API consumirán (D002). `TodoState` es solo la colección: la edición en curso es estado transitorio de la vista (tarea 009) y no entra en este modelo.
- [x] Crear el puerto y el adaptador en `src/persistence/task-storage.ts`, pruebas primero: interfaz `TaskStorage` (`load`/`save`) + implementación sobre `localStorage` bajo la clave `todos-react`, tolerante a storage ausente, JSON corrupto o acceso denegado; la validación del dato recuperado vive en el dominio, no en el adaptador
  - Aporta: materializa el puerto intercambiable de D002; el formato persistido —array JSON con claves `id`, `title`, `completed`— queda garantizado porque `save` serializa `Task` directamente y el estado transitorio no forma parte de `Task`.
  - Contexto: precedente `todo-app/todo-storage.js` — la capa de almacenamiento mueve datos y tolera corrupción sin conocer el modelo; no duplicar la validación de forma en ambas capas.
- [x] Crear `src/state/TodoProvider.tsx`, pruebas primero: `useReducer` sobre el reducer del dominio, inicialización perezosa que hidrata desde el puerto validando el dato, efecto que persiste tras cada cambio, y Context con hooks de acceso
  - Aporta: conecta dominio, React y persistencia según D002; la recarga conserva la lista porque la hidratación ocurre en cada arranque.
  - Contexto: «la edición no se persiste» se cumple por construcción — `save` solo ve `TodoState`, que no contiene transitorios.
- [x] Cablear el provider en `main.tsx` sin tocar la vista
  - Aporta: la persistencia funciona en la aplicación real servida — hidrata y escribe desde el primer render; la pantalla sigue mostrando el cascarón intacto.
  - Contexto: `App` aún no consume el contexto — conectar la interfaz a las acciones es la tarea 008; aquí solo se monta el Provider.
- [x] Ejecutar `npm run verify` en verde con cobertura al 100%
  - Aporta: el contrato de cierre de la tarea queda verificado.

## Suite de pruebas esperada

Caso de uso «gestionar la lista de tareas» (dominio puro):

1. Crear una tarea en lista vacía la deja con una sola tarea pendiente con el título dado (Z→O).
2. Crear varias tareas conserva el orden de inserción y asigna identificadores distintos (M).
3. Un título con espacios alrededor se guarda recortado; un título vacío o de solo espacios no crea nada (B).
4. Completar una tarea la marca hecha y reactivarla la devuelve a pendiente (O); operar sobre un identificador inexistente no altera la lista (B).
5. Renombrar guarda el título recortado (O); renombrar a título vacío elimina la tarea (B); renombrar un identificador inexistente no altera la lista (B).
6. Eliminar una tarea la quita de la lista (O); eliminar un identificador inexistente no altera la lista (B).
7. Marcar todas en una lista mixta las completa; desmarcar todas las devuelve a pendientes; sobre lista vacía es inocuo (M/Z).
8. Limpiar completadas quita solo las hechas conservando las pendientes (M); sin completadas no altera la lista (Z).
9. El contador de pendientes refleja 0, 1 y varios correctamente (Z/O/M).
10. La selección por filtro devuelve todas, solo pendientes o solo completadas (O/M).
11. Ninguna transición muta el estado de entrada — el reducer es puro (I).

Caso de uso «conservar la lista entre recargas» (persistencia):

12. Guardar escribe bajo `todos-react` un array JSON cuyos ítems llevan exactamente las claves `id`, `title`, `completed` — sin estado transitorio (I).
13. Cargar sin dato previo devuelve lista vacía (Z); el ciclo guardar→cargar devuelve la misma lista (I).
14. JSON corrupto devuelve lista vacía sin lanzar (E); una entrada malformada dentro del array se descarta sin contaminar las válidas (B); `localStorage` que lanza excepción no rompe ni la carga ni la escritura (E).

Caso de uso «la aplicación conserva lo guardado» (integración React):

15. El provider hidrata el estado desde `todos-react` al montar, persiste tras un dispatch y un nuevo montaje con el mismo storage recupera el estado — la recarga simulada (I).
16. Regresión: las pruebas existentes de `App` siguen en verde y `npm run verify` pasa con cobertura al 100% (arnés, sin letra).

## Desviaciones del plan

- Los contextos y hooks de acceso viven en `src/state/todo-context.ts`, separados del componente en `TodoProvider.tsx`. Motivo: `eslint-plugin-react-refresh` exige que un archivo con componentes solo exporte componentes, y el lint corre con `--max-warnings 0`; exportar hooks desde `TodoProvider.tsx` rompería el lint. Decisión: dividir el módulo por rol — el provider como único componente exportado, contexts y hooks en el archivo `.ts` vecino — sin cambiar el alcance del plan.
- A petición del usuario durante la revisión, los enunciados de las pruebas quedaron en inglés (el contexto documentaba el patrón en español; `App.test.tsx` se tradujo también para no dejar la convención partida) y se eliminaron los casts `as unknown as`/`as Record<…>` de las pruebas: el adaptador ahora acepta `Pick<Storage, 'getItem'|'setItem'>` —dependencia mínima del puerto— y `isTaskLike` estrecha con `in` en lugar de castear. El `unknown` de `load()`/`hydrateTasks()` se mantiene por diseño: es la frontera del dato deserializado, que el dominio valida.

## Revisión

- Subagente: 2026-10-03 — Aprueba
- Usuario: 2026-10-03 — Aprueba
