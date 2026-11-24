# Borrador: Resolución de necesidades de las piezas en frontera

> **Estado:** borrador — pendiente de aprobación de la propuesta
> **Tipo:** desarrollo
> **Depende de:** `03-repositorio-como-coleccion.md`

## Objetivo

Adaptar las piezas para que cada necesidad que cruza su frontera quede resuelta: las obligatorias mediante las dependencias declaradas en los manifiestos, y las opcionales mediante degradación elegante —sin invocaciones ni referencias rotas a lo no instalado—.

## Contexto y enfoque

- Una referencia `../hermano/` resuelve en el árbol de destino si el hermano está instalado: la dependencia declarada lo garantiza. Solo las referencias a piezas que no son dependencia del conjunto requieren adaptación.
- La instalación trae transitivamente las dependencias declaradas: lo obligatorio está garantizado en destino; lo opcional exige degradación por diseño.
- El modelo lista las necesidades con su degradación decidida; los gestores que cada conjunto declara como dependencia traen su material a la instalación sin adaptación.
- Instalación global en proyectos de validación: cualquier comportamiento degradado se evidencia en ellos.

## Plan de trabajo

- [ ] Por pieza, recorrer sus necesidades según la lista del modelo: la referencia a pieza declarada como dependencia queda tal cual —resuelve en destino—; la referencia o invocación a pieza opcional se degrada (instrucción o comportamiento reducido documentado).
- [ ] Adaptar invocaciones entre skills: `skill(nombre)` de una pieza no dependiente degrada a instrucción; las de piezas dependientes se mantienen.
- [ ] Adaptar imports y referencias a gestores que quedaron como dependencias o fuera de frontera.
- [ ] Ejecutar las piezas en frontera en un destino de prueba por conjunto: cada una funciona con solo sus dependencias instaladas.

## Entregable

Las piezas adaptadas dentro de sus conjuntos: cada necesidad obligatoria satisfecha por dependencia declarada, cada opcional con su degradación documentada en la propia pieza.

## Criterios de aceptación

- Ninguna pieza invoca ni referencia material fuera de su conjunto más sus dependencias declaradas, salvo la degradación documentada.
- Cada conjunto es funcional con solo sus dependencias instaladas: sus flujos principales corren en destino de prueba.
- Las adaptaciones respetan el formato vigente de las piezas y el material compartido llega vía dependencias declaradas.
- Las fricciones encontradas quedan registradas.

## Fuera de alcance

- El modelo de fronteras (borrador 01) y la materialización de la colección (borrador 03).
- La verificación instalación-a-instalación completa (borrador 05).
- Reinstalar con subconjuntos los proyectos de validación existentes.
- Rediseño de piezas más allá de lo que su coherencia en frontera exige.
