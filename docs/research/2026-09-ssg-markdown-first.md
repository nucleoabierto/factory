# Generadores de sitio Markdown-first de configuración progresiva

> **Fecha:** 2026-09

## Propósito

Elegir el generador de sitio estático que adopta la documentación de producto de todo-app, entre los candidatos cuya entrada es Markdown simple y que funcionan sobre un directorio de `.md` sin configuración obligatoria, con personalización progresiva.

## Contexto

La forma de solución ya está decidida: Markdown simple como fuente única, legible directamente en el repositorio, sin build obligatorio para leer los documentos; el SSG existe para producir el sitio navegable cuando se quiera. La investigación previa (`docs/research/2026-09-documentacion-producto-y-roadmap.md`) descartó Sphinx (RST, autodoc orientado a Python) y dejó abierta la elección entre los Markdown-first. El criterio estructural de la decisión es triple: funciona sobre un directorio de `.md` sin configurar; la configuración existe pero es opcional e incremental; el contenido es consumible por humanos directamente en el repo.

## Análisis

### 1. MkDocs

Generador maduro, Markdown nativo, instalable con `pip`. Requiere un `mkdocs.yml`, pero el único ajuste obligatorio es `site_name`; todo lo demás es opcional [1][2]. Sin `nav`, la navegación se autogenera por orden alfabético con los `index` primero, lo que equivale a un índice navegable sin esfuerzo [2][3]. La personalización es incremental: `nav` explícito, tema (Material for MkDocs añade búsqueda, navegación instantánea y diseño pulido), extensiones de Python Markdown y plugins [2][4].

**Ventajas:**
- Máxima madurez y documentación; el nivel cero efectivo es una línea de configuración.
- El contenido queda en Markdown puro.
- Instalable como herramienta aislada con `pipx` (`pipx install mkdocs`; `pipx inject mkdocs mkdocs-material` para el tema y los plugins), sin gestionar un virtualenv propio ni tocar el Python del sistema [16][17].

**Desventajas:**
- Toolchain Python sobre un proyecto sin build.
- No es literalmente cero configuración.

### 2. Zensical

El sucesor que el equipo de Material for MkDocs lanzó en noviembre de 2025 (0.1.0), escrito en Rust y Python y distribuido por PyPI [5][6]. Consolida generador y tema en una sola pila, lee `mkdocs.yml` nativamente y mantiene el mismo modelo de configuración progresiva (`zensical.toml`; `site_name` es hoy el único ajuste requerido, con planes de hacerlo opcional) [6][7]. La búsqueda viene activada por defecto [8].

**Ventajas:**
- Compatible con la configuración de MkDocs: migración casi gratuita en ambos sentidos.
- Búsqueda y tema modernos sin plugins.

**Desventajas:**
- Versión 0.1.0 con paridad de plugins incompleta y API de módulos en desarrollo; alta velocidad de cambio [5][7].

### 3. VitePress

SSG del ecosistema Vue/Vite con enrutado por archivos: cada `.md` produce su `.html` sin configuración alguna [9]. La configuración (`.vitepress/config.ts`) es opcional en sí, pero la navegación lateral y la barra superior solo existen si se declaran en `themeConfig`; sin ella las páginas son accesibles por URL pero sin índice navegable [10][11].

**Ventajas:**
- Cero configuración literal.
- Mismo lenguaje de toolchain que todo-app (Node).

**Desventajas:**
- Introduce dependencias npm en un proyecto que hoy no tiene ninguna.
- La navegación exige configuración: el nivel cero produce un sitio sin índice.

### 4. mdBook

Generador de libros del ecosistema Rust (binario único). Exige `book.toml` y un `src/SUMMARY.md` que lista todos los capítulos: el índice es un archivo obligatorio, no derivado [12][13]. La configuración admite preprocessors, temas y búsqueda integrada [13].

**Ventajas:**
- Binario único sin runtime.
- Búsqueda y temas incorporados.

**Desventajas:**
- Incumple el criterio estructural: no funciona sobre un directorio de `.md` sin crear primero el manifiesto `SUMMARY.md`.
- Su modelo de «libro» lineal encaja peor con guías y referencia sueltas.

### 5. docsify

No es un SSG propiamente: un único `index.html` carga y renderiza el Markdown en el navegador, sin build ni HTML estático [14][15]. La barra lateral es opcional (`_sidebar.md`) y la configuración vive en el propio `index.html` [15].

**Ventajas:**
- El mínimo absoluto de infraestructura; despliegue trivial en GitHub Pages.

**Desventajas:**
- No genera HTML estático (renderizado en cliente, peor para lectura offline, accesibilidad y SEO).
- La navegación depende de convenciones de nombres (`_sidebar.md`) menos estándar.

## Evaluación comparativa

### Funciona sobre un directorio de `.md` sin configurar

- **VitePress y docsify:** sí. Enrutado por archivos o renderizado en cliente sin manifiesto.
- **MkDocs y Zensical:** casi. Requieren una línea (`site_name`); a cambio autogeneran la navegación completa.
- **mdBook:** no. `SUMMARY.md` es obligatorio.

### Índice navegable sin trabajo adicional

- **MkDocs y Zensical:** sí, autogenerado alfabéticamente.
- **VitePress:** no; el sidebar es manual desde el primer enlace.
- **mdBook:** manual por definición (`SUMMARY.md`).
- **docsify:** manual vía `_sidebar.md`.

### Personalización progresiva

- **MkDocs y Zensical:** `site_name` → `nav` → tema Material → plugins/extensiones. Zensical comparte el modelo y lee `mkdocs.yml`.
- **VitePress:** todo en `config.ts` (nav, sidebar, búsqueda local, markdown-it).
- **docsify:** opciones en `index.html`; plugins de búsqueda y temas.
- **mdBook:** `book.toml` con preprocessors y renderers.

### Toolchain y coherencia con el proyecto

- **docsify:** mínima (un archivo HTML).
- **mdBook:** binario único.
- **MkDocs y Zensical:** Python como herramienta aislada vía `pipx`, sin gestionar entornos.
- **VitePress:** Node/npm, mismo lenguaje de todo-app pero primera dependencia de toolchain del proyecto.

### Madurez y riesgo

- **MkDocs:** el más maduro y documentado.
- **VitePress y mdBook:** maduros en sus ecosistemas (Vue y Rust).
- **docsify:** mantenido, pero su modelo de renderizado en cliente es una decisión estructural difícil de revertir sin cambiar de herramienta.
- **Zensical:** 0.1.0, en evolución rápida.

## Recomendación

**MkDocs**, con `site_name` como única configuración inicial.

Es el punto que mejor equilibra el criterio estructural: una línea de `mkdocs.yml` —externa al directorio de documentos, que sigue siendo Markdown puro legible en el repo— produce ya un sitio con índice navegable autogenerado, algo que VitePress y docsify no dan sin configuración adicional, y que mdBook exige mediante un manifiesto obligatorio. La escalera de personalización es incremental y conocida (`nav` → Material → plugins), y si Zensical madura, la migración es casi gratuita porque lee `mkdocs.yml` nativamente: la adopción de MkDocs no cierra esa puerta.

- **Sin configuración:** los documentos se leen en el repositorio tal cual; MkDocs no interviene.
- **Nivel mínimo (`site_name`):** sitio estático con navegación alfabética y búsqueda del tema base.
- **Nivel de estructura (`nav`):** orden y títulos explícitos del índice.
- **Nivel de producto (Material + extensiones):** búsqueda mejorada, navegación instantánea, admoniciones y demás bloques que la documentación de producto puede necesitar.

## Limitaciones

- Las herramientas de documentación —y en especial las recientes como Zensical— cambian rápido; la adopción real es difícil de medir y las capacidades declaradas pueden quedar desfasadas en meses. La marca temporal de este documento es la referencia para revalidar.
- Todas las fuentes son documentación oficial de cada proyecto; no se midió adopción ni se construyó ningún prototipo comparativo.
- La recomendación asume el tamaño actual de todo-app (PoC); si la documentación crece en volumen o audiencia externa, conviene reevaluar, en particular la posición de Zensical.

## Referencias

- [1] MkDocs, «Getting Started» (`site_name` única opción requerida) — github.com/mkdocs/mkdocs/blob/master/docs/getting-started.md
- [2] MkDocs, «Configuration» — mkdocs.org/user-guide/configuration/
- [3] MkDocs, «Writing Your Docs» (navegación autogenerada) — mkdocs.org/user-guide/writing-your-docs/
- [4] Material for MkDocs — squidfunk.github.io/mkdocs-material/
- [5] Material for MkDocs blog, «Zensical – A modern static site generator» (2025-11-05) — squidfunk.github.io/mkdocs-material/blog/2025/11/05/zensical/
- [6] Zensical, «Get started» — zensical.org/docs/get-started/
- [7] Zensical, «Create your site» — zensical.org/docs/create-your-site/
- [8] Zensical, «MkDocs plugins» (búsqueda activada por defecto) — zensical.org/docs/compatibility/mkdocs/plugins/
- [9] VitePress, «Getting Started» (enrutado por archivos) — vitepress.dev/guide/getting-started
- [10] VitePress, «Sidebar» — vitepress.dev/reference/default-theme-sidebar
- [11] VitePress, «Default Theme Config» — vitepress.dev/reference/default-theme-config
- [12] mdBook, «Creating a book» (`SUMMARY.md` obligatorio) — rust-lang.github.io/mdBook/guide/creating.html
- [13] mdBook, «Configuration» — rust-lang.github.io/mdBook/format/configuration/
- [14] docsify — docsify.js.org
- [15] docsify, «Quick start» y «Adding pages» — github.com/docsifyjs/docsify
- [16] pipx, «Inject packages» — pipx.pypa.io/latest/how-to/inject-packages.html
- [17] kernelkit/infix, `.github/workflows/docs.yml` (`pipx install mkdocs` + `pipx inject`) — github.com/kernelkit/infix
