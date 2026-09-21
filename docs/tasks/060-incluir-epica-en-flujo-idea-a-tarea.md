# Incluir la épica en el flujo de idea a tarea

## Estado

[ ] Pendiente | [ ] En progreso | [ ] En revisión | [ ] Completada | [ ] Bloqueada

## Objetivo

Hacer que la épica sea el último artefacto de la planeación dentro del flujo de idea a tarea, no un paso aparte: el orquestador `idea-a-tarea` debe cerrar el flujo invocando `planificar` una vez promovidos los borradores a tareas.

## Dependencias

- Ninguna

## Entrada

- El skill `idea-a-tarea`, que orquesta el flujo de principio a fin y hoy termina en la promoción de borradores.
- El skill `crear-tareas`, que en modo flujo de idea a tarea ya invoca `planificar` en modo promoción (paso 9 de su procedimiento).
- El skill `planificar`, capacidad de agrupación en épicas construida por la tarea 057.
- La observación del usuario: la épica es el último artefacto de la planeación, así que debe formar parte del flujo orquestado.

## Resultado esperado

- `idea-a-tarea` actualizado para que el flujo completo incluya la agrupación en épica como cierre de la planeación.
- La delegación existente de `crear-tareas` a `planificar` queda integrada de forma coherente en la narrativa del orquestador, sin duplicar la lógica.
- Los skills relacionados (`refinar-propuesta`, `planificar`) actualizados solo donde la descripción del flujo lo requiera.

## Criterios de calidad

- Ejecutar el flujo de idea a tarea de principio a fin produce la épica (o agrupación equivalente) sin invocación manual adicional.
- La lógica de agrupación sigue existiendo una sola vez: `idea-a-tarea` referencia, no duplica.
- La descripción del flujo en los skills afectados es consistente entre sí.

## Procedimiento sugerido

1. Releer `idea-a-tarea`, `crear-tareas` y `planificar` para mapear dónde hoy se produce la agrupación.
2. Actualizar `idea-a-tarea` para que el cierre del flujo incluya la agrupación, delegando en la capacidad existente.
3. Ajustar las descripciones cruzadas de los skills afectados.
4. Aplicar revisión de redacción y pulido mecánico preventivos.
5. Verificar los criterios de calidad contra el resultado.

## Notas

- El origen de la tarea es el ejercicio mental previo a la validación 058: la épica es el último artefacto de la planeación, luego debe vivir dentro del flujo orquestado.

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario: [fecha] — [Aprueba | Solicita cambios]
