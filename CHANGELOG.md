# Changelog

Todos los cambios notables de este proyecto se documentan en este archivo.

El formato sigue [Keep a Changelog](https://keepachangelog.com/en/2.0.0/)
y el proyecto se adhiere a [Versionado Semántico](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Coherencia del roadmap con la ejecución: el skill `cerrar-conjunto` cierra los conjuntos agotados del índice de tareas —verifica el criterio de cierre de la épica contra el resultado real, la marca `Completada` y elimina la agrupación— y el skill `mantener-roadmap` refleja mecánicamente el estado de las líneas comprometidas del roadmap, retira las completadas e invoca la replanificación ante divergencia de dirección ([docs/epics/002-coherencia-roadmap-ejecucion.md](docs/epics/002-coherencia-roadmap-ejecucion.md))

### Fixed

- El subagente revisor del ciclo se lanza con capacidad de ejecutar comandos —git para reconstruir el diff por sí mismo—; sin ella la revisión se degradaba a inspección del árbol sin diff ([docs/tasks/120-revisor-con-capacidad-ejecucion.md](docs/tasks/120-revisor-con-capacidad-ejecucion.md))

## [0.2.0] - 2026-10-03

### Added

- Documentación del cableado de los skills: `docs/mapa-de-flujos.md` describe los orquestadores, las capacidades en orden, los sensores de cierre, los artefactos que transportan el estado y las puertas humanas, con su resumen en el README ([docs/tasks/112-documentar-conexion-flujos.md](docs/tasks/112-documentar-conexion-flujos.md))
- Empaquetado como paquete teleprompter: `teleprompter.json` declara el paquete `factory` 0.2.0 —primer release público— que instala los 32 skills en `.agents/skills/` del repositorio destino como unidades instalables individuales, con `PERSONALIZE.md` como guía para el agente instalador y licencia MIT ([docs/tasks/118-paquete-teleprompter-factory.md](docs/tasks/118-paquete-teleprompter-factory.md), [docs/tasks/119-install-por-skill-teleprompter.md](docs/tasks/119-install-por-skill-teleprompter.md))

## [0.1.0] - 2026-09-29

### Added

- Flujo de idea a tarea: `lluvia-de-ideas` persiste ideas sueltas en `docs/ideas/`, `descubrir-problema`, `proponer-forma-solucion` y `refinar-propuesta` las refinan en una propuesta con borradores de tarea progresivos, e `idea-a-tarea` orquesta las tres fases; `crear-tareas` promociona los borradores aprobados a tareas definitivas
- Planeación: `planificar` produce el documento de épica en `docs/epics/` y `planificar-roadmap` mantiene `ROADMAP.md` organizado en horizontes Now/Next/Later; `ejecutar-tareas` enruta cada tarea a su skill especialista según el campo «Tipo»
- Sub-flujo de desarrollo: `recopilar-contexto` registra en la tarea archivos, patrones, lecciones y decisiones aplicables; `evaluar-conectividad` contrasta los supuestos de la tarea con el codebase real antes de planear; `planear-implementacion`, `ejecutar-implementacion` y `revisar-implementacion` cubren plan técnico con suite de pruebas esperada, desarrollo con registro de desviaciones y revisión adversarial por subagente
- Ciclo de tareas: `ejecutar-tareas` ejecuta el ciclo completo con revisión dual —subagente independiente y aprobación del usuario—, `crear-tareas` captura tareas por diálogo validado y `commit` guía la redacción del mensaje según las convenciones del proyecto
- Aprendizaje: `registrar-experiencias` anota las correcciones del usuario en `EXPERIENCIAS.md`, `consolidar-lecciones` las agrupa por temas en `docs/lessons/` y `consultar-lecciones` recupera las aplicables en cualquier punto del trabajo
- Decisiones e investigación: `decisiones-diseno` registra decisiones costosas de revertir en `docs/decisions/`, `consultar-decisiones` las recupera para el trabajo en curso e `investigar` formaliza el descubrimiento, análisis y síntesis por agentes
- Documentación viva: `documentar-dominio` mantiene `docs/domains/` como sensor al cerrar tareas del sub-flujo de desarrollo, `documentar-producto` mantiene la documentación de funcionalidades y `revisar-arquitectura` evalúa el código con una rúbrica DDD que produce órdenes de reparación
- Diseño: `documentar-guia-estilo` mantiene el `DESIGN.md` del proyecto evaluado con sus tokens de diseño y `aplicar-guia-estilo` lo aplica y valida al escribir frontend
- Redacción: `revisar-redaccion` revisa textos en español por niveles de la lengua y `pulir-escritura` aplica el pulido mecánico, ambos en modos preventivo y reactivo
- Al cerrar cada tarea, el ciclo evalúa sus cambios y registra en el changelog del proyecto evaluado los que tienen impacto observable, agregados por épica, propuesta o encabezado ligero ([docs/tasks/105-skill-mantener-changelog.md](docs/tasks/105-skill-mantener-changelog.md), [docs/tasks/106-integrar-changelog-en-cierre-de-tareas.md](docs/tasks/106-integrar-changelog-en-cierre-de-tareas.md))
- Liberación de versiones del proyecto evaluado: curación de los cambios no liberados, propuesta de bump semver justificada y promoción confirmada por el usuario, con actualización opcional de la fuente de versión detectable ([docs/tasks/107-skill-liberar-version.md](docs/tasks/107-skill-liberar-version.md))

### Changed

- Revisión dual del ciclo: nuevo estado `[r]` «en revisión» entre en progreso y completada, con verificación por subagente independiente y aprobación final del usuario
- El orquestador `desarrollo` se divide en `planear-tarea` y `desarrollar-tarea` invocables por separado —el archivo de la tarea actúa como contrato de estado—, habilitando planeación incremental y en paralelo
- Los sensores de cierre y `revisar-implementacion` reciben la ubicación de los cambios —árbol de trabajo o rango de commits— y reconstruyen el diff con git, en lugar de recibir un diff materializado
- El tipo de tarea «mantenimiento» define el perfil «refactoring» —comportamiento invariante— enrutado al sub-flujo de desarrollo, junto al mantenimiento de proceso general
- Las acciones del plan técnico pasan de lista numerada a checklist marcable delegable a subagentes; las puertas humanas y la revisión dual no se delegan
- `revisar-arquitectura` persiste su informe en `docs/architecture-reviews/` con trazabilidad bidireccional hacia las tareas y decisiones derivadas
- `consolidar-lecciones` coteja cada experiencia pendiente contra las lecciones existentes antes de agrupar, evitando duplicar o contradecir notas vigentes
- Las expectativas de la suite de pruebas que produce `planear-implementacion` declaran la letra ZOMBIE que las derivó
- La revisión técnica del ciclo y `revisar-implementacion` cotejan el diff contra las lecciones descubiertas por los disparadores del índice
- El skill `commit` exige asuntos autodescriptivos y cuerpos que exponen la decisión y su motivación, no el contenido del diff
- `ejecutar-tareas` deriva las propuestas pendientes `[p]` al orquestador `idea-a-tarea` y la sección `## General` de TODO.txt acoge trabajo sin hito

### Fixed

- `registrar-experiencias` genera un Id único por entrada —varias correcciones de una misma sesión ya no comparten timestamp—
- La description de `consultar-lecciones` declara la capacidad ofrecida en lugar de narrar su mecánica interna
