# Establecer la verificación ejecutable

## Estado

[ ] Pendiente

## Tipo

desarrollo

## Objetivo

Reunir en una verificación única y ejecutable todo lo que el flujo necesita comprobar en cada tarea: pruebas automatizadas, comprobación de tipos, lint y compilación, de modo que falle de forma visible cuando algo se rompe.

## Dependencias

- 002 — el proyecto inicializado con su toolchain.

## Entrada

- El proyecto inicializado en `modern-todo-app/`.
- La pila decidida, en particular el ejecutor de pruebas y el linter elegidos.

## Resultado esperado

- Un comando de verificación que ejecuta pruebas, tipos, lint y compilación, en verde sobre la aplicación mínima.
- Una primera prueba real sobre la aplicación que sirve de semilla de la suite.

## Criterios de calidad

- La verificación completa se ejecuta con un solo comando y sin intervención.
- Un fallo inducido —en el código o en una prueba— pone la verificación en rojo y revertirlo la devuelve al verde; la comprobación queda demostrada durante la ejecución de la tarea.
- La suite contiene al menos una prueba real sobre la aplicación mínima.
- El comando de verificación queda documentado donde el flujo lo encontrará.

## Procedimiento sugerido

1. Instalar y configurar el ejecutor de pruebas y el linter decididos.
2. Escribir la primera prueba sobre la aplicación mínima.
3. Reunir pruebas, tipos, lint y compilación en un único comando de verificación.
4. Demostrar el ciclo rojo-verde induciendo un fallo y revirtiéndolo.
5. Documentar el comando de verificación en `modern-todo-app/README.md`.

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario: [fecha] — [Aprueba | Solicita cambios]
