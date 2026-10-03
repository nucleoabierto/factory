# Núcleo TodoMVC: la aplicación gestiona una lista de tareas real

## Estado

[a] Aprobada

## Problema

`modern-todo-app` ya es un proyecto real —se instala, compila, sirve y verifica por comando— pero la aplicación no hace nada: muestra una pantalla estática con un estado vacío. No hay dónde apuntar lo que hay que hacer, ni cómo marcarlo terminado, ni nada que se conserve entre visitas.

Para la persona usuaria aún no es una aplicación; para la prueba de concepto de Factory tampoco hay todavía un dominio con invariantes que el flujo de idea a tarea tenga que respetar: la suite verde cubre un cascarón, no un comportamiento. Sin este núcleo, cualquier funcionalidad posterior carece de suelo —la organización, el backend y la sincronización son variaciones sobre la operación elemental de capturar una tarea y cerrarla.

## Oportunidad

Resolverlo convierte el andamiaje en una aplicación honesta: la versión más pequeña que una persona usaría de verdad, con un dominio propio —texto no vacío, estado binario, lista conservada entre visitas— cuyas reglas el resto del proyecto no podrá violar sin que la suite lo note. Además es la primera decisión estructural del dominio: cómo se representa el estado en React condiciona el coste del backend y de la sincronización, y tomarla con criterio ahora evita pagarla dos veces después. La especificación TodoMVC aporta lo que ninguna alternativa da —un contrato verificable externo: el resultado se contrasta con una spec escrita, no se aprecia.

## Forma de solución

La pantalla deja de ser un cascarón estático y se convierte en una lista de tareas operable: quien la usa puede capturar una tarea al pensarla, verla en la lista, marcarla completada, corregir su texto, borrarla, revisar qué queda pendiente y qué se hizo, y vaciar lo completado; la lista se conserva entre visitas. El comportamiento queda acotado por la especificación TodoMVC, que actúa de contrato externo verificable. La propuesta incluye además la definición de la guía de estilo del producto —el contrato visual que la superficie real del núcleo ya justifica—. Categoría: flujo nuevo — hoy ninguno de esos objetivos tiene camino en el producto.

## Solución

La propuesta construye el núcleo funcional del producto en tres capas que se apoyan entre sí. Primero se define la guía de estilo del proyecto —`DESIGN.md` con los tokens visuales materializados en el código—, de modo que la interfaz del núcleo se construye desde el inicio sobre un contrato de diseño verificable. Después se fija el modelo de estado del dominio —la decisión estructural que condiciona el backend y la sincronización— y se implementa el dominio de la tarea con sus invariantes y su persistencia en el navegador.

Sobre esa base se construye la interfaz completa de la lista: captura con validación, ítems con sus interacciones —completar, eliminar, edición—, casilla de «marcar todas» y pie con contador pluralizado, filtros y limpieza de completadas. Cada pieza se verifica contra las cláusulas de la especificación TodoMVC —visibilidad por estado, reglas de edición, pluralización, persistencia y routing— y la conformidad se comprueba de extremo a extremo al cerrar el conjunto.

## Alternativas consideradas

- Núcleo parcial del ciclo de vida (capturar y completar; editar, borrar y filtrar después): se descarta porque deja el dominio sin su operación elemental completa y difumina el contrato TodoMVC, que es justo lo que hace el resultado verificable de forma objetiva.
- Dominio enriquecido de entrada (TodoMVC más organización —prioridad, etiquetas—): se descarta porque adelanta la idea 004 y mezcla dos decisiones que el roadmap separó a propósito: el núcleo fija el modelo de estado y el dominio base; enriquecerlo después evalúa el cambio sobre una base ya verificada.
- Replicar la funcionalidad del `todo-app` hermano: se descarta porque ese proyecto es la comparación negativa de la PoC —vanilla JS, sin toolchain—; portar sus decisiones arrastraría al núcleo una forma de dominio ajena a la pila decidida en D001.

## Fuera de alcance

- Persistencia fuera del navegador: backend, API, datos compartidos entre dispositivos — idea 003.
- Organización avanzada: prioridades, etiquetas, búsqueda, deshacer — idea 004.
- Operación offline con reconciliación e instalabilidad — idea 005.
- Listas múltiples, identidad o pertenencia — líneas de Later.
- Enrutado del framework más allá del routing hash de la spec.

## Investigaciones de apoyo

- Especificación TodoMVC (`app-spec.md` del repositorio `tastejs/todomvc`) — contrato funcional externo que acota el núcleo.

## Borradores

- `docs/tasks/005-definir-guia-estilo.md` — Definir la guía de estilo del proyecto
- `docs/tasks/006-decidir-modelo-estado.md` — Decidir el modelo de estado del dominio
- `docs/tasks/007-dominio-tarea-persistencia.md` — Dominio de la tarea y persistencia local (depende de 006)
- `docs/tasks/008-lista-operable.md` — Lista operable: captura, completar, eliminar y marcar todas (depende de 005 y 007)
- `docs/tasks/009-edicion-inline.md` — Edición inline de tareas (depende de 008)
- `docs/tasks/010-pie-filtros-conformidad.md` — Pie de lista, filtros con routing y conformidad TodoMVC (depende de 009)

## Revisión

- Usuario: 2026-10-02 — Aprueba
