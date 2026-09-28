# Sub-flujo de desarrollo

## Propósito

Ejecutar las tareas de tipo `desarrollo` o `mantenimiento (refactoring)` con un pipeline propio dentro de la tarea: recopilar contexto, verificar que lo asumido conecta con el codebase real, planear la implementación con su suite de pruebas esperada y ejecutarla, con revisión técnica especializada.

## Referencia del modelo

- **Lenguaje ubicuo:**
  - **Contexto de la tarea:** conjunto de archivos similares, patrones vigentes, lecciones y decisiones aplicables, registrado en la sección «Contexto» del archivo de tarea.
    - Ancla: `.agents/skills/recopilar-contexto/SKILL.md`
  - **Veredicto de conectividad:** evaluación —conectada, parcialmente conectada o desconectada— de si lo que la tarea asume existe en el codebase, registrada en el archivo de la tarea antes de planear.
    - Ancla: `.agents/skills/evaluar-conectividad/SKILL.md`
  - **Plan de implementación:** entendimiento del subsistema, plan técnico conceptual y «Suite de pruebas esperada» guiada por ZOMBIE, con la letra declarada por expectativa cuando aplica.
    - Ancla: `.agents/skills/planear-implementacion/SKILL.md`
    - Origen: `docs/decisions/D028-letra-zombie-declarada-en-suite.md`
  - **Registro de desviaciones:** diferencias entre el plan y lo ejecutado, devueltas al orquestador junto al diff.
    - Ancla: `.agents/skills/ejecutar-implementacion/SKILL.md` y `.agents/skills/desarrollo/SKILL.md`
- **Entidades / estado:**
  - El archivo de la tarea acumula los productos del pipeline: sección «Contexto», veredicto de conectividad, plan técnico y suite esperada; el diff queda en el árbol de trabajo para la revisión.
    - Ancla: `.agents/skills/desarrollo/SKILL.md` (salida de cada capacidad registrada en el archivo de la tarea)
- **Invariantes:**
  - La conectividad se evalúa antes de la planeación: la falta de infraestructura se detecta antes de escribir el plan.
  - La implementación sigue el plan registrado; las desviaciones se documentan, no se ocultan.
  - En `mantenimiento (refactoring)` la aceptación exige misma API pública, misma suite en verde y mismo comportamiento observable.
- **Operaciones:**
  - Orquestar el sub-flujo: `.agents/skills/desarrollo/SKILL.md`.
  - Revisión técnica del diff: `.agents/skills/revisar-implementacion/SKILL.md` (subagente con contexto aislado).

## Explicación del dominio

- **Fronteras:**
  - Dentro: las cinco capacidades del pipeline (contexto, conectividad, planeación, ejecución, revisión de implementación) y su orquestación.
  - Fuera: el ciclo de vida de la tarea en `TODO.txt` —estados, revisión dual, commit—, que pertenece al dominio del ciclo de tareas; la documentación del dominio afectado, que cierran los sensores de documentación viva.
  - Relaciones: es invocado por `ejecutar-tareas` por enrutado por tipo; consume lecciones y decisiones vía los skills de consulta del dominio de aprendizaje y de documentación viva.
- **Decisiones relevantes:**
  - `docs/decisions/D020-flujo-desarrollo-skill-especialista.md`
  - `docs/decisions/D028-letra-zombie-declarada-en-suite.md`
  - `docs/decisions/D011-posponer-separacion-ejecutar-tareas.md` (parcialmente sustituida por D020)

## Estado de salud

- Última revisión: 2026-09-28
- Divergencias conocidas: Ninguna
