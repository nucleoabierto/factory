# Exportar el estado como archivo descargable y como enlace portable

## Estado

[ ] Pendiente | [ ] En progreso | [ ] En revisión | [ ] Completada | [ ] Bloqueada

## Tipo

desarrollo

## Objetivo

Permitir a la persona sacar su contenido de la aplicación en dos formas: un archivo descargable que puede guardar o enviar, y un enlace que lleva los datos dentro para entregar la lista a otra persona.

## Dependencias

- 020

## Entrada

- La serialización estado→documento de la tarea 020.
- La estructura de la página `index.html` y la presentación `UI`.

## Resultado esperado

- La interfaz ofrece una acción de exportar que produce un archivo descargable con el documento del estado actual.
- La misma acción, u otra junto a ella, produce un enlace portable que codifica el documento —para abrirlo en otro navegador sin servidor—.
- El enlace generado es completo y autocontenido: no depende del estado del navegador que lo creó.
- Si el estado es demasiado grande para un enlace, la aplicación lo indica en lugar de producir un enlace roto o truncado.

## Criterios de calidad

- El archivo descargado contiene el documento bien formado con el estado completo.
- El enlace producido transporta el mismo documento que el archivo.
- Abrir el enlace en un contexto sin datos previos ofrece el contenido para importar (la recepción se completa en el borrador 03).
- La suite de `tests.html` pasa en verde con tests nuevos de la generación del archivo y del enlace, incluido el límite de tamaño.
- Sin errores en consola.

## Procedimiento sugerido

1. Implementar la descarga del documento como archivo (blob o equivalente, sin dependencias).
2. Implementar la codificación del documento en la URL del enlace (fragmento o parámetro), con su límite de tamaño detectado y comunicado.
3. Cablear ambas acciones en la interfaz en un lugar visible y discreto (pie o cabecera).
4. Escribir los tests de generación y del límite del enlace; verificar en el navegador.

## Notas

- Los commits de este proyecto llevan el ámbito `todo-app` en Conventional Commits (`tipo(todo-app): descripción`).
- El enlace en claro es decisión de la propuesta: quien comparte elige el canal; el cifrado queda fuera de alcance.

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario: [fecha] — [Aprueba | Solicita cambios]
