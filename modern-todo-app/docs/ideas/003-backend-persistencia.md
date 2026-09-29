# Backend y persistencia real: la lista deja de vivir en un solo navegador

> **Tipo:** idea de funcionalidad — tamaño épica (complejidad alta)
> **Fecha:** 2026-09
> **Orden sugerido:** 3 de 5 — primera frontera externa del proyecto; la sincronización la presupone y la organización se beneficia de su modelo

## Problema

La persistencia del proyecto es un almacén del navegador: los datos viven en un dispositivo, en un perfil, sin dueño ni respaldo. Borrar los datos del navegador borra la vida de la lista; abrir la aplicación en otro dispositivo muestra una lista vacía. Además, el almacenamiento local impone límites de tamaño y una API síncrona que ningún sistema real comparte.

Para la persona usuaria esto convierte la aplicación en un cuaderno de papel digital: útil, pero atado a un solo lugar. Para la arquitectura —y para la prueba de concepto de Factory que este proyecto es—, mantiene la ilusión de que el estado es del cliente, cuando en cualquier producto real el cliente es solo una vista de un estado que vive fuera.

## Qué desbloquea

- **Persistencia que sobrevive al navegador:** los datos viven en un almacenamiento del lado del servidor, con respaldo y límites reales.
- **Una API como frontera:** el dominio se expone por operaciones explícitas, con contrato, errores y validación en dos lados —la doble verdad que todo cliente-servidor debe reconciliar.
- **Prerrequisito de la identidad:** aunque no haya aún usuarios, un backend es donde la pertenencia de las listas podrá anclarse después.
- **Tests de integración y migraciones:** el proyecto gana dos tipos de verificación nuevos —el contrato cliente-servidor y la evolución del esquema— que un cliente solo no puede dar.

## Flujos de trabajo que se hacen viables

- Abrir la aplicación desde otro navegador y encontrar la misma lista, compartida mientras no exista identidad.
- Recargar sin temor a perder el historial por una limpieza del navegador.
- Operar el dominio por API desde fuera de la interfaz: pruebas, scripts, clientes alternativos.

## Ventajas como producto

- **Cambio de categoría:** deja de ser un juguete de un solo navegador y se convierte en un servicio; es el salto estructural que separa una demo de un producto.
- **La frontera que la PoC necesita probar:** es la primera vez en el proyecto que una tarea debe coordinar los dos lados de un contrato, con migraciones y errores de red de por medio.
- **Base de todo lo transversal:** la sincronización, la colaboración futura y cualquier identidad se construyen sobre esta pieza; sin ella, `005-offline-sincronizacion` no tiene con qué sincronizar.

## Tensión que introduce en el roadmap

Presupone `002-nucleo-todomvc` —una API sin cliente no se ejercita— y es presupuesta por `005-offline-sincronizacion`. Su relación con `004-organizacion-avanzada` es de orden flexible: hacer antes el backend da a las nuevas capacidades un modelo ya distribuido; hacer antes la organización evita diseñar la API dos veces. La decisión del almacenamiento y del contrato se pagará cara si se improvisa: es la idea donde más vale un plan técnico explícito.
