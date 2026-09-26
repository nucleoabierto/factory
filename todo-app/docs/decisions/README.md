# Decisiones

Índice de decisiones de diseño de todo-app. Cada decisión vive en un archivo
`DNNN-slug.md` con su contexto, decisión, justificación y estado.

<!-- Formato de cada entrada: el archivo en su línea y los datos como
     sub-bullets, con los disparadores siempre en la primera posición.

     - DNNN-slug.md
       - Disparadores: [archivos, artefactos, palabras clave]
       - Resumen: [una frase]
       - Estado: Aceptada | Sustituida por DNNN | Obsoleta
-->

- D001-division-app-js-scripts-clasicos.md
  - Disparadores: app.js, archivos por capa, scripts clásicos, ES modules, namespace, index.html, tests.html, file://, modularización
  - Resumen: `app.js` se divide en un archivo por capa cargado con `<script>` clásico en orden de dependencias, compartiendo lo imprescindible por un namespace global; los ES modules quedan descartados por incompatibles con `file://`.
  - Estado: Aceptada
