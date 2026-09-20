# Factory

Conjunto de skills que cubren el ciclo de vida completo del desarrollo de producto, desde el refinamiento de una idea hasta la integración del código en el repositorio.

> **Estado del proyecto:** en desarrollo. Los skills de gestión de tareas y documentación están en marcha; el resto del ciclo está en construcción. Ver [Estado actual](#estado-actual) y [Hacia dónde va](#hacia-dónde-va).

---

## Estado actual

Factory está en desarrollo. Lo que existe hoy son los skills de gestión de tareas, documentación y calidad de escritura que forman la base del sistema.

### Skills disponibles

| Skill | Qué hace |
|-------|----------|
| `revisar-redaccion` | Revisa el estilo de un texto en español: claridad, coherencia, tono, precisión léxica. |
| `pulir-escritura` | Corrige ortografía, gramática, puntuación, tipografía y formato Markdown. |
| `commit` | Crea commits siguiendo Conventional Commits en español. |
| `crear-tareas` | Crea tareas validando con el usuario antes de generar los archivos. |
| `ejecutar-tareas` | Ejecuta el ciclo de tareas: lee `TODO.txt`, toma la siguiente pendiente, la ejecuta, la revisa y la commitea. |
| `decisiones-diseno` | Registra decisiones de diseño con formato híbrido bajo `docs/decisions/`. |
| `registrar-experiencias` | Anota en `EXPERIENCIAS.md` las correcciones del usuario al cerrar una tarea. |
| `consolidar-lecciones` | Agrupa las experiencias pendientes por temas en notas bajo `docs/lessons/`. |

Cada skill se invoca por su nombre. El procedimiento completo está en `.agents/skills/<nombre>/SKILL.md`.

### Cómo funciona el ciclo de trabajo

1. **`TODO.txt`** es el índice de tareas. Cada línea referencia un archivo en `docs/tasks/`.
2. El skill `ejecutar-tareas` toma la siguiente tarea pendiente `[ ]`, la marca en progreso `[~]` y la ejecuta siguiendo su archivo.
3. Al terminar, la marca en revisión `[r]` y lanza un **subagente independiente** que revisa el diff sin ver el razonamiento del ejecutor.
4. Si el subagente aprueba, se presenta el resultado al **usuario** para aprobación.
5. Si ambos aprueban, la tarea se marca completada `[x]` y se commitea.

### Estructura del repositorio

```
.agents/skills/     Skills formales (SKILL.md + references/)
docs/decisions/     Decisiones de diseño (DNNN-slug.md)
docs/lessons/       Lecciones aprendidas consolidadas por tema
docs/research/      Investigaciones
docs/tasks/         Archivos de tarea individuales
EXPERIENCIAS.md     Registro append-only de correcciones del usuario
TODO.txt            Índice de tareas por hito
```

### Cómo empezar

Clona el repositorio y abre `TODO.txt`. Las tareas pendientes `[ ]` son las siguientes en ejecutarse. Cada archivo en `docs/tasks/` describe su objetivo, dependencias, resultado esperado y criterios de calidad.

Para ejecutar una tarea, sigue el procedimiento del skill `ejecutar-tareas` o el descrito en su archivo.

> **Nota:** Factory se construye a sí mismo mediante un principio *bootstrap*: cada nueva capacidad se registra como decisión de diseño, se crea como tarea, se ejecuta, se revisa y se commitea dentro del propio sistema. Esto es una herramienta interna de desarrollo, no parte del producto entregable.

---

## Hacia dónde va

Factory avanza hacia un **producto entregable** que cubre el ciclo completo de desarrollo de producto. Lo que existe hoy —tareas y documentación— es un subconjunto del ciclo. El producto entregable lo extenderá:

- **Refinamiento de ideas**: transformar ideas sueltas en propuestas accionables.
- **Planeación de épicas y *roadmap***: gestionar el producto a nivel de visión, no solo de tareas individuales.
- **Gestión a nivel de código**: *branching*, *pull requests*, revisión de código.
- **Gestión a nivel de producto**: *features*, *releases*, *feedback* de usuarios.

### Flujo asíncrono, no autónomo

El flujo no es autónomo: es asíncrono. El agente avanza el trabajo que puede ejecutar sin supervisión y se detiene en los puntos que requieren revisión o aprobación del usuario. El usuario delega la ejecución pero mantiene el control sobre lo que se hace.

### Validación externa

El producto entregable se validará construyendo un proyecto real con el sistema Factory, no solo usándolo sobre sí mismo.

### Lo que Factory no es

Factory no es un IDE, ni un gestor de proyectos, ni un sistema de CI/CD. Son skills que un agente de IA usa dentro de las herramientas existentes. No reemplaza las herramientas de desarrollo: las complementa.

---

## Documentación

- [Definición del proyecto](docs/definicion-proyecto.md) — propósito, alcance, estado actual y proceso de trabajo.
- [Visión del proyecto](docs/vision-proyecto.md) — dirección aspiracional.
- [Decisiones de diseño](docs/decisions/) — registro de decisiones (D001–D010).
- [Investigaciones](docs/research/) — análisis que motivan las decisiones.
