# Modelo de estado del dominio de modern-todo-app

> **Fecha:** 2026-10

## Propósito

Decidir cómo se representa el estado del dominio en React —estado nativo con reducers, store externa u otra opción— sopesando el coste que cada opción impone a la persistencia local del núcleo TodoMVC y a las fronteras futuras: el backend de la idea 003 y la sincronización de la idea 005.

## Contexto

La decisión D001 fijó React + TypeScript estricto + Vitest como pila del subproyecto. La especificación TodoMVC delimita el dominio [1]: una colección de tareas con mutaciones frecuentes —capturar, completar, reactivar, editar, borrar, marcar todas y limpiar completadas— persistida en `localStorage` bajo la clave `todos-react`, con los campos `id`, `title` y `completed`; el modo de edición es transitorio y no se persiste; el filtro de vista vive en la ruta hash (`#/`, `#/active`, `#/completed`) y se conserva entre recargas. La épica del núcleo declara además que las invariantes viven en el dominio, no en la vista.

Los criterios de la elección, declarados en la tarea: idiomaticidad, superficie de prueba con Vitest, coste de evolucionar hacia backend y sincronización, y dependencias nuevas.

La tensión que condiciona la elección: el hito de backend convertirá al cliente en una vista del estado remoto —la colección dejará de ser client state para pasar a ser server state— y la idea de sincronización añade cola de operaciones y reconciliación. Una elección que ate el dominio a la vista pagaría esa conversión dos veces.

## Análisis

### Qué exige el dominio del modelo

- Estado serializable: la persistencia en `localStorage` y la conservación del filtro en la ruta lo presuponen [1].
- Mutaciones explícitas y nombradas: la spec fija el vocabulario de operaciones del dominio [1].
- Separación entre lo persistido —colección y filtro— y lo transitorio —edición en curso— [1].
- Invariantes verificables por comando, sin navegador ni render: el contrato de verificación del subproyecto.

### Opción 1 — Estado nativo: `useReducer` + Context

La documentación oficial de React presenta la combinación reducer y context como la forma de escalar el estado de una pantalla compleja, con un ejemplo que es literalmente una lista de tareas: acciones `added`, `changed` y `deleted` sobre una colección `tasks` [2]. El reducer es una función pura: el dominio se escribe como un módulo TypeScript independiente de React y la suite lo prueba directamente con Vitest. La persistencia se cablea a mano —hidratación perezosa en la inicialización y un efecto que serializa el estado tras cada cambio— y no hay middleware ni devtools de serie. Context no ofrece suscripciones granulares, irrelevante a esta escala: el análisis del ecosistema recomienda mantener los providers cerca de sus consumidores y dividir contextos antes que adoptar una store global [3]. Dependencias nuevas: ninguna.

### Opción 2 — Zustand (store externa ligera)

Store hook-first sin provider, ~0,5 KB gzip en su núcleo y ~37 M de descargas semanales en mayo de 2026, más del doble que Redux Toolkit [4]. El store es un objeto fuera de React y se prueba con lecturas y escrituras directas. Su middleware `persist` resuelve `localStorage` con `name`, `partialize` y —relevante para la evolución— `version` y `migrate` para el esquema persistido [5]; su documentación advierte que `createJSONStorage` no valida el dato deserializado, así que la validación habría que escribirla igualmente a mano [6]. Las acciones son métodos libres del store: puede adoptarse la convención de un `dispatch` con acciones serializables, pero la librería ni la premia ni la impone. Dependencias nuevas: una.

### Opción 3 — Redux Toolkit (store externa completa)

El estándar estructurado: ~13,6 KB gzip en su núcleo, ~16 M de descargas semanales, dos dependencias [4]. Impone slices con reducers bajo Immer, un store central con provider, hooks tipados y devtools con recorrido del historial de acciones; `createEntityAdapter` normaliza colecciones. Su documentación recomienda probar los componentes conectados mediante pruebas de integración sobre un store real, reservando las unitarias para reducers complejos [7]. RTK Query cubriría la capa de datos remota del hito de backend, pero adoptarlo ahora decidiría el cliente remoto antes de que ese hito lo ejercite. Para una colección con las seis operaciones de la spec, la estructura supera con creces al dominio.

### Opción 4 — Modelo de server state (TanStack Query)

La distinción que maneja su propia comunidad lo descarta para el estado actual: el server state es el dato cuya copia autoritativa vive en un sistema remoto al que solo se accede de forma asíncrona [8]; hoy la verdad es `localStorage`, síncrono y propio. La guía oficial declara que Query no sustituye al client state y que ambos conviven [9]. Es la candidata natural a gestionar la caché remota cuando exista el servicio: una decisión del hito de backend, no de esta tarea.

### Opciones descartadas sin evaluación completa

- **Jotai:** modelo atómico pensado para estado finamente dividido y re-render granular [3][10]; una colección única con invariantes conjuntas no aprovecha esa granularidad.
- **XState:** máquinas de estados para flujos donde importa prohibir pasos inválidos; la propia comparativa advierte que no sustituye a una store de propósito general [3].
- **Recoil:** discontinuado [3].
- **MobX:** modelo observable alejado del flujo unidireccional que la pila y la spec presuponen [3].

## Evaluación comparativa

### Idiomaticidad

- El reducer nativo es el patrón que la documentación de React enseña para este dominio exacto [2]; Zustand es la opción idiomática del ecosistema para client state compartido [3][4]; Redux Toolkit lo es para equipos grandes con flujos complejos [4][10].

### Superficie de prueba con Vitest

- Empate estructural: las tres opciones exponen el dominio como funciones puras testeables. El reducer nativo y el store de Zustand se prueban sin render ni mocks; Redux recomienda pruebas de integración con store real usando la misma Testing Library ya instalada [7].

### Coste de evolución hacia backend y sincronización

- El factor que discrimina es la forma de las mutaciones. El reducer declara las operaciones como objetos serializables: el vocabulario que una cola de operaciones (idea 005) y el mapeo a la API (idea 003) consumen directamente. Zustand permite la misma disciplina pero no la premia; Redux la impone a cambio de su peso.
- Las tres opciones admiten persistencia tras una frontera intercambiable si el dominio se mantiene como módulo puro, una condición que solo el reducer nativo hace estructural por defecto.
- La caché remota que el hito de backend introduzca es ortogonal al modelo del dominio: alimenta el store, no lo sustituye [8][9].

### Dependencias nuevas

- Nativo: cero. Zustand: una. Redux Toolkit: dos y ~13,6 KB gzip [4].

## Recomendación

**Estado nativo: el dominio como módulo TypeScript puro —un tipo de estado serializable y funciones de transición— consumido por `useReducer` y distribuido por Context, con la persistencia detrás de un puerto intercambiable.**

El dominio puro concentra las invariantes fuera de la vista —la decisión transversal de la épica—, se prueba entero con Vitest sin render y es portable al servidor, donde la doble verdad del hito de backend podrá reutilizar las mismas transiciones. Las acciones serializables son el contrato de operaciones que la cola de la sincronización encolará y la API transportará: la elección no se paga dos veces porque el vocabulario de mutaciones es ya el artefacto que las fronteras futuras consumen. Zustand queda como alternativa legítima si la ergonomía del provider llegara a pesar, pero añade una dependencia sin cubrir nada que el dominio exija; Redux Toolkit es desproporcionado para una colección y adelantaría la decisión del cliente remoto; los modelos de server state quedan diferidos al hito de backend, donde pertenecen.

Consecuencias negativas aceptadas: la persistencia se cablea a mano —hidratación perezosa, escritura tras cada cambio y validación del dato recuperado, la misma carga que `persist` deja del lado del usuario [6]— y no hay devtools de estado de serie.

## Limitaciones

- Las cifras de adopción son proxies auto-reportados de representatividad, no medidas exactas.
- La comparación es documental: ninguna opción se prototipó contra el dominio real.
- Si el hito de backend adopta una librería de server state, convivirá con el modelo decidido sin sustituirlo; esa coexistencia queda por verificar en la pieza del cliente remoto.

## Referencias

- [1] TodoMVC, «Application Specification» — github.com/tastejs/todomvc/blob/master/app-spec.md
- [2] React, «Scaling Up with Reducer and Context» — react.dev/learn/scaling-up-with-reducer-and-context
- [3] Makers' Den, «State Management Trends in React 2025» — makersden.io/blog/react-state-management-in-2025
- [4] The Road to Enterprise, «Zustand vs Redux Toolkit» — theroadtoenterprise.com/blog/zustand-vs-redux-toolkit
- [5] Zustand Docs, «Persisting store data» — zustand.docs.pmnd.rs/reference/integrations/persisting-store-data
- [6] Zustand Docs, «persist middleware» — zustand.docs.pmnd.rs/reference/middlewares/persist
- [7] Redux, «Writing Tests» — redux.js.org/usage/writing-tests
- [8] TanStack Query, discusión «What precisely is "server state"?» — github.com/TanStack/query/discussions/10602
- [9] TanStack Query Docs, «Does TanStack Query replace Redux, MobX or other global state managers?» — tanstack.com/query/latest/docs/framework/react/guides/does-this-replace-client-state
- [10] TechSaaS, «State Management in 2025: Zustand vs Jotai vs Redux Toolkit» — techsaas.cloud/blog/state-management-zustand-jotai-redux-toolkit
