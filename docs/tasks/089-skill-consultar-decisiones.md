# Skill de consulta de decisiones e índice mantenido

## Estado

[ ] Pendiente | [ ] En progreso | [ ] En revisión | [ ] Completada | [ ] Bloqueada

## Tipo

mantenimiento

## Objetivo

Crear el skill `consultar-decisiones`, paralelo a `consultar-lecciones`, que recupere las decisiones de diseño aplicables a un trabajo concreto, y dotar a `docs/decisions/` de un índice que sirva de contrato de descubrimiento. Además, modificar `decisiones-diseno` para que el índice se mantenga actualizado al registrar decisiones nuevas.

## Dependencias

- Ninguna

## Entrada

- `consultar-lecciones` como modelo de estructura y de contrato de descubrimiento.
- `decisiones-diseno`, sus referencias `references/que-es-una-decision.md` y `references/formato.md`.
- Los archivos D001–D027 existentes en `docs/decisions/`.
- `docs/lessons/README.md` como referencia de formato de índice con disparadores.

## Resultado esperado

- `.agents/skills/consultar-decisiones/SKILL.md` nuevo: dada una descripción del trabajo (archivos, tipo de acción, palabras clave), coteja el índice de decisiones y trae las decisiones aplicables al contexto; si ninguna aplica, lo declara sin forzar coincidencias.
- `docs/decisions/README.md` nuevo: índice con una entrada por decisión existente —identificador, título, resumen breve y palabras clave o disparadores de aplicabilidad— poblado con D001–D027.
- `decisiones-diseno` actualizado: el procedimiento incluye registrar la nueva decisión en `docs/decisions/README.md`; si una decisión es sustituida u obsoleta, su entrada del índice se actualiza en consecuencia.

## Criterios de calidad

- El skill declara cuándo usar y cuándo no usar, con enrutado explícito frente a `consultar-lecciones` y `decisiones-diseno`.
- El índice cubre las 27 decisiones existentes y cada entrada permite decidir aplicabilidad sin abrir el archivo.
- `decisiones-diseno` deja el índice consistente tras crear, sustituir u obsoletar una decisión.
- El estilo y la estructura siguen los de los skills hermanos, en especial `consultar-lecciones`.

## Procedimiento sugerido

1. Diseñar el formato del índice de decisiones inspirándose en `docs/lessons/README.md`, adaptando «disparadores» a la naturaleza de las decisiones.
2. Redactar el skill `consultar-decisiones` siguiendo la estructura de `consultar-lecciones`.
3. Poblar `docs/decisions/README.md` leyendo cada decisión D001–D027.
4. Actualizar `decisiones-diseno` con el paso de mantenimiento del índice.
5. Aplicar revisión de redacción y pulido mecánico en modo preventivo.

## Notas

- Las decisiones no declaran disparadores en su formato actual; el índice debe sintetizar la aplicabilidad a partir de título, contexto y decisión de cada archivo.

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario: [fecha] — [Aprueba | Solicita cambios]
