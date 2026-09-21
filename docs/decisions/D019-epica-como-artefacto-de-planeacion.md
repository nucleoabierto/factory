# D019: La épica como artefacto de planeación

## Estado

Aceptada

## Contexto

El trabajo se planifica solo al nivel de propuesta individual: las agrupaciones
del índice son encabezados sin contenido (D008) y las decisiones transversales
del conjunto se resuelven de forma improvisada durante la ejecución. La
propuesta de planeación de conjuntos introduce la épica como artefacto y la
investigación sobre formatos de épica y planeación técnica recomienda producirla
con el trabajo ya descompuesto y antes de la ejecución.

## Decisión

Adoptamos la épica como documento propio en `docs/epics/NNN-slug.md`, con los
campos: objetivo verificable, alcance, piezas (tareas existentes o por crear),
plan técnico, criterio de cierre y estado. La épica es el destino habitual de
la promoción de borradores a tareas: al promover, las tareas de una propuesta se
asignan a una épica nueva o existente; cuando el conjunto no amerita épica, las
tareas se agrupan bajo un encabezado ligero sin documento. La agrupación en
épicas también es invocable bajo demanda sobre tareas ya creadas. En `TODO.txt`
la épica se refleja como el encabezado que agrupa sus tareas, igual que un hito.

El plan técnico de la épica es la guía de arquitectura del conjunto: fija los
patrones y estructuras que las piezas comparten. Cada tarea desarrolla su plan
detallado en el momento de su ejecución, dentro de esa guía.

## Justificación

Producir la épica en la promoción cierra el ciclo de forma ordenada: el conjunto
nace con hogar y la planeación se hace sobre piezas reales con dependencias
observables, no sobre una intención. Que el plan de la épica sea una guía de
arquitectura y no un plan detallado evita decidir a nivel de tarea lo que aún no
tiene contexto suficiente: el detalle llega cuando cada tarea se ejecuta. La
exención del encabezado ligero evita imponer el coste de una épica a conjuntos
que no la necesitan, y la vía bajo demanda cubre la planeación retroactiva de
tareas sueltas que no pasan por una promoción.

La decisión extiende D008 sin sustituirla: el encabezado de `TODO.txt` sigue
siendo la agrupación visible y el índice es la fuente de verdad del estado de
las tareas; la épica es la fuente de verdad del objetivo, el alcance y la guía
de arquitectura del conjunto. Se descarta planear antes de la descomposición
(exigiría reordenar el flujo y planear sin piezas reales) y exigir épica en toda
agrupación (impondría el coste del documento a conjuntos triviales).

## Referencias

- docs/proposals/001-planeacion-epicas/propuesta.md
- docs/research/2026-09-formato-epica-planeacion-tecnica.md
- docs/decisions/D008-organizacion-por-hitos-en-todo.md
