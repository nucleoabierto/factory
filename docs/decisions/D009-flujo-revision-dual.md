# D009: Flujo de revisión dual: subagente + usuario

## Estado

Sustituida por D034

## Contexto

El skill `ejecutar-tareas` marcaba una tarea como completada cuando el agente terminaba de ejecutarla, sin un paso de revisión intermedio. El agente que ejecuta es el mismo que decide que está completa. Esto presenta el problema estructural del sesgo de autoaprobación: el agente que escribió el código tiende a confirmar en lugar de reevaluar.

## Decisión

Mantenemos un flujo de revisión dual: un subagente independiente hace la revisión técnica con contexto aislado (ve el diff y los criterios de calidad, no el razonamiento del ejecutor) y el usuario hace la aprobación final. La tarea pasa por un estado intermedio `[r]` (en revisión) antes de marcarse como completada `[x]`.

## Justificación

El sesgo de autoaprobación está documentado en la investigación sobre revisión de código por LLMs y es estructural: no se resuelve con un mejor prompt, sino con separación de contextos. El subagente aporta verificación técnica objetiva; el usuario aporta juicio humano sobre intención, alineación con la visión del proyecto y decisiones de diseño. La combinación de ambos filtros equilibra calidad, seguridad y coste para este proyecto. La investigación en `docs/research/flujo-revision-tareas.md` documentó y justificó esta elección.

## Referencias

- Sustituida por `docs/decisions/D034-aprobacion-via-pr-con-dos-puertas.md`
