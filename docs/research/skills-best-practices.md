# Mejores prácticas para crear y mantener skills

## Propósito

Definir principios, estructura, convenciones y criterios de calidad para crear y mantener *skills* que sean agnósticos al arnés (*harness*): aplicables a cualquier agente, no solo a un *framework* específico.

## Qué es un *skill*

Un skill es una unidad autocontenida de funcionalidad que enseña a un agente a ejecutar un flujo de trabajo repetible. No es un depósito de reglas generales del proyecto (para eso existen las reglas siempre activas como `AGENTS.md`), sino un procedimiento invocable que el agente carga solo cuando es relevante.

### Cuándo crear un *skill*

Un skill es apropiado cuando el conocimiento es:

- **Repetible** entre conversaciones.
- **Específico de una tarea**, no globalmente aplicable.
- **Procedimental o de dominio**, de forma que conviene externalizarlo en lugar de depender de la memoria del modelo.
- **Útil** para que agentes futuros no tengan que redescubrirlo.
- **Validable** como flujo de trabajo, no como un *prompt* de un solo uso.

### Cuándo no crear un *skill*

- Si el conocimiento es global y siempre activo: usar reglas.
- Si la tarea es de un solo uso: un *prompt* directo basta.
- Si el conocimiento es demasiado vago para definir criterios de finalización.

## Estándar Agent Skills

Existe un estándar abierto para *skills*: **Agent Skills** (agentskills.io), desarrollado por Anthropic. Lo adoptan múltiples productos: Claude Code, Windsurf, Microsoft Agent Framework, OpenAI Codex, entre otros. La especificación define un formato portable de `SKILL.md` que cualquier agente compatible puede descubrir, cargar y ejecutar. Este documento se basa en esa especificación y usa solo sus campos y convenciones.

## Estructura de un *skill*

### Ubicación

El estándar define `.agents/skills/` como ubicación portable:

```
.agents/skills/
└── mi-skill/
    └── SKILL.md
```

Esta es la ubicación universalmente reconocida.

### Estructura de directorios

```
mi-skill/
├── SKILL.md              # Requerido: metadatos + instrucciones
├── references/           # Opcional: documentación detallada, cargada bajo demanda
│   ├── principios.md
│   └── ejemplos.md
├── scripts/              # Opcional: código ejecutable para operaciones repetibles
└── assets/               # Opcional: plantillas y recursos estáticos
```

### Frontmatter

El *frontmatter* YAML contiene metadatos que el agente usa para descubrir y ejecutar el skill. El estándar define los siguientes campos:

```yaml
---
name: mi-skill
description: Qué hace el skill y cuándo usarlo
---
```

#### Campos del estándar

| Campo | Requerido | Función | Restricciones |
|-------|-----------|---------|---------------|
| `name` | Sí | Identificador del skill | Máx. 64 caracteres; minúsculas, números y guiones; sin guiones al inicio/final ni consecutivos; debe coincidir con el nombre del directorio |
| `description` | Sí | Descripción para descubrimiento | Máx. 1024 caracteres; debe describir qué hace y cuándo usarlo |
| `license` | No | Licencia del skill | Nombre de licencia o referencia a archivo |
| `compatibility` | No | Requisitos de entorno | Máx. 500 caracteres |
| `metadata` | No | Metadatos arbitrarios | Mapa de clave-valor (strings) |
| `allowed-tools` | No (experimental) | Herramientas preaprobadas | Cadena separada por espacios |

### Cuerpo del `SKILL.md`

El cuerpo es el *prompt* que el arnés inyecta al invocar el skill. Debe contener:

1. **Qué hace el skill** — Una frase que lo defina.
2. **Cuándo usarlo** — Condiciones de aplicación.
3. **Cuándo no usarlo** — Límites explícitos, con referencia a skills relacionados.
4. **Entrada** — Qué recibe el skill.
5. **Salida** — Qué devuelve el skill.
6. **Principios rectores** — Si el skill aplica principios o criterios de juicio.
7. **Procedimiento** — Pasos ordenados que el agente debe seguir.
8. **Formato de salida** — Si la salida tiene un formato específico, una plantilla.

### División progresiva (*progressive disclosure*)

El skill se carga en tres niveles:

| Nivel | Contenido | Cuándo se carga |
|-------|-----------|-----------------|
| 1 | `name` + `description` | Siempre visible para el agente |
| 2 | Cuerpo de `SKILL.md` | Solo cuando el skill se invoca |
| 3 | Archivos de referencia en `references/` | Solo cuando el cuerpo los referencia |

Mantener `SKILL.md` por debajo de 500 líneas (ver «Criterios de calidad»). Si el contenido crece, mover el detalle a `references/` y referenciarlo desde el cuerpo, indicando claramente cuándo leer cada archivo.

### Plantilla de *skill*

```markdown
---
name: nombre-del-skill
description: >
  Qué hace el skill (operaciones específicas).
  Usar cuando [condiciones de activación].
---

# Título del skill

Una frase que defina qué hace el skill.

## Cuándo usar

- [Condición 1]
- [Condición 2]

## Cuándo no usar

- [Límite 1]
- [Límite 2, con referencia a skills relacionados]

## Entrada

- [Qué recibe el skill]

## Salida

- [Qué devuelve el skill]

## Principios rectores

[Si el skill aplica principios de juicio, listarlos aquí.]

## Procedimiento

1. [Paso 1, con justificación]
2. [Paso 2]
3. [Paso N]

## Formato de salida

[Plantilla o descripción del formato de salida, si aplica.]
```

## Principios para *skills* agnósticos al arnés

### 1. Separar sustancia de mecánica

El contenido sustantivo del skill (principios, procedimiento, criterios) debe ser independiente del arnés. La mecánica (ubicación del archivo, campos de *frontmatter*, nombres de herramientas) es lo único que varía entre arneses.

Escribir el cuerpo como instrucciones puras, sin referencias a herramientas específicas. Si se necesita mencionar una herramienta, hacerlo en términos genéricos («lee el archivo», «busca en el repositorio») en lugar de nombrar la herramienta concreta (`read`, `grep`). En `allowed-tools`, los nombres básicos (`read`, `grep`, `glob`, `edit`, `exec`) son los definidos por el estándar; evitar nombres específicos de un arnés que no tengan equivalente claro.

### 2. Usar el estándar

Usar `.agents/skills/` como ubicación y solo los campos del estándar (`name`, `description`, y opcionalmente `license`, `compatibility`, `metadata`, `allowed-tools`). El *frontmatter* mínimo válido es `name` + `description`. Añadir `allowed-tools` solo si es necesario restringir herramientas por seguridad.

### 3. No depender de capacidades del arnés

El skill no debe asumir que el agente puede invocar otros skills, lanzar subagentes o usar herramientas MCP específicas. Si el procedimiento requiere una capacidad avanzada, documentarla como requisito opcional, no como paso obligatorio.

## Diseño del contenido

### Descripción efectiva

La `description` es el único campo que el agente ve antes de decidir invocar el skill. Debe:

- **Incluir qué hace** el skill (operaciones específicas).
- **Incluir cuándo usarlo** (condiciones de activación).
- **Mencionar sinónimos** o formas alternativas de referirse a la tarea.
- **Ser específica**, no genérica.
- **Máximo 1024 caracteres.**

### Instrucciones imperativas y con justificación

- Usar voz imperativa: «Lee el texto», no «Deberías leer el texto».
- Explicar el *porqué* antes del *qué*: el agente sigue mejor el razonamiento que las órdenes.
- Ser concreto: rutas de archivo, nombres de comandos, ejemplos específicos.

### Grados de libertad

Definir el contrato (resultado esperado, invariantes, criterios de finalización) y dejar que el agente elija el camino dentro de él. Prescribir una secuencia exacta solo cuando:

- El orden es crítico para la seguridad.
- Un paso es prerrequisito del siguiente.
- Una secuencia determinista es la interfaz más simple.

### Ejemplos

Incluir ejemplos de salida buena y mala. El agente aprende mejor de ejemplos concretos que de descripciones abstractas.

## Criterios de calidad

Un skill de calidad cumple:

1. **Autosuficiencia:** el agente puede ejecutarlo sin información externa no referenciada.
2. **Límites claros:** «Cuándo usar» y «Cuándo no usar» son explícitos.
3. **Entrada y salida definidas:** el agente sabe qué recibe y qué debe devolver.
4. **Procedimiento reproducible:** los pasos son suficientes para llegar al resultado.
5. **Criterios de finalización:** el agente sabe cuándo está listo.
6. **Concisión:** el cuerpo de `SKILL.md` no excede 500 líneas.
7. **Descripción efectiva:** permite al agente descubrir el skill cuando es relevante.
8. **Portabilidad:** usa solo campos del estándar y no depende de capacidades específicas de un arnés.
9. **Mantenibilidad:** el contenido detallado vive en `references/`, no en el cuerpo.
10. **Validación:** se ha probado con invocación real y se ha iterado.

## Mantenimiento

### Versionado

Para skills en control de versiones (git), el historial de git es suficiente: rastrea cambios, autoría y fechas. No se necesita un campo `version` en el *frontmatter*.

Un campo `version` dentro de `metadata` solo es útil si el skill se distribuye fuera de control de versiones (descarga directa, gestor de paquetes). En ese caso, incluirlo así:

```yaml
metadata:
  version: "1.0"
```

### Revisión periódica

- Probar el skill después de cambios en el arnés o en el modelo.
- Aplicar el skill sobre sí mismo (autorrevisión) para detectar inconsistencias.
- Actualizar las referencias cuando las fuentes de autoridad cambien.

### Evolución del contenido

- Si el skill supera el umbral de 500 líneas, dividirlo.
- Si dos skills solapan, separar los límites o fusionarlos.
- Si un skill deja de usarse, archivarlo o eliminarlo.

## Lecciones de experiencia

### Lo que funciona

- **Separación de dominios:** definir skills complementarios con límites claros (estilo frente a mecánica) evita ambigüedad en la invocación.
- **Principios rectores explícitos:** nombrar los principios y mapearlos a niveles de revisión da al agente criterios de juicio consistentes.
- **Procedimiento ordenado:** los pasos secuenciales reducen la variabilidad entre invocaciones.
- **Formato de salida definido:** una plantilla de informe garantiza salidas comparables.
- **Autorrevisión:** aplicar los skills sobre sus propios archivos reveló inconsistencias que la redacción inicial no detectó.

### Lo que conviene mejorar

- **Estructura formal:** los skills que no siguen el formato `SKILL.md` con *frontmatter* carecen de `name` y `description`, lo que impide que el agente los descubra y los invoque autónomamente.
- **División progresiva:** un skill con todo el contenido en un solo archivo se beneficia de mover el detalle a `references/` para mantener el cuerpo conciso.
- **Portabilidad:** las referencias a archivos por ruta asumen una estructura de repositorio específica. Un skill portable debería referenciar por nombre, no por ruta.
- **Validación de finalización:** falta un criterio explícito de «cuándo el skill ha terminado su trabajo».

## Referencias

- Agent Skills Specification — agentskills.io/specification
- Agent Skills GitHub — github.com/agentskills/agentskills
- Microsoft Agent Framework — Agent Skills documentation
- Claude — Agent Skills Best Practices
