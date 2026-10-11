# Catálogo autodescriptivo y frontera mecánica en los skills de utilidad

## Estado

[ ] Pendiente | [~] En progreso | **[r] En revisión** | [x] Completada | [!] Bloqueada

## Tipo

mantenimiento (refactoring)

## Objetivo

Hacer que `consultar-artefactos` y `actualizar-artefactos` publiquen su catálogo completo con la firma exacta de cada operación —script, argumentos, orden, forma de la salida—, de modo que el invocador acierte la llamada sin descubrir el `uso:` por prueba y error. En la misma pasada, re-evaluar qué acciones merecen ser script: solo las realmente mecánicas —deterministas, sin juicio— se ejecutan por script; las demás las realiza el agente guiado por el skill.

## Dependencias

- Tarea 116 (`docs/tasks/116-skill-operar-experiencias.md`) y tarea 117 (`docs/tasks/117-skill-operar-changelog.md`): los skills de utilidad que crean entran en el alcance de esta tarea —el catálogo autodescriptivo y la frontera mecánica se verifican sobre todos los skills de utilidad, no solo los dos existentes—; al nacer ya alineados, la tarea los incorpora en lugar de rehacerlos.

## Entrada

- `.agents/skills/consultar-artefactos/` y `.agents/skills/actualizar-artefactos/` con sus scripts en `assets/`, más los skills de utilidad que 116 y 117 hayan creado.
- El inventario de operaciones invocadas por los consumidores (levantado en la revisión de la épica 003): todas las operaciones del `uso:` de cada script, su consumidor y su línea de uso.
- La frontera declarada por la épica 003: «cualquier paso con juicio —veredictos de sensores, redacción de contenido, elección de palabras clave, puertas humanas—» queda fuera de los scripts.

## Resultado esperado

- Los SKILL.md de todos los skills de utilidad documentan cada operación con su firma exacta y la forma de su salida, verificable contra el `uso:` del script.
- Un veredicto por operación —mecánica o no— con su justificación, sustentado en pruebas de escenarios; las operaciones reclasificadas como no mecánicas salen de los scripts y pasan a guiarse por el skill.
- El catálogo registra el estado de cobertura: operaciones sin consumidor (hoy `por-estado`, `siguiente-hito`) y artefactos del ciclo aún sin operación delegada.

## Criterios de calidad

- Cada operación del catálogo tiene firma declarada que coincide con el `uso:` real del script.
- Toda invocación existente en los consumidores resuelve contra el catálogo sin ambigüedad.
- La clasificación mecánica/no mecánica está probada por escenarios —no solo razonada—: casos representativos ejecutados de verdad, incluidos formatos degenerados o inesperados.
- Ninguna acción con juicio permanece dentro de un script; ninguna acción determinista queda delegada al agente sin script.

## Procedimiento sugerido

1. Publicar el catálogo con firmas en ambos skills y verificarlo contra el `uso:` de cada script.
2. Construir una batería de escenarios por operación —formato canónico, variantes históricas, formato degenerado— y ejecutarla: una operación es mecánica si sus escenarios se resuelven sin juicio.
3. Reclasificar las operaciones que los escenarios demuestren no mecánicas: el script se simplifica y el skill guía la acción.
4. Registrar en el catálogo la cobertura: operaciones sin consumidor y artefactos sin operación.

## Notas

- El inventario de la revisión de la épica 003 ya identificó dos operaciones sin consumidor —`por-estado` y `siguiente-hito`— y artefactos mutados a mano: `EXPERIENCIAS.md`, `CHANGELOG.md`, `ROADMAP.md`, los índices de decisions/lessons/domains y el `## Borradores` de `propuesta.md`. La cobertura nueva de esos artefactos no es objetivo de esta tarea —las piezas 116-117 de la épica ya la cubren—; solo su registro en el catálogo.

## Contexto

- **Archivos similares:**
  - `.agents/skills/operar-experiencias/SKILL.md` y `.agents/skills/operar-changelog/SKILL.md` — el modelo de catálogo autodescriptivo ya alineado con la tarea: un `###` por operación con su firma exacta —script, argumentos y orden—, la forma de la salida y los códigos de salida por caso.
  - `.agents/skills/consultar-artefactos/` y `.agents/skills/actualizar-artefactos/` — los dos skills a revisar: su catálogo actual es una viñeta por operación bajo un `###` por script, sin la forma completa de la salida ni los códigos por caso.
  - Los `uso:` de los once scripts en `assets/` de los cuatro skills — la referencia contra la que se verifica cada firma publicada.
- **Patrones:** catálogo autodescriptivo por operación —firma invocable tal cual, forma del stdout y salidas de error explícitas—; contrato D033 —stdout datos, stderr diagnósticos, `0` éxito con vacío legítimo, `2` entrada ausente, mutación que falla sin escribir—; frontera de la épica 003 —cualquier paso con juicio queda fuera de los scripts—.
- **Dominio:** `docs/domains/001-ciclo-de-tareas.md` —`TODO.txt` y los archivos de tarea son los artefactos principales de los scripts—; `docs/domains/002-flujo-idea-a-tarea.md` —ideas, propuestas y borradores, dominio de `ideas.sh` y `promocion.sh`—; `docs/domains/004-documentacion-viva.md` —índices de decisiones y de lecciones, dominio de `indice.sh`—; `docs/domains/005-aprendizaje.md` —el registro de experiencias y la recuperación por disparadores—.
- **Producto:** ningún documento aplica —`product-docs/` solo contiene la visión; el mecanismo de delegación no tiene documento de producto propio.
- **PRD:** el conjunto no tiene `docs/prd/`.
- **Lecciones:**
  - `docs/lessons/validacion.md` — la batería de escenarios ejercita cada variante en todas sus posiciones, con formato canónico, variantes históricas y formatos degenerados; la verificación preventiva cubre el estado final tras las rondas de corrección.
  - `docs/lessons/contratos-de-skills.md` — el catálogo documenta capacidad y salida, no mecánica interna; la revisión técnica se lanza con alcance acotado.
  - `docs/lessons/vocabulario.md` — español llano en los textos nuevos.
  - `docs/lessons/alcance.md` — los hallazgos del mismo tema se ofrecen para absorber; la lista «Piezas» de la épica 003 no marca completadas 116-117 (la marca la escribe `cerrar-conjunto` al cerrar el conjunto).
- **Decisiones:**
  - `docs/decisions/D033-pasos-mecanicos-skills-utilidad-scripts.md` — el contrato de los scripts y la frontera «con juicio fuera».
  - `docs/decisions/D004-estandar-agent-skills.md` y `docs/decisions/D005-division-progresiva-con-references.md` — la forma de los SKILL.md.
  - `docs/decisions/D002-tareas-individuales-en-docs-tasks.md` — las secciones del archivo de tarea.
  - `docs/decisions/D028-letra-zombie-declarada-en-suite.md` — las expectativas de la suite declaran su letra ZOMBIE cuando aplica.

## Conectividad

Conectada. Todo lo que la tarea asume existe: los cuatro skills de utilidad —`consultar-artefactos`, `actualizar-artefactos`, `operar-experiencias` y `operar-changelog`— están instalados con sus scripts en `assets/` propios, el inventario de operaciones invocadas se levantó sobre los consumidores reales (y confirma `por-estado` y `siguiente-hito` sin consumidor), y la frontera «con juicio fuera» está declarada en la épica 003 y en D033.

## Plan técnico

Los cuatro skills de utilidad encapsulan los pasos mecánicos del sistema en once scripts bash bajo `assets/` propios, con el contrato D033 —stdout datos, stderr diagnósticos, `0` éxito con vacío legítimo, `2` entrada ausente, mutación que falla sin escribir—. Los SKILL.md publican el catálogo: los dos skills de las piezas 116-117 ya llevan la forma autodescriptiva —un `###` por operación con firma exacta, salida y códigos por caso—; `consultar-artefactos` y `actualizar-artefactos` aún usan una viñeta por operación sin el detalle completo.

- [x] Reescribir los catálogos de `consultar-artefactos` y `actualizar-artefactos` en forma autodescriptiva —firma invocable tal cual, forma del stdout y salidas de error por caso—, verificada contra el `uso:` real, y comprobar que toda invocación de los consumidores resuelve sin ambigüedad
  - Aporta: el invocador acierta la llamada sin descubrir el `uso:` por prueba y error —la mitad principal del objetivo—
  - Contexto: el modelo es el catálogo de `operar-changelog`; los flujos por `stdin` (`insertar-seccion`, `sustituir-item`) y las salidas de datos (`encabezado`, `promover`) necesitan firma explícita; D005 mantiene cada SKILL.md bajo 500 líneas
- [x] Construir la batería de escenarios por operación —formato canónico, variantes históricas y formato degenerado— sobre fixtures temporales y ejecutarla contra los once scripts
  - Aporta: la frontera mecánica queda probada por escenarios, no solo razonada; sirve de suite de invariancia del refactoring
  - Contexto: cubre las 45 operaciones; una operación es mecánica si todos sus escenarios se resuelven con regla fija, sin elección semántica
- [x] Emitir el veredicto mecánica/no mecánica por operación con justificación y registrarlo en el archivo de la tarea
  - Aporta: la clasificación queda trazada a la evidencia ejecutada —resultado esperado 2—
  - Contexto: el resultado anticipado es «todas mecánicas»; si la batería demuestra juicio en alguna, la operación sale del script y su consumidor pasa a realizarla guiada por el skill
- [x] Registrar la cobertura en los catálogos: operaciones sin consumidor marcadas en su entrada y artefactos del ciclo aún sin operación delegada listados
  - Aporta: el catálogo queda autodescriptivo también sobre su cobertura —resultado esperado 3—
  - Contexto: hoy son `por-estado` y `siguiente-hito` (consulta/`todo.sh`) y, como artefactos sin operación, `ROADMAP.md`, los índices de decisiones/lecciones/dominios y el `## Borradores` de `propuesta.md`

## Suite de pruebas esperada

Caso de uso —derivado del objetivo y los criterios de calidad, sin PRD—: un consumidor delega una operación mecánica y el catálogo basta para acertar la llamada.

- Dado un artefacto en forma canónica, invocar una operación con la firma publicada produce por stdout exactamente la forma declarada en su entrada del catálogo (O)
- Invocar cada operación de los catálogos con su firma publicada resuelve contra el `uso:` de su script: ninguna firma huérfana ni operación del `uso:` sin publicar (M)
- Ante variantes históricas del formato —convenciones no canónicas de `## Estado`, entradas envueltas de experiencias, changelog sin enlaces— la lectura tolera y devuelve el dato, y la escritura produce la forma canónica (B)
- Ante formato degenerado o inesperado, toda mutación termina en error sin escribir y con diagnóstico por stderr, y toda lectura reporta el fallo con su código documentado (E)
- Ante entrada ausente la operación sale con código `2`; ante resultado vacío legítimo, con `0` y salida vacía (Z)
- Toda operación tiene veredicto —mecánica o no— con justificación y escenarios ejecutados registrados (M)
- Las operaciones sin consumidor y los artefactos sin operación delegada figuran en el registro de cobertura del catálogo **(O)**
- Toda invocación existente en los skills consumidores resuelve contra el catálogo sin ambigüedad (regresión)
- Los once scripts pasan `bash -n` y conservan idéntico comportamiento observable al de `main`, salvo las correcciones absorbidas registradas en `## Frontera mecánica` (regresión)

## Frontera mecánica

Veredicto por operación sustentado en la batería de escenarios ejecutada sobre fixtures —formato canónico, variantes históricas y formatos degenerados—: 149 comprobaciones contra los once scripts, todas en verde. El resultado global es que las 45 operaciones son mecánicas: cada una resuelve sus escenarios con regla fija —parsear y emitir, o validar y mutar-o-fallar— y ninguna selecciona contenido ni decide entre alternativas semánticas. Los casos degenerados confirman la frontera: la entrada ambigua (`## Estado` con dos casillas marcadas) se rechaza con exit `1` en lugar de adivinar, y la referencia no localizada falla sin escribir. No hubo reclasificación: ninguna operación salió de su script. La auditoría corrigió dos defectos latentes que el catálogo no podía publicar como contrato: `actualizar-artefactos/todo.sh` descartaba silenciosamente el diagnóstico de las referencias no localizadas de `mover` y `recolocar` —salía `3`/`4` sin stderr porque `set -e` abortaba antes de capturar el código de awk— e `indice.sh` devoraba el resto del índice tras un comentario `<!-- … -->` de una sola línea. La revisión destapó además una deriva acumulativa: `añadir`, `añadir-linea`, `mover` y la rama de append de `registrar-revision` sumaban una línea en blanco por invocación antes del `##` de cierre de sección; el bucle final reimprimía los blancos de cola que el recorte ya había apartado, y ahora reimprime desde el `##`.

- `consultar-artefactos` — todas mecánicas:
  - `todo.sh siguiente`, `por-estado`, `propuestas`, `grupos`, `estado-grupo`, `siguiente-hito`, `inventario` — filtros, recorridos y conteos por regla fija sobre las marcas y los encabezados; `estado-grupo` cuenta propuestas `[p]` y ordena por marca.
  - `tarea.sh estado`, `secciones`, `planeacion`, `dependencias`, `checklist` — extracción y normalización fijas; `estado` tolera las tres convenciones y rechaza la ambigüedad sin decidir.
  - `ideas.sh pendientes` — filtro por marca `Procesada en` y orden numérico fijo.
  - `indice.sh coincidencias` — casamiento léxico por subcadena; la coincidencia semántica que aplica es del consumidor.
  - `series.sh siguiente` — máximo de la serie más uno con formato fijo.
- `actualizar-artefactos` — todas mecánicas:
  - `todo.sh marcar`, `añadir`, `retirar`, `mover`, `recolocar`, `retirar-grupo`, `encabezado`, `inicializar` — mutaciones posicionales y de plantilla por regla fija; lo no localizado falla sin escribir.
  - `tarea.sh estado`, `marcar-opcion`, `insertar-seccion`, `registrar-revision`, `añadir-linea`, `marcar-item`, `sustituir-item` — escritura canónica y cirugía de sección por regla fija; el contenido entra siempre del consumidor.
  - `ideas.sh procesada` — marca fija tras la cabecera; ya marcada falla.
  - `promocion.sh promover` — mover, inyectar secciones y renumerar por reglas fijas, con validación completa antes de escribir; no reformula contenido.
- `operar-experiencias` — todas mecánicas: `id` (timestamp con reintento ante colisión), `listar`, `por-tarea`, `anexar` (validación canónica y rechazo sin escribir), `marcar` (pendiente→consolidada por `Id`, con aviso sin abortar el lote).
- `operar-changelog` — todas mecánicas: `localizar`, `volcar`, `buscar`, `anotar` (categorías fijas en orden canónico), `estado`, `bump` (mapeo fijo categoría→señal; su interpretación es del consumidor), `promover` (cirugía por reglas derivables con rama failsafe que preserva el pie), `yank`.

## Revisión

- Subagente: 2026-10-11 — Aprueba
- Usuario (ejecución): [fecha] — [Aprueba | Solicita cambios]
- Usuario (cierre): [fecha] — [Aprueba | Solicita cambios]
