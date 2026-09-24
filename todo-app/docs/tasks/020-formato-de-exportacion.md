# Formato versionado del estado y su serialización bidireccional validada

## Estado

[ ] Pendiente | [ ] En progreso | [ ] En revisión | [ ] Completada | [ ] Bloqueada

## Tipo

desarrollo

## Objetivo

Definir el documento de exportación —formato propio, legible y versionado— y darle al dominio la capacidad de producirlo desde el estado y de consumirlo con validación, tolerando datos corruptos o de versión desconocida. Sin cambios visibles para el usuario todavía.

## Dependencias

- Ninguna.

## Entrada

- El modelo `TaskList` en `app.js` con sus invariantes y la validación `isValidTask` al cargar.
- La capa `Storage` como referencia del contrato de datos actual.
- La suite QUnit en `tests.html` con aislamiento de `localStorage`.

## Resultado esperado

- Existe un formato de documento propio, legible (JSON o equivalente), con campo de versión explícito, que cubre el estado completo: las tareas y lo que las épicas anteriores hayan añadido cuando se ejecute (listas, fechas).
- El dominio puede serializar el estado actual a ese documento y reconstruir el estado desde un documento válido.
- La validación de entrada rechaza documentos corruptos, malformados o de versión desconocida sin tocar el estado actual, e informa del motivo.
- Los identificadores del documento importado pueden reasignarse al incorporarlo, de modo que no colisionen con los existentes.

## Criterios de calidad

- Exportar y reimportar el mismo estado produce un estado equivalente (ida y vuelta sin pérdida).
- Un documento con JSON corrupto, estructura inesperada o versión desconocida se rechaza sin romper la app ni alterar el estado.
- Al incorporar un documento junto a un estado existente, no quedan identificadores duplicados.
- Las invariantes existentes se mantienen tras importar: sin tareas vacías, identificadores únicos y crecientes.
- La suite de `tests.html` pasa en verde con tests nuevos del formato, la validación y la reasignación de identificadores.
- Sin errores en consola.

## Procedimiento sugerido

1. Diseñar el documento: campos, versión y correspondencia con el estado del dominio; documentarlo en el propio formato o en una nota del propio archivo.
2. Implementar la serialización estado→documento y la deserialización documento→estado con validación estricta y reasignación de identificadores.
3. Decidir cómo se incorpora lo importado (reemplazo vs. copia) a nivel de dominio, dejando la elección para la capa superior.
4. Escribir los tests de ida y vuelta, rechazo de entradas inválidas y reasignación; verificar en el navegador.

## Notas

- Los commits de este proyecto llevan el ámbito `todo-app` en Conventional Commits (`tipo(todo-app): descripción`).
- El formato versionado es la decisión transversal de la propuesta: permite que listas y fechas se sumen al documento cuando existan, sin romper exportaciones anteriores.

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario: [fecha] — [Aprueba | Solicita cambios]
