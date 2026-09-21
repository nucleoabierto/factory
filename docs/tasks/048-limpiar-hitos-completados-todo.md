# Limpiar hitos completados de TODO.txt

## Estado

[ ] Pendiente

## Objetivo

Aplicar la decisión de limpieza de `TODO.txt`: eliminar las líneas y encabezados de los hitos 1 a 5, todas sus tareas completadas, dejando el índice con solo trabajo activo.

## Dependencias

- 046 (Registrar decisión de limpieza de TODO.txt)

## Entrada

- `TODO.txt` con los hitos 1–5 completados.
- La decisión D017 que autoriza la eliminación.

## Resultado esperado

- `TODO.txt` contiene únicamente las tareas pendientes y la sección de propuestas, si la hay. Los encabezados de hitos sin tareas activas desaparecen.

## Criterios de calidad

- No quedan líneas `[x]` en `TODO.txt`.
- Los archivos de tarea en `docs/tasks/` no se tocan: la evidencia permanece.
- El comentario de formato del índice sigue siendo correcto tras la limpieza.
- Pasa revisión técnica por subagente independiente.

## Procedimiento sugerido

1. Eliminar los encabezados `## Hito 1` a `## Hito 5` y todas las líneas `[x]` que contienen.
2. Verificar que solo quedan líneas pendientes y la sección de propuestas.
3. Someter a revisión dual.

## Notas

- Si tras la limpieza el hito en curso queda vacío o solo con tareas pendientes, conservar su encabezado con las líneas activas.

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario: [fecha] — [Aprueba | Solicita cambios]
