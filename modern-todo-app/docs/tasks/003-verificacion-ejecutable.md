# Establecer la verificación ejecutable

## Estado

[x] Completada

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

## Contexto

- Archivos similares: ninguno aplica — el subproyecto tiene su primera suite por construir; `todo-app/tests.html` (QUnit en navegador) es la referencia negativa: verificación manual fuera del pipeline que esta tarea sustituye. Los artefactos existentes que la tarea toca son `package.json` (scripts), `vite.config.ts` (punto de integración del runner), `tsconfig*.json` (los archivos de prueba deben quedar cubiertos por el tipado estricto) y `src/components/App.tsx` (objeto de la prueba semilla).
- Patrones: guía de arquitectura de la épica `docs/epics/001-andamiaje-proyecto.md` — la verificación única por comando es el contrato que esta tarea establece y que todo cambio posterior respeta; el comando se documenta en `modern-todo-app/README.md`. De la tarea 002 hereda: script por verificación (`typecheck` ya existe), versiones fijadas con antelación suficiente en `package-lock.json`.
- Dominio: ninguna aplica — el subproyecto no tiene `docs/domains/`.
- Producto: ninguna aplica — el subproyecto no tiene documentación de producto.
- Lecciones: `validacion` (la prueba semilla y el ciclo rojo-verde son estímulos reales ejecutables, no declaraciones); `diseno-de-artefactos` (el stack concreto es dato de entrada registrado en D001); `nomenclatura` (los archivos de prueba se nombran por el componente que ejercitan); `alcance` (hallazgos fuera de alcance se reportan, no se arreglan).
- Decisiones: `D001` del subproyecto (`docs/decisions/D001-pila-react-ts-vite-vitest-eslint-npm.md`) — fija Vitest con Testing Library y jsdom como suite y ESLint (flat config, typescript-eslint) + Prettier para lint y formato; `docs/research/2026-09-pila-andamiaje.md` como investigación de apoyo. `D031` del repo — plan y suite aprobados antes de ejecutar.

## Conectividad

**Conectada.** Todo lo que la tarea asume existe: el proyecto inicializado está en `modern-todo-app/` con `package.json`, `vite.config.ts` y `src/` operativos (tarea 002 ejecutada); el registro npm es accesible y contiene todas las piezas de `D001` —vitest, @testing-library/react + dom + jest-dom, jsdom, eslint, typescript-eslint, eslint-plugin-react-hooks + react-refresh, prettier, eslint-config-prettier, globals— con versiones estables publicadas con antelación suficiente (las últimas de vitest, typescript-eslint, jsdom y prettier tienen 2–8 días; hay predecesoras maduras a las que fijar).

## Plan técnico

Subsistema: `modern-todo-app/` ya tiene toolchain operativo; esta tarea añade las piezas de verificación de `D001` (Vitest + Testing Library + jsdom, ESLint flat + Prettier) y las reúne en un comando único. No toca funcionalidad — la prueba semilla ejercita la pantalla del scaffolding.

- [x] Instalar y fijar las piezas de verificación de `D001` con antelación suficiente
  - Aporta: vitest `5.0.1`, jsdom `30.1.0`, prettier `3.9.8` y typescript-eslint `~8.70.1` se fijan por debajo de sus últimas versiones (publicadas hace 2–8 días); eslint `~10.11.0`, @testing-library/react `^16.3.3`, dom `^10.4.2`, jest-dom `^7.0.1`, eslint-plugin-react-hooks `^7.1.1`, react-refresh `^0.5.7`, eslint-config-prettier `^10.1.8`, globals `^17.12.0` ya resuelven maduras.
  - Contexto: mismo criterio de antelación aplicado en la 002.
- [x] Configurar Vitest con jsdom y archivo de setup (matchers jest-dom)
  - Aporta: el runner reutiliza el pipeline de Vite —mismo transform que producción— y los tests quedan cubiertos por el tipado estricto.
- [x] Configurar ESLint flat (`eslint.config.js`) y Prettier
  - Aporta: recommended + typescript-eslint + react-hooks + react-refresh + eslint-config-prettier; ignora `dist`. `.prettierignore` excluye `dist`, `docs/` y `package-lock.json` (artefactos de proceso con formato propio / generados); se normaliza el código existente con una pasada de formato si hiciera falta.
- [x] Escribir la prueba semilla sobre `App` (render + click del contador incrementa)
  - Aporta: primera prueba real, convención `*.test.tsx` junto al componente.
- [x] Reunir la verificación en un comando único `npm run verify`
  - Aporta: `typecheck && lint && format:check && test && build` encadenados — el contrato que todo cambio posterior respeta.
- [x] Demostrar el ciclo rojo-verde induciendo fallos en cada etapa (test, lint, format) y revirtiéndolos
  - Aporta: evidencia de que cada pieza del comando detecta de verdad, no solo está configurada.
- [x] Documentar `verify` en `modern-todo-app/README.md`

## Suite de pruebas esperada

Caso de uso «verificar el proyecto por comando» (arnés, sin letra ZOMBIE):

1. `npm run verify` termina en verde sobre el código inicial ejecutando typecheck, lint, format, test y build sin intervención.
2. La prueba semilla renderiza `App` y comprueba que el contador incrementa al hacer click — la suite contiene una prueba real.
3. Fallo inducido en la prueba (aserción rota) → `verify` en rojo → revertido → verde.
4. Fallo inducido de lint (regla violada en código) → `verify` en rojo → revertido → verde.
5. Fallo inducido de formato (archivo no conforme a Prettier) → `verify` en rojo → revertido → verde.
6. El comando queda documentado en el README donde el flujo lo encuentra.

## Revisión

- Subagente: 2026-09-30 — Aprueba (corregido: `lint` ahora pasa `--max-warnings 0` para que los warnings rompan `verify`; aceptadas la doble ejecución de `tsc -b` en `build` y que `eslint.config.js` no se lintee a sí mismo)
- Usuario: 2026-09-30 — Aprueba

## Desviaciones del plan

- jsdom quedó en la versión planeada (`30.1.0`), pero la serie 30.x exige Node ≥24.15 y el entorno tenía 24.12.0. En lugar de bajar a jsdom 29 —primer intento, descartado a petición del usuario—, se subió el entorno a Node 24.21.0 (`lts/krypton`) con nvm, y el requisito quedó declarado en `.nvmrc` y en el campo `engines` de `package.json` —ninguno estaba previsto en el plan—.
- Se añadió `@eslint/js` como dependencia: el flat config recomendado lo importa y no estaba en la lista de piezas del plan.
- El setup de pruebas registra `afterEach(cleanup)` explícito: sin `globals: true` de Vitest, Testing Library no limpia el DOM entre tests y el segundo render convivía con el primero.
