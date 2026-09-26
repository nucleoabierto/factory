# D026: El documento de dominio separa referencia y explicación

## Estado

Aceptada

## Contexto

La plantilla del documento de dominio mezclaba en el mismo nivel hechos consultables del modelo (glosario, entidades, invariantes, operaciones) con contexto y juicio (propósito, fronteras, decisiones, salud). La lectura Diátaxis de la investigación previa lo marcó: el documento respondía a dos necesidades distintas sin estructura que las separara.

## Decisión

La plantilla del documento de dominio agrupa sus campos en dos secciones: «Referencia del modelo» (lenguaje ubicuo, entidades y estado, invariantes y operaciones, con anclas al código) y «Explicación del dominio» (fronteras y decisiones relevantes). «Propósito» queda como orientación inicial y «Estado de salud» como meta del documento.

## Justificación

La separación es estructural, no solo de redacción: cada tipo de información tiene su cajón, como en un arc42 reducido. Referencia se consulta para saber qué es cierto; explicación se lee para entender por qué. Los campos van como bullets etiquetados con sub-listas, coherente con la convención de formatos del proyecto. Las invariantes del formato —un hogar por hecho, índice obligatorio, anclas al código, superseder y estado de salud— no cambian.

## Referencias

- `docs/tasks/086-reestructurar-plantilla-documento-dominio.md` — tarea que la consolida
- `docs/research/2026-09-documentacion-producto-y-roadmap.md` — la lectura Diátaxis del formato anterior
- `docs/research/2026-09-revision-arquitectura-y-documentacion-dominio.md` — el arc42 reducido que motivó el formato original
