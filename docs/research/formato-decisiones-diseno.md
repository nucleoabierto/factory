# Formato para decisiones de diseño

## Propósito

Investigar formatos para registrar decisiones de diseño y proponer uno que encaje con el estilo del proyecto. Las decisiones de diseño son reglas que explican la forma actual del proyecto, sus principios rectores y las guías para mantener coherencia en su evolución. Responden a la pregunta: ¿por qué este sistema tiene esta forma? No son un registro de tareas.

## Qué es una decisión de diseño

Una decisión de diseño es una elección justificada que da forma al proyecto y que es costosa de revertir. Define una regla o un principio que orienta decisiones futuras. Ejemplos:

- Usar `TODO.txt` como índice único de tareas en lugar de un sistema externo.
- Escribir los skills en español y bajo el estándar Agent Skills.
- Mantener un commit por tarea completada.

No son decisiones de diseño:

- El registro de una tarea completada (eso vive en `TODO.txt` y en el archivo de tarea).
- La descripción de cómo se implementó algo (eso vive en el commit y en el código).
- Un documento de visión o un README (esos describen el proyecto, no justifican una elección concreta).

La distinción clave es la **inmutabilidad relativa**: una decisión de diseño se escribe una vez y se mantiene salvo que una decisión posterior la revoque o la sustituya. Una tarea es efímera: existe mientras se ejecuta y luego queda como historial.

Las decisiones de diseño tampoco se confunden con las reglas siempre activas (como `AGENTS.md`): las decisiones son el registro histórico que justifica por qué el proyecto tiene su forma actual; las reglas operativas viven en `AGENTS.md` y rigen el comportamiento del agente en cada sesión. Una decisión puede dar origen a una regla, pero son documentos distintos con propósitos distintos.

## Enfoques analizados

### 1. Architecture Decision Records (ADR)

Popularizado por Michael Nygard en 2011 y adoptado ampliamente desde entonces. Cada decisión vive en su propio archivo Markdown, numerado secuencialmente, bajo un directorio dedicado (típicamente `doc/adr/`). El formato canónico tiene cinco secciones: título, contexto, decisión, estado y consecuencias. Variantes como MADR añaden opciones consideradas y *drivers* de decisión.

**Ventajas:**

- Formato maduro y ampliamente documentado; existe consenso sobre su estructura.
- Una decisión por archivo facilita el seguimiento y la sustitución.
- El estado explícito (propuesta, aceptada, sustituida, obsoleta) permite evolucionar el registro sin perder el historial.
- Markdown y control de versiones son ciudadanos de primera clase: los ADR se versionan y se revisan como código.
- Escala bien: el registro crece añadiendo archivos sin tocar los existentes.

**Desventajas:**

- El formato canónico está pensado para decisiones de arquitectura de software, no para principios de un proyecto de documentación. Requiere adaptación.
- La numeración secuencial y el directorio dedicado añaden ceremonia para un proyecto de este tamaño.
- El énfasis en opciones consideradas y consecuencias puede ser excesivo para decisiones que son más principios que elecciones técnicas.

### 2. Documento de principios

Un único archivo que enumera los principios rectores del proyecto. Cada principio es una afirmación breve con una justificación. No hay numeración ni estado; el documento evoluciona *in place*.

**Ventajas:**

- Máxima simplicidad: un solo archivo, sin numeración, sin estados.
- Los principios son visibles de un vistazo.
- Encaja con la filosofía del proyecto de mantener un índice único (`TODO.txt` como referencia cercana).

**Desventajas:**

- No hay trazabilidad: cuando un principio cambia, se pierde el anterior sin dejar rastro.
- Mezcla principios fundacionales con decisiones puntuales bajo el mismo formato, lo que diluye la distinción entre «regla permanente» y «decisión reversible».
- No permite marcar una decisión como sustituida u obsoleta: el cambio es silencioso.
- Difícil de enlazar desde otros documentos: un principio no tiene identificador estable.

### 3. Decisiones de diseño numeradas (formato híbrido)

Un único directorio con un archivo por decisión, pero con un formato más ligero que el ADR canónico: contexto, decisión y justificación, sin opciones consideradas ni consecuencias formales. Numeración secuencial para enlazar y referenciar. Estado explícito para sustituciones.

**Ventajas:**

- Combina la trazabilidad del ADR (una decisión por archivo, numeración, estado) con la simplicidad del documento de principios (formato reducido, sin secciones prescindibles).
- El formato reducido encaja con decisiones que son principios más que elecciones técnicas con alternativas explícitas.
- La numeración permite enlazar decisiones desde `TODO.txt`, archivos de tarea y otros documentos.
- El estado explícito permite sustituir decisiones sin perder el historial.
- Escala por adición: nuevas decisiones son nuevos archivos, sin tocar los existentes.

**Desventajas:**

- Requiere definir y mantener una convención de numeración y estado.
- Más ceremonia que un documento único para un proyecto pequeño.
- El formato reducido pierde la sección de opciones consideradas, que en algunos casos sería útil.

### 4. RFC (Request for Comments)

Un documento por propuesta, abierto a discusión antes de tomar la decisión. Una vez cerrada la discusión, la propuesta se convierte en decisión o se rechaza.

**Ventajas:**

- Explicita el proceso de deliberación antes de la decisión.
- Útil cuando hay múltiples partes con veto.

**Desventajas:**

- Presupone un proceso de deliberación entre varias partes, ajeno a un proyecto de una sola persona.
- El RFC captura la deliberación, no la decisión: necesita un formato adicional para registrar el resultado.
- Ceremonia desproporcionada para el tamaño del proyecto.

## Evaluación comparativa

| Criterio | ADR canónico | Documento de principios | Decisiones numeradas (híbrido) | RFC |
|----------|--------------|-------------------------|--------------------------------|-----|
| Trazabilidad de cambios | Alta | Baja | Alta | Media |
| Simplicidad | Media | Alta | Media-Alta | Baja |
| Encaje con el estilo del proyecto | Media | Alta | Alta | Baja |
| Escalabilidad por adición | Alta | Baja | Alta | Media |
| Distinción principio vs. decisión | Media | Baja | Alta | Media |
| Marcado de sustitución | Sí | No | Sí | No |
| Enlazable desde otros documentos | Sí | No | Sí | Sí |

## Recomendación

**Decisiones de diseño numeradas (formato híbrido).**

Es el enfoque que mejor equilibra trazabilidad y simplicidad para un proyecto de este tamaño y estilo:

- **Trazabilidad:** cada decisión tiene un identificador estable que se puede enlazar desde `TODO.txt`, archivos de tarea y otros documentos. Cuando una decisión se sustituye, el historial se preserva.
- **Simplicidad:** el formato tiene tres secciones (contexto, decisión, justificación), no cinco o más. No exige opciones consideradas ni consecuencias formales, aunque permite incluirlas cuando aporten valor.
- **Encaje con el proyecto:** Markdown, español, un archivo por unidad, numeración secuencial. Las mismas convenciones que `TODO.txt` y los archivos de tarea.
- **Escalabilidad:** nuevas decisiones son nuevos archivos. No se editan decisiones existentes salvo para marcarlas como sustituidas.
- **Distinción clara:** el formato separa la decisión de su contexto y su justificación, lo que permite distinguir reglas permanentes de elecciones reversibles.

### Ubicación

```
docs/decisions/
└── DNNN-slug.md
```

Bajo `docs/`, junto a `research/`, `tasks/` y `reviews/`. La numeración es secuencial y monotónica, con prefijo `D` y tres dígitos, al igual que las tareas usan tres dígitos sin prefijo. El prefijo `D` distingue los identificadores de decisión de los de tarea cuando se citan en texto plano (p. ej., «D001» frente a «001»). Los números no se reutilizan.

### Formato propuesto

```markdown
# DNNN: Título breve de la decisión

## Estado

Aceptada | Sustituida por DNNN | Obsoleta

## Contexto

[Qué problema o situación motivó la decisión. Dos a cuatro frases. Describe las
fuerzas en juego, sin justificar la decisión todavía.]

## Decisión

[Qué se decidió. Frases claras y concretas, en primera persona del plural:
«Usamos…», «Mantenemos…». Una a tres frases.]

## Justificación

[Por qué se tomó esta decisión y no otra. Qué alternativas se consideraron, si
aporta valor listarlas. Qué consecuencias tiene.]

## Referencias

- [Enlaces a tareas, investigaciones u otros documentos relacionados, si los hay.]
```

### Reglas del formato

1. Una decisión por archivo, numerada secuencialmente (`D001`, `D002`, …).
2. El título es una frase nominal breve que describe la decisión, no el problema.
3. El estado se actualiza cuando una decisión posterior la sustituye o la deja obsoleta. La decisión original no se reescribe: se marca y se enlaza a la sustituta.
4. El contexto describe las fuerzas, no la justificación. La justificación va en su propia sección.
5. La decisión se escribe en presente y en primera persona del plural.
6. Las referencias son opcionales; se incluyen solo si enlazan a documentos existentes en el repositorio.
7. Las decisiones se escriben en español y en Markdown, como el resto del proyecto.

### Ejemplo

```markdown
# D001: TODO.txt como índice único de tareas

## Estado

Aceptada

## Contexto

El proyecto necesita un mecanismo para seguir el estado de las tareas a lo largo del
tiempo. Las opciones van desde un gestor externo (Linear, GitHub Issues) hasta un
archivo de texto plano en el repositorio. El proyecto prioriza la simplicidad, la
trazabilidad en git y la independencia de herramientas externas.

## Decisión

Mantenemos `TODO.txt` como índice único de tareas. Cada tarea se documenta en un
archivo individual bajo `docs/tasks/` y se referencia desde `TODO.txt`.

## Justificación

Un archivo de texto plano en el repositorio es versionable, inspeccionable sin
herramientas externas y suficiente para el volumen actual. Un gestor externo
añadiría una dependencia y una fuente de verdad paralela. El formato de una línea
por tarea con estado entre corchetes es legible y procesable por el skill
`ejecutar-tareas`.
```

## Referencias

- Documenting Architecture Decisions — Michael Nygard, 2011 (cognitect.com/blog/2011/11/15/documenting-architecture-decisions)
- Architecture Decision Record — Martin Fowler (martinfowler.com/bliki/ArchitectureDecisionRecord.html)
- Architectural Decision Records (ADR) — adr.github.io
- MADR — github.com/adr/madr
- Lightweight Architecture Decision Records — github.com/peter-evans/lightweight-architecture-decision-records
- ADRs for small projects — oshy.tech/en/blog/adr-small-projects-technical-decisions
