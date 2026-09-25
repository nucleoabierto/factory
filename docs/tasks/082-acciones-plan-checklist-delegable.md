# Acciones del plan como checklist delegable a subagentes

## Estado

[ ] Pendiente | [ ] En progreso | [ ] En revisión | [ ] Completada | [ ] Bloqueada

## Tipo

mantenimiento

## Objetivo

Convertir las acciones del `## Plan técnico` —hoy una lista numerada— en una checklist que registre el progreso de la ejecución y permita delegar acciones individuales a subagentes sin que arranquen en frío. El cambio busca dos beneficios: trazabilidad persistente del avance (una ejecución interrumpida muestra qué acciones quedaron hechas sin re-leer el diff) y una unidad de trabajo acotada que un subagente de contexto aislado pueda tomar.

## Dependencias

- Ninguna.

## Entrada

- `.agents/skills/planear-implementacion/SKILL.md` — produce el `## Plan técnico`; su formato de lista pasa a checklist.
- `.agents/skills/ejecutar-implementacion/SKILL.md` — consume el plan; gana la semántica de marcado, delegación y handoff al subagente.
- `.agents/skills/desarrollo/SKILL.md` — orquesta el sub-flujo; refleja la delegación en su coordinación.
- `todo-app/docs/tasks/011-listas-en-el-modelo.md` y `015-migrar-es5-a-es2024.md` — ejemplos del formato actual de plan.
- Lecciones aplicables: `consistencia-de-formatos` (los marcadores reutilizan el vocabulario de TODO.txt: `[ ]`, `[x]`; los campos por ítem van como listas anidadas) y `flexibilidad-en-procesos` (los criterios de delegación se declaran abiertos, no como taxonomía cerrada).

## Resultado esperado

- `planear-implementacion` declara el formato nuevo: cada acción del plan es un ítem de checklist con su justificación —el storytelling técnico vigente— y un campo de contexto específico opcional como sub-bullets anidados. El resumen del subsistema se mantiene como contexto general común a todas las acciones.
- `ejecutar-implementacion` declara la semántica: al terminar cada acción la marca `[x]`; puede delegar una acción a un subagente cuando es independiente y autocontenida, y las acciones acopladas o secuenciales con contexto compartido las ejecuta él mismo —la lista de criterios es abierta y extensible. El handoff pasa la acción y su contexto específico inline, más las referencias al archivo de la tarea y a la épica para el contexto general.
- El ejecutor aplica el diff del subagente, lo verifica contra el plan y marca la acción; el subagente no marca su propio trabajo. Las desviaciones detectadas por un subagente escalan al ejecutor y siguen el manejo de desviaciones vigente.
- `desarrollo` refleja que la ejecución puede delegar acciones puntuales, sin perder su papel de mini-orquestador acotado.
- El contexto específico por ítem se escribe solo cuando la planeación descubrió algo que no está en el código ni en la tarea y cuya omisión haría probable un error —la misma regla de «detalle solo donde previene errores costosos» que el skill ya declara.

## Criterios de calidad

- Los tres skills quedan consistentes entre sí: el formato que produce la planeación es el que la ejecución consume y el que el especialista orquesta; no quedan referencias a «lista de acciones» que contradigan la checklist.
- Las acciones de los planes existentes en todo-app (tasks 011 y 015) podrían reescribirse al formato nuevo sin perder información: justificación y contexto caben en la estructura definida.
- La delegación queda acotada a la ejecución: estados de la tarea, revisión dual y commit siguen siendo del orquestador general; las puertas humanas (aprobación del plan, confirmación de desviaciones mayores) no se delegan.
- La checklist es resumible: un ejecutor que retoma una tarea interrumpida puede continuar desde el primer ítem sin marcar sin replanificar, igual que hoy lo hace con el plan aprobado.

## Procedimiento sugerido

1. Definir el formato exacto de la checklist y su ejemplo canónico sobre una acción real del plan de la tarea 011.
2. Actualizar `planear-implementacion`: sección Salida, principio de storytelling y procedimiento de redacción del plan.
3. Actualizar `ejecutar-implementacion`: marcado de acciones, criterios de delegación abiertos, contenido del handoff y regla de que el ejecutor verifica y marca.
4. Actualizar `desarrollo`: mención de la delegación puntual en su coordinación, sin cambiar su contrato con `ejecutar-tareas`.
5. Verificar la consistencia cruzada de los tres skills y la resumibilidad del formato.

## Notas

- Origen: observación del usuario sobre las tareas completadas de todo-app —el plan son puntos y podrían ser una task list que un subagente tome—, refinada en conversación: el contexto general lo da el resumen del subsistema ya existente y el contexto específico es optativo por ítem.
- Decisión de diseño implícita que la tarea hace explícita: la delegación es por ítem y condicional, no el plan completo a un solo subagente ni por defecto.

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario: [fecha] — [Aprueba | Solicita cambios]
