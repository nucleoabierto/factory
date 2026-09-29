# Andamiaje React con pipeline de verificación: el proyecto existe como base de trabajo

> **Tipo:** idea de andamiaje — tamaño épica (complejidad media)
> **Fecha:** 2026-09
> **Orden sugerido:** 1 de 5 — estructura a todas las demás: sin proyecto con toolchain no hay dónde construir nada

## Problema

Este proyecto es una prueba de concepto de Factory: su propósito es comprobar que el ciclo de desarrollo del sistema funciona sobre un proyecto real, y un proyecto real tiene toolchain —gestor de paquetes, módulos, tipado estático, build y una suite de pruebas que se ejecuta por comando—. Hoy ese proyecto no existe: no hay nada que compilar, probar ni verificar.

El coste de no resolverlo es doble. Para la persona usuaria no hay aplicación; para la prueba de concepto no hay terreno: sin una verificación que el agente pueda ejecutar —y romper— por sí mismo, cada afirmación sobre la validez del proceso queda en conjetura.

## Qué desbloquea

- **Verificación ejecutable:** una suite que corre con un comando convierte la «suite de pruebas esperada» de contrato declarado en comprobación real que el propio flujo ejecuta.
- **Terreno realista:** dependencias, módulos, tipado estático y build reproducen las condiciones de un proyecto contemporáneo.
- **Base física para todo lo demás:** cada idea posterior —núcleo, backend, organización, sincronización— presupone un proyecto donde vivir; el andamiaje es esa condición de posibilidad.
- **Fallo temprano y visible:** un pipeline local que rompe en rojo hace detectables los errores que en un proyecto sin verificación pasan inadvertidos hasta la revisión.

## Flujos de trabajo que se hacen viables

- Ejecutar la suite completa como paso del cierre de cada tarea, sin intervención manual.
- Detectar regresiones por comando —test, lint, typecheck, build— antes de pedir aprobación.
- Crecer el código con módulos reales e imports.
- Añadir una dependencia externa como decisión ordinaria del proyecto, con su coste visible.

## Ventajas como producto

- **La prueba mide lo que dice medir:** como PoC de Factory, el proyecto solo valida el proceso si el terreno es el de un proyecto real; el toolchain es esa condición.
- **Referencia de toolchain:** las decisiones que el andamiaje tome —framework, lenguaje, runner, build— quedan como el ejemplo canónico de proyecto moderno.
- **Piso compartido:** las ideas siguientes discuten dominio y arquitectura, no infraestructura.

## Tensión que introduce en el roadmap

Va primera y condiciona a todas: `002-nucleo-todomvc` se construye sobre ella, y `003-backend-persistencia`, `004-organizacion-avanzada` y `005-offline-sincronizacion` presuponen su toolchain y su forma de verificación. Su tensión interna es el equilibrio entre un andamiaje rico —que pruebe más cosas— y uno mínimo —que no convierta la preparación en el proyecto—.
