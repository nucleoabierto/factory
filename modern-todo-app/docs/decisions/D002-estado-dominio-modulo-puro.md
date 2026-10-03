# D002: Estado del dominio como módulo puro con useReducer y Context

## Estado

Aceptada

## Contexto

El núcleo TodoMVC necesita un modelo para el estado del dominio: una colección de tareas persistida en `localStorage`, con edición transitoria no persistida y filtro de vista conservado en la ruta. La pila está fijada por D001. La elección condiciona el coste del hito de backend —el cliente como vista del estado remoto— y de la idea de sincronización —cola de operaciones y reconciliación—, como declara la tarea 006.

## Decisión

Usamos el estado nativo de React: el dominio se modela como un módulo TypeScript puro —un tipo de estado serializable y funciones de transición— consumido por `useReducer` y distribuido por Context; la persistencia vive detrás de un puerto intercambiable. No adoptamos store externa ni librería de server state.

## Justificación

Las transiciones puras concentran las invariantes fuera de la vista, se prueban con Vitest sin render y son portables al servidor, donde la doble verdad que declara el hito de backend podrá reutilizarlas; las acciones serializables constituyen el vocabulario de operaciones que la cola de sincronización y la API consumirán, de modo que la conversión a cliente remoto no paga la elección dos veces. Zustand era la alternativa más cercana —una dependencia y middleware `persist` con `version`/`migrate`— pero no cubre nada que el dominio exija y no premia la disciplina de acciones explícitas; Redux Toolkit es desproporcionado para una colección y RTK Query adelantaría la decisión del cliente remoto; las librerías de server state no aplican mientras la verdad siga siendo local y quedan diferidas al hito de backend. Consecuencias negativas aceptadas: la persistencia se cablea a mano —hidratación perezosa, escritura tras cada cambio y validación del dato recuperado— y no hay devtools de estado de serie.

## Referencias

- docs/research/2026-10-modelo-estado-dominio.md — investigación de apoyo con la comparación por criterio
- docs/tasks/006-decidir-modelo-estado.md — tarea que produce la decisión
