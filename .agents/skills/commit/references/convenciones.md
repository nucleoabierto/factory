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
