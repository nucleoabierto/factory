# Modelo de fronteras de los conjuntos

## Estado

[ ] Pendiente

## Tipo

desarrollo

## Objetivo

Definir el modelo que decide a qué conjunto pertenece cada pieza, qué conjunto depende de cuál y qué necesidades quedan degradadas, de modo que cada conjunto sea consumible por separado con su coherencia garantizada por dependencias declaradas.

## Dependencias

- Ninguna

## Entrada

- La propuesta `docs/proposals/006-subpaquetes-por-dominio/propuesta.md` y la idea `docs/ideas/006-division-paquete-partes.md`.
- El grafo real de dependencias entre las 45 piezas —a regenerar sobre el estado vigente—.
- `skill-para-humano`, que hoy declara «pieza autocontenida en un directorio».
- El formato de empaquetado: colecciones, dependencias entre paquetes del mismo árbol por nombre, composición pura.

## Resultado esperado

- El modelo de fronteras documentado: división declarada de conjuntos, grafo de dependencias entre ellos, lista de necesidades degradadas, decisión sobre conjuntos base y de composición pura.
- `skill-para-humano` anexado con el criterio de composición: «¿a qué conjunto pertenece la pieza? ¿qué declara como dependencia?».

## Criterios de calidad

- Toda pieza tiene conjunto declarado; la pertenencia es verificable contra la regla.
- Cada necesidad obligatoria que cruza frontera queda resuelta como dependencia declarada o co-ubicación; el grafo no tiene ciclos —el formato los aborta—.
- Las necesidades deseables no resueltas tienen degradación elegante documentada.
- La división responde al problema: un conjunto como el de redacción es consumible solo, sin invocaciones ni referencias rotas a lo no instalado.

## Procedimiento sugerido

1. Obtener el grafo real de dependencias entre las 45 piezas (invocaciones y referencias entre ellas).
2. Agrupar por dominio de capacidad: redacción; lazo de revisión; núcleo del ciclo (descubrimiento→entrega); gestión de producto; validación; gestores e instrumentación.
3. Clasificar cada necesidad de una pieza sobre otra: obligatoria —la pieza no funciona sin ella: va a la misma frontera o se declara dependencia del conjunto—; deseable —mejora pero puede degradarse con gracia—; ortogonal —fuera del conjunto—.
4. Trazar el grafo de dependencias entre conjuntos: para cada necesidad obligatoria que cruza frontera, decidir dependencia declarada o co-ubicación —el material compartido por muchos (gestores) pesa a favor de un conjunto base del que dependan los demás—.
5. Decidir si la colección incluye un conjunto de composición pura —sin contenido propio, depende de todos— que preserve la adopción completa en un solo gesto.
6. Anexar a `skill-para-humano` el criterio de composición.

## Notas

- Fuera de alcance: la política de versionado (tarea 154) —aunque el grafo que aquí se declara es su entrada—, la materialización de la colección (tarea 155) y la adaptación de las piezas (tarea 156).
- La frontera se decide por conjunto con criterio explícito por pieza: la pertenencia no depende de criterio implícito.
- El análisis previo muestra gestores compartidos por casi todas las piezas (`distribuir`, `actualizar-artefactos`, `operar-changelog`, `operar-roadmap`, `registrar`, `consultar-artefactos`), orquestadores con muchas dependencias (`ejecutar-tareas`, `idea-a-tarea`, `crear-tareas`, `planificar`) y piezas aisladas (`revisar-redaccion`, `pulir-escritura`).

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario (ejecución): [fecha] — [Aprueba | Solicita cambios]
- Usuario (cierre): [fecha] — [Aprueba | Solicita cambios]
