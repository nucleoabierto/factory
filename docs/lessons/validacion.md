# Validación

## Lecciones

- **Cuando falte información para validar una tarea, genera datos sintéticos y haz la prueba de concepto.** El agente preguntó si esperar a que hubiera experiencias reales en lugar de probar con datos sintéticos; la prueba es la forma de validar.
  Disparadores: tareas sin datos de entrada, prueba de concepto, validación
  Origen: 20260920T135408

- **Al diseñar una prueba del sistema, el estímulo contiene el objetivo y las restricciones, nunca el procedimiento esperado.** Por qué: una semilla de prueba indicaba explícitamente qué skills invocar, revelando la ruta que la prueba debía medir; si la entrada revela el procedimiento, se valida obediencia a instrucciones y no la capacidad del sistema.
  Disparadores: semilla de prueba, escenario de validación, estímulo, datos sintéticos, prueba del flujo
  Origen: 20260920T222103

- **Al probar parsers o transformadores de formatos con variantes, ejercita cada variante en todas sus posiciones significativas antes de presentar el trabajo a aprobación.** Por qué: el parser de `## Estado` se probó solo con las formas felices de cada convención —la `x` marcando siempre «Completada»— y mapeaba marcador→estado, de modo que `[x] En revisión` devolvía `completada`; probar una variante solo en su posición canónica no detecta un mapeo equivocado que coincide por casualidad.
  Disparadores: parser, formato con variantes, pruebas de scripts, validación, tolerancia a formatos históricos
  Origen: 20261003T150000
