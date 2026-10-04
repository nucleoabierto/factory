# Lista de tareas

## Propósito

Gestionar el ciclo de vida de una lista de tareas conforme a la especificación TodoMVC: qué es una tarea, qué operaciones la transforman, qué invariantes se cumplen siempre y qué se conserva en el navegador entre visitas.

## Referencia del modelo

- **Lenguaje ubicuo:**
  - **Tarea:** unidad del dominio con identificador único, título y estado de completitud; es la forma que se persiste (`id`, `title`, `completed`).
    - Ancla: `Task` en `src/domain/tasks.ts`
    - Origen: `docs/tasks/007-dominio-tarea-persistencia.md`
  - **Lista de tareas:** colección ordenada de tareas; es todo el estado del dominio —serializable y sin transitorios—.
    - Ancla: `TodoState` en `src/domain/tasks.ts`
  - **Acción:** operación nombrada del ciclo de vida, serializable y autocontenida; el `id` de una tarea nueva lo genera el creador de la acción, no el reducer.
    - Ancla: `TaskAction` y los creadores `addTask`…`clearCompleted` en `src/domain/tasks.ts`
  - **Filtro:** criterio de selección de la vista —`all`, `active` o `completed`—; es una lectura, no estado.
    - Ancla: `TaskFilter` y `selectByFilter` en `src/domain/tasks.ts`
  - **Puerto de persistencia:** contrato `load`/`save` que intercambia el dato del dominio sin conocerlo; `load` devuelve el dato crudo y la validación es del dominio.
    - Ancla: `TaskStorage` en `src/persistence/task-storage.ts`
- **Entidades / estado:**
  - `Task`: `{ id: string; title: string; completed: boolean }` — ancla: `src/domain/tasks.ts`.
  - `TodoState`: `{ tasks: Task[] }` — única forma de estado del dominio; la edición en curso es transitoria de la vista y no existe aquí — ancla: `src/domain/tasks.ts`.
  - El estado persistido es el array de tareas serializado como JSON bajo la clave `todos-react` — ancla: `TASKS_STORAGE_KEY` en `src/persistence/task-storage.ts`.
- **Invariantes:**
  - El título se guarda siempre recortado y nunca vacío: un título vacío o de solo espacios no crea la tarea, y renombrar a vacío la destruye — ancla: casos `add` y `rename` de `todoReducer` en `src/domain/tasks.ts`.
  - Las operaciones sobre un identificador inexistente no alteran la lista — ancla: las guardas de `todoReducer`.
  - Las transiciones no mutan el estado de entrada — ancla: `todoReducer` (inmutable en todos los casos).
  - Tras hidratar, los identificadores son únicos y cada entrada lleva exactamente las claves de la spec — ancla: `hydrateTasks` e `isTaskLike` en `src/domain/tasks.ts`.
- **Operaciones:**
  - Ciclo de vida completo: crear, completar/reactivar, renombrar, eliminar, marcar/desmarcar todas y limpiar completadas — ancla: `todoReducer` en `src/domain/tasks.ts`.
  - Lecturas: contador de pendientes y selección por filtro — ancla: `activeCount` y `selectByFilter`.
  - Hidratación: validar y normalizar el dato recuperado, descartando entradas malformadas y duplicados — ancla: `hydrateTasks`.
  - Persistencia tolerante: lectura y escritura que sobreviven a storage ausente, JSON corrupto o acceso denegado — ancla: `createLocalStorageTaskStorage` en `src/persistence/task-storage.ts`.

## Explicación del dominio

- **Fronteras:**
  - Dentro: el estado serializable, las transiciones con sus invariantes, las lecturas derivadas y la validación del dato recuperado — todo en `src/domain/tasks.ts`, módulo puro sin React ni `localStorage`.
  - Fuera: el acceso a bytes y a la API de storage (el adaptador `src/persistence/task-storage.ts` implementa el puerto `TaskStorage`); el cableado con React (`useReducer` + Context en `src/state/`); la presentación (`src/components/`); la edición transitoria (tarea 009) y el filtro como ruta (tarea 010).
  - Relaciones: el provider de `src/state/TodoProvider.tsx` consume el reducer, hidrata desde el puerto y persiste tras cada cambio; el adaptador conoce la forma serializable pero no las reglas del dominio.
- **Decisiones relevantes:**
  - `docs/decisions/D001-pila-react-ts-vite-vitest-eslint-npm.md`
  - `docs/decisions/D002-estado-dominio-modulo-puro.md`

## Estado de salud

- Última revisión: 2026-10-03
- Divergencias conocidas: Ninguna
