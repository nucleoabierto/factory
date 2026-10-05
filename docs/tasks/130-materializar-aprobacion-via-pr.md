# Materializar la aprobación vía PR

## Estado

[ ] Pendiente | [~] En progreso | **[r] En revisión** | [x] Completada | [!] Bloqueada

## Tipo

desarrollo

## Objetivo

Materializar el flujo de aprobación vía PR según lo que determine la investigación de la tarea 129: la secuencia de cierre con **dos puertas humanas** —la de ejecución, el cambio revisado vía PR con su bucle de comentarios, y la de cierre, la aprobación final tras los sensores antes de cerrar el PR—, el skill encargado de crear el PR con la descripción orientada al revisor y de procesar los comentarios de GitHub como plan de mejoras, y el re-cableado de `ejecutar-tareas` y los skills del cierre.

## Dependencias

- Tarea 129 (`docs/tasks/129-investigacion-prs-punto-revision.md`): fija la secuencia, el formato del PR y el tratamiento de los comentarios.

## Entrada

- El documento de investigación de la tarea 129.
- Las convenciones de skills vigentes (D003, D004, D005).

## Resultado esperado

- `.agents/skills/<nombre>/SKILL.md` —el nombre lo decide la investigación— con frontmatter y convenciones: creación del PR con la descripción orientada al revisor y procesamiento de comentarios como plan de mejoras.
- `ejecutar-tareas/SKILL.md` ajustado: la secuencia de cierre con las dos puertas y el commit antes de la revisión humana.
- Cableado de los skills del cierre que la investigación determine y `README.md` actualizado.

## Criterios de calidad

- Implementa la recomendación de la investigación sin ampliarla.
- Las dos puertas quedan en la secuencia del ciclo: la de ejecución antes de los sensores y la de cierre después, antes de cerrar el PR.
- El PR se genera con la descripción que la investigación determine —el cambio y los puntos de atención del revisor, sin resumir el plan—.
- Los comentarios de GitHub disparan el plan de mejoras y el bucle vuelve a la revisión.
- Ambas aprobaciones quedan registradas en el archivo de tarea.
- `README.md` lista el skill nuevo.

## Procedimiento sugerido

1. Releer el documento de investigación y sus recomendaciones.
2. Escribir el `SKILL.md` con revisión de redacción y pulido mecánico preventivos.
3. Cablear `ejecutar-tareas` y los consumidores que la investigación determine; registrar el skill en el README.

## Notas

- Ninguna

## Contexto

- **Investigación base:** `docs/research/2026-10-prs-punto-revision.md` — fija la secuencia de dos puertas, el formato de la descripción del PR orientada al revisor, el triaje de comentarios y el registro de tres veredictos; la tarea la implementa sin ampliarla.
- **Archivos similares:**
  - `.agents/skills/mantener-changelog/SKILL.md`, `mantener-roadmap/SKILL.md`, `cerrar-conjunto/SKILL.md` — modelo de skill del cierre: frontmatter, «Cuándo usar/no usar», Entrada, Salida, Principios rectores, Procedimiento, Finalización, Referencias.
  - `.agents/skills/revisar-implementacion/SKILL.md` — el paso de revisión técnica que precede al PR.
  - `.agents/skills/ejecutar-tareas/SKILL.md` — el orquestador a recablear: pasos 8-18 del procedimiento y la sección «Enrutado por tipo».
  - `docs/mapa-de-flujos.md` — el cableado vigente que debe reflejar el cambio: ciclo de tareas, sensores de cierre, puertas humanas y artefactos de estado.
  - `README.md` — el registro de skills por flujo con tabla «Qué hace» por skill.
- **Patrones:** `SKILL.md` sigue el estándar Agent Skills —frontmatter `name`/`description`, cuerpo bajo 500 líneas, material detallado en `references/` si crece—; la description declara la capacidad completa, no la mecánica; las reglas van inline y las citas resolubles solo en «Referencias»; las listas declarativas se escriben abiertas; los pasos mecánicos se delegan en `actualizar-artefactos`/`consultar-artefactos` cuando el catálogo los cubre; el veredicto sin escritura se emite explícito («sin entrada», «sin cambios») en los sensores.
- **Dominio:** `docs/domains/001-ciclo-de-tareas.md` — la revisión dual, el estado sincronizado índice↔archivo y el invariante «un commit por tarea» que esta tarea transforma en «un PR por tarea con sus commits»; el trabajo descubierto sigue yendo a `crear-tareas`.
- **Producto:** `product-docs/vision.md` — la visión ya declara el producto «desde una idea suelta hasta un pull request integrado»; esta tarea cierra esa brecha en el motor interno.
- **PRD:** ninguna — la tarea es suelta, sin conjunto con PRD.
- **Lecciones:** `contratos-de-skills` — description a nivel de capacidad y resultado, nombre por la capacidad completa, entrada de ubicación de cambios en lugar de diff materializado, reglas inline—; `vocabulario` —español llano—; `consistencia-de-formatos` —respetar los formatos vigentes al tocar `ejecutar-tareas` y `README.md`—; `flexibilidad-en-procesos` —listas abiertas en el SKILL.md nuevo—; `estabilidad-temporal` —referenciar flujos por nombre—.
- **Decisiones:** D003 —skills autocontenidos que se cargan cuando son relevantes—; D004 —estándar Agent Skills con frontmatter `name`/`description`—; D005 —cuerpo bajo 500 líneas con `references/` progresivo—; D009 —la revisión dual que las dos puertas extienden—; D031 —el sub-flujo de desarrollo y su verificación nominal que el PR no duplica—; D033 —los pasos mecánicos compartidos viven en skills de utilidad con scripts en `assets/`—.

## Conectividad

**Conectada.** Todo lo que la tarea asume existe en el codebase: la estructura de skills bajo `.agents/skills/` con las convenciones vigentes, el orquestador `ejecutar-tareas` a recablear, el documento de investigación que fija la recomendación (`docs/research/2026-10-prs-punto-revision.md`), la operación `registrar-revision` de `actualizar-artefactos` que ya escribe líneas de veredicto arbitrarias en `## Revisión`, el `README.md` de la raíz como registro de skills y `docs/mapa-de-flujos.md` como descripción del cableado. La pieza de infraestructura nueva —la creación del PR— está cubierta: `gh` 2.101.0 instalado y remoto `origin` apuntando a `github.com:nucleoabierto/factory`.

## Plan técnico

Subsistema: el cierre de una tarea vive en `ejecutar-tareas` —revisión técnica por subagente, aprobación del usuario en sesión, sensores escribiendo sobre el árbol sin commitear y un commit único por tarea—. La investigación 129 convierte la aprobación humana en dos puertas —ejecución vía PR y cierre tras los sensores— y exige una rama por tarea: el trabajo se commitea en ella tras la aprobación técnica, los sensores escriben sobre ella y el merge la integra en `main`.

Decisiones transversales —la investigación dejó la materialización abierta—: rama `tarea/NNN-slug` creada al marcar la tarea en progreso, con todo el ciclo corriendo en ella y merge con `--squash` que preserva un commit por tarea en `main`; `## Revisión` pasa a tres veredictos —`Subagente`, `Usuario (ejecución)`, `Usuario (cierre)`—; los sensores no cambian —ya aceptan «árbol o rango de commits», ahora escriben en la rama y evalúan el rango de la tarea—; `commit` tampoco se toca —su contrato es el mismo, solo cambia cuándo lo invoca el orquestador—.

- [x] Crear `.agents/skills/gestionar-pr/SKILL.md` con dos momentos: apertura —commit del trabajo, push, `gh pr create` con descripción orientada al revisor, bucle de comentarios clasificados hasta la aprobación— y cierre —`gh pr merge` tras la puerta de cierre—
  - Aporta: encapsula toda la mecánica de `gh` y la política del bucle en un skill autocontenido; el resto del sistema no conoce GitHub
  - Contexto: la descripción se compone desde el archivo de la tarea + el informe de la revisión técnica + las pruebas ejecutadas; no resume el plan aprobado. Triage de comentarios: bloqueante → cambio; question → clarificar el código; suggestion/nit → aplicar o justificar en el hilo; fuera de alcance → `crear-tareas`; desacuerdo → usuario. Rondas por lotes —un plan de mejoras, commits agrupados, una nueva pasada de revisión—
- [x] Re-cablear la secuencia de `ejecutar-tareas`: rama al inicio → revisión técnica → apertura del PR (puerta de ejecución) → sensores en la rama → presentación del paquete de cierre (puerta de cierre) → marca `[x]` + commit final + merge → vuelta a `main`
  - Aporta: las dos puertas humanas quedan en los puntos exactos que fija la investigación
  - Contexto: sustituye los pasos 8–18 actuales; el informe de `revisar-implementacion` alimenta los puntos de atención de la descripción; los commits de la rama solo incluyen los cambios de la tarea —el árbol puede contener cambios ajenos—
- [x] Actualizar las plantillas de `## Revisión` a tres veredictos en `crear-tareas/assets/task.txt` y `actualizar-artefactos/assets/promocion.sh`
  - Aporta: toda tarea nueva nace con el formato que el ciclo rellena
- [x] Ajustar `revisar-implementacion` —su informe alimenta la descripción del PR y la aprobación final ya no es en sesión— y `registrar-experiencias` —los comentarios del PR cuentan como correcciones del usuario—
  - Aporta: los dos eslabones colindantes reflejan la nueva frontera sin cambiar sus contratos
- [x] Actualizar `docs/mapa-de-flujos.md`: secuencia con las dos puertas, el PR como artefacto transitorio de revisión, sensores escribiendo en la rama y la lista de puertas humanas
  - Aporta: la descripción del cableado queda coherente con el ciclo nuevo
- [x] Registrar `gestionar-pr` en `README.md` —tabla «Ejecución y cierre»—
  - Aporta: el inventario público queda completo
- [x] `revisar-redaccion` + `pulir-escritura` preventivos sobre los SKILL.md nuevos o tocados
  - Aporta: cadena preventiva del proyecto

## Suite de pruebas esperada

1. Al cerrar una tarea con revisión técnica aprobada, `gestionar-pr` produce un PR abierto cuya descripción contiene qué cambia, por qué, puntos de atención del informe y pruebas ejecutadas —sin resumen del plan— (O).
2. Un comentario del PR que exige cambio produce un plan de mejoras, implementación, verificación y una nueva pasada de revisión sobre la misma rama (O).
3. Una ronda con comentarios de varios tipos los procesa por lotes según la clasificación —bloqueante, pregunta, sugerencia, fuera de alcance, desacuerdo— (M).
4. Un PR sin comentarios pasa la puerta de ejecución con la sola aprobación, sin rondas (Z).
5. Un comentario fuera de alcance deriva a `crear-tareas` sin modificar el diff del PR (B).
6. La secuencia de `ejecutar-tareas` sitúa la puerta de ejecución antes de los sensores y la de cierre después de ellos y antes del merge (B).
7. Las escrituras de los sensores —changelog, dominio, producto— aterrizan en la rama del PR y entran en el mismo merge (I).
8. Toda tarea nueva —`crear-tareas` o promoción— nace con `## Revisión` de tres veredictos, y el ciclo los rellena (I).
9. El merge deja un solo commit por tarea en `main` y la sesión vuelve a `main` limpia (regresión).
10. `README.md` lista `gestionar-pr` y `mapa-de-flujos.md` describe las dos puertas y el PR como artefacto de revisión (regresión).

## Desviaciones del plan

- El ítem de los eslabones colindantes cubrió además `desarrollar-tarea`: su principio «Acotado a una tarea» citaba «revisión dual» y «commit», terminología del modelo anterior que quedaba incoherente con el re-cableado.
  - Motivo: consistencia de vocabulario en los skills hermanos tocados por el cambio de ciclo.
  - Decisión: absorberlo como parte del mismo ajuste de frontera; no cambia objetivo ni criterios de la tarea.
- El plan fijaba la rama como `tarea/NNN-slug` literal; a petición del usuario la convención se generalizó: el nombre deriva del identificador de la tarea —el nombre de su archivo— bajo el prefijo `tarea/` por defecto, y cede ante la convención de ramas que el proyecto evaluado declare. Las referencias a `main` pasaron a «la rama principal» por la misma razón.
  - Motivo: la convención literal acotaba el skill al repositorio actual; los skills operan sobre cualquier proyecto evaluado.
  - Decisión: aplicar la generalización en `ejecutar-tareas`, `gestionar-pr`, `mapa-de-flujos` y `README`.
- El plan declaraba la secuencia «puerta de cierre → marca `[x]` + commit final + merge»; la implementación marca la tarea `[x]` tras la puerta de ejecución, antes de los sensores.
  - Motivo: `cerrar-conjunto` solo detecta la agrupación agotada cuando la tarea figura `[x]`, y `mantener-roadmap` refleja el estado real del índice —marcarla completada tras la puerta de cierre rompería ambos—; es además la estructura del ciclo anterior, donde la aprobación precedía a los sensores. La consecuencia aceptada: si la puerta de cierre solicita cambios, la tarea ya figura completada y la corrección se itera sobre el paquete o vuelve por el bucle del PR.
  - Decisión: mantener el orden `[x]` → sensores → paquete → puerta de cierre → merge, registrado aquí; detectado en la revisión técnica de esta misma tarea.
- La lista de archivos del plan no nombraba `docs/definicion-proyecto.md`, `PERSONALIZE.md` ni `teleprompter.json`; se actualizaron por coherencia con el ciclo nuevo —describían «revisión dual» y «hasta el commit»— y `gestionar-pr` se registró en el `install` del manifiesto del paquete.
  - Motivo: documentos descriptivos del mismo ciclo dentro del radio del cambio; sin su actualización quedaban incoherentes con el README.
  - Decisión: absorberlos en la misma pasada de consistencia, detectado en la revisión técnica.

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario (ejecución): [fecha] — [Aprueba | Solicita cambios]
- Usuario (cierre): [fecha] — [Aprueba | Solicita cambios]
