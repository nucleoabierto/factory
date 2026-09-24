# Periodicidad simple que regenera la tarea al completarla

## Estado

[ ] Pendiente | [ ] En progreso | [ ] En revisión | [ ] Completada | [ ] Bloqueada

## Tipo

desarrollo

## Objetivo

Permitir que una tarea con fecha se repita por rutina: declara una periodicidad simple y, al completarse, regenera su próxima aparición en lugar de desaparecer.

## Dependencias

- 018

## Entrada

- La fecha de la tarea, su clasificación y las vistas de la tarea 018.
- La operación de completar existente (`toggleTask`) y el flujo de «limpiar completadas».

## Resultado esperado

- Una tarea con fecha puede marcarse como recurrente con una periodicidad simple (por ejemplo, semanal o mensual).
- Al completar una tarea recurrente, esta vuelve a pendiente con su fecha avanzada a la siguiente ocurrencia, en lugar de quedar completada.
- Se puede quitar la recurrencia de una tarea, que pasa a comportarse como tarea con fecha normal.
- La periodicidad es visible en el ítem y persiste entre recargas.
- La recurrencia requiere fecha: una tarea sin fecha no puede ser recurrente; quitar la fecha quita también la recurrencia.

## Criterios de calidad

- Completar una recurrente la deja pendiente con la fecha de la próxima ocurrencia correcta (semanal: +7 días; mensual: mismo día del mes siguiente o convención documentada).
- La próxima ocurrencia respeta las reglas de la vista: si queda a futuro, desaparece hasta su día.
- Una recurrente nunca entra en «limpiar completadas» por la vía de completarla; sin recurrencia, el comportamiento es el de siempre.
- La suite de `tests.html` pasa en verde con tests nuevos de regeneración, periodicidad y casos borde (fin de mes).
- Sin errores en consola.

## Procedimiento sugerido

1. Añadir la periodicidad al modelo como dato de la tarea ligado a la fecha, con su validación al cargar.
2. Cambiar la operación de completar para que una recurrente regenere su próxima fecha en lugar de quedar completada; documentar la convención de cálculo (incluido el fin de mes).
3. Cablear en la interfaz el marcado y desmarcado de recurrencia y su indicación en el ítem.
4. Escribir los tests de cada periodicidad, de los bordes de calendario y de la interacción con «limpiar completadas»; verificar en el navegador.

## Notas

- Los commits de este proyecto llevan el ámbito `todo-app` en Conventional Commits (`tipo(todo-app): descripción`).
- Las recurrencias complejas quedan fuera de alcance por decisión de la propuesta; la periodicidad se limita a reglas simples.

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario: [fecha] — [Aprueba | Solicita cambios]
