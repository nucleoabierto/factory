# Registrar decisión: todo app en vanilla JS como prueba del flujo externo

## Estado

[ ] Pendiente

## Objetivo

Registrar la decisión de diseño que adopta una todo app en vanilla JS como proyecto de validación externa de Factory: construirla de principio a fin con el propio sistema, en una subcarpeta del repositorio.

## Dependencias

- 050 (Investigar todo apps como base de trabajo)

## Entrada

- La validación externa declarada en la visión del proyecto: el producto se valida construyendo un proyecto real, no solo usándolo sobre sí mismo.
- La investigación de la tarea 050, que determina la forma esperada y la expectativa realista de la prueba.
- Búsqueda básica: TodoMVC es el estándar de facto para comparar frameworks, con especificación escrita y ejemplos vanilla JS.
- Decisión del usuario: la app se construye en vanilla JS, sin frameworks, para mantener el foco en el proceso y no en el desarrollo; el proyecto se genera en una subcarpeta, no en un repositorio independiente.

## Resultado esperado

- Una decisión de diseño D018 en `docs/decisions/` que establece: la todo app en vanilla JS como prueba de concepto del flujo externo; la subcarpeta donde se construye; qué valida (portabilidad de los skills, flujo idea → tarea → commit completo) y qué no (gestión de PRs, revisión de código, capacidades aún no construidas).

## Criterios de calidad

- La decisión sigue el formato del skill `decisiones-diseno`.
- Justifica por qué todo app (estándar de facto, especificación escrita, alcance acotado), por qué vanilla JS (foco en el proceso, no en el framework) y por qué una subcarpeta (el proyecto de prueba convive con el sistema que lo produce).
- Declara explícitamente el alcance de la validación: qué cubre y qué queda fuera.
- Referencia la visión del proyecto, la investigación de la tarea 050 y la búsqueda sobre TodoMVC.
- Pasa revisión técnica por subagente independiente.

## Procedimiento sugerido

1. Invocar el skill `decisiones-diseno` y redactar D018.
2. Someter a revisión dual.

## Notas

- La ejecución de la prueba (crear la subcarpeta, copiar skills, llevar la idea por el flujo) se registrará como tareas posteriores una vez aceptada la decisión.

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario: [fecha] — [Aprueba | Solicita cambios]
