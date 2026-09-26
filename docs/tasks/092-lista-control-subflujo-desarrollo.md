# Lista de control de ejecución en el sub-flujo de desarrollo

## Estado

[ ] Pendiente | [ ] En progreso | [ ] En revisión | [ ] Completada | [ ] Bloqueada

## Tipo

mantenimiento

## Objetivo

Que el sub-flujo de desarrollo mantenga una lista de control sistemática durante su ejecución —con la herramienta de lista de tareas del arnés cuando exista— combinando los pasos internos del pipeline (contexto, conectividad, planeación, puerta humana, ejecución, verificación) con las acciones del `## Plan técnico`, para llevar un control visible del trabajo y evitar pasos omitidos o falsos pasos.

## Dependencias

- 091

## Entrada

- `desarrollo` y `ejecutar-implementacion` en su estado tras las tareas 090 y 091.
- El `## Plan técnico` de la tarea, cuya checklist de acciones alimenta la lista.
- La herramienta de lista de tareas del arnés (todo list) cuando esté disponible; de lo contrario, el equivalente manual.

## Resultado esperado

- `desarrollo` crea la lista de control al iniciar el sub-flujo con los pasos internos, y la extiende con las acciones del plan una vez aprobado.
- La lista se actualiza al completar cada paso o acción: exactamente un ítem en progreso, completados marcados de inmediato.
- Las desviaciones que replanifican acciones actualizan la lista en consecuencia.
- Si el arnés no ofrece herramienta de todos, el skill describe el equivalente manual sin bloquear el flujo.

## Criterios de calidad

- La lista refleja el pipeline completo del sub-flujo, incluidos el paso 0 y el gate de conectividad.
- Las acciones del `## Plan técnico` aparecen como ítems individuales, no como un solo ítem «ejecutar plan».
- La lista no duplica el estado persistente: el archivo de la tarea sigue siendo la fuente de verdad (checklist `[x]`, desviaciones); la lista de control es el instrumento de navegación en vivo.
- Una ejecución interrumpida se retoma reconstruyendo la lista desde el estado del archivo de la tarea.

## Procedimiento sugerido

1. Definir el conjunto de pasos internos fijos que siempre entran en la lista.
2. Redactar en `desarrollo` la creación y mantenimiento de la lista, y en `ejecutar-implementacion` la incorporación de las acciones del plan.
3. Cubrir el caso de reanudación: reconstruir la lista desde la checklist del archivo de la tarea.
4. Aplicar revisión de redacción y pulido mecánico en modo preventivo.

## Notas

- La lista de control es efímera y de sesión; no sustituye el marcado `[x]` del plan en el archivo de la tarea.

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario: [fecha] — [Aprueba | Solicita cambios]
