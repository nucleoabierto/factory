# Consumir la orientación generativa en aplicar-guia-estilo

## Estado

[ ] Pendiente | [~] En progreso | [r] En revisión | **[x] Completada** | [!] Bloqueada

## Tipo

mantenimiento

## Objetivo

La guía de estilo mejorada (tarea 126) añadió la capa de orientación generativa —cómo derivar el estilo de un componente o pantalla que la guía aún no describe— y el contrato de experiencia: las garantías de comportamiento transversales, cada una con su comprobación. El skill `aplicar-guia-estilo` hoy eleva como laguna todo lo que la guía no cubre y solo valida valores visuales; con las capas nuevas, debe derivar primero con los principios y la orientación —e informar qué derivó—, elevar como laguna solo lo que ni la guía ni la orientación resuelven, y validar también el contrato de experiencia: las garantías de comportamiento con sus comprobaciones, junto a la mitad visual.

## Dependencias

- Tarea 126 (`docs/tasks/126-fundamentar-guia-estilo.md`): produce la capa de orientación y el contrato de experiencia que este skill consumirá.

## Entrada

- `.agents/skills/aplicar-guia-estilo/SKILL.md` actual.
- La capa de orientación generativa documentada en `references/formato-design-md.md` y en las guías que la aplican.

## Resultado esperado

- `.agents/skills/aplicar-guia-estilo/SKILL.md` actualizado: ante un componente o decisión que la guía no describe, derivar el estilo con la orientación generativa y los principios, informar qué se derivó y por qué, y elevar como laguna solo lo que ni la guía ni la orientación resuelven.

## Criterios de calidad

- La derivación se informa, nunca es silenciosa: qué se decidió, qué principio lo arbitra.
- La laguna sigue siendo el camino para los valores que faltan —la orientación no inventa tokens—.
- Coherente con el principio «La guía manda, el brief puede mandar más» vigente en el skill.

## Procedimiento sugerido

1. Releer el skill y la capa de orientación de la guía.
2. Ajustar el paso de escritura y el de lagunas con revisión de redacción y pulido preventivos.

## Notas

- Tarea descubierta durante la ejecución de la 126, registrada según su Nota.

## Revisión

- Subagente: 2026-10-04 — Aprueba (revisión acotada; observaciones menores de título literal y Finalización corregidas)
- Usuario: 2026-10-04 — Aprueba
