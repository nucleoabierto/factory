---
name: consolidar-lecciones
description: >
  Consolida las experiencias pendientes de EXPERIENCIAS.md agrupándolas por
  temas en notas de lecciones aprendidas bajo docs/lessons/.
  Usar cuando el usuario lo pida, en una sesión independiente de la que
  produjo las experiencias.
  Sinónimos: consolidar experiencias, generar lecciones, destilar
  experiencias, crear notas de lecciones.
---

# Consolidar lecciones

Instrucciones para que un agente tome las experiencias pendientes de `EXPERIENCIAS.md`, las agrupe por temas y genere notas individuales de lecciones aprendidas en `docs/lessons/`. Lo ejecuta el usuario en una sesión independiente.

## Cuándo usar

- Cuando el usuario pida consolidar las experiencias acumuladas en lecciones.
- Cuando `EXPERIENCIAS.md` acumule suficientes entradas pendientes como para extraer temas.

## Cuándo no usar

- Para registrar correcciones nuevas: eso corresponde al skill `registrar-experiencias`.
- Cuando no hay entradas con `Estado: pendiente` en `EXPERIENCIAS.md`.
- En la misma sesión que produjo las experiencias: la consolidación es deliberada y se beneficia de distancia; la ejecuta el usuario en sesión independiente.

## Entrada

- `EXPERIENCIAS.md` con una o varias entradas `Estado: pendiente`.
- `docs/lessons/` y su índice `docs/lessons/README.md`, si ya existen.

## Salida

- Notas de lecciones en `docs/lessons/<tema>.md`, una por tema, con lecciones redactadas en lenguaje natural imperativo y sus disparadores.
- `docs/lessons/README.md` actualizado como índice de temas y disparadores.
- Las entradas consolidadas marcadas como `Estado: consolidada` en `EXPERIENCIAS.md`, sin borrarlas.

## Principios rectores

1. **Evidencia intacta:** `EXPERIENCIAS.md` es append-only; las entradas consolidadas se marcan, no se borran. `docs/lessons/` es la capa derivada: las notas pueden reescribirse, fusionarse o retirarse porque la evidencia persiste.
2. **Agrupar por tema, no por tarea:** varias experiencias de tareas distintas pueden formar una sola lección si apuntan al mismo tema.
3. **La lección es imperativa y autocontenida:** una frase que diga qué hacer, seguida del porqué (la brecha que la originó). El lector futuro es un agente que no vivió la corrección.
4. **Los disparadores son el contrato de descubrimiento:** cada lección declara cuándo aplica (patrones de archivo, de comando o palabras clave de la tarea), porque la recuperación es léxica.
5. **Validar la agrupación con el usuario:** elegir temas y decidir fusiones es un juicio; el usuario lo aprueba antes de escribir notas.

## Procedimiento

1. **Leer `EXPERIENCIAS.md`** y listar las entradas con `Estado: pendiente`. Si no hay, informar y terminar.
2. **Proponer una agrupación por temas** y presentarla al usuario: para cada tema, el título de la nota y las experiencias que contiene. Si el usuario ajusta, repetir.
3. **Para cada tema**, crear o actualizar `docs/lessons/<tema>.md` con las lecciones en el «Formato de la nota»: regla imperativa, porqué, disparadores y origen (los `Id` de las experiencias que la originaron).
4. **Revisar las lecciones existentes** del tema: fusionar las que digan lo mismo, reescribir las que una experiencia nueva contradiga y mantener el resto.
5. **Actualizar `docs/lessons/README.md`** con una entrada por tema, siguiendo el formato declarado en el comentario del propio índice.
6. **Marcar las entradas consolidadas** cambiando `Estado: pendiente` a `Estado: consolidada` en `EXPERIENCIAS.md`, sin tocar nada más de la entrada. Si el usuario aprobó la agrupación solo en parte, marcar únicamente las entradas que efectivamente quedaron en notas; el resto permanece `pendiente`.
7. **Informar al usuario** de las notas creadas o actualizadas.

## Formato de la nota

```markdown
# [Tema]

## Lecciones

- **[Regla imperativa en una frase].** [Por qué: la brecha esperado-obtenido que la originó.]
  Disparadores: [patrones de archivo, de comando o palabras clave]
  Origen: AAAAMMDDTHHMMSS [, AAAAMMDDTHHMMSS, ...]
```

`Origen` lista los `Id` de las experiencias en `EXPERIENCIAS.md` que originaron la lección, separados por comas. Así se puede reconstruir cómo se generó cada lección, incluso cuando fusiona experiencias de tareas distintas.

El formato de las entradas del índice se declara en el propio `docs/lessons/README.md`, que es su fuente única de verdad.

## Finalización

El skill ha terminado cuando:

- El usuario aprobó la agrupación por temas.
- Cada tema tiene su nota en `docs/lessons/` con lecciones y disparadores.
- El índice `docs/lessons/README.md` está actualizado.
- Todas las entradas consolidadas están marcadas `consolidada` en `EXPERIENCIAS.md`, sin pérdida de información.
