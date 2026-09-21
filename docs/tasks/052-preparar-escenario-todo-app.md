# Preparar el escenario de la prueba del flujo externo

## Estado

[ ] Pendiente

## Objetivo

Dejar lista la subcarpeta `todo-app/` para que la prueba de concepto pueda arrancar con solo entrar en la carpeta y ejecutar un agente: el agente debe ser capaz de realizar todo el trabajo desde una tarea semilla usando los skills disponibles.

## Dependencias

- 051 (Registrar decisión: todo app en vanilla JS como prueba del flujo externo)

## Entrada

- Decisión D018: todo app en vanilla JS conforme a la especificación TodoMVC, en `todo-app/`.
- Investigación `docs/research/2026-09-todo-apps-base-trabajo.md` con los nueve requisitos funcionales.
- `.agents/skills/` del proyecto como fuente de los skills a enlazar.

## Resultado esperado

- La subcarpeta `todo-app/` creada en el repositorio.
- `.agents/skills` dentro de `todo-app/` enlazado a los skills del proyecto, con una decisión explícita de cuáles entran y cuáles no (los de gestión interna del meta-proyecto podrían no aplicar).
- Un `TODO.txt` en `todo-app/` con el comentario de formato del proyecto y una única **tarea semilla** `[ ]` cuya entrada lleve la idea que arranca el flujo («llevar la idea de una todo app por el flujo de idea a tarea hasta la implementación») y referencie la expectativa de la investigación.
- El archivo de la tarea semilla en `todo-app/docs/tasks/001-*.md`.

## Criterios de calidad

- Entrar en `todo-app/` y lanzar un agente basta para iniciar el trabajo: la semilla apunta al flujo y los skills están accesibles.
- La semilla describe la idea sin articular la solución: el agente debe recorrer `idea-a-tarea` (descubrimiento → propuesta → borradores → revisión) en lugar de recibir tareas ya hechas.
- La decisión de qué skills se enlazan y cuáles se excluyen queda documentada en las notas de esta tarea.
- Los commits de la app usan el prefijo `todo-app:` para distinguirlos del sistema.
- Pasa revisión técnica por subagente independiente.

## Procedimiento sugerido

1. Crear `todo-app/` y enlazar `.agents/skills` (verificar que el enlace se resuelve: listar los skills desde dentro de la carpeta).
2. Decidir qué skills se excluyen y documentarlo.
3. Crear `todo-app/TODO.txt` con el comentario de formato y la sección adecuada.
4. Redactar la tarea semilla en `todo-app/docs/tasks/` y registrarla en el `TODO.txt` de la app.
5. Someter a revisión dual.

## Notas

- El escenario usa enlace simbólico, no copia congelada: las correcciones a los skills que la prueba revele se propagan al sistema de inmediato. Una prueba de portabilidad estricta con copia puede hacerse después.
- La semilla no debe contener la descomposición: solo la idea y dónde encontrar la expectativa (la investigación), para que el agente ejecute el flujo completo.

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario: [fecha] — [Aprueba | Solicita cambios]
