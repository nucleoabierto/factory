# Colección por conjuntos

## Propósito

La colección de skills se ofrece hoy como una única unidad de 45 piezas: quien quiere solo una parte se lleva la colección entera y elige a mano sin conocer las dependencias internas. Este dominio declara la división de la colección en conjuntos coherentes —cada uno consumible por separado con sus dependencias declaradas— para que la adopción sea proporcional a la necesidad.

## Referencia del modelo

- **Lenguaje ubicuo:**
  - **Pieza:** un skill de la colección —un directorio autocontenido con `SKILL.md` y `references/`—.
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
- **Entidades / estado — la división declarada:**
  - `gestores` — la mecánica de artefactos y escenarios: `actualizar-artefactos`, `consultar-artefactos`, `consultar-lecciones`, `consultar-decisiones`, `operar-changelog`, `operar-experiencias`, `priorizar-lineas`. Conjunto base: casi todos los demás declaran dependencia sobre él.
  - `commit` — contiene solo la pieza `commit`, la más transversal después de los gestores.
  - `evidencia` — `investigar`, `prueba-concepto`: obtener evidencia externa o validar hipótesis sin cambiar el sistema.
  - `redaccion` — `revisar-redaccion`, `pulir-escritura`: el corte limpio del ejemplo original; cero dependencias salientes.
  - `direccion` — `planificar`, `planificar-roadmap`, `mantener-roadmap`, `mantener-prd`, `revisar-arquitectura`: épicas, roadmap, PRD y dirección arquitectónica.
  - `documentacion` — `documentar-dominio`, `documentar-producto`, `documentar-guia-estilo`, `aplicar-guia-estilo`, `decisiones-diseno`, `destilar-lecciones`: la documentación viva, las decisiones, el aprendizaje y la guía de estilo.
  - `versionado` — `liberar-version`, `mantener-changelog`: el ciclo de liberaciones.
  - `flujo-ideas` — `idea-a-tarea`, `lluvia-de-ideas`, `descubrir-problema`, `proponer-forma-solucion`, `refinar-propuesta`, `crear-tareas`: de la idea suelta a las tareas definitivas.
  - `lazo-revision` — `gestionar-pr`, `revisar-pr`, `comentar-pr`, `clasificar-comentarios`, `mejorar-pr`: el ciclo de vida del pull request y su revisión.
  - `ciclo-tareas` — `ejecutar-tareas`, `planear-tarea`, `recopilar-contexto`, `evaluar-conectividad`, `planear-implementacion`, `desarrollar-tarea`, `ejecutar-implementacion`, `cerrar-conjunto`, `revisar-implementacion`: el ciclo de desarrollo de una tarea con sus sensores de cierre.
  - `composicion` — conjunto de composición pura que depende de todos los demás conjuntos; preserva la adopción completa.
  - Origen: `docs/proposals/006-subpaquetes-por-dominio/propuesta.md`, `docs/epics/007-subpaquetes-por-dominio.md`, `docs/tasks/153-modelo-fronteras-conjuntos.md`
- **Dependencias declaradas entre conjuntos** (las que los manifiestos escribirán). El grafo se extrajo de las invocaciones por nombre y las referencias de archivo en `SKILL.md` y `references/` de las 45 piezas; las menciones en prosa —«cuándo no usar», citas de contexto— no son dependencias:
  - `direccion` → `gestores` — `planificar`, `planificar-roadmap` y `mantener-roadmap` delegan su mecánica en `consultar-artefactos`/`actualizar-artefactos`.
  - `documentacion` → `gestores` — `documentar-dominio`, `documentar-producto`, `decisiones-diseno` y `destilar-lecciones` consultan artefactos y lecciones con los gestores.
  - `versionado` → `gestores` — `mantener-changelog` y `liberar-version` delegan toda operación en `operar-changelog`.
  - `flujo-ideas` → `gestores` — `idea-a-tarea`, `crear-tareas`, `refinar-propuesta` y `lluvia-de-ideas` registran artefactos con los gestores.
  - `flujo-ideas` → `direccion` — `idea-a-tarea` invoca `planificar` en modo promoción tras promocionar borradores.
  - `lazo-revision` → `gestores` — `revisar-pr` y `mejorar-pr` consultan artefactos con los gestores.
  - `lazo-revision` → `commit` — `mejorar-pr` commitea correcciones y `gestionar-pr` redacta mensajes con las reglas de `commit`.
  - `ciclo-tareas` → `gestores` — `recopilar-contexto`, `evaluar-conectividad` y las piezas de planeación y ejecución delegan en los gestores.
  - `ciclo-tareas` → `direccion` — `ejecutar-tareas` invoca los sensores `mantener-prd` y `mantener-roadmap` al cerrar cada tarea.
  - `ciclo-tareas` → `documentacion` — `ejecutar-tareas` invoca los sensores `documentar-dominio`, `documentar-producto`, `destilar-lecciones` y `decisiones-diseno`.
  - `ciclo-tareas` → `versionado` — `ejecutar-tareas` invoca el sensor `mantener-changelog`.
  - `ciclo-tareas` → `lazo-revision` — `ejecutar-tareas` abre la puerta de ejecución con `gestionar-pr`.
  - `ciclo-tareas` → `flujo-ideas` — `evaluar-conectividad/references/vuelta-demanda.md` lee `lluvia-de-ideas/references/formato-idea.md` para escribir la demanda derivada.
  - `ciclo-tareas` → `commit` — `ejecutar-tareas` commitea cada ronda con `commit`.
  - `commit`, `evidencia`, `redaccion`, `gestores` → ninguna
  - El grafo no tiene ciclos: `ciclo-tareas` es el sumidero que declara casi toda la colección porque sus sensores de cierre son parte de su contrato; `gestores`, `commit`, `evidencia` y `redaccion` son fuentes.
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
  - Adoptar la colección completa: instalar `composicion`, que reproduce la unidad actual en un solo gesto.

## Explicación del dominio

- **Fronteras:**
  - Dentro: la división de las 45 piezas en conjuntos, sus dependencias declaradas, las degradaciones y el criterio de composición.
  - Fuera: la mecánica del formato de empaquetado —colecciones, manifiestos, resolución transitiva—, que pertenece al producto de empaquetado; los orígenes externos a la colección; el ciclo de vida de liberaciones independientes por conjunto —descartado por la propuesta—; la reescritura de piezas más allá de su frontera.
  - Relaciones: `ciclo-tareas` es el consumidor mayor —declara casi todos los conjuntos—; `gestores` es la base de la que dependen casi todos; `redaccion` y `evidencia` son consumidos opcionalmente por muchas piezas sin dependencia declarada.
- **Decisiones relevantes:**
  - `docs/proposals/006-subpaquetes-por-dominio/propuesta.md` — la propuesta aprobada que origina el dominio.
  - `docs/epics/007-subpaquetes-por-dominio.md` y `docs/prd/007-subpaquetes-por-dominio.md` — la épica y el PRD del conjunto.
  - `docs/decisions/D003-skills-como-unidades-autocontenidas.md`, `D004-estandar-agent-skills.md`, `D005-division-progresiva-con-references.md` — las decisiones que definen la pieza que este dominio agrupa.

## Estado de salud

- Última revisión: 2026-11-24
- Divergencias conocidas: el modelo es prospectivo —los conjuntos aún no existen como paquetes; la materialización corre en la tarea 155 y la adaptación de piezas en la 156—; la lista de conjuntos es la división vigente a esa fecha y crece con cada pieza nueva.
