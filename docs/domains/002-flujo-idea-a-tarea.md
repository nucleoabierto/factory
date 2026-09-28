# Flujo de idea a tarea

## Propósito

Transformar una idea suelta del usuario en un conjunto de tareas planificadas y revisables, pasando por la formulación del problema, la propuesta de solución y su refinamiento en borradores, con la decisión del usuario como puerta de entrada al trabajo.

## Referencia del modelo

- **Lenguaje ubicuo:**
  - **Idea persistida:** archivo `docs/ideas/NNN-slug.md` producido por `lluvia-de-ideas`, con Problema, Qué desbloquea (equivalente a la Oportunidad de `descubrir-problema`), Flujos viables, Ventajas como producto y Tensión con el roadmap; entrada persistida del flujo, anterior a la propuesta.
    - Ancla: `.agents/skills/lluvia-de-ideas/SKILL.md` y `references/formato-idea.md`
    - Origen: `docs/tasks/101-skill-lluvia-de-ideas.md`
  - **Idea procesada:** idea de `docs/ideas/` cuya cabecera lleva la marca `Procesada en: docs/proposals/NNN-slug/`, añadida por `idea-a-tarea` al generar su propuesta; las ideas sin marca se presentan como pendientes siguiendo el «Orden sugerido» de sus cabeceras.
    - Ancla: pasos 7 y 11 del procedimiento en `.agents/skills/idea-a-tarea/SKILL.md`
  - **Propuesta:** unidad de revisión del flujo; vive en `docs/proposals/NNN-slug/` con un `propuesta.md` —problema, solución, alternativas, fuera de alcance— y sus borradores de tarea.
    - Ancla: directorios bajo `docs/proposals/`; campos descritos en `.agents/skills/refinar-propuesta/SKILL.md`
    - Origen: `docs/decisions/D012-formato-y-ubicacion-de-las-propuestas.md`, `docs/decisions/D016-campos-de-propuesta-md.md`
  - **Borrador:** archivo `MM-titulo.md` dentro del directorio de la propuesta, con los campos de la plantilla de tarea pero sin Estado ni Revisión.
    - Ancla: archivos `MM-*.md` bajo `docs/proposals/`
    - Origen: `docs/decisions/D012-formato-y-ubicacion-de-las-propuestas.md`
  - **Propuesta en revisión:** propuesta lista para la decisión del usuario, marcada `[p]` en la sección «Propuestas en revisión» de `TODO.txt`.
    - Ancla: sección final de `TODO.txt` (cuando existe) y el paso 1 de `.agents/skills/ejecutar-tareas/SKILL.md`
    - Origen: `docs/decisions/D013-mecanismo-borradores-reflejo-todo.md`, `docs/decisions/D015-extension-de-d001-para-indice-de-propuestas.md`
  - **Épica:** documento `docs/epics/NNN-slug.md` que da hogar y dirección técnica a un conjunto de tareas —objetivo, alcance, piezas, plan técnico y criterio de cierre—; los conjuntos que no la ameritan se agrupan bajo un encabezado ligero en `TODO.txt`.
    - Ancla: archivos de `docs/epics/` y `.agents/skills/planificar/SKILL.md`
    - Origen: `docs/decisions/D019-epica-como-artefacto-de-planeacion.md`
  - **Roadmap:** `ROADMAP.md` en la raíz del proyecto evaluado, fuente de verdad de prioridad y dirección, con líneas de trabajo ordenadas en horizontes Now/Next/Later/No ahora.
    - Ancla: `.agents/skills/planificar-roadmap/SKILL.md`; `todo-app/ROADMAP.md` como instancia
    - Origen: `docs/decisions/D022-roadmap-como-nivel-de-direccion.md`, `docs/decisions/D027-roadmap-horizontes-now-next-later.md`
- **Entidades / estado:**
  - Ciclo de vida de la propuesta: borradores → pendiente `[p]` → aprobada (se promociona y planifica) o descartada (se conserva).
    - Ancla: marcador `[p]` en la sección «Propuestas en revisión» de `TODO.txt` y `.agents/skills/idea-a-tarea/SKILL.md`
- **Invariantes:**
  - La propuesta —no cada borrador— es la unidad de revisión: el usuario decide sobre el conjunto completo.
  - Una propuesta `[p]` no entra al roadmap ni se ejecuta hasta aprobarse y planificarse.
  - `TODO.txt` refleja solo los horizontes comprometidos del roadmap.
  - La descomposición de una propuesta en varias ideas se escribe solo tras confirmación del usuario; una idea ya procesada no se reprocesa.
- **Operaciones:**
  - Explorar y persistir ideas: `.agents/skills/lluvia-de-ideas/SKILL.md`.
  - Orquestar el flujo: `.agents/skills/idea-a-tarea/SKILL.md`.
  - Descubrir el problema: `.agents/skills/descubrir-problema/SKILL.md`.
  - Proponer la forma de solución: `.agents/skills/proponer-forma-solucion/SKILL.md`.
  - Refinar en borradores: `.agents/skills/refinar-propuesta/SKILL.md`.
  - Promocionar a tareas: `.agents/skills/crear-tareas/SKILL.md` (modo flujo de idea a tarea).
  - Planificar la épica: `.agents/skills/planificar/SKILL.md`; el roadmap: `.agents/skills/planificar-roadmap/SKILL.md`.

## Explicación del dominio

- **Fronteras:**
  - Dentro: las ideas persistidas (`docs/ideas/`), propuestas y sus borradores, las capacidades de descubrimiento/propuesta/refinamiento, la promoción de borradores, la épica y el roadmap.
  - Fuera: la ejecución de las tareas ya creadas (dominio del ciclo de tareas); la implementación concreta (sub-flujo de desarrollo).
  - Relaciones: entrega tareas listas al ciclo de tareas vía `TODO.txt`; la épica deja la guía de arquitectura que la ejecución respeta.
- **Decisiones relevantes:**
  - `docs/decisions/D012-formato-y-ubicacion-de-las-propuestas.md`
  - `docs/decisions/D013-mecanismo-borradores-reflejo-todo.md`
  - `docs/decisions/D015-extension-de-d001-para-indice-de-propuestas.md`
  - `docs/decisions/D016-campos-de-propuesta-md.md`
  - `docs/decisions/D019-epica-como-artefacto-de-planeacion.md`
  - `docs/decisions/D022-roadmap-como-nivel-de-direccion.md`
  - `docs/decisions/D027-roadmap-horizontes-now-next-later.md`
  - `docs/decisions/D030-ideas-persistidas-en-docs-ideas.md`

## Estado de salud

- Última revisión: 2026-09-28 (añadido el artefacto de idea persistida y su consumo)
- Divergencias conocidas: Ninguna
