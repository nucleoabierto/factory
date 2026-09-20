# Crear skill de registro de experiencias

## Estado

[ ] Pendiente | [~] En progreso | [r] En revisión | **[x] Completada** | [!] Bloqueada

## Objetivo

Crear un skill que, al terminar cada tarea, genere un resumen en bullet points de las acciones que el usuario corrigió, incluyendo la tarea y la explicación de la brecha entre el resultado esperado y el obtenido, y lo gestione en `EXPERIENCIAS.md`.

## Dependencias

- 042 (Investigar sistema de aprendizaje por experiencias)

## Entrada

- Investigación 042 en `docs/research/` con las decisiones sobre formato de registro y gestión del archivo.
- Skill `ejecutar-tareas` en `.agents/skills/ejecutar-tareas/SKILL.md`, donde se integra el registro al cerrar cada tarea.

## Resultado esperado

- Skill nuevo en `.agents/skills/` siguiendo el estándar del proyecto.
- Archivo `EXPERIENCIAS.md` creado con la estructura definida en la investigación.
- Integración documentada del registro de experiencias al final del ciclo de tareas.

## Criterios de calidad

- Cada entrada registrada incluye la tarea afectada y la brecha entre resultado esperado y obtenido.
- El formato de las entradas sigue lo decidido en la investigación 042.
- El skill gestiona el ciclo de vida del archivo (crear si no existe, añadir entradas sin duplicar ni borrar).
- Sigue el estándar de skills del proyecto (autocontenidos, división progresiva con `references/` si aplica).
- Pasa revisión técnica por subagente independiente.

## Procedimiento sugerido

1. Definir el nombre y la estructura del skill a partir de la investigación 042.
2. Escribir el `SKILL.md` con el procedimiento de registro.
3. Crear `EXPERIENCIAS.md` con la estructura inicial.
4. Integrar el skill en el cierre de tarea de `ejecutar-tareas`.
5. Someter a revisión dual.

## Notas

- El formato exacto de las entradas y los puntos de enganche quedan definidos por la investigación 042.

## Revisión

- Subagente: 2026-09-20 — Aprueba
- Usuario: 2026-09-20 — Aprueba
