# Núcleo TodoMVC: la aplicación hace lo que una lista de tareas debe hacer

> **Tipo:** idea de funcionalidad — tamaño épica (complejidad media)
> **Fecha:** 2026-09
> **Orden sugerido:** 2 de 5 — primera funcionalidad del producto; todo lo demás es dominio construido sobre este núcleo

## Problema

El proyecto es una prueba de concepto de Factory, pero el andamiaje por sí solo no hace nada: no hay dónde apuntar lo que hay que hacer, ni cómo marcarlo terminado, ni nada que persista entre visitas. Para la persona usuaria aún no es una aplicación; para la PoC, no hay todavía un dominio con invariantes que el flujo de idea a tarea tenga que respetar.

Sin este núcleo, cualquier funcionalidad posterior carece de suelo: la organización, el backend o la sincronización son variaciones sobre la operación elemental de capturar una tarea y cerrarla.

## Qué desbloquea

- **El ciclo completo de una tarea:** crear, consultar, completar, editar y borrar —las operaciones sobre las que se construye todo lo demás.
- **Un primer dominio con invariantes:** texto no vacío, estado binario, persistencia entre visitas; reglas que las tareas posteriores no podrán violar sin que se note.
- **El primer modelo de estado en React:** cómo se representa el dominio en componentes y cómo fluyen las acciones, la decisión estructural que marca al resto del proyecto.
- **Un contrato verificable:** la especificación TodoMVC define la forma esperada —requisitos funcionales comprobables— de modo que el resultado se comprueba objetivamente, no se aprecia.

## Flujos de trabajo que se hacen viables

- Capturar una tarea al pensarla y tacharla al hacerla, con la lista conservada entre visitas.
- Revisar qué queda pendiente, qué se hizo y vaciar lo completado.
- Corregir el texto de una tarea sin borrarla y recrearla.

## Ventajas como producto

- **Especificación objetiva:** TodoMVC da el contrato verificable del núcleo, lo que lo convierte en la prueba de concepto ideal: el resultado se contrasta con una spec escrita.
- **Mínimo producto honesto:** es la versión más pequeña que una persona usaría de verdad, y el punto desde el que cada idea posterior añade una capacidad distinguible.
- **Prueba del modelo de estado:** obliga al proyecto a decidir temprano cómo se organiza el estado en React, la decisión que más condiciona a las ideas de dominio posteriores.

## Tensión que introduce en el roadmap

Presupone `001-andamiaje-react-pipeline` y habilita a todas las demás. La decisión de cómo se modela el estado —local, store externa, server state— condiciona el coste de `003-backend-persistencia` y de `005-offline-sincronizacion`: una elección ingenua aquí se paga dos veces allí.
