# Asignar, cambiar y quitar la fecha, con distinción visual

## Estado

[ ] Pendiente | [ ] En progreso | [ ] En revisión | [ ] Completada | [ ] Bloqueada

## Tipo

desarrollo

## Objetivo

Permitir a la persona poner fecha a una tarea, cambiarla o quitarla desde la interfaz, y distinguir a simple vista en qué situación está cada tarea con fecha: vencida, de hoy o futura.

## Dependencias

- 016

## Entrada

- La fecha opcional de la tarea y la clasificación vencida/hoy/futura de la tarea 016.
- La presentación actual de cada ítem en `UI.render` (checkbox, etiqueta, edición, borrado).

## Resultado esperado

- Cada tarea ofrece un medio de asignar fecha —un campo de día—, cambiarla y quitarla.
- El ítem muestra su fecha cuando la tiene y se distingue visualmente según su situación: vencida, de hoy o futura.
- La fecha se puede editar junto al resto de acciones del ítem sin romper el flujo de edición de texto existente.
- Lo sin fecha no muestra distinción temporal alguna.

## Criterios de calidad

- Asignar una fecha la muestra en el ítem y persiste al recargar.
- Una tarea vencida se distingue claramente de una de hoy y de una futura.
- Quitar la fecha devuelve el ítem a su aspecto sin fecha.
- La edición de texto por doble clic y el resto de acciones siguen funcionando.
- La suite de `tests.html` pasa en verde con tests nuevos del cableado de la fecha en la vista.
- Sin errores en consola.

## Procedimiento sugerido

1. Exponer en la fachada `App` las operaciones de fecha del dominio.
2. Añadir al ítem renderizado el control de fecha y la indicación de su situación, reutilizando la clasificación del dominio.
3. Cablear los eventos de asignar, cambiar y quitar fecha sin interferir con la edición de texto.
4. Dar estilos a la distinción temporal en `style.css` (vencida, hoy, futura).
5. Escribir los tests de la interacción y verificar `index.html` y `tests.html` en el navegador.

## Notas

- Los commits de este proyecto llevan el ámbito `todo-app` en Conventional Commits (`tipo(todo-app): descripción`).

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario: [fecha] — [Aprueba | Solicita cambios]
