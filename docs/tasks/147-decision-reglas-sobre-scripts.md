# Registrar la decisión del mecanismo de reglas y actualizar la documentación

## Estado

[x] Completada

## Tipo

desarrollo

## Objetivo

Registrar la decisión de diseño que sustituye la delegación por scripts bash por documentos de reglas declarativos por tipo de artefacto —el mecanismo que D033 estableció— y actualizar la documentación del sistema para que describa el mecanismo vigente.

## Dependencias

- 146.

## Entrada

- `docs/decisions/D033-pasos-mecanicos-skills-utilidad-scripts.md` — la decisión que se sustituye.
- El resultado de las tareas 145 y 146: los documentos de reglas y los gestores migrados.
- `PERSONALIZE.md`, `docs/mapa-de-flujos.md`, `docs/definicion-proyecto.md` y las referencias a scripts en la documentación.

## Resultado esperado

- Una decisión nueva en `docs/decisions/` con el contexto —la duplicación observada de leer el artefacto e invocar el script— y la justificación del cambio; D033 queda marcada como sustituida según el mecanismo del registro.
- La documentación del sistema describe el mecanismo de reglas: mapa de flujos, definición del proyecto y catálogo de convenciones sin referencias a scripts.

## Criterios de calidad

- La decisión sigue el formato del registro —contexto, decisión, estado— y referencia a D033 como sustituida.
- No quedan referencias a scripts de `assets/` en la documentación de proceso.
- El índice de decisiones refleja la entrada nueva con sus disparadores.

## Procedimiento sugerido

1. Redactar la decisión nueva con el motivo observado y el mecanismo adoptado.
2. Marcar D033 como sustituida conforme al ciclo de vida de las decisiones.
3. Actualizar los documentos de proceso y el catálogo de convenciones.
4. Verificar referencias cruzadas a scripts en toda la documentación.

## Notas


- `PERSONALIZE.md` deja de ser el catálogo de convenciones con claves y valores: pasa a ser la guía que indica qué documento de reglas —o qué skill consumidor— contiene cada literal personalizable, para que el instalador edite cada archivo individualmente en lugar de reescribir un `convenciones.sh` central.

## Contexto

- Archivos similares:
  - `docs/decisions/D033-pasos-mecanicos-skills-utilidad-scripts.md` — la decisión a sustituir: fijó los scripts en `assets/` bajo contrato único y la forma canónica de `## Estado` y `## Desviaciones del plan`.
  - `docs/decisions/D009-flujo-revision-dual.md` — modelo de decisión sustituida: `## Estado` con «Sustituida por DNNN» y la línea de referencia al sustituto.
  - `docs/decisions/README.md` — el índice por disparadores donde se registra la entrada nueva y el estado de D033.
- Patrones:
  - Formato de decisión (D010): contexto, decisión, justificación y referencias opcionales; estado explícito; sustitución declarada en el archivo y en el índice.
  - Las referencias de los skills citan solo material que viaja con el paquete o decisiones vigentes del registro (lección de contratos de skills).
  - Los documentos de entrada históricos no se reeditan (lección de estabilidad temporal): tareas, propuestas, investigaciones y épicas pasadas conservan sus menciones a scripts.
- Dominio: `docs/domains/001-ciclo-de-tareas.md` — el mecanismo de delegación que la decisión describe sirve a este ciclo.
- Producto: `PERSONALIZE.md` — documento de instalación del paquete; su catálogo de claves y la inyección vía `convenciones.sh` describen el mecanismo ya eliminado.
- PRD: ninguno — el hito es un encabezado ligero sin épica.
- Lecciones:
  - `estabilidad-temporal` — no reeditar documentos de entrada; la sustitución se registra como decisión nueva.
  - `consistencia-de-formatos` — la entrada del índice de decisiones sigue el formato vigente (sub-bullets con disparadores primero).
  - `vocabulario` — español llano.
  - `contratos-de-skills` — las referencias de los gestores apuntan a la decisión vigente, no a la sustituida.
- Decisiones:
  - `D033` — la decisión que esta tarea sustituye.
  - `D030` — declaró el campo «Orden sugerido» de las ideas; el hito lo sustituyó por «Requiere», lo que esta decisión absorbe.
  - `D005` — el patrón `references/` donde viven los documentos de reglas.
  - `D010` — el formato del registro de decisiones.
- Referencias vivas a actualizar:
  - Los cuatro gestores citan D033 en su sección Referencias: `actualizar-artefactos`, `consultar-artefactos`, `operar-experiencias`, `operar-changelog`.
  - `liberar-version/SKILL.md` y `mantener-roadmap/SKILL.md` hablan de «la configuración» como fuente de ubicaciones —residuo del mecanismo de convenciones—.
  - `PERSONALIZE.md` entero: el catálogo de claves y la sección de inyección describen `convenciones.sh`, ya eliminado.
  - `docs/mapa-de-flujos.md` y `docs/definicion-proyecto.md` no nombran el mecanismo a nivel de implementación; las menciones a convenciones que queden deben describir el modelo vigente.
- Vacíos: ninguno; los documentos de reglas y los gestores migrados existen (tareas 145 y 146).

## Conectividad

**Veredicto:** conectada.

Todo lo que la tarea asume existe: el registro de decisiones con su mecanismo de sustitución (`docs/decisions/README.md`, D009 como precedente), D033 como decisión a sustituir, `PERSONALIZE.md` como documento a reescribir y los cuatro gestores ya migrados a documentos de reglas (tareas 145 y 146). No falta capacidad base.

## Plan técnico

El subsistema es el registro de decisiones (`docs/decisions/` con índice `README.md` por disparadores), el documento de instalación `PERSONALIZE.md` —que describe el catálogo de claves y la inyección vía `convenciones.sh`, ya eliminados— y las referencias vivas al mecanismo sustituido: los cuatro gestores citan D033 y dos skills hablan de «la configuración» como fuente de ubicaciones. La decisión nueva absorbe además el cambio del campo «Orden sugerido» de las ideas: D030 queda sustituida en lo relativo a ese campo, siguiendo el modelo de sustitución parcial de D011.

- [x] Redactar `docs/decisions/D035-reglas-declarativas-por-artefacto.md`
  - Aporta: registra el motivo y la decisión — los agentes leían el artefacto y además invocaban el script, con el conocimiento del formato pagado dos veces; los gestores resuelven ahora las operaciones aplicando el documento de reglas del artefacto, sin script.
  - Contexto: declara la regla de ubicación (hogar único en el gestor dueño de la escritura canónica, referencia cruzada relativa), las convenciones embebidas por documento sin catálogo central, la desaparición de `convencion`, `siguiente` en línea y las dos sustituciones de formato: `## Estado` de línea única y «Requiere» en las ideas. Formato del registro según D010; referencias a las tareas 145–147.
- [x] Marcar D033 sustituida y D030 parcialmente sustituida
  - Aporta: el ciclo de vida del registro refleja qué rige: `## Estado` de D033 pasa a «Sustituida por D035» con la línea de referencia (modelo de D009); D030 queda sustituida solo en lo relativo al orden sugerido (modelo de D011).
- [x] Registrar D035 en `docs/decisions/README.md`
  - Aporta: entrada con disparadores primero, resumen que nombra la sustitución («Sustituye a D033») y estado Aceptada; actualiza el estado de D033 y el de D030.
- [x] Reescribir `PERSONALIZE.md`
  - Aporta: de catálogo de claves a guía por archivo: cada literal personalizable señala el documento de reglas o el skill consumidor que lo contiene; el instalador edita cada archivo individualmente.
  - Contexto: se conservan «Artefactos de la raíz», «Directorios de `docs/`», «Qué queda a criterio del proyecto destino» y «Frontera entre dominio y convención» —ajustada a las convenciones embebidas—; desaparecen «Catálogo de convenciones» e «Inyección al instalar».
- [x] Actualizar las referencias a D033 en los cuatro gestores
  - Aporta: `actualizar-artefactos`, `consultar-artefactos`, `operar-experiencias` y `operar-changelog` citan la decisión vigente.
- [x] Limpiar el residuo de «configuración» en `liberar-version` y `mantener-roadmap`
  - Aporta: las ubicaciones las resuelven los documentos de reglas o el literal embebido del consumidor.
- [x] Revisar `docs/mapa-de-flujos.md` y `docs/definicion-proyecto.md`
  - Aporta: la documentación del sistema describe el modelo vigente; el mecanismo se menciona como gestores que aplican documentos de reglas, no como scripts.
- [x] Verificar referencias
  - Aporta: sin `convencion`, `convenciones.sh` ni `assets/*.sh` citados como vigentes fuera de los documentos históricos.

## Suite de pruebas esperada

- Dado el registro, existe D035 con contexto, decisión, justificación y estado Aceptada que sustituye a D033. (O)
- Dada D033, su archivo y su entrada del índice la declaran sustituida por D035; D030 solo en lo relativo al orden sugerido. (B)
- Dada la documentación viva —`PERSONALIZE.md`, los `SKILL.md` de gestores y consumidores, mapa y definición—, no queda referencia a `convenciones.sh`, a la operación `convencion` ni a scripts de `assets/` como mecanismo vigente; los documentos históricos conservan los suyos. (B)
- Dado `PERSONALIZE.md`, cada literal personalizable nombra el archivo concreto que lo contiene, sin catálogo de claves que resolver. (I)
- Dada la decisión escrita, los documentos de reglas y artefactos que nombra existen en las rutas citadas. (regresión)
- Dada una consulta por disparadores al índice de decisiones con «documentos de reglas» o «delegación», devuelve D035. (I)

## Revisión

- Subagente: 2026-10-26 — Aprueba
- Usuario (ejecución): 2026-10-26 — Aprueba
- Usuario (cierre): 2026-10-26 — Aprueba
