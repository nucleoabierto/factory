# Importar desde archivo o enlace, reemplazando o incorporando como copia

## Estado

[ ] Pendiente | [ ] En progreso | [ ] En revisión | [ ] Completada | [ ] Bloqueada

## Tipo

desarrollo

## Objetivo

Cerrar el ciclo de portabilidad: la persona puede traer contenido a la aplicación desde un archivo o desde un enlace recibido, eligiendo entre reemplazar su estado o incorporarlo como copia junto a lo existente.

## Dependencias

- 021

## Entrada

- La deserialización validada y la reasignación de identificadores de la tarea 020.
- El enlace portable de la tarea 021, cuyos datos viajan en la URL.

## Resultado esperado

- La interfaz ofrece una acción de importar que acepta un archivo con el documento del formato propio.
- Abrir la aplicación con un enlace portable propone importar su contenido en lugar de ignorarlo.
- Antes de aplicar, la persona elige entre reemplazar su estado actual o incorporar lo recibido como copia; incorporar reasigna identificadores para no colisionar.
- Un documento inválido, corrupto o de versión desconocida se rechaza con un aviso claro y el estado queda intacto.
- Importar persiste el resultado como cualquier otro cambio.

## Criterios de calidad

- Importar un archivo válido deja el contenido disponible según la opción elegida, y persiste al recargar.
- Un enlace recibido propone la importación sin aplicarla hasta que la persona confirma.
- Incorporar como copia no destruye ni mezcla lo existente: ambos contenidos quedan consultables.
- Reemplazar descarta el estado anterior solo tras la confirmación y con un documento válido.
- La suite de `tests.html` pasa en verde con tests nuevos de ambos modos, del rechazo de inválidos y del enlace entrante.
- Sin errores en consola.

## Procedimiento sugerido

1. Cablear la entrada por archivo (selector de archivo) y la entrada por enlace (detección de datos en la URL al cargar).
2. Implementar el diálogo o flujo de elección reemplazar/incorporar antes de aplicar el documento validado.
3. Conectar con las operaciones del dominio del borrador 01 y persistir el resultado.
4. Escribir los tests de los dos modos, del rechazo y de la propuesta al recibir un enlace; verificar en el navegador.

## Notas

- Los commits de este proyecto llevan el ámbito `todo-app` en Conventional Commits (`tipo(todo-app): descripción`).
- Este borrador cierra los flujos de la idea: respaldo y restauración, cambio de equipo, lista entregada y punto de control antes de una limpieza.

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario: [fecha] — [Aprueba | Solicita cambios]
