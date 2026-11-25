# Política de versionado de los conjuntos

## Estado

[ ] Pendiente

## Tipo

desarrollo

## Objetivo

Decidir cómo versionan los conjuntos entre sí y qué restricciones declaran sus dependencias, de modo que cada manifiesto lleve una versión coherente con una política documentada.

## Dependencias

- 153

## Entrada

- El modelo de fronteras de la tarea 153: conjuntos y grafo de dependencias entre ellos.
- El formato: `version` obligatoria en cada manifiesto y autoridad sobre el VCS; restricción de versión por dependencia como aserción —`^x.y.z`, `~x.y.z`, exacta, comparadores, `*` o ausente (cualquiera)— que valida la versión declarada por la pieza obtenida.
- El versionado vigente del repositorio completo —referencia para el tren compartido—.

## Resultado esperado

- La política documentada: versión inicial por conjunto y reglas de evolución, con la estrategia de restricciones que los manifiestos de la tarea 155 declararán.
- La decisión registrada como decisión de diseño.

## Criterios de calidad

- La política cubre versión inicial y evolución de cada conjunto —incluidos los conjuntos base y el de composición pura, si existen—.
- Decide explícitamente sobre liberaciones independientes (fuera de alcance salvo que se apruebe lo contrario).
- La estrategia de restricciones queda decidida y es aplicable por la tarea 155 sin decisiones pendientes.
- Queda registrada como decisión de diseño.

## Procedimiento sugerido

1. Enunciar las opciones de política: tren de liberación compartido —todos los conjuntos avanzan juntos— frente a cadencias independientes por conjunto.
2. Decidir la versión inicial de cada conjunto del modelo de fronteras.
3. Decidir la estrategia de restricciones que los conjuntos declaran sobre sus dependencias del mismo árbol —qué forma de restricción usa cada declaración y qué exige actualizarla—.
4. Documentar la política: decisión de diseño registrada y referencia en la documentación del formato si aplica.

## Notas

- Fuera de alcance: escribir los manifiestos (tarea 155), adaptar las piezas (tarea 156) y mecanismos de liberación por conjunto —la política los descarta o los aplaza—.

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario (ejecución): [fecha] — [Aprueba | Solicita cambios]
- Usuario (cierre): [fecha] — [Aprueba | Solicita cambios]
