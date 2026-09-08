# Construir capacidad de refinamiento con borradores

## Objetivo

Construir la capacidad que, dado el problema y la forma de solución, crea la propuesta con los borradores de las tareas y los envía a revisión asíncrona. Es la tercera fase del flujo 1.

## Dependencias

- 035 (Registrar decisiones de diseño del flujo 1)

## Entrada

- Problema + forma de solución + alternativas + fuera de alcance, salidas de las capacidades anteriores.
- Investigación 032 en `docs/research/2026-09-flujo-1-propuesta-borradores.md`.
- Decisiones de diseño D012-D015.
- Skill `investigar`.

## Resultado esperado

- Un skill que crea el directorio `docs/proposals/NNN-slug/` con `propuesta.md` (problema, forma de solución, alternativas, fuera de alcance, investigaciones) en estado `[ ]` Borrador.
- Crea los borradores como archivos independientes `MM-titulo.md` de forma progresiva, uno a uno, iterando cada uno antes de pasar al siguiente.
- Invoca `investigar` cuando el refinamiento requiera evidencia externa.
- Actualiza el índice de borradores en `propuesta.md` a medida que los añade.
- Al terminar, cambia el estado a `[p]` Pendiente de revisión y añade la línea a la sección de propuestas de `TODO.txt`.
- Se detiene: la puerta humana asíncrona está activa.

## Criterios de calidad

- `propuesta.md` sigue la plantilla de la investigación 032.
- Los borradores usan los mismos campos que la plantilla de tarea definitiva, sin Estado ni Revisión.
- Los borradores se crean de forma progresiva, no todos a la vez.
- El estado se refleja correctamente en `TODO.txt` con el marcador `[p]`.
- Sigue el estándar de skills del proyecto.
- Pasa revisión técnica por subagente independiente.

## Procedimiento sugerido

1. Definir el nombre y la estructura del skill.
2. Escribir el `SKILL.md` con el procedimiento de refinamiento.
3. Probar la creación de una propuesta con borradores usando el propio sistema (principio bootstrap).
4. Someter a revisión dual.

## Notas

- Esta capacidad define el formato final de los borradores. La tarea 039 (extender `crear-tareas`) depende de esta, porque la promoción necesita conocer el formato de borrador que esta capacidad produce.

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario: [fecha] — [Aprueba | Solicita cambios]
