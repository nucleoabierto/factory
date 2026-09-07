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
