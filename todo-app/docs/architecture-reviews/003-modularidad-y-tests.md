# Revisión de arquitectura 003 — Modularidad del código y organización de la suite

- Fecha: 2026-09-26
- Dominio evaluado: lista de tareas (`todo-app`), con alcance extendido a la organización física del código (`app.js`) y de la suite (`tests.html`), motivada por dos preguntas del usuario: si `app.js` puede dividirse en archivos más pequeños y si los tests pueden reorganizarse para reducir repetición.
- Intención declarada: `docs/domains/001-lista-de-tareas.md` (fronteras dominio / presentación / infraestructura / fachada).
- Decisiones respetadas: la aplicación es vanilla JS sin build ni framework y se ejecuta abriendo `index.html` directamente; la documentación de proceso vive en `docs/` del subproyecto.

## Veredicto por criterio

- **Lenguaje ubicuo — correcto (confianza alta).** Los nombres (`TaskList`, `visibleTasks`, `pendingCount`, `archiveList`, vistas `main`/`today`) coinciden con el glosario del dominio; las anclas del documento siguen válidas.
- **Separación de capas — correcto (confianza alta).** Las cuatro regiones del archivo respetan la dirección declarada: `TaskList` no conoce DOM ni `localStorage`; `Storage` mueve datos sin conocer el modelo; `UI` solo renderiza el view-model y despacha acciones; `App` compone. La separación es lógica, dentro de un solo archivo.
- **Fronteras del contexto — correcto (confianza alta).** Sin fugas de modelo detectadas; la pertenencia por vista vive en el dominio (`visibleTasks`/`pendingCount`), reforzada por la tarea 027.
- **Invariantes y modelo — correcto (confianza alta).** Estado privado (`#tasks`, `#lists`), mutación solo por operaciones, guardas concentradas en `TaskList`.
- **Acoplamiento y estructura — mejorable (confianza media).** Sin ciclos tras el contrato de vista de la tarea 024. La concentración física de las cuatro capas en un archivo de ~1000 líneas es manejable pero creciente; la suite duplica su arnés por módulo. Ver hallazgos H1 y H2.

## Hallazgos

### H1 — Tamaño creciente del archivo único

- **Criterio o patrón:** componente dios (umbral relativo); concentración física de capas ya separadas lógicamente.
- **Evidencia:** `app.js` (~994 líneas) contiene dominio, infraestructura, presentación y fachada; cada épica lo agranda (~300 líneas por capa).
- **Objetivo:** las capas viven en archivos separados sin perder la encapsulación ni la ejecución directa desde `index.html`.
- **Restricciones:** vanilla JS sin build; la app se abre como `index.html` sobre `file://`, donde los ES modules no cargan (CORS del navegador). Dividir exige scripts clásicos que comparten un namespace global —lo que debilita la encapsulación que hoy da el scope único— o aceptar servir la app con un servidor local, lo que contradice la forma de uso declarada. Es una disyuntiva de diseño, no una corrección directa.
- **Validación:** `index.html` sigue funcionando abierto como archivo; la suite pasa en verde; cada capa vive en su propio archivo o se decide conscientemente mantener el archivo único.
- **Confianza:** media — el tamaño no es problema hoy; lo será si las capas siguen creciendo.
- **Derivado en:** `docs/tasks/028-decidir-modularizacion-scripts-clasicos.md` (registrar la decisión: scripts clásicos), `docs/tasks/029-separar-app-js-en-archivos.md` (ejecutar la separación)

### H2 — Repetición del arnés de pruebas

- **Criterio o patrón:** dispersión de la misma preocupación (setup de aislamiento) a nivel de suite; no es un smell del dominio sino de la organización de tests.
- **Evidencia:** `tests.html` (~1590 líneas): 10 `beforeEach` casi idénticos que repiten el vaciado de `localStorage` (24 `removeItem`), el `App.reset()` y el HTML de fixture inline; 5 definiciones duplicadas del helper `texts()`; el helper `day()` solo existe en el último módulo.
- **Objetivo:** el setup común (limpieza de storage, reset de `App`, helpers `texts`/`day`, builders de fixture) se define una vez y los módulos solo declaran su fixture particular.
- **Restricciones:** misma restricción que H1 — los archivos de test se cargan como scripts clásicos desde `tests.html`; helpers compartidos viven en un script previo (`tests-helpers.js`) o en un objeto namespace, sin ES modules si se quiere seguir abriendo como archivo. Los tests siguen en inglés.
- **Validación:** la suite pasa en verde con el mismo número de módulos y pruebas; un helper nuevo se define una sola vez; añadir un módulo no exige copiar el bloque de `beforeEach`.
- **Confianza:** alta — la repetición es medible y la extracción es mecánica.
- **Derivado en:** `docs/tasks/030-reducir-repeticion-del-arnes-de-tests.md`

## Recomendaciones

1. **H1 como decisión ya tomada:** el usuario eligió la opción (a) —scripts clásicos con namespace compartido—, que mantiene la ejecución por `file://` a costa de la encapsulación de módulo. La decisión se registra en la tarea 028 y la separación se ejecuta en la 029.
2. **Orden de la separación:** infraestructura → dominio → presentación → fachada, respetando la dirección de dependencias ya declarada; los `<script>` se cargan en ese orden.
3. **H2 después del split:** la extracción de helpers es mecánica y de bajo riesgo, pero la separación de `app.js` cambia las etiquetas `<script>` de `tests.html`; hacerla primero evita tocar el arnés dos veces.
