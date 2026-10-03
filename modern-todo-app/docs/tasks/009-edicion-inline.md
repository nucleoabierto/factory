# Edición inline de tareas

## Estado

[ ] Pendiente

## Tipo

desarrollo

## Objetivo

Implementar la edición inline del título de una tarea con las reglas completas de la especificación TodoMVC: activación por doble clic, foco en el campo, guardado al perder el foco y con Enter, cancelación con Escape y destrucción cuando el texto queda vacío.

## Dependencias

- 008 — la lista operable.

## Entrada

- La lista operable de la tarea 008, con ítems funcionales y dominio conectado.
- La especificación TodoMVC de edición: la clase `editing` en el `<li>` oculta el resto de controles y muestra un input con el título, que recibe el foco; el guardado recorta el texto y lo aplica, el texto vacío destruye la tarea, Escape descarta los cambios; el estado de edición no se persiste entre recargas.

## Resultado esperado

- Doble clic sobre el título de un ítem activa el modo edición con el input visible y enfocado.
- Guardar (al perder el foco o con Enter) recorta y aplica el título nuevo; si queda vacío, la tarea se elimina.
- Escape abandona la edición y descarta los cambios.
- La edición activa no se escribe en el almacenamiento: al recargar, la lista vuelve a su estado persistente.

## Criterios de calidad

- Cada regla de edición de la spec cubierta por una prueba de Testing Library.
- Los estados de edición usan tokens de `DESIGN.md`, verificados con `aplicar-guia-estilo`.
- `npm run verify` en verde con cobertura al 100%.

## Procedimiento sugerido

1. Añadir el estado de edición al modelo como estado transitorio, excluido de la persistencia.
2. Implementar las interacciones del modo edición, escribiendo primero las pruebas de cada regla.
3. Estilizar el modo edición con tokens y comprobar la evidencia renderizada.
4. Dejar `npm run verify` en verde.

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario: [fecha] — [Aprueba | Solicita cambios]
