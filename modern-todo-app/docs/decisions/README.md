# Decisiones de diseño

Índice de las decisiones de diseño del subproyecto, registradas y mantenidas por el skill `decisiones-diseno`. `consultar-decisiones` lo consulta para recuperar las decisiones que aplican a un trabajo.

<!-- Formato de cada entrada: el archivo de la decisión en su línea y los
     datos como sub-bullets, con los disparadores siempre en la primera
     posición para que una búsqueda los encuentre sin arrastrar el resumen.
     El estado refleja la sección «Estado» del archivo de la decisión.

     - DNNN-slug.md
       - Disparadores: [archivos, artefactos, palabras clave]
       - Resumen: [una frase]
       - Estado: [Aceptada | Sustituida por DNNN | Obsoleta]
-->

- D001-pila-react-ts-vite-vitest-eslint-npm.md
  - Disparadores: pila, stack, React, TypeScript, Vite, Vitest, ESLint, Prettier, npm, toolchain, dependencias, package.json
  - Resumen: La pila del subproyecto es npm + TypeScript estricto + React + Vite + Vitest (Testing Library + jsdom) + ESLint + Prettier, elegida por representatividad del proyecto moderno.
  - Estado: Aceptada
- D002-estado-dominio-modulo-puro.md
  - Disparadores: modelo de estado, dominio, useReducer, Context, store, Zustand, Redux, server state, persistencia local, estado serializable
  - Resumen: El estado del dominio es un módulo TypeScript puro —transiciones sobre estado serializable— consumido por useReducer + Context, con la persistencia tras un puerto; sin store externa ni librería de server state.
  - Estado: Aceptada
