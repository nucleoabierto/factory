# La tarea creada desde la vista «hoy» no desaparece al crearla

## Estado

[ ] Pendiente | [ ] En progreso | [ ] En revisión | [x] Completada | [ ] Bloqueada

## Tipo

desarrollo

## Objetivo

Resolver el caso borde de crear una tarea estando en la vista «hoy»: la tarea nace sin fecha y la vista la excluye, así que «desaparece» al instante. Decidir y aplicar el comportamiento coherente —la opción natural es que la tarea creada en «hoy» reciba la fecha de hoy, de modo que quede visible donde se capturó.

## Dependencias

- 018

## Entrada

- `App.addTask`, que crea con `date: null` en la lista activa.
- La vista «hoy», que excluye las tareas sin fecha.
- El hallazgo 2 del informe de revisión de la tarea 018.

## Resultado esperado

- Crear una tarea en la vista «hoy» produce una tarea visible en esa vista (la decisión concreta —fecha de hoy u otra— queda documentada en la tarea).
- Crear en la vista principal no cambia: la tarea nace sin fecha en la lista activa.

## Criterios de calidad

- La tarea creada en «hoy» es visible inmediatamente en esa vista y pertenece a la lista activa.
- La fecha asignada, si esa es la decisión, es un día calendario válido producido por el dominio.
- La suite de `tests.html` pasa en verde con tests nuevos del comportamiento.

## Procedimiento sugerido

1. Decidir el comportamiento con el usuario si hace falta (fecha de hoy por defecto frente a otras opciones).
2. Ajustar el punto de creación para que conozca la vista activa.
3. Escribir los tests y verificar en el navegador.

## Notas

- Los commits de este proyecto llevan el ámbito `todo-app` en Conventional Commits (`tipo(todo-app): descripción`).

## Contexto

- Archivos similares:
  - `todo-domain.js`: `TaskList.addTask(text, listId)` crea la tarea con `date: null`; `setTaskDate` valida la fecha con `isValidDate`; `dateStatus`/`visibleTasks` inyectan `today` como referencia.
  - `app.js`: `App.addTask` delega en `taskList.addTask(text, App.activeListId)`; la vista activa vive en `App.view`; `currentDay` está disponible en `Todo` (todo-core.js).
  - `tests.html`: el módulo `views: main and today` ya fija el patrón de tests de vista con `TestKit.day`.
- Patrones:
  - El dominio decide la pertenencia y produce los valores calendario (`currentDay`); la fachada compone y conoce la vista activa.
  - Fechas inválidas se degradan a «sin fecha» en la carga (`TaskList.load`), misma tolerancia aplicable a `addTask`.
- Lecciones:
  - `idioma-del-codigo`: código y tests en inglés.
  - `fidelidad-al-plan`: diff fiel al plan aprobado.
- Decisiones:
  - Ninguna adicional aplica.

## Conectividad

Veredicto: **conectada**.

`App.addTask`, `TaskList.addTask`, `setTaskDate`, `isValidDate` y
`currentDay` existen con la forma asumida; la vista activa ya llega a la
fachada (`App.view`); el harness y el módulo de vistas están listos para
los tests nuevos.

## Plan técnico

`TaskList.addTask` crea la tarea con `date: null` y la vista «hoy»
excluye lo sin fecha, así que la tarea capturada ahí desaparece al
instante. Decisión aprobada: crear en «hoy» asigna la fecha de hoy, de
modo que la tarea queda visible donde se capturó. La fachada conoce la
vista activa; el dominio produce y valida el día calendario.

- [x] Extender `TaskList.addTask(text, listId = INBOX.id, date = null)` para aceptar la fecha opcional, validada con `isValidDate`; una fecha inválida degrada a «sin fecha»
  - Aporta: el dominio produce tareas con fecha válida sin conocer vistas
  - Contexto: la tolerancia copia la de `TaskList.load`, que descarta fechas malformadas sin perder la tarea
- [x] Ajustar `App.addTask` para pasar `currentDay()` cuando `App.view === 'today'`
  - Aporta: la fachada lleva la vista activa al punto de creación; `currentDay` viene del namespace `Todo`
- [x] Añadir los tests de la suite esperada en el módulo `views: main and today`
  - Aporta: la red que fija el comportamiento de captura por vista
- [x] Verificar la suite QUnit en verde y `index.html` sobre `file://`
  - Aporta: confirma el comportamiento observable

## Suite de pruebas esperada

Caso de uso: «Crear tarea» (`data-action="add-task"` → `App.addTask` → `TaskList.addTask`).

- Crear texto vacío en «hoy» sigue sin crear nada (Z).
- Crear en «hoy» produce una tarea visible al instante en esa vista, en la lista activa (O).
- La tarea creada en «hoy» lleva la fecha del día, un día calendario válido (I).
- Crear en la vista principal sigue produciendo una tarea sin fecha (regresión del comportamiento declarado).

## Revisión

- Subagente: 2026-09-26 — Aprueba
- Usuario: 2026-09-26 — Aprueba
