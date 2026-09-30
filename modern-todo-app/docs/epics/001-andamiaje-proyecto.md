# Andamiaje del proyecto

## Estado

[x] Completada

## Objetivo

`modern-todo-app` es una aplicación web real con toolchain completo —gestión de dependencias, tipado estático, compilación y servidor de desarrollo— cuya verificación —pruebas, tipos, lint y compilación— se ejecuta con un solo comando, y que muestra una pantalla propia mínima comprobada por esa suite.

## Alcance

- **Dentro:** elección de pila justificada y registrada como decisión; proyecto instalable, compilable y servible; comando único de verificación con ciclo rojo-verde demostrado; pantalla propia verificada de extremo a extremo.
- **Fuera:** funcionalidad de dominio (ideas 002–005), integración continua remota, despliegue o publicación, guía de estilo y diseño visual del producto.

## Piezas

- [ ] docs/tasks/001-decidir-pila-andamiaje.md — Decidir la pila tecnológica del andamiaje
- [ ] docs/tasks/002-inicializar-proyecto-toolchain.md — Inicializar el proyecto con la pila decidida
- [ ] docs/tasks/003-verificacion-ejecutable.md — Establecer la verificación ejecutable
- [ ] docs/tasks/004-pantalla-minima-propia.md — Pantalla mínima propia verificada de extremo a extremo

## Plan técnico

- **Orden:** lineal, 001 → 002 → 003 → 004; cada pieza depende de la anterior.
- **Dependencias:** 002 consume la pila decidida en 001; 003 cablea la verificación sobre el proyecto de 002; 004 se apoya en la verificación de 003.
- **Decisiones transversales:** la pila se decide una vez en 001 y las demás piezas la consumen sin reabrirla; la verificación única por comando es el contrato que todo cambio posterior respeta; todo el trabajo vive dentro de `modern-todo-app/` y sus comandos se documentan en su `README.md`.

## Criterio de cierre

Un comando de verificación ejecuta pruebas, tipos, lint y compilación en verde sobre una aplicación que muestra una pantalla propia, y un fallo inducido la pone en rojo.

## Revisión

- Usuario: 2026-09-29 — Aprueba
