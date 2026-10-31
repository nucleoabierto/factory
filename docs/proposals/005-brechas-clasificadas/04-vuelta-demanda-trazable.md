# Vuelta a la demanda de la capacidad ausente

## Tipo

desarrollo

## Objetivo

Dar a la brecha clasificada como capacidad ausente su vía de producto: la brecha produce una idea persistida derivada con trazabilidad a la pieza que la reveló, y la pieza queda bloqueada con su causa declarada hasta que la demanda derivada se materialice.

## Dependencias

- Borrador 01
- Borrador 02

## Entrada

- El modelo de clasificación del borrador 01 y la forma del veredicto enrutado del borrador 02.
- El formato de la idea persistida (`docs/ideas/`, reglas en `actualizar-artefactos/references/idea.md`) y el mecanismo de bloqueo del índice de tareas.
- El subflujo de desarrollo que consume el veredicto.

## Resultado esperado

- Cuando el veredicto declara una brecha «capacidad ausente», el flujo escribe la idea derivada en `docs/ideas/` —con el enunciado del problema y la referencia a la pieza y tarea que la revelaron— y marca la pieza bloqueada con la causa declarada.
- La idea derivada sigue el ciclo normal de la demanda: la revisita de prioridad la trata por su canal habitual cuando se materialice.

## Criterios de calidad

- La idea derivada declara su origen: la tarea y la pieza cuya evaluación la reveló, para que la trazabilidad sobreviva a la promoción.
- El bloqueo de la pieza lleva causa declarada —la capacidad ausente y la idea que la demanda—, no un bloqueo mudo.
- No se duplica la revisita: la idea derivada dispara «incorporación de demanda» solo cuando se materialice en trabajo, por el canal existente —no al persistirse—.
- El bloqueo es honesto: la pieza no se fuerza ni se abandona en silencio.

## Procedimiento sugerido

1. Leer el subflujo de desarrollo y el punto donde el veredicto «capacidad ausente» debe actuar.
2. Definir la escritura de la idea derivada: el enunciado del problema heredado de la brecha, la referencia de origen y su alta en `docs/ideas/` con la serie vigente.
3. Definir el bloqueo con causa sobre la pieza y su reflejo en la tarea y el índice si aplica.
4. Verificar que el canal de «incorporación de demanda» cubre la idea derivada sin mecanismo paralelo; declararlo si no.
5. Revisión de redacción preventiva sobre los cambios.

## Notas

- La idea persistida es demanda, no trabajo: su ordenación la decide la maquinaria de priorización cuando entre a competir —fuera de alcance de esta tarea según la propuesta—.
