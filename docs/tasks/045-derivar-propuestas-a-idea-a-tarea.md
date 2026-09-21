# Derivar propuestas pendientes a idea-a-tarea desde ejecutar-tareas

## Estado

[x] Completada

## Objetivo

Hacer que `ejecutar-tareas` detecte las propuestas `[p]` pendientes en `TODO.txt` al leer el índice y derive su procesamiento a `idea-a-tarea`, para que una sesión de ejecución no ignore la puerta de revisión del flujo de idea a tarea.

## Dependencias

- 040 (Construir capacidad de orquestación del flujo de idea a tarea)

## Entrada

- `.agents/skills/ejecutar-tareas/SKILL.md`, que hoy solo reconoce estados de tarea.
- `.agents/skills/idea-a-tarea/SKILL.md`, que procesa las propuestas `[p]` de la sección «Propuestas en revisión».

## Resultado esperado

- `ejecutar-tareas` indica, al leer `TODO.txt`, que las líneas `[p]` de «Propuestas en revisión» se procesan con `idea-a-tarea` y no forman parte del ciclo de ejecución de tareas.

## Criterios de calidad

- `ejecutar-tareas` menciona explícitamente qué hacer cuando `TODO.txt` contiene propuestas `[p]`.
- La derivación no convierte las propuestas en tareas ni las ejecuta: solo remite al skill correspondiente.
- Pasa revisión técnica por subagente independiente.

## Procedimiento sugerido

1. Añadir en `ejecutar-tareas` un paso o nota en la lectura de `TODO.txt` que detecte líneas `[p]` y derive a `idea-a-tarea`.
2. Someter a revisión dual.

## Notas

- Detectado en la revisión técnica de la tarea 040 como un hueco del sistema: una sesión que arranca con `ejecutar-tareas` no recibe indicación sobre las propuestas pendientes.

## Revisión

- Subagente: 2026-09-20 — Aprueba
- Usuario: 2026-09-20 — Aprueba
