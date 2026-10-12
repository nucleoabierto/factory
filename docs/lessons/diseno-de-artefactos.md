# Diseño de artefactos del sistema

## Lecciones

- **Registra cada decisión de diseño dentro de la tarea que la consolida, no en una tarea transversal de registro.** Por qué: una propuesta descomponía el trabajo en una tarea independiente de «registrar decisiones» que dependía de todas las demás; eso rompe la autonomía de las piezas y retrasa decisiones que ya están maduras. El registro es un paso del cierre de la tarea, con `decisiones-diseno`.
  Disparadores: descomposición de tareas, borradores, propuestas, épica, registrar decisión, decisiones-diseno, docs/decisions, autonomía de tareas
  Origen: 20260925T145156

- **Diseña los artefactos del sistema de forma genérica: la tecnología y las rutas del proyecto validado son datos de entrada, no parte del concepto.** Por qué: la épica y una tarea hablaban de anclar escenarios «a la suite QUnit», y el material de referencia de un skill citaba `todo-app/docs/ideas/` como modelo, una ruta que solo existe en este repositorio; ambos acoplan el diseño de Factory a la PoC. El concepto es «la suite de pruebas del proyecto» o «el directorio de ideas del proyecto evaluado», y la instancia concreta (tests.html, QUnit, la ruta de todo-app) vive en la Entrada de la tarea o queda fuera del artefacto.
  Disparadores: artefactos del sistema, épicas, tareas, propuestas, concepto genérico, PoC, todo-app, tecnología concreta, ruta de proyecto, references/, ancla, acoplamiento a implementación
  Origen: 20260925T145157, 20260928T160034

- **Publica en la superficie de un artefacto solo lo que tiene consumidor; lo anticipado es YAGNI y se añade cuando aparezca su uso.** Por qué: un catálogo publicó dos operaciones marcándolas como «sin consumidor» por anticipado; ocupaban superficie pública sin uso y tuvieron que retirarse. El criterio aplica a cualquier superficie —catálogos, APIs, parámetros, secciones—: si nada la consume, no entra todavía.
  Disparadores: YAGNI, por anticipado, sin consumidor, catálogo, operaciones, API, superficie pública, parámetros, diseño de interfaz, publicar
  Origen: 20261011T021657

- **Antes de proponer retirar o degradar un artefacto, verifica su rol declarado: un artefacto de evidencia append-only no se degrada por perder lectores —su valor es la persistencia de la historia, no su consumo corriente.** Por qué: el plan de la tarea 136 evaluaba retirar `EXPERIENCIAS.md` si quedaba sin consumidor, aplicando la lección YAGNI por el lado equivocado; el registro es la fuente de verdad de las correcciones y su rol es conservar la evidencia, no servir consultas.
  Disparadores: retirar artefacto, registro, append-only, fuente de verdad, YAGNI, evidencia, refactor, EXPERIENCIAS.md
  Origen: 20261012T035528

- **Distingue artefacto entregable de estado de proceso efímero: lo efímero vive fuera del control de versiones y su ciclo de vida —quién lo crea y quién lo elimina— queda declarado.** Por qué: el informe de `revisar-pr` se diseñó persistido en `docs/pr-reviews` versionado, tratándolo como entregable; el usuario lo corrigió a estado local bajo `.git/` con limpieza al cerrar el PR, porque un informe intermedio no es contenido del producto.
  Disparadores: informe, estado local, artefacto efímero, .git/, ciclo de vida de artefacto, persistir, salida de skill, directorio de informes
  Origen: 20261012T172312
