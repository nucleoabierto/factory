# Delegación de pasos mecánicos a scripts

## Estado

[x] Planificada | [ ] Completada

## Objetivo

Los pasos mecánicos repetidos de los skills —mutaciones de `TODO.txt`, campos de los archivos de tarea, índices de decisiones y lecciones, `EXPERIENCIAS.md`, `CHANGELOG.md`— los ejecutan scripts bash deterministas encapsulados en skills de utilidad invocables, con los consumidores delegando la operación en lugar de re-describir formatos, y con las derivas de formato resueltas por una forma canónica.

## Alcance

- **Dentro:** la decisión de diseño del mecanismo y el contrato de los scripts; la canonicalización de `## Estado` y de la posición de `## Desviaciones del plan`; cuatro skills de utilidad —consulta de artefactos, actualización de artefactos, operación de experiencias y operación del changelog— con sus scripts en `assets/` propios; el cableado de los skills consumidores.
- **Fuera:** linters de escritura, CSS y mensajes de commit (descartado: fuera del proyecto); reescritura de archivos históricos a la forma canónica; cualquier paso con juicio —veredictos de sensores, redacción de contenido, elección de palabras clave, puertas humanas—.

## Piezas

- [x] docs/tasks/113-delegacion-mecanica-scripts.md — Delegación mecánica a scripts: decisión y contrato
- [x] docs/tasks/114-skill-consultar-artefactos.md — Crear el skill de consulta de artefactos
- [x] docs/tasks/115-skill-actualizar-artefactos.md — Crear el skill de actualización de artefactos
- [ ] docs/tasks/116-skill-operar-experiencias.md — Crear el skill de operación de experiencias
- [ ] docs/tasks/117-skill-operar-changelog.md — Crear el skill de operación del changelog
- [ ] docs/tasks/131-catalogo-autodescriptivo-frontera-mecanica.md — Catálogo autodescriptivo y frontera mecánica en los skills de utilidad
- [ ] docs/tasks/132-accion-semantica-convenciones-configuracion.md — Acción semántica en los invocadores y convenciones como configuración



## Plan técnico

- **Orden:** 113 primero —fija la decisión, el contrato de los scripts y las formas canónicas—; 114-117 en cualquier orden tras ella.
- **Dependencias:** las cuatro piezas de skills necesitan la decisión y el contrato de 113.
- **Decisiones transversales:** la mecánica compartida por varios skills vive en un skill de utilidad con sus scripts en su propio `assets/` —nada se comparte entre skills, los consumidores invocan la capacidad (D003)—; la mecánica de un solo consumidor vive como asset interno de su skill; la lectura simple que el arnés ya resuelve (`read`, `grep`, `git`) no se delega. Contrato de los scripts: stdout solo datos parseables, stderr solo diagnósticos, exit `0` para éxito (incluido el vacío legítimo), exit `2` para entrada ausente, nunca datos sintetizados; una mutación ante formato no parseado falla sin escribir. Los parsers toleran las convenciones históricas y escriben la canónica.

## Criterio de cierre

Los pasos mecánicos listados en los informes de la revisión se ejecutan por scripts con el contrato de fallback; los skills consumidores declaran la delegación y ya no re-describen los formatos de los artefactos; `## Estado` y `## Desviaciones del plan` tienen forma canónica documentada.

## Revisión

- Usuario: 2026-10-01 — Aprueba
