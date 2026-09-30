# Pantalla mínima propia verificada de extremo a extremo

## Estado

[ ] Pendiente

## Tipo

desarrollo

## Objetivo

Sustituir el contenido del punto de partida de la pila por una pantalla mínima propia de la aplicación —su identidad visible— y comprobarla con la suite, cerrando el recorrido completo del terreno: el código se compila, se sirve, se muestra y se verifica.

## Dependencias

- 003 — la verificación ejecutable establecida.

## Entrada

- El proyecto inicializado con su suite de verificación funcionando.

## Resultado esperado

- La aplicación muestra una pantalla propia, con la identidad de la aplicación, sin restos del contenido del generador.
- La suite comprueba lo que la pantalla muestra y permanece en verde.

## Criterios de calidad

- No queda contenido del punto de partida de la pila: ni textos, ni estilos, ni recursos.
- La prueba de la pantalla comprueba su contenido visible, no detalles internos.
- La verificación completa queda en verde.

## Procedimiento sugerido

1. Reemplazar el componente inicial por la pantalla propia mínima.
2. Retirar los recursos del generador que ya no se usan.
3. Actualizar la prueba para que compruebe la pantalla real.
4. Ejecutar la verificación completa en verde.

## Notas

- La pantalla no gestiona tareas: eso es la idea 002. Es el cascarón visible que demuestra que el terreno funciona.
- El diseño visual es el mínimo viable; la guía de estilo del producto queda fuera de esta propuesta.

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario: [fecha] — [Aprueba | Solicita cambios]
