# Inicializar el proyecto con la pila decidida

## Estado

[x] Completada

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

## Contexto

- Archivos similares: ninguno aplica — el subproyecto no tiene código y es el primer proyecto con toolchain del repositorio; `todo-app/` (vanilla JS, scripts clásicos, pruebas en `tests.html` de navegador) es la PoC hermana y referencia negativa: sus condiciones son justo las que esta pila no reproduce.
- Patrones: guía de arquitectura de la épica `docs/epics/001-andamiaje-proyecto.md` — la pila se consume sin reabrirla, la verificación única por comando es el contrato que esta tarea prepara (la cablea la 003) y los comandos del proyecto se documentan en `modern-todo-app/README.md`.
- Dominio: ninguna aplica — el subproyecto no tiene `docs/domains/` ni código que documentar.
- Producto: ninguna aplica — el subproyecto no tiene documentación de producto ni funcionalidad.
- Lecciones: `validacion` (el proyecto es terreno de una PoC: la estructura debe servir de estímulo realista, no de demo ad hoc); `nomenclatura` (directorios y artefactos nombrados por el contenido que almacenan); `diseno-de-artefactos` (la pila concreta es dato de entrada de la tarea, registrada en D001, no algo a redecidir).
- Decisiones: `D001` del subproyecto (`docs/decisions/D001-pila-react-ts-vite-vitest-eslint-npm.md`) — fija npm, TypeScript estricto, React, Vite, Vitest con Testing Library + jsdom y ESLint + Prettier; `docs/research/2026-09-pila-andamiaje.md` como investigación de apoyo.

## Conectividad

**Conectada.** Todo lo que la tarea asume existe: el directorio `modern-todo-app/` está creado; la decisión de pila `D001` y su investigación de apoyo están registradas; el entorno dispone de Node v24.12.0 y npm 11.6.2 con el registro npm accesible (verificado con `npm ping`), condición suficiente para inicializar el proyecto con `npm create vite` y fijar dependencias.

## Plan técnico

Subsistema: `modern-todo-app/` contiene solo `docs/` y `TODO.txt`; la tarea crea el codebase completo dentro del mismo directorio, conviviendo con los artefactos de proceso. Decisiones transversales: la pila es la de `D001` y no se reabre; los comandos se documentan en `README.md`; la verificación única la cablea la tarea 003 sobre esta base.

- [x] Inicializar el proyecto con la herramienta oficial de la pila (scaffolding Vite, plantilla React+TS) dentro de `modern-todo-app/`
  - Aporta: genera la base canónica —manifiesto, `index.html`, `src/` y configuraciones— sin reescribir a mano lo que la herramienta produce.
  - Contexto: el directorio no está vacío (contiene `docs/` y `TODO.txt`); el scaffolding convive con esos artefactos y no debe pisarlos — los archivos que genera no existen aún.
- [x] Fijar las dependencias a versiones estables publicadas con antelación suficiente e instalar
  - Aporta: cumple el criterio de antelación de la tarea y produce el lockfile — instalación reproducible desde cero.
- [x] Ignorar los artefactos generados (`node_modules`, salida de compilación) en `.gitignore`
  - Aporta: subproyecto y repositorio comparten un solo git; sin esto, los artefactos ensuciarían el índice de trabajo.
- [x] Endurecer la configuración de tipado a strict y organizar el código fuente en módulos
  - Aporta: el tipado estricto es contrato de `D001`; la estructura de módulos desde el inicio evita el archivo único que la tarea prohíbe.
- [x] Comprobar instalación limpia, compilación y servidor de desarrollo
  - Aporta: la evidencia de los criterios — reinstalar desde cero, compilar en verde, servir la aplicación.
- [x] Documentar los comandos del proyecto en `modern-todo-app/README.md`
  - Aporta: la superficie de comandos queda visible para el flujo; la tarea 003 la extenderá con la verificación.
  - Contexto: si el scaffolding crea un `README.md` de plantilla, se adapta al proyecto, no se conserva el texto del generador.

## Suite de pruebas esperada

Caso de uso «inicializar el proyecto desde cero» (pruebas de arnés, verificables por comando, sin letra ZOMBIE):

1. Con el directorio sin artefactos de instalación, el comando de instalación resuelve las dependencias, termina sin error y deja el lockfile fijado.
2. El comando de compilación termina en verde y produce la salida lista para servir.
3. La comprobación de tipos en modo estricto termina sin errores sobre el código inicial.
4. El servidor de desarrollo arranca y sirve la página inicial de la aplicación.
5. Regresión: un error de tipo inducido en un módulo hace fallar la comprobación de tipos y, al revertirlo, vuelve al verde — demuestra que el modo estricto está activo, no solo configurado.

## Revisión

- Subagente: 2026-09-30 — Aprueba (observaciones menores: texto de plantilla y `<title>` corregidos; asimetría de rangos `^` aceptada — el lockfile fija)
- Usuario: 2026-09-30 — Aprueba

## Desviaciones del plan

- El scaffolding de Vite generó **oxlint** como linter (`.oxlintrc.json`, dependencia y script `lint`), en conflicto con `D001` (ESLint + Prettier). Se retiraron esos artefactos y el lint se cablea en la tarea 003 según `D001`.
- Se añadió el script `typecheck` (`tsc -b`) para que la comprobación de tipos corra como comando independiente — la plantilla solo la embebía dentro de `build`.
- `vite` quedó fijado a la versión exacta `8.3.0` y `@types/node` a `~24.13.6`: los rangos del scaffolding resolvían a `8.3.1` y `24.19.0`, publicadas hace 5 y 4 días, por debajo de la antelación exigida.
- La plantilla de TypeScript 6 no declaraba `"strict": true` explícito; se añadió a ambos tsconfig para garantizar el contrato de `D001` con independencia de los defaults de la versión.
