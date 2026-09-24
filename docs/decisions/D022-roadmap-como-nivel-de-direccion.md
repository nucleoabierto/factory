# D022: El roadmap como artefacto de dirección en la raíz del repositorio

## Estado

Aceptada

## Contexto

La planeación del producto llega hasta la épica (D019): nada ordena las épicas entre sí ni posiciona el trabajo suelto respecto a ellas. En todo-app la fricción ya se manifestó: tres épicas planificadas sin orden declarado y un refactor transversal (migración ES5→ES2024) cuya posición cambia el costo de todas las demás. La investigación de siguientes elementos describe patrones externos: roadmaps en el repositorio como fuente única y backlogs git-native con jerarquía iniciativa → épica → feature.

## Decisión

Adoptamos el roadmap como documento propio `ROADMAP.md` en la raíz del repositorio del producto, junto a `TODO.txt`, producido por el skill `planificar-roadmap`. El roadmap declara las líneas de trabajo —épicas, hitos ligeros y tareas sueltas— en orden, cada una con la justificación de su posición, y es la fuente de verdad de prioridad y dirección; `TODO.txt` sigue siendo la fuente de ejecución y refleja ese orden mecánicamente. El documento es vivo y único: se actualiza in situ cuando cambia la dirección y su historia la preserva git, sin serie de roadmaps ni campo de estado.

## Justificación

Un documento en la raíz replica la relación épica↔índice un nivel arriba: el roadmap decide y el índice ejecuta, sin introducir una fuente de verdad paralela ni herramientas externas. Vivir en el repositorio lo hace versionable, inspeccionable y trazable a la visión, el patrón que la investigación encontró emergente en la industria.

La justificación por posición es el canal para declarar impactos entre líneas —por ejemplo, que un refactor transversal conviene antes para no migrar código que las épicas aún no han escrito— sin necesidad de un mecanismo de dependencias duras, que ya cubre el marcador de bloqueo del índice cuando la dependencia es real.

Se descartan: extender `planificar` (mezclaría niveles: la épica planea un conjunto, el roadmap secuencia conjuntos); un orquestador (el roadmap es una sola capacidad con puerta humana, sin pipeline que coordinar); y la jerarquía iniciativa→épica→feature de los backlogs git-native (un nivel más que el proyecto no necesita hoy, contra la simplicidad del sistema).

## Referencias

- docs/tasks/080-gestionar-roadmap-todo-app.md — Tarea que introduce la decisión.
- docs/research/2026-09-siguientes-elementos-proyecto.md — Prioridad 3: roadmap y releases, con los patrones externos de referencia.
- docs/decisions/D019-epica-como-artefacto-de-planeacion.md — Nivel inmediatamente inferior y relación artefacto↔índice que esta decisión replica.
