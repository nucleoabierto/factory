# Delegar la ejecución de implementación a subagentes

## Estado

[ ] Pendiente | [~] En progreso | [r] En revisión | **[x] Completada** | [!] Bloqueada

## Tipo

mantenimiento

## Objetivo

El skill `ejecutar-implementacion` describe hoy una ejecución en la que el agente principal aplica la totalidad de los cambios. La tarea ajusta el skill —y sus parámetros de delegación— para que la implementación se ejecute en subagentes con el agente principal como orquestador: qué se delega —bloques del plan, trabajo paralelizable—, con qué contexto arranca cada subagente, cómo se recupera el diff producido y cómo se verifica el resultado contra la suite esperada.

## Dependencias

- Ninguna

## Entrada

- `.agents/skills/ejecutar-implementacion/SKILL.md` actual.
- El comportamiento de subagentes del arnés: perfiles, ejecución en primer plano y en segundo plano, paralelismo.

## Resultado esperado

- `.agents/skills/ejecutar-implementacion/SKILL.md` actualizado: la delegación a subagentes como comportamiento por defecto de la ejecución, con los criterios de qué se delega y qué no, el contrato de contexto mínimo del subagente y la verificación del diff.

## Criterios de calidad

- La prosa declara la delegación como comportamiento por defecto, no como excepción.
- Define el contexto mínimo que recibe el subagente —tarea, plan, suite esperada, convenciones— sin arrastrar el razonamiento del orquestador.
- Define cómo se recupera y verifica el diff del subagente.
- Coherente con `ejecutar-tareas` y `revisar-implementacion`: no contradice el ciclo de tareas ni la revisión dual.

## Procedimiento sugerido

1. Releer el skill y el ciclo de tareas completo para mapear los puntos de delegación.
2. Redactar la delegación con revisión de redacción y pulido mecánico preventivos.
3. Verificar la coherencia con los skills hermanos del ciclo.

## Notas

- Ninguna

## Desviaciones del plan

- El criterio pedía definir cómo se recupera el diff del subagente; la lección «Contratos de skills» ya fija que el retorno es la explicación más los archivos tocados y que la verificación decide entre revisar —diff reconstruido con git— o confiar. Se implementó la lección, no la redacción literal del criterio.

## Revisión

- Subagente: 2026-10-04 — Aprueba (revisión acotada; observaciones menores de suite, convenciones en handoff y prosa corregidas)
- Usuario: 2026-10-04 — Aprueba
