# D033: Pasos mecánicos compartidos en skills de utilidad con scripts

## Estado

Aceptada

## Contexto

La revisión de los flujos detectó una treintena de pasos mecánicos repetidos en los skills —mutaciones de `TODO.txt`, campos de los archivos de tarea, índices de decisiones y de lecciones, `EXPERIENCIAS.md` y `CHANGELOG.md`— que hoy se re-describen en cada `SKILL.md`. Los formatos sobre los que operarían los scripts muestran además derivas: tres convenciones conviven en el campo `## Estado` de los archivos de tarea y la posición de `## Desviaciones del plan` diverge entre documentos. D003 exige skills autocontenidos, lo que entra en tensión con cualquier forma de compartir scripts entre ellos.

## Decisión

Encapsulamos los pasos mecánicos compartidos por varios skills en skills de utilidad invocables: el consumidor delega la orden —archivo objetivo, operación y términos— y el skill de utilidad la ejecuta con scripts bash propios en su `assets/`. La mecánica de un solo consumidor vive como script interno de su skill; la lectura simple que el arnés ya resuelve (`read`, `grep`, `git`) no se delega. Los scripts siguen un contrato único:

- Reciben la entrada por argumentos o `stdin`; `stdout` queda reservado a datos parseables y `stderr` a diagnósticos.
- Devuelven `0` en caso de éxito, incluido el vacío legítimo, y `2` cuando falta la entrada.
- Nunca emiten datos sintetizados; una mutación ante un formato no parseado falla sin escribir.

Fijamos además la forma canónica de dos campos de los archivos de tarea; los parsers la escriben siempre y toleran las variantes históricas:

- `## Estado`: la línea completa de opciones `[ ] Pendiente | [~] En progreso | [r] En revisión | [x] Completada | [!] Bloqueada`, con la opción vigente en negrita, marcador y etiqueta incluidos (`**[x] Completada**`).
- `## Desviaciones del plan`: inmediatamente antes de `## Revisión`, que sigue siendo la última sección del archivo.

## Justificación

Se descartaron tres alternativas: scripts compartidos en un directorio común, que rompen la autocontención de D003 y crean un acoplamiento invisible entre skills; seguir re-describiendo los formatos en cada skill, que es el origen de la deriva observada; y un parser en un lenguaje de más alto nivel, innecesario porque los formatos son orientados a líneas y bash con grep/awk/sed basta —si un script creciera en complejidad, la desviación se registra en la tarea correspondiente. Delegar a nivel de orden —archivo, operación, términos— y no a nivel de mecánica mantiene al consumidor declarando la capacidad, coherente con la lección «Contratos de skills». La canonicalización aplica solo hacia adelante, sin reescribir archivos históricos: el mismo criterio que D028. Los parsers toleran las variantes existentes —el estado suelto (`[x] Completada`), la línea de opciones con la casilla activa marcada y la negrita aplicada solo a la etiqueta— y escriben la forma canónica. Las derivas quedaron acreditadas en `docs/tasks/` de este repositorio y en los de los proyectos evaluados (`todo-app`, `modern-todo-app`) al registrar la decisión.

## Referencias

- `docs/tasks/113-delegacion-mecanica-scripts.md` — tarea que consolida la decisión.
- `docs/epics/003-delegacion-mecanica-scripts.md` — épica que la enmarca.
