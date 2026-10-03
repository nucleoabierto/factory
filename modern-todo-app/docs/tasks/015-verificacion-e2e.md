# Verificación de extremo a extremo del sistema distribuido

## Estado

[ ] Pendiente

## Tipo

desarrollo

## Objetivo

Cerrar el conjunto verificando la aplicación distribuida de extremo a extremo: el servicio y el cliente corriendo juntos, la misma lista servida a dos clientes y `npm run verify` cubriendo ambos lados.

## Dependencias

- 014 — el cliente operando sobre el estado remoto.

## Entrada

- La aplicación cliente-servidor funcionando: API con contrato probado e interfaz que consume el estado remoto.
- La conformidad TodoMVC del núcleo, que la distribución no debe haber roto.
- El `README.md` del subproyecto, que hoy no documenta el servicio.

## Resultado esperado

- Una verificación de extremo a extremo que levanta el sistema real —servicio y cliente— y comprueba la lista compartida: las operaciones de un cliente se reflejan en otro.
- La conformidad funcional TodoMVC re-verificada sobre la interfaz distribuida.
- `npm run verify` cubre el cliente y el servicio con cobertura al 100% en ambos.
- El `README.md` documenta cómo arrancar el servicio junto al cliente.

## Criterios de calidad

- La lista compartida se demuestra con dos clientes —o dos contextos de cliente equivalentes— operando contra el mismo servicio: lo que uno hace, el otro lo ve al recargar.
- Cada cláusula funcional de la spec TodoMVC se vuelve a comprobar sobre la aplicación distribuida, sin huecos.
- `npm run verify` en verde cubriendo ambos lados con cobertura al 100%.
- El `README.md` describe el arranque completo del sistema.

## Procedimiento sugerido

1. Montar la verificación de extremo a extremo con el sistema real levantado.
2. Probar la lista compartida entre dos clientes y los modos de fallo de la frontera.
3. Re-verificar la conformidad TodoMVC cláusula a cláusula sobre el cliente distribuido.
4. Documentar el arranque del servicio en el `README.md`.
5. Dejar `npm run verify` en verde.

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario: [fecha] — [Aprueba | Solicita cambios]
