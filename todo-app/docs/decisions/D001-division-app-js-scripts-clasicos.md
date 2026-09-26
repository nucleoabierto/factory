# D001: División de app.js por capas con scripts clásicos y namespace compartido

## Estado

Aceptada

## Contexto

`app.js` concentra las cuatro capas de la aplicación —dominio (`TaskList`),
infraestructura (`Storage`), presentación (`UI`) y fachada (`App`)— en un
archivo único de ~1000 líneas que crece con cada épica. La aplicación es
vanilla JS sin build ni framework y se ejecuta abriendo `index.html`
directamente sobre `file://`, donde los ES modules no cargan por las
restricciones CORS del navegador.

## Decisión

Dividimos `app.js` en un archivo por capa, cargados como `<script>` clásicos
en orden de dependencias —infraestructura-neutral → dominio → presentación →
fachada—, compartiendo lo imprescindible a través de un namespace global.
Descartamos los ES modules.

## Justificación

Los ES modules no funcionan sobre `file://` sin servidor, y servir la app con
un servidor contradice la forma de uso declarada (abrir `index.html`
directamente). Mantener el archivo único evita el problema de encapsulación
pero concentra físicamente capas ya separadas lógicamente y hace creciente el
coste de navegar el código. Los scripts clásicos con un namespace global
mantienen la ejecución por `file://` a costa de debilitar la encapsulación
que hoy da el scope único: se acepta exponer solo lo que el contrato exige
(`window.App`, y `window.UI` si ya está expuesta), mientras el estado privado
de `TaskList` (campos `#`) permanece inaccesible.

## Referencias

- `docs/architecture-reviews/003-modularidad-y-tests.md` (hallazgo H1)
- `docs/tasks/028-decidir-modularizacion-scripts-clasicos.md`
- `docs/tasks/029-separar-app-js-en-archivos.md`
