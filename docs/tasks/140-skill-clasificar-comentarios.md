# Triage de la revisión recibida en un pull request propio

## Estado

**[ ] Pendiente** | [~] En progreso | [r] En revisión | [x] Completada | [!] Bloqueada

## Tipo

desarrollo

## Objetivo

Crear el skill `clasificar-comentarios`: la primera mitad del bloque autor. Clasifica los hilos de revisión abiertos de un PR propio en acciones —corregir, responder, aplazar— con la respuesta o corrección propuesta por hilo, y produce el documento de triage.

## Dependencias

- Ninguna — es el bloque autor, independiente del bloque revisor; conviene coordinar formatos con los borradores 01-02 si ya existen.

## Entrada

- Un PR propio con comentarios de revisión —identificable por número o por la rama actual—.
- La convención de clasificación: cada hilo abierto recibe un veredicto —corregir, responder, aplazar— con su propuesta concreta.

## Resultado esperado

- `.agents/skills/clasificar-comentarios/SKILL.md` con su declaración y procedimiento, registrado en el manifiesto.
- Procedimiento que cubre: resolución del PR; carga de los hilos de revisión con su estado —abiertos; los resueltos o ya triagiados se omiten—; clasificación de cada hilo abierto en corregir / responder / aplazar, con la corrección o respuesta propuesta y la severidad que el hilo merece; producción del documento de triage persistido, con resumen en chat.
- Hilos con intención poco clara van a preguntas abiertas del documento, no a suposiciones.
- Hilos agrupables por tema pueden delegarse en subagentes paralelos, siguiendo el patrón de delegación ya establecido.

## Criterios de calidad

- Solo análisis: el skill no responde, no resuelve hilos, no modifica el cambio; su producto es el documento de triage.
- Cada hilo abierto queda clasificado exactamente una vez; los resueltos no entran salvo que aporten contexto a uno abierto.
- Un hilo ya procesado en un triage anterior no se vuelve a clasificar —el documento es acumulable por rondas de revisión—.
- Las propuestas de corrección citan el código y la regla o intención del comentario; un aplazamiento lleva su razón.
- Ubicación del documento por convención, coherente con la del informe de revisión del bloque revisor.

## Procedimiento sugerido

1. Definir el formato del documento de triage —por hilo: veredicto, severidad, propuesta, razón del aplazamiento si aplica— y su ubicación por convención.
2. Definir la obtención de hilos vía `gh` —estado abierto vs. resuelto— y el criterio de omisión de los ya triagiados.
3. Escribir el `SKILL.md`, registrarlo en el manifiesto.

## Notas

- El documento de triage es la entrada natural del borrador 04, que aplica las correcciones; conviene dejar el formato pensado para ese consumo.

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario (ejecución): [fecha] — [Aprueba | Solicita cambios]
- Usuario (cierre): [fecha] — [Aprueba | Solicita cambios]
