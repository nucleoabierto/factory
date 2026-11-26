# Colección por conjuntos

## Propósito

La colección de skills se ofrece hoy como una única unidad de 45 piezas: quien quiere solo una parte se lleva la colección entera y elige a mano sin conocer las dependencias internas. Este dominio declara la división de la colección en conjuntos coherentes —cada uno consumible por separado con sus dependencias declaradas— para que la adopción sea proporcional a la necesidad.

## Referencia del modelo

- **Lenguaje ubicuo:**
  - **Pieza:** un skill de la colección —un directorio autocontenido con `SKILL.md` y sus recursos propios (`references/`, `assets/`)—.
    - Ancla: `.agents/skills/`
  - **Conjunto:** un paquete de la colección que agrupa piezas de un dominio de capacidad, instalable por separado y versionado; declara las piezas de otros conjuntos que necesita para completarse.
    - Ancla: este documento; los manifiestos que la materialicen —pendientes de la tarea 155—
  - **Frontera:** el límite de un conjunto; una pieza solo cabe donde sus necesidades obligatorias quedan satisfechas —en la misma frontera o como dependencia declarada—.
    - Ancla: este documento
  - **Necesidad obligatoria / deseable / ortogonal:** toda referencia de una pieza a otra se clasifica así —obligatoria si la pieza no funciona sin ella, deseable si mejora pero degrada con gracia, ortogonal si queda fuera del conjunto—.
    - Ancla: este documento
  - **Degradación elegante:** el comportamiento documentado de una pieza cuando una necesidad deseable no está instalada —instrucción reducida o paso omitido, nunca referencia rota—.
    - Ancla: este documento
  - **Composición pura:** un conjunto sin piezas propias cuyas dependencias reúnen la colección entera; preserva la adopción completa en un solo gesto.
    - Ancla: este documento
  - **Versión de conjunto:** la versión semver propia que el manifiesto de cada conjunto declara —autoridad sobre el VCS, como en todo paquete—.
    - Ancla: este documento; los manifiestos que la materialicen —pendientes de la tarea 155—
  - **Tren de liberación:** el evento de liberación único del repositorio —un tag, el CHANGELOG y la puerta humana de siempre— que mueve las versiones de los conjuntos que cambiaron; las cadencias por conjunto quedan descartadas.
    - Ancla: este documento
- **Entidades / estado — la división declarada:**
  - `gestores` — la mecánica de artefactos y escenarios: `actualizar-artefactos`, `consultar-artefactos`, `consultar-lecciones`, `consultar-decisiones`, `operar-changelog`, `operar-experiencias`, `priorizar-lineas`. Conjunto base: casi todos los demás declaran dependencia sobre él.
  - `commit` — contiene solo la pieza `commit`, la más transversal después de los gestores.
  - `evidencia` — `investigar`, `prueba-concepto`: obtener evidencia externa o validar hipótesis sin cambiar el sistema.
  - `redaccion` — `revisar-redaccion`, `pulir-escritura`: el corte limpio del ejemplo original; cero dependencias salientes.
  - `direccion` — `planificar`, `planificar-roadmap`, `mantener-roadmap`, `mantener-prd`, `revisar-arquitectura`: épicas, roadmap, PRD y dirección arquitectónica.
  - `documentacion` — `documentar-dominio`, `documentar-producto`, `documentar-guia-estilo`, `aplicar-guia-estilo`, `decisiones-diseno`, `destilar-lecciones`: la documentación viva, las decisiones, el aprendizaje y la guía de estilo.
  - `versionado` — `liberar-version`, `mantener-changelog`: el ciclo de liberaciones.
  - `flujo-ideas` — `idea-a-tarea`, `lluvia-de-ideas`, `descubrir-problema`, `proponer-forma-solucion`, `refinar-propuesta`, `crear-tareas`: de la idea suelta a las tareas definitivas.
  - `ciclo-revision` — `gestionar-pr`, `revisar-pr`, `comentar-pr`, `clasificar-comentarios`, `mejorar-pr`: el ciclo de vida del pull request y su revisión.
  - `ciclo-tareas` — `ejecutar-tareas`, `planear-tarea`, `recopilar-contexto`, `evaluar-conectividad`, `planear-implementacion`, `desarrollar-tarea`, `ejecutar-implementacion`, `cerrar-conjunto`, `revisar-implementacion`: el ciclo de desarrollo de una tarea con sus sensores de cierre.
  - `completo` — conjunto de composición pura que depende de todos los demás conjuntos; preserva la adopción completa.
  - Origen: `docs/proposals/006-subpaquetes-por-dominio/propuesta.md`, `docs/epics/007-subpaquetes-por-dominio.md`, `docs/tasks/153-modelo-fronteras-conjuntos.md`
- **Dependencias declaradas entre conjuntos** (las que los manifiestos escribirán). El grafo se extrajo de las invocaciones por nombre y las referencias de archivo en `SKILL.md` y `references/` de las 45 piezas; las menciones en prosa —«cuándo no usar», citas de contexto— no son dependencias:
  - `direccion` → `gestores` — `planificar`, `planificar-roadmap` y `mantener-roadmap` delegan su mecánica en `consultar-artefactos`/`actualizar-artefactos`.
  - `documentacion` → `gestores` — `documentar-dominio`, `documentar-producto`, `decisiones-diseno` y `destilar-lecciones` consultan artefactos y lecciones con los gestores.
  - `versionado` → `gestores` — `mantener-changelog` y `liberar-version` delegan toda operación en `operar-changelog`.
  - `flujo-ideas` → `gestores` — `idea-a-tarea`, `crear-tareas` y `refinar-propuesta` registran artefactos con los gestores; `lluvia-de-ideas` consulta la serie con `consultar-artefactos`.
  - `flujo-ideas` → `direccion` — `idea-a-tarea` invoca `planificar` en modo promoción tras promocionar borradores.
  - `ciclo-revision` → `gestores` — `revisar-pr` y `mejorar-pr` consultan artefactos con los gestores.
  - `ciclo-revision` → `commit` — `mejorar-pr` commitea correcciones y `gestionar-pr` redacta mensajes con las reglas de `commit`.
  - `ciclo-tareas` → `gestores` — `recopilar-contexto`, `evaluar-conectividad` y las piezas de planeación y ejecución delegan en los gestores.
  - `ciclo-tareas` → `direccion` — `ejecutar-tareas` invoca los sensores `mantener-prd` y `mantener-roadmap` al cerrar cada tarea.
  - `ciclo-tareas` → `documentacion` — `ejecutar-tareas` invoca los sensores `documentar-dominio`, `documentar-producto`, `destilar-lecciones` y `decisiones-diseno`.
  - `ciclo-tareas` → `versionado` — `ejecutar-tareas` invoca el sensor `mantener-changelog`.
  - `ciclo-tareas` → `ciclo-revision` — `ejecutar-tareas` abre la puerta de ejecución con `gestionar-pr`.
  - `ciclo-tareas` → `flujo-ideas` — `evaluar-conectividad/references/vuelta-demanda.md` lee `lluvia-de-ideas/references/formato-idea.md` para escribir la demanda derivada.
  - `ciclo-tareas` → `commit` — `ejecutar-tareas` commitea las escrituras del cierre con `commit`.
  - `commit`, `evidencia`, `redaccion`, `gestores` → ninguna
  - El grafo no tiene ciclos: `ciclo-tareas` es el sumidero que declara casi toda la colección porque sus sensores de cierre son parte de su contrato; `gestores`, `commit`, `evidencia` y `redaccion` son fuentes.
- **Política de versionado** (D038 — versión propia por conjunto, liberación única):
  - Los once conjuntos nacen con la versión del tren que los publica primero —`0.8.0`, la próxima liberación—, la misma para `gestores`, `commit`, `evidencia`, `redaccion`, `direccion`, `documentacion`, `versionado`, `flujo-ideas`, `ciclo-revision`, `ciclo-tareas` y `completo`: la línea del paquete único continúa —`factory@0.7.0` → la colección `0.8.0`— y el número lee la era del corte, no una historia que el artefacto no tuvo.
  - La liberación es una sola —el tren—: un tag, el CHANGELOG del repositorio y una puerta humana por evento; los conjuntos que cambiaron avanzan su versión y los que no la conservan. Las cadencias y changelogs independientes por conjunto quedan descartadas —la propuesta los declara fuera de alcance y esta política lo confirma—. El CHANGELOG sigue versionando el tren; los manifiestos versionan cada conjunto.
  - La versión de un conjunto avanza por la señal más fuerte de los cambios que tocan sus piezas o su manifiesto: en la era `0.x` la ruptura sube minor marcada `**Breaking:**` —la convención vigente del CHANGELOG—, la funcionalidad sube minor y la corrección sube patch; `1.0.0` es la promoción de era, decidida por el tren. Un dependiente no avanza por la versión de su dependencia: la restricción absorbe los bumps dentro de la era.
  - Toda dependencia declarada lleva la restricción `>=0.8.0 <1.0.0` —el rango de la era: admite toda la evolución `0.x` y solo dispara cuando una dependencia gradúa a `1.0.0`—. Las aristas se clasifican por naturaleza —mecánica de artefactos (`→gestores`), invocación de pieza (`flujo-ideas`→`direccion`, `→commit`, `ciclo-tareas`→`ciclo-revision`), sensores de cierre (`ciclo-tareas`→`direccion`/`documentacion`/`versionado`), contrato de archivo (`ciclo-tareas`→`flujo-ideas`) y agregación (`completo`→los diez)— y la forma es uniforme: todos los contratos son del mismo tren y se liberan atómicamente.
  - En cada liberación se verifican las restricciones declaradas contra las nuevas versiones de las dependencias —la que quede insatisfecha se actualiza en el manifiesto del dependiente en el mismo tren, y el dependiente avanza también con la señal de sus propios cambios: una actualización de restricción sin cambios de piezas es corrección, patch—; y un bump de dependencia marcado `**Breaking:**` exige revisar la compatibilidad del dependiente en la misma liberación —en la era `0.x` la trampa ante rupturas es esta regla, no el rango—. `completo` declara `>=0.8.0 <1.0.0` sobre los diez conjuntos como cualquier otro —su composición pura no lo exime—.
  - Un conjunto nuevo entra a la colección con la versión del tren vigente y sus dependencias declaradas llevan el rango `>=` la versión vigente de cada dependencia y `<` la siguiente frontera de era —`>=0.8.0 <1.0.0` hoy—; una dependencia nueva sobre un conjunto existente se ancla igual.
  - Las restricciones nombran solo piezas del mismo árbol —los orígenes externos están fuera de alcance—; si esa frontera se amplía, esta política se revisa.
- **Invariantes:**
  - Toda pieza tiene conjunto declarado y la pertenencia es verificable contra la regla de este documento —una pieza nueva declara su conjunto y sus dependencias al entrar a la colección—.
    - Ancla: este documento
  - Toda necesidad obligatoria que cruza frontera queda resuelta como dependencia declarada o co-ubicación; el grafo entre conjuntos no tiene ciclos —el formato de empaquetado los aborta—.
    - Ancla: este documento
  - Toda necesidad deseable no resuelta tiene degradación elegante documentada en la propia pieza —la pieza funciona con solo sus dependencias instaladas—.
    - Ancla: este documento
  - Las listas de conjuntos, dominios y necesidades son abiertas y extensibles: un caso real que no encaje se cubre igual, declarando su pertenencia.
    - Origen: lección `flexibilidad-en-procesos`
- **Degradaciones declaradas** (necesidades deseables sin dependencia):
  - El pulido de redacción preventivo de una docena de piezas invoca `revisar-redaccion` y `pulir-escritura` «si el arnés lo permite» y ya declara el equivalente manual —sin la dependencia, la pieza conserva su procedimiento.
  - La evidencia externa (`investigar`) y la validación de hipótesis (`prueba-concepto`) se invocan condicionalmente en `flujo-ideas` y `ciclo-tareas`; sin ellas la pieza registra la investigación como pendiente o asume con la suposición declarada.
  - Las derivaciones «eso corresponde a X» —enrutado entre skills— son señales, no dependencias: sin la pieza destino el procedimiento termina donde termina.
- **Operaciones:**
  - Componer una pieza nueva: consultar este documento —¿a qué conjunto pertenece? ¿qué declara como dependencia?— antes de escribirla.
  - Instalar un conjunto: el empaquetado resuelve sus dependencias transitivamente; instalar `ciclo-tareas` trae casi toda la colección porque es el sumidero del grafo.
  - Adoptar la colección completa: instalar `completo`, que reproduce la unidad actual en un solo gesto.
  - Liberar el tren: `liberar-version` cura el CHANGELOG y propone el bump del tren; los bumps por conjunto se derivan de las piezas tocadas y las restricciones insatisfechas se actualizan en la misma liberación.

## Explicación del dominio

- **Fronteras:**
  - Dentro: la división de las 45 piezas en conjuntos, sus dependencias declaradas, la política de versionado, las degradaciones y el criterio de composición.
  - Fuera: la mecánica del formato de empaquetado —colecciones, manifiestos, resolución transitiva—, que pertenece al producto de empaquetado; los orígenes externos a la colección; el ciclo de vida de liberaciones independientes por conjunto —descartado por la propuesta y confirmado por la política de versionado—; la reescritura de piezas más allá de su frontera.
  - Relaciones: `ciclo-tareas` es el consumidor mayor —declara casi todos los conjuntos—; `gestores` es la base de la que dependen casi todos; `redaccion` es consumida opcionalmente por una docena de piezas y `evidencia` por dos, sin dependencia declarada.
- **Decisiones relevantes:**
  - `docs/proposals/006-subpaquetes-por-dominio/propuesta.md` — la propuesta aprobada que origina el dominio.
  - `docs/epics/007-subpaquetes-por-dominio.md` y `docs/prd/007-subpaquetes-por-dominio.md` — la épica y el PRD del conjunto.
  - `docs/decisions/D003-skills-como-unidades-autocontenidas.md`, `D004-estandar-agent-skills.md`, `D005-division-progresiva-con-references.md` — las decisiones que definen la pieza que este dominio agrupa.
  - `docs/decisions/D038-versiones-por-conjunto-tren-comun.md` — la política de versionado de los conjuntos que este documento declara.

## Estado de salud

- Última revisión: 2026-11-25
- Divergencias conocidas: el modelo es prospectivo —los conjuntos aún no existen como paquetes; la materialización corre en la tarea 155 y la adaptación de piezas en la 156—; la política de versionado está decidida y la ejecutan los manifiestos de la 155; la lista de conjuntos es la división vigente a esa fecha y crece con cada pieza nueva.
