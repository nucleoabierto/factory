# Catálogo autodescriptivo y frontera mecánica en los skills de utilidad

## Estado

[ ] Pendiente | [~] En progreso | [r] En revisión | [x] Completada | [!] Bloqueada

## Tipo

mantenimiento (refactoring)

## Objetivo

Hacer que `consultar-artefactos` y `actualizar-artefactos` publiquen su catálogo completo con la firma exacta de cada operación —script, argumentos, orden, forma de la salida—, de modo que el invocador acierte la llamada sin descubrir el `uso:` por prueba y error. En la misma pasada, re-evaluar qué acciones merecen ser script: solo las realmente mecánicas —deterministas, sin juicio— se ejecutan por script; las demás las realiza el agente guiado por el skill.

## Dependencias

- Tarea 116 (`docs/tasks/116-skill-operar-experiencias.md`) y tarea 117 (`docs/tasks/117-skill-operar-changelog.md`): los skills de utilidad que crean entran en el alcance de esta tarea —el catálogo autodescriptivo y la frontera mecánica se verifican sobre todos los skills de utilidad, no solo los dos existentes—; al nacer ya alineados, la tarea los incorpora en lugar de rehacerlos.

## Entrada

- `.agents/skills/consultar-artefactos/` y `.agents/skills/actualizar-artefactos/` con sus scripts en `assets/`, más los skills de utilidad que 116 y 117 hayan creado.
- El inventario de operaciones invocadas por los consumidores (levantado en la revisión de la épica 003): todas las operaciones del `uso:` de cada script, su consumidor y su línea de uso.
- La frontera declarada por la épica 003: «cualquier paso con juicio —veredictos de sensores, redacción de contenido, elección de palabras clave, puertas humanas—» queda fuera de los scripts.

## Resultado esperado

- Los SKILL.md de todos los skills de utilidad documentan cada operación con su firma exacta y la forma de su salida, verificable contra el `uso:` del script.
- Un veredicto por operación —mecánica o no— con su justificación, sustentado en pruebas de escenarios; las operaciones reclasificadas como no mecánicas salen de los scripts y pasan a guiarse por el skill.
- El catálogo registra el estado de cobertura: operaciones sin consumidor (hoy `por-estado`, `siguiente-hito`) y artefactos del ciclo aún sin operación delegada.

## Criterios de calidad

- Cada operación del catálogo tiene firma declarada que coincide con el `uso:` real del script.
- Toda invocación existente en los consumidores resuelve contra el catálogo sin ambigüedad.
- La clasificación mecánica/no mecánica está probada por escenarios —no solo razonada—: casos representativos ejecutados de verdad, incluidos formatos degenerados o inesperados.
- Ninguna acción con juicio permanece dentro de un script; ninguna acción determinista queda delegada al agente sin script.

## Procedimiento sugerido

1. Publicar el catálogo con firmas en ambos skills y verificarlo contra el `uso:` de cada script.
2. Construir una batería de escenarios por operación —formato canónico, variantes históricas, formato degenerado— y ejecutarla: una operación es mecánica si sus escenarios se resuelven sin juicio.
3. Reclasificar las operaciones que los escenarios demuestren no mecánicas: el script se simplifica y el skill guía la acción.
4. Registrar en el catálogo la cobertura: operaciones sin consumidor y artefactos sin operación.

## Notas

- El inventario de la revisión de la épica 003 ya identificó dos operaciones sin consumidor —`por-estado` y `siguiente-hito`— y artefactos mutados a mano: `EXPERIENCIAS.md`, `CHANGELOG.md`, `ROADMAP.md`, los índices de decisions/lessons/domains y el `## Borradores` de `propuesta.md`. La cobertura nueva de esos artefactos no es objetivo de esta tarea —las piezas 116-117 de la épica ya la cubren—; solo su registro en el catálogo.

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario (ejecución): [fecha] — [Aprueba | Solicita cambios]
- Usuario (cierre): [fecha] — [Aprueba | Solicita cambios]
