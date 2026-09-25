# Migrar el código de ES5 a ES2024

## Estado

[ ] Pendiente | [ ] En progreso | [ ] En revisión | [x] Completada | [ ] Bloqueada

## Tipo

mantenimiento (refactoring)

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

## Plan técnico

El subsistema es `app.js`, un script clásico dentro de una IIFE con cuatro piezas: `TaskList` (modelo, ya con `class` y campos `#` pero callbacks ES5), `Storage`, `UI` y `App` (objetos literales con `metodo: function`). `tests.html` lleva la suite QUnit inline en ES5; `index.html` no tiene código inline. Las anclas del documento de dominio son nombres de métodos y propiedades, que la migración conserva.

1. Sustituir `var` por `const`/`let` y `indexOf` por `includes` en constantes, `Storage`, `UI` y `App`: fija la intención de mutabilidad de cada binding y moderniza las búsquedas en colecciones.
2. Modernizar los callbacks internos de `TaskList` (`forEach`, `filter`, `map`, `reduce`) a funciones flecha y reescribir `#find` con `.find()`: deja el cuerpo de la clase consistente con la sintaxis moderna que ya usan sus campos.
3. Convertir `metodo: function` en métodos abreviados y los `get`/`set` de `defineProperty` en funciones abreviadas: unifica el estilo de los objetos literales `Storage`, `UI` y `App` sin cambiar su forma pública.
4. Adoptar template literals donde se concatenan cadenas —el contador de `UI.render` y la composición del fixture en los tests—: elimina la concatenación donde un literal interpolado resulta más claro.
5. Migrar el código inline de `tests.html`: `var` a `const`, callbacks a flechas, `Array.prototype.map.call` a spread sobre el `NodeList`: los tests cambian solo de sintaxis, con las mismas aserciones y cobertura.
6. Verificar la suite QUnit en verde en el navegador y el comportamiento observable de la aplicación sin cambios.

La IIFE envolvente se conserva porque el script sigue siendo clásico (D018, sin módulos ES). `isFinite` pasa a `Number.isFinite` solo donde la guarda de `typeof` ya restringe el dominio a números, preservando la semántica.

## Suite de pruebas esperada

El criterio del tipo `mantenimiento (refactoring)` es la invariancia: la suite QUnit existente en `tests.html` pasa íntegra con las mismas aserciones, traducida solo de sintaxis. Las expectativas vigentes, ancladas en sus casos de uso:

- Caso de uso «disponibilidad»: `App` existe y expone `init`.
- Caso de uso «crear y listar»: crear añade la tarea al estado y a la vista; textos vacíos no crean nada; el contador refleja pendientes; añadir persiste y `load` restaura; `load` tolera clave ausente o JSON corrupto; `load` solo admite ítems con forma válida y mantiene `nextId` por encima del mayor id; Enter en el campo crea la tarea y limpia el campo.
- Caso de uso «completar, editar y borrar»: alternar marca `done`, baja el contador y revierte; editar actualiza estado, vista y almacenamiento; confirmar una edición vacía borra la tarea; Escape cancela la edición conservando el texto; borrar elimina de estado, vista y almacenamiento; las operaciones sobreviven a una recarga.
- Caso de uso «filtros y limpieza»: cada filtro muestra exactamente su subconjunto; el enlace del filtro activo lleva la clase `selected`; limpiar elimina las completadas conservando las pendientes en estado, vista y almacenamiento; las operaciones funcionan bajo un filtro activo; el contador totaliza pendientes, no visibles; el filtro persiste y tolera valores corruptos.

## Revisión

- Subagente: 2026-09-24 — Aprueba (primera pasada solicitó cambios: contradicción de alcance en tests.html, precisión sobre TaskList, tipografía; resueltos)
- Usuario: 2026-09-24 — Aprueba
- Subagente: 2026-09-25 — Aprueba (implementación)
- Usuario: 2026-09-25 — Aprueba (implementación)
