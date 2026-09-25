# Definir la semántica del tipo de tarea `mantenimiento`

## Estado

[ ] Pendiente | [ ] En progreso | [ ] En revisión | [x] Completada | [ ] Bloqueada

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

## Plan técnico

**Subsistema:** el tipo se declara en dos puntos y se enruta en uno: las plantillas `crear-tareas/assets/task.txt` y `refinar-propuesta/assets/borrador.md` listan `mantenimiento` en la lista abierta de tipos del campo `## Tipo`, y `ejecutar-tareas` enruta por el tipo declarado hacia un especialista registrado —hoy solo `desarrollo`→`desarrollo`—; el tipo `mantenimiento` existe en la lista pero sin contenido: ni criterio de pertenencia, ni criterios de calidad, ni sub-flujo.

**Decisión perfil vs. tipo:** un solo tipo `mantenimiento` con dos perfiles, como prefija la opción por defecto de la tarea. El criterio de pertenencia común es preservar el sistema en lugar de extenderlo —ninguna tarea de mantenimiento añade capacidad observable—; lo que difiere es el criterio de aceptación y el sub-flujo, que es exactamente lo que un perfil declara sin multiplicar el registro de tipos. Un tipo `refactoring` separado añadiría una entrada más al enrutado sin ganar nada que el calificador no dé.

**Perfiles:**

- `mantenimiento (refactoring)` — código con comportamiento a preservar: modernizaciones y reparaciones de deuda. Criterio de aceptación verificable: misma API pública, misma suite en verde, mismo comportamiento observable. Se enruta al especialista `desarrollo`, cuyo pipeline ya produce plan y suite —la red que verifica la invariancia—. Las tareas 008–010 del PoC son evidencia de este perfil pese a haberse clasificado como `desarrollo`; se citan sin reclasificarlas.
- `mantenimiento` sin calificador — trabajo de proceso sin comportamiento observable (documentar dominio, revisar arquitectura, limpieza; 006 y 007 de todo-app). Criterio de aceptación: el del procedimiento de la capacidad invocada. Se ejecuta con el comportamiento general.

**Acciones:**

1. Declarar la semántica en las plantillas `task.txt` y `borrador.md`: el campo `## Tipo` explica el criterio de pertenencia y los dos perfiles, manteniendo la lista abierta.
2. Registrar en el «Enrutado por tipo» de `ejecutar-tareas` la entrada `mantenimiento (refactoring)` → `desarrollo`, con la nota de que `mantenimiento` sin perfil sigue el comportamiento general.
3. Ajustar el «Cuándo no usar» de `planear-implementacion`, que hoy excluye «mantenimiento de procesos», para no contradecir el perfil refactoring que sí pasa por planeación.

## Suite de pruebas esperada

- Una tarea `mantenimiento (refactoring)` es enrutada por el ejecutor al sub-flujo de desarrollo sin interpretación del ejecutor — caso de uso: enrutar por tipo declarado.
- Una tarea `mantenimiento` sin perfil se ejecuta con el comportamiento general — caso de uso: mantenimiento de proceso.
- El criterio de aceptación del perfil refactoring queda verificable en la definición: misma API pública, misma suite, mismo comportamiento observable — caso de uso: aceptar una modernización como la 015 de todo-app.
- Las plantillas de tarea y borrador guían la clasificación entre los dos perfiles — caso de uso: crear una tarea de mantenimiento.

## Desviaciones del plan

- El «Cuándo usar» de `desarrollo` seguía diciendo que el especialista se invoca solo con tipo `desarrollo`; se actualizó para incluir `mantenimiento (refactoring)`, coherente con el enrutado registrado.
- La tarea 015 de todo-app declaraba `mantenimiento` a secas pese a ser el espécimen del perfil refactoring; se actualizó su campo `Tipo` a `mantenimiento (refactoring)` para que el enrutado la lleve al sub-flujo correcto cuando se ejecute.
- Los pasos 9 y 15 de `ejecutar-tareas` y las menciones de tipo en `desarrollo`, `planear-implementacion`, `ejecutar-implementacion` y `revisar-implementacion` discriminaban por el literal `desarrollo`; la revisión técnica detectó que una tarea `mantenimiento (refactoring)` se habría perdido `revisar-implementacion` y `documentar-dominio`. Se cambió la discriminación al conjunto de tipos enrutados al sub-flujo de desarrollo.

## Revisión

- Subagente: 2026-09-24 — Aprueba (primera pasada solicitó cambios: discriminación por el literal `desarrollo` en los pasos 9 y 15 y en las capacidades del sub-flujo; resueltos y registrados como desviaciones)
- Usuario: 2026-09-24 — Aprueba
