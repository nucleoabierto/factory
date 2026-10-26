# Reglas de la idea persistida

Reglas del artefacto «idea persistida»: los archivos del directorio de ideas que alimentan el flujo de idea a tarea. Hogar: `actualizar-artefactos`; lo consume también `consultar-artefactos` por referencia cruzada —`../actualizar-artefactos/references/idea.md`—.

## Ubicación y literales

- Un archivo por idea en `docs/ideas/`, nombrado `NNN-slug.md` —la serie `NNN` es la de `series.md`—.
- Los literales llevan los valores por defecto de la convención; un proyecto que difiere los edita aquí.

## Formato del artefacto

Un documento Markdown con título `# `, una cabecera de líneas de cita —toda línea que empieza por `>`, como `> **Fecha:**` u `> **Orden sugerido:** <n>`— y secciones `## ` con el enunciado del problema. La idea procesada se distingue por la marca `> **Procesada en:** ` seguida del destino —la referencia del artefacto que la consumió, como la propuesta—.

## Operaciones de lectura

Directorio ausente: fallo. Sin resultados: vacío legítimo.

### `pendientes`

`orden<TAB>archivo<TAB>título` por cada `*.md` del directorio que **no** menciona `> **Procesada en:**`: `orden` es el número de su campo `**Orden sugerido:**`, `archivo` la ruta del archivo y `título` su primer `# `. Las líneas salen ordenadas por `orden` numérico; las ideas sin orden van al final con el primer campo vacío.

## Operaciones de escritura

### `procesada <destino>`

Añade la línea `> **Procesada en:** <destino>` tras la última línea que empieza por `>` de la cabecera —antes de la primera sección `## `—. Idea ya marcada o cabecera sin líneas `>`: fallo sin escribir.
