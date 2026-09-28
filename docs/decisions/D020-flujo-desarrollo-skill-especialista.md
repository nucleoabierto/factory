# D020: Flujo de desarrollo encapsulado en un skill especialista

## Estado

Sustituida por D031

## Contexto

`ejecutar-tareas` es un ejecutor general: su ciclo (tomar tarea, ejecutar, revisar, commitear) es el mismo para una tarea de mantenimiento, de investigación o de desarrollo. La investigación del flujo de desarrollo definió cuatro fases —planeación técnica, planeación de testing, ejecución siguiendo el plan y revisión de implementación— que hay que integrar en ese ciclo. Las opciones eran añadir las fases como pasos condicionales del ejecutor general o encapsularlas en un skill especialista que el ejecutor invoque según el tipo de tarea. D011 había pospuesto la elección entre mantener, extender o separar el ejecutor hasta que existieran los flujos de gestión a nivel de código.

## Decisión

Encapsulamos el flujo de desarrollo en un skill especialista que orquesta el sub-flujo dentro de la tarea: entendimiento del subsistema, planeación técnica, planeación de la suite de pruebas y ejecución con revisión del plan en curso. Mantenemos `ejecutar-tareas` como ejecutor general: no conoce las fases de desarrollo y en su paso de ejecución enruta por el tipo de tarea hacia el skill correspondiente. La revisión de la implementación es un skill separado, invocado en el paso de revisión del ejecutor.

## Justificación

Añadir las fases como pasos condicionales convertiría a `ejecutar-tareas` en un ejecutor que mezcla lógica genérica con lógica de dominio, con bifurcaciones que dificultan razonar sobre el flujo; la investigación sobre su separación ya había evaluado esta opción como la peor. El skill especialista conserva el carácter general del ejecutor y sigue el patrón de orquestador y especialistas ya aplicado con `investigar` o `commit`: el orquestador conserva alcance y decisiones y delega trabajo acotado. El precio es que el especialista se convierte en un mini-orquestador del sub-flujo —sin worktree, pull request ni merge—, lo que la investigación previa anticipaba como orquestador por dominio acotado.

El enrutado presupone una declaración del tipo de tarea que hoy no existe en el archivo de tarea ni en la épica; su diseño es trabajo derivado de esta decisión. La decisión materializa parcialmente lo que D011 pospuso: este flujo es la primera materialización del dominio de código, aunque los flujos de gestión completos (branching, pull requests, merge) siguen sin existir.

## Referencias

- Investigación «Flujo de desarrollo por tarea: planeación, ejecución y revisión» — `docs/research/2026-09-flujo-desarrollo.md`
- Investigación «Separación de ejecutar-tareas: orquestación de desarrollo» — `docs/research/2026-09-separacion-ejecutar-tareas.md`
- D011, «Posposición de la separación de ejecutar-tareas» — `docs/decisions/D011-posponer-separacion-ejecutar-tareas.md`
- Tarea 062 — `docs/tasks/062-registrar-decision-skill-desarrollo.md`
