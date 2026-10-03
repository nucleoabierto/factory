# Dominio del servicio y almacenamiento real

## Estado

[ ] Pendiente

## Tipo

desarrollo

## Objetivo

Implementar el dominio de la tarea en el lado del servidor —con las mismas invariantes que el núcleo del cliente— sobre la pila decidida, con almacenamiento persistente real y esquema migrable.

## Dependencias

- 011 — la pila del servicio decidida.
- 007 — las invariantes y operaciones del dominio fijadas en el núcleo.

## Entrada

- La decisión de pila del servicio registrada en `docs/decisions/` por la tarea 011.
- El dominio del núcleo (tarea 007) como referencia de invariantes: título recortado y no vacío, estado binario, ciclo de vida completo.
- La suite con cobertura al 100% como contrato: el módulo de dominio del servidor queda probado.

## Resultado esperado

- El dominio del servicio implementado como módulo propio, con las operaciones del ciclo de vida: crear con validación, completar y reactivar, renombrar, eliminar, marcar y desmarcar todas, limpiar completadas, contador de pendientes y selección por filtro.
- Almacenamiento persistente real según la decisión tomada: los datos sobreviven al reinicio del proceso; el esquema se crea y migra de forma verificable.
- Pruebas del dominio y del almacenamiento en verde, con cobertura total del módulo.

## Criterios de calidad

- Las invariantes las garantiza también el servidor: un título vacío o de solo espacios se rechaza en el lado del servicio, no solo en el cliente —la doble verdad empieza aquí.
- La persistencia sobrevive al reinicio del proceso del servicio.
- El esquema se crea y migra con una prueba que lo demuestra.
- `npm run verify` en verde con cobertura al 100%.

## Procedimiento sugerido

1. Diseñar el módulo de dominio del servicio reutilizando las invariantes del núcleo —sin copiar el modelo de cliente si la pila decidida sugiere otra forma—.
2. Implementar las operaciones escribiendo primero las pruebas.
3. Cablear el almacenamiento persistente con su esquema migrable y probar el ciclo completo escribir-reiniciar-leer.
4. Dejar `npm run verify` en verde.

## Notas

- La duplicidad de invariantes entre cliente y servidor es deliberada, no deuda: es la doble verdad del contrato. Si las dos implementaciones divergen, la suite debe notarlo.

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario: [fecha] — [Aprueba | Solicita cambios]
