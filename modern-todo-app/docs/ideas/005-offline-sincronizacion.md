# Offline y sincronización: la aplicación funciona sin red y reconcilia al volver

> **Tipo:** idea de funcionalidad — tamaño épica (complejidad alta)
> **Fecha:** 2026-09
> **Orden sugerido:** 5 de 5 — presupone el backend y es la mayor exigencia arquitectónica del conjunto

## Problema

Con backend, la aplicación gana una dependencia nueva: sin red no hay lista. La persona que abre la aplicación en el metro, en un avión o con una conexión intermitente se encuentra con una pantalla que espera o falla; el estado vive lejos y el cliente no sabe actuar sin él.

Y está el problema simétrico: si el cliente opera offline, dos sesiones pueden cambiar la misma realidad por caminos distintos. Sin una política de reconciliación, volver a conectar es elegir qué versión de la verdad se tira a la basura.

## Qué desbloquea

- **Operación sin red:** leer y escribir sobre un estado local que se sincroniza cuando la red vuelve, con las operaciones encoladas en lugar de perdidas.
- **Reconciliación declarada:** una política explícita para resolver divergencias —qué gana, qué se fusiona, qué se reporta— en lugar del «gana el último que escribe» implícito.
- **Instalabilidad:** la aplicación se comporta como tal fuera del navegador: icono, arranque propio, sin caja de direcciones.
- **El escenario más duro del dominio:** colas, reintentos, relojes sin autoridad única y estados parciales, la frontera donde las invariantes locales se enfrentan a la realidad distribuida.

## Flujos de trabajo que se hacen viables

- Apuntar y tachar tareas sin conexión, con la tranquilidad de que nada se pierde al volver la red.
- Trabajar en dos dispositivos —aunque sea sin identidad plena— y encontrar el estado reconciliado.
- Usar la aplicación instalada, como una aplicación y no como una pestaña.

## Ventajas como producto

- **La prueba de estrés definitiva de la PoC:** coordinación entre estados, asincronía real, conflictos y reintentos concentran en una sola línea casi todo lo que una tarea de desarrollo puede encontrar difícil: conectividad, planeación, desviaciones y revisión. Si Factory aguanta esta idea, aguanta el proyecto.
- **Confiabilidad como atributo:** una app que funciona offline cambia la promesa del producto —la lista está, haya o no red.
- **Cierre natural del arco:** completada esta línea, el proyecto habrá pasado por cada forma de dificultad que el proceso de desarrollo declara manejar.

## Tensión que introduce en el roadmap

Es la última por diseño: presupone `003-backend-persistencia` y conviene que el modelo de dominio ya esté estabilizado por `004-organizacion-avanzada`, porque sincronizar un modelo que aún cambia multiplica los conflictos a diseñar. La interacción con el «deshacer» de la idea hermana debe decidirse explícitamente: una cola de operaciones sincronizables y una pila de deshacer local son dos historias del mismo estado que no siempre cuentan lo mismo.
