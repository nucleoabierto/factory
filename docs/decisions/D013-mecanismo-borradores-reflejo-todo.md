# D013: Mecanismo de borradores y su reflejo en TODO.txt

## Estado

Aceptada

## Contexto

El flujo de idea a tarea necesita trabajo asíncrono: el agente produce borradores y el usuario revisa cuando puede. Los patrones externos (AgentDraft, 100monkeys) modelan la puerta asíncrona con un estado persistente y una semántica de bloqueo. `TODO.txt` es el punto de entrada del agente al iniciar una sesión.

## Decisión

Añadimos una sección «Propuestas en revisión» al final de `TODO.txt`, con el marcador `[p]` para las propuestas pendientes de revisión. El ciclo de vida de la propuesta es: borrador → pendiente de revisión → aprobada o descartada. Los borradores no tienen ciclo de vida propio: siguen el de la propuesta.

## Justificación

La sección dedicada en `TODO.txt` permite al agente detectar propuestas pendientes al iniciar una sesión, sin un mecanismo externo de notificación. El marcador `[p]` distingue las propuestas de las tareas. El ciclo de vida simple, sin estado propio por borrador, evita complejidad innecesaria: la propuesta es la unidad de revisión, no cada borrador individual. La alternativa de asignar un estado a cada borrador se descarta porque multiplica los estados sin aportar valor: la aprobación es de la propuesta completa.

## Referencias

- Investigación «Flujo 1 completo: propuesta, borradores y procedimiento» — `docs/research/2026-09-flujo-1-propuesta-borradores.md`
- D012, «Formato y ubicación de las propuestas» — `docs/decisions/D012-formato-y-ubicacion-de-las-propuestas.md`
