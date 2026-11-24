# Borrador: Política de versionado de los conjuntos

> **Estado:** borrador — pendiente de aprobación de la propuesta
> **Tipo:** desarrollo
> **Depende de:** `01-modelo-fronteras-conjuntos.md`

## Objetivo

Decidir cómo versionan los conjuntos entre sí y qué restricciones declaran sus dependencias, de modo que cada manifiesto lleve una versión coherente con una política documentada.

## Contexto y enfoque

- La versión es obligatoria en cada manifiesto y la que declara es autoridad sobre el VCS: no hay conjunto sin versión.
- Las dependencias del formato admiten una restricción de versión por entrada —`^x.y.z`, `~x.y.z`, exacta, comparadores, `*` o ausente (cualquiera)— como aserción: valida la versión que el manifiesto de la pieza obtenida declara; no selecciona entre versiones.
- El versionado del repositorio completo existe; los conjuntos pueden compartir un tren de liberación o tener cadencias independientes —decisión del conjunto—.
- La política define la unidad de verdad: ¿la versión del conjunto es la de su manifiesto? ¿siguen un esquema compartido?

## Plan de trabajo

- [ ] Enunciar las opciones de política: tren de liberación compartido —todos los conjuntos avanzan juntos— vs. cadencias independientes por conjunto.
- [ ] Decidir la versión inicial de cada conjunto del modelo de fronteras.
- [ ] Decidir la estrategia de restricciones que los conjuntos declaran sobre sus dependencias del mismo árbol —qué forma de restricción usa cada declaración y qué exige actualizarla—.
- [ ] Documentar la política: decisión de diseño registrada y referencia en la documentación del formato si aplica.

## Entregable

La política documentada: versión inicial por conjunto y reglas de evolución, con la estrategia de restricciones que los manifiestos del borrador 03 declararán.

## Criterios de aceptación

- La política cubre versión inicial y evolución de cada conjunto —incluidos los conjuntos base y el de composición pura, si existen—.
- Decide explícitamente sobre liberaciones independientes (fuera de alcance salvo que se apruebe lo contrario).
- La estrategia de restricciones queda decidida y es aplicable por el borrador siguiente sin decisiones pendientes.
- Queda registrada como decisión de diseño.

## Fuera de alcance

- Escribir los manifiestos (borrador 03) y adaptar las piezas (borrador 04).
- Mecanismos de liberación por conjunto —la política los descarta o los aplaza—.
