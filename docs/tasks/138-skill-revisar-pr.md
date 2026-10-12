# Capacidad de revisión de un pull request arbitrario

## Estado

[ ] Pendiente | [~] En progreso | **[r] En revisión** | [x] Completada | [!] Bloqueada

## Tipo

desarrollo

## Objetivo

Crear el skill `revisar-pr`: el bloque revisor de la revisión como capacidad del producto. Somete un *pull request* arbitrario del proyecto evaluado a la misma revisión independiente que hoy solo recibe el trabajo interno, y produce un informe persistido con hallazgos por severidad y un veredicto.

## Dependencias

- Ninguna

## Entrada

- La forma de solución validada de la propuesta y el skill `revisar-implementacion` como referencia de los principios de revisión (contexto aislado, rol adversarial, consistencia con el código base, hallazgos citados, cotejo de lecciones).
- Un PR del proyecto evaluado, identificable por número (o por la rama actual si el usuario no da número).

## Resultado esperado

- `.agents/skills/revisar-pr/SKILL.md` con su declaración de skill y procedimiento, registrado en el manifiesto de distribución del proyecto evaluado.
- Procedimiento que cubre: resolución del PR (número dado, o el de la rama actual vía `gh`); reconstrucción del diff y del historial de la rama contra su base; carga de los hilos de revisión existentes —abiertos y resueltos— para no duplicar feedback ya resuelto; revisión contra convenciones, archivos hermanos, reglas declaradas y lecciones aprendidas del proyecto evaluado (cotejo por disparadores, delegado en `consultar-artefactos`); producción del informe.
- El informe se escribe en disco bajo una ubicación de la convención del proyecto evaluado —configurable, como los demás artefactos— y contiene: resumen del cambio, criterios o intención reconstruida, hallazgos ordenados por severidad —blocker, important, nit— cada uno citando la regla o patrón infringido, y un veredicto único: `merge`, `improve` o `blocked` (este último cuando falte contexto para juzgar con justicia).
- Resumen del veredicto en chat.

## Criterios de calidad

- El skill no exige que el PR provenga del ciclo de tareas: funciona sobre cualquier PR accesible con `gh` en el proyecto evaluado.
- Reusa los principios de `revisar-implementacion` —contexto aislado del subagente revisor, rol adversarial, hallazgos citados con su regla o patrón, lecciones por disparadores— sin copiar sus secciones atadas al archivo de tarea (plan nominal, suite esperada, desviaciones).
- La intención del cambio se reconstruye desde la descripción del PR y los artefactos del proyecto evaluado cuando existan (tarea, épica, documentación); lo no reconstruible va a preguntas abiertas del informe, no a suposiciones.
- Solo análisis: el skill no publica comentarios, no corrige código, no fusiona.
- Los comentarios publicables quedan fuera: son el borrador siguiente.
- Declaración y formato coherentes con los skills existentes; ubicación del informe por convención, no por literal.

## Procedimiento sugerido

1. Leer `revisar-implementacion` y extraer los principios transferibles a un PR arbitrario, separándolos de lo que es contrato del ciclo de tareas.
2. Diseñar el encargo del subagente revisor: recibe la referencia del PR y la ubicación del informe; reconstruye el diff con `gh`/`git`; carga hilos existentes; revisa contra convenciones, hermanos, reglas y lecciones; produce el informe con veredicto.
3. Definir la convención de ubicación del informe —siguiendo el patrón de las demás ubicaciones configurables— y el formato del informe.
4. Escribir el `SKILL.md`, registrarlo en el manifiesto y actualizar los documentos vivos que catalogan skills si aplica.

## Notas

- El veredicto del informe alimenta la puerta humana del usuario; la aprobación del merge sigue siendo suya, como en el resto del sistema.

## Contexto

- `Archivos similares:` `.agents/skills/revisar-implementacion/SKILL.md` — modelo de los principios de revisión a transferir (contexto aislado, rol adversarial, archivos hermanos, hallazgos citados, lecciones por disparadores); `.agents/skills/revisar-arquitectura/SKILL.md` — modelo de informe persistido bajo convención (`dir_revisiones_arquitectura`) y de revisión solo-análisis; `.agents/skills/gestionar-pr/SKILL.md` — único skill que hoy opera sobre `gh` (crear, ver y fusionar PRs), referencia del patrón de invocación.
- `Patrones:` frontmatter Agent Skills con `name` y `description` a nivel de capacidad; estructura común de secciones (Cuándo usar / Cuándo no usar / Entrada / Salida / Principios rectores / Procedimiento / Finalización / Referencias); las ubicaciones configurables se resuelven con la operación `convencion` de `consultar-artefactos`, nunca como literal; el subagente revisor se lanza con contexto aislado y capacidad de ejecutar comandos, con alcance acotado; `convencion.sh` lleva un catálogo cerrado de claves —una clave nueva exige registrarla en su `case`, en sus valores por defecto, en `convenciones.sh` de los cuatro gestores y en `PERSONALIZE.md`—; `teleprompter.json` es el manifiesto de distribución, en orden alfabético.
- `Dominio:` `docs/domains/001-ciclo-de-tareas.md` — el ciclo con pull request y dos puertas humanas con el que la revisión externa convive; `docs/domains/003-subflujo-desarrollo.md` — la revisión interna del diff cuyos principios se transfieren sin su contrato de tarea.
- `Producto:` `product-docs/vision.md` — declara la revisión de código como brecha del producto que esta tarea comienza a cerrar.
- `PRD:` `docs/prd/004-revision-codigo-producto.md` — CU-1 «Revisar un PR ajeno»: informe con hallazgos por severidad y veredicto merge/improve/blocked; los hilos resueltos no se duplican; la intención no reconstruible produce `blocked` con preguntas abiertas.
- `Lecciones:` `contratos-de-skills.md` — description a nivel de capacidad y resultado, reglas inline, la entrada es la referencia del PR y no un artefacto materializado, subagente con alcance acotado desde el encargo; `consistencia-de-formatos.md` — estructura común de los skills del proyecto; `flexibilidad-en-procesos.md` — las listas declarativas (fuentes de intención, aspectos de revisión) se declaran abiertas; `vocabulario.md` — español llano.
- `Decisiones:` D003 — skills como unidades autocontenidas; D004 — estándar Agent Skills (`.agents/skills/`, frontmatter solo con `name` y `description`); D005 — cuerpo bajo 500 líneas, material detallado en `references/`; D033 — la mecánica sobre artefactos se delega en los gestores cuando aplica.

## Conectividad

**Veredicto: conectada.**

Todo lo que la tarea asume existe en el codebase: `revisar-implementacion` aporta los principios transferibles (contexto aislado, adversarial, hermanos, lecciones por disparadores); `revisar-arquitectura` el modelo de informe persistido bajo convención; `gh` está autenticado contra GitHub con scope `repo` y la API de hilos de revisión (`repos/{owner}/{repo}/pulls/<n>/comments`) responde; la operación `convencion` de `consultar-artefactos` resuelve ubicaciones configurables; `teleprompter.json` es el manifiesto. Lo que no existe —la clave de convención del directorio de informes de revisión de PR— es absorbible por la propia tarea: registrarla sigue el procedimiento ya practicado (catálogo en `convencion.sh`, valores por defecto, `convenciones.sh` de los cuatro gestores y `PERSONALIZE.md`).

## Plan técnico

Subsistema: Factory es una colección de skills autocontenidos en `.agents/skills/` —cada uno con `SKILL.md` bajo el estándar Agent Skills y la estructura común de secciones—. La revisión interna vive en `revisar-implementacion` (subagente aislado adversarial que reconstruye el diff con git); `revisar-arquitectura` es el modelo de informe persistido bajo una ubicación de convención resuelta con `consultar-artefactos`; `gestionar-pr` es el único skill que hoy opera sobre `gh`. El catálogo de convenciones es cerrado: `convencion.sh` resuelve claves registradas (case + valores por defecto) sobre `convenciones.sh`, idéntico en los cuatro gestores y declarado en `PERSONALIZE.md`.

Decisiones transversales (de la épica): subagente revisor con contexto aislado y rol adversarial; informe persistido bajo convención; solo análisis —no publica, no corrige, no fusiona—; PR por número o rama actual; intención no reconstruible → `blocked` con preguntas abiertas.

- [x] Registrar la convención del directorio de informes de revisión de PR — clave `dir_revisiones_pr` con valor por defecto `docs/pr-reviews`, en los cinco puntos del catálogo: `case` y defaults de `convencion.sh`, las cuatro `convenciones.sh` de los gestores y la lista de `PERSONALIZE.md`
  - Aporta: el informe queda bajo una ubicación configurable como el resto de artefactos del sistema; sin la clave registrada no hay resolución posible
  - Contexto: el catálogo de `convencion.sh` es cerrado —una clave desconocida sale con exit 1—; las claves de rutas ya registradas (`dir_revisiones_arquitectura`) son el patrón a seguir
- [x] Escribir `.agents/skills/revisar-pr/SKILL.md` con el procedimiento del bloque revisor: resolución del PR (número dado, o el de la rama actual vía `gh`), reconstrucción de la intención desde la descripción y los artefactos del proyecto cuando existan, lanzamiento del subagente aislado que reconstruye diff, historial e hilos —con su estado abierto/resuelto— y produce el informe persistido, y resumen del veredicto en chat
  - Aporta: la capacidad misma —revisión independiente de cualquier PR del proyecto evaluado
  - Contexto: los principios transferibles de `revisar-implementacion` sin su contrato de tarea (sin plan nominal, suite ni desviaciones); el estado de los hilos solo lo expone la API GraphQL (`reviewThreads.isResolved`), verificado; el encargo del subagente acota el alcance —puntos de mayor riesgo, muestra de hermanos— y fija el formato del informe; «no hay hallazgos» es veredicto válido; la referencia a `comentar-pr` como capacidad hermana va en «Cuándo no usar»
- [x] Definir el formato del informe dentro del propio `SKILL.md`: cabecera (fecha, PR, base/head, autor), resumen del cambio, intención reconstruida con sus fuentes, hallazgos por severidad —blocker, important, nit— citando la regla o patrón infringido, preguntas abiertas y veredicto único (`merge`/`improve`/`blocked`); el nombre del archivo es `pr-<numero>-<fecha>.md`
  - Aporta: fija el vocabulario que `comentar-pr` (139) consumirá —la dependencia declarada en la épica
  - Contexto: el formato sigue la estructura plana de los informes del sistema (lección de consistencia de formatos); `<fecha>` en `yyyymmdd` permite re-revisiones del mismo PR sin serie numerada
- [x] Registrar el skill en `teleprompter.json` en su posición alfabética
  - Aporta: el skill entra en la distribución del paquete
- [x] Actualizar los documentos vivos: `README.md` (tabla de skills, en la familia de revisión/calidad), `docs/mapa-de-flujos.md` (capacidad nueva + directorio `docs/pr-reviews/` junto a los demás artefactos) y `docs/definicion-proyecto.md` (capacidad de revisión como producto)
  - Aporta: la documentación viva queda fiel a la capacidad instalada

## Suite de pruebas esperada

Trazadas a CU-1 del PRD («Revisar un PR ajeno», `docs/prd/004-revision-codigo-producto.md`):

- Invocado con un número de PR, el skill produce un informe persistido con resumen del cambio, intención reconstruida, hallazgos por severidad y un único veredicto `(O)`
- Invocado sin número en una rama con PR abierto, resuelve el PR por la rama actual `(I)`
- El informe se escribe bajo la ubicación que resuelve la convención `dir_revisiones_pr`, no en un literal `(B)`
- Sobre un PR con hilos resueltos, el informe no duplica feedback ya resuelto `(B)`
- Con intención no reconstruible, el veredicto es `blocked` y las dudas figuran como preguntas abiertas, no como suposiciones `(E)`
- Un PR sin problemas produce veredicto `merge` sin hallazgos inventados `(Z)`
- Cada hallazgo cita la regla declarada o el patrón concreto que infringe
- El skill no publica comentarios, no corrige código, no fusiona — solo análisis `(B)`
- Funciona sobre un PR sin artefactos del ciclo de tareas — no exige archivo de tarea, plan ni suite `(E)`
- `convencion dir_revisiones_pr` resuelve `docs/pr-reviews` tras el registro, y la clave figura en los cinco puntos del catálogo
- `bash -n` pasa sobre `convencion.sh` y las cuatro `convenciones.sh`; `teleprompter.json` queda JSON válido con la entrada en orden alfabético

## Desviaciones del plan

- **El informe no se persiste dentro del repositorio.** El plan fijaba el directorio `docs/pr-reviews` bajo la convención `dir_revisiones_pr`; por corrección del usuario, los informes de revisión son estado local efímero fuera del control de versiones. Decisión: la convención se mantiene —`comentar-pr` la resolverá igual— pero su valor por defecto pasa a `.git/factory/pr-reviews`, local por clon y nunca trackeado.
- **`gestionar-pr` gana un paso de limpieza en el cierre.** Misma corrección del usuario: al fusionar un PR, los informes `pr-<n>-*.md` del directorio de la convención se eliminan si existen. El skill `gestionar-pr` entra así en el alcance de la tarea —modificación de un skill existente, no solo creación—.
- **El formato del informe vive en una plantilla de , no inline.** Corrección del usuario: el plan declaraba el formato dentro del ; los formatos de artefactos que un skill producen van como plantilla en  —como ,  o —. Decisión:  con la estructura y los placeholders; la Salida la referencia y el subagente la recibe por ruta.

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario (ejecución): [fecha] — [Aprueba | Solicita cambios]
- Usuario (cierre): [fecha] — [Aprueba | Solicita cambios]
