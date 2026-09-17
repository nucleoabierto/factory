# D014: Función dual de crear-tareas

## Estado

Aceptada

## Contexto

`crear-tareas` crea tareas desde una entrada articulada de forma síncrona. El flujo de idea a tarea necesita promocionar borradores aprobados a tareas definitivas. Ambas operaciones producen lo mismo: archivos en `docs/tasks/` y líneas en `TODO.txt`.

## Decisión

Añadimos un modo flujo de idea a tarea a `crear-tareas` que promociona borradores aprobados a tareas definitivas, junto al modo independiente existente. Ambos modos comparten un núcleo común —crear archivos en `docs/tasks/` y líneas en `TODO.txt`— y se bifurcan solo en la entrada.

## Justificación

Un núcleo común evita la duplicación y mantiene el skill simple. El modo independiente se preserva para que el motor interno siga operando por sí solo, sin depender del flujo de idea a tarea. La bifurcación se limita a la entrada para que la estructura del skill no se vuelva compleja. La alternativa de un skill separado para la promoción se descarta porque duplicaría el núcleo común y añadiría un skill más a mantener.

## Referencias

- Investigación «Flujo 1 completo: propuesta, borradores y procedimiento» — `docs/research/2026-09-flujo-1-propuesta-borradores.md`
- D003, «Skills como unidades autocontenidas, no reglas sueltas» — `docs/decisions/D003-skills-como-unidades-autocontenidas.md`
