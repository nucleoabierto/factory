# Factory

Conjunto de skills que cubren el ciclo de vida completo del desarrollo de producto, desde el refinamiento de una idea hasta la integración del código en el repositorio.

> **Estado del proyecto:** en desarrollo. El motor interno (idea → tarea → commit, con revisión dual y aprendizaje) está completo; el producto entregable está en construcción. Ver [Estado actual](#estado-actual) y [Hacia dónde va](#hacia-dónde-va).

---

## Estado actual

Factory está en desarrollo. El motor interno está completo: cubre el ciclo desde una idea suelta hasta el commit, con revisión dual y aprendizaje. Lo que falta es el producto entregable: gestión a nivel de código y de producto.

### Skills disponibles

**Flujo de idea a tarea**

| Skill | Qué hace |
|-------|----------|
| `lluvia-de-ideas` | Acompaña una conversación de lluvia de ideas y la convierte en un archivo por idea en `docs/ideas/`. |
| `idea-a-tarea` | Orquesta el flujo completo: retoma propuestas pendientes e ideas persistidas, o coordina las capacidades en orden. |
| `descubrir-problema` | Transforma una idea suelta en un problema formulado con su oportunidad, sin proponer solución. |
| `proponer-forma-solucion` | Determina la forma de la solución a alto nivel: categoría, alternativas y fuera de alcance. |
| `refinar-propuesta` | Descompone la solución validada en borradores de tarea y los envía a revisión asíncrona. |
| `crear-tareas` | Crea tareas desde una solicitud articulada o promociona los borradores de una propuesta aprobada. |
| `planificar` | Produce la épica de un conjunto de trabajo y refleja su agrupación en `TODO.txt`; cierra la planeación del flujo. |
| `planificar-roadmap` | Organiza las líneas de trabajo del producto —épicas, hitos y tareas sueltas— en `ROADMAP.md` por horizontes Now/Next/Later y refleja los comprometidos en `TODO.txt`. |

**Ejecución y cierre**

| Skill | Qué hace |
|-------|----------|
| `ejecutar-tareas` | Ejecuta el ciclo de tareas: lee `TODO.txt`, toma la siguiente pendiente, la ejecuta, la revisa y la commitea. |
| `planear-tarea` | Ejecuta la mitad de planeación del flujo de desarrollo: contexto, conectividad y plan con suite, y se detiene. |
| `desarrollar-tarea` | Ejecuta la mitad de ejecución: toma una tarea con plan aprobado y completa la implementación con desviaciones. |
| `recopilar-contexto` | Reúne el contexto que una tarea de desarrollo necesita —archivos similares, patrones, documentación de dominio y producto, lecciones y decisiones— y lo registra en la tarea. |
| `evaluar-conectividad` | Evalúa si lo que la tarea asume está conectado con el codebase y produce un veredicto antes de la planeación. |
| `planear-implementacion` | Produce el plan de una tarea de desarrollo antes de escribir código, con su suite de pruebas esperada. |
| `ejecutar-implementacion` | Ejecuta el desarrollo siguiendo el plan técnico y registra las desviaciones. |
| `revisar-implementacion` | Revisión técnica adversarial del diff contra las convenciones del proyecto. |
| `cerrar-conjunto` | Cierra un conjunto de trabajo agotado: verifica el criterio de cierre de la épica, la marca `Completada` y elimina la agrupación de `TODO.txt`. |
| `commit` | Crea commits siguiendo Conventional Commits en español. |

**Memoria del proyecto**

| Skill | Qué hace |
|-------|----------|
| `investigar` | Investiga un tema y produce un documento con conclusiones y referencias verificables. |
| `decisiones-diseno` | Registra decisiones de diseño con formato híbrido bajo `docs/decisions/`. |
| `registrar-experiencias` | Anota en `EXPERIENCIAS.md` las correcciones del usuario al cerrar una tarea. |
| `consolidar-lecciones` | Agrupa las experiencias pendientes por temas en notas bajo `docs/lessons/`. |
| `consultar-lecciones` | Recupera las lecciones aprendidas que aplican al trabajo a realizar. |
| `consultar-decisiones` | Recupera las decisiones de diseño vigentes que rigen el trabajo a realizar. |

**Salud del dominio y del producto**

| Skill | Qué hace |
|-------|----------|
| `documentar-dominio` | Mantiene la documentación viva de los dominios bajo `docs/domains/` tras cada tarea de desarrollo. |
| `documentar-producto` | Mantiene la documentación de producto del proyecto evaluado tras cada tarea de desarrollo, con escenarios anclados a su suite de pruebas. |
| `mantener-changelog` | Mantiene el changelog del proyecto evaluado: registra en los no liberados los cambios con impacto observable, agregados por épica o propuesta. |
| `liberar-version` | Libera una versión del proyecto evaluado: cura los no liberados, propone el bump semver justificado y promueve la sección con la confirmación del usuario. |
| `revisar-arquitectura` | Evalúa la arquitectura de un dominio con criterios DDD y persiste el informe en `docs/architecture-reviews/`. |

**Diseño**

| Skill | Qué hace |
|-------|----------|
| `documentar-guia-estilo` | Genera y mantiene la guía de estilo del proyecto evaluado (`DESIGN.md` como contrato + tokens CSS), en diálogo con el usuario o como sensor al cerrar tareas de frontend. |
| `aplicar-guia-estilo` | Aplica la guía al escribir frontend —tokens antes que literales— y valida el cumplimiento con evidencia estática y renderizada. |

**Calidad de escritura**

| Skill | Qué hace |
|-------|----------|
| `revisar-redaccion` | Revisa el estilo de un texto en español: claridad, coherencia, tono, precisión léxica. |
| `pulir-escritura` | Corrige ortografía, gramática, puntuación, tipografía y formato Markdown. |

Cada skill se invoca por su nombre. El procedimiento completo está en `.agents/skills/<nombre>/SKILL.md`.

### Cómo funciona el ciclo de trabajo

Dos orquestadores cubren el ciclo completo: `idea-a-tarea` convierte una idea en tareas planificadas y `ejecutar-tareas` ejecuta las tareas de `TODO.txt` hasta el commit. El estado entre pasos y entre sesiones viaja en artefactos —`TODO.txt`, el archivo de cada tarea, la propuesta, la épica—, no en la conversación, de modo que cualquier flujo se puede retomar donde quedó. El mapa exhaustivo de conexiones —quién invoca a quién, qué sensores corren al cierre, qué skills se activan por convención— vive en [docs/mapa-de-flujos.md](docs/mapa-de-flujos.md).

De la idea a la tarea:

1. El skill `idea-a-tarea` coordina el flujo: `descubrir-problema` formula el problema, `proponer-forma-solucion` decide la forma de la solución y `refinar-propuesta` produce la propuesta con sus borradores.
2. La propuesta queda pendiente `[p]` en la sección «Propuestas en revisión» de **`TODO.txt`**, a la espera de la decisión del usuario.
3. Si el usuario la aprueba, `crear-tareas` promociona los borradores a tareas definitivas y `planificar` cierra la planeación agrupando el conjunto en su épica —o bajo un encabezado ligero si no amerita épica—; si la rechaza, la propuesta queda descartada pero conservada.

De la tarea al commit:

1. **`TODO.txt`** es el índice de trabajo activo: tareas agrupadas por hito o sueltas en la sección «General», más las propuestas en revisión. Los hitos completados se eliminan del índice.
2. El skill `ejecutar-tareas` toma la siguiente tarea pendiente `[ ]`, la marca en progreso `[~]` y la ejecuta siguiendo su archivo; si la tarea declara un tipo con especialista (hoy `desarrollo` y `mantenimiento (refactoring)`), el ejecutor elige el punto de entrada según su estado de planeación: sin plan aprobado la enruta a `planear-tarea` —contexto, conectividad y plan con aprobación del usuario— y con plan aprobado a `desarrollar-tarea`, que la implementa.
3. Al terminar, la marca en revisión `[r]` y lanza un **subagente independiente** que revisa el diff sin ver el razonamiento del ejecutor, cotejándolo además contra las lecciones aprendidas.
4. Si el subagente aprueba, se presenta el resultado al **usuario** para aprobación.
5. Si ambos aprueban, la tarea se marca completada `[x]` y corren los sensores de cierre antes del commit: `mantener-changelog` para toda tarea; `documentar-dominio` y `documentar-producto` para las del sub-flujo de desarrollo; `registrar-experiencias` si el usuario corrigió algo durante la tarea.

### Estructura del repositorio

```
.agents/skills/     Skills formales (SKILL.md + references/)
docs/architecture-reviews/  Informes de revisión de arquitectura
docs/decisions/     Decisiones de diseño (DNNN-slug.md)
docs/domains/       Documentación viva de los dominios
docs/epics/         Épicas: planeación de conjuntos de tareas
docs/lessons/       Lecciones aprendidas consolidadas por tema
docs/proposals/     Propuestas del flujo de idea a tarea y sus borradores
docs/research/      Investigaciones
docs/reviews/       Informes de revisión de escritura
docs/tasks/         Archivos de tarea individuales
product-docs/       Documentación de producto de Factory (sitio MkDocs)
todo-app/           Prueba del flujo externo: todo app en vanilla JS (D018)
EXPERIENCIAS.md     Registro append-only de correcciones del usuario
TODO.txt            Índice de trabajo activo: tareas y propuestas
```

### Cómo empezar

Clona el repositorio y abre `TODO.txt`. Las tareas pendientes `[ ]` son las siguientes en ejecutarse. Cada archivo en `docs/tasks/` describe su objetivo, dependencias, resultado esperado y criterios de calidad.

Para ejecutar una tarea, sigue el procedimiento del skill `ejecutar-tareas` o el descrito en su archivo.

> **Nota:** Factory se construye a sí mismo mediante un principio *bootstrap*: cada nueva capacidad se registra como decisión de diseño, se crea como tarea, se ejecuta, se revisa y se commitea dentro del propio sistema. Esto es una herramienta interna de desarrollo, no parte del producto entregable.

---

## Hacia dónde va

Factory avanza hacia un **producto entregable** que cubre el ciclo completo de desarrollo de producto. Lo que existe hoy —del refinamiento de ideas a la ejecución de tareas con revisión dual— es un subconjunto del ciclo. El producto entregable lo extenderá:

- **Gestión a nivel de código**: *branching*, *pull requests*, revisión de código.
- **Gestión a nivel de producto**: *features*, *releases*, *feedback* de usuarios.

### Flujo asíncrono, no autónomo

El flujo no es autónomo: es asíncrono. El agente avanza el trabajo que puede ejecutar sin supervisión y se detiene en los puntos que requieren revisión o aprobación del usuario. El usuario delega la ejecución pero mantiene el control sobre lo que se hace.

### Validación externa

El producto entregable se validará construyendo un proyecto real con el sistema Factory, no solo usándolo sobre sí mismo. La prueba de concepto adoptada es una **todo app en vanilla JS** conforme a la especificación TodoMVC, construida en la subcarpeta `todo-app/` del repositorio (ver [D018](docs/decisions/D018-todo-app-vanilla-js-prueba-flujo-externo.md)).

### Lo que Factory no es

Factory no es un IDE, ni un gestor de proyectos, ni un sistema de CI/CD. Son skills que un agente de IA usa dentro de las herramientas existentes. No reemplaza las herramientas de desarrollo: las complementa.

---

## Documentación

- [Definición del proyecto](docs/definicion-proyecto.md) — propósito, alcance, estado actual y proceso de trabajo.
- [Mapa de flujos](docs/mapa-de-flujos.md) — conexión exhaustiva de los skills: orquestadores, capacidades, sensores, artefactos de estado y puertas humanas.
- [Visión del proyecto](product-docs/vision.md) — dirección aspiracional.
- [Decisiones de diseño](docs/decisions/) — registro de decisiones.
- [Investigaciones](docs/research/) — análisis que motivan las decisiones.
