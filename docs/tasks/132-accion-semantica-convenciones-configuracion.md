# Acción semántica en los invocadores y convenciones como configuración

## Estado

[ ] Pendiente | [~] En progreso | [r] En revisión | **[x] Completada** | [!] Bloqueada

## Tipo

mantenimiento (refactoring)

## Objetivo

Que los skills consumidores expresen solo la acción de dominio —«la próxima pendiente», «marcar bloqueada», «registrar el veredicto», «crear la tarea»— sin nombrar ni pasar artefactos concretos: es el gestor de artefactos quien resuelve ubicación, formato y aplicación. Las convenciones —rutas, nomenclaturas (`NNN-slug`, `DNNN`, `MM`, `CU-N`), marcas, secciones, prefijo de rama— dejan de estar escritas en los skills y pasan a ser configuración por defecto declarada en `PERSONALIZE.md`, inyectada al instalar: si el proyecto destino cambia la convención, los flujos continúan sin tocar los skills.

## Dependencias

- Tarea 116 (`docs/tasks/116-skill-operar-experiencias.md`) y tarea 117 (`docs/tasks/117-skill-operar-changelog.md`): sus consumidores —`registrar-experiencias`, `consolidar-lecciones`, `mantener-changelog`, `liberar-version`— pasan a acciones semánticas en esta tarea, así que necesitan el gestor que las resuelva ya creado.
- Se beneficia además de la tarea 131 —el catálogo autodescriptivo es el contrato sobre el que esta abstracción se apoya—, pero no la exige.

## Entrada

- El inventario de fugas de implementación levantado en la revisión de la épica 003: nombres de artefacto, formatos internos y convenciones de ubicación presentes hoy en los consumidores, con su clasificación.
- El patrón ya usado por `mantener-roadmap`, `mantener-changelog`, `cerrar-conjunto`, `liberar-version` e `investigar`: «`X` en la convención; otra ubicación es dato de entrada» — forma de transición a generalizar.
- `PERSONALIZE.md` como documento de personalización de la instalación.

## Resultado esperado

- Los consumidores piden acciones semánticas; ninguno nombra ni pasa un artefacto que el gestor pueda resolver él mismo.
- Las convenciones del ciclo quedan declaradas como configuración por defecto en `PERSONALIZE.md`, catalogadas —operaciones, assets y constantes transversales— para pasarse al gestor y a los skills en la instalación.
- La frontera queda explícita: artefacto del dominio —la tarea como documento— puede nombrarse; detalle de backend —formato interno, marcadores, ubicación— no.

## Criterios de calidad

- Un barrido sobre los consumidores no encuentra fugas de artefacto, formato ni ubicación que el gestor pueda resolver.
- El catálogo de constantes del inventario —rutas, nomenclaturas, marcas, secciones, prefijos— queda cubierto por la configuración declarada.
- Un cambio de convención en la instalación —otro nombre de índice, otro directorio de tareas— no exige editar ningún skill.
- Las referencias legítimas a artefactos del dominio permanecen y el criterio de legitimidad queda escrito.

## Procedimiento sugerido

1. Fijar el criterio «artefacto del dominio vs. detalle de backend» con ejemplos del inventario.
2. Declarar en `PERSONALIZE.md` la configuración por defecto —convenciones y constantes— y cómo se inyecta en la instalación.
3. Reescribir los consumidores a acciones semánticas, empezando por los que usan el patrón «dato de entrada» como modelo.
4. Barrido final: verificar los criterios contra el inventario completo de fugas.

## Notas

- La motivación es la migración de backend: con la abstracción completa, cambiar el índice por un tracker real se reduce a reimplementar el catálogo del gestor, sin tocar consumidores.
- Del inventario de la épica 003: dos operaciones sin consumidor y los artefactos aún mutados a mano quedan registrados por la tarea 131; aquí solo se reescribe el lado consumidor.

## Contexto

- **Archivos similares:**
  - `.agents/skills/mantener-roadmap/SKILL.md`, `mantener-changelog`, `cerrar-conjunto`, `liberar-version`, `investigar` — consumidores ya migrados al patrón «`X` en la convención; otra ubicación es dato de entrada»: piden acción y dejan la ubicación al gestor o a la entrada. Sirven de modelo para el resto.
  - `PERSONALIZE.md` — describe hoy la estructura mínima que asumen los skills (artefactos raíz, directorios de documentación, convenciones de commits y ramas), pero como prosa para el instalador, no como catálogo de configuración consumible.
- **Patrones:**
  - Contrato D033 de los gestores: stdout datos, stderr diagnósticos, `0` éxito con vacío legítimo, `2` entrada ausente o invocación inválida, `3` sin objeto sobre el que operar; mutaciones atómicas que fallan sin escribir; parsers toleran variantes históricas y writers producen la forma canónica.
  - Catálogo autodescriptivo (tarea 131): cada operación publica firma invocable, forma del stdout y códigos por caso; el catálogo es el contrato sobre el que se apoya la acción semántica.
  - Los consumidores citan la operación del gestor por su nombre de catálogo (`todo.sh marcar`, `tarea.sh estado`), no re-describen la mecánica — el paso pendiente es dejar de nombrar también los artefactos y formatos que el gestor puede resolver.
- **Dominio:**
  - `docs/domains/001-ciclo-de-tareas.md` — el ciclo que los consumidores orquestan: índice, rama, PR con dos puertas, merge.
  - `docs/domains/002-flujo-idea-a-tarea.md` — propuestas, borradores, épicas y roadmap: los artefactos cuyas convenciones pasan a configuración.
  - `docs/domains/003-subflujo-desarrollo.md` — secciones del archivo de tarea que los consumidores escriben hoy por nombre.
- **Producto:** `product-docs/` solo contiene visión e índice; ningún documento de funcionalidad describe aún el ciclo de skills — fuente sin aportación.
- **PRD:** la épica 003 no tiene PRD — fuente sin aportación.
- **Lecciones:**
  - `diseno-de-artefactos` — diseñar los artefactos del sistema de forma genérica: las ubicaciones y tecnologías del proyecto son dato de entrada, no parte del concepto. Es la lección que esta tarea lleva a su conclusión.
  - `contratos-de-skills` — las descripciones declaran capacidad y resultado, no mecánica interna; las reglas van inline y las decisiones en referencias.
  - `estabilidad-temporal` — los flujos se citan por nombre, no por número; los commits por hash.
  - `validacion` — probar con datos sintéticos todas las variantes y posiciones; re-revisar lo añadido tras una revisión.
  - `consistencia-de-formatos` — preservar los formatos establecidos al reescribir los consumidores.
  - `flexibilidad-en-procesos` — las listas declarativas quedan abiertas y extensibles: el catálogo de convenciones no es cerrado.
  - EXPERIENCIAS.md `20261011T021657` (tarea 131) — no añadir operaciones al catálogo por anticipado: solo entran las que tienen consumidor.
- **Decisiones:**
  - D033 — los pasos mecánicos viven en scripts de utilidad con el contrato stdout/stderr/códigos; la frontera ya auditada de la tarea 131 fija qué es mecánico.
  - D003 — cada skill es autocontenido: la configuración no puede vivir en un directorio común externo a los skills.
  - D004 — formato Agent Skills estándar: `SKILL.md` con frontmatter YAML.
  - D001/D017 — `TODO.txt` es el índice activo; D002 — los archivos de tarea viven en `docs/tasks/`; D008 — la agrupación bajo Hitos. Estas decisiones son justo las convenciones que pasan a configuración declarativa.
  - D031 — planeación y ejecución separadas; D034 — aprobación vía PR con dos puertas humanas.

## Conectividad

Conectada.

Todo lo que la tarea asume existe en el codebase: los cuatro gestores con sus catálogos autodescriptivos (43 operaciones auditadas mecánicas en la tarea 131), los ~30 skills consumidores que hoy nombran artefactos, formatos, marcas y secciones que el gestor puede resolver, `PERSONALIZE.md` como documento de instalación ya vigente, y consumidores modelo con el patrón «en la convención; otra ubicación es dato de entrada» —migración parcial que esta tarea completa: aun en ellos el literal de la convención sigue escrito en la prosa. El mecanismo de inyección de la configuración no existe como pieza, pero es el propio objeto de la tarea —declararlo en `PERSONALIZE.md` y materializarlo como valores por defecto dentro de los gestores—, no capacidad base ausente.

## Plan técnico

Los cuatro gestores (`consultar-artefactos`, `actualizar-artefactos`, `operar-experiencias`, `operar-changelog`) encapsulan la mecánica de artefactos en once scripts con el contrato D033 y catálogos autodescriptivos; ~37 skills consumidores mezclan hoy la acción de dominio con detalles de backend —rutas (`TODO.txt`, `docs/tasks/`), marcas (`[~]`, `[x]`, `[p]`, `[!]`), secciones (`## Estado`, `## Revisión`), nomenclaturas (`NNN-slug`, `MM`, `DNNN`, `CU-N`), el comentario `<!-- épica: -->`, el prefijo de rama `tarea/`—. `PERSONALIZE.md` describe la estructura como prosa para el instalador, no como configuración inyectable.

Decisiones transversales:

- Frontera dominio/backend: puede nombrarse el artefacto como objeto del dominio —la tarea por su referencia, la propuesta, la épica, la idea—; no puede aparecer su ubicación, formato interno, marcas, secciones ni nomenclaturas, que son convención configurable.
- Materialización: cada gestor lleva `assets/convenciones.sh` —`CLAVE=valor` con los defaults de la convención— que el instalador reescribe al instalar; los scripts la cargan con defaults embebidos, así un skill sin personalización reproduce la convención vigente.
- Capa de acciones: cada gestor publica las acciones de dominio mapeadas a su operación o composición de operaciones; las mutaciones compuestas índice+archivo las expande el gestor.

- [x] Fijar el criterio dominio/backend y declarar en `PERSONALIZE.md` el catálogo de convenciones —claves, valores por defecto, consumidor de cada una— con la descripción de la inyección en la instalación
  - Aporta: fija la frontera y el contrato de configuración antes de tocar nada; es la referencia del barrido final
  - Contexto: el inventario de fugas agrupa literales por clase —rutas, marcas, secciones, nomenclaturas, prefijos, comentario de épica—; el catálogo debe cubrir todas
- [x] Materializar la configuración en los gestores: `assets/convenciones.sh` en los cuatro skills de utilidad; los scripts la cargan y sus literales que son convención pasan a variables con el valor por defecto embebido
  - Aporta: cambiar la convención de instalación mueve un valor en un archivo, no edita skills
  - Contexto: los scripts conservan la firma con `<objetivo>` requerido —lo resuelve el gestor, nunca el consumidor—; la batería de la tarea 131 (144 casos) es la suite de invariancia del refactor
- [x] Añadir la capa de acciones semánticas a los catálogos de los cuatro gestores y la operación `convencion <clave>` en `consultar-artefactos`, para las convenciones ajenas a artefactos —prefijo de rama, rama principal— que un consumidor necesite
  - Aporta: el consumidor dice «marcar bloqueada» o «la próxima pendiente»; el gestor expande a las operaciones y resuelve objetivo, marca y etiqueta desde la configuración
  - Contexto: `convencion` es la única operación nueva —tiene consumidor inmediato en `ejecutar-tareas`—; el resto de acciones mapea sobre las 43 operaciones existentes sin tocar su contrato
- [x] Reescribir los consumidores a acciones semánticas en lotes por flujo —empezando por los ya parcialmente migrados con el patrón «en la convención»—, eliminando los literales que el gestor resuelve y conservando las referencias legítimas del dominio
  - Aporta: es el objetivo central de la tarea
  - Contexto: el barrido cubre los ~37 skills no gestores, incluidas sus `references/`; la lista definitiva de fugas se construye en esta acción como inventario verificable
- [x] Barrido final contra el inventario completo de fugas y verificación con instalación sintética de convención cambiada
  - Aporta: cierra los criterios de calidad medibles —sin fuga, cobertura total del inventario de constantes, cambio de convención sin editar skills

## Suite de pruebas esperada

Caso de uso —sin PRD, derivado del objetivo y los criterios—: un consumidor expresa una acción de dominio y el gestor la resuelve sin que el consumidor nombre artefacto, formato ni ubicación; una instalación con convención distinta ejecuta los mismos flujos sin editar skills.

- Dado un consumidor que delega «la próxima pendiente», el gestor devuelve la referencia de la siguiente tarea sin que el consumidor nombre ni pase el índice (O)
- Dada una acción compuesta —«marcar la tarea como en-progreso»—, el gestor aplica todas las mutaciones que el estado implica en índice y archivo sin que el consumidor las enumere (O)
- Ningún SKILL.md ni referencia consumidora contiene literales del inventario de fugas —rutas de artefactos, marcas, nombres de sección, nomenclaturas, comentario de épica, prefijo de rama— fuera de las referencias legítimas del criterio (M)
- Toda constante del inventario —rutas, nomenclaturas, marcas, secciones, prefijos— tiene su clave en el catálogo de `PERSONALIZE.md` (M)
- Con una convención cambiada en la instalación sintética —otro nombre de índice, otro directorio de tareas— las acciones delegadas se ejecutan idénticas sin editar ningún skill (B)
- Ante una clave ausente en la configuración rige el valor por defecto embebido; ante un archivo de configuración malformado, el gestor falla con diagnóstico sin operar sobre datos sintetizados (Z, E)
- Toda acción semántica publicada resuelve a operaciones existentes del catálogo: ni acción huérfana ni invocación de consumidor sin acción que la cubra (M)
- La batería de la tarea 131 sigue en verde sobre los scripts refactorizados: comportamiento observable idéntico bajo la convención por defecto (regresión)
- `bash -n` pasa en los once scripts y en los `convenciones.sh` (regresión)

## Desviaciones del plan

- La operación `convencion` se implementó como script propio (`assets/convencion.sh`) en lugar de operación de otro script: la consulta de convenciones no tiene objetivo de artefacto y la firma `<script> <objetivo> <op>` no le aplicaba.
- El inventario real reveló claves no previstas en el plan y se añadieron al catálogo: `formato_linea_propuesta`, `ref_depende`, `dependencias_vacia`, `campos_experiencia`, `campos_indice_disparadores`, `campo_procesada`, `campo_orden_idea`, `opciones_veredicto`, `actores_revision`, `formato_veredicto`, `marcador_fecha`.
- Las plantillas de `assets/` de los consumidores conservan los literales de la convención por defecto: son el formato que producen, no invocaciones. `PERSONALIZE.md` declara que el instalador las reescribe junto a `convenciones.sh`.
- Los documentos que definen el formato de artefactos propios del consumidor (`decisiones-diseno/references/formato.md`, `investigar`, `revisar-redaccion`) conservan sus encabezados internos: son formato propio, no convención del sistema de tareas.
- Corrección interna: los valores por defecto `~` y ` ` se exportaron sin comillas y expandían `~` a `$HOME` cuando la clave faltaba; quedaron con comillas.
- Ajustes en revisión: el campo `Estado` del registro de experiencias quedó configurable (`campo_estado_experiencia`); los valores interpolados en regex se escapan (`esc_re`, `esc()`); el anclaje de la sección de propuestas tolera su primera palabra como antes; `CU-N` quedó como `prefijo_caso_uso`. Detalle marginal: el detector de idea procesada exige el marcador configurado completo donde antes bastaba la subcadena `Procesada en`.

## Revisión

- Subagente: 2026-10-11 — Aprueba
- Usuario (ejecución): 2026-10-12 — Aprueba
- Usuario (cierre): [fecha] — [Aprueba | Solicita cambios]
