# Política de versionado de los conjuntos

## Estado

[x] Completada

## Tipo

desarrollo

## Objetivo

Decidir cómo versionan los conjuntos entre sí y qué restricciones declaran sus dependencias, de modo que cada manifiesto lleve una versión coherente con una política documentada.

## Dependencias

- 153

## Entrada

- El modelo de fronteras de la tarea 153: conjuntos y grafo de dependencias entre ellos.
- El formato: `version` obligatoria en cada manifiesto y autoridad sobre el VCS; restricción de versión por dependencia como aserción —`^x.y.z`, `~x.y.z`, exacta, comparadores, `*` o ausente (cualquiera)— que valida la versión declarada por la pieza obtenida.
- El versionado vigente del repositorio completo —referencia para el tren compartido—.

## Resultado esperado

- La política documentada: versión inicial por conjunto y reglas de evolución, con la estrategia de restricciones que los manifiestos de la tarea 155 declararán.
- La decisión registrada como decisión de diseño.

## Criterios de calidad

- La política cubre versión inicial y evolución de cada conjunto —incluidos los conjuntos base y el de composición pura, si existen—.
- Decide explícitamente sobre liberaciones independientes (fuera de alcance salvo que se apruebe lo contrario).
- La estrategia de restricciones queda decidida y es aplicable por la tarea 155 sin decisiones pendientes.
- Queda registrada como decisión de diseño.

## Procedimiento sugerido

1. Enunciar las opciones de política: tren de liberación compartido —todos los conjuntos avanzan juntos— frente a cadencias independientes por conjunto.
2. Decidir la versión inicial de cada conjunto del modelo de fronteras.
3. Decidir la estrategia de restricciones que los conjuntos declaran sobre sus dependencias del mismo árbol —qué forma de restricción usa cada declaración y qué exige actualizarla—.
4. Documentar la política: decisión de diseño registrada y referencia en la documentación del formato si aplica.

## Notas

- Fuera de alcance: escribir los manifiestos (tarea 155), adaptar las piezas (tarea 156) y mecanismos de liberación por conjunto —la política los descarta o los aplaza—.

## Contexto

- Terreno: la colección hoy es un solo paquete versionado `0.7.0` —`teleprompter.json` declara `"version": "0.7.0"` y el CHANGELOG lleva `[0.7.0] - 2026-11-20` con `[Unreleased]` vacío—; es la referencia concreta del «tren compartido» que la política evalúa. Las 45 piezas no tienen versión propia: viven dentro del paquete único.
- Archivos similares: `docs/domains/007-coleccion-por-conjuntos.md` —el modelo de la tarea 153: los once conjuntos y el grafo de dependencias que la política versiona—; `docs/decisions/D037-brechas-clasificadas-enrutadas.md` —la decisión más reciente, modelo del formato de decisión a registrar—; `docs/research/2026-09-changelog-y-versionado-semantico.md` —la investigación de versionado que ya sustenta `mantener-changelog` y `liberar-version`—; `/Users/gil/projects/teleprompter/docs/especificacion-paquete.md` —el contrato del formato: `version` obligatoria y autoridad sobre el VCS, restricción por dependencia como aserción (`^`, `~`, exacta, comparadores, `*` o ausente)—.
- Patrones: las decisiones viven en `docs/decisions/DNNN-slug.md` —Estado, Contexto, Decisión, Justificación con alternativas, Referencias—; el siguiente número de la serie es D038. La política misma es conocimiento del modelo de la colección: su hogar natural es el documento de dominio 007, que ya declara división, grafo y degradaciones —la decisión D038 registra el porqué, el documento registra las reglas operativas—.
- Dominio: `docs/domains/007-coleccion-por-conjuntos.md` —la colección por conjuntos es el dominio que esta política gobierna; sus invariantes (grafo acíclico, listas abiertas, coherencia por dependencias declaradas) acotan las opciones de versionado—. Ningún otro documento de dominio aplica.
- Producto: `product-docs/` describe el comportamiento observable de la colección; la política de versionado es decisión interna sin comportamiento observable nuevo —la cara de producto («qué versión tiene cada conjunto») llega cuando los manifiestos existan en la tarea 155—.
- PRD: `docs/prd/007-subpaquetes-por-dominio.md` — CU-1 (instalar un conjunto: los manifiestos necesitan `version` y restricciones que:: esta política produce—), CU-2 (composición pura: `completo` también se versiona—).
- Lecciones: `nomenclatura` (los nombres de conjuntos ya están fijados —`gestores`, `ciclo-revision`, `completo`—; la política no renombra, versiona), `consistencia-de-formatos` (la decisión sigue el formato DNNN vigente; la política se escribe con listas anidadas), `estabilidad-temporal` (los conjuntos y dependencias se referencian por nombre, nunca por posición), `vocabulario` (español llano), `alcance` (mecanismos de liberación por conjunto quedan fuera —la política los descarta o los aplaza—), `flexibilidad-en-procesos` (las listas de la política —conjuntos, reglas de evolución— se declaran abiertas), `contratos-de-skills` (el manifiesto y su `version`/`dependencies` son el contrato que la política escribe), `diseno-de-artefactos` (la decisión se registra como artefacto propio con su ciclo de vida).
- Decisiones: D003 (skills como unidades autocontenidas —los conjuntos versionan unidades, no piezas sueltas—), D004 (estándar Agent Skills —el `version` del manifiesto es del formato, no del skill—), D005 (references/ —dónde puede vivir material de referencia de la política si hiciera falta—), D035 (reglas declarativas por artefacto —la política declara reglas, no scripts—). La propuesta 006 descartó el ciclo de vida de liberaciones independientes por conjunto —la política lo confirma o lo eleva como decisión—.

## Conectividad

Conectada — todo lo que la tarea asume existe: el modelo de fronteras está fusionado en `main` (`docs/domains/007-coleccion-por-conjuntos.md` con los once conjuntos y el grafo de dependencias verificado), el formato de decisión tiene su modelo vigente (`D037` y el índice hasta `D038`), el contrato de `version` y `dependencies` está documentado en la especificación de teleprompter, y la versión vigente del paquete único (`0.7.0`) es la referencia del tren compartido. Los insumos de decisión —grafo, versiones iniciales candidatas, estrategia de restricciones— son trabajo de la propia tarea, no infraestructura ausente.

## Plan técnico

- [x] Clasificar las aristas del grafo por su naturaleza contractual —mecánica de artefactos (`→gestores`), sensores de cierre (`ciclo-tareas`→`direccion`/`documentacion`/`versionado`), contrato de archivo (`ciclo-tareas`→`flujo-ideas` por `formato-idea.md`), ciclo del PR (`→ciclo-revision`), commiteo (`→commit`) y agregación (`completo`→todos)— para que la restricción se decida por clase y no por arista suelta
  - Aporta: la estrategia de restricciones se aplica por regla —la 155 la ejecuta mecánicamente—
  - Contexto: las aristas ya están declaradas con su evidencia en el documento de dominio; la clasificación usa esa misma lista
- [x] Decidir el modelo de versionado: tren compartido —una versión de colección que todos los conjuntos reflejan, como el paquete único `0.7.0` actual— frente a versiones por conjunto con cadencia común; las cadencias independientes ya están fuera de alcance por la propuesta
  - Aporta: la respuesta a «cómo versionan los conjuntos entre sí» —el eje central—
  - Contexto: la referencia del tren compartido es el `0.7.0` vigente; versiones por conjunto exigirían matriz de compatibilidad que el formato no ofrece
- [x] Decidir las versiones iniciales de los once conjuntos y las reglas de evolución —qué dispara el bump de cada uno—
  - Aporta: los valores concretos que los manifiestos de la 155 escribirán en `version`
  - Contexto: los conjuntos son paquetes nuevos —la `0.7.0` versionaba la colección entera como un solo artefacto, no a cada conjunto—
- [x] Decidir la estrategia de restricciones por clase de dependencia —qué forma (`*`, `^`, `~`, exacta, ausente) declara cada arista y qué exige su mantenimiento en cada liberación—
  - Aporta: la política que los `dependencies` de la 155 replican sin decisiones pendientes
  - Contexto: la restricción es aserción —valida la versión declarada, no elige entre versiones—; una restricción que exige actualización manual en cada liberación tiene coste permanente que la política debe pesar
- [x] Escribir la política en `docs/domains/007-coleccion-por-conjuntos.md` como sección propia del modelo, y registrar la decisión en `docs/decisions/D038-<slug>.md` con su entrada en el índice de decisiones
  - Aporta: los dos entregables —la regla operativa en su hogar de modelo y el porqué en el registro—
  - Contexto: el documento de dominio es el hogar de las reglas —la 155 y quien componga consultan ahí—; la decisión registra las alternativas descartadas
- [x] Revisión de redacción preventiva sobre ambos documentos
  - Aporta: la pieza sale con la voz del proyecto

## Suite de pruebas esperada

- Dada la política, todo conjunto —los diez de piezas y `completo`— tiene versión inicial declarada y regla de evolución (CU-1) (I)
- La política decide explícitamente sobre liberaciones independientes por conjunto —confirmando el fuera de alcance de la propuesta o elevándolo como decisión— (B)
- Dada una arista del grafo, la estrategia de restricciones le asigna forma de restricción y regla de mantenimiento sin decisión pendiente (CU-1) (I)
- La política escrita es verificable por la tarea 155 sin interpretación —cada conjunto y cada arista tiene su entrada— (CU-1) (I)
- `completo` tiene política de versión y restricción como los demás conjuntos —su naturaleza de composición pura no lo exime— (CU-2) (I)
- La decisión está registrada en formato DNNN —estado, contexto, decisión, justificación, referencias— y figura en el índice de decisiones (regresión)
- El documento de dominio sigue su plantilla y sus invariantes —grafo acíclico, listas abiertas— no se contradicen (regresión)

## Revisión

- Subagente: 2026-11-25 — Aprueba
- Usuario (ejecución): 2026-11-25 — Aprueba
- Usuario (cierre): [fecha] — [Aprueba | Solicita cambios]
