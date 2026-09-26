---
name: desarrollo
description: >
  Skill especialista que encapsula el pipeline de desarrollo
  dentro de una tarea: recopila el contexto, evalúa la
  conectividad con el codebase, invoca la planeación de
  implementación y luego la ejecución, y devuelve al orquestador
  general el diff y el registro de desviaciones.
  Usar desde el enrutado por tipo de ejecutar-tareas cuando la
  tarea es de tipo desarrollo o mantenimiento (refactoring).
  Sinónimos: flujo de desarrollo, sub-flujo de desarrollo,
  especialista de desarrollo, pipeline de desarrollo.
---

# Desarrollo

Instrucciones para que un agente orqueste el sub-flujo de desarrollo dentro de una sola tarea, invocado por `ejecutar-tareas` cuando el tipo declarado de la tarea es `desarrollo` o `mantenimiento (refactoring)`. Es un mini-orquestador acotado: coordina las capacidades `recopilar-contexto`, `evaluar-conectividad`, `planear-implementacion` y `ejecutar-implementacion` en orden y devuelve el resultado al ejecutor general. No introduce worktree, pull request ni merge, que pertenecen a los flujos de gestión a nivel de código, aún no construidos; y no duplica la lógica del ciclo de tareas —estados, revisión dual y commit siguen siendo del orquestador general.

## Cuándo usar

- Cuando `ejecutar-tareas` enruta una tarea cuyo campo `## Tipo` declara `desarrollo` o `mantenimiento (refactoring)`.
- Cuando el usuario pida ejecutar directamente el sub-flujo de desarrollo de una tarea concreta.

## Cuándo no usar

- Para tareas de otro tipo o sin tipo declarado: se ejecutan con el comportamiento general de `ejecutar-tareas`.
- Para revisar la implementación al final del ciclo: eso corresponde a `revisar-implementacion`, invocado por el ejecutor en su paso de revisión, no por este skill.

## Entrada

- El archivo de la tarea de desarrollo (`docs/tasks/NNN-slug.md`), ya marcada en progreso por el ejecutor general.
- El plan técnico de la épica que agrupa la tarea, si existe, como guía de arquitectura.
- Las capacidades internas: `recopilar-contexto`, `evaluar-conectividad`, `planear-implementacion` y `ejecutar-implementacion`.

## Salida

- El diff de los cambios que implementan la tarea.
- El archivo de la tarea actualizado con las secciones `## Contexto`, `## Conectividad`, `## Plan técnico`, `## Suite de pruebas esperada` y, si las hubo, `## Desviaciones del plan`.
- O la conclusión de que la tarea no puede continuar —tarea desconectada, plan rechazado, desviación que el usuario no confirmó—, comunicada al ejecutor general.

## Principios rectores

1. **El orquestador coordina, las capacidades ejecutan:** este skill decide el orden y el punto de parada; el contenido del plan, el código y el registro de desviaciones los producen las capacidades invocadas.
2. **Acotado a una tarea:** el sub-flujo vive dentro de la ejecución de una tarea del ciclo general; no gestiona estado de la tarea, ni revisión dual, ni commit.
3. **Las puertas humanas se respetan:** la aprobación del plan y la confirmación de desviaciones mayores pertenecen al usuario; el orquestador no las sustituye.
4. **Un solo artefacto por tarea:** plan, suite y desviaciones quedan en el archivo de la tarea, no en documentos paralelos.

## Procedimiento

1. **Leer el archivo de la tarea** para confirmar que su tipo enruta a este especialista (`desarrollo` o `mantenimiento (refactoring)`) y fijar objetivo y criterios de calidad.
2. **Crear la lista de control de la sesión** con los pasos internos del pipeline —recopilar contexto, evaluar conectividad, planear implementación con su puerta humana, ejecutar el plan, verificar el resultado contra el plan y devolver el control— usando la herramienta de lista de tareas del arnés cuando exista, o su equivalente manual. La lista es un instrumento de navegación efímero: se mantiene con exactamente un ítem en progreso y cada paso completado se marca de inmediato, pero la fuente de verdad del avance sigue siendo el archivo de la tarea. Una ejecución que se retoma tras una interrupción reconstruye la lista desde las secciones y la checklist del archivo de la tarea, no de memoria.
3. **Recopilar el contexto de la tarea** invocando `recopilar-contexto`, que registra la sección `## Contexto` con los archivos similares, los patrones vigentes y las lecciones y decisiones aplicables. Si la sección ya existe, la capacidad la enriquece solo donde falte, sin rehacerla.
4. **Evaluar la conectividad de la tarea** invocando `evaluar-conectividad`, que registra el veredicto en la sección `## Conectividad`. Si el veredicto es `conectada` o `parcialmente conectada` absorbible, continuar. Si es `desconectada`, dar de alta la tarea de capacidad base faltante con `crear-tareas`, registrarla como dependencia bloqueante en la tarea actual e informar al ejecutor general —que la marcará bloqueada en `TODO.txt` con la sublista de tareas bloqueantes— sin llegar a planear.
5. **Si la tarea no tiene `## Plan técnico` y `## Suite de pruebas esperada` aprobados** —ninguna de las dos o solo una—, invocar `planear-implementacion` para producir lo que falte. Si el usuario rechaza el plan, informar al ejecutor general de que la tarea no pudo ejecutarse y terminar.
6. **Si la tarea ya tiene ambas secciones aprobadas** —por una invocación anterior o por una ejecución interrumpida—, no replanificar: continuar con el plan existente.
7. **Invocar `ejecutar-implementacion`** con el archivo de la tarea. La capacidad sustituye el ítem «ejecutar el plan» de la lista de control por las acciones del plan como ítems individuales, las marca a medida que las verifica y actualiza la lista cuando una desviación replanifica acciones. La capacidad implementa el plan —marca cada acción de la checklist y puede delegar las independientes a subagentes—, registra las desviaciones y escala al usuario las que cambian objetivo, alcance o guía de la épica; si el usuario no confirma una desviación mayor, informar al ejecutor general y terminar.
8. **Devolver el control al ejecutor general** informando del diff producido y de las desviaciones registradas. La revisión dual posterior —subagente y usuario— corre a cargo del ciclo de tareas; para tareas de este tipo, la revisión técnica la realiza `revisar-implementacion` en el paso de revisión del ejecutor.

## Finalización

El skill ha terminado cuando:

- La tarea tiene plan y suite aprobados y la ejecución terminó con su diff y su registro de desviaciones, o
- Se informó al ejecutor general de que la tarea no puede continuar, con el motivo.

## Referencias

- `docs/research/2026-09-flujo-desarrollo.md` — Recomendación de encapsular el flujo de desarrollo en un skill especialista.
- `docs/decisions/D020-flujo-desarrollo-skill-especialista.md` — El especialista como mini-orquestador acotado y el enrutado por tipo en el ejecutor general.
