# Separar el flujo de tareas en «planear» y «ejecutar»

## Estado

[ ] Pendiente | [~] En progreso | [r] En revisión | [x] Completada | [!] Bloqueada

## Tipo

desarrollo

## Objetivo

Dividir el trabajo de desarrollo de una tarea en dos flujos invocables de forma independiente: uno de planeación —toma la tarea y recorre el pipeline hasta dejar plan técnico y suite aprobados— y uno de ejecución —toma una tarea ya planeada y completa el desarrollo—. Hoy `desarrollo` ejecuta ambos pasos en la misma sesión, lo que impide planear varias tareas en paralelo y ejecutarlas después, ni construir planes incrementales sobre planes previos aún no ejecutados.

## Dependencias

- Ninguna

## Entrada

- `.agents/skills/desarrollo/SKILL.md` como pipeline actual a dividir.
- `recopilar-contexto`, `evaluar-conectividad`, `planear-implementacion` y `ejecutar-implementacion` como capacidades a repartir entre los dos flujos.
- `.agents/skills/ejecutar-tareas/SKILL.md` y su «Enrutado por tipo», que hoy enruta `desarrollo` y `mantenimiento (refactoring)` al pipeline completo.
- `docs/decisions/D020-flujo-desarrollo-skill-especialista.md` como decisión a revisar o extender.

## Resultado esperado

- Un flujo de planeación de tarea (skill nuevo, p. ej. `planear-tarea`, o extensión de `desarrollo` con modo planeación) que ejecute recopilación de contexto, evaluación de conectividad y planeación de implementación con su puerta humana, y se detenga dejando `## Contexto`, `## Conectividad`, `## Plan técnico` y `## Suite de pruebas esperada` aprobados en el archivo de la tarea.
- Un flujo de ejecución (p. ej. `desarrollar-tarea` o modo ejecución) que tome una tarea con plan aprobado y complete `ejecutar-implementacion` con su registro de desviaciones.
- Soporte para planeación incremental: cuando una tarea depende de otra aún no ejecutada, el flujo de planeación lee el plan aprobado de la dependencia como base —asumiendo que el trabajo estará completo— en lugar de bloquearse esperando la ejecución.
- `ejecutar-tareas` actualizado: el enrutado por tipo y el ciclo reflejan los dos flujos, de modo que una tarea sin plan pasa por planeación y una tarea con plan aprobado va directa a ejecución, sin replanificar.
- La decisión de diseño correspondiente registrada con `decisiones-diseno` (extensión o sustitución de D020) y los `README`/índices de skills actualizados.

## Criterios de calidad

- Los dos flujos son invocables por separado y `ejecutar-tareas` distingue el estado de planeación de una tarea para elegir el punto de entrada correcto.
- Una tarea planeada en una sesión puede ejecutarse en otra sin repetir recopilación de contexto, conectividad ni planeación: el archivo de la tarea es la fuente de verdad del avance.
- El flujo de planeación declara explícitamente cómo trata las dependencias: planeación en paralelo si no hay dependencia, planeación incremental sobre el plan de la dependencia si la hay.
- `desarrollo` sigue existiendo como orquestador íntegro (planear + ejecutar en una sesión) o queda sustituido de forma coherente con los flujos nuevos, sin caminos huérfanos.
- Se preserva la revisión dual y el commit por tarea del ciclo general.

## Procedimiento sugerido

1. Leer `desarrollo`, `planear-implementacion`, `ejecutar-implementacion`, `recopilar-contexto` y `evaluar-conectividad` para fijar el corte exacto del pipeline.
2. Decidir la forma: dos skills nuevos frente a `desarrollo` con dos modos; documentar la elección.
3. Definir el contrato de estado en el archivo de la tarea: qué secciones marcan «planeada» y cómo el flujo de ejecución las valida antes de empezar.
4. Escribir o adaptar los skills, actualizar «Enrutado por tipo» de `ejecutar-tareas` y la descripción de `desarrollo` si permanece.
5. Registrar la decisión de diseño y actualizar `README.md` si lista los flujos.

## Notas

- Motivación: trabajar en paralelo sobre varias tareas —múltiples sesiones de planeación sin dependencia, o planes incrementales encadenados cuando la hay, donde cada plan asume el plan anterior como base sólida aunque aún no se haya ejecutado.

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario: [fecha] — [Aprueba | Solicita cambios]
