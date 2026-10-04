# Lecciones

Índice de lecciones aprendidas, consolidadas desde `EXPERIENCIAS.md` por el skill `consolidar-lecciones`. `consultar-lecciones` lo consulta para recuperar las lecciones que aplican a un trabajo; `ejecutar-tareas` lo invoca al leer una tarea.

<!-- Formato de cada entrada: el tema en su línea y los datos como
     sub-bullets, con los disparadores siempre en la primera posición
     para que una búsqueda los encuentre sin arrastrar el resumen.

     - <tema>.md
       - Disparadores: [archivos, comandos, palabras clave]
       - Resumen: [una frase]
-->

- validacion.md
  - Disparadores: prueba de concepto, validación, tareas sin datos de entrada, semilla de prueba, escenario de validación, estímulo, parser, formato con variantes, pruebas de scripts, tolerancia a formatos históricos
  - Resumen: Diseñar el estímulo de la prueba con objetivo y restricciones —y datos sintéticos si falta información— sin revelar el procedimiento esperado; ejercitar cada variante de formato en todas sus posiciones significativas antes de aprobación.
- estabilidad-temporal.md
  - Disparadores: skills, SKILL.md, flujo, flujo N, referencia a proceso, orquestador, investigaciones, docs/research, editar documentos existentes, cambio de formato, historial, commits
  - Resumen: El conocimiento del proyecto debe seguir válido y fiel al evolucionar: referenciar elementos por nombre o hash y no editar retroactivamente los documentos de entrada.
- flexibilidad-en-procesos.md
  - Disparadores: skills, SKILL.md, categorías, taxonomía, lista de opciones, lista de fuentes, forma de solución, contexto de la tarea
  - Resumen: Declarar las listas declarativas de los skills como abiertas y extensibles para no volver rígidos los procesos.
- consistencia-de-formatos.md
  - Disparadores: plantillas, assets, formato, nuevo documento, nuevo skill, archivo existente, entrada de registro, EXPERIENCIAS.md
  - Resumen: Las plantillas nuevas mantienen la estructura común de los formatos del proyecto; las entradas con varios campos usan listas anidadas; al escribir en un archivo con formato establecido se respeta el formato vigente.
- alcance.md
  - Disparadores: alcance, auditoría, corrección transversal, archivos ajenos a la tarea, fuera de alcance, documento desfasado, hallazgo del mismo tema
  - Resumen: Los hallazgos fuera del alcance se reportan o registran, no se corrigen directamente; si el hallazgo toca el mismo tema que la tarea, se ofrece absorberlo en ella.
- anclas-y-trazabilidad.md
  - Disparadores: docs/domains, documentación de dominio, glosario, ancla, trazabilidad, deriva, referencia a código
  - Resumen: El ancla de un documento de dominio apunta al código (lo que cambia) para detectar deriva; la procedencia es un campo «Origen» aparte.
- vocabulario.md
  - Disparadores: redacción, SKILL.md, documentos, texto en español, derivaciones, participios
  - Resumen: Usar vocabulario llano del español; no acuñar derivaciones cuando existe la forma estándar.
- nomenclatura.md
  - Disparadores: nuevo directorio, docs/, nombre de directorio, nomenclatura, ubicación de documentos, persistir documentos, nuevo índice
  - Resumen: Nombrar directorios y artefactos por el tipo específico de contenido que almacenan, no por la operación genérica.
- contratos-de-skills.md
  - Disparadores: skills, SKILL.md, front-matter, description, nuevo skill, nombre de skill, modo interactivo, subagente, delegar, delegación, checklist, referencia a decisión, citas, reglas inline, diff, ubicación de cambios, sensor de cierre
  - Resumen: El contrato que un skill declara va a nivel de resultado —nombre y description hablan de la capacidad completa, no de la acción inicial ni de la mecánica; las reglas van inline, la delegación devuelve explicación + archivos, la entrada sobre cambios es la ubicación y no un diff, y los artefactos decididos por humanos piden modo interactivo.
- diseno-de-artefactos.md
  - Disparadores: artefactos del sistema, épicas, tareas, propuestas, borradores, registrar decisión, concepto genérico, PoC, ancla, ruta de proyecto, references/
  - Resumen: Los artefactos del sistema se diseñan autónomos y genéricos: cada tarea registra su propia decisión y la tecnología o las rutas del proyecto validado son datos de entrada, no parte del concepto.
