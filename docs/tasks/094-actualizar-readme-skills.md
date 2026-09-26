# Actualizar el README con los skills del sub-flujo de desarrollo

## Estado

[ ] Pendiente | [ ] En progreso | [ ] En revisión | [ ] Completada | [ ] Bloqueada

## Tipo

mantenimiento

## Objetivo

Actualizar el README raíz para que las tablas de skills reflejen las capacidades añadidas por las tareas 089–091 (`consultar-decisiones`, `recopilar-contexto`, `evaluar-conectividad`) y la descripción del pipeline refleje el sub-flujo de desarrollo actual: contexto, conectividad, planeación y ejecución.

## Dependencias

- Ninguna

## Entrada

- `README.md`, con sus tablas «Skills disponibles» y la descripción del flujo de ejecución.
- Los skills nuevos en `.agents/skills/` y el procedimiento actualizado de `desarrollo`.

## Resultado esperado

- Las tablas de skills del README incluyen `consultar-decisiones`, `recopilar-contexto` y `evaluar-conectividad`, cada uno con una línea de qué hace, en la tabla que corresponda a su papel.
- La descripción del sub-flujo de desarrollo menciona la recopilación de contexto y el gate de conectividad, no solo la planeación y la ejecución.

## Criterios de calidad

- Todo skill bajo `.agents/skills/` aparece en el README; ninguna entrada queda desactualizada respecto a su `description`.
- Las líneas añadidas siguen el formato y la brevedad de las existentes.

## Procedimiento sugerido

1. Listar `.agents/skills/` y cotejar contra las tablas del README.
2. Añadir las filas que falten y ajustar la descripción del pipeline.
3. Aplicar revisión de redacción y pulido mecánico en modo preventivo.

## Notas

- Trabajo descubierto por el subagente de revisión de la tarea 089: la tabla de skills no se actualizó al crear `consultar-decisiones`.

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario: [fecha] — [Aprueba | Solicita cambios]
