# Declarar el tipo de tarea para el enrutado

## Estado

[ ] Pendiente | [ ] En progreso | [ ] En revisión | [x] Completada | [ ] Bloqueada

## Objetivo

Definir el mecanismo por el que `ejecutar-tareas` identifica el tipo de una tarea (desarrollo, investigación, mantenimiento, etc.) para enrutar su ejecución hacia el skill especialista correspondiente, sin que el ejecutor general conozca las fases de cada dominio.

## Dependencias

- Ninguna

## Entrada

- La investigación `docs/research/2026-09-flujo-desarrollo.md`, que identifica el enrutado como la única bifurcación que queda en el ejecutor general y señala que el mecanismo de declaración de tipo no existe hoy.
- La plantilla de tarea (`.agents/skills/crear-tareas/assets/task.txt`) y el formato de épica, como posibles lugares de la declaración.
- El skill `ejecutar-tareas`, donde se añade el punto de enrutado.

## Resultado esperado

- Un mecanismo de declaración de tipo por tarea: campo en el archivo de tarea, determinación por la épica, o la forma que se decida al ejecutar.
- El skill `ejecutar-tareas` actualizado con el enrutado: al ejecutar una tarea, consulta su tipo e invoca el especialista si existe; si no, ejecuta como hoy.
- La plantilla de tarea actualizada si el mecanismo la requiere.

## Criterios de calidad

- `ejecutar-tareas` no gana conocimiento de las fases de desarrollo: solo lee el tipo declarado y enruta.
- Una tarea sin tipo declarado, o de un tipo sin especialista, se ejecuta con el comportamiento actual (compatibilidad hacia atrás).
- El mecanismo es extensible: añadir un tipo nuevo no exige modificar el procedimiento del orquestador más allá de registrar el especialista.

## Procedimiento sugerido

1. Evaluar dónde declarar el tipo (campo en la tarea, en la épica, convención de nombre) y elegir la opción más simple consistente con los formatos del proyecto.
2. Actualizar la plantilla de tarea o el formato que corresponda.
3. Actualizar `ejecutar-tareas` con el punto de enrutado en su paso de ejecución.
4. Actualizar `crear-tareas` si la plantilla cambia.

## Notas

- Mantener el ejecutor general fue decisión del usuario (ver tarea 062); el enrutado debe ser una sola bifurcación por tipo, no un pipeline embebido.

## Revisión

- Subagente: 2026-09-21 — Aprueba
- Usuario: 2026-09-21 — Aprueba
