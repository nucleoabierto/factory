# Revisión de arquitectura — dominio Lista de tareas

- Fecha: 2026-09-22
- Dominio evaluado: lista de tareas de todo-app (`app.js`, 288 líneas)
- Intención declarada: `docs/domains/001-lista-de-tareas.md`
- Decisiones respetadas: D018 «todo-app en vanilla JS» (docs/decisions/ del repositorio raíz)
- Skill: `revisar-arquitectura` (primera ejecución real)

## Veredictos por criterio

| Criterio | Veredicto | Confianza |
|---|---|---|
| Lenguaje ubicuo | Correcto | Alta |
| Separación de capas | Deficiente | Alta |
| Fronteras del contexto | Mejorable | Alta |
| Invariantes y modelo | Correcto | Alta |
| Acoplamiento y estructura | Correcto | Alta |

### Lenguaje ubicuo — correcto

Los nombres del código coinciden con el glosario: `tasks`/`addTask`, `done`/`toggleTask`, `FILTERS`/`visibleTasks`, `clearCompleted`. Término genérico: `App` no nombra el dominio; `editingId` es estado de UI presente en el objeto, no del glosario.

### Separación de capas — deficiente

`App` concentra dominio (`addTask`…`clearCompleted`), infraestructura (`load`/`save` → `localStorage`) y presentación (`render`, `init` → DOM) en un mismo objeto (`app.js:8-281`). Cada operación de dominio acopla `App.save()` y `App.render()` (líneas 69-70, 80-81, 96-97, 110-111, 157-158). Antipatrón *smart UI* / concentración de características. La divergencia ya estaba declarada en el estado de salud del documento de dominio.

### Fronteras del contexto — mejorable

El documento declara fuera el renderizado y la persistencia (frontera correcta), pero el código no la hace cumplir: todo comparte el mismo objeto público. Frontera declarada, no forzada.

### Invariantes y modelo — correcto

Cada invariante tiene defensor único: texto no vacío en `addTask`/`editTask` (líneas 63-66, 90-94), ids únicos y crecientes en `nextId` (líneas 67, 41-43), editar-a-vacío-borra en `editTask` (líneas 92-94). Excepción: `load` (líneas 35-47) acepta cualquier array persistido sin validar la forma de cada ítem.

### Acoplamiento y estructura — correcto

Un solo componente: sin grafo de dependencias ni ciclos que evaluar. El acoplamiento relevante es interno (dominio → `save`/`render`), capturado en separación de capas.

## Hallazgos priorizados

### H1 — Concentración de características en `App`

- **Criterio:** separación de capas / concentración de características.
- **Evidencia:** `app.js:8-281` — dominio, persistencia y presentación en un mismo objeto.
- **Objetivo:** el modelo de tareas (estado, invariantes, operaciones) existe sin depender de `localStorage` ni `document`.
- **Restricciones:** D018 — vanilla JS sin build ni framework.
- **Validación:** operaciones de dominio ejecutables sin DOM ni storage; tests existentes pasando.
- **Confianza:** alta.
- **Derivado en:** `docs/tasks/008-separar-modelo-de-presentacion.md`

### H2 — `load` no defiende las invariantes ante datos externos

- **Criterio:** invariantes y modelo.
- **Evidencia:** `app.js:35-47` — `Array.isArray(data)` basta para asignar `App.tasks`; un ítem sin `text` o sin `id` entra al modelo.
- **Objetivo:** al cargar, los ítems que no cumplen `{id, text, done}` se descartan o normalizan.
- **Restricciones:** mantener la tolerancia a JSON corrupto o ausente.
- **Validación:** test con ítems corruptos en storage mantiene la lista íntegra.
- **Confianza:** alta.
- **Derivado en:** `docs/tasks/009-validar-tareas-al-cargar.md`

### H3 — Estado mutable expuesto

- **Criterio:** invariantes y modelo / interfaz ambigua.
- **Evidencia:** `App.tasks` y `App.nextId` públicos (`app.js:9-10`); cualquier código puede violar los defensores. `tests.html` los muta directamente.
- **Objetivo:** el estado solo muta a través de las operaciones del dominio.
- **Restricciones:** no romper el arnés de tests; definir consulta pública equivalente.
- **Validación:** — (riesgo, no defecto actual).
- **Confianza:** media.
- **Derivado en:** `docs/tasks/010-proteger-estado-del-modelo.md`

## Recomendación

H1 es el hallazgo estructural; conviene resolverlo como un único refactor que respete D018 y puede absorber H3. H2 es una corrección pequeña e independiente.
