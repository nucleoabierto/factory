# Vuelta a la demanda de la capacidad ausente

## Estado

[r] En revisión

## Tipo

desarrollo

## Objetivo

Dar a la brecha clasificada como capacidad ausente su vía de producto: la brecha produce una idea persistida derivada con trazabilidad a la pieza que la reveló, y la pieza queda bloqueada con su causa declarada hasta que la demanda derivada se materialice.

## Dependencias

- 148
- 149

## Entrada

- El modelo de clasificación del borrador 01 y la forma del veredicto enrutado del borrador 02.
- El formato de la idea persistida (`docs/ideas/`, reglas en `actualizar-artefactos/references/idea.md`) y el mecanismo de bloqueo del índice de tareas.
- El subflujo de desarrollo que consume el veredicto.

## Resultado esperado

- Cuando el veredicto declara una brecha «capacidad ausente», el flujo escribe la idea derivada en `docs/ideas/` —con el enunciado del problema y la referencia a la pieza y tarea que la revelaron— y marca la pieza bloqueada con la causa declarada.
- La idea derivada sigue el ciclo normal de la demanda: la revisita de prioridad la trata por su canal habitual cuando se materialice.

## Criterios de calidad

- La idea derivada declara su origen: la tarea y la pieza cuya evaluación la reveló, para que la trazabilidad sobreviva a la promoción.
- El bloqueo de la pieza lleva causa declarada —la capacidad ausente y la idea que la demanda—, no un bloqueo mudo.
- No se duplica la revisita: la idea derivada dispara «incorporación de demanda» solo cuando se materialice en trabajo, por el canal existente —no al persistirse—.
- El bloqueo es honesto: la pieza no se fuerza ni se abandona en silencio.

## Procedimiento sugerido

1. Leer el subflujo de desarrollo y el punto donde el veredicto «capacidad ausente» debe actuar.
2. Definir la escritura de la idea derivada: el enunciado del problema heredado de la brecha, la referencia de origen y su alta en `docs/ideas/` con la serie vigente.
3. Definir el bloqueo con causa sobre la pieza y su reflejo en la tarea y el índice si aplica.
4. Verificar que el canal de «incorporación de demanda» cubre la idea derivada sin mecanismo paralelo; declararlo si no.
5. Revisión de redacción preventiva sobre los cambios.

## Notas

- La idea persistida es demanda, no trabajo: su ordenación la decide la maquinaria de priorización cuando entre a competir —fuera de alcance de esta tarea según la propuesta—.
- Costura detectada en la revisión de la 149: `ejecutar-tareas` solo declara bloqueo por otra tarea (`bloqueada por <refs>`); sin tarea puente, la capacidad ausente no produce ref bloqueante —la declaración del bloqueo con causa sobre la pieza debe cubrir ese hueco.

## Contexto

- Los dos puntos donde una «capacidad ausente» actúa: `planear-tarea` paso 4 —bloquea la pieza e informa al invocador— y `ejecutar-implementacion` paso 4 —la reclasificación del carril detiene la pieza con causa—. La vía es compartida: vive en una referencia junto al modelo (`evaluar-conectividad/references/`), como fija la decisión transversal de la épica.
- La idea persistida tiene su formato en `actualizar-artefactos/references/idea.md`: cabecera de líneas de cita —la lista es abierta, admite `> **Origen:**` para la trazabilidad—, `## ` con el enunciado, y `pendientes` la descubre mientras no lleve `> **Procesada en:**`. La serie sigue en 006.
- El bloqueo sin ref de tarea (la nota de esta tarea): `ejecutar-tareas` paso 7 declara bloqueados por `<refs>` pero el índice admite bloqueantes de texto libre —la idea derivada puede ser la causa declarada—; el contrato del paso hay que ampliarlo explícitamente.
- El canal anti-doble-disparo: la idea derivada no invoca la revisita al persistirse —la dispara «incorporación de demanda» solo cuando se materialice en trabajo, por el canal existente de `crear-tareas`/`planificar`—.
- Dominio: `docs/domains/003-subflujo-desarrollo.md` declara el invariante del bloqueo por naturaleza; falta el concepto de la vuelta a la demanda con su ancla —lo cubre el sensor al cerrar—.
- Producto: `product-docs/` no documenta el subflujo; sin aportación.
- PRD: `docs/prd/006-brechas-clasificadas.md` — CU-3 (ausencia devuelta a la demanda con idea trazable y bloqueo con causa) y su borde (canal habitual, sin mecanismo paralelo ni disparo duplicado) son los casos de esta tarea.
- Lecciones: `contratos-de-skills`, `diseno-de-artefactos` (formato del artefacto declarado en su documento de reglas), `vocabulario`, `consistencia-de-formatos`, `validacion`, `higiene-de-ramas`.
- Decisiones: D037 (la ausencia vuelve a la demanda con trazabilidad), D035 (la idea se escribe siguiendo su documento de reglas), D031 (los dos puntos del subflujo donde actúa).

## Conectividad

Conectada — los dos consumidores de la vía están identificados (`planear-tarea` paso 4, `ejecutar-implementacion` reclasificación), el formato de la idea persistida admite la trazabilidad por línea de cita, la serie continúa en 006 y el bloqueo por texto libre existe en el índice. Nada falta.

## Plan técnico

La «capacidad ausente» actúa en dos puntos del sub-flujo —`planear-tarea` la bloquea en la planeación y `ejecutar-implementacion` la detiene al reclasificar un detalle—. La vía es compartida y vive en una referencia junto al modelo: `evaluar-conectividad/references/vuelta-demanda.md`, que ambos consumen sin duplicar criterios.

- [x] Crear `references/vuelta-demanda.md`: la forma de la idea derivada —la serie de `docs/ideas/`, `> **Fecha:**`, `> **Origen:**` con la tarea y la pieza que la revelaron, `## Problema` con el enunciado heredado y `## Qué desbloquea` con la pieza liberada, el mínimo que el canal de demanda consume según `formato-idea.md`—, la regla de idempotencia —una brecha ya devuelta no produce otra idea: el «Origen» la delata—, la condición de desbloqueo declarada —la idea procesada y el trabajo que la materializa son la pista; el levantamiento corre por el canal habitual, sin mecanismo nuevo—, el retroenlace opcional de la entrada enrutada con la idea derivada, y la regla anti-doble-disparo: la idea no invoca revisita al persistirse, compite por el canal habitual cuando se materialice.
  - Aporta: la vía tiene un único contrato que los dos consumidores aplican sin duplicar criterios —misma decisión transversal que el modelo—.
  - Contexto: la idea se escribe directamente siguiendo las reglas de `actualizar-artefactos/references/idea.md` —no hay operación de alta en el catálogo: la creación es escritura con juicio del consumidor, como en `lluvia-de-ideas`—; la referencia cita a su hermana `clasificacion-brechas.md`, que ya anuncia las dos vías.
- [x] Declarar `> **Origen:**` en `actualizar-artefactos/references/idea.md`: la cabecera de líneas de cita documenta el campo de trazabilidad al artefacto que reveló la demanda.
  - Aporta: el formato queda declarado en su documento de reglas, no improvisado por el consumidor.
- [x] Cablear `planear-tarea` paso 4: ante «capacidad ausente», aplica la referencia —escribe la idea derivada con su origen— e informa al invocador con la idea como bloqueante declarado.
  - Aporta: el bloqueo deja de ser mudo —declara la capacidad que falta y la demanda que la reclama—.
- [x] Cablear `ejecutar-tareas` paso 7: el bloqueo admite causa que no es tarea —una referencia de artefacto como la idea derivada, o una causa literal como la brecha escalada sin resolver—; `indice-tareas.md` aclara que un bloqueante puede ser cualquier referencia de artefacto o causa declarada, no solo tareas.
  - Aporta: cubre la costura detectada en la revisión de la 149.
- [x] Cablear `desarrollar-tarea`: la detención por reclasificación a «capacidad ausente» entra en las causas de término que el skill comunica al invocador —con la idea derivada como causa—, en su `Salida` y en el paso 2.
  - Aporta: la cadena ejecutar-tareas → desarrollar-tarea → ejecutar-implementacion propaga la causa correcta hasta la declaración del bloqueo.
- [x] Actualizar `ejecutar-implementacion`: la reclasificación consume la misma referencia —idea derivada y bloqueo con causa, no solo detención—.
  - Aporta: la vía es una, desde cualquier punto donde la ausencia aparezca.
- [x] Actualizar `docs/mapa-de-flujos.md`: el sub-flujo describe la vuelta a la demanda en la planeación y en la ejecución, y `docs/ideas/` gana el nuevo productor en los artefactos de estado.
  - Aporta: el cableado vigente queda documentado.
- [x] Revisión de redacción y pulido preventivos sobre los cambios en su estado final.
  - Aporta: el texto consolidado cumple la guía antes de presentarse.

## Suite de pruebas esperada

- Dada una pieza con brecha «capacidad ausente», la vía produce una idea persistida con el enunciado heredado, su origen —tarea y pieza que la revelaron— y las secciones que el canal de demanda consume (CU-3). (O)
- Dada la idea derivada, la pieza origen queda bloqueada en el índice con la idea como causa declarada —no un bloqueo mudo— (CU-3). (I)
- Dadas varias brechas ausentes, cada una produce su idea con su trazabilidad propia (CU-3). (M)
- Dado un detalle reclasificado a ausencia durante la ejecución, la misma vía produce la idea derivada y detiene la pieza —la detención se traslada por la cadena hasta la declaración del bloqueo— (borde CU-3). (E)
- La idea derivada no dispara la revisita de prioridad al persistirse —compite por el canal habitual al materializarse— (borde CU-3). (regresión)
- Una brecha ya devuelta a la demanda no produce una segunda idea —la pieza sigue bloqueada por la misma— (regresión).

## Revisión

- Subagente: 2026-11-06 — Solicita cambios (3 menores de alineación documental: literal de `inicializar`, Finalización de `ejecutar-implementacion`, Salida/Finalización de `planear-tarea`; más 1 cosmético —`<refs>`→`<bloqueantes>`—), corregidos; segunda ronda: Aprueba (1 observación menor resuelta: causa de bloqueo en el resumen del mapa)
- Usuario (ejecución): [fecha] — [Aprueba | Solicita cambios]
- Usuario (cierre): [fecha] — [Aprueba | Solicita cambios]
