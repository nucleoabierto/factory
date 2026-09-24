# Múltiples listas: organizar las tareas por contexto

> **Tipo:** idea de funcionalidad — tamaño épica (complejidad media-alta)
> **Fecha:** 2026-09

## Problema

La aplicación ofrece una única lista plana. En cuanto el volumen crece, todo compite en el mismo espacio: compras, trabajo, trámites y proyectos personales se mezclan sin distinción. El filtro pendiente/completada responde «qué estado tiene cada cosa», pero no «a qué parte de mi vida pertenece», que es la pregunta que una persona se hace al sentarse a trabajar.

El coste de no resolverlo es que la lista deja de ser consultable: con decenas de tareas mezcladas, la vista de pendientes se convierte en ruido y la persona vuelve a llevar el contexto en la cabeza — exactamente el problema que la aplicación nació para resolver.

## Qué desbloquea

- **Separación de contextos:** hoy es imposible mirar solo «el trabajo» o solo «la casa». Con listas nombradas, cada contexto tiene su propio perímetro de pendientes y completadas.
- **Escalado del volumen:** la única defensa actual contra el crecimiento es limpiar completadas. Las listas permiten que el total de tareas crezca sin degradar la consulta, porque el acotado pasa de estado a contexto.
- **Abandono y retoma:** un proyecto pausado hoy contamina la vista hasta que se borra. Una lista archivable permite aparcar trabajo sin perderlo ni verlo.
- **Base para métricas y priorización futuras:** sin una agrupación por encima de la tarea no hay dónde colgar avance por proyecto, fecha de entrega de un conjunto o reparto de esfuerzo. Las listas son el prerrequisito estructural de casi toda funcionalidad organizativa posterior.

## Flujos de trabajo que se hacen viables

- Revisión matinal por contexto: abrir «trabajo» y ver solo lo que importa en horario laboral, sin filtrar mentalmente la compra del supermercado.
- Vaciado de bandeja: capturar rápido en una lista de entrada y clasificar después, separando el gesto de anotar del gesto de decidir dónde va.
- Cierre de proyecto: completar o archivar una lista entera como unidad, en lugar de podar tarea a tarea.
- Varias listas activas en paralelo con contadores propios, de modo que «cuánto queda» tenga una respuesta por contexto.

## Ventajas como producto

- **Retención por acumulación:** cuantas más listas y más historial alberga la aplicación, más costoso es irse. Una lista plana es trivialmente reemplazable; un sistema de contextos con meses de uso no.
- **Amplía el público:** la lista única sirve para uso ligero; las listas múltiples abren la puerta a quien organiza proyectos, el perfil de usuaria con más exigencia y más permanencia.
- **Narrativa de crecimiento natural:** es el paso de «app de notas con casillas» a «sistema de organización personal», el cambio de categoría que justifica todo lo demás.

## Tensión que introduce en el roadmap

Compite con la planificación temporal por ser «lo siguiente», y condiciona a la sincronización: si llega primero, el modelo de datos que se sincronice después ya incluye agrupaciones; si llega después, la migración es más costosa. Es la candidata a marcar la estructura del dominio para todo lo que venga detrás.
