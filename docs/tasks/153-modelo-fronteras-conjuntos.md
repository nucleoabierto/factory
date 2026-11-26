# Modelo de fronteras de los conjuntos

## Estado

[x] Completada

## Tipo

desarrollo

## Objetivo

Definir el modelo que decide a qué conjunto pertenece cada pieza, qué conjunto depende de cuál y qué necesidades quedan degradadas, de modo que cada conjunto sea consumible por separado con su coherencia garantizada por dependencias declaradas.

## Dependencias

- Ninguna

## Entrada

- La propuesta `docs/proposals/006-subpaquetes-por-dominio/propuesta.md` y la idea `docs/ideas/006-division-paquete-partes.md`.
- El grafo real de dependencias entre las 45 piezas —a regenerar sobre el estado vigente—.
- `skill-para-humano`, que hoy declara «pieza autocontenida en un directorio».
- El formato de empaquetado: colecciones, dependencias entre paquetes del mismo árbol por nombre, composición pura.

## Resultado esperado

- El modelo de fronteras documentado: división declarada de conjuntos, grafo de dependencias entre ellos, lista de necesidades degradadas, decisión sobre conjuntos base y de composición pura.
- `skill-para-humano` anexado con el criterio de composición: «¿a qué conjunto pertenece la pieza? ¿qué declara como dependencia?».

## Criterios de calidad

- Toda pieza tiene conjunto declarado; la pertenencia es verificable contra la regla.
- Cada necesidad obligatoria que cruza frontera queda resuelta como dependencia declarada o co-ubicación; el grafo no tiene ciclos —el formato los aborta—.
- Las necesidades deseables no resueltas tienen degradación elegante documentada.
- La división responde al problema: un conjunto como el de redacción es consumible solo, sin invocaciones ni referencias rotas a lo no instalado.

## Procedimiento sugerido

1. Obtener el grafo real de dependencias entre las 45 piezas (invocaciones y referencias entre ellas).
2. Agrupar por dominio de capacidad: redacción; lazo de revisión; núcleo del ciclo (descubrimiento→entrega); gestión de producto; validación; gestores e instrumentación.
3. Clasificar cada necesidad de una pieza sobre otra: obligatoria —la pieza no funciona sin ella: va a la misma frontera o se declara dependencia del conjunto—; deseable —mejora pero puede degradarse con gracia—; ortogonal —fuera del conjunto—.
4. Trazar el grafo de dependencias entre conjuntos: para cada necesidad obligatoria que cruza frontera, decidir dependencia declarada o co-ubicación —el material compartido por muchos (gestores) pesa a favor de un conjunto base del que dependan los demás—.
5. Decidir si la colección incluye un conjunto de composición pura —sin contenido propio, depende de todos— que preserve la adopción completa en un solo gesto.
6. Anexar a `skill-para-humano` el criterio de composición.

## Notas

- Fuera de alcance: la política de versionado (tarea 154) —aunque el grafo que aquí se declara es su entrada—, la materialización de la colección (tarea 155) y la adaptación de las piezas (tarea 156).
- La frontera se decide por conjunto con criterio explícito por pieza: la pertenencia no depende de criterio implícito.
- El análisis previo muestra gestores compartidos por casi todas las piezas (`distribuir`, `actualizar-artefactos`, `operar-changelog`, `operar-roadmap`, `registrar`, `consultar-artefactos`), orquestadores con muchas dependencias (`ejecutar-tareas`, `idea-a-tarea`, `crear-tareas`, `planificar`) y piezas aisladas (`revisar-redaccion`, `pulir-escritura`).

## Contexto

- Terreno: las 45 piezas viven en `.agents/skills/<nombre>/` con `SKILL.md` y `references/`; las dependencias son invocaciones por nombre y referencias `../<hermano>/` entre ellas. El grafo se regenera sobre el estado vigente —el análisis de la propuesta es de hace días—.
- Vacío detectado: `skill-para-humano` no existe —la Entrada de esta tarea lo cita por error—; ninguna pieza declara hoy un criterio de composición de skills. El criterio debe buscar hogar real: el propio documento del modelo es el candidato natural, al ser la referencia que consultará quien componga una pieza nueva.
- Archivos similares: `evaluar-conectividad/references/clasificacion-brechas.md` —precedente de modelo como documento de referencia en `references/` del consumidor—; `docs/epics/007-subpaquetes-por-dominio.md` y `docs/prd/007-subpaquetes-por-dominio.md` —guía del conjunto y casos de uso—.
- Patrones: documento de modelo en español llano con listas anidadas por entrada; la evidencia se ancla en rutas reales, no en afirmaciones.
- Dominio: ningún documento de `docs/domains/` cubre el empaquetado de la colección —los existentes gobiernan el ciclo de tareas y sus subflujos—; el modelo de fronteras es en sí mismo material de dominio nuevo.
- Producto: `product-docs/` describe el comportamiento observable de la colección; esta tarea produce el modelo, sin cambio observable todavía —la división se materializa en la tarea 155—.
- PRD: `docs/prd/007-subpaquetes-por-dominio.md` — CU-1 (instalación de un conjunto: el grafo de dependencias que el modelo declara es su entrada), CU-2 (composición pura: decisión del modelo) y CU-3 (pieza en frontera: las degradaciones que el modelo lista).
- Lecciones: `contratos-de-skills` (reglas inline; referencias solo a material del paquete; listas abiertas), `consistencia-de-formatos` (listas anidadas para entradas con varios campos; formato vigente del archivo), `vocabulario` (español llano), `flexibilidad-en-procesos` (las listas del modelo —conjuntos, dominios— se declaran abiertas y extensibles), `alcance` (hallazgos fuera de la tarea se reportan), `estabilidad-temporal` (las piezas se referencian por nombre, no por posición), `higiene-de-ramas` (rama propia ya creada).
- Decisiones: D003 (skills como unidades autocontenidas —el modelo decide sus fronteras de composición—), D004 (estándar Agent Skills —cada pieza conserva su formato al cambiar de conjunto—), D005 (references/ —dónde puede vivir el documento del modelo—), D035 (los gestores operan por reglas declarativas; el grafo de dependencias es análisis único de esta tarea, no un paso mecánico compartido que amerite artefacto propio).

## Conectividad

Parcialmente conectada — las 45 piezas existen en `.agents/skills/` con sus `SKILL.md` y `references/`, las dependencias son detectables por invocaciones por nombre y referencias `../<hermano>/` (grafo ya computado en la propuesta), y el documento del modelo tiene hogar natural en `docs/` junto a `definicion-proyecto.md` y `mapa-de-flujos.md`. Falta el anexo declarado: `skill-para-humano` no existe —es un error de la Entrada, no infraestructura ausente—; es absorbible por la propia tarea: el criterio de composición vive como sección del documento del modelo, que es la referencia que consultará quien componga una pieza nueva.

## Plan técnico

La colección son 45 piezas autocontenidas en `.agents/skills/` con `SKILL.md` y `references/`; las dependencias entre ellas se detectan por invocaciones por nombre y referencias `../<pieza>/`. El entregable es un documento de dominio en `docs/domains/` —la colección aún no existe como estructura, la materializa la tarea 155— que declara la división, el grafo entre conjuntos y las reglas de coherencia; la guía de la épica fija coherencia por dependencias declaradas y listas abiertas.

- [x] Regenerar el grafo de dependencias entre las 45 piezas: por pieza, extraer invocaciones por nombre y referencias `../` en `SKILL.md` y `references/`; clasificar cada arista como invocación, referencia de archivo o mención incidental
  - Aporta: la evidencia base del modelo —distingue dependencia real de co-mención—
  - Contexto: «cuándo no usar: usar X» y las citas en prosa no son dependencias; solo la invocación o la referencia de archivo exigen la pieza
- [x] Agrupar las piezas por dominio de capacidad —redacción, lazo de revisión, ciclo de tareas, gestión de producto, documentación, gestores/utilidades— con la lista declarada abierta
  - Aporta: la división candidata sobre la que se clasifican las necesidades
- [x] Clasificar cada necesidad que cruza frontera: obligatoria —misma frontera o dependencia declarada—, deseable —degradación elegante—, ortogonal —fuera—
  - Aporta: la regla de coherencia que hace verificable la pertenencia
- [x] Trazar el grafo de dependencias entre los conjuntos resultantes; decidir qué material compartido es conjunto base del que dependen los demás frente a duplicación, y si la colección declara composición pura
  - Aporta: el grafo que los manifiestos de la tarea 155 escribirán como `dependencies`
- [x] Escribir el documento de dominio `docs/domains/007-coleccion-por-conjuntos.md` siguiendo la plantilla de dominio —propósito, lenguaje ubicuo, entidades con los conjuntos y sus piezas ancladas, invariantes de coherencia, fronteras y operaciones—, con la división, el grafo y las degradaciones como contenido del modelo y el criterio de composición como invariante; darlo de alta en `docs/domains/README.md`
  - Aporta: el entregable; el criterio de composición sustituye al anexo a `skill-para-humano` inexistente (absorbido, ver Conectividad) y queda vivo bajo el sensor `documentar-dominio`
- [x] Revisión de redacción preventiva sobre el documento final
  - Aporta: la pieza sale con la voz del proyecto

## Suite de pruebas esperada

- Dada una pieza con invocaciones o referencias a otras, el grafo las registra con su evidencia —ninguna arista sin archivo que la respalde— (CU-1) (I)
- Dada la división, toda pieza tiene conjunto declarado y la pertenencia es verificable contra la regla escrita (CU-1) (I)
- Dada una necesidad obligatoria que cruza frontera, el modelo la resuelve como dependencia declarada o co-ubicación; el grafo entre conjuntos no tiene ciclos (CU-1) (B)
- Dada una necesidad deseable no resuelta, el modelo declara su degradación elegante (CU-3) (I)
- El modelo declara la decisión sobre composición pura y su consecuencia para la adopción completa (CU-2) (I)
- El conjunto de redacción —o el dominio limpio que resulte— es consumible solo: sus piezas no tienen necesidades obligatorias fuera del conjunto (CU-1) (I)
- El documento sigue la plantilla de dominio, figura en el índice de `docs/domains/` y declara el criterio de composición consultable por quien componga una pieza nueva (regresión)

## Revisión

- Subagente: 2026-11-24 — Aprueba (primera ronda solicitó cambios: tres atribuciones de evidencia corregidas y verificadas)
- Usuario (ejecución): 2026-11-24 — Aprueba
- Usuario (cierre): [fecha] — [Aprueba | Solicita cambios]
