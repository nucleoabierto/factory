# Mejores prácticas para mensajes de commit

## Propósito

Definir principios, convenciones y criterios de calidad para escribir mensajes de commit en Git. Servir de base para un skill de commits agnóstico al arnés.

## Por qué importan los mensajes de commit

El diff muestra *qué* cambió. El mensaje de commit explica *por qué*. En conjunto, el historial de commits es la herramienta principal para que quien mantiene el código entienda cómo y por qué cada línea llegó a su estado actual. Un buen mensaje responde a las preguntas que un revisor o un desarrollador futuro se haría al leer el cambio.

## Estructura de un mensaje de commit

```
<tipo>[ámbito opcional]: <asunto>

[Cuerpo opcional]

[Nota de pie opcional]
```

- **Asunto:** una línea que resume el cambio. Máximo 50 caracteres. Con mayúscula inicial. Sin punto final. En voz imperativa («Añade», no «Añadido» ni «Añadió»).
- **Línea en blanco** entre el asunto y el cuerpo. Sin ella, herramientas como `git rebase` pueden no reconocer la estructura.
- **Cuerpo:** explicación detallada si el asunto no basta. Envuelto a 72 caracteres. Explica el *porqué* del cambio, no el *qué* ni el *cómo* (el diff ya lo muestra).
- **Nota de pie:** referencias a issues, PRs, firmas (`Signed-off-by`), cambios que rompen compatibilidad (`BREAKING CHANGE:`).

## Las siete reglas

1. **Separar asunto y cuerpo con una línea en blanco.**
2. **Limitar el asunto a 50 caracteres.** Es un límite suave, pero mejora la legibilidad en `git log --oneline` y herramientas como `gitk`.
3. **Escribir el asunto con mayúscula inicial.**
4. **No terminar el asunto con punto.**
5. **Usar voz imperativa en el asunto.** «Añade validación de entrada», no «Añadió validación» ni «Añadido validación». Coincide con los mensajes que generan `git merge` y `git revert`.
6. **Envolver el cuerpo a 72 caracteres.** `git log` no envuelve automáticamente; con el paginador por defecto, 72 columnas dejan margen para sangría en terminales de 80.
7. **Usar el cuerpo para explicar el *porqué*, no el *qué* ni el *cómo*.** El diff muestra el *qué* y el *cómo*. El cuerpo explica la motivación, el problema que se resuelve y por qué esta solución es mejor que las alternativas.

## Conventional Commits

Conventional Commits es una especificación sencilla que añade estructura legible por humanos y máquinas a los mensajes de commit. Usa el mismo formato de la sección «Estructura», con la diferencia de que el *tipo* es obligatorio y se llama *descripción* al asunto. Se integra con SemVer: los tipos `feat` y `fix` corresponden a versiones MINOR y PATCH.

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

### Cuándo usar Conventional Commits

- En proyectos que quieren automatizar changelogs o versionado.
- En proyectos con muchas contribuidores que necesitan un formato uniforme.
- No es obligatorio: un proyecto puede adoptar las siete reglas sin Conventional Commits.

## Commits atómicos

Un commit atómico hace una sola cosa. Mezclar cambios no relacionados dificulta la revisión, el `git revert` y el `git bisect` (por ejemplo: una corrección de estilo, una nueva funcionalidad y una refactorización en un mismo commit).

- Un commit = un cambio lógico.
- Si el asunto necesita una conjunción («y»), considerar dividir en dos commits.
- Si el cambio toca archivos no relacionados, reconsiderar si pertenece al mismo commit.

## Contenido del cuerpo

- **Explicar el problema:** qué estaba mal antes del cambio.
- **Justificar la solución:** por qué este enfoque es mejor que las alternativas.
- **Mencionar efectos secundarios:** si el cambio tiene implicaciones para otras partes del sistema.
- **Evitar información obvia:** no repetir lo que el diff ya muestra.
- **Usar párrafos y listas:** para estructurar el cuerpo si es largo.

## Casos especiales

- **Fixes:** referenciar el issue o bug que se corrige (`Fixes #123`).
- **Reverts:** el mensaje generado por `git revert` suele bastar; añadir contexto si el revert no es obvio.
- **Merges:** el mensaje generado por `git merge` suele bastar; añadir contexto si el merge resuelve un conflicto no trivial.
- **Squash:** al hacer squash de una rama, escribir un mensaje nuevo que sintetice el cambio completo, no acumular los mensajes individuales.

## Convenciones del proyecto

Las siete reglas son universales y se aplican siempre. Más allá de ellas, cada proyecto puede tener convenciones propias: uso de Conventional Commits, tipos permitidos, prefijos de ámbito, referencias a issues, firmas, idioma del mensaje.

**Cómo proceder:**

1. **Detectar las convenciones existentes** antes de commitear. Examinar el historial reciente con `git log --oneline -20` para identificar el formato, los tipos y los prefijos que usa el proyecto.
2. **Seguir las convenciones detectadas** si son consistentes. Si el proyecto usa Conventional Commits, usar Conventional Commits. Si usa prefijos de ámbito, usarlos.
3. **Si no hay convenciones claras o es el primer commit**, aplicar las siete reglas universales sin Conventional Commits. No inventar convenciones.
4. **Si el usuario indica una convención explícita**, seguirla por encima de cualquier detección automática.

## Criterios de calidad

Un mensaje de commit de calidad cumple:

1. **Asunto claro:** resume el cambio en una línea, sin ambigüedad.
2. **Cuerpo justificativo:** explica el *porqué*, no repite el *qué*.
3. **Atomicidad:** el commit hace una sola cosa.
4. **Consistencia:** sigue el formato acordado del proyecto en todos los commits.
5. **Legibilidad:** envuelto a 72 caracteres, párrafos separados por líneas en blanco.
6. **Trazabilidad:** referencia issues, PRs o discusiones relevantes cuando proceda.
7. **Reversibilidad:** un commit atómico con un mensaje claro es fácil de revertir con `git revert`.

## Referencias

- Conventional Commits — conventionalcommits.org/en/v1.0.0/
- Tim Pope, «A Note About Git Commit Messages» — tbaggery.com
- Chris Beams, «How to Write a Git Commit Message» — cbea.ms/git-commit/
- Git documentation, `git-commit` — git-scm.com/docs/git-commit
- Linux kernel, «Submitting Patches» — kernel.org
- GitHub Blog, «Write Better Commits, Build Better Projects» — github.blog
