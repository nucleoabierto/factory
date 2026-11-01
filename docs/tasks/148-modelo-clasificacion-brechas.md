# Modelo de clasificación de brechas

## Estado

[x] Completada

## Tipo

desarrollo

## Objetivo

Definir el modelo que discrimina la naturaleza de una brecha —detalle de implementación frente a capacidad ausente— y la forma del veredicto enrutado que la evaluación de conectividad emite por cada pieza desconectada, de modo que los dos destinos (carril técnico ligero y vuelta a la demanda) consuman la misma clasificación.

## Dependencias

- Ninguna

## Entrada

- La propuesta `docs/proposals/005-brechas-clasificadas/propuesta.md` y la idea `docs/ideas/002-brechas-clasificadas.md`.
- El skill `evaluar-conectividad`: cómo declara hoy una pieza desconectada.
- Los precedentes del propio repositorio: trabajo puente creado al vuelo y bloqueos sin causa declarada.

## Resultado esperado

- Un documento de referencia del modelo —en el `references/` del consumidor que lo aplica— con las dos categorías, los criterios que las discriminan, la forma del veredicto por pieza y los casos límite declarados.

## Criterios de calidad

- Cada categoría tiene un criterio discriminatorio observable en la pieza, no una intuición del evaluador.
- La forma del veredicto declara por pieza desconectada su clase y su destino, en formato que los consumidores lean sin reinterpretar.
- Los casos límite están declarados —brecha mixta, brecha dudosa— con su comportamiento (la duda escala, no se adivina).
- El documento no prescribe la implementación de las dos vías: eso es de los borradores siguientes.

## Procedimiento sugerido

1. Leer `evaluar-conectividad` para situar dónde y cómo se declara hoy una pieza desconectada.
2. Buscar en el repositorio los precedentes de brecha mal tratada (trabajo puente, bloqueos sin causa) para anclar los criterios en evidencia propia.
3. Redactar el modelo: categorías, criterios, forma del veredicto, casos límite.
4. Revisión de redacción preventiva sobre el documento final.

## Notas

- La distinción decisiva que la idea declara: un detalle se resuelve con un ajuste local dentro de la pieza; una capacidad ausente exige algo que el proyecto no tiene y que merece competir por prioridad.

## Contexto

- `evaluar-conectividad` emite hoy tres veredictos por tarea (`conectada`, `parcialmente conectada`, `desconectada`); su paso 5 describe la capacidad faltante y `planear-tarea` la da de alta como tarea puente con `crear-tareas` — el tratamiento uniforme que el problema denuncia.
- El veredicto actual ya distingue «absorbible por la propia tarea» (parcial → continúa) de «no absorbible» (desconectada → puente): la clasificación nueva refina dentro de esa frontera — un detalle y una ausencia pueden ser ambos no absorbibles como ajuste mínimo.
- Precedentes: el gate nació en `5f344cb` para no planear sobre infraestructura inexistente; las tareas puente creadas al vuelo son la improvisación observada.
- Decisión transversal de la épica: el modelo vive en un único documento de referencia — `evaluar-conectividad/references/` (quien lo aplica); las vías lo referencian cruzado como `consultar-artefactos` hace con `actualizar-artefactos`.

## Conectividad

Conectada — la tarea produce documentación dentro del paquete: el skill que lo aplica existe con formato de veredicto extensible, el consumidor y la convención `references/` están verificados. Nada falta.

## Plan técnico

- [x] Definir las dos categorías con criterio discriminatorio observable: detalle de implementación —lo que falta se resuelve con una decisión técnica dentro del alcance de la pieza y sin superficie de producto nueva— frente a capacidad ausente —el proyecto no la tiene y resolverla exige decidir alcance de producto, o excede lo que una decisión local puede absorber con responsabilidad—.
- [x] Definir la forma del veredicto enrutado: por pieza desconectada, clase + destino + razón, registrado en la sección de conectividad —que las tareas 150 y 151 consumen sin reinterpretar—.
- [x] Declarar los casos límite: brecha mixta (clase dominante, declarada), brecha dudosa (escala al usuario con la pregunta formulada, no se adivina), detalle que al resolverlo se revela ausencia (reclasifica a la otra vía).
- [x] Anclar los criterios en los precedentes del repositorio y escribir el documento en `evaluar-conectividad/references/clasificacion-brechas.md`.
- [x] Revisión de redacción preventiva sobre el documento final.

## Desviaciones del plan

- La sección «Precedentes que anclan los criterios» se eliminó: el usuario señaló que anclar el modelo al historial del proyecto (commits, tareas puente) lo hace dependiente de material que no viaja con el paquete al instalarse en otro proyecto. La motivación quedó integrada en la introducción de forma portable.

## Suite de pruebas esperada

- Dada una pieza a la que falta algo resoluble con decisión técnica local, el modelo la clasifica «detalle» con criterio observable (CU-2). (I)
- Dada una pieza que depende de una capacidad inexistente, el modelo la clasifica «capacidad ausente» con destino «vuelta a la demanda» (CU-3). (I)
- Dada una brecha mixta o dudosa, el modelo declara su comportamiento —dominante declarado o escalación— sin adivinar (borde CU-1). (E)
- Dado el veredicto enrutado, declara por pieza clase y destino de forma que las vías consumen sin reinterpretar (CU-1). (I)
- El documento vive en `references/` del skill que lo aplica, viaja con el paquete, en vocabulario llano y listas anidadas. (regresión)

## Revisión

- Subagente: 2026-10-29 — Aprueba con menores corregidos
- Usuario (ejecución): 2026-10-29 — Aprueba
- Usuario (cierre): [fecha] — [Aprueba | Solicita cambios]
