# Delegación mecánica a scripts: decisión y contrato

## Estado

**[ ] Pendiente** | [~] En progreso | [r] En revisión | [x] Completada | [!] Bloqueada

## Tipo

mantenimiento

## Objetivo

Establecer el mecanismo por el que los skills delegan sus pasos mecánicos a scripts: la revisión de los flujos detectó una treintena de pasos deterministas repetidos (mutaciones de `TODO.txt`, campos de los archivos de tarea, índices de decisiones y lecciones, `EXPERIENCIAS.md`, `CHANGELOG.md`), pero también que los formatos tienen derivas que un parser debe resolver —tres convenciones conviviendo en `## Estado` y posición divergente de `## Desviaciones del plan`—. La tarea fija la decisión de diseño, el contrato de los scripts y la canonicalización de los formatos, para que las tareas 114-117 creen los skills de utilidad sobre una base única.

## Dependencias

- Ninguna.

## Entrada

- Los informes de la revisión de pasos mecánicos (esta sesión): qué pasos son deterministas y cuáles los resuelve el arnés (`read`, `grep`, `git`) sin delegación.
- D003 y D004 (skills autocontenidos, estándar Agent Skills) — la tensión con la compartición de scripts que la decisión debe resolver.
- La lección `contratos-de-skills` (capacidad, no mecánica) y `diseno-de-artefactos` (artefactos genéricos).
- Las derivas observadas: convenciones de `## Estado` en `docs/tasks/` del repo y de los proyectos evaluados; posición de `## Desviaciones del plan`.

## Resultado esperado

- Una decisión registrada con `decisiones-diseno` que fije: los pasos mecánicos compartidos por varios skills se encapsulan en skills de utilidad invocables que reciben la orden delegada (archivo objetivo, operación, términos) y la ejecutan mediante scripts bash propios en su `assets/`; la mecánica de un solo consumidor vive como script interno de su skill; la lectura simple que el arnés ya resuelve no se delega.
- El contrato de los scripts: entrada por argumentos o stdin, stdout reservado a datos parseables, stderr a diagnósticos, código `0` para éxito (incluido el vacío legítimo), `2` para entrada ausente, sin datos sintetizados jamás.
- La forma canónica de `## Estado` fijada en `crear-tareas/assets/task.txt` y la posición oficial de `## Desviaciones del plan` (antes de `## Revisión`), documentadas en la decisión; los parsers de las tareas siguientes toleran las variantes existentes y escriben la canónica.

## Criterios de calidad

- La decisión queda registrada en `docs/decisions/` siguiendo el formato del proyecto y referencia la evidencia de las derivas.
- El contrato de scripts queda escrito donde los skills de utilidad lo puedan referenciar (references compartidas del propio modelo o en la decisión).
- La canonicalización no reescribe archivos históricos: aplica hacia adelante, como D028.

## Procedimiento sugerido

1. Sintetizar la lista de pasos mecánicos confirmados y los resueltos por el arnés.
2. Redactar y registrar la decisión con `decisiones-diseno`, incluyendo la regla de delegación, la ubicación de scripts en `assets/` del skill de utilidad y el contrato de salida.
3. Fijar la forma canónica en `crear-tareas/assets/task.txt` y documentar la tolerancia de los parsers.

## Notas

- Los scripts se escriben en bash (grep/awk/sed): los formatos son orientados a líneas y no requieren más; si alguno creciera en complejidad, es una desviación a registrar.
- Las tareas 114-117 materializan los skills de utilidad; esta tarea no crea skills.

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario: [fecha] — [Aprueba | Solicita cambios]
