# Definición del proyecto

## Propósito

Factory es un conjunto de skills que cubren el ciclo de vida completo del desarrollo de producto, desde el refinamiento de una idea descubierta al margen del flujo de trabajo hasta la integración del código en el repositorio. Su objetivo es ayudar a desarrolladores y *product managers* a gestionar un producto de principio a fin.

El despliegue y el control de integración continua quedan fuera del alcance de los skills: se gestionan con los sistemas de CI/CD existentes en cada proyecto.

## Dos niveles

Factory tiene dos niveles que conviven y se alimentan mutuamente:

1. **El motor interno**: el sistema de gestión de tareas y documentación que se usa para construir el propio proyecto. Hoy cubre la creación y ejecución de tareas, la revisión dual, el versionado con Conventional Commits, el registro de decisiones de diseño y la investigación documentada. Es autoproductivo: cada nueva capacidad se construye usando el propio sistema.

2. **El producto entregable**: el conjunto de skills que cubren el ciclo completo de desarrollo de producto. Incluye lo que hoy tiene el motor interno, pero lo extiende con refinamiento de ideas, planeación de épicas y *roadmap*, gestión a nivel de código (branching, *pull requests*, revisión de código) y gestión a nivel de producto (*features*, *releases*, *feedback*).

El motor interno es la infraestructura de trabajo; el producto entregable es el objetivo final. El primero es necesario pero insuficiente: cubre tareas y documentación, un subconjunto del ciclo de desarrollo.

## Estado actual

El motor interno está en marcha. Los skills existentes cubren:

- **Gestión de tareas**: `crear-tareas` y `ejecutar-tareas`, con `TODO.txt` como índice y `docs/tasks/` como detalle.
- **Calidad de escritura**: `revisar-redaccion` y `pulir-escritura`, con revisión de estilo y corrección ortotipográfica.
- **Versionado**: `commit`, con Conventional Commits en español.
- **Decisiones de diseño**: `decisiones-diseno`, con formato híbrido bajo `docs/decisions/`.

El flujo de trabajo es: leer `TODO.txt`, tomar la siguiente tarea pendiente, ejecutarla siguiendo su archivo, marcarla en revisión, someterla a revisión dual (subagente independiente + usuario), marcarla como completada y commitear.

Lo que falta para llegar al producto entregable:

- **Refinamiento de ideas**: transformar ideas sueltas en propuestas accionables antes de convertirlas en tareas.
- **Planeación de épicas y *roadmap***: gestionar el producto a nivel de visión, no solo de tareas individuales.
- **Gestión a nivel de código**: *branching*, *pull requests*, revisión de código.
- **Gestión a nivel de producto**: *features*, *releases*, *feedback* de usuarios.

## Proceso de trabajo

El principio *bootstrap* es permanente: cada nueva capacidad se construye usando el propio sistema. El motor interno se usa para desarrollar el producto entregable, y el producto entregable, a medida que crece, refuerza el motor interno.

El proceso se mantiene en cada nueva capacidad:

1. Registrar la decisión de diseño que la motiva.
2. Crear la tarea con objetivo, dependencias y criterios de calidad.
3. Ejecutar la tarea siguiendo el flujo de revisión dual.
4. Commitear el cambio siguiendo Conventional Commits.

Este proceso no cambia al llegar al producto entregable: es el mismo flujo, aplicado a un alcance mayor.

## Alcance

Factory es un proyecto autónomo que también sirve como plantilla base para otros proyectos. El ciclo que aspira a cubrir es:

1. **Refinamiento de ideas**: transformar ideas descubiertas al margen del flujo de trabajo en propuestas accionables.
2. **Creación de tareas**: descomponer propuestas en tareas ejecutables con objetivo, dependencias y criterios de calidad.
3. **Planeación**: gestionar tareas, épicas y *roadmap*.
4. **Ejecución**: ejecutar tareas siguiendo su archivo de tarea y los skills relevantes.
5. **Revisión**: verificar el resultado mediante revisión dual (subagente independiente + usuario).
6. **Corrección**: resolver los hallazgos de la revisión.
7. **Integración**: cerrar *pull requests* y hacer la integración al código base.

El despliegue y la operación post-integración quedan fuera del alcance, como se indica en el propósito.

## Audiencia

Factory se documenta de forma pública para servir de referencia y ejemplo a la comunidad de desarrolladores y *product managers* que trabajan con agentes de IA en la gestión de productos.

## Casos de uso

- **Refinar una idea suelta** en una propuesta estructurada antes de convertirla en tarea.
- **Planear un *roadmap*** a partir de épicas y tareas, manteniendo la trazabilidad entre objetivos y ejecución.
- **Ejecutar una tarea** de principio a fin con un agente de IA, siguiendo un procedimiento reproducible.
- **Revisar el resultado** de una tarea con un filtro técnico automático y un filtro humano.
- **Commitear e integrar** cambios de forma consistente, siguiendo convenciones establecidas.
- **Construir una nueva capacidad** (skill, formato, flujo) usando el propio sistema: registrar la decisión, crear la tarea, ejecutarla, revisarla y commitearla.

## Criterios de éxito

- **Mantenibilidad**: el sistema es fácil de mantener, extender y adaptar a nuevos proyectos. Los skills son autocontenidos y portables, siguen el estándar Agent Skills y mantienen el cuerpo por debajo de 500 líneas con el detalle en `references/`.
- **Cobertura del ciclo**: cada fase del ciclo de vida (refinamiento, creación, planeación, ejecución, revisión, corrección, integración) tiene al menos un skill que la cubre.
- **Autoproducción**: cada nueva capacidad se construye usando el propio sistema: la decisión queda registrada, la tarea se crea y ejecuta dentro del flujo, y el cambio se commitea siguiendo las convenciones del proyecto.
- **Trazabilidad**: las decisiones de diseño están documentadas en `docs/decisions/`, las tareas en `docs/tasks/` y las investigaciones en `docs/research/`, con referencias cruzadas cuando aplica.
- **Validación externa**: el producto entregable se valida construyendo un proyecto real con el sistema Factory, no solo usándolo sobre sí mismo.
