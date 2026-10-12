---
name: consolidar-lecciones
description: >
  Consolida las experiencias pendientes del registro de experiencias del
  proyecto agrupándolas por temas en notas de lecciones aprendidas en el
  directorio de lecciones del proyecto.
  Usar cuando el usuario lo pida, en una sesión independiente de la que
  produjo las experiencias.
  Sinónimos: consolidar experiencias, generar lecciones, destilar
  experiencias, crear notas de lecciones.
---

# Consolidar lecciones

Instrucciones para que un agente tome las experiencias pendientes del registro de experiencias del proyecto, las agrupe por temas y genere notas individuales de lecciones aprendidas en el directorio de lecciones del proyecto. Lo ejecuta el usuario en una sesión independiente.

## Cuándo usar

- Cuando el usuario pida consolidar las experiencias acumuladas en lecciones.
- Cuando el registro de experiencias acumule suficientes entradas pendientes como para extraer temas.

## Cuándo no usar

- Para registrar correcciones nuevas: eso corresponde al skill `registrar-experiencias`.
- Cuando no hay entradas pendientes en el registro de experiencias.
- En la misma sesión que produjo las experiencias: la consolidación es deliberada y se beneficia de distancia; la ejecuta el usuario en sesión independiente.

## Entrada

- El registro de experiencias del proyecto con una o varias entradas pendientes; su ubicación la resuelve `operar-experiencias`.
- El directorio de lecciones de la convención (`convencion dir_lecciones` de `consultar-artefactos`) y su índice, si ya existen.

## Salida

- Una nota de lecciones por tema en el directorio de lecciones, con lecciones redactadas en lenguaje natural imperativo y sus disparadores.
- El índice de lecciones actualizado con los temas y sus disparadores.
- Las entradas consolidadas marcadas como tales en el registro de experiencias, sin borrarlas.

## Principios rectores

1. **Evidencia intacta:** el registro de experiencias es append-only; las entradas consolidadas se marcan, no se borran. Las notas de lecciones son la capa derivada: pueden reescribirse, fusionarse o retirarse porque la evidencia persiste.
2. **Agrupar por tema, no por tarea:** varias experiencias de tareas distintas pueden formar una sola lección si apuntan al mismo tema.
3. **La lección es imperativa y autocontenida:** una frase que diga qué hacer, seguida del porqué (la brecha que la originó). El lector futuro es un agente que no vivió la corrección.
4. **Los disparadores son el contrato de descubrimiento:** cada lección declara cuándo aplica (patrones de archivo, de comando o palabras clave de la tarea), porque la recuperación es léxica.
5. **Validar la agrupación con el usuario:** elegir temas y decidir fusiones es un juicio; el usuario lo aprueba antes de escribir notas.

## Procedimiento

1. **Listar las entradas pendientes** del registro de experiencias delegando la operación `listar pendiente` de `operar-experiencias`. Si no hay, informar y terminar.
2. **Cotejar contra las lecciones existentes.** Mapear cada experiencia pendiente a las lecciones cuyos disparadores coincidan con su contenido (qué se corrigió y sobre qué archivos), con la operación `coincidencias` de `consultar-artefactos` sobre el índice de lecciones —el mismo mecanismo léxico que usa `consultar-lecciones`—. Clasificar cada experiencia: ya cubierta por una lección, refuerzo de una nota existente, contradicción con una lección, o tema nuevo.
3. **Proponer una agrupación por temas** y presentarla al usuario junto con el mapeo del cotejo: para cada tema, el título de la nota, las experiencias que contiene y su clasificación. Las contradicciones se plantean en esta misma presentación. Si el usuario ajusta, repetir.
4. **Para cada tema**, crear o actualizar la nota del tema en el directorio de lecciones con las lecciones en el «Formato de la nota»: regla imperativa, porqué, disparadores y origen (los identificadores de las experiencias que la originaron). Las experiencias ya cubiertas no generan lección nueva; las de refuerzo se integran en la nota existente añadiendo su identificador al `Origen`.
5. **Revisar las lecciones existentes** del tema: fusionar las que digan lo mismo, reescribir las que una experiencia nueva contradiga (según lo acordado en el cotejo) y mantener el resto.
6. **Actualizar el índice de lecciones** con una entrada por tema, siguiendo el formato declarado en el comentario del propio índice.
7. **Marcar las entradas consolidadas** delegando la operación `marcar` de `operar-experiencias` con los identificadores de las entradas procesadas; las ya cubiertas también se marcan, aunque no generen lección nueva. Si el usuario aprobó la agrupación solo en parte, marcar únicamente las entradas procesadas; el resto permanece pendiente.
8. **Informar al usuario** de las notas creadas o actualizadas.

## Formato de la nota

```markdown
# [Tema]

## Lecciones

- **[Regla imperativa en una frase].** [Por qué: la brecha esperado-obtenido que la originó.]
  Disparadores: [patrones de archivo, de comando o palabras clave]
  Origen: <id> [, <id>, ...]
```

`Origen` lista los identificadores de las experiencias del registro que originaron la lección, separados por comas. Así se puede reconstruir cómo se generó cada lección, incluso cuando fusiona experiencias de tareas distintas.

El formato de las entradas del índice se declara en el propio índice, que es su fuente única de verdad.

## Finalización

El skill ha terminado cuando:

- El usuario aprobó la agrupación por temas, informada por el cotejo contra las lecciones existentes.
- Cada tema tiene su nota con lecciones y disparadores.
- El índice de lecciones está actualizado.
- Todas las entradas consolidadas están marcadas en el registro de experiencias, sin pérdida de información.
