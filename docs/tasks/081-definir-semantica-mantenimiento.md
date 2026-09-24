# Definir la semántica del tipo de tarea `mantenimiento`

## Estado

[ ] Pendiente | [ ] En progreso | [ ] En revisión | [ ] Completada | [ ] Bloqueada

## Tipo

desarrollo

## Objetivo

Definir la semántica del tipo `mantenimiento`, que ya existe en la lista abierta de tipos del enrutado pero sin contenido: qué trabajo le corresponde, qué criterios de calidad y de aceptación aplican y qué sub-flujo sigue. La definición debe resolver explícitamente si el refactoring —transformación de código con comportamiento observable invariante— es un perfil del tipo `mantenimiento` o un tipo propio, dado que su criterio de aceptación («el comportamiento observable no cambia», verificable por la suite) difiere del del mantenimiento de proceso (006, 007 de todo-app, que no tocaron código).

## Dependencias

- Ninguna

## Entrada

- `docs/research/2026-09-siguientes-elementos-proyecto.md` — análisis del tipo `mantenimiento` (punto 3): el tipo existe, la carencia es de semántica; 008–010 del PoC fueron reparaciones clasificadas como `desarrollo` pese a existir el tipo.
- `todo-app/docs/tasks/015-migrar-es5-a-es2024.md` — espécimen concreto: tarea `mantenimiento` cuyo criterio declarado es refactoring puro (invariancia del comportamiento observable, suite como red).
- `todo-app/docs/tasks/006`, `007` — mantenimiento de proceso, la otra cara del paraguas: sin comportamiento observable que preservar.
- `.agents/skills/crear-tareas/`, `refinar-propuesta/`, `ejecutar-tareas/` — donde el tipo se declara y se enruta hoy.
- `.agents/skills/desarrollo/` y el sub-flujo de desarrollo — referencia para decidir qué sub-flujo corresponde al refactoring.

## Resultado esperado

- El tipo `mantenimiento` con semántica declarada en los skills que lo enrutan: criterio de pertenencia, criterios de calidad y sub-flujo.
- Decisión explícita y justificada sobre refactoring: perfil del tipo con criterio de aceptación propio, o tipo separado — evaluando ambas opciones con la opción por defecto de un solo tipo con perfiles (cambio acotado, el enrutado ya conoce el tipo).
- Si la decisión introduce un tipo nuevo, la decisión se registra con `decisiones-diseno`.
- Las tareas 008–010 del PoC se mencionan como evidencia en la definición, sin reclasificarlas (el índice solo contiene trabajo activo).

## Criterios de calidad

- La semántica distingue los dos perfiles observados: trabajo sobre código con comportamiento a preservar (refactoring, reparaciones) y trabajo de proceso sin comportamiento observable (documentación, revisiones).
- El criterio de aceptación del perfil refactoring queda verificable: misma API pública, misma suite, mismo comportamiento observable — como ya declara la 015.
- La definición se integra donde el tipo se usa hoy (lista de tipos en crear-tareas/refinar-propuesta y enrutado en ejecutar-tareas), no en un documento aislado.

## Procedimiento sugerido

1. Revisar dónde se declara y enruta el tipo `mantenimiento` hoy.
2. Redactar la semántica con la decisión perfil-vs-tipo justificada.
3. Aplicarla en los skills correspondientes y registrar la decisión si aplica.

## Notas

- Origen: prioridad 2 de la investigación de siguientes elementos, junto con el descubrimiento de oportunidades — encontrar deuda y ejecutarla con criterios propios forman un ciclo.
- Se descartó una tarea de investigación previa: la carencia está diagnosticada con precisión y existe un espécimen (015) suficiente para generalizar.

## Revisión

-
