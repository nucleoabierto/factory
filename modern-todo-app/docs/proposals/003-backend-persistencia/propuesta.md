# Backend y persistencia real: la lista deja de vivir en un solo navegador

## Estado

[a] Aprobada

## Problema

La persistencia del proyecto es un almacén del navegador: los datos de la lista viven en un único dispositivo, en un único perfil, sin dueño ni respaldo. Borrar los datos del navegador borra la historia de la lista; abrir la aplicación desde otro navegador u otro dispositivo muestra una lista vacía. El mecanismo actual impone además límites de tamaño y una forma de acceso que ningún entorno real comparte.

Para la persona usuaria, la aplicación es un cuaderno de papel digital: útil, pero atado a un solo lugar —no hay continuidad entre navegadores ni protección frente a la pérdida local—. Para la arquitectura —y para la prueba de concepto de Factory que este proyecto es—, mantiene la ilusión de que el estado pertenece al cliente, cuando en cualquier producto real el cliente es solo una vista de un estado que vive fuera.

El coste de no resolverlo es doble. Sin continuidad del estado fuera del navegador, las líneas posteriores del roadmap no tienen suelo: la sincronización no tiene con qué sincronizar y la pertenencia de las listas no tiene dónde anclarse. Y la PoC sigue sin enfrentarse a la clase de dificultad que distingue un producto de una demo: un estado compartido entre dos lados que deben reconciliar la misma verdad, con fallos de comunicación y evolución de datos de por medio.

## Oportunidad

Resolverlo convierte la aplicación en un servicio: la lista sobrevive al navegador, se encuentra igual desde cualquier dispositivo mientras no exista identidad y puede operarse desde fuera de la interfaz —pruebas, scripts, clientes alternativos—. Es además el ancla que las líneas posteriores del roadmap presuponen, y la primera frontera que la PoC debe demostrar saber cruzar: dos lados de un contrato con su verificación propia. Supera a la única alternativa existente —el almacenamiento local— justo donde esta falla: continuidad, alcance y realismo del modelo de estado; esta solo gana en que ya está implementada.

## Forma de solución

La lista deja de vivir en el navegador y pasa a vivir en un servicio propio del producto: quien abre la aplicación desde cualquier navegador o dispositivo encuentra la misma lista —compartida mientras no exista identidad— y sus operaciones cruzan una frontera real con su contrato, sus latencias y sus modos de fallo visibles. El dominio queda además operable desde fuera de la interfaz: cualquier cliente que hable el contrato puede consultar y modificar la lista. Para quien la usa, los flujos son los del núcleo, pero el estado ya no se pierde al limpiar el navegador ni se encierra en un solo dispositivo. Categoría: frontera externa nueva —categoría propuesta en esta propuesta: el producto gana una frontera real con un sistema exterior, donde el estado deja de ser local y las operaciones cruzan esa frontera con contrato y fallos visibles—.

## Solución

La propuesta añade al proyecto un servicio propio —un proceso del lado servidor dentro del mismo repositorio— que aloja el dominio de la tarea con sus invariantes y lo persiste en un almacenamiento real con esquema migrable. Sobre ese dominio se expone una API con contrato explícito que cubre el ciclo de vida completo de la tarea, con validación y errores coherentes en los dos lados.

El cliente se reconecta: una capa de acceso a la API sustituye al almacenamiento local como fuente de verdad, los flujos del núcleo quedan igual pero cruzan la frontera —con carga y fallo visibles— y la misma lista se sirve a cualquier navegador o dispositivo. La pila del servicio se decide como primera pieza del conjunto y queda registrada como decisión; el conjunto se cierra verificando la aplicación distribuida de extremo a extremo.

## Alternativas consideradas

- Persistencia local mejorada (IndexedDB en lugar de localStorage): se descarta porque mejora la capacidad y la asincronía, pero mantiene el problema de fondo —el estado sigue atado a un dispositivo y a un perfil—; resuelve los límites, no la pertenencia.
- Servicio gestionado externo (backend-as-a-service genérico): se descarta porque externaliza justo lo que la PoC necesita ejercitar —la coordinación de los dos lados de un contrato, los errores y la evolución del esquema—; el aprendizaje buscado desaparece al comprarlo.
- Exportación/importación manual sobre estado local: se descarta porque traslada a la persona usuaria el trabajo de reconciliar dos copias, sin resolver la continuidad ni dar al producto la frontera que las líneas siguientes presuponen.
- Sincronización entre navegadores sin servicio propio (peer-to-peer): se descarta porque sin un punto autoritativo no hay verdad que reconciliar ni ancla para la identidad futura; además adelanta la complejidad de 005 sin su beneficio.

## Fuera de alcance

- Identidad, cuentas y pertenencia de listas: mientras no exista, la lista es única y compartida (línea de Later).
- Operación offline, cola de operaciones y reconciliación de conflictos: el cliente falla visiblemente cuando no hay servicio (idea 005).
- Colaboración en tiempo real entre clientes simultáneos (Later).
- Organización avanzada del dominio: prioridades, etiquetas, búsqueda, deshacer (idea 004).
- Listas múltiples.
- Migración de las listas existentes en el navegador al servicio: los datos del núcleo se consideran descartables.
- Despliegue o publicación del servicio fuera del entorno local de desarrollo.

## Investigaciones de apoyo

- Ninguna — la pila del servicio se decide dentro del conjunto como primera pieza (tarea 011) y queda registrada como decisión, al igual que la pila del andamiaje en la propuesta 001.

## Borradores

- `docs/tasks/011-decidir-pila-servicio.md` — Decidir la pila del servicio
- `docs/tasks/012-dominio-servicio-almacenamiento.md` — Dominio del servicio y almacenamiento real (depende de 011 y 007)
- `docs/tasks/013-api-contrato.md` — API del ciclo de vida con contrato (depende de 012)
- `docs/tasks/014-cliente-remoto.md` — Cliente como vista del estado remoto (depende de 013 y 008–010)
- `docs/tasks/015-verificacion-e2e.md` — Verificación de extremo a extremo del sistema distribuido (depende de 014)

## Revisión

- Usuario: 2026-10-02 — Aprueba
