# Registrar decisiones de diseño del flujo 1

## Objetivo

Registrar las cuatro decisiones de diseño que el flujo 1 (idea → tarea) requiere antes de construir sus capacidades, según lo especificado en la investigación 032.

## Dependencias

- Ninguna

## Entrada

- Investigación 032 en `docs/research/2026-09-flujo-1-propuesta-borradores.md`.
- Investigación 031 en `docs/research/2026-09-flujos-idea-tarea-ejecucion.md`.
- Decisiones de diseño existentes en `docs/decisions/`, en particular D001.
- Skill `decisiones-diseno`.

## Resultado esperado

- Cuatro ADR en `docs/decisions/`:
  - **D012**: Formato y ubicación de las propuestas (`docs/proposals/NNN-slug/` con `propuesta.md` y borradores `MM-titulo.md`).
  - **D013**: Mecanismo de borradores y su reflejo en `TODO.txt` (sección de propuestas, marcador `[p]`, ciclo de vida).
  - **D014**: Función dual de `crear-tareas` (modo independiente y modo flujo 1, con núcleo común).
  - **D015**: Extensión de D001 para que `TODO.txt` sea índice de tareas y propuestas en revisión.

## Criterios de calidad

- Cada ADR sigue el formato de decisiones de diseño del proyecto.
- Las decisiones son coherentes entre sí y con la investigación 032.
- D015 referencia explícitamente D001 y declara si la sustituye o la extiende.
- Pasa revisión técnica por subagente independiente.

## Procedimiento sugerido

1. Usar el skill `decisiones-diseno` para registrar cada una de las cuatro decisiones.
2. Basar cada decisión en la especificación de la investigación 032.
3. Verificar la coherencia cruzada entre las cuatro decisiones.
4. Someter a revisión dual.

## Notas

- Las cuatro decisiones son interdependientes: D014 presupone D012/D013, y D015 presupone D013. Se registran en una sola tarea porque forman un paquete de diseño coherente ya especificado en la investigación.

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario: [fecha] — [Aprueba | Solicita cambios]
