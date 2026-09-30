# Andamiaje del proyecto: base web moderna con verificación ejecutable

## Estado

[a] Aprobada

## Problema

El proyecto `modern-todo-app` —la segunda prueba de concepto del sistema— existe solo como nombre: su directorio contiene cinco ideas y ningún código. El sistema de trabajo de Factory presupone que cada tarea de desarrollo se verifica ejecutando una suite de pruebas, pero aquí no hay nada que ejecutar: no hay proyecto, no hay suite, no hay verificación posible.

La PoC anterior (`todo-app`, vanilla JS) ofrece terreno parcial: tiene código y pruebas, pero su verificación se hace en el navegador y sus condiciones —scripts clásicos, sin dependencias, sin tipado estático, sin paso de compilación— no reproducen las de un proyecto contemporáneo. Las capacidades del flujo que asumen un terreno así —resolver dependencias, comprobar una suite, detectar regresiones antes de la revisión— no pueden ejercitarse sobre ella.

Afecta a la propia validación del sistema: cada afirmación sobre el ciclo de desarrollo —que la suite esperada se comprueba, que la revisión detecta regresiones— queda en conjetura mientras no haya un terreno donde puedan romperse de verdad. Y condiciona a las cuatro ideas siguientes del subproyecto, que presuponen un proyecto donde vivir.

## Oportunidad

Resolverlo convierte la «suite de pruebas esperada» de contrato declarado en comprobación ejecutable por el propio flujo, y da a las ideas siguientes un piso común donde discutir dominio y no infraestructura. Supera a la alternativa existente —la PoC vanilla— en fidelidad: reproduce las condiciones reales que aquella deliberadamente evitó; esta solo gana en que ya existe.

## Forma de solución

`modern-todo-app` pasa a existir como aplicación real: una base de proyecto web con gestión de dependencias, tipado estático, paso de compilación y una suite de verificación automatizada que el propio flujo puede ejecutar —y romper— por sí mismo, coronada por un producto mínimo visible —una aplicación que arranca y muestra una pantalla— que demuestra que el terreno funciona de punta a punta. Para quien valida el sistema, cambia que cada tarea posterior tiene verificación ejecutable; para quien use el producto, que existe una aplicación donde hoy no hay nada. Categoría: andamiaje de proyecto —categoría nueva propuesta en esta propuesta: crea la base técnica verificable que las capacidades posteriores presuponen, sin añadir funcionalidad de dominio—.

## Solución

Se crea en `modern-todo-app/` un proyecto de aplicación web completo como base de trabajo: manifiesto de paquetes con dependencias fijadas, configuración de tipado estático, empaquetador con servidor de desarrollo, lint, compilación y una suite de pruebas automatizada. Todo ello se reúne en una verificación única que el flujo puede ejecutar en verde y romper en rojo.

Sobre esa base, la aplicación muestra una pantalla propia mínima —sin funcionalidad de dominio— que demuestra el recorrido completo: el código se compila, se sirve, se muestra y la suite lo comprueba. La pila concreta se decide como primera pieza del conjunto y queda registrada como decisión del proyecto.

## Alternativas consideradas

- Dotar de toolchain a la `todo-app` vanilla existente: se descarta porque deforma una PoC cuya decisión fundacional fue precisamente no tener toolchain, y produciría un híbrido que no representa ni el proyecto simple ni el moderno.
- Andamiaje sin framework de componentes: se descarta porque reproduce solo la mitad del terreno —las herramientas— y no la arquitectura de componentes que las ideas siguientes presuponen.
- Adoptar un proyecto existente (clonar una implementación TodoMVC moderna): se descarta porque el propósito es ejercitar el flujo construyendo el terreno, no poseer el artefacto.
- Empezar por la funcionalidad y dejar que el tooling emerja: se descarta porque invierte la dependencia —sin verificación ejecutable desde el inicio, el primer código no puede comprobarse—.

## Fuera de alcance

- Cualquier funcionalidad de dominio: la aplicación muestra una pantalla, pero no gestiona tareas (idea 002).
- Persistencia, backend, organización avanzada y sincronización (ideas 003–005).
- Integración continua remota: la verificación exigible es la local.
- Despliegue o publicación de la aplicación.
- Guía de estilo y diseño visual del producto.

## Investigaciones de apoyo

- Ninguna.

## Borradores

- `docs/tasks/001-decidir-pila-andamiaje.md` — Decidir la pila tecnológica del andamiaje
- `docs/tasks/002-inicializar-proyecto-toolchain.md` — Inicializar el proyecto con la pila decidida (depende de 001)
- `docs/tasks/003-verificacion-ejecutable.md` — Establecer la verificación ejecutable (depende de 002)
- `docs/tasks/004-pantalla-minima-propia.md` — Pantalla mínima propia verificada de extremo a extremo (depende de 003)

## Revisión

- Usuario: 2026-09-29 — Aprueba
