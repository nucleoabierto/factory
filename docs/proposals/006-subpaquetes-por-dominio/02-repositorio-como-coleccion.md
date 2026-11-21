# Repositorio reorganizado como colección

## Tipo

mantenimiento

## Objetivo

Materializar la estructura de colección que el modelo declara: la raíz pasa a describir la colección y cada conjunto vive en su propio directorio de paquete con su manifiesto y las piezas que instala.

## Dependencias

- Borrador 01

## Entrada

- El modelo de fronteras: lista de conjuntos, contenido de cada uno y destino del material compartido.
- El formato de paquete teleprompter: contrato del manifiesto y de la colección (`docs/formato-paquete.md` del repositorio teleprompter y `examples/coleccion-skills/`).
- La estructura actual de `.agents/skills/` y `PERSONALIZE.md`.

## Resultado esperado

- `teleprompter.json` raíz convertido en manifiesto de colección: `collection: true`, la lista `packages` con la ruta de cada conjunto y sin campos de paquete.
- Un directorio de paquete por conjunto con su `teleprompter.json` propio —`name` igual al directorio, `version` inicial, `install` completo de sus piezas— y las piezas copiadas dentro.
- El material compartido replicado donde el modelo lo decidió, y `PERSONALIZE.md` repartido en una guía por paquete.

## Criterios de calidad

- Cada manifiesto de paquete cumple el contrato del formato: `name` coincide con el directorio, `version` semver válida, `install` no vacío y toda `source` dentro del paquete, sin `..` ni rutas absolutas.
- Cada pieza instalable por su paquete lleva consigo todo el material que referencia.
- La colección lista exactamente los paquetes que el modelo declara; ninguna pieza queda fuera ni duplicada entre paquetes salvo el material compartido declarado.

## Procedimiento sugerido

1. Crear el directorio de cada conjunto y mover sus piezas con el material compartido asignado.
2. Escribir el manifiesto de cada paquete: nombre, versión inicial, mapa de instalación y guía de personalización si aplica.
3. Reescribir el manifiesto raíz como colección con la lista de paquetes.
4. Repartir `PERSONALIZE.md`: la parte común por paquete y los literales que cada uno contiene.

## Notas

- La adaptación semántica de las piezas que cruzan fronteras es el borrador 03; esta pieza es estructural: mueve y declara.
