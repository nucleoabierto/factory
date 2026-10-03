# Coherencia del roadmap con la ejecución

## Estado

[x] Planificada | [x] Completada

## Objetivo

El roadmap refleja la ejecución real sin reintervención manual: al agotarse una línea de trabajo, la épica queda marcada como `Completada`, la agrupación sale del índice y el estado de las líneas de Now se mantiene al día tras cada tarea cerrada; cuando la dirección diverge de lo ejecutado, el ciclo replanifica invocando `planificar-roadmap`.

## Alcance

- **Dentro:** el skill de cierre de conjunto (verificación del criterio de cierre, épica `Completada`, limpieza del índice como ejecutor de D017); el skill reflector del roadmap (reflejo mecánico del estado de las líneas de Now e invocación de `planificar-roadmap` ante divergencia de dirección); el cableado de ambos en `ejecutar-tareas` y el ajuste de «Cuándo usar» de `planificar-roadmap`.
- **Fuera:** cambios al formato del roadmap o a sus horizontes; mover o eliminar la puerta humana de dirección; sanear épicas o roadmaps históricos de los proyectos evaluados.

## Piezas

- [x] docs/tasks/109-skill-cierre-conjunto.md — Crear el skill de cierre de conjunto
- [x] docs/tasks/110-skill-mantener-roadmap.md — Crear el skill reflector del roadmap
- [x] docs/tasks/111-cablear-cierre-conjunto-y-roadmap.md — Cablear el cierre de conjunto y el reflejo del roadmap en el ciclo

## Plan técnico

- **Orden:** 109 y 110 son independientes entre sí y pueden ejecutarse en paralelo; 111 cierra el conjunto cableando ambas en el ciclo.
- **Dependencias:** 111 necesita los contratos de entrada de los dos skills creados.
- **Decisiones transversales:** `ROADMAP.md` solo lo escriben `planificar-roadmap` (dirección, con puerta humana) y el reflector (reflejo mecánico); el skill de cierre de conjunto no toca el roadmap. La divergencia de dirección invoca `planificar-roadmap`, no escribe dirección desde el ciclo. La detección de conjunto agotado se apoya en el encabezado de `TODO.txt` y el comentario `<!-- épica: … -->`, sin acoplar el ejecutor al interior de las épicas.

## Criterio de cierre

Al completarse la última tarea de un conjunto, su épica queda `Completada` y la agrupación eliminada del índice sin intervención del usuario; el estado de las líneas de Now refleja la ejecución tras cada cierre de tarea; y una divergencia de dirección detectada por el ciclo dispara `planificar-roadmap` con su puerta humana intacta.

## Revisión

- Usuario: 2026-10-01 — Aprueba
