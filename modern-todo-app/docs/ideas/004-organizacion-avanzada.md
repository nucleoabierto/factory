# Organización avanzada: etiquetas, prioridades, búsqueda y deshacer

> **Tipo:** idea de funcionalidad — tamaño épica (complejidad media-alta)
> **Fecha:** 2026-09
> **Orden sugerido:** 4 de 5 — enriquece el dominio sobre la base ya persistida; cada capacidad es un invariante nuevo

## Problema

La lista crece y la gestión no escala con ella. Cuando hay decenas de tareas, las preguntas naturales dejan de tener respuesta: qué es urgente y qué puede esperar, dónde quedó aquello de la matrícula, por qué lo de un proyecto se mezcla con lo del resto. El filtro pendiente-completada responde al estado, pero no a la relevancia, la clasificación ni la búsqueda.

Y un error es irreversible: borrar de más, completar lo que no estaba hecho o editar mal un texto destruye información sin vuelta atrás. La aplicación exige cuidado en cada gesto, lo que penaliza exactamente el uso rápido que la hace útil.

## Qué desbloquea

- **Prioridad explícita:** distinguir lo urgente de lo eventual sin codificarlo en el orden ni en el texto.
- **Clasificación transversal:** etiquetas que cortan a través de las listas y permiten agrupaciones ad hoc que la estructura fija no prevé.
- **Encontrar sin recordar dónde:** búsqueda sobre el texto y los metadatos, para que la lista entera sea consultable aunque nadie recuerde en qué lista quedó algo.
- **Recuperación del error:** deshacer devuelve la confianza para actuar rápido; el gesto deja de ser una decisión irreversible.

## Flujos de trabajo que se hacen viables

- Marcar las tres cosas que no pueden quedar sin hacer esta semana y mirar solo esas.
- Etiquetar «casa», «trabajo» o «compra» y cruzar etiquetas con listas en la consulta.
- Encontrar una tarea por una palabra suelta del texto o de su lista.
- Deshacer un borrado accidental o una edición errónea sin reconstruir la tarea de memoria.

## Ventajas como producto

- **Densidad de invariantes:** prioridades, etiquetas y deshacer son cada uno una regla del dominio con casos borde propios —qué pasa al borrar una etiqueta en uso, al buscar dentro de una lista archivada, al deshacer una operación que otra ya pisó—. Para la PoC de Factory, es la idea que más ejercita la suite esperada y la revisión de invariantes.
- **Superficie de producto real:** estas capacidades separan una lista escolar de una herramienta de organización; prueban si el sistema sostiene un dominio que ya no cabe en una tabla.
- **Independencia de la infraestructura:** funciona igual sobre persistencia local o remota, lo que permite ejecutarla antes o después del backend según convenga.

## Tensión que introduce en el roadmap

Comparte el modelo con todas sus hermanas: si llega antes de `003-backend-persistencia`, la API nacerá ya con etiquetas y prioridades —menos migraciones, pero diseño a ciegas—; si llega después, cada capacidad paga el peaje de la frontera cliente-servidor. «Deshacer» convive mal con `005-offline-sincronizacion`: la cola de operaciones y el deshacer local se pisan conceptualmente, y conviene decidir esa interacción antes de que ambas existan.
