# Sub-flujo de desarrollo

## Propósito

Ejecutar las tareas de tipo `desarrollo` o `mantenimiento (refactoring)` con un pipeline propio dentro de la tarea, dividido en dos flujos invocables por separado: la planeación —recopilar contexto, verificar conectividad, planear con suite esperada— y la ejecución —implementar el plan aprobado—, con revisión técnica especializada.

## Referencia del modelo

- **Lenguaje ubicuo:**
  - **Contexto de la tarea:** conjunto de archivos similares, patrones vigentes, documentación de dominio y de producto aplicable, lecciones y decisiones aplicables, registrado en la sección «Contexto» del archivo de tarea.
    - Ancla: `.agents/skills/recopilar-contexto/SKILL.md`
  - **Veredicto de conectividad:** evaluación —conectada, parcialmente conectada o desconectada— de si lo que la tarea asume existe en el codebase, registrada en el archivo de la tarea antes de planear.
    - Ancla: `.agents/skills/evaluar-conectividad/SKILL.md`
  - **Plan de implementación:** entendimiento del subsistema, plan técnico conceptual y «Suite de pruebas esperada» guiada por ZOMBIE, con la letra declarada por expectativa cuando aplica.
    - Ancla: `.agents/skills/planear-implementacion/SKILL.md`
    - Origen: `docs/decisions/D028-letra-zombie-declarada-en-suite.md`
  - **Registro de desviaciones:** diferencias entre el plan y lo ejecutado, devueltas al ejecutor junto al diff.
    - Ancla: `.agents/skills/ejecutar-implementacion/SKILL.md` y `.agents/skills/desarrollar-tarea/SKILL.md`
  - **Estado de planeación:** una tarea está «planeada» cuando su archivo contiene `## Plan técnico` y `## Suite de pruebas esperada` aprobados; el ejecutor general lee ese estado para elegir entre `planear-tarea` y `desarrollar-tarea`.
    - Ancla: sección «Enrutado por tipo» de `.agents/skills/ejecutar-tareas/SKILL.md`
    - Origen: `docs/decisions/D031-flujo-desarrollo-dividido-en-planear-y-ejecutar.md`
- **Entidades / estado:**
  - El archivo de la tarea acumula los productos del pipeline: sección «Contexto», veredicto de conectividad, plan técnico y suite esperada; el diff queda en el árbol de trabajo para la revisión.
    - Ancla: `.agents/skills/planear-tarea/SKILL.md` y `.agents/skills/desarrollar-tarea/SKILL.md` (cada flujo registra su mitad en el archivo de la tarea)
- **Invariantes:**
  - La conectividad se evalúa antes de la planeación: la falta de infraestructura se detecta antes de escribir el plan.
  - No se replanifica: una tarea con plan y suite aprobados entra directa a ejecución, en esta sesión o en otra.
  - La planeación es incremental: una dependencia con plan aprobado pero sin ejecutar se toma como base asumida; sin plan, bloquea.
  - La implementación sigue el plan registrado; las desviaciones se documentan, no se ocultan.
  - En `mantenimiento (refactoring)` la aceptación exige misma API pública, misma suite en verde y mismo comportamiento observable.
- **Operaciones:**
  - Planear la tarea: `.agents/skills/planear-tarea/SKILL.md`.
  - Ejecutar el plan: `.agents/skills/desarrollar-tarea/SKILL.md`.
  - Revisión técnica del diff: `.agents/skills/revisar-implementacion/SKILL.md` (subagente con contexto aislado).

## Explicación del dominio

- **Fronteras:**
  - Dentro: las cinco capacidades del pipeline (contexto, conectividad, planeación, ejecución, revisión de implementación) y su orquestación.
  - Fuera: el ciclo de vida de la tarea en `TODO.txt` —estados, revisión dual, commit—, que pertenece al dominio del ciclo de tareas; la documentación del dominio afectado, que cierran los sensores de documentación viva.
  - Relaciones: `ejecutar-tareas` elige el punto de entrada por el estado de planeación del archivo de la tarea; consume lecciones y decisiones vía los skills de consulta del dominio de aprendizaje y de documentación viva.
- **Decisiones relevantes:**
  - `docs/decisions/D031-flujo-desarrollo-dividido-en-planear-y-ejecutar.md` (sustituye a D020)
  - `docs/decisions/D028-letra-zombie-declarada-en-suite.md`
  - `docs/decisions/D011-posponer-separacion-ejecutar-tareas.md` (parcialmente sustituida por D020)

## Estado de salud

- Última revisión: 2026-09-28 (contexto de la tarea ampliado con documentación de dominio y de producto)
- Divergencias conocidas: Ninguna
