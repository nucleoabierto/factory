# Crear skill de investigación

## Estado

[ ] Pendiente

## Objetivo

Investigar mejores prácticas para investigaciones realizadas por agentes de IA y crear un skill `investigar` que encapsule el proceso de descubrimiento, análisis y documentación. El skill debe reflejar el patrón que ya usan las 7 investigaciones existentes en `docs/research/` y ser útil tanto para investigaciones técnicas (mejores prácticas, formatos, convenciones) como para investigaciones de flujos y procesos.

## Dependencias

- Ninguna

## Entrada

- Investigaciones existentes en `docs/research/` como referencia del patrón del proyecto.
- Skills existentes como referencia de formato y convenciones.
- Web search para consultar mejores prácticas sobre investigación por agentes de IA.

## Resultado esperado

- Investigación de mejores prácticas en `docs/research/investigacion-por-agentes.md`.
- Skill `investigar` bajo `.agents/skills/investigar/` con `SKILL.md` y `references/` según corresponda.

## Criterios de calidad

- El skill define cuándo usar, cuándo no usar, entrada, salida, principios, procedimiento y finalización.
- El procedimiento cubre: definición del alcance, búsqueda y recopilación, análisis, síntesis, documentación y presentación al usuario.
- El skill es autocontenido y portable (sigue el estándar Agent Skills, no asume capacidades específicas del arnés).
- El skill distingue entre investigación abierta (descubrimiento) e investigación dirigida (verificación de una hipótesis concreta).
- Incluye ejemplos de investigaciones buenas y malas, o referencias a las existentes en el proyecto.
- Pasa revisión de redacción y pulido mecánico.
- Pasa revisión técnica por subagente independiente.

## Procedimiento sugerido

1. Revisar las 7 investigaciones existentes en `docs/research/` para identificar el patrón del proyecto.
2. Investigar mejores prácticas sobre investigación por agentes de IA (web search).
3. Sintetizar los hallazgos en `docs/research/investigacion-por-agentes.md`.
4. Redactar el skill `investigar` siguiendo el estándar Agent Skills.
5. Aplicar revisión de redacción y pulido mecánico.
6. Presentar al usuario para aprobación.

## Notas

- Las investigaciones existentes siguen un patrón: propósito, análisis de opciones, evaluación comparativa, recomendación y referencias. El skill debe capturar este patrón sin imponerlo rígidamente.
- El skill debe ser útil para la tarea 031, que usará el skill `investigar` para analizar flujos asíncronos.

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario: [fecha] — [Aprueba | Solicita cambios]
