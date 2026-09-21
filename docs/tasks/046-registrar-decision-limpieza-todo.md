# Registrar decisión de limpieza de TODO.txt

## Estado

[ ] Pendiente

## Objetivo

Registrar la decisión de diseño que convierte `TODO.txt` en índice de trabajo activo: los hitos completados se eliminan del índice en lugar de archivarse, porque la trazabilidad ya vive en git y en los archivos de `docs/tasks/`.

## Dependencias

- Ninguna

## Entrada

- `TODO.txt` y el comentario de formato que declara la agrupación por hitos.
- Decisiones D001, D008 y D015, que esta decisión extiende o precisa.
- Decisión del usuario: la limpieza se revisa cuando `TODO.txt` supera 100 líneas, además de poder hacerse on demand.

## Resultado esperado

- Una decisión de diseño `D017` en `docs/decisions/` que establece: `TODO.txt` indexa solo trabajo activo (pendiente, en progreso, en revisión, bloqueado, propuestas `[p]`); los hitos completados se eliminan del índice; la limpieza se revisa cuando el archivo supera 100 líneas y puede ejecutarse on demand; la trazabilidad se preserva en git y `docs/tasks/`.

## Criterios de calidad

- La decisión sigue el formato del skill `decisiones-diseno` (contexto, decisión, justificación, referencias).
- Declara explícitamente el umbral de 100 líneas como disparador de revisión de limpieza.
- Explica por qué se elimina en lugar de archivar (git y los archivos de tarea ya preservan la evidencia; un archivo de archivo crecería sin fin).
- Referencia las decisiones que extiende (D001, D008, D015).
- Pasa revisión técnica por subagente independiente.

## Procedimiento sugerido

1. Leer D001, D008 y D015 para situar la decisión.
2. Invocar el skill `decisiones-diseno` y redactar D017.
3. Someter a revisión dual.

## Notas

- La ejecución de la limpieza es otra tarea (048); esta solo registra la decisión.

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario: [fecha] — [Aprueba | Solicita cambios]
