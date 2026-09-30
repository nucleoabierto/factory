# D001: Pila React + TypeScript + Vite + Vitest + ESLint + npm

## Estado

Aceptada

## Contexto

El subproyecto `modern-todo-app` necesita una pila tecnológica que reproduzca las condiciones de una aplicación web contemporánea y sirva de terreno a las ideas siguientes (núcleo TodoMVC, backend, organización avanzada y sincronización). La propuesta 001 fijó la forma del andamiaje y dejó la elección de pila como primera pieza del conjunto, con React como candidato no fijado.

## Decisión

Usamos npm como gestor de paquetes, TypeScript en modo estricto como lenguaje, React como framework de componentes, Vite como empaquetador y servidor de desarrollo, Vitest con Testing Library y jsdom como suite de pruebas, y ESLint (flat config con typescript-eslint y plugins de React) + Prettier para lint y formato.

## Justificación

Cada pieza es la opción mayoritaria de su dimensión según la investigación de apoyo, lo que maximiza la representatividad —el criterio dominante de una PoC que busca reproducir un proyecto moderno—: React lidera la adopción, TypeScript es el lenguaje mayoritario en proyectos nuevos, Vite es el empaquetador por defecto del ecosistema, Vitest se integra con su pipeline y ESLint conserva la mayor cobertura de reglas. Las alternativas (Vue, Svelte, Rspack, Jest, Biome, pnpm, Bun) son viables pero menos representativas o menos integradas entre sí. Consecuencias negativas aceptadas: ESLint + Prettier son más lentos y requieren más configuración que Biome; npm es más lento que pnpm y Bun.

## Referencias

- docs/research/2026-09-pila-andamiaje.md — investigación de apoyo con la comparación por dimensión
- docs/proposals/001-andamiaje-proyecto/propuesta.md — propuesta que fijó la forma del andamiaje
