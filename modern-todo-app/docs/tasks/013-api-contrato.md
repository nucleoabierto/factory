# API del ciclo de vida con contrato

## Estado

[ ] Pendiente

## Tipo

desarrollo

## Objetivo

Exponer el dominio del servicio por una API con contrato explícito que cubra el ciclo de vida completo de la tarea, con validación, errores coherentes y pruebas de integración del contrato.

## Dependencias

- 012 — el dominio del servicio con almacenamiento.

## Entrada

- El dominio del servicio implementado por la tarea 012.
- La decisión de pila registrada por la tarea 011, incluida la forma del contrato.
- Las operaciones que el cliente necesita: listar, crear, completar y reactivar, renombrar, eliminar, marcar y desmarcar todas, limpiar completadas.

## Resultado esperado

- La API operativa en el proceso del servicio, cubriendo todas las operaciones del ciclo de vida con su contrato: forma de petición y respuesta, códigos de error y validación de entrada.
- El contrato documentado y consumible sin leer el código del servicio.
- Pruebas de integración del contrato en verde: cada operación y cada modo de error probado contra el servicio real.

## Criterios de calidad

- Cada operación del ciclo de vida es accesible por la API con su prueba de integración.
- La entrada inválida se rechaza con errores coherentes y distinguidos —el servidor valida por su cuenta—.
- El contrato queda documentado de forma que un cliente nuevo pueda consumirlo.
- `npm run verify` en verde con cobertura al 100%.

## Procedimiento sugerido

1. Definir el contrato: operaciones, formas de petición y respuesta, catálogo de errores.
2. Implementar la API sobre el dominio del servicio, escribiendo primero las pruebas de integración.
3. Documentar el contrato y comprobar su consumo desde un cliente de prueba.
4. Dejar `npm run verify` en verde.

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario: [fecha] — [Aprueba | Solicita cambios]
