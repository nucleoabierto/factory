# Modelo de fronteras de los conjuntos

## Tipo

desarrollo

## Objetivo

Producir el modelo de fronteras de los conjuntos —la fuente común de criterios que consumen las piezas siguientes—: el grafo de dependencias real entre las piezas, el criterio de coherencia de un conjunto y el corte declarado con el material compartido que cada conjunto necesita.

## Dependencias

- Ninguna

## Entrada

- El grafo de dependencias entre las piezas, extraíble mecánicamente: referencias `../<hermano>/` e invocaciones por nombre en cada `SKILL.md` y sus `references/`.
- El formato de paquete teleprompter: colección como contenedor de paquetes autocontenidos —`source` no puede salir del paquete— y sin mecanismo de dependencias entre paquetes (`docs/formato-paquete.md` del repositorio teleprompter).
- La dirección del usuario: primer conjunto evidente el de redacción; la adaptación de piezas está dentro del alcance del conjunto.

## Resultado esperado

- Documento del modelo que declara:
  - Los criterios para asignar cada pieza a un conjunto —dominio de capacidad, densidad de invocaciones internas, material compartido—.
  - La lista de conjuntos con el contenido de cada uno: las 45 piezas asignadas.
  - La regla para las invocaciones que cruzan fronteras: obligatoria —misma frontera o dependencia declarada en la guía del paquete— u opcional —con su degradación documentada—.
  - El destino del material compartido (`references/`, literales de convención) por conjunto: dentro de la misma frontera o duplicado.

## Criterios de calidad

- Cada una de las 45 piezas queda asignada a exactamente un conjunto, sin huérfanas.
- Toda invocación y toda referencia a material que cruza una frontera queda clasificada según la regla, con su resolución declarada.
- El conjunto de redacción resulta autocontenido sin necesitar adaptación alguna.
- El modelo basta para ejecutar los borradores siguientes sin rehacer el análisis.

## Procedimiento sugerido

1. Extraer el grafo completo: por pieza, invocaciones salientes a otras piezas y referencias `../` a material hermano.
2. Proponer el corte inicial por dominios de capacidad y verificarlo contra el grafo: las fronteras con más cruces se revisan —pieza mal ubicada o frontera mal trazada—.
3. Declarar la regla de cruces y aplicarla a cada cruce detectado.
4. Fijar el documento del modelo con la lista de conjuntos, sus contenidos y el material compartido por conjunto.
