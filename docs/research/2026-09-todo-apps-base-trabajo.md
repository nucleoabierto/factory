# Todo apps como base de trabajo para la prueba de concepto

> **Fecha:** 2026-09

## Propósito

Determinar la forma esperada de la prueba de concepto del flujo externo —una todo app construida con Factory— y fijar una expectativa realista y verificable de lo que el flujo debe producir.

## Alcance

La investigación cubre la especificación TodoMVC como dominio de referencia: requisitos funcionales, estructura y convenciones. No cubre la comparación de frameworks ni la elección de stack —ya decidida (vanilla JS) por el usuario— ni los detalles de implementación, que pertenecen a los borradores de la propuesta.

## Hallazgos

**Por qué la todo app es el estándar.** TodoMVC implementa la misma aplicación de forma idéntica en la mayoría de frameworks JS para permitir la comparación en igualdad de condiciones; es el ejemplo de enseñanza de facto desde hace más de una década y núcleo del benchmark Speedometer de los navegadores [1][2]. Existe una especificación escrita (`app-spec.md`) y ejemplos de referencia en vanilla JS y ES6 [1][3].

**Requisitos funcionales de la especificación** [4]:

- **Sin todos:** `#main` y `#footer` ocultos cuando la lista está vacía.
- **Nuevo todo:** input superior con autofoco; Enter crea, añade a la lista y limpia; se aplica `.trim()` y se rechaza el vacío.
- **Marcar todos:** un checkbox global conmuta el estado de todos; se sincroniza con los estados individuales.
- **Ítem:** checkbox de completado (clase `completed`), doble clic en la etiqueta para editar (clase `editing`), botón de borrado visible al pasar el cursor (`.destroy`).
- **Edición:** input enfocado con el título; guarda en blur y Enter; vacío destruye el ítem; Escape cancela sin guardar.
- **Contador:** ítems activos restantes con pluralización (`0 items`, `1 item`, `2 items`) y número en `<strong>`.
- **Limpiar completados:** botón que los elimina; oculto si no hay completados.
- **Persistencia:** `localStorage`, claves `id`, `title`, `completed`, nombre `todos-[framework]`; el modo edición no se persiste.
- **Routing:** rutas `#/` (todos), `#/active`, `#/completed`; filtrado a nivel de modelo, clase `selected` en los enlaces, filtro activo persistido al recargar.

**Estructura y convenciones** [4]: `index.html`, `css/app.css`, `js/` con `app.js`, `controllers/`, `models/`; README obligatorio; HTML lo más cercano posible a la plantilla; sin preprocesadores; dobles comillas en HTML, simples en JS/CSS.

**Qué cubre y qué deja fuera la implementación vanilla.** La spec incluye ejemplos vanilla JS y ES6 como línea base sin framework [3]. La spec no exige tests ni backend: la persistencia es local y la app es una sola página.

## Conclusión

La expectativa verificable de la prueba de concepto es: **una todo app de una página en vanilla JS que cumpla los nueve requisitos funcionales de la especificación TodoMVC** (visibilidad condicional, creación, toggle global, ítem con tres interacciones, edición, contador pluralizado, limpiar completados, persistencia en localStorage, routing por hash), con la estructura de archivos recomendada y un README. Eso define el criterio de éxito del flujo externo: la app resultante se comporta como la especificación sin necesitar más que abrir `index.html`.

## Limitaciones

- La spec de TodoMVC no define criterios de accesibilidad, tests ni rendimiento; la expectativa queda limitada al comportamiento funcional.
- No se recuperó el template HTML completo; la fidelidad visual se verificará durante la implementación contra la plantilla del repo.

## Referencias

- [1] TodoMVC — github.com/tastejs/todomvc
- [2] Open Awesome, «todomvc — Todo App Framework Comparisons» — open-awesome.com/projects/todomvc
- [3] TodoMVC ejemplos de referencia (vanilla JS, vanilla ES6) — github.com/tastejs/todomvc/tree/master/examples
- [4] TodoMVC Application Specification (`app-spec.md`) — github.com/tastejs/todomvc/blob/master/app-spec.md
