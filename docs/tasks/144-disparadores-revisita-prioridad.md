# Conectar los momentos informativos que disparan la revisita

## Estado

[x] Completada

## Tipo

desarrollo

## Objetivo

Hacer que la revisita de prioridad se dispare sola en los dos momentos en que la información mejora —el cierre de un conjunto y la incorporación de una demanda nueva—, de modo que el orden deje de depender de que alguien recuerde revisarlo; la invocación bajo demanda queda además documentada como entrada siempre disponible.

## Dependencias

- 142.
- 143.

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

## Contexto

- Épica `docs/epics/005-priorizacion-declarada.md` y PRD `docs/prd/005-priorizacion-declarada.md`: CU-2 (revisita al cerrar un conjunto, con aplazamiento registrado), CU-3 (la demanda nueva se compara contra las abiertas en lugar de caer al final; borde: propuesta en el punto donde la línea llega fuera de la planeación) y CU-4 (invocación bajo demanda) son los casos que esta pieza cubre.
- `priorizar-lineas` (142): su Entrada ya declara los disparadores «cierre de un conjunto», «incorporación de demanda» y «llamada directa»; su Decisión en la plantilla del escenario contempla «revisita pospuesta/rechazada». Lo que le falta: la puerta de posposición —hoy toda invocación corre la comparación completa—. La posposición registrada es un escenario mínimo (disparador, fecha, decisión) que solo este skill escribe.
- `planificar-roadmap` (143): la revisita dentro de la planeación ya está cableada; aquí no toca.
- Puntos del ciclo donde aterriza cada momento: `cerrar-conjunto` —la agrupación se agota y sale del índice en su paso 5; la propuesta va tras el cierre, sin bloquearlo—; `planificar` —una línea nueva materializa cuando se crea una agrupación nueva, épica o encabezado ligero, en ambos modos; añadir piezas a una épica existente no crea línea—; `crear-tareas` —en modo independiente, las tareas sueltas que crea son líneas nuevas de inmediato; en modo flujo no dispara porque `planificar` agrupa justo después y dispararía dos veces la misma demanda, y una tarea bajo agrupación existente tampoco es línea nueva—.
- Superficies de entrada del usuario para CU-4: `README.md` (tabla de skills —`priorizar-lineas` no figura aún, hallazgo del mismo tema que se absorbe aquí) y `docs/mapa-de-flujos.md` (ya declara la demanda directa como puerta; los disparadores nuevos hay que describirlos en el cableado).
- Decisiones vigentes: D036 (escenarios y disparadores), D032 (el reflector corre antes que el cierre de conjunto), D035 (reglas por artefacto), D006 (redacción preventiva), D028 (ZOMBIE).
- Lecciones: sin operaciones sin consumidor; invocaciones completas sin replicar pasos; contratos a nivel de capacidad; listas anidadas; vocabulario llano.

## Conectividad

Conectada. `priorizar-lineas` produce y persiste escenarios con los disparadores ya nombrados; los tres puntos del ciclo existen y reciben la invocación sin cambios en sus contratos de entrada; `consultar-artefactos` y `actualizar-artefactos` cubren lo que cada punto ya delega; las superficies de documentación (README, mapa) existen. Ninguna brecha exige tarea puente.

## Plan técnico

- [x] Añadir la puerta de posposición en `priorizar-lineas/SKILL.md`
  - Aporta: tras declarar el disparador, si es un momento informativo —cierre de conjunto o incorporación de demanda— el skill ofrece «revisitar ahora o posponer»; la posposición persiste el escenario mínimo y el skill termina. La llamada directa y la planeación de dirección no pasan por la puerta.
  - Contexto: la puerta vive en la capacidad, no en los disparadores —cada punto cablea una sola invocación y la constancia del aplazamiento se escribe donde se escriben los escenarios—.
- [x] Declarar la forma mínima en `priorizar-lineas/assets/escenario.md`
  - Aporta: la posposición en el disparador escribe cabecera con norte «no declarado», decisión y límites, sin secciones de comparación ni alternativas.
- [x] Cablear `cerrar-conjunto` con el disparador «cierre de conjunto»
  - Aporta: tras el informe del cierre, la revisita sale propuesta invocando `priorizar-lineas`; el cierre no se bloquea ni se condiciona; la `description` queda a nivel de capacidad.
- [x] Cablear `planificar` con el disparador «incorporación de demanda»
  - Aporta: tras materializar una agrupación nueva —épica o encabezado ligero, en ambos modos— la revisita sale propuesta; añadir piezas a una épica existente no dispara.
- [x] Cablear `crear-tareas` con el disparador «incorporación de demanda»
  - Aporta: solo en modo independiente cuando las entradas quedan como tareas sueltas; en modo flujo no dispara porque `planificar` agrupa justo después.
- [x] Documentar la invocación bajo demanda y el cableado nuevo
  - Aporta: `priorizar-lineas` entra en la tabla de skills del `README.md`; el mapa describe los dos disparadores en las secciones del ciclo de tareas y del flujo de idea a tarea.
- [x] Revisión preventiva de redacción sobre el texto final
  - Aporta: `revisar-redaccion` seguido de `pulir-escritura` —o el equivalente manual— cubriendo el estado final.

## Suite de pruebas esperada

- Dado un conjunto agotado y cerrado, `cerrar-conjunto` invoca `priorizar-lineas` con «cierre de conjunto» después de completar su trabajo —el cierre no se bloquea ni se condiciona— (CU-2). **(I)**
- Dada una revisita disparada que el usuario pospone, se persiste el escenario mínimo con el disparador y la decisión, y la comparación no corre (borde de CU-2 y CU-3). **(E)**
- Dada una agrupación nueva materializada por `planificar`, la revisita sale propuesta con «incorporación de demanda»; dada una extensión de épica existente, no sale (CU-3). **(B)**
- Dado `crear-tareas` en modo independiente con entradas sueltas, la revisita sale propuesta; en modo flujo o bajo agrupación existente, no —sin doble disparo— (borde de CU-3). **(B)**
- Dado el usuario que entra al ciclo, el README documenta `priorizar-lineas` como invocable bajo demanda (CU-4). (regresión)
- Ningún disparador reordena: todos proponen la revisita bajo puerta humana y la decisión es siempre del usuario. (invariante)

## Desviaciones del plan

- La puerta del disparador quedó de tres salidas en lugar de dos —revisitar ahora, mantener el orden vigente o posponer— y «mantener» no escribe escenario: la confirmación se anota como línea append-only en la sección «Confirmaciones» del escenario vigente. Acordado con el usuario durante la revisión.

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario (ejecución): 2026-10-26 — Aprueba
- Usuario (cierre): [fecha] — [Aprueba | Solicita cambios]
