# Clasificación de brechas en la evaluación de conectividad

## Estado

[r] En revisión

## Tipo

desarrollo

## Objetivo

Insertar en `evaluar-conectividad` el punto de decisión que clasifica cada pieza desconectada según el modelo: el veredicto deja de ser una etiqueta uniforme y emite por pieza su clase y su destino —carril técnico ligero o vuelta a la demanda—.

## Dependencias

- 148

## Entrada

- El modelo de clasificación producido por el borrador 01.
- El skill `evaluar-conectividad` y sus consumidores en el subflujo de desarrollo.

## Resultado esperado

- `evaluar-conectividad` clasifica cada brecha detectada aplicando el modelo y su veredicto declara por pieza desconectada la clase y el destino.
- Los consumidores del veredicto quedan actualizados para leer la nueva forma; `docs/mapa-de-flujos.md` refleja el punto de decisión si el cableado cambia.

## Criterios de calidad

- Toda pieza desconectada sale del veredicto con clase y destino declarados; ninguna queda con la etiqueta uniforme anterior.
- La emisión es determinista para los consumidores: misma entrada, mismo veredicto.
- La duda no se resuelve en silencio: una brecha que el modelo no discrimina escala al usuario.
- Los veredictos anteriores al cambio no se reescriben.

## Procedimiento sugerido

1. Leer `evaluar-conectividad` completo y localizar el punto donde una pieza se declara desconectada.
2. Insertar el paso de clasificación tras la detección, consumiendo el modelo del borrador 01.
3. Declarar la forma de salida del veredicto enrutado y ajustar lo que los consumidores esperan leer.
4. Actualizar el mapa de flujos si el cableado del veredicto cambia.
5. Revisión de redacción preventiva sobre los cambios.

## Contexto

- `evaluar-conectividad/SKILL.md` emite tres veredictos; su paso 3 declara `desconectada` cuando la brecha no es absorbible y su paso 5 devuelve la descripción de la tarea puente —el punto donde se inserta la clasificación y el contrato que cambia—. La referencia `evaluar-conectividad/references/clasificacion-brechas.md` —producto de la tarea 148— declara las dos clases, la forma de la entrada enrutada (`Clase`, `Destino`, `Razón`) y la regla agregada por pieza.
- El consumidor del veredicto es `planear-tarea` paso 4: hoy, ante `desconectada`, da de alta la tarea puente con `crear-tareas` y declara la dependencia bloqueante; `ejecutar-tareas` marca `[!]` la tarea informada —el contrato de bloqueo que se conserva—. El carril ligero lo consumirá `desarrollar-tarea`/`ejecutar-implementacion` (tarea 150) y la vuelta a la demanda el mecanismo de bloqueo (tarea 151): esta tarea deja el veredicto legible para ambos sin construir las vías.
- Patrones: estructura de `SKILL.md` (frontmatter, cuándo usar/no usar, entrada, salida, principios, procedimiento, finalización, referencias); la sección de conectividad se registra delegando «insertar la sección» en `actualizar-artefactos`; las entradas enrutadas siguen la forma Markdown del modelo, con listas anidadas.
- Dominio: `docs/domains/003-subflujo-desarrollo.md` ya declara el concepto «clasificación de brechas» con ancla al documento de referencia —el cambio realiza lo que el dominio anuncia—.
- Producto: `product-docs/` solo cubre visión e índice —ningún documento describe el subflujo de desarrollo; sin aportación.
- PRD: `docs/prd/006-brechas-clasificadas.md` — CU-1 (brecha clasificada en la evaluación, con el borde de la duda escalada) es el caso de esta tarea; CU-2 y CU-3 fijan lo que los destinos declarados harán posible.
- Lecciones: `contratos-de-skills` (las referencias del skill solo apuntan a material que viaja con el paquete; la descripción declara capacidad, no mecánica), `diseno-de-artefactos` (publicar solo lo que tiene consumidor; la decisión de diseño se registra al cablear el mecanismo), `vocabulario` y `consistencia-de-formatos` (formas llanas y formato vigente), `estabilidad-temporal` (sin anclas a la historia del repo), `validacion` (la revisión preventiva cubre el estado final), `higiene-de-ramas` (rama propia ya creada).
- Decisiones: D005 (el material de referencia vive en `references/`, el cuerpo bajo 500 líneas), D031 (la mitad de planeación que consume el veredicto), D035 (la sección de conectividad se escribe por delegación mecánica), D034 (las puertas de la tarea corren vía PR).

## Conectividad

Conectada — el modelo de clasificación existe en `evaluar-conectividad/references/clasificacion-brechas.md` con la forma del veredicto enrutado declarada, el skill que lo aplicará y su consumidor `planear-tarea` están identificados, y el mapa de flujos cubre el cableado a actualizar. Nada falta.

## Plan técnico

`evaluar-conectividad` es el gate previo a la planeación: contrasta lo que la tarea asume contra el codebase, emite uno de tres veredictos y registra `## Conectividad` en el archivo de la tarea; su consumidor `planear-tarea` reacciona al `desconectada` dando de alta una tarea puente y bloqueando. El cambio inserta el punto de decisión entre la detección de la brecha no absorbible y la reacción del consumidor: cada brecha sale clasificada con su destino y el bloqueo se deriva de la clase, no del veredicto uniforme.

- [x] Insertar el punto de decisión en el procedimiento de `evaluar-conectividad`: tras declarar una brecha no absorbible, clasificarla aplicando `references/clasificacion-brechas.md` y emitir su entrada enrutada —`Clase`, `Destino`, `Razón`; la brecha que el modelo no discrimina escala al usuario con la pregunta formulada y queda sin clase ni destino hasta resolverla.
  - Aporta: el veredicto deja de ser una etiqueta uniforme —cada brecha sale con naturaleza y destino declarados—.
  - Contexto: los criterios viven solo en el documento de referencia —el `SKILL.md` lo invoca, no los duplica—; la escalación de la brecha dudosa es una puerta humana nueva dentro del gate.
- [x] Reemplazar el contrato de la tarea puente por el de las entradas enrutadas en `evaluar-conectividad`: la salida declara el veredicto más las entradas por brecha registradas con la forma del modelo; el paso que devolvía la descripción del puente devuelve ahora las entradas; la referencia al modelo se añade a «Referencias» y la `description` refleja el enrutado a nivel de capacidad.
  - Aporta: el invocador recibe lo que enruta en lugar de una improvisación empaquetada; se fija el contrato que leerán las vías de 150 y 151.
- [x] Actualizar `planear-tarea` para leer el veredicto enrutado: una pieza con al menos una «capacidad ausente» —o con brecha escalada sin resolver— queda bloqueada con su causa declarada y el alta de la tarea puente desaparece; una pieza con solo «detalle de implementación» continúa a la planeación, con las brechas declaradas para que el carril las resuelva en la ejecución.
  - Aporta: el bloqueo se deriva de la naturaleza de la brecha; la demanda deja de materializarse como tarea puente improvisada.
  - Contexto: el carril ligero y la vuelta a la demanda se cablean en 150 y 151 —aquí solo cambia la lectura: los destinos quedan declarados y el bloqueo por ausencia es honesto aunque la idea derivada aterrice después—.
- [x] Actualizar `docs/mapa-de-flujos.md`: el paso del sub-flujo describe el punto de decisión, la puerta de la brecha dudosa y la reacción del consumidor por clase, en lugar del alta de la tarea puente.
  - Aporta: la documentación del cableado refleja el contrato vigente, incluida la puerta humana nueva.
- [x] Corregir la marca de la pieza 148 en la épica 006 —figura `[ ]` pese a estar completada—.
  - Aporta: la épica refleja el estado real de sus piezas.
- [x] Revisión de redacción y pulido preventivos sobre los documentos modificados en su estado final.
  - Aporta: el texto consolidado cumple la guía antes de presentarse.

## Suite de pruebas esperada

- Dada una pieza con una brecha no absorbible resoluble por decisión técnica dentro de su alcance, la evaluación emite `desconectada` con la entrada clase «detalle de implementación» y destino «carril técnico ligero» (CU-1). (O)
- Dada una pieza con una brecha cuya resolución exige decidir fuera del trabajo en curso, la evaluación emite la entrada clase «capacidad ausente» con destino «vuelta a la demanda» (CU-1). (O)
- Dada una pieza con varias brechas no absorbibles, la evaluación emite una entrada por brecha —clase, destino y razón por separado— (CU-1). (M)
- Dada una brecha que el modelo no discrimina, la evaluación escala al usuario con la pregunta formulada y la entrada queda sin clase ni destino hasta que se resuelva —la pieza espera, no continúa— (borde de CU-1). (E)
- Dado un veredicto `desconectada` con solo brechas «detalle», la planeación continúa —el detalle no bloquea— (CU-2). (B)
- Dado un veredicto `desconectada` con al menos una «capacidad ausente», la tarea queda bloqueada con su causa declarada y sin tarea puente creada (CU-3). (B)
- Dado el veredicto enrutado en la sección, las entradas declaran `Clase`, `Destino` y `Razón` en la forma del modelo —los consumidores las leen sin reinterpretar— (CU-1). (I)
- El punto de decisión consume el modelo por referencia: los criterios viven solo en `references/clasificacion-brechas.md`, sin duplicación en el `SKILL.md` (regresión — decisión transversal de la épica).
- Los veredictos `conectada` y `parcialmente conectada` conservan su semántica y su registro; los veredictos anteriores al cambio no se reescriben (regresión).

## Revisión

- Subagente: 2026-11-01 — Aprueba con menores corregidos
- Usuario (ejecución): 2026-11-01 — Aprueba
- Usuario (cierre): 2026-11-01 — Aprueba
