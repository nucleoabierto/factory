# Formalizar skill ejecutar-tareas

## Estado

[x] Completada

## Objetivo

Transformar `PROMPT.txt` en un skill formal bajo `.agents/skills/ejecutar-tareas/SKILL.md` que describa el ciclo de ejecución de tareas del proyecto, y eliminar `PROMPT.txt`.

## Dependencias

- Ninguna

## Entrada

- `PROMPT.txt`
- `docs/research/skills-best-practices.md`
- Skills existentes en `.agents/skills/` como referencia de estilo

## Resultado esperado

- `SKILL.md` con frontmatter (`name`, `description`) y cuerpo con: qué hace, cuándo usar, cuándo no usar, entrada, salida, principios rectores, procedimiento, formato de salida.
- Ubicación `.agents/skills/` (estándar).
- Solo campos del estándar en el frontmatter.
- Cuerpo por debajo de 500 líneas.
- `PROMPT.txt` eliminado.
- Entrada añadida a `TODO.txt`.

## Criterios de calidad

- Sigue el estándar Agent Skills y la plantilla de `docs/research/skills-best-practices.md`.
- Autosuficiente: el agente puede ejecutarlo sin información externa no referenciada.
- Límites claros: «Cuándo usar» y «Cuándo no usar» explícitos.
- Entrada y salida definidas.
- Procedimiento reproducible y ordenado.
- Criterios de finalización explícitos.
- Descripción efectiva: incluye qué hace, cuándo usarlo y sinónimos.
- Instrucciones imperativas con justificación.
- Portabilidad: no depende de capacidades específicas de un arnés.
- Pasa revisión de redacción y pulido mecánico secuencialmente.

## Procedimiento sugerido

1. Redactar `SKILL.md` siguiendo la plantilla.
2. Aplicar revisión de redacción y pulido mecánico.
3. Eliminar `PROMPT.txt`.
4. Presentar al usuario para aprobación.

## Notas

- El skill debe reflejar fielmente el ciclo descrito en `PROMPT.txt`, adaptándolo al formato formal del estándar.
