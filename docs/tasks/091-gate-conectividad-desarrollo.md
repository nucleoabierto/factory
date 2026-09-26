# Gate de conectividad técnica en el sub-flujo de desarrollo

## Estado

[ ] Pendiente | [ ] En progreso | [ ] En revisión | [ ] Completada | [ ] Bloqueada

## Tipo

mantenimiento

## Objetivo

Añadir al sub-flujo de desarrollo un gate de conectividad técnica entre la recolección de contexto y la planeación: contrastar lo que la tarea asume contra el codebase real y declararla conectada, parcialmente conectada o desconectada, de modo que la falta de infraestructura se detecte antes de planear y no durante la ejecución.

## Dependencias

- 090

## Entrada

- La sección `## Contexto` producida por el paso 0 (tarea 090), que ya incluye archivos similares y patrones vigentes.
- `desarrollo` como orquestador del sub-flujo, donde se inserta el gate.
- `crear-tareas` como mecanismo para dar de alta la capacidad base faltante.

## Resultado esperado

- `desarrollo` (o la capacidad que le corresponda) evalúa la conectividad una vez recopilado el contexto y antes de invocar `planear-implementacion`, y registra el veredicto en el archivo de la tarea.
- Veredicto `conectada`: el sub-flujo continúa a la planeación.
- Veredicto `parcialmente conectada`: se identifica qué falta; si es absorbible por la propia tarea, se declara en el contexto y se continúa; si no, se trata como desconectada.
- Veredicto `desconectada`: se da de alta la tarea de capacidad base previa con `crear-tareas`, la tarea actual queda bloqueada por ella y el sub-flujo informa al ejecutor general sin planear.
- Sin orquestadores ni documentos paralelos: un veredicto en la tarea y, cuando aplica, una tarea puente.

## Criterios de calidad

- El gate se ejecuta con el contexto ya recopilado, sin exploración adicional duplicada.
- El veredicto y su justificación breve quedan en el archivo de la tarea.
- Una tarea desconectada nunca llega a `planear-implementacion`: queda bloqueada con su dependencia registrada.
- La lógica de bloqueo reutiliza los mecanismos existentes (`[!]` en `TODO.txt`, dependencias en el archivo de tarea).

## Procedimiento sugerido

1. Definir el criterio de cada veredicto a partir del contexto recopilado (¿existe en el codebase lo que la tarea necesita?).
2. Insertar el gate en `desarrollo` entre el paso 0 y la decisión de planear; registrar el veredicto en la tarea.
3. Definir el camino de bloqueo: tarea puente vía `crear-tareas`, marca `[!]` y sublista de bloqueantes en `TODO.txt`.
4. Aplicar revisión de redacción y pulido mecánico en modo preventivo.

## Notas

- Adaptación ligera de `evaluar-conectividad-tecnica` de `../factory`: allí vive en el track de descubrimiento con assessments y roadmaps puente; aquí es un veredicto dentro de la ejecución de una tarea ya creada.

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario: [fecha] — [Aprueba | Solicita cambios]
