# D011: Posposición de la separación de ejecutar-tareas

## Estado

Aceptada

## Contexto

`ejecutar-tareas` orquesta un ciclo genérico de tareas: lee `TODO.txt`, ejecuta la tarea, la somete a revisión dual y commitea. La investigación sobre su separación en un skill de orquestación de desarrollo evaluó tres opciones —separar, extender o mantener— y concluyó que diseñar el pipeline de entrega de código (aislamiento, pull request, verificación de CI, merge) sin requisitos concretos produce un diseño especulativo. Los flujos de gestión a nivel de código no existen todavía en el proyecto.

## Decisión

Mantenemos `ejecutar-tareas` tal cual y posponemos la decisión de separarlo o extenderlo hasta que existan los flujos de gestión a nivel de código. Mientras tanto, las tareas que requieran pasos de desarrollo invocarán los skills correspondientes durante la ejecución.

## Justificación

Mantener no compromete la decisión futura: cuando los flujos de código existan, la elección entre separar y extender podrá tomarse con requisitos reales, no anticipados. El coste de revertir de mantener es nulo, mientras que separar o extender hoy tiene un coste medio o alto sin contrapartida. Esta opción es coherente con el principio bootstrap del proyecto —construir cada capacidad cuando haya evidencia— y con el aplazamiento explícito de las investigaciones previas.

La evidencia externa muestra que la orquestación de entrega de código es estructuralmente distinta de un ciclo genérico de tareas, con un pipeline de fases y una máquina de estados propios. Es razonable anticipar que la separación o la extensión serán necesarias, pero diseñarlas ahora sería anticiparse sin evidencia.

La señal para reabrir la decisión es la construcción efectiva de los flujos de gestión a nivel de código: branching, pull requests y revisión de código.

## Referencias

- Investigación «Separación de ejecutar-tareas: orquestación de desarrollo» — `docs/research/2026-09-separacion-ejecutar-tareas.md`
- Definición del proyecto — `docs/definicion-proyecto.md`
- D003, «Skills como unidades autocontenidas, no reglas sueltas» — `docs/decisions/D003-skills-como-unidades-autocontenidas.md`
