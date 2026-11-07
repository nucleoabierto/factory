# Carril técnico ligero para el detalle de implementación

## Estado

[r] En revisión

## Tipo

desarrollo

## Objetivo

Dar a la brecha clasificada como detalle de implementación una vía propia dentro del flujo de desarrollo: la restricción se declara, las alternativas se listan y la decisión queda documentada en la tarea, sin que el detalle monte el ciclo completo ni se resuelva de tapadillo.

## Dependencias

- 148
- 149

## Entrada

- El modelo de clasificación del borrador 01 y la forma del veredicto enrutado del borrador 02.
- El subflujo de desarrollo que consume el veredicto (`desarrollar-tarea` y su cadena).

## Resultado esperado

- Cuando el veredicto declara una brecha «detalle de implementación», el flujo de desarrollo la resuelve en el carril ligero: restricción declarada, alternativas consideradas, decisión documentada en el archivo de la tarea.
- La pieza no queda bloqueada ni genera demanda: su resolución es local.

## Criterios de calidad

- El carril no invoca el ciclo completo de idea a tarea ni una tarea nueva: es un mecanismo dentro del trabajo en curso.
- Toda decisión del carril queda registrada en la tarea con su restricción, sus alternativas y la elección —la improvisación deja de ser invisible.
- El carril distingue su límite: si al resolverlo el detalle resulta ser una ausencia, la brecha se reclasifica y toma la otra vía.

## Procedimiento sugerido

1. Leer el subflujo de desarrollo (`desarrollar-tarea`, `ejecutar-implementacion`) y localizar dónde consume el veredicto de conectividad.
2. Definir el carril ligero: la forma de la restricción, de las alternativas y del registro en la tarea —una sección del archivo existente, no un artefacto nuevo, salvo que el detalle lo justifique—.
3. Cablear el consumo: el veredicto «detalle» entra al carril; declarar la reclasificación cuando el detalle se revela ausencia.
4. Revisión de redacción preventiva sobre los cambios.

## Contexto

- El veredicto enrutado de la tarea 149 emite por brecha «detalle de implementación» la entrada `Clase`/`Destino`/`Razón` en `## Conectividad` y `planear-tarea` deja continuar la pieza —el carril es el mecanismo que la resuelve—. `ejecutar-implementacion` es el consumidor: implementa la checklist del plan, delega en subagentes y registra desviaciones; el carril es un paso nuevo de su procedimiento, anterior a implementar lo que el detalle condiciona.
- La forma del registro sigue el patrón del modelo —lista anidada por detalle— y vive en una sección `## Carril` del archivo de la tarea, insertable por la operación `insertar-seccion` de `actualizar-artefactos` sin tocar el documento de reglas (las secciones se localizan por prefijo y el título es libre).
- La reclasificación —detalle que se revela ausencia— ya tiene destino declarado («vuelta a la demanda») aunque su mecanismo aterrice en la 151: la pieza se detiene con la reclasificación declarada, coherente con el bloqueo honesto que 149 estableció.
- Dominio: `docs/domains/003-subflujo-desarrollo.md` declara ya el invariante «un detalle de implementación lo resuelve el carril ligero en la ejecución» —esta tarea materializa el mecanismo—.
- Producto: `product-docs/` no documenta el subflujo; sin aportación.
- PRD: `docs/prd/006-brechas-clasificadas.md` — CU-2 (detalle resuelto en el carril con restricción, alternativas y decisión documentada) y su borde (reclasificación a ausencia) son los casos de esta tarea.
- Lecciones: `contratos-de-skills` (reglas inline en el skill; referencias solo a material del paquete), `diseno-de-artefactos` (una sección del archivo existente, no artefacto nuevo, salvo justificación), `vocabulario` y `consistencia-de-formatos`, `validacion` (revisión preventiva sobre el estado final), `higiene-de-ramas` (rama propia ya creada).
- Decisiones: D037 (la clasificación y el enrutado que el carril consume; la duda escala, nunca se adivina), D035 (la sección del carril se escribe por delegación mecánica), D031 (la mitad de ejecución donde corre el carril).

## Conectividad

Conectada — el consumidor `ejecutar-implementacion` y su cadena existen, las entradas «detalle de implementación» llegan declaradas en `## Conectividad` desde la tarea 149 y el mecanismo de secciones del archivo de tarea admite el registro sin cambios en las reglas. Nada falta.

## Plan técnico

`ejecutar-implementacion` implementa la checklist del plan dentro de la tarea —delega en subagentes, registra desviaciones— y es donde el veredicto «detalle» llega para resolverse. El carril es un paso nuevo de su procedimiento: por cada entrada «detalle de implementación» declarada en `## Conectividad`, declara la restricción, lista las alternativas y documenta la elección en la tarea antes de implementar lo que el detalle condiciona.

- [x] Insertar el carril ligero en `ejecutar-implementacion`: por cada entrada «detalle de implementación» de la conectividad, resolverla en el carril —restricción declarada, alternativas técnicas, elección— antes de implementar lo que condiciona; el registro vive en una sección `## Carril` del archivo de la tarea, escrita por delegación en `actualizar-artefactos`.
  - Aporta: el detalle se resuelve dentro del trabajo en curso con su decisión visible —sin ciclo completo ni improvisación invisible—.
  - Contexto: la forma del registro es una entrada por detalle con `Restricción`, `Alternativas` y `Decisión` —el mismo patrón de lista anidada del modelo—; el carril no crea tarea ni invoca el ciclo de idea a tarea.
- [x] Cablear la reclasificación: si al resolverlo el detalle exige decidir fuera del trabajo en curso, se reclasifica a «capacidad ausente» —declarado en la entrada de la conectividad y en el registro del carril—, la pieza toma la vía de la demanda y la ejecución informa al invocador deteniéndose con la causa declarada.
  - Aporta: el límite del carril queda honesto —una ausencia descubierta no se fuerza a resolver localmente—.
  - Contexto: el mecanismo de la demanda aterriza en la 151; la reclasificación solo declara clase, destino y detención, igual que el bloqueo de 149.
- [x] Ajustar la `Salida` de `ejecutar-implementacion` para declarar el registro del carril cuando hubo detalles.
  - Aporta: el contrato del skill refleja el artefacto que produce.
- [x] Actualizar `docs/mapa-de-flujos.md`: la mitad de ejecución describe el carril —detalles resueltos con decisión documentada y reclasificación declarada— y la lista de secciones del archivo de tarea gana `## Carril`.
  - Aporta: el cableado vigente queda documentado.
- [x] Revisión de redacción y pulido preventivos sobre los cambios en su estado final.
  - Aporta: el texto consolidado cumple la guía antes de presentarse.

## Suite de pruebas esperada

- Dada una tarea con una brecha «detalle de implementación» declarada, la ejecución la resuelve con restricción, alternativas y decisión documentadas en su archivo (CU-2). (O)
- Dada una tarea con varias brechas «detalle», cada una recibe su registro por separado (CU-2). (M)
- Dada una tarea sin brechas «detalle», la ejecución no produce registro de carril (CU-2). (Z)
- Dado un detalle cuya resolución exige decidir fuera del trabajo en curso, la ejecución lo reclasifica a «capacidad ausente» —declarada, no oculta— y la pieza toma la vía de la demanda (borde CU-2). (E)
- Dado el registro del carril, cada decisión declara restricción, alternativas y elección —la improvisación deja de ser invisible— (CU-2). (I)
- El carril no invoca el ciclo de idea a tarea ni crea una tarea nueva para el detalle (regresión — criterio de calidad).

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario (ejecución): [fecha] — [Aprueba | Solicita cambios]
- Usuario (cierre): [fecha] — [Aprueba | Solicita cambios]
