# Repositorio como colección de paquetes

## Estado

[ ] Pendiente

## Tipo

mantenimiento

## Objetivo

Expresar la división del modelo de fronteras en la estructura física del repositorio: la raíz como índice de conjuntos y cada conjunto como paquete con manifiesto propio —identidad, versión según la política, mapa de instalación, precondiciones, personalización y dependencias declaradas—.

## Dependencias

- 153
- 154

## Entrada

- El modelo de fronteras de la tarea 153 y la política de versionado de la tarea 154.
- El formato: la raíz de una colección es índice no instalable (`"collection": true` + `packages`); cada paquete declara `name`, `version`, `install` y dependencias sobre miembros del mismo árbol por nombre; la composición pura —dependencias sin `install`— es válida.
- Las 45 piezas a reubicar y el mapa de instalación actual, cuyos `target` de destino se conservan.

## Resultado esperado

- El repositorio reestructurado como colección de paquetes válidos con sus dependencias declaradas, listo para la adaptación de contenido de la tarea 156.

## Criterios de calidad

- El manifiesto raíz es colección válida y lista todos los conjuntos.
- Cada conjunto tiene manifiesto válido: `name` igual al directorio, `version` según política, `install` no vacío salvo composición pura, y `dependencies` fieles al grafo del modelo.
- Ningún `source` sale de su paquete; el contenido que cada conjunto instala —con sus dependencias— contiene lo que sus piezas necesitan.
- Cada conjunto —y la composición pura, si existe— instala en destino limpio trayendo exactamente sus piezas más sus dependencias resueltas transitivamente, y `reinstall` lo reproduce desde el registro.

## Procedimiento sugerido

1. Crear la estructura: raíz colección (`"collection": true` + `packages`) y un directorio por conjunto con las piezas del modelo.
2. Generar el manifiesto de cada conjunto: `name` igual al directorio, `version` inicial según política, `install` con las rutas de sus piezas, `requires.paths`, `personalization` y `dependencies` sobre los conjuntos que el grafo declara —del mismo árbol, con las restricciones de la política—.
3. Materializar el conjunto de composición pura si el modelo lo declara: manifiesto sin `install` cuyas `dependencies` reúnen la colección entera.
4. Ajustar `personalization`, `docs/` y el README a la nueva estructura.
5. Instalar cada conjunto —y la composición pura, si existe— en destinos limpios de prueba: verificar que la resolución trae todas las dependencias antes que los dependientes, satisface las restricciones, no encuentra ciclos y que la composición reproduce la adopción completa; comprobar `reinstall` desde el registro.

## Notas

- El `source` de una entrada `install` no puede salir de su paquete: lo que instala vive físicamente en su directorio; las dependencias no se instalan por `source` sino por resolución transitiva.
- Fuera de alcance: adaptar el contenido de las piezas (tarea 156), que cierra ejecutando cada conjunto en su frontera —la verificación funcional le pertenece—.

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario (ejecución): [fecha] — [Aprueba | Solicita cambios]
- Usuario (cierre): [fecha] — [Aprueba | Solicita cambios]
