# Visión del proyecto

## Propósito

Factory existe para que un agente de IA pueda gestionar un producto de software de principio a fin: desde una idea suelta hasta un *pull request* integrado en el código base. Hoy los agentes de IA ejecutan tareas aisladas —escribir código, corregir un *bug*, redactar un documento— pero no gestionan el ciclo completo de desarrollo de producto. Factory aspira a cubrir esa necesidad.

El flujo no es autónomo: es asíncrono. El agente avanza el trabajo que puede ejecutar sin supervisión y se detiene en los puntos que requieren revisión o aprobación del usuario. El usuario delega la ejecución pero mantiene el control sobre lo que se hace. Pasamos de un *human-in-the-loop*, donde el usuario interviene en cada paso, a un *human-in-the-async-loop*, donde el usuario interviene solo en los puntos que importan.

## Dirección

Factory avanza desde un motor interno autoproductivo hacia un producto entregable que cubre el ciclo completo de desarrollo. El motor interno ya está en marcha: gestiona tareas, documentación, decisiones de diseño y revisiones. El producto entregable extenderá ese motor con capacidades que hoy faltan: refinamiento de ideas, planeación de épicas y *roadmap*, gestión a nivel de código y gestión a nivel de producto.

El principio *bootstrap* es permanente: cada nueva capacidad se construye usando el propio sistema, lo que asegura que el sistema se valida a sí mismo al evolucionar.

## Objetivos

1. **Cubrir el ciclo completo**: cada fase del ciclo de vida (refinamiento, creación, planeación, ejecución, revisión, corrección, integración) tendrá al menos un skill que la cubra.
2. **Mantener la portabilidad**: los skills seguirán el estándar Agent Skills, sin depender de un arnés específico.
3. **Validar externamente**: el producto entregable se validará construyendo un proyecto real con el sistema Factory, no solo usándolo sobre sí mismo. La prueba adoptada es una todo app en vanilla JS conforme a la especificación TodoMVC (D018).
4. **Preservar la trazabilidad**: cada decisión, cada tarea y cada investigación quedará documentada y referenciable.

## Alcance

Dentro del alcance:

- Refinamiento de ideas en propuestas accionables.
- Creación y planeación de tareas, épicas y *roadmap*.
- Ejecución de tareas con revisión dual.
- Integración de cambios mediante *pull requests*.
- Registro de decisiones de diseño y documentación de investigación.

Fuera del alcance:

- Despliegue y operación post-integración.
- Configuración y gestión de CI/CD.
- *Hosting* y *runtime* de aplicaciones.

## Qué no construimos

Factory no construye un IDE, un gestor de proyectos ni un sistema de CI/CD. Construye skills que un agente de IA usa dentro de las herramientas existentes. Factory no reemplaza las herramientas de desarrollo: las complementa con un agente que sabe gestionar el ciclo completo.

## Audiencia

Desarrolladores y *product managers* que trabajan con agentes de IA y necesitan un sistema estructurado para gestionar productos de software de principio a fin. La documentación es pública: sirve de referencia y ejemplo para la comunidad.
