# Inicializar el proyecto con la pila decidida

## Estado

[ ] Pendiente

## Tipo

desarrollo

## Objetivo

Crear la estructura del proyecto en `modern-todo-app/` con la pila elegida: manifiesto de paquetes con dependencias fijadas, configuración de tipado estático, empaquetador con compilación y servidor de desarrollo, y una aplicación mínima que arranca.

## Dependencias

- 001 — la pila tecnológica decidida.

## Entrada

- La decisión de pila registrada en `docs/decisions/` del subproyecto y su investigación de apoyo en `docs/research/`.

## Resultado esperado

- El directorio `modern-todo-app/` contiene un proyecto instalable, compilable y servible en desarrollo, con estructura de módulos real.
- La aplicación mínima arranca y muestra la pantalla que trae el punto de partida de la pila.

## Criterios de calidad

- El proyecto se instala desde cero con el gestor de paquetes elegido y las versiones quedan fijadas.
- Las versiones fijadas son estables publicadas con antelación suficiente, no recién salidas.
- La compilación y el servidor de desarrollo funcionan por comando.
- El tipado estático está configurado en modo estricto.
- El código fuente vive en una estructura de módulos, no en un único archivo.

## Procedimiento sugerido

1. Inicializar el proyecto con la herramienta oficial de la pila decidida.
2. Configurar el tipado estático en modo estricto y organizar el código fuente en módulos.
3. Comprobar instalación limpia, compilación y servidor de desarrollo.
4. Documentar los comandos del proyecto —instalar, compilar, servir— en `modern-todo-app/README.md`.

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario: [fecha] — [Aprueba | Solicita cambios]
