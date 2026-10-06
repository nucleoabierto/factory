# Ciclo de tareas

## Propósito

Ejecutar el trabajo definido del proyecto de principio a fin: tomar la próxima tarea del índice, realizarla siguiendo su archivo en la rama de la tarea, someterla a revisión técnica independiente y aprobarla mediante su pull request con dos puertas humanas, manteniendo la trazabilidad del estado en cada paso.

## Referencia del modelo

- **Lenguaje ubicuo:**
  - **Tarea:** unidad de trabajo con su propio archivo `docs/tasks/NNN-slug.md`, que declara objetivo, dependencias, entrada, resultado esperado, criterios de calidad y procedimiento.
    - Ancla: archivos de `docs/tasks/`; formato descrito en la sección «Entrada» de `.agents/skills/ejecutar-tareas/SKILL.md`
    - Origen: `docs/decisions/D002-tareas-individuales-en-docs-tasks.md`
  - **Índice de trabajo activo:** `TODO.txt`, con una línea por tarea y marcadores de estado `[ ]`, `[~]`, `[r]`, `[x]`, `[!]`; agrupa las tareas por hitos o en la sección «General» y solo contiene trabajo activo.
    - Ancla: `TODO.txt` y el comentario de formato en su cabecera
    - Origen: `docs/decisions/D001-todo-txt-como-indice-unico.md`, `docs/decisions/D017-todo-txt-indice-de-trabajo-activo.md`
  - **Puertas humanas:** la aprobación del usuario se ejerce en dos puntos del cierre: la puerta de ejecución —aprobación del pull request de la tarea tras su bucle de comentarios— y la puerta de cierre —aprobación del paquete completo tras los sensores, antes del merge—. Antes de ambas corre la revisión técnica de un subagente independiente con contexto aislado.
    - Ancla: pasos 9–18 del procedimiento en `.agents/skills/ejecutar-tareas/SKILL.md`
    - Origen: `docs/decisions/D034-aprobacion-via-pr-con-dos-puertas.md` (sustituye a D009)
  - **Pull request de la tarea:** artefacto transitorio de revisión que vive entre la apertura y el merge: `gestionar-pr` lo abre con una descripción orientada al revisor —no un resumen del plan—, conduce el bucle de comentarios clasificados y lo fusiona con merge squash tras la puerta de cierre.
    - Ancla: `.agents/skills/gestionar-pr/SKILL.md`
    - Origen: `docs/decisions/D034-aprobacion-via-pr-con-dos-puertas.md`
  - **Rama de la tarea:** cada iteración corre en una rama nombrada a partir del identificador de la tarea —prefijo `tarea/` por defecto, que cede ante la convención de ramas que el proyecto declare—, creada desde la rama principal; el trabajo, las rondas del bucle y las escrituras de los sensores aterrizan en ella.
    - Ancla: paso 4 del procedimiento en `.agents/skills/ejecutar-tareas/SKILL.md`
  - **Enrutado por tipo:** el campo «Tipo» del archivo de tarea decide si la ejecución se delega a un skill especialista registrado en la sección «Enrutado por tipo».
    - Ancla: sección «Enrutado por tipo» de `.agents/skills/ejecutar-tareas/SKILL.md`
    - Origen: `docs/decisions/D031-flujo-desarrollo-dividido-en-planear-y-ejecutar.md` (sustituye a D020)
- **Entidades / estado:**
  - El estado de una tarea vive en dos sitios sincronizados: el marcador de su línea en `TODO.txt` y el campo «Estado» de su archivo en `docs/tasks/`; ambos se actualizan juntos en cada transición.
    - Ancla: paso 4 del procedimiento en `.agents/skills/ejecutar-tareas/SKILL.md`
  - Una tarea bloqueada se marca `[!]` con una sublista de sus tareas bloqueantes bajo su línea en `TODO.txt`.
    - Ancla: paso 7 del procedimiento en `.agents/skills/ejecutar-tareas/SKILL.md`
- **Invariantes:**
  - Una sola tarea en progreso por iteración: se ejecuta de principio a fin antes de tomar la siguiente (paso 1 de «Principios rectores» en `.agents/skills/ejecutar-tareas/SKILL.md`).
  - Un commit por tarea en la rama principal: el merge squash del pull request, cuyo mensaje se redacta con las reglas del skill `commit` (`.agents/skills/commit/SKILL.md`).
  - Ninguna tarea se marca completada sin la aprobación técnica y la puerta de ejecución; el campo «Revisión» del archivo registra tres veredictos con fecha —Subagente, Usuario (ejecución) y Usuario (cierre)—.
  - El trabajo descubierto durante la ejecución se da de alta con `crear-tareas`; no se ejecuta dentro de la iteración.
- **Operaciones:**
  - Ejecutar el ciclo completo: `.agents/skills/ejecutar-tareas/SKILL.md`.
  - Gestionar el pull request de la tarea: `.agents/skills/gestionar-pr/SKILL.md`.
  - Crear tareas: `.agents/skills/crear-tareas/SKILL.md`.
  - Commitear: `.agents/skills/commit/SKILL.md`.

## Explicación del dominio

- **Fronteras:**
  - Dentro: el índice `TODO.txt`, los archivos de tarea, la orquestación del ciclo, el marcado de estados, la rama y el pull request por tarea con sus dos puertas humanas.
  - Fuera: el contenido de cada tarea (lo ejecuta el skill especialista del tipo o el comportamiento general); la creación de tareas desde ideas (dominio del flujo de idea a tarea); el registro de correcciones del usuario (dominio de aprendizaje).
  - Relaciones: recibe tareas del flujo de idea a tarea; delega las de tipo `desarrollo` o `mantenimiento (refactoring)` al sub-flujo de desarrollo; al cerrar una tarea de desarrollo invoca los sensores de documentación viva.
- **Decisiones relevantes:**
  - `docs/decisions/D001-todo-txt-como-indice-unico.md`
  - `docs/decisions/D002-tareas-individuales-en-docs-tasks.md`
  - `docs/decisions/D008-organizacion-por-hitos-en-todo.md`
  - `docs/decisions/D034-aprobacion-via-pr-con-dos-puertas.md` (sustituye a D009)
  - `docs/decisions/D017-todo-txt-indice-de-trabajo-activo.md`
  - `docs/decisions/D031-flujo-desarrollo-dividido-en-planear-y-ejecutar.md` (sustituye a D020)

## Estado de salud

- Última revisión: 2026-10-05 (revisión dual sustituida por pull request con dos puertas humanas)
- Divergencias conocidas: Ninguna
