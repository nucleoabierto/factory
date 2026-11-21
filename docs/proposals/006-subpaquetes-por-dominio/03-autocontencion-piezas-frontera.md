# Autocontención de las piezas que cruzan fronteras

## Tipo

desarrollo

## Objetivo

Adaptar cada pieza cuyo funcionamiento cruza una frontera de conjunto —invocaciones a piezas de otro paquete o referencias a material que no viaja con ella— hasta que cada conjunto funcione instalado por separado, aplicando la resolución que el modelo declaró para cada cruce.

## Dependencias

- Borrador 01
- Borrador 02

## Entrada

- El modelo de fronteras: la clasificación de cada cruce —obligatorio u opcional— y su resolución decidida.
- La estructura de colección materializada: qué viaja con cada paquete.
- Las lecciones del proyecto sobre contratos de skills (`docs/lessons/contratos-de-skills.md`).

## Resultado esperado

- Las piezas marcadas por el modelo quedan adaptadas: invocaciones cruzadas reclasificadas como opcionales con su degradación declarada, o referencias a material duplicado resueltas al material que viaja en el paquete.
- La guía de cada paquete declara las dependencias opcionales que sus piezas admiten —qué se enriquece si otro conjunto también está instalado—.
- Ninguna pieza toca lo que el modelo no marcó.

## Criterios de calidad

- Ningún skill de un conjunto requiere, para su contrato declarado, material o capacidades de otro conjunto: la invocación opcional declara su comportamiento sin ella.
- Las referencias `../` dentro de cada paquete solo apuntan a material que el propio paquete contiene.
- Los cambios son los que el modelo exige, ni más ni menos: cada edición es trazable a un cruce declarado.

## Procedimiento sugerido

1. Por cada cruce obligatorio del modelo, verificar que la resolución ya quedó dentro de la frontera; si el modelo lo resolvió como duplicación, confirmar el material presente.
2. Por cada cruce opcional, editar el skill para que su contrato no dependa del conjunto vecino: la invocación pasa a condicional con su degradación declarada.
3. Verificar cada paquete contra el criterio de autocontención del modelo.
