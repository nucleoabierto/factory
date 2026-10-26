# Crear la capacidad de comparación por escenarios de las líneas

## Tipo

desarrollo

## Objetivo

Crear la capacidad que compara objetivamente las líneas de trabajo abiertas: guiada por uno o dos temas-norte que declara el usuario, puntúa cada línea sobre atributos relativos —valor, criticidad temporal, habilitación/riesgo y tamaño— con confianza y factores de incertidumbre explícitos, y produce dos o más planificaciones alternativas, cada una con sus implicaciones en beneficios y costes, para que el usuario elija y pula los valores antes de fijar el orden.

## Dependencias

- Ninguna.

## Entrada

- `docs/research/2026-10-metodos-priorizacion-lineas.md` — mecanismo recomendado: comparación relativa tipo WSJF adaptada, confianza e incertidumbre explícitas, justificación por decisión.
- El formato de las líneas de trabajo de la dirección del proyecto evaluado y las decisiones que lo rigen (en Factory: D022 y D027 del registro de decisiones).
- Los skills existentes que consumirán o compartirán dominio: la planeación de dirección y el reflector del *roadmap*.

## Resultado esperado

- Un skill nuevo —autocontenido, portable e invocable bajo demanda— que produce escenarios de priorización completos: norte declarado, tabla comparada de líneas con atributos y confianza, alternativas con implicaciones y el orden elegido con su justificación registrada.

## Criterios de calidad

- Los atributos y sus escalas quedan declarados en el skill, siguiendo la recomendación de la investigación: estimación relativa entre líneas, nunca en unidades absolutas; confianza en escala cerrada; factores de incertidumbre que escalan a revisión.
- La salida siempre ofrece al menos dos alternativas con implicaciones explícitas —beneficios y costes de cada orden—; nunca un único veredicto.
- El norte que declara el usuario guía la alineación del resto de líneas, no solo la cabeza del orden.
- La decisión queda registrada con contexto, alternativas y límites; el orden nunca se aplica sin puerta humana.
- Sigue el estándar Agent Skills y las convenciones del proyecto: cuerpo bajo 500 líneas, detalle en `references/`, sin depender de un arnés concreto.

## Procedimiento sugerido

1. Leer la investigación de apoyo y los skills hermanos de planeación de dirección y reflector, para fijar el dominio compartido —qué es una línea, un horizonte, una agrupación—.
2. Diseñar el modelo de comparación: atributos, escalas, forma de la tabla comparada, declaración del norte y formato de las alternativas con implicaciones.
3. Redactar el skill con su procedimiento: recoger líneas abiertas, declarar el norte, comparar, componer alternativas, presentar para elección y pulido, registrar la decisión.
4. Registrar la decisión de diseño del mecanismo en el registro de decisiones del proyecto.
