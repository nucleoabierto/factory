# Scope del subproyecto

## Lecciones

- **Los artefactos de todo-app viven dentro de `todo-app/`; la raíz del repositorio guarda los del meta-proyecto.** Por qué: al registrar una experiencia generada en todo-app se iba a escribir en el `EXPERIENCIAS.md` de la raíz, y el usuario pidió crear uno propio dentro de todo-app; el mismo patrón se repitió con el documento de dominio, que se creó primero en `docs/domains/` de la raíz en vez de `todo-app/docs/domains/`. Cada proyecto con su propio `docs/` (tareas, épica, dominios, lecciones) conserva sus artefactos junto al código que describen.
  Disparadores: EXPERIENCIAS, docs/, artefactos, archivos del proyecto, subproyecto, raíz del repositorio, scope
  Origen: 20260921T170818, 20260922T123502
