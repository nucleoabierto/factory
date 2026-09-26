# La tarea creada desde la vista «hoy» no desaparece al crearla

## Estado

[ ] Pendiente | [ ] En progreso | [ ] En revisión | [ ] Completada | [ ] Bloqueada

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

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario: [fecha] — [Aprueba | Solicita cambios]
