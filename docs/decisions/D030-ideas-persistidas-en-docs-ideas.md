# D030: Las ideas se persisten en `docs/ideas/` como entrada del flujo

## Estado

Aceptada

## Contexto

El flujo de idea a tarea arrancaba solo desde una idea suelta en conversación: una descripción rica desde el inicio se procesaba como una sola idea y se perdía la descomposición temprana en líneas de trabajo distinguibles. Hacía falta un artefacto que conservara las ideas —una o varias— entre la conversación exploratoria y el inicio del flujo.

## Decisión

Las ideas viven en `docs/ideas/NNN-slug.md` del proyecto evaluado, un archivo por idea escrito por `lluvia-de-ideas` con el formato declarado en su `references/formato-idea.md`. El archivo es entrada persistida del flujo, no parte de él: `idea-a-tarea` las consume presentando la siguiente sin procesar —según el «Orden sugerido» de las cabeceras del mismo origen, o la serie si no lo hay— y marca la consumida con `Procesada en: docs/proposals/NNN-slug/` en su propia cabecera, sin índice adicional.

## Justificación

El archivo por idea conserva la descomposición temprana que la conversación producía y se perdía, y convierte la idea en artefacto revisable y aparcable: puede entrar al flujo en otra sesión y en el orden acordado. La marca en la propia cabecera evita un índice nuevo —el estado de procesamiento viaja con el artefacto— y la equivalencia «Qué desbloquea» = «Oportunidad» deja el archivo alineado con la entrada que `descubrir-problema` espera sin duplicar su trabajo.

## Referencias

- `docs/tasks/101-skill-lluvia-de-ideas.md` — tarea que la consolida
- `.agents/skills/lluvia-de-ideas/SKILL.md` — el skill que produce los archivos
- `docs/domains/002-flujo-idea-a-tarea.md` — dominio donde vive el artefacto
