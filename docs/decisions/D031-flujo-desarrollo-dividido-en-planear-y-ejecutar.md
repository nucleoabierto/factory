# D031: El flujo de desarrollo se divide en `planear-tarea` y `desarrollar-tarea`

## Estado

Aceptada

## Contexto

D020 encapsuló el sub-flujo de desarrollo en un único skill especialista que recorría planeación y ejecución en la misma sesión. Eso impedía planear varias tareas en paralelo y ejecutarlas después, y construir planes incrementales sobre planes previos aún no ejecutados: el pipeline era una sola pieza con una sola entrada.

## Decisión

El flujo de desarrollo se divide en dos skills invocables por separado: `planear-tarea` —contexto, conectividad y plan con suite, con su puerta humana, deteniéndose con las secciones aprobadas en el archivo de la tarea— y `desarrollar-tarea` —valida el plan aprobado y ejecuta la implementación con su registro de desviaciones—. El skill `desarrollo` se elimina: `ejecutar-tareas` elige el punto de entrada leyendo el estado de planeación del archivo de la tarea —sin `## Plan técnico` y `## Suite de pruebas esperada` aprobados va a `planear-tarea`; con ambas aprobadas, a `desarrollar-tarea`— y, cuando la planeación termina aprobada dentro del ciclo, la misma iteración continúa con la ejecución. La planeación es incremental: una dependencia con plan aprobado pero sin ejecutar se toma como base asumida, no como bloqueo.

## Justificación

El archivo de la tarea ya era la fuente de verdad del avance —sus secciones son un contrato de estado—, así que el corte no necesitaba artefactos nuevos: solo dos puntos de entrada y un check de estado en el ejecutor. Conservar `desarrollo` como compositor habría dejado un nivel de orquestación flotante sin decisión propia. El precio asumido es que `ejecutar-tareas` aprende un mínimo de estado del dominio —qué secciones marcan «planeada»—, que D020 mantenía fuera del ejecutor; se acota a la lectura del contrato declarado en el propio registro de enrutado. Se descartó la alternativa de dos modos dentro de un solo skill porque mezcla dos entradas en una sola description y hace cada flujo menos descubrible.

## Referencias

- `docs/tasks/102-separar-flujos-planear-y-ejecutar.md` — tarea que la consolida
- D020 — la encapsulación original del sub-flujo, sustituida
- `.agents/skills/planear-tarea/SKILL.md`, `.agents/skills/desarrollar-tarea/SKILL.md` — los dos flujos
