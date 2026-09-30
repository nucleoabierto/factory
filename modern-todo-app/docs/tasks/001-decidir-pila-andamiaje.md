# Decidir la pila tecnológica del andamiaje

## Estado

[x] Completada

## Tipo

investigación

## Objetivo

Elegir y justificar la pila del proyecto —framework de componentes, lenguaje con tipado estático, empaquetador y servidor de desarrollo, ejecutor de pruebas y linter— de modo que reproduzca las condiciones de una aplicación web contemporánea y sostenga las ideas siguientes del subproyecto.

## Dependencias

- Ninguna.

## Entrada

- La propuesta `docs/proposals/001-andamiaje-proyecto/` aprobada: problema, forma de solución y fuera de alcance.
- Las ideas `docs/ideas/002` a `005` como consumidores de la elección: núcleo TodoMVC, backend y persistencia, organización avanzada y sincronización offline.
- El candidato sugerido por la idea original: React, sin que la elección quede fijada de antemano.

## Resultado esperado

- Un documento en `docs/research/` del subproyecto que compara opciones por dimensión, declara los criterios de la elección y recomienda una pila coherente y completa.
- La elección registrada como decisión de diseño del subproyecto al cerrar la tarea.

## Criterios de calidad

- Cada dimensión —framework, lenguaje, empaquetador, ejecutor de pruebas y lint— compara al menos dos opciones reales con referencias verificables.
- Los criterios de la elección son explícitos: representatividad de un proyecto moderno, madurez del ecosistema, suite ejecutable por comando y sencillez para una PoC.
- La recomendación forma un conjunto coherente —las piezas elegidas funcionan juntas— y cubre todas las dimensiones.
- Las versiones recomendadas son publicadas con antelación suficiente, no recién salidas.

## Procedimiento sugerido

1. Recopilar las opciones por dimensión y los criterios de comparación.
2. Comparar frameworks de componentes (p. ej., React, Vue, Svelte) en representatividad y ecosistema.
3. Comparar empaquetador con servidor de desarrollo y ejecutor de pruebas.
4. Comparar herramientas de lint y formato.
5. Sintetizar la pila recomendada, verificar la compatibilidad entre piezas y documentar la elección.
6. Registrar la decisión de diseño al cerrar la tarea.

## Notas

- La tarea decide la pila, no la instala: la inicialización es la tarea 002.

## Revisión

- Subagente: 2026-09-29 — Aprueba
- Usuario: 2026-09-29 — Aprueba
