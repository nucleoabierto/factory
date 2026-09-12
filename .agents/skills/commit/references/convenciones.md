# Convenciones de commit

## Conventional Commits

Especificación que añade estructura legible por humanos y máquinas a los mensajes de commit. Se integra con SemVer: los tipos `feat` y `fix` corresponden a versiones MINOR y PATCH.

### Formato

```
<tipo>[ámbito opcional]: <descripción>

[cuerpo opcional]

[nota de pie opcional]
```

### Tipos

- **`feat`**: introduce una nueva funcionalidad (corresponde a MINOR en SemVer).
- **`fix`**: corrige un error (corresponde a PATCH en SemVer).
- **`docs`**: cambios en documentación.
- **`style`**: cambios de formato que no afectan la lógica (espacios, sangría, punto y coma).
- **`refactor`**: refactorización del código sin cambiar funcionalidad ni corregir errores.
- **`perf`**: mejora del rendimiento.
- **`test`**: añade o corrige pruebas.
- **`build`**: cambios en el sistema de construcción o dependencias.
- **`ci`**: cambios en configuración de integración continua.
- **`chore`**: tareas de mantenimiento que no encajan en los anteriores.

### Ámbito

Opcional. Contextualiza el cambio a un área del código: `feat(parser): añade soporte para arrays`.

### Cambios que rompen compatibilidad

Señalar con `!` después del tipo/ámbito o con una nota de pie `BREAKING CHANGE:`.

## Casos especiales

- **Fixes:** referenciar el issue o bug que se corrige (`Fixes #123`).
- **Reverts:** el mensaje generado por `git revert` suele bastar; añadir contexto si el revert no es obvio.
- **Merges:** el mensaje generado por `git merge` suele bastar; añadir contexto si el merge resuelve un conflicto no trivial.
- **Squash:** al hacer squash de una rama, escribir un mensaje nuevo que sintetice el cambio completo, no acumular los mensajes individuales.

## Detección de convenciones del proyecto

Antes de commitear, examinar el historial reciente con `git log --oneline -20` para identificar:

- Uso de Conventional Commits (prefijos `feat:`, `fix:`, etc.).
- Tipos permitidos más allá de `feat` y `fix`.
- Prefijos de ámbito (`feat(parser):`).
- Referencias a issues (`Fixes #123`, `Closes #456`).
- Firmas (`Signed-off-by`, `Co-authored-by`).
- Idioma del mensaje (inglés o español).

**Prioridad:**

1. Si el usuario indica una convención explícita, seguirla.
2. Si el historial muestra convenciones consistentes, seguirlas.
3. Si no hay convenciones claras o es el primer commit, aplicar las siete reglas universales sin Conventional Commits. No inventar convenciones.

## Asuntos autodescriptivos

El asunto describe el tema concreto del cambio en términos que cualquier lector del historial entiende sin conocer la estructura interna del proyecto. La numeración interna —hitos, tareas, flujos numerados— es información de gestión, no de contenido: no pertenece al asunto como información principal.

### Criterios

- **No usar numeración interna como información principal.** Referencias como «tareas 032 y 033», «Hito 4» o «flujo 1» exigen conocer la organización del proyecto para entender de qué trata el cambio.
- **Describir el tema del cambio, no la agrupación administrativa.** El asunto responde a «¿qué tema tiene este cambio?», no a «¿en qué grupo de tareas encaja?».
- **Usar términos concretos que no requieran contexto del proyecto.** Si el cambio añade tareas para un flujo de descubrimiento de problemas, el asunto menciona «flujo de descubrimiento», no «Hito 4» ni «flujo 1».
- **La numeración interna puede ir en el cuerpo** si aporta trazabilidad, pero no como información principal del asunto.
- **Mantener el límite de 50 caracteres.** Si el asunto autodescriptivo excede el límite, priorizar la claridad del tema sobre el detalle y mover el detalle al cuerpo.

### Ejemplo malo

```text
chore: añade tareas del Hito 4 (flujo 1)
```

Por qué es malo: «Hito 4» y «flujo 1» son referencias internas. Un lector del historial que no conozca la organización del proyecto no sabe de qué trata el cambio.

### Ejemplo bueno

```text
chore: añade tareas del flujo de descubrimiento
```

Por qué es bueno: «flujo de descubrimiento» describe el tema del cambio en términos concretos. Cualquier lector del historial entiende de qué trata sin conocer la estructura del proyecto.

## El qué y el porqué, no el contenido

El cuerpo del commit explica el *qué* y el *porqué* del cambio, no el contenido. El *qué* es la decisión o acción que se tomó; el *porqué* es la motivación. El contenido —archivos modificados, secciones creadas, detalle técnico— es visible en el diff y no debe repetirse en el cuerpo.

### Ejemplo malo

```text
feat: añade skill de decisiones de diseño

Crea el skill decisiones-diseno bajo .agents/skills/, con el
cuerpo enfocado en el flujo (cuándo usar, entrada, salida,
principios, procedimiento) y dos archivos de referencia: la
definición de qué es una decisión de diseño y el formato con
plantilla, reglas y ejemplo.
```

Por qué es malo: el cuerpo describe el contenido (qué archivos se crearon, qué secciones tienen). El diff ya muestra todo eso. No aporta contexto ni motivación.

### Ejemplo bueno

```text
feat: añade skill de decisiones de diseño

El proyecto necesitaba un mecanismo para registrar decisiones
de diseño que dé forma a su estructura. Se adopta un formato
híbrido: más ligero que el ADR canónico, con numeración
secuencial y estado explícito que permite sustituir decisiones
sin perder el historial.
```

Por qué es bueno: el cuerpo explica *qué* se decidió (formato híbrido) y *porqué* (el proyecto necesitaba registrar decisiones). No describe el contenido del cambio.