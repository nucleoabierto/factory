# División del paquete en partes: subpaquetes por dominio de capacidad

> **Tipo:** idea de estructura de producto — tamaño conjunto (complejidad media)
> **Fecha:** 2026-11
> **Requiere:** ninguna — se apoya en el empaquetado teleprompter existente

## Problema

Factory se distribuye como un único paquete monolítico: instalar el sistema es todo o nada. Un proyecto que solo quiere el lazo de revisión de pull requests, o las capacidades de redacción y escritura, instala también todo el ciclo de tareas, la memoria del proyecto y el roadmap — superficie que el agente debe recorrer sin usarla y un coste de entrada que encarece la adopción parcial.

Afecta a quien adopta el sistema en un proyecto propio —no puede empezar por una parte— y a quien mantiene el paquete —crece monolítico y cada skill nuevo agranda la unidad mínima de instalación—. Ocurre desde el primer release público, y el coste es adopción frenada y una división cada vez más cara a medida que el catálogo crece.

## Qué desbloquea

- **Instalación por dominio:** un proyecto instala solo las capacidades que usa —por ejemplo, `revisar-redaccion` y `pulir-escritura` como subpaquete de redacción, o el cuarteto del lazo de PR sin el ciclo de tareas—.
- **Adopción incremental:** probar una parte sin comprometerse al sistema entero.
- **Fronteras explícitas:** dividir fuerza a declarar qué skills comparten artefactos, convenciones y dependencias, y cuáles son realmente autocontenidos.

## Flujos de trabajo que se hacen viables

- Un proyecto instala solo el subpaquete de redacción para pulir sus documentos, sin montar el ciclo de desarrollo.
- Un proyecto adopta primero la revisión de PR y luego añade el núcleo del ciclo cuando le convence.
- El paquete núcleo —ciclo de tareas, artefactos y gestores— se instala solo o como base de extensiones.

## Ventajas como producto

- **Barrera de entrada baja:** la primera instalación deja de ser todo o nada, alineada con la dirección de skills autocontenidos y portables.
- **Contrato de fronteras a prueba:** la división pone a prueba la autocontención declarada de cada skill —los acoplamientos ocultos salen a la luz—.

## Tensión que introduce en el roadmap

Línea nueva decidida por el usuario con anterioridad al núcleo de gestión de producto (`convergencia-plan-requisitos`, `validacion-de-resultado`, `carril-de-baja-friccion`): modularizar antes de seguir extendiendo, cuando cada skill nuevo aumenta el coste de la división. Condiciona cómo evolucionan `teleprompter.json` y `PERSONALIZE.md` y la instalación por skill individual que ya soporta el manifiesto.
