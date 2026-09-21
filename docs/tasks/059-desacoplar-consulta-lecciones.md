# Desacoplar la consulta de lecciones en un skill propio

## Estado

[ ] Pendiente | [ ] En progreso | [ ] En revisión | [x] Completada | [ ] Bloqueada

## Objetivo

Hacer que la consulta de lecciones aprendidas sea una capacidad independiente e invocable en cualquier momento del trabajo, no solo dentro del ciclo de ejecución de tareas.

## Dependencias

- Ninguna

## Entrada

- El estado actual de la consulta de lecciones: una viñeta del paso 5 de `ejecutar-tareas` que busca disparadores en `docs/lessons/README.md`.
- `docs/lessons/` y su índice, cuyos disparadores son el contrato de descubrimiento.
- `registrar-experiencias` y `consolidar-lecciones`, que cubren la producción de lecciones y dan el patrón de skills de una sola responsabilidad.
- Dirección preferida del usuario: un skill independiente capaz de disparar la búsqueda de forma dinámica, sin acoplar el paso a cada skill existente o futuro.

## Resultado esperado

- Un skill nuevo (por ejemplo, `consultar-lecciones`) en `.agents/skills/` que encapsule la recuperación de lecciones: dada una descripción del trabajo a realizar (archivos que se tocarán, tipo de acción, palabras clave), busca los disparadores aplicables en el índice y trae las notas correspondientes al contexto.
- Invocable de forma dinámica en cualquier punto: al crear una tarea, durante una investigación, al editar documentos fuera del flujo de tareas, o cuando el usuario lo pida — sin que cada skill tenga que incorporar el paso.
- `ejecutar-tareas` actualizado para delegar en el skill en lugar de contener la lógica de búsqueda.

## Criterios de calidad

- La consulta de lecciones es invocable fuera de la ejecución de una tarea, sin depender de `ejecutar-tareas`.
- El skill es autocontenido y resiste el paso del tiempo: un skill futuro no necesita conocer ni repetir el mecanismo para que la consulta siga disponible.
- La lógica de búsqueda por disparadores existe una sola vez; `ejecutar-tareas` referencia el skill, no duplica el procedimiento.
- Los disparadores del índice siguen siendo el contrato de descubrimiento; el skill no introduce una segunda forma de catalogar lecciones.

## Procedimiento sugerido

1. Releer la viñeta del paso 5 de `ejecutar-tareas` y el formato del índice en `docs/lessons/README.md`.
2. Redactar el skill siguiendo la estructura de los existentes y el principio de división progresiva (detalle en `references/` si lo necesita).
3. Actualizar `ejecutar-tareas` para invocar el skill en el punto donde hoy consulta las lecciones.
4. Aplicar revisión de redacción y pulido mecánico preventivos.
5. Verificar los criterios de calidad contra el resultado.

## Notas

- La brecha se observó en la sesión de la tarea 057: al escribir el skill `planificar` no se consultaron las lecciones aplicables porque la consulta solo existe dentro de `ejecutar-tareas`.
- Si el skill necesita que otros skills declaren cuándo invocarlo, documentarlo como parte del diseño o como trabajo descubierto con `crear-tareas`.
- Decisión tomada: ningún skill declara la invocación; el descubrimiento depende de la `description` del skill `consultar-lecciones`. Si se observa que no se dispara cuando debería, dar de alta una tarea de seguimiento.

## Revisión

- Subagente: 2026-09-21 — Aprueba
- Usuario: 2026-09-21 — Aprueba
