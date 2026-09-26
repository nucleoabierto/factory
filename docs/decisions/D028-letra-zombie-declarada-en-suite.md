# D028: La suite de pruebas declara la letra ZOMBIE por expectativa

## Estado

Aceptada

## Contexto

`planear-implementacion` usa ZOMBIE (*zero, one, many, boundary, interface, exception*) como guía interna para generar la `## Suite de pruebas esperada`, pero declaraba que la suite «no declara su relación con ZOMBIE»: la derivación quedaba solo en la cabeza del planeador y la cobertura de los ejes no era revisable sin reconstruir el razonamiento. Al revisar las suites de todo-app se observó que la convención no se aplicaba de manera consistente, y la falta de anotación impedía saber qué parámetro había derivado cada prueba. La alternativa era reanotar las suites ya escritas, descartada porque los documentos de entrada no se reeditan retroactivamente (lección de estabilidad temporal).

## Decisión

Cada expectativa de la suite declara al final, entre paréntesis, la letra ZOMBIE que la derivó —`(Z)`, `(O)`, `(M)`, `(B)`, `(I)` o `(E)`— cuando un parámetro ZOMBIE aplicó de verdad; las pruebas de regresión o de arnés van sin anotar. La convención aplica solo hacia adelante: las suites históricas no se reanotan. La suite sigue describiendo el qué —expectativas de comportamiento trazables a casos de uso— y no se acopla a la implementación.

## Justificación

La anotación convierte ZOMBIE de guía invisible a convención auditable: la cobertura de los ejes de progresión y bordes queda visible para la revisión sin reconstruir el razonamiento del planeador, y la letra añade una sola marca sin invadir el texto de la expectativa. Mantener la no-reedición de suites históricas preserva la fidelidad del historial —las tareas ya ejecutadas reflejan lo que se sabía al planearlas— mientras la convención nueva mejora las suites futuras. El coste es una asimetría temporal: las suites antiguas no llevan letra, lo que es coherente con tratar los documentos históricos como inmutables.

## Referencias

- Tarea 095 — `docs/tasks/095-anotar-letra-zombie-en-suites.md`
- `.agents/skills/planear-implementacion/SKILL.md` — principio 8 y fase de suite
- James Grenning, «TDD Guided by ZOMBIES» — blog.wingman-sw.com/tdd-guided-by-zombies
