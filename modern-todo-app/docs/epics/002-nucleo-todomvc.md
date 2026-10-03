# Núcleo TodoMVC

## Estado

[x] Planificada

## Objetivo

`modern-todo-app` gestiona una lista de tareas real conforme a la especificación TodoMVC —capturar, completar, reactivar, editar inline, borrar, filtrar y limpiar completadas— con la lista conservada en el navegador entre visitas, construida sobre la guía de estilo del producto y verificada por la suite con cobertura al 100%.

## Alcance

- **Dentro:** guía de estilo (`DESIGN.md` + tokens); decisión de modelo de estado registrada como D002; dominio de la tarea con sus invariantes y persistencia local; lista operable; edición inline; pie con contador pluralizado, filtros con routing hash y limpieza de completadas; conformidad funcional TodoMVC verificada de extremo a extremo.
- **Fuera:** persistencia fuera del navegador y backend (idea 003); organización avanzada (idea 004); offline e instalabilidad (idea 005); listas múltiples e identidad; las secciones no funcionales de la spec TodoMVC (plantilla, dependencias `todomvc-*`, estilo de código).

## Piezas

- [ ] docs/tasks/005-definir-guia-estilo.md — Definir la guía de estilo del proyecto
- [ ] docs/tasks/006-decidir-modelo-estado.md — Decidir el modelo de estado del dominio
- [ ] docs/tasks/007-dominio-tarea-persistencia.md — Dominio de la tarea y persistencia local
- [ ] docs/tasks/008-lista-operable.md — Lista operable: captura, completar, eliminar y marcar todas
- [ ] docs/tasks/009-edicion-inline.md — Edición inline de tareas
- [ ] docs/tasks/010-pie-filtros-conformidad.md — Pie de lista, filtros con routing y conformidad TodoMVC

## Plan técnico

- **Orden:** 005 y 006 en paralelo (son independientes); 007 sobre el modelo decidido en 006; 008 sobre el dominio de 007 y los tokens de 005; 009 sobre 008; 010 cierra el conjunto.
- **Dependencias:** 007 consume la decisión D002 de 006; 008 consume el dominio de 007 y los tokens de 005; 009 añade la edición sobre la lista operable de 008; 010 completa el ítem de 009.
- **Decisiones transversales:** la spec TodoMVC es el contrato funcional externo del conjunto —sus cláusulas se verifican una a una al cerrar—; las invariantes viven en el dominio, no en la vista; las pruebas consultan por roles y texto visible; todo valor visual proviene de los tokens de `DESIGN.md`, verificado con `aplicar-guia-estilo` en cada pieza que toca CSS; `npm run verify` con cobertura al 100% es el contrato que cada pieza deja en verde.

## Criterio de cierre

La aplicación servida por el dev server es una lista de tareas conforme a las cláusulas funcionales de la spec TodoMVC —lista y pie ocultos sin tareas, captura validada, ítems completables y editables inline, contador pluralizado, filtros con routing persistido, limpieza de completadas y persistencia en `todos-react`— con `npm run verify` en verde y cobertura al 100%.

## Revisión

- Usuario: 2026-10-02 — Aprueba
