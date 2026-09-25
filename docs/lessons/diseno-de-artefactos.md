# Diseño de artefactos del sistema

## Lecciones

- **Registra cada decisión de diseño dentro de la tarea que la consolida, no en una tarea transversal de registro.** Por qué: una propuesta descomponía el trabajo en una tarea independiente de «registrar decisiones» que dependía de todas las demás; eso rompe la autonomía de las piezas y retrasa decisiones que ya están maduras. El registro es un paso del cierre de la tarea, con `decisiones-diseno`.
  Disparadores: descomposición de tareas, borradores, propuestas, épica, registrar decisión, decisiones-diseno, docs/decisions, autonomía de tareas
  Origen: 20260925T145156

- **Diseña los artefactos del sistema de forma genérica: la tecnología del producto validado es dato de entrada, no parte del concepto.** Por qué: la épica y una tarea hablaban de anclar escenarios «a la suite QUnit», acoplando el diseño de Factory a la implementación de la PoC; el concepto es «la suite de pruebas del proyecto», y la instancia concreta (tests.html, QUnit) vive en la Entrada de la tarea.
  Disparadores: artefactos del sistema, épicas, tareas, propuestas, concepto genérico, PoC, todo-app, tecnología concreta, ancla, acoplamiento a implementación
  Origen: 20260925T145157
