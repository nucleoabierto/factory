# Contratos de skills

## Lecciones

- **Declara la `description` del front-matter a nivel de capacidad y resultado, no de mecánica interna.** Por qué: la descripción de `ejecutar-implementacion` narraba el procedimiento («marcando cada acción de la checklist… delegando a subagentes…»), acoplando el contrato al procedimiento; el resultado es «devuelve el diff con el registro de desviaciones» y el procedimiento vive en el cuerpo del skill. Enumerar en la description el contenido que el skill produce —por ejemplo, las fuentes que recopila— es la misma brecha: acopla el contrato a la implementación y lo desfasará cuando el contenido cambie.
  Disparadores: skills, SKILL.md, front-matter, description, nuevo skill, editar descripción de skill
  Origen: 20260925T113207, 20260926T102400, 20260928T185609

- **Al delegar una acción en un subagente, el retorno es la explicación de lo hecho más los archivos tocados, y el ejecutor decide revisar o confiar según la complejidad.** Por qué: la delegación se diseñó como «el subagente devuelve un diff que el ejecutor aplica y verifica», lo que exige verificación mecánica siempre; el protocolo real es explicación + archivos y la decisión revisar/confiar es del ejecutor según la explicación y el tamaño de la acción.
  Disparadores: skills, SKILL.md, subagente, delegar, delegación, checklist, diff, revisar o confiar
  Origen: 20260925T113208

- **Describe las reglas inline en los skills; las citas a decisiones u otros documentos van resolubles (ruta y descripción) solo en la sección de referencias.** Por qué: un skill citaba «(D019)» sin explicar qué decidía, obligando a abrir el archivo de decisión para entender la regla. La cita desnuda no aporta contexto; la regla debe ser comprensible sin salir del documento.
  Disparadores: skills, SKILL.md, referencia a decisión, DNNN, citas, referencias, reglas inline
  Origen: 20260921T011530

- **Nombra el skill por la capacidad completa que ofrece —el artefacto que crea y mantiene—, no por la acción inicial.** Por qué: un documento propuso `generar-guia-estilo` para un skill que además mantiene la guía viva; el nombre acoplado al acto inicial de generar ocultaba el mantenimiento, y se renombró `documentar-guia-estilo`, simétrico a `documentar-dominio`.
  Disparadores: skills, SKILL.md, nombre de skill, renombrar skill, nuevo skill, capacidad
  Origen: 20260926T134312

- **Un skill que mantiene un artefacto decidido por humanos incluye un modo interactivo de definición o actualización por diálogo con el usuario.** Por qué: `documentar-guia-estilo` solo contemplaba crear la guía por extracción del código y mantenerla como sensor; sin el modo interactivo toda decisión de diseño quedaba subordinada a la ejecución —primero se decide en discusión, después se materializa: la ejecución consume la decisión, no la sustituye.
  Disparadores: skills, SKILL.md, modo interactivo, diálogo con el usuario, documentar, artefacto vivo, sensor
  Origen: 20260926T135837

- **La entrada de un skill que opera sobre cambios es la ubicación de los cambios —árbol de trabajo o rango de commits—, no un diff materializado: el skill lo reconstruye con git.** Por qué: el paso de cierre y el skill de changelog declaraban «el diff de la tarea» como entrada, cuando el resto de los skills reciben la ubicación y reconstruyen el diff ellos mismos; materializar el diff acopla el contrato a un artefacto que el invocador tendría que producir.
  Disparadores: skills, SKILL.md, entrada de skill, diff, ubicación de cambios, sensor de cierre, revisar-implementacion
  Origen: 20260929T185349

- **Al lanzar una revisión por subagente, acota el alcance desde el inicio —puntos de mayor riesgo, muestra de los puntos de contacto y formato de informe breve— en lugar de pedir cobertura exhaustiva.** Por qué: una revisión lanzada sin acotar tardó tanto que hubo que interrumpirla; la versión acotada a lo de mayor riesgo y una muestra del cableado completó rápido con el mismo veredicto útil.
  Disparadores: subagente, revisión, revisión técnica, alcance de revisión, lanzar subagente, informe
  Origen: 20261004T133821
