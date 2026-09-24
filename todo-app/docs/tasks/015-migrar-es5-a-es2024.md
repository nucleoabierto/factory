# Migrar el código de ES5 a ES2024

## Estado

[ ] Pendiente | [ ] En progreso | [ ] En revisión | [ ] Completada | [ ] Bloqueada

## Tipo

mantenimiento

## Objetivo

Modernizar la sintaxis del código de la aplicación de ES5 a ES2024 — `var` a `const`/`let`, funciones flecha, template literals, clases ya parcialmente adoptadas, desestructuración, métodos abreviados, parámetros por defecto — para que el estilo del código refleje el estándar actual del lenguaje y no una mezcla de épocas. La migración no cambia el comportamiento observable: es una modernización de forma, no de función.

## Dependencias

- Ninguna

## Entrada

- `app.js` — código principal en estilo ES5 (`var`, funciones `function`, concatenación de cadenas) con una clase `TaskList` que ya usa `class` y campos `#`, aunque sus métodos conservan sintaxis ES5.
- `index.html` y `tests.html` — código inline que pueda contener sintaxis ES5 (el inline de `tests.html` es ES5; migrarlo también es parte del alcance, cambiando solo su sintaxis).
- `docs/lessons/idioma-del-codigo.md` — convención de idioma del código.
- `docs/lessons/comunicacion-en-codigo.md` — lineamientos de comentarios y nombres.
- D018 — vanilla JS sin build ni framework (`docs/decisions/` del repositorio raíz); la aplicación sigue siendo un script clásico accesible vía `index.html`, sin módulos ES ni toolchain.

## Resultado esperado

- El código de `app.js` y el inline de los HTML usa sintaxis ES2024 de forma consistente; no quedan `var` ni patrones propios de ES5 cuando existe un equivalente moderno idiomático.
- La suite QUnit de `tests.html` pasa íntegra; los tests solo cambian de sintaxis — mismas aserciones, misma cobertura, mismo comportamiento.
- La aplicación funciona igual al abrir `index.html`: mismo comportamiento observable en crear, completar, editar, borrar, filtrar, limpiar, persistir.

## Criterios de calidad

- El comportamiento observable no cambia — criterio de aceptación del tipo `mantenimiento`: misma API pública de `App`, `TaskList`, `Storage` y `UI`, mismos resultados en la suite.
- Sin cambios de alcance: no se introduce build, módulos ES, framework ni dependencia nueva (D018); el script sigue siendo clásico.
- La modernización es idiomática, no mecánica: se adopta cada rasgo donde aporta claridad (p. ej. template literals donde se concatenan cadenas), no por norma ciega.
- Los comentarios existentes se conservan; si alguno deja de ser cierto tras la migración, se ajusta.
- El documento de dominio se actualiza solo si las anclas cambian.

## Procedimiento sugerido

1. Recorrer `app.js` y el código inline identificando cada rasgo ES5 y su equivalente moderno.
2. Migrar por secciones (modelo, persistencia, presentación, fachada) manteniendo la suite ejecutable entre pasos.
3. Verificar la suite QUnit en verde y la app funcionando en el navegador.

## Notas

- Origen: solicitud directa del usuario; primera tarea creada con tipo `mantenimiento` explícito — el criterio de aceptación es la invariancia del comportamiento observable.
- La clase `TaskList` ya usa sintaxis moderna (campos `#`, clases); la migración la deja consistente con el resto del archivo en lugar de uniformarla hacia abajo.

## Revisión

- Subagente: 2026-09-24 — Aprueba (primera pasada solicitó cambios: contradicción de alcance en tests.html, precisión sobre TaskList, tipografía; resueltos)
- Usuario: 2026-09-24 — Aprueba
