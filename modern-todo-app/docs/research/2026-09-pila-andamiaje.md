# Pila tecnológica del andamiaje de modern-todo-app

> **Fecha:** 2026-09

## Propósito

Elegir la pila del subproyecto `modern-todo-app` —framework de componentes, lenguaje, gestor de paquetes, empaquetador con servidor de desarrollo, ejecutor de pruebas y herramientas de lint y formato— de modo que reproduzca las condiciones de una aplicación web contemporánea y sostenga las ideas siguientes del subproyecto.

## Contexto

`modern-todo-app` es la segunda prueba de concepto del sistema: el terreno realista donde el flujo de desarrollo se verifica ejecutando una suite por comando. La propuesta `docs/proposals/001-andamiaje-proyecto/` fijó la forma de la solución —proyecto web con dependencias gestionadas, tipado estático, compilación y verificación ejecutable— y dejó la pila concreta abierta, con React como candidato sugerido por la idea original.

Los criterios de la elección, declarados en la tarea: representatividad de un proyecto moderno, madurez del ecosistema, suite ejecutable por comando y sencillez para una PoC.

## Análisis

### Framework de componentes

**React.** Ventajas: máxima adopción (~126M descargas npm semanales, once veces las de Vue y ~29 veces las de Svelte [21]), ~45% de uso declarado en la encuesta Stack Overflow 2025 [22], mencionado en el 60-70% de las ofertas de empleo frontend [1][2]; ecosistema de paquetes más de diez veces mayor que el de Vue [1]. Desventajas: no es un framework completo y exige decisiones adicionales [3]; complejidad creciente percibida con los Server Components [2].

**Vue.** Ventajas: segunda en uso declarado (~18% en Stack Overflow 2025 [22]), curva de aprendizaje suave, componentes de archivo único legibles y documentación considerada de las más claras del ecosistema [2][3]. Desventajas: ecosistema ~10 veces menor que el de React y mercado laboral más delgado fuera de Europa y Asia [1][3].

**Svelte.** Ventajas: mayor satisfacción de quienes lo usan (primer puesto en interés y positividad del State of JS 2025); es un compilador sin runtime, con bundles ~2,5 veces menores y mediciones de rendimiento ~39% más rápidas que React [2][4][5]. Desventajas: ~7% de uso declarado [22] y ecosistema tres a cinco veces menor que el de Vue; poco representativa del proyecto típico [1][4].

### Lenguaje

**TypeScript.** Ventajas: dominio consolidado —40% de los encuestados del State of JS 2025 escriben exclusivamente TypeScript frente a 6% que solo usan JavaScript; lenguaje más usado en GitHub en 2025; todos los frameworks modernos lo generan por defecto en su andamiaje de proyectos [6][7][24]. Desventajas: verbosidad y paso de compilación obligado —que es justo lo que la PoC quiere reproducir.

**JavaScript plano (con o sin JSDoc).** Ventajas: sin paso de compilación. Desventajas: no reproduce el tipado estático que la propuesta exige; minoritario en proyectos nuevos (~29% en 2025) [8].

### Empaquetador y servidor de desarrollo

**Vite.** Ventajas: opción por defecto del ecosistema —~130M descargas npm semanales [23] y herramienta de inicialización por defecto de React, Vue, Svelte y Solid [9]—; servidor de desarrollo sobre ESM nativo con HMR de ~10-15 ms; Vite 8 integra Rolldown y cierra la brecha histórica entre desarrollo y producción [9][10]. Desventajas: esa divergencia dev/prod existió durante años, mitigada recientemente por Rolldown [10][11].

**Rspack/Rsbuild.** Ventajas: escrito en Rust, 5-10 veces más rápido que webpack y ~98% compatible con su API de plugins [9][12]. Desventajas: pensado para migrar bases webpack existentes, no como opción por defecto de proyectos nuevos; ecosistema más joven [9].

**Webpack.** Ventajas: referencia madura con un ecosistema enorme de loaders y plugins. Desventajas: sin características mayores desde 2021, HMR lento (~200-500 ms) y ya no es la opción por defecto de proyectos nuevos [9][11].

### Ejecutor de pruebas

**Vitest.** Ventajas: ESM y TypeScript nativos sin configuración; reutiliza la configuración y el pipeline de Vite, de modo que las pruebas transforman igual que el código de producción; API compatible con Jest; arranque instantáneo; Vitest 4 estable desde octubre de 2025 [13][14]. Desventajas: ecosistema más joven que el de Jest [15].

**Jest.** Ventajas: estándar histórico con el mayor ecosistema de utilidades. Desventajas: soporte ESM experimental, TypeScript vía `ts-jest`/Babel frágil, transformaciones divergentes de la build real y arranques lentos [13][15].

Para pruebas de componentes, la combinación habitual de la pila Vite es Vitest con Testing Library sobre un DOM simulado (jsdom o happy-dom), que ejecuta las pruebas por comando sin navegador [13][15].

### Lint y formato

**ESLint + Prettier.** Ventajas: estándar del ecosistema desde 2013, más de mil plugins, lint con información de tipos vía typescript-eslint, flat config desde la v9 y cobertura completa de reglas específicas de React [16][17]. Desventajas: lento (~15-30 s por 500 archivos) y dos herramientas que coordinar [16][18].

**Biome.** Ventajas: un solo binario en Rust que cubre lint, formato y organización de imports, ~25 veces más rápido y con salida 97% compatible con Prettier [16][17]. Desventajas: cobertura del ~75-85% de las reglas de typescript-eslint, soporte parcial de reglas específicas de framework y ecosistema joven [16][17].

**Oxlint.** Ventajas: 50-100 veces más rápido que ESLint como reemplazo directo [16]. Desventajas: solo lint —sin formato— y el soporte de plugins JS está en vista previa [16].

### Gestor de paquetes

**npm.** Ventajas: incluido con Node.js, referencia universal y compatibilidad total [19][20]. Desventajas: instalaciones más lentas y mayor uso de disco que pnpm o Bun —irrelevante a la escala de una PoC de paquete único [20].

**pnpm.** Ventajas: almacén direccionable por contenido, instalaciones rápidas y estrictura en la resolución de dependencias [19][20]. Desventajas: sus beneficios brillan en monorepos y su comportamiento con symlinks difiere del de npm en casos límite [20].

**Bun.** Ventajas: herramienta todo en uno —runtime, empaquetador, ejecutor de pruebas y gestor— con instalaciones rapidísimas. Desventajas: ecosistema más joven con riesgos de compatibilidad [19][20].

## Evaluación comparativa

### Representatividad de un proyecto moderno

- **React + TypeScript + Vite + Vitest + ESLint + npm:** máxima; es el conjunto por defecto del ecosistema en cada dimensión [2][6][9][13].
- **Vue o Svelte en lugar de React:** alta pero minoritaria [1][4].
- **Jest en lugar de Vitest:** media sobre una build Vite, por la fricción ESM/TS [13].
- **Biome en lugar de ESLint:** media; gana en sencillez pero pierde cobertura de reglas React [16][17].

### Madurez y coherencia del conjunto

- La pila recomendada es estable en todas sus piezas y se integra sin fricción: Vite genera proyectos React + TypeScript, Vitest reutiliza el pipeline de Vite y typescript-eslint cubre React.
- Biome, Rspack y Bun son viables pero menos representativos o menos integrados con el resto del conjunto.

### Verificación ejecutable por comando

- Todas las combinaciones candidatas la satisfacen: el criterio no discrimina entre ellas, pero descarta modelos de prueba que exijan abrir un navegador, como el `tests.html` de la PoC anterior.

### Sencillez para una PoC

- npm y ESLint son las opciones más familiares y universales; Vite y Vitest reducen la configuración al mínimo.
- Biome simplificaría a una sola herramienta, pero a costa de la cobertura de reglas específicas de React.

## Recomendación

**npm + TypeScript estricto + React + Vite + Vitest (con Testing Library y jsdom) + ESLint (flat config con typescript-eslint y plugins de React) + Prettier.**

Es la pila por defecto del ecosistema en cada dimensión, y por tanto la más representativa para el propósito de la PoC: todas las piezas se presuponen entre sí sin fricción. La elección confirma con evidencia el candidato React sugerido por la idea original: Vue o Svelte solo ganarían si el criterio dominante fuera la curva de aprendizaje o el tamaño del bundle, no la representatividad.

Las versiones concretas se fijan en la tarea de inicialización (002), tomando las estables publicadas con antelación suficiente en cada paquete.

## Limitaciones

- Las cifras de adopción proceden de encuestas auto-reportadas y agregadores de descargas: son proxy de representatividad, no medida exacta.
- No se compararon meta-frameworks (Next.js, SvelteKit): el alcance analizado es una aplicación de navegador sin renderizado en servidor, una delimitación propia del análisis y no declarada explícitamente en la propuesta. Si una idea posterior lo exigiera, la decisión debería revisarse.
- La cobertura de reglas de React en Biome y Oxlint evoluciona rápido; la elección de ESLint podría reevaluarse en una revisión futura.

## Referencias

- [1] Stackwise, «React vs Vue vs Svelte (2026)» — stackwise.info/compare/react-vs-vue-vs-svelte
- [2] SVAR Blog, «React, Vue, or Svelte in 2026: A Practical Framework Comparison» — svar.dev/blog/react-vs-vue-vs-svelte-for-modern-web-apps/
- [3] Merge, «Comparing front-end frameworks: Svelte vs React vs Vue» — merge.rocks/blog/comparing-front-end-frameworks-for-startups-in-2025-svelte-vs-react-vs-vue
- [4] SciHub101, «React vs Vue vs Svelte 2026 — Which Framework to Learn?» — scihub101.com/web-development/react-vs-vue-vs-svelte-2026
- [5] byteiota, «React 19 vs Vue 3.6 vs Svelte 5: 2026 Framework Convergence» — byteiota.com/react-19-vs-vue-3-6-vs-svelte-5-2026-framework-convergence/
- [6] InfoQ, «State of JavaScript 2025: Survey Reveals a Maturing Ecosystem with TypeScript Cementing Dominance» — infoq.com/news/2026/03/state-of-js-survey-2025/
- [7] GitHub Blog, «TypeScript's rise in the AI era» — github.blog/developer-skills/programming-languages-and-frameworks/typescripts-rise-in-the-ai-era-insights-from-lead-architect-anders-hejlsberg/
- [8] Crashbytes, «The Programming Language Power Shift 2025-2026» — crashbytes.com/articles/programming-language-trends-2025
- [9] PkgPulse, «Vite vs Rspack vs Webpack Bundler 2026» — pkgpulse.com/guides/vite-vs-rspack-vs-webpack-bundler-2026
- [10] devtoolbox, «Frontend Build Tools 2026: Vite, Webpack, Rspack» — devtoolbox.blog/build-tools-guide/
- [11] Steve Kinney, «Rspack, webpack, and Vite» — stevekinney.com/courses/enterprise-ui/rspack-webpack-and-vite
- [12] Rsbuild, «Introduction» — rsbuild.rs/guide/start/
- [13] LogRocket Blog, «Vitest 4 adoption guide: Overview and migrating from Jest» — blog.logrocket.com/vitest-adoption-guide/
- [14] Maarten Hus, «Why I migrated from Jest to Vitest» — maartenhus.nl/blog/why-i-migrated-from-jest-to-vitest/
- [15] Medium, «Jest vs Vitest — Which test runner should you use in 2025» — medium.com/@ruverd/jest-vs-vitest-which-test-runner-should-you-use-in-2025-5c85e4f2bda9
- [16] sph.sh, «Comparing TypeScript Formatting and Linting Tools: Biome, Oxlint, ESLint, and Prettier» — sph.sh/en/posts/compare-typescript-formatting-linting-tools/
- [17] Better Stack, «Biome vs ESLint: Comparing JavaScript Linters and Formatters» — betterstack.com/community/guides/scaling-nodejs/biome-eslint/
- [18] Levi9, «Static analysis is changing. Is ESLint holding you back?» — levi9.ro/blog/static-analysis-is-changing/
- [19] developersvoice, «Choosing the Right JavaScript Package Manager in 2025: npm vs. Yarn vs. pnpm vs. Bun» — developersvoice.com/blog/js/npm-yarn-pnpm-bun-comparison/
- [20] Joshua Rosato, «NPM vs. Yarn vs. PNPM vs. Bun» — joshuarosato.com/posts/npm-yarn-pnpm-bun-comparison/
- [21] npmtrends, «react vs vue vs svelte» — npmtrends.com/react-vs-svelte-vs-vue
- [22] Stack Overflow, «Developer Survey 2025» — survey.stackoverflow.co/2025
- [23] npm, «vite» — npmjs.com/package/vite
- [24] State of JS, «State of JavaScript 2025» — stateofjs.com
