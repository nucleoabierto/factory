---
name: ejecutar-tareas
description: >
  Ejecuta el ciclo de tareas del proyecto: lee TODO.txt, toma la próxima
  tarea pendiente, la ejecuta siguiendo su archivo de tarea en su propia
  rama, la somete a revisión técnica por subagente independiente y la
  entrega al usuario en un pull request —la puerta de ejecución— que se
  fusiona tras la aprobación del paquete de cierre —la puerta de cierre—.
  Repite hasta que no quedan tareas pendientes.
  Usar cuando se pida ejecutar tareas, continuar con el trabajo, retomar
  el ciclo, avanzar tareas o procesar TODO.txt.
  Sinónimos: ejecutar tarea, correr tareas, avanzar tareas, siguiente
  tarea, procesar TODO, retomar trabajo, ciclo de tareas.
---

# Ejecutar tareas

Ejecuta iterativamente el ciclo de tareas del proyecto: lee el índice, toma la próxima tarea pendiente, la ejecuta en su propia rama, la somete a revisión técnica por un subagente independiente y la entrega al usuario en un pull request —la puerta de ejecución—; aprobado el PR, corren los sensores de cierre y el usuario aprueba el paquete completo —la puerta de cierre— antes de fusionarlo, hasta que no quedan tareas pendientes.

## Cuándo usar

- Cuando se pida ejecutar, avanzar o continuar con las tareas del proyecto.
- Cuando se quiera procesar `TODO.txt` y ejecutar la próxima tarea pendiente.
- Al iniciar una sesión de trabajo para retomar el ciclo donde se dejó.

## Cuándo no usar

- Cuando se pida crear tareas nuevas: usar el skill `crear-tareas`.
- Cuando se pida commitear sin haber ejecutado una tarea: usar el skill `commit`.
- Cuando no haya tareas pendientes y el usuario no haya solicitado continuar el ciclo.
- Cuando el proyecto evaluado no tiene remoto GitHub o `gh` no está autenticado: el ciclo exige el pull request como puerta de ejecución y no tiene modo degradado.

## Entrada

- `TODO.txt` como índice de tareas del proyecto.
- Archivos de tarea en `docs/tasks/` referenciados desde `TODO.txt`.
- Un remoto GitHub y `gh` autenticado en el repositorio evaluado: cada tarea produce un pull request.

## Salida

- Tareas pendientes ejecutadas, revisadas y marcadas como completadas en `TODO.txt` y en su archivo de tarea, con sus tres veredictos en `## Revisión`.
- Un pull request por tarea —abierto tras la revisión técnica y fusionado tras la puerta de cierre— que deja un commit por tarea en la rama principal.
- `TODO.txt` actualizado con los cambios de estado.
- El changelog del proyecto evaluado actualizado cuando alguna tarea completada produjo un cambio con impacto observable.

## Principios rectores

1. **Una tarea a la vez:** ejecuta una sola tarea pendiente por iteración del ciclo, de principio a fin, antes de tomar la siguiente.
2. **Seguir el archivo de tarea:** cada tarea define su objetivo, procedimiento y criterios de calidad; respétalos como contrato.
3. **Trazabilidad:** marca el estado en `TODO.txt` y en el campo «Estado» del archivo de tarea para que el progreso sea visible sin inspeccionar el repositorio; los tres veredictos —revisión técnica, puerta de ejecución, puerta de cierre— quedan en el `## Revisión` del archivo.
4. **Una rama y un PR por tarea:** cada iteración corre en su propia rama, aislada de la principal; el pull request es el vehículo de la puerta de ejecución y su merge —squash— deja un commit por tarea en la rama principal, para que el historial refleje el avance real.
5. **Dos puertas humanas:** el usuario revisa el cambio en el PR —con su bucle de comentarios— antes de los sensores, y aprueba el paquete de cierre después de ellos y antes del merge; ninguna de las dos la suplanta el agente.
6. **No inventar tareas:** si descubres trabajo nuevo durante la ejecución, dalo de alta con `crear-tareas`; no lo ejecutes directamente.

## Procedimiento

1. **Consultar el índice de tareas** del proyecto evaluado (`TODO.txt` en la convención) delegando en `consultar-artefactos`: la operación `propuestas` devuelve las líneas `[p]` de la sección «Propuestas en revisión», que no son tareas sino propuestas del flujo de idea a tarea que esperan la decisión del usuario; si hay alguna, informar al usuario y derivar su procesamiento a `idea-a-tarea` antes de tomar la próxima tarea pendiente, en lugar de ignorarlas.
2. **Identificar la próxima tarea pendiente** con la operación `siguiente` de `consultar-artefactos`. Si devuelve una línea en curso (`[~]` o `[r]`), retomarla en lugar de empezar una nueva.
3. **Si no hay tareas pendientes**, preguntar al usuario qué hacer y, si propone trabajo nuevo, usar el skill `crear-tareas` para darlo de alta. Terminar el ciclo.
4. **Marcar la tarea como en progreso** antes de empezar a trabajar, delegando las dos mutaciones en `actualizar-artefactos`: `todo.sh marcar` pone `[~]` en la línea del índice y `tarea.sh estado` escribe «En progreso» en el `## Estado` del archivo. Esto evita que otra sesión tome la misma tarea. Toda la iteración corre en la rama de la tarea, creada con la rama principal como base —`git switch -c <rama> <rama-principal>` si no existe, `git switch <rama>` cuando la tarea ya la tiene, sea por retoma en curso o por desbloqueo tras un bloqueo declarado—. El nombre de la rama se deriva del identificador de la tarea —el nombre de su archivo, sin la extensión— bajo un prefijo de convención, `tarea/` por defecto —`tarea/NNN-slug`—; si el proyecto evaluado declara su propia convención de ramas, esa prevalece.
5. **Leer el archivo de tarea** referenciado y seguir su objetivo, procedimiento y criterios de calidad. Si el procedimiento sugiere validación con el usuario, pedir confirmación antes de continuar.
   - **Consultar las lecciones aplicables:** invocar el skill `consultar-lecciones` con una descripción de la tarea (archivos que tocará, comandos o palabras clave) para traer las notas correspondientes al contexto.
   - **Consultar la épica del conjunto:** la operación `grupos` de `consultar-artefactos` resuelve los encabezados del índice con su épica enlazada; si la tarea figura bajo una agrupación con épica, leer ese documento: su plan técnico es la guía de arquitectura que la ejecución debe respetar. El plan detallado de la tarea se elabora al ejecutarla, dentro de esa guía.
   - **Enrutar por tipo:** con las consultas anteriores hechas, si la tarea declara un `Tipo` con especialista registrado en la sección «Enrutado por tipo», invocar ese skill para ejecutar la tarea. Si no declara tipo o el tipo no tiene especialista, ejecutarla directamente con el comportamiento general. El ejecutor no conoce las fases del dominio: solo lee el tipo y delega. La única excepción es el estado de planeación que el propio registro declare —hoy, las secciones de plan aprobado en el archivo de la tarea—, que el ejecutor consulta para elegir entre los puntos de entrada del tipo.
6. **Si durante la ejecución se descubren nuevas tareas**, usar el skill `crear-tareas` para darlas de alta. No ejecutarlas dentro de la iteración actual; se procesarán en iteraciones posteriores del ciclo.
7. **Si la tarea no se puede realizar porque depende de otra aún no completada**, declararla bloqueada con `todo.sh marcar` de `actualizar-artefactos`: la marca `[!]` en `TODO.txt` recibe las tareas bloqueantes como argumentos y el script las escribe como sublista bajo la línea. Si el bloqueo se declara con trabajo en curso, commitearlo en la rama de la tarea —la rama conserva el estado para retomarla—; en cualquier caso, volver a la rama principal antes de pasar a otra, para que la rama de la siguiente tarea nazca limpia de la principal. Pasar a la siguiente tarea pendiente no bloqueada.
8. **Al terminar la tarea**, marcarla como en revisión con las mismas dos operaciones del paso 4: `[r]` en `TODO.txt` y «En revisión» en el `## Estado` del archivo. No marcarla como completada todavía.
9. **Lanzar un subagente independiente para revisión técnica.** El subagente arranca con contexto aislado y se lanza con capacidad de ejecutar comandos —los necesita para reconstruir el diff con git; un revisor sin ejecución no puede verificarlo—: recibe el archivo de tarea (objetivo y criterios de calidad) y la ubicación de los cambios —árbol de trabajo sin commitear o rango de commits— para reconstruir el diff por sí mismo, pero no el razonamiento del agente ejecutor. Su rol es adversarial: verificar cada criterio de calidad contra el diff, buscar problemas no previstos, y **cotejar el diff contra las lecciones aprendidas**: consulta `docs/lessons/README.md`, identifica las notas cuyos disparadores coincidan con los archivos y acciones del cambio, las lee y verifica que el diff no repite errores ya aprendidos —aunque el ejecutor las haya aplicado bien, la revisión confirma independientemente. Produce un informe con un veredicto: aprueba o solicita cambios. Si la tarea se enrutó al sub-flujo de desarrollo —tipo `desarrollo` o `mantenimiento (refactoring)`—, la revisión técnica se realiza invocando `revisar-implementacion` en lugar del subagente genérico.
10. **Si el subagente solicita cambios**, corregir los problemas detectados y repetir desde el paso 8.
11. **Si el subagente aprueba, abrir la puerta de ejecución:** invocar `gestionar-pr` en su momento de apertura con el archivo de la tarea y el informe de la revisión técnica. El skill commitea el trabajo en la rama, abre el pull request con una descripción orientada al revisor y conduce el bucle de comentarios. La aprobación del PR por el usuario es la puerta de ejecución del ciclo: la revisión humana del cambio, con sus rondas de mejora, ocurre aquí y no en la sesión.
12. **Aprobado el PR**, marcar la tarea como completada con las mismas operaciones de `actualizar-artefactos` —`[x]` en `TODO.txt` y «Completada» en el `## Estado`— y registrar los dos primeros veredictos en el `## Revisión` del archivo con `tarea.sh registrar-revision`: `Subagente: [fecha] — Aprueba` y `Usuario (ejecución): [fecha] — Aprueba`.
13. **Si el usuario hizo correcciones durante la tarea** —en la sesión o vía comentarios del PR—, invocar el skill `registrar-experiencias` para anotarlas en el registro de experiencias. Si no hubo correcciones, no se registra nada.
14. **Si la tarea se enrutó al sub-flujo de desarrollo** —tipo `desarrollo` o `mantenimiento (refactoring)`—, invocar el skill `documentar-dominio` con la ubicación de los cambios de la tarea —el rango de commits de la rama o el árbol de trabajo—: evalúa si el cambio altera conceptos, invariantes o fronteras del dominio y actualiza `docs/domains/` solo si procede. En el mismo punto, invocar `documentar-producto` con la misma ubicación de los cambios: evalúa si el cambio altera funcionalidades, flujos o referencia de uso y actualiza el directorio de documentación de producto solo si procede. Si la tarea pertenece a un conjunto con PRD, invocar también `mantener-prd` en modo sensor con la misma ubicación: evalúa si el diff desvía el comportamiento declarado y actualiza `docs/prd/` solo si procede. Si el diff introdujo una decisión estructural implícita que merece registro, invocar también `decisiones-diseno`. Si `documentar-dominio` reporta divergencia estructural, comunicar la recomendación de `revisar-arquitectura` al usuario; no ejecutarla dentro de la iteración.
15. **Invocar el skill `mantener-changelog` con la misma ubicación de los cambios de la tarea, cualquiera que sea su tipo:** evalúa si el cambio tiene impacto observable para el consumidor del producto y, cuando lo tiene, registra la entrada en la sección de no liberados del changelog del proyecto evaluado —fusionándola con la de la agrupación de la tarea cuando existe—; en caso contrario emite «sin entrada». Es el mismo punto del cierre que los sensores de documentación del paso anterior, con la diferencia de que corre para todo tipo de tarea: cualquier tarea puede producir un cambio observable para el consumidor.
16. **Reflejar el roadmap y, si la agrupación se agotó, cerrar el conjunto —en ese orden.** Primero invocar `mantener-roadmap` con la tarea recién completada, cualquiera que sea su tipo —cualquier tarea puede ser la última de una línea del roadmap—: refleja el estado real de las líneas comprometidas del roadmap desde el índice y las épicas, retira las completadas e invoca `planificar-roadmap` si detecta divergencia de dirección. Después, comprobar si la agrupación de la tarea completada quedó agotada —la operación `estado-grupo` de `consultar-artefactos` reporta los estados presentes bajo el encabezado, y agotada es que solo figure `x`; para una tarea suelta, que su propia línea esté `[x]`— e, invocado solo en ese caso, `cerrar-conjunto` con la tarea y el índice: verifica el criterio de cierre de la épica enlazada por el comentario `<!-- épica: … -->`, la marca `Completada` y elimina la agrupación del índice. El reflector corre antes porque una línea del roadmap que resuelve a un encabezado ligero o a una tarea suelta deja de poder verificar su cierre una vez la agrupación sale del índice; para la línea con épica enlazada el orden es indiferente.
17. **Commitear las escrituras del cierre en la rama** con el skill `commit` —el estado de la tarea, los veredictos, las experiencias, el changelog, la documentación y el índice— y empujarla: el PR pasa a reflejar el paquete de cierre completo. Presentar el paquete al usuario —qué escribieron los sensores y qué quedó decidido— para la puerta de cierre. Si solicita cambios en las escrituras, corregirlas, commitear y empujar la rama, y repetir la presentación; si lo que corrige es el cambio en sí, la corrección vuelve a pasar por el bucle de revisión del PR antes de repetir la presentación.
18. **Aprobado el paquete de cierre**, registrar el tercer veredicto en el `## Revisión` del archivo —`Usuario (cierre): [fecha] — Aprueba`—, commitearlo en la rama e invocar `gestionar-pr` en su momento de cierre: empuja la rama, fusiona el PR y deja el repositorio en la rama principal actualizada.
19. **Volver al paso 1** y repetir el ciclo hasta que no queden tareas pendientes no bloqueadas.
20. **Si no quedan tareas pendientes**, preguntar al usuario qué hacer y, si propone trabajo nuevo, usar el skill `crear-tareas`. Terminar el ciclo.

## Enrutado por tipo

Registro de tipos de tarea que tienen skill especialista. Añadir un tipo nuevo solo exige registrarlo aquí; el procedimiento del orquestador no cambia.

- `desarrollo` → dos flujos según el estado de planeación del archivo de la tarea —consultado con la operación `planeacion` de `consultar-artefactos`—: sin `## Plan técnico` y `## Suite de pruebas esperada` aprobados, skill `planear-tarea` —y si la planeación termina con plan aprobado, la misma iteración continúa con `desarrollar-tarea`; si el usuario rechaza el plan, la tarea no puede ejecutarse y se informa—; con ambas secciones aprobadas, skill `desarrollar-tarea` directamente.
- `mantenimiento (refactoring)` → mismo enrutado con estado que `desarrollo`. El tipo `mantenimiento` cubre el trabajo que preserva el sistema sin añadir capacidad observable y tiene dos perfiles: el perfil `refactoring` —transformaciones de código con comportamiento observable invariante, cuya aceptación exige misma API pública, misma suite en verde y mismo comportamiento— usa el sub-flujo de desarrollo porque su suite es la red que verifica la invariancia; `mantenimiento` a secas —trabajo de proceso sin comportamiento observable— sigue el comportamiento general y no figura en este registro.

## Formato de salida

No hay un formato de salida fijo. El resultado del ciclo es el estado actualizado de `TODO.txt`, los archivos de tarea, los pull requests fusionados y el historial de la rama principal. Al terminar cada iteración, informar brevemente al usuario de la tarea completada y de la siguiente que se va a ejecutar.

## Finalización

El skill ha terminado cuando:

- No quedan tareas pendientes `[ ]`, en progreso `[~]` ni en revisión `[r]` en `TODO.txt`.
- Todas las tareas completadas tienen su pull request fusionado.
- Se ha informado al usuario del estado final.
