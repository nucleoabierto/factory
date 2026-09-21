# Permitir tareas fuera de hito en TODO.txt

## Estado

[x] Completada

## Objetivo

Permitir que las tareas sueltas de mantenimiento vivan en `TODO.txt` fuera de un hito, bajo una sección general, en lugar de forzar la creación de un hito para trabajo que no es planificado.

## Dependencias

- Ninguna

## Entrada

- `TODO.txt` y el comentario de formato que declara «las tareas se agrupan por hito bajo encabezados ## Hito N».
- `.agents/skills/crear-tareas/SKILL.md`, que hoy añade las entradas «bajo el hito correspondiente» e infiere o pregunta el hito.
- `.agents/skills/ejecutar-tareas/SKILL.md`, para verificar que nada del ciclo depende de la agrupación por hitos.

## Resultado esperado

- El comentario de formato de `TODO.txt` declara que las tareas pueden agruparse por hito o vivir bajo una sección general para trabajo suelto.
- `crear-tareas` acepta la sección general como destino válido cuando la tarea no pertenece a un hito.
- Ningún skill queda asumiendo que toda tarea pertenece a un hito.

## Criterios de calidad

- La sección general tiene un nombre y una posición definidos en el formato (p. ej. `## General`, antes o después de los hitos).
- `crear-tareas` deja de tratar la ausencia de hito como una duda que resolver preguntando: la sección general es un destino legítimo.
- `ejecutar-tareas` sigue funcionando igual con tareas fuera de hito (solo lee líneas `- [estado]`).
- Pasa revisión técnica por subagente independiente.

## Procedimiento sugerido

1. Definir el nombre y la posición de la sección general.
2. Actualizar el comentario de formato de `TODO.txt`.
3. Actualizar `crear-tareas` para aceptar la sección general.
4. Someter a revisión dual.

## Notas

- Si el cambio de convención resulta costoso de revertir, registrar decisión de diseño con `decisiones-diseno`; si es un ajuste menor de formato, basta la tarea.

## Revisión

- Subagente: 2026-09-20 — Aprueba
- Usuario: 2026-09-20 — Aprueba
