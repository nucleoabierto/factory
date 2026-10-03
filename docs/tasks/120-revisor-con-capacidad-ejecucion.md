# Dotar al subagente revisor de capacidad de ejecución

## Estado

[ ] Pendiente | [~] En progreso | [r] En revisión | **[x] Completada** | [!] Bloqueada

## Tipo

mantenimiento

## Objetivo

Declarar en el flujo de revisión que el subagente revisor se lanza con capacidad de ejecutar comandos. El revisor reconstruye el diff con git por sí mismo, pero ningún skill lo exige: lanzado con un perfil sin ejecución, la revisión se degrada a inspección del árbol sin diff —ya ocurrió en la revisión de la tarea del skill de cierre de conjunto—. La nota debe ser genérica: exigir la capacidad de ejecutar, sin nombrar perfiles que aten la regla a la implementación del arnés.

## Dependencias

- Ninguna.

## Entrada

- `ejecutar-tareas`: el paso de revisión técnica que lanza el subagente genérico.
- `revisar-implementacion`: el paso que lanza el subagente de contexto aislado.

## Resultado esperado

- Ambos skills declaran que el subagente revisor se lanza con capacidad de ejecutar comandos —git para reconstruir el diff por sí mismo—, sin nombrar perfiles concretos del arnés.

## Criterios de calidad

- La nota exige la capacidad de ejecutar comandos y no nombra ningún perfil.
- El cambio está presente tanto en `ejecutar-tareas` como en `revisar-implementacion`.
- Redacción y formato consistentes con el estilo de ambos skills.

## Procedimiento sugerido

1. Añadir la nota en el paso de lanzamiento del subagente de cada skill.
2. Revisar redacción y pulir.

## Notas

- La capacidad exigida es ejecutar comandos —git para reconstruir el diff y consultas puntuales—; el contexto aislado del revisor se mantiene.

## Revisión

- Subagente: 2026-10-03 — Aprueba
- Usuario: 2026-10-03 — Aprueba
