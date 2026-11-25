# Resolución de necesidades de las piezas en frontera

## Estado

[ ] Pendiente

## Tipo

desarrollo

## Objetivo

Adaptar las piezas para que cada necesidad que cruza su frontera quede resuelta: las obligatorias mediante las dependencias declaradas en los manifiestos, y las opcionales mediante degradación elegante —sin invocaciones ni referencias rotas a lo no instalado—.

## Dependencias

- 155

## Entrada

- La colección materializada de la tarea 155 y la lista de necesidades con su degradación decidida del modelo de la tarea 153.
- Una referencia `../hermano/` resuelve en el árbol de destino si el hermano está instalado: la dependencia declarada lo garantiza; solo las referencias a piezas que no son dependencia del conjunto requieren adaptación.
- La instalación trae transitivamente las dependencias declaradas: lo obligatorio está garantizado en destino; lo opcional exige degradación por diseño.
- Los proyectos de validación, donde cualquier comportamiento degradado se evidencia.

## Resultado esperado

- Las piezas adaptadas dentro de sus conjuntos: cada necesidad obligatoria satisfecha por dependencia declarada, cada opcional con su degradación documentada en la propia pieza.

## Criterios de calidad

- Ninguna pieza invoca ni referencia material fuera de su conjunto más sus dependencias declaradas, salvo la degradación documentada.
- Cada conjunto es funcional con solo sus dependencias instaladas: sus flujos principales corren en destino de prueba.
- Las adaptaciones respetan el formato vigente de las piezas y el material compartido llega vía dependencias declaradas.
- Las fricciones encontradas quedan registradas.

## Procedimiento sugerido

1. Por pieza, recorrer sus necesidades según la lista del modelo: la referencia a pieza declarada como dependencia queda tal cual —resuelve en destino—; la referencia o invocación a pieza opcional se degrada a instrucción o comportamiento reducido documentado.
2. Adaptar invocaciones entre skills: `skill(nombre)` de una pieza no dependiente degrada a instrucción; las de piezas dependientes se mantienen.
3. Adaptar imports y referencias a gestores que quedaron como dependencias o fuera de frontera.
4. Ejecutar las piezas en frontera en un destino de prueba por conjunto: cada una funciona con solo sus dependencias instaladas —la verificación funcional del grafo declarado—.
5. Si la adaptación ajustó alguna dependencia declarada en un manifiesto, re-verificar la instalación de los conjuntos afectados: el grafo sigue resolviendo y la composición pura, si existe, mantiene la paridad.

## Notas

- Fuera de alcance: el modelo de fronteras (tarea 153), la materialización de la colección (tarea 155), reinstalar con subconjuntos los proyectos de validación existentes y rediseño de piezas más allá de lo que su coherencia en frontera exige.
- Detectado en la revisión de la tarea 153: `revisar-pr/SKILL.md` cita `.agents/skills/revisar-implementacion/SKILL.md` como proveniencia —referencia de archivo que cruza conjuntos (`lazo-revision` → `ciclo-tareas`) y declararla como dependencia crearía un ciclo (`ciclo-tareas` ya depende de `lazo-revision`); resolverla como referencia incidental en esta tarea —reformular la cita o duplicar el fragmento necesario—.

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario (ejecución): [fecha] — [Aprueba | Solicita cambios]
- Usuario (cierre): [fecha] — [Aprueba | Solicita cambios]
