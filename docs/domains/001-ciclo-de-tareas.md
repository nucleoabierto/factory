# Ciclo de tareas

## Propósito

Ejecutar el trabajo definido del proyecto de principio a fin: tomar la próxima tarea del índice, realizarla siguiendo su archivo, someterla a revisión dual y commitearla, manteniendo la trazabilidad del estado en cada paso.

## Referencia del modelo

- **Lenguaje ubicuo:**
  - **Tarea:** unidad de trabajo con su propio archivo `docs/tasks/NNN-slug.md`, que declara objetivo, dependencias, entrada, resultado esperado, criterios de calidad y procedimiento.
    - Ancla: archivos de `docs/tasks/`; formato descrito en la sección «Entrada» de `.agents/skills/ejecutar-tareas/SKILL.md`
    - Origen: `docs/decisions/D002-tareas-individuales-en-docs-tasks.md`
  - **Índice de trabajo activo:** `TODO.txt`, con una línea por tarea y marcadores de estado `[ ]`, `[~]`, `[r]`, `[x]`, `[!]`; agrupa las tareas por hitos o en la sección «General» y solo contiene trabajo activo.
    - Ancla: `TODO.txt` y el comentario de formato en su cabecera
    - Origen: `docs/decisions/D001-todo-txt-como-indice-unico.md`, `docs/decisions/D017-todo-txt-indice-de-trabajo-activo.md`
  - **Revisión dual:** toda tarea pasa por un subagente independiente con contexto aislado (revisión técnica adversarial) y luego por la aprobación del usuario antes de completarse.
    - Ancla: pasos 8–13 del procedimiento en `.agents/skills/ejecutar-tareas/SKILL.md`
    - Origen: `docs/decisions/D009-flujo-revision-dual.md`
  - **Enrutado por tipo:** el campo «Tipo» del archivo de tarea decide si la ejecución se delega a un skill especialista registrado en la sección «Enrutado por tipo».
    - Ancla: sección «Enrutado por tipo» de `.agents/skills/ejecutar-tareas/SKILL.md`
    - Origen: `docs/decisions/D020-flujo-desarrollo-skill-especialista.md`
- **Entidades / estado:**
  - El estado de una tarea vive en dos sitios sincronizados: el marcador de su línea en `TODO.txt` y el campo «Estado» de su archivo en `docs/tasks/`; ambos se actualizan juntos en cada transición.
    - Ancla: paso 4 del procedimiento en `.agents/skills/ejecutar-tareas/SKILL.md`
  - Una tarea bloqueada se marca `[!]` con una sublista de sus tareas bloqueantes bajo su línea en `TODO.txt`.
    - Ancla: paso 7 del procedimiento en `.agents/skills/ejecutar-tareas/SKILL.md`
- **Invariantes:**
  - Una sola tarea en progreso por iteración: se ejecuta de principio a fin antes de tomar la siguiente (paso 1 de «Principios rectores» en `.agents/skills/ejecutar-tareas/SKILL.md`).
  - Un commit por tarea completada, antes de empezar la siguiente, vía el skill `commit` (`.agents/skills/commit/SKILL.md`).
  - Ninguna tarea se marca completada sin la doble aprobación; el campo «Revisión» del archivo registra ambos veredictos con fecha.
  - El trabajo descubierto durante la ejecución se da de alta con `crear-tareas`; no se ejecuta dentro de la iteración.
- **Operaciones:**
  - Ejecutar el ciclo completo: `.agents/skills/ejecutar-tareas/SKILL.md`.
  - Crear tareas: `.agents/skills/crear-tareas/SKILL.md`.
  - Commitear: `.agents/skills/commit/SKILL.md`.

## Explicación del dominio

- **Fronteras:**
  - Dentro: el índice `TODO.txt`, los archivos de tarea, la orquestación del ciclo, el marcado de estados, la revisión dual y el commit por tarea.
  - Fuera: el contenido de cada tarea (lo ejecuta el skill especialista del tipo o el comportamiento general); la creación de tareas desde ideas (dominio del flujo de idea a tarea); el registro de correcciones del usuario (dominio de aprendizaje).
  - Relaciones: recibe tareas del flujo de idea a tarea; delega las de tipo `desarrollo` o `mantenimiento (refactoring)` al sub-flujo de desarrollo; al cerrar una tarea de desarrollo invoca los sensores de documentación viva.
- **Decisiones relevantes:**
  - `docs/decisions/D001-todo-txt-como-indice-unico.md`
  - `docs/decisions/D002-tareas-individuales-en-docs-tasks.md`
  - `docs/decisions/D008-organizacion-por-hitos-en-todo.md`
  - `docs/decisions/D009-flujo-revision-dual.md`
  - `docs/decisions/D017-todo-txt-indice-de-trabajo-activo.md`
  - `docs/decisions/D020-flujo-desarrollo-skill-especialista.md`

## Estado de salud

- Última revisión: 2026-09-28
- Divergencias conocidas: Ninguna
