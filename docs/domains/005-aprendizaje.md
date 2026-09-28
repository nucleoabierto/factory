# Aprendizaje por experiencias

## Propósito

Convertir las correcciones que el usuario hace durante el trabajo en conocimiento recuperable, para que el sistema no repita errores ya observados.

## Referencia del modelo

- **Lenguaje ubicuo:**
  - **Experiencia:** entrada append-only en `EXPERIENCIAS.md` que documenta la brecha entre el resultado esperado y el obtenido, tal como el usuario la corrigió.
    - Ancla: `EXPERIENCIAS.md` en la raíz del repositorio y `.agents/skills/registrar-experiencias/SKILL.md`
  - **Lección:** nota temática bajo `docs/lessons/<tema>.md` que agrupa experiencias consolidadas, con el «por qué» y disparadores propios por entrada.
    - Ancla: archivos de `docs/lessons/` y `.agents/skills/consolidar-lecciones/SKILL.md`
  - **Disparadores:** lista léxica —archivos, comandos, palabras clave— declarada en los índices de `docs/lessons/README.md` (y de `docs/decisions/README.md`) que actúa como contrato de descubrimiento: la recuperación es por coincidencia de disparadores con el trabajo a realizar.
    - Ancla: formato de entradas en `docs/lessons/README.md` y procedimiento de `.agents/skills/consultar-lecciones/SKILL.md`
- **Entidades / estado:**
  - Las experiencias se acumulan en `EXPERIENCIAS.md` hasta que `consolidar-lecciones` las destila en notas por tema, en una sesión independiente de la que las produjo.
    - Ancla: `EXPERIENCIAS.md` y `.agents/skills/consolidar-lecciones/SKILL.md`
  - El conocimiento recuperado se aplica por consulta explícita (`consultar-lecciones`, `consultar-decisiones`) al inicio de cada trabajo; no hay memoria automática.
    - Ancla: `.agents/skills/consultar-lecciones/SKILL.md` y `.agents/skills/consultar-decisiones/SKILL.md`
- **Invariantes:**
  - `EXPERIENCIAS.md` es append-only: la historia de correcciones no se reescribe.
  - Cada lección declara sus disparadores y su «por qué»; el resumen del índice orienta, la nota completa enseña.
  - «Sin coincidencia también es resultado»: si ningún disparador aplica, el trabajo continúa sin forzar la recuperación.
- **Operaciones:**
  - Registrar: `.agents/skills/registrar-experiencias/SKILL.md` (al cerrar tareas con correcciones del usuario).
  - Consolidar: `.agents/skills/consolidar-lecciones/SKILL.md`.
  - Consultar: `.agents/skills/consultar-lecciones/SKILL.md` y `.agents/skills/consultar-decisiones/SKILL.md`.

## Explicación del dominio

- **Fronteras:**
  - Dentro: `EXPERIENCIAS.md`, `docs/lessons/` y los cuatro skills de registro, consolidación y consulta.
  - Fuera: las decisiones de diseño en sí (viven en `docs/decisions/`, dominio de documentación viva), aunque `consultar-decisiones` comparte aquí el mecanismo de recuperación por disparadores.
  - Relaciones: alimenta al ciclo de tareas —que invoca `consultar-lecciones` al leer cada tarea— y al subagente de revisión, que coteja el diff contra las lecciones aplicables.
- **Decisiones relevantes:**
  - `docs/decisions/D009-flujo-revision-dual.md` (el cotejo del diff contra lecciones en la revisión técnica)

## Estado de salud

- Última revisión: 2026-09-28
- Divergencias conocidas: Ninguna
