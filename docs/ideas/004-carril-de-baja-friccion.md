# Carril de baja fricción: que el peso del proceso escale con el tamaño del cambio

> **Tipo:** idea de funcionalidad — tamaño conjunto (complejidad media)
> **Fecha:** 2026-10
> **Requiere:** ninguna — la más independiente; su clasificación de lo trivial puede apoyarse en `brechas-clasificadas`, pero no la exige

## Problema

Todo cambio recorre la misma maquinaria completa —pieza propia, planeación, revisión técnica y puertas humanas— sea una épica o una corrección de una línea. La fricción es proporcional al proceso, no al riesgo, así que los cambios pequeños pagan un coste desproporcionado y se acumulan o se cuelan sin registro.

Afecta a quien mantiene el proyecto —las correcciones evidentes se aplazan— y a los perfiles que quieren contribuir sin ejecutar el ciclo completo —quien ajusta un texto paga el mismo peaje que quien añade una capacidad—. Ocurre con cada cambio trivial, y el coste es mejoras pequeñas que nunca llegan y un trabajo pendiente que solo admite piezas grandes.

## Qué desbloquea

- **Proceso proporcional:** el trabajo pequeño recorre una verificación mínima acorde a su riesgo.
- **Contribución ligera:** quien no ejecuta el ciclo puede aportar cambios pequeños con garantía.
- **Foco de las puertas:** la revisión humana se reserva para lo que la merece.

## Flujos de trabajo que se hacen viables

- Una corrección evidente entra y sale sin montar la maquinaria completa, con un umbral declarado de qué cuenta como trivial.
- Un perfil de gestión ajusta documentación o textos sin convertirse en ejecutor del ciclo.
- Los cambios pequeños dejan de acumularse ni colarse sin registro.

## Ventajas como producto

- **Ritmo sostenible:** el sistema deja de castigar la mejora continua de bajo riesgo.
- **Barrera de entrada baja:** contribuir deja de exigir conocer el ciclo entero.

## Tensión que introduce en el roadmap

Cuarta de las cinco ideas del mismo origen; comparte origen con `priorizacion-declarada`, `brechas-clasificadas`, `convergencia-plan-requisitos` y `validacion-de-resultado`. Es la más independiente del conjunto —puede adelantarse si se busca alivio inmediato—; su clasificación de qué es trivial puede apoyarse en `brechas-clasificadas`, pero funciona sin ella.
