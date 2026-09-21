# Registrar la decisión de la épica como artefacto

## Objetivo

Fijar en una decisión de diseño el formato y la ubicación de la épica, su relación con propuestas, tareas e hitos del índice, y el lugar del paso de planeación en el flujo.

## Dependencias

- Borrador 01

## Entrada

- La investigación producida por el borrador 01 en `docs/research/`.
- `docs/decisions/` y la plantilla del skill `decisiones-diseno`.
- `TODO.txt` y `docs/decisions/D008-organizacion-por-hitos-en-todo.md` como estado actual de la agrupación por hitos.

## Resultado esperado

- Una decisión `DNNN` en `docs/decisions/` que documente:
  - Qué es una épica en este sistema, dónde vive y qué campos tiene.
  - Cómo se enlaza con las tareas que agrupa y con el hito correspondiente del índice.
  - En qué momento del flujo se produce la épica y el plan técnico.
  - Si la decisión sustituye o extiende D008, según el mecanismo del formato de decisiones.

## Criterios de calidad

- La decisión sigue el formato híbrido del proyecto (contexto, decisión, justificación, estado).
- Responde explícitamente cómo una épica agrupa tareas ya existentes, no solo futuras.
- Deja clara la relación entre la épica y el encabezado de hito en `TODO.txt`, sin ambigüedad sobre cuál es la fuente de verdad de cada cosa.

## Procedimiento sugerido

1. Leer la investigación del borrador 01 y extraer la recomendación.
2. Invocar `decisiones-diseno` con el contexto y la decisión.
3. Verificar que la decisión no contradice D008 o que la sustituye explícitamente.
