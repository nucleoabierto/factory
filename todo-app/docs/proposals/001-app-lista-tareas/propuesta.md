# Aplicación de lista de tareas

## Estado

[p] Pendiente de revisión

## Problema

Una persona acumula cosas por hacer a lo largo del día y no dispone de un medio fiable para registrarlas y consultarlas. Confiar en la memoria hace que se olviden tareas, y anotarlas de forma dispersa —papeles, notas sueltas— impide saber en cada momento qué queda pendiente y qué ya está hecho.

Le afecta a cualquiera que gestione sus propias tareas, y ocurre de forma continua: cada cosa nueva que surge compite con las anteriores por la atención. El coste de no resolverlo es tareas olvidadas, tiempo perdido reconstruyendo qué queda pendiente y la imposibilidad de comprobarlo de un vistazo.

## Oportunidad

Resolverlo daría un único lugar donde apuntar lo que hay que hacer, consultar qué sigue pendiente y cerrar lo terminado, conservando la información entre usos. Supera a las alternativas habituales en fiabilidad y visibilidad: la memoria falla y las notas dispersas no ofrecen una vista ordenada de pendientes y completadas. Su única ventaja es que no requieren ninguna herramienta.

## Forma de solución

La persona dispone de una página única donde apunta cada cosa que tiene que hacer, la consulta filtrada por pendientes o completadas, actualiza o descarta entradas y ve cuántas quedan abiertas, con la lista conservada entre visitas. Hoy ese recorrido no existe en el proyecto: la aplicación entera es el camino nuevo. Categoría: flujo nuevo.

## Solución

Se construye una aplicación web de una sola página en vanilla JS, sin frameworks ni paso de build, que se abre directamente con `index.html`. La página muestra un campo para crear tareas, la lista de tareas con su estado, un contador de pendientes, filtros para ver todas / pendientes / completadas y una acción para limpiar las completadas.

Cada tarea se puede marcar como completada, editar y borrar. Las tareas se guardan en `localStorage` del navegador, de modo que la lista persiste al recargar la página.

La aplicación incluye una página de tests (`tests.html`) que usa QUnit cargado por CDN y verifica cada funcionalidad en el propio navegador a medida que se implementa, sin toolchain ni build.

## Alternativas consideradas

- Documento o nota única editada a mano: se descarta porque no ofrece la vista de pendientes ni el estado de cada tarea; exige llevar la cuenta mentalmente, que es justo lo que hoy falla.
- Aplicación de tareas ya existente en el mercado: se descarta porque la expectativa del proyecto es construir esta aplicación dentro de `todo-app`; además, una herramienta externa arrastra funciones y complejidad ajenas a lo descrito.
- Herramienta de terminal o de escritorio: se descarta porque el acceso esperado es abrir una página en el navegador, sin instalación ni entorno específico.

## Fuera de alcance

- Más de una persona o varias listas; la app gestiona una sola lista personal.
- Sincronización entre dispositivos, cuentas de usuario o respaldo en servidor.
- Fechas límite, recordatorios, prioridades, etiquetas o cualquier ordenación distinta de pendientes/completadas.
- Búsqueda, deshacer borrados, reordenar tareas manualmente o importar/exportar.
- Cualquier dependencia de build, framework o backend; el resultado se abre directamente en el navegador.

## Investigaciones de apoyo

- Ninguna.

## Borradores

- `01-estructura-base.md` — Estructura de la página y arnés de tests
- `02-crear-y-listar.md` — Crear tareas, listarlas, contar pendientes y persistir (depende de 01)
- `03-completar-editar-borrar.md` — Completar, editar y borrar tareas (depende de 02)
- `04-filtros-y-limpiar.md` — Filtros de vista y limpieza de completadas (depende de 03)

## Revisión

- Usuario: 2026-09-20 — Solicita cambios (persistencia al borrador 02; tests con QUnit integrados en cada borrador)
