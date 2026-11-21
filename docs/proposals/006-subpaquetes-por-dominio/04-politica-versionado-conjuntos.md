# Política de versionado de los conjuntos

## Tipo

desarrollo

## Objetivo

Decidir y materializar cómo versionan y se liberan los conjuntos de la colección: la política —tren de liberación compartido o cadencia independiente—, qué hacen `liberar-version` y el changelog en un mundo de varios manifiestos, y la convención de etiquetas.

## Dependencias

- Borrador 01

## Entrada

- El modelo de fronteras: los conjuntos y su acoplamiento interno.
- Los skills `liberar-version`, `mantener-changelog` y `operar-changelog`, y la convención vigente: un changelog raíz, una fuente de versión única y etiquetas `vX.Y.Z`.
- La autoridad de versión del formato teleprompter: el manifiesto de cada paquete, no el VCS.

## Resultado esperado

- La política de versionado declarada con su justificación: si los conjuntos comparten tren de liberación —una versión mueve todos los manifiestos— o versionan por separado, y por qué.
- Los cambios que la política exige materializados: `liberar-version` y el changelog adaptados al número de fuentes de versión resultante, con la convención de etiquetas decidida.
- La convención documentada donde corresponda según la política.

## Criterios de calidad

- La política está justificada contra el acoplamiento real de los conjuntos y contra quién consume las versiones.
- Cada manifiesto de paquete tiene una versión coherente con la política decidida.
- El changelog y `liberar-version` reflejan la decisión: si hay varias versiones, cómo se anota cada una; si hay una sola, qué significa para los paquetes.

## Procedimiento sugerido

1. Presentar la decisión de política con sus implicaciones al usuario —tren compartido o cadencia independiente— y registrar la elegida.
2. Adaptar `liberar-version` y el changelog a la política: fuentes de versión, secciones y etiquetas.
3. Alinear los manifiestos con la política y documentar la convención.

## Notas

- La cadencia de liberación por conjunto queda fuera del conjunto: esta pieza decide la política y deja la mecánica lista, no opera liberaciones independientes.
