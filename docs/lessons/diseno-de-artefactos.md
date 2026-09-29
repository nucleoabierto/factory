# Diseño de artefactos del sistema

## Lecciones

- **Registra cada decisión de diseño dentro de la tarea que la consolida, no en una tarea transversal de registro.** Por qué: una propuesta descomponía el trabajo en una tarea independiente de «registrar decisiones» que dependía de todas las demás; eso rompe la autonomía de las piezas y retrasa decisiones que ya están maduras. El registro es un paso del cierre de la tarea, con `decisiones-diseno`.
  Disparadores: descomposición de tareas, borradores, propuestas, épica, registrar decisión, decisiones-diseno, docs/decisions, autonomía de tareas
  Origen: 20260925T145156

- **Diseña los artefactos del sistema de forma genérica: la tecnología y las rutas del proyecto validado son datos de entrada, no parte del concepto.** Por qué: la épica y una tarea hablaban de anclar escenarios «a la suite QUnit», y el material de referencia de un skill citaba `todo-app/docs/ideas/` como modelo, una ruta que solo existe en este repositorio; ambos acoplan el diseño de Factory a la PoC. El concepto es «la suite de pruebas del proyecto» o «el directorio de ideas del proyecto evaluado», y la instancia concreta (tests.html, QUnit, la ruta de todo-app) vive en la Entrada de la tarea o queda fuera del artefacto.
  Disparadores: artefactos del sistema, épicas, tareas, propuestas, concepto genérico, PoC, todo-app, tecnología concreta, ruta de proyecto, references/, ancla, acoplamiento a implementación
  Origen: 20260925T145157, 20260928T160034
