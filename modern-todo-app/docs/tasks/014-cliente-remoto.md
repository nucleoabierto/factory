# Cliente como vista del estado remoto

## Estado

[ ] Pendiente

## Tipo

desarrollo

## Objetivo

Convertir la interfaz del núcleo en una vista del estado del servicio: una capa de acceso a la API sustituye al almacenamiento local como fuente de verdad, con carga y fallo visibles —la aplicación se comporta con claridad cuando el servicio no responde.

## Dependencias

- 013 — la API con contrato disponible.
- 008, 009, 010 — la interfaz operable del núcleo.

## Entrada

- La API del servicio con su contrato documentado.
- La aplicación del núcleo: interfaz operable que hoy persiste en el almacenamiento local.
- La decisión de pila del servicio y el modelo de estado del cliente (D002).
- Los estados de carga y de error como superficie visual nueva: la guía de estilo puede necesitar absorberlos.

## Resultado esperado

- La interfaz consume la API para todo el ciclo de vida: el almacenamiento local deja de ser la fuente de verdad de la lista.
- Los estados de carga y de error de la frontera son visibles en la interfaz, con su tratamiento en la guía de estilo —tokens nuevos si el patrón lo exige—.
- Cuando el servicio no responde, la aplicación muestra un estado de fallo comprensible, no una pantalla rota ni datos falsos.
- La conformidad funcional de la interfaz se mantiene: los flujos del núcleo siguen siendo los mismos.

## Criterios de calidad

- Ningún dato de la lista se lee ni escribe en el almacenamiento del navegador tras el cambio.
- Cada operación del usuario se refleja en el servicio; la suite lo demuestra con la API simulada y la integración real la cubre la tarea 015.
- Un fallo del servicio produce un estado visible declarado, con su prueba.
- Todo estilo nuevo usa tokens de `DESIGN.md`, verificado con `aplicar-guia-estilo`.
- `npm run verify` en verde con cobertura al 100%.

## Procedimiento sugerido

1. Diseñar la capa de acceso a la API sobre el modelo de estado decidido, sustituyendo la persistencia local por el contrato del servicio.
2. Implementar la sustitución con pruebas primero, incluidos los modos de fallo.
3. Incorporar los estados de carga y error a la interfaz y, si hace falta, a la guía de estilo con `documentar-guia-estilo`.
4. Aplicar `aplicar-guia-estilo` con evidencia renderizada y dejar `npm run verify` en verde.

## Notas

- Los datos que el núcleo guardó en el navegador no se migran: se consideran descartables.
- La verificación de la lista compartida entre clientes y la reconformidad TodoMVC completa quedan en la tarea 015.

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario: [fecha] — [Aprueba | Solicita cambios]
