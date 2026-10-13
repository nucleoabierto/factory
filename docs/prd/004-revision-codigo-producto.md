# PRD — Revisión de código como capacidad del producto

Quien gestiona un producto con Factory solo puede someter a revisión los cambios que el propio sistema produjo; los *pull requests* de origen ajeno —otro agente, un colaborador, otro flujo— se revisan a mano o se aceptan con la evaluación del propio autor. Y en sentido contrario, la revisión que un PR propio recibe llega como una lista sin clasificar. Este conjunto lleva la revisión a ambos sentidos: el usuario obtiene un informe con veredicto sobre cualquier PR y un triage accionable de la revisión recibida.

## Usuarios

Desarrolladores y *product managers* que gestionan un producto con un agente de IA: a veces revisan código que no escribió el sistema (bloque revisor) y a veces su propio cambio recibe revisión externa que hay que procesar (bloque autor).

## Casos de uso

- **CU-1 — Revisar un PR ajeno:** el usuario señala un PR del proyecto; el sistema reconstruye el diff y la intención del cambio, lo confronta con las convenciones y la memoria del proyecto, y entrega un informe con hallazgos por severidad y un veredicto (merge, improve o blocked).
  - El informe es estado local del entorno —fuera del control de versiones— y se elimina al cerrar el PR.
  - El PR ya tiene revisión previa: los hilos resueltos no se duplican en el informe.
  - La intención del cambio no se puede reconstruir: el veredicto es `blocked` y las dudas van a preguntas abiertas.
- **CU-2 — Comentar la revisión:** con el informe en la mano, el usuario confirma el lote de comentarios y el sistema los publica en el PR; cada comentario se entiende por sí solo, sin el informe.
  - El usuario descarta comentarios en la confirmación: solo los aceptados se publican.
  - Solo se publica feedback objetivo con impacto real en el código: los nits de estilo, preferencia personal o fuera de alcance no llegan al lote.
  - Un informe que no corresponde al head actual del PR está obsoleto: la publicación exige revisar de nuevo.
- **CU-3 — Clasificar la revisión recibida:** sobre un PR propio con comentarios, el sistema entrega el triage —cada hilo abierto con su acción (corregir, responder, aplazar), severidad y propuesta— en un documento persistido.
  - Un hilo de intención ambigua va a preguntas abiertas, no a una suposición.
  - Un comentario incorrecto es una discrepancia: se clasifica `responder` con la refutación y el código como evidencia; `aplazar` lo validaría implícitamente.
- **CU-4 — Mejorar el cambio:** desde el triage, el sistema aplica las correcciones al árbol de trabajo, redacta las respuestas y documenta los aplazamientos; el usuario revisa el resultado y publica.
  - Una corrección que contradice el cambio o una convención se eleva al usuario, no se resuelve en silencio.

## Comportamiento esperado

- **Revisión:** todo hallazgo cita la regla o el patrón infringido; los hilos ya resueltos nunca aparecen duplicados; «no hay hallazgos» es un veredicto válido; sin contexto suficiente, el veredicto es `blocked` con preguntas abiertas —nunca suposiciones—.
- **Comentarios:** cada comentario publicado sigue *conventional comments* y es autocontenido —problema, anclaje y contexto—; nada llega a la plataforma sin confirmación del usuario.
- **Triage:** cada hilo abierto queda clasificado exactamente una vez; los resueltos y los ya triagiados se omiten; un aplazamiento siempre lleva su razón.
- **Mejora:** las correcciones respetan las convenciones y lecciones del proyecto; las respuestas y el push esperan confirmación, igual que la publicación de comentarios.

## Criterios de éxito

El usuario revisa un PR ajeno sin abrir el diff a mano, publica feedback que el autor entiende por sí solo, y procesa la revisión recibida sin clasificar hilos a mano —todo con el mismo criterio de calidad que el sistema aplica a su propio trabajo.

## Fuera de alcance

Revisar diffs que no sean un PR; ejecutar las puertas mecánicas del proyecto (tests, lint, build); fusionar PRs; publicar o responder sin confirmación; plataformas de código que `gh` no cubre; reemplazar la revisión interna del ciclo de tareas por la capacidad nueva (convergencia posible, no parte de este conjunto).
