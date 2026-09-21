---
name: ejecutar-implementacion
description: >
  Ejecuta el desarrollo de una tarea siguiendo el plan técnico y
  la suite de pruebas esperada que la planeación dejó en su
  archivo, confrontando el trabajo con el plan a medida que
  avanza y registrando las desviaciones.
  Usar al ejecutar una tarea de tipo desarrollo que ya tiene
  plan, invocado por el skill especialista del sub-flujo de
  desarrollo o directamente.
  Sinónimos: ejecutar implementación, implementar el plan,
  desarrollo siguiendo el plan, codificar la tarea.
---

# Ejecutar implementación

Instrucciones para que un agente ejecute el desarrollo de una tarea siguiendo el plan técnico y la suite de pruebas esperada registrados en su archivo. El skill implementa las acciones del plan en orden, confronta el trabajo con el plan a medida que avanza —no solo al final— y trata la desviación como señal de detenerse y reexaminar: cada desviación queda registrada y se replanifica o se pide confirmación al usuario. La salida es el diff de los cambios junto con el registro de desviaciones.

## Cuándo usar

- Al ejecutar una tarea de tipo desarrollo cuyo archivo ya contiene las secciones `## Plan técnico` y `## Suite de pruebas esperada`: invocado por el skill especialista que orquesta el sub-flujo de desarrollo dentro de la tarea.
- Cuando el usuario pida implementar el plan de una tarea concreta.

## Cuándo no usar

- Para tareas que no modifican código: se ejecutan con el comportamiento general de `ejecutar-tareas`.
- Si la tarea aún no tiene plan: corresponde primero a `planear-implementacion`.
- Para revisar la implementación producida: eso corresponde a la fase de revisión de implementación del sub-flujo de desarrollo (skill pendiente de creación).

## Entrada

- El archivo de la tarea de desarrollo (`docs/tasks/NNN-slug.md`) con `## Plan técnico` y `## Suite de pruebas esperada` aprobados.
- El código base del subsistema afectado.
- El plan técnico de la épica, si la tarea pertenece a una, como guía de arquitectura vigente durante la ejecución.

## Salida

- El diff de los cambios de código que implementan la tarea.
- Una sección `## Desviaciones del plan` agregada al archivo de la tarea cuando hubo desviaciones, con cada desviación, su motivo y la decisión tomada. Si no hubo, no se agrega nada.

## Principios rectores

1. **El plan manda, la evidencia manda más:** la ejecución sigue las acciones del plan; cuando la evidencia nueva contradice el plan, el agente se detiene y reexamina en lugar de continuar por inercia.
2. **Chequeo continuo, no final:** cada acción implementada se confronta con el plan al terminarla, de modo que la desviación se detecta donde ocurre y no como sorpresa al final.
3. **La desviación se registra, no se oculta:** toda desviación queda documentada con su motivo y la decisión tomada; el registro es evidencia para la revisión y para el siguiente plan.
4. **Las pruebas verifican el qué:** la suite de pruebas esperada define el comportamiento a satisfacer; la implementación se juzga contra esas expectativas, no contra la forma interna que el agente prefiera.
5. **Convenciones del código base:** el código nuevo sigue los patrones de los archivos hermanos o de funcionalidad similar que el entendimiento del subsistema identificó.

## Procedimiento

### 1. Preparar la ejecución

1. **Leer el archivo de la tarea:** objetivo, criterios de calidad, `## Plan técnico` (con el resumen del subsistema) y `## Suite de pruebas esperada`. Si falta el plan o la suite, detenerse e invocar `planear-implementacion` o informar al usuario.
2. **Confirmar el punto de partida:** verificar que el estado del código base coincide con lo que el resumen del subsistema describe. Si difiere de forma relevante, tratarlo como evidencia nueva: registrarlo y reexaminar el plan antes de codificar.

### 2. Implementar siguiendo el plan

3. **Ejecutar las acciones del plan en su orden**, escribiendo el código que cada una declara. Al terminar cada acción, confrontar lo hecho con lo planeado: si coincide, continuar; si no, pasar al manejo de desviaciones (paso 5).
4. **Cubrir la suite de pruebas esperada** a medida que el comportamiento existe: escribir o completar las pruebas que expresan las expectativas de la suite, trazables a los mismos casos de uso.
5. **Manejo de desviaciones:** al detectar que el trabajo se aparta del plan —una acción inviable, una acción que falta, un alcance que crece—, detenerse y:
   - **Registrar la desviación:** qué se apartó, qué evidencia lo motivó.
   - **Decidir el camino:** si la desviación es menor y no cambia el objetivo ni los criterios de la tarea, replanificar la acción afectada actualizando `## Plan técnico` y continuar; si cambia el objetivo, el alcance o la guía de la épica, pedir confirmación al usuario antes de continuar.

### 3. Cerrar la ejecución

6. **Verificación final contra el plan:** recorrer las acciones del plan y las expectativas de la suite y confirmar que cada una quedó realizada o registrada como desviación.
7. **Registrar las desviaciones:** si hubo, agregar `## Desviaciones del plan` al archivo de la tarea, antes de la sección Revisión, con una lista de desviaciones y para cada una su motivo y la decisión tomada.
8. **Informar al usuario** del diff producido y de las desviaciones registradas, listo para la fase de revisión.

## Finalización

El skill ha terminado cuando:

- Las acciones del plan quedaron implementadas o registradas como desviaciones.
- La suite de pruebas esperada quedó cubierta por pruebas que expresan sus expectativas.
- Las desviaciones, si las hubo, constan en `## Desviaciones del plan` del archivo de la tarea con motivo y decisión.

## Referencias

- `docs/research/2026-09-flujo-desarrollo.md` — Fase de ejecución con el ajuste aprobado de revisión del plan durante el desarrollo.
- `docs/decisions/D020-flujo-desarrollo-skill-especialista.md` — Encapsulación del flujo de desarrollo en skills especialistas.
