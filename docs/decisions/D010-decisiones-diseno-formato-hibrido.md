# D010: Decisiones de diseño numeradas (formato híbrido)

## Estado

Aceptada

## Contexto

El proyecto necesita un mecanismo para registrar las decisiones de diseño que dan forma a su estructura actual y guían su evolución. Las opciones van desde Architecture Decision Records (ADR) canónico hasta un documento de principios único, pasando por RFC.

## Decisión

Mantenemos un formato híbrido: un archivo por decisión bajo `docs/decisions/DNNN-slug.md`, con numeración secuencial, estado explícito y cuatro secciones (estado, contexto, decisión, justificación), más una sección opcional de referencias. El formato es más ligero que el ADR canónico: no exige opciones consideradas ni consecuencias formales, aunque permite incluirlas cuando aportan valor.

## Justificación

El formato híbrido equilibra trazabilidad y simplicidad para el tamaño del proyecto. Cada decisión tiene un identificador estable que se puede enlazar desde `TODO.txt`, archivos de tarea y otros documentos. El estado explícito permite sustituir decisiones sin perder el historial. El formato reducido encaja con decisiones que son principios más que elecciones técnicas con alternativas explícitas. La investigación en `docs/research/formato-decisiones-diseno.md` analizó cuatro enfoques y documentó esta elección.
