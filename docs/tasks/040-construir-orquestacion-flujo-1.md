# Construir capacidad de orquestación del flujo 1

## Objetivo

Construir la capacidad que coordina las transiciones del flujo 1 (idea → tarea): descubre el problema, propone la forma de solución, refina con borradores y, tras la aprobación, invoca la promoción de `crear-tareas`. Es análoga a `ejecutar-tareas` pero para el flujo 1.

## Dependencias

- 036 (Construir capacidad de descubrimiento del problema)
- 037 (Construir capacidad de propuesta de forma de solución)
- 038 (Construir capacidad de refinamiento con borradores)
- 039 (Extender crear-tareas con modo flujo 1)

## Entrada

- Una idea suelta del usuario o una propuesta pendiente detectada en `TODO.txt`.
- Skills construidos en las tareas 036, 037, 038 y `crear-tareas` extendido en la 039.
- Investigación 032 en `docs/research/2026-09-flujo-1-propuesta-borradores.md`.
- Decisiones de diseño D012-D015.

## Resultado esperado

- Un skill coordinador que:
  1. Lee `TODO.txt`. Si hay propuestas pendientes `[p]`, retoma la revisión con el usuario.
  2. Si no, toma la idea suelta y coordina: descubrimiento del problema → propuesta de forma de solución → refinamiento con borradores.
  3. Tras la aprobación del usuario, registra la decisión en el campo Revisión de `propuesta.md` e invoca la promoción de `crear-tareas` (modo flujo 1).
  4. Tras el rechazo, marca la propuesta como descartada.
- Produce como salida: tareas definitivas en `docs/tasks/` y `TODO.txt`, o propuesta descartada.

## Criterios de calidad

- Coordina las capacidades de las tareas 036, 037 y 038 en el orden correcto.
- Detecta y retoma propuestas pendientes `[p]` en `TODO.txt`.
- Invoca `crear-tareas` en modo flujo 1 tras la aprobación.
- Marca las propuestas descartadas correctamente.
- Sigue el estándar de skills del proyecto.
- Pasa revisión técnica por subagente independiente.

## Procedimiento sugerido

1. Definir el nombre y la estructura del skill.
2. Escribir el `SKILL.md` con el procedimiento de orquestación.
3. Probar la coordinación extremo a extremo con una idea de prueba.
4. Someter a revisión dual.

## Notas

- Es el skill coordinador del flujo 1, análogo a `ejecutar-tareas` para el flujo 2. Se construye después de las capacidades que coordina.

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario: [fecha] — [Aprueba | Solicita cambios]
