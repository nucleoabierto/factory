# Empaquetar Factory como paquete de teleprompter

## Estado

[ ] Pendiente | [~] En progreso | [r] En revisión | **[x] Completada** | [!] Bloqueada

## Tipo

mantenimiento

## Objetivo

Dotar al repositorio de un manifiesto de paquete teleprompter válido, de modo que un instalador teleprompter pueda instalar los skills de Factory en el `.agents/skills/` de otro repositorio. Este empaquetado es el primer punto de release público del proyecto.

## Dependencias

- Ninguna.

## Entrada

- `.agents/skills/` — el recurso que el paquete instala (los 32 skills completos, con sus `assets/` y `references/`).
- `README.md`, `docs/mapa-de-flujos.md`, `docs/definicion-proyecto.md` — la descripción del sistema que se empaqueta, insumo para la descripción del paquete y para el archivo de personalización.
- El contrato del formato de paquete, transcrito en la subsección siguiente. La especificación completa vive fuera de este repositorio y no se referencia; lo necesario aparece inline para que la tarea sea autocontenida.

### Contrato del formato de paquete

Un **paquete** es un directorio con un manifiesto `teleprompter.json` en su raíz más cualquier disposición de recursos. El manifiesto es JSON puro: declara, para cada origen, dónde se instala en el repositorio destino. Este repositorio actúa como paquete: el manifiesto va en su raíz y los `source` son relativos a ella.

Campos obligatorios del manifiesto:

- **`name`**: identificador kebab-case —minúsculas, números y guiones, máximo 64 caracteres, sin guiones al inicio ni al final— que coincide con el nombre del directorio del paquete. Para este paquete: `factory` (el nombre es propiedad del artefacto publicado; un repositorio no tiene «nombre de carpeta raíz» porque depende de dónde se clone).
- **`version`**: semver explícito `x.y.z`. La autoridad de la versión es el manifiesto, no el VCS.
- **`install`**: lista no vacía de entradas `{ "source", "target" }`, donde `source` es una ruta dentro del paquete —archivo o directorio, que se instala con todo su contenido— y `target` la ruta relativa a la raíz del repositorio destino. Ni `source` ni `target` admiten rutas absolutas ni `..`; ningún `target` puede ser `teleprompter-lock.json` ni caer dentro de `.teleprompter/` (espacios reservados de la herramienta).

Campos opcionales:

- `format` — versión del formato: `"teleprompter-package@1"`; su ausencia equivale a la primera versión.
- `description` — descripción corta del paquete.
- `license` — identificador SPDX o referencia a un archivo de licencia.
- `author` — `{ "name", "email"?, "url"? }`; solo `name` es obligatorio dentro del objeto.
- `requires` — precondiciones del repositorio destino; hoy solo `paths`: lista de `{ "path", "create"? }` sobre rutas del destino. Si la ruta no existe y `create` es `true`, el instalador la crea; si `create` es `false` o falta, la instalación aborta.
- `personalization` — ruta dentro del paquete a un archivo de instrucciones libres para el agente instalador: se copia a `.teleprompter/<paquete>/`, se entrega tal cual al final de la instalación y queda consultable.
- `metadata` — mapa libre clave→valor que el instalador no interpreta.

Campos desconocidos: a nivel superior se ignoran con aviso; dentro de un objeto conocido (`author`, `requires`, entradas de `requires.paths` y de `install`) son error y el manifiesto no es válido.

### Lista de comprobación de un paquete válido

1. `teleprompter.json` en la raíz del paquete, JSON válido.
2. `name` en kebab-case, igual al nombre del directorio del paquete (aquí, `factory`).
3. `version` semver `x.y.z` (aquí, `0.1.0`).
4. `install` no vacío; cada entrada tiene solo `source` y `target`; cada `source` existe dentro del paquete.
5. Ninguna ruta es absoluta ni contiene `..`; ningún `target` es `teleprompter-lock.json` ni cae dentro de `.teleprompter/`; `personalization` apunta a un archivo existente dentro del paquete.
6. Los campos opcionales presentes pertenecen al contrato; dentro de objetos conocidos no hay campos desconocidos.

## Resultado esperado

- `teleprompter.json` en la raíz del repositorio, válido según el contrato: `name: "factory"`, `version: "0.1.0"` —primer release público, que lleva todo el trabajo acumulado hasta hoy— e `install` que instala `.agents/skills/` en `.agents/skills/` del destino, más los campos opcionales que el ejecutor considere (`description`, `license`, `requires`, `metadata`).
- Un archivo de personalización (p. ej., `PERSONALIZE.md`) referenciado por el campo `personalization`, con instrucciones para el agente instalador: la estructura mínima que el repositorio destino necesita para que los skills operen —`TODO.txt` con su formato de índice, `EXPERIENCIAS.md`, los directorios de `docs/`, el changelog— y qué queda por configurar a criterio del proyecto destino.
- La verificación del manifiesto contra la lista de comprobación de «Entrada».

## Criterios de calidad

- El manifiesto supera los seis puntos de la lista de comprobación.
- El archivo de personalización describe la estructura mínima del repositorio destino sin inventar contenido propio del proyecto (las estructuras que los skills asumen: índice de tareas, directorios de `docs/`, memoria de experiencias, changelog).
- El manifiesto no declara campos fuera del contrato inline.
- Verificado por evidencia, no solo por lectura: JSON parseable y, cuando el entorno lo permita, una instalación de prueba en un directorio vacío cuyos recursos aterricen en sus `target`.

## Procedimiento sugerido

1. Redactar `teleprompter.json` con los campos del contrato.
2. Redactar el archivo de personalización con la estructura mínima del destino.
3. Validar el manifiesto contra la lista de comprobación: parsear el JSON, verificar que cada `source` existe y que ningún `target` usa rutas reservadas. Si se puede, probar la instalación en un directorio vacío.

## Notas

- Decisiones del usuario: `name: "factory"` (el nombre es del paquete publicado, no del directorio donde se clonó el repositorio); paquete único, no colección; `version: "0.1.0"` como primer punto de release público con todo el trabajo acumulado hasta hoy.
- La especificación del formato vive fuera de este repositorio; por eso el contrato necesario va inline en «Entrada».

## Revisión

- Subagente: 2026-10-02 — Aprueba
- Usuario: 2026-10-02 — Aprueba
