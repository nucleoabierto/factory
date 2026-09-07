# D005: División progresiva con references/

## Estado

Aceptada

## Contexto

Los skills iniciales (`revisar-redaccion.md`, `pulir-escritura.md`) tenían todo el contenido en un solo archivo. A medida que crecían, el cuerpo del skill se volvía largo y mezclaba instrucciones de ejecución con material de referencia detallado (principios, categorías, reglas de formato).

## Decisión

Mantenemos el cuerpo de `SKILL.md` por debajo de 500 líneas y movemos el material de referencia detallado a `references/`. El cuerpo referencia cada archivo de referencia indicando cuándo cargarlo. El agente carga el cuerpo al invocar el skill y las referencias solo cuando el cuerpo las indica.

## Justificación

La división progresiva reduce la carga contextual: el agente no necesita cargar las reglas de formato Markdown cada vez que pule un texto, solo cuando el cuerpo del skill las referencia. Mantiene los skills mantenibles: el detalle vive en archivos pequeños y enfocados, no en un monolito. Es el patrón recomendado por el estándar Agent Skills y por la investigación del proyecto en `docs/research/skills-best-practices.md`.
