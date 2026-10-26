# Conectar los momentos informativos que disparan la revisita

## Tipo

desarrollo

## Objetivo

Hacer que la revisita de prioridad se dispare sola en los dos momentos en que la información mejora —el cierre de un conjunto y la incorporación de una demanda nueva—, de modo que el orden deje de depender de que alguien recuerde revisarlo; la invocación bajo demanda queda además documentada como entrada siempre disponible.

## Dependencias

- Borrador 01.
- Borrador 02.

## Entrada

- La capacidad de comparación (borrador 01) y el paso integrado en la planeación de dirección (borrador 02).
- Los puntos del ciclo donde ocurren los dos momentos: el cierre de conjuntos del índice de tareas y la entrada de demanda nueva —ideas procesadas, propuestas aprobadas o líneas incorporadas a la dirección—.
- Los skills que ejecutan esos puntos del ciclo (en Factory: el cierre de conjunto, el reflector del *roadmap* y el flujo de idea a tarea).

## Resultado esperado

- Al agotarse una agrupación del índice, el cierre propone revisitar el orden de las líneas con la información recién ganada —coste real y sinergias—.
- Al incorporarse una demanda nueva, esta se compara contra las líneas abiertas en lugar de caer al final de la cola.
- La revisita es una propuesta bajo puerta humana, nunca una reordenación automática.

## Criterios de calidad

- Cada disparador invoca la comparación en el punto del ciclo donde ocurre el momento informativo, sin replicar la lógica de la capacidad.
- Los disparadores no bloquean el cierre ni la incorporación: proponen la revisita y dejan constancia si se pospone.
- La invocación bajo demanda queda documentada en los puntos de entrada naturales del usuario.

## Procedimiento sugerido

1. Localizar en los skills del ciclo los puntos exactos de los dos momentos —cierre de agrupación e incorporación de demanda—.
2. Cablear en cada punto la invocación de la comparación como propuesta revisable, con su forma de aplazamiento registrado.
3. Documentar la invocación bajo demanda en las superficies donde el usuario entra al ciclo.
4. Actualizar la documentación de flujos que describe las conexiones entre skills.
