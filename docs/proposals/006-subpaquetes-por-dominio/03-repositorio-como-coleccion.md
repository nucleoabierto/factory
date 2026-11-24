# Borrador: Repositorio como colección de paquetes

> **Estado:** borrador — pendiente de aprobación de la propuesta
> **Tipo:** mantenimiento
> **Depende de:** `01-modelo-fronteras-conjuntos.md`, `02-politica-versionado-conjuntos.md`

## Objetivo

Expresar la división del modelo de fronteras en la estructura física del repositorio: la raíz como índice de conjuntos y cada conjunto como paquete con manifiesto propio —identidad, versión según la política, mapa de instalación, precondiciones, personalización y dependencias declaradas—.

## Contexto y enfoque

- En el formato, la raíz de una colección es un índice no instalable (`"collection": true` + `packages`); cada paquete es un directorio con manifiesto que declara `name`, `version`, `install` y dependencias sobre otros miembros del mismo árbol por nombre. Un paquete de composición pura —dependencias sin `install`— es válido y reproduce la adopción completa.
- El `source` de una entrada `install` no puede salir de su paquete —lo que instala vive físicamente en su directorio—; las dependencias no se instalan por `source` sino por resolución transitiva.
- Las 45 piezas se reubican a la estructura de conjuntos; el mapa actual por pieza se conserva dentro de cada conjunto; los `target` de destino se mantienen para compatibilidad.
- Decisiones previas: la de gestores e instrumentación autocontenidos se evalúa en el modelo; el formato técnico de referencia para paquetes existe.

## Plan de trabajo

- [ ] Crear la estructura: raíz colección (`"collection": true` + `packages`) y un directorio por conjunto con las piezas del modelo.
- [ ] Generar el manifiesto de cada conjunto: `name` (igual al directorio), `version` inicial según política, `install` (rutas de sus piezas), `requires.paths`, `personalization` y `dependencies` sobre los conjuntos que el grafo del modelo declara —del mismo árbol, con las restricciones de la política—.
- [ ] Materializar el conjunto de composición pura si el modelo lo declara: manifiesto sin `install` cuyas `dependencies` reúnen la colección entera.
- [ ] Ajustar `personalization`, `docs/` y el README a la nueva estructura.

## Entregable

El repositorio reestructurado como colección de paquetes válidos con sus dependencias declaradas, listo para la adaptación de contenido del borrador siguiente.

## Criterios de aceptación

- El manifiesto raíz es colección válida y lista todos los conjuntos.
- Cada conjunto tiene manifiesto válido: `name` igual al directorio, `version` según política, `install` no vacío salvo composición pura, y `dependencies` fieles al grafo del modelo.
- Ningún `source` sale de su paquete; el contenido que cada conjunto instala —con sus dependencias— contiene lo que sus piezas necesitan.
- La estructura instalable por conjunto queda verificable por instalación en destino de prueba.

## Fuera de alcance

- Adaptar el contenido de las piezas (borrador 04).
- Verificar la instalación de conjunto por conjunto (borrador 05).
