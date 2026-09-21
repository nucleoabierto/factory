---
name: idea-a-tarea
description: >
  Orquesta el flujo de idea a tarea de principio a fin: retoma las
  propuestas pendientes de revisión en TODO.txt o, si no las hay,
  coordina el descubrimiento del problema, la propuesta de forma de
  solución y el refinamiento con borradores, y gestiona la decisión
  del usuario (aprobación, cambios o rechazo).
  Usar cuando el usuario traiga una idea suelta, cuando se quiera
  procesar una propuesta pendiente o al iniciar una sesión para
  retomar el flujo.
  Sinónimos: orquestar flujo de idea a tarea, procesar idea, retomar
  propuesta, revisar propuesta, flujo de idea a tarea.
---

# Idea a tarea

Instrucciones para que un agente orqueste el flujo de idea a tarea: coordina las capacidades `descubrir-problema`, `proponer-forma-solucion` y `refinar-propuesta` en orden, retoma las propuestas pendientes de `TODO.txt` y gestiona la decisión del usuario sobre cada propuesta. Es análogo a `ejecutar-tareas`, pero para el flujo de idea a tarea.

## Cuándo usar

- Cuando el usuario traiga una idea suelta que quiera llevar a tareas.
- Cuando haya propuestas pendientes `[p]` en la sección «Propuestas en revisión» de `TODO.txt` y el usuario quiera retomar su revisión.
- Al iniciar una sesión, si el usuario pide continuar el flujo de idea a tarea.

## Cuándo no usar

- Cuando la solicitud ya viene articulada con objetivo y criterios claros: usar `crear-tareas` en modo independiente.
- Para ejecutar tareas pendientes de `TODO.txt`: eso corresponde a `ejecutar-tareas`.
- Para ejecutar una sola capacidad aislada del flujo (por ejemplo, solo formular un problema sin continuar): invocar esa capacidad directamente.

## Entrada

- `TODO.txt` con su sección «Propuestas en revisión», si existe.
- Una idea suelta del usuario, si no hay propuestas pendientes.
- Las capacidades del flujo: `descubrir-problema`, `proponer-forma-solucion`, `refinar-propuesta` y `crear-tareas` en modo flujo de idea a tarea.

## Salida

- Propuestas procesadas: aprobadas (materializadas en tareas definitivas por `crear-tareas`), devueltas a borrador con cambios o descartadas.
- O una propuesta nueva en `docs/proposals/NNN-slug/` enviada a revisión, si la idea suelta completó el flujo.
- O la conclusión de que la idea se descartó en una capacidad temprana, comunicada al usuario.

## Principios rectores

1. **Propuestas pendientes primero:** antes de aceptar una idea nueva, se revisa `TODO.txt`. Una propuesta `[p]` sin resolver bloquea el inicio de un flujo nuevo: el usuario decide sobre ella antes de seguir.
2. **Las capacidades no se saltan:** el flujo es descubrimiento del problema → propuesta de forma de solución → refinamiento con borradores. Cada capacidad valida con el usuario antes de entregar su salida a la siguiente.
3. **El agente transporta, no resume:** la salida de cada capacidad pasa completa a la siguiente. El orquestador no reformula el problema ni la forma de solución por su cuenta.
4. **La puerta asíncrona se respeta:** cuando `refinar-propuesta` envía la propuesta a revisión, el agente se detiene. La decisión del usuario puede llegar en otra sesión; por eso la primera acción del skill es siempre leer `TODO.txt`.
5. **La decisión queda registrada:** la aprobación, los cambios o el rechazo se anotan en el campo Revisión de `propuesta.md` y se reflejan en `TODO.txt`. El directorio de la propuesta se conserva siempre, incluso descartada.

## Procedimiento

### 1. Revisar propuestas pendientes

1. **Leer `TODO.txt`** y buscar líneas `[p]` en la sección «Propuestas en revisión».
2. **Si hay varias,** procesarlas de una en una, en el orden en que figuran.
3. **Por cada propuesta pendiente,** leer `docs/proposals/NNN-slug/propuesta.md` y sus borradores, y presentar el resumen al usuario para que decida: aprobar, solicitar cambios o rechazar.
4. **Si el usuario aprueba:** comunicar la aprobación e invocar `crear-tareas` en modo flujo de idea a tarea, que registra la decisión en el campo Revisión de `propuesta.md` al verificar la propuesta, promueve los borradores a tareas definitivas y asigna el conjunto a una épica nueva o existente —o a un encabezado ligero si el conjunto no amerita épica— invocando `planificar` en modo promoción.
5. **Si el usuario solicita cambios:** retirar la línea `[p]` de `TODO.txt`, registrar la decisión en el campo Revisión (`Usuario: [fecha] — Solicita cambios`), aplicar los cambios a `propuesta.md` y sus borradores, devolver la propuesta a `[ ]` Borrador y reenviarla a revisión siguiendo la sección 3 de `refinar-propuesta` (estado `[p]` y línea de nuevo en `TODO.txt`).
6. **Si el usuario rechaza:** eliminar la línea `[p]` de `TODO.txt`, cambiar el estado de `propuesta.md` a `[d]` Descartada y registrar la decisión en el campo Revisión (`Usuario: [fecha] — Rechaza`). El directorio se conserva para trazabilidad.
7. **Si no hay propuestas pendientes** y el usuario no trae una idea nueva, informar y terminar.

### 2. Coordinar el flujo con una idea nueva

8. **Invocar `descubrir-problema`** con la idea suelta. Si la idea se descarta en esta capacidad, comunicar la conclusión y terminar.
9. **Invocar `proponer-forma-solucion`** con el problema y la oportunidad validados. Si la categoría resulta fuera de alcance o el usuario decide no continuar, comunicar la conclusión y terminar.
10. **Invocar `refinar-propuesta`** con el material validado: problema, oportunidad, forma de solución, alternativas y fuera de alcance. El skill crea la propuesta y sus borradores y la envía a revisión.
11. **Detenerse.** La propuesta queda pendiente `[p]` en `TODO.txt` a la espera de la decisión del usuario, que se procesará en el paso 1 de una invocación posterior de este skill.

## Formato de salida

No hay un formato de salida fijo. El resultado del flujo es el estado de las propuestas en `docs/proposals/`, las tareas definitivas en `docs/tasks/` y las líneas actualizadas de `TODO.txt`.

## Finalización

El skill ha terminado cuando:

- No quedan propuestas `[p]` sin procesar en `TODO.txt`: cada una fue aprobada y promocionada, devuelta a revisión con cambios o marcada como `[d]` Descartada.
- Si el usuario trajo una idea nueva, esta recorrió las tres capacidades del flujo y terminó en propuesta enviada a revisión, o se descartó en una capacidad temprana con la conclusión comunicada.

## Referencias

- `docs/decisions/D013-mecanismo-borradores-reflejo-todo.md` — Ciclo de vida de la propuesta y marcador `[p]` en `TODO.txt`.
- `docs/decisions/D015-extension-de-d001-para-indice-de-propuestas.md` — `TODO.txt` como índice de tareas y propuestas en revisión.
