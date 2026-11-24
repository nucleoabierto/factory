# Borrador: Modelo de fronteras de los conjuntos

> **Estado:** borrador — pendiente de aprobación de la propuesta
> **Tipo:** desarrollo
> **Depende de:** ninguna

## Objetivo

Definir el modelo que decide a qué conjunto pertenece cada pieza, qué conjunto depende de cuál y qué necesidades quedan degradadas, de modo que cada conjunto sea consumible por separado con su coherencia garantizada por dependencias declaradas.

## Contexto y enfoque

- La propuesta pide coherencia por conjunto, no solo corte por dominio: una pieza solo cabe donde sus necesidades obligatorias queden satisfechas —en la misma frontera o como dependencia declarada—.
- Las 45 piezas tienen un grafo real de invocaciones y referencias: el análisis previo muestra gestores compartidos por casi todas (`distribuir`, `actualizar-artefactos`, `operar-changelog`, `operar-roadmap`, `registrar`, `consultar-artefactos`), orquestadores con muchas dependencias (`ejecutar-tareas`, `idea-a-tarea`, `crear-tareas`, `planificar`) y piezas aisladas (`revisar-redaccion`, `pulir-escritura`).
- El formato del empaquetado admite declarar que un conjunto depende de otros del mismo árbol —la coherencia se declara, no solo se contiene—, así como paquetes de composición pura sin contenido propio; el supuesto de autocontención física deja de ser obligatorio.
- La frontera se decide por conjunto, con criterio explícito por pieza —así el modelo es verificable y la pertenencia no depende de criterio implícito.
- `skill-para-humano` declara hoy «pieza autocontenida en un directorio»: la tarea actualiza el criterio a pertenencia y dependencias por conjunto.

## Plan de trabajo

- [ ] Obtener el grafo real de dependencias entre las 45 piezas (invocaciones y referencias entre ellas).
- [ ] Agrupar por dominio de capacidad: redacción; lazo de revisión; núcleo del ciclo (descubrimiento→entrega); gestión de producto; validación; gestores e instrumentación.
- [ ] Clasificar cada necesidad de una pieza sobre otra: **obligatoria** —la pieza no funciona sin ella: va a la misma frontera o se declara dependencia del conjunto—; **deseable** —mejora pero puede degradarse con gracia—; **ortogonal** —fuera del conjunto—.
- [ ] Trazar el grafo de dependencias entre conjuntos: para cada necesidad obligatoria que cruza frontera, decidir dependencia declarada o co-ubicación —el material compartido por muchos (gestores) pesa a favor de un conjunto base del que dependan los demás—.
- [ ] Decidir si la colección incluye un conjunto de composición pura —sin contenido propio, depende de todos— que preserve la adopción completa en un solo gesto.
- [ ] Anexar a `skill-para-humano` el criterio de composición: «¿a qué conjunto pertenece la pieza? ¿qué declara como dependencia?».

## Entregable

El modelo de fronteras como documento en la propuesta (o referencia en `docs/`): división declarada de conjuntos con su grafo de dependencias, la lista de necesidades degradadas, la decisión sobre conjuntos base y de composición pura, y el criterio de pertenencia anexado a `skill-para-humano`.

## Criterios de aceptación

- Toda pieza tiene conjunto declarado; la pertenencia es verificable contra la regla.
- Cada necesidad obligatoria que cruza frontera queda resuelta como dependencia declarada o co-ubicación; el grafo no tiene ciclos —el formato los aborta—.
- Las necesidades deseables no resueltas tienen degradación elegante documentada.
- La división responde al problema: un conjunto como el de redacción es consumible solo, sin invocaciones ni referencias rotas a lo no instalado.

## Fuera de alcance

- Materializar la estructura (borrador 03) y la adaptación de piezas (borrador 04).
- La política de versionado (borrador 02) —aunque el grafo que aquí se declara es su entrada—.
