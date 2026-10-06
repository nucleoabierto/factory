---
name: registrar-experiencias
description: >
  Registra las correcciones que el usuario hizo durante una tarea en el
  registro de experiencias del proyecto, como entradas que documentan la
  brecha entre el resultado esperado y el obtenido.
  Usar al cerrar una tarea en la que el usuario corrigió al agente, o cuando
  el usuario corrija una acción y pida que quede constancia.
  Sinónimos: registrar experiencia, anotar corrección, guardar experiencia,
  aprender de una corrección.
---

# Registrar experiencias

Instrucciones para que un agente registre las acciones que el usuario corrigió durante una tarea en el registro de experiencias del proyecto, documentando la brecha entre el resultado esperado y el obtenido.

## Cuándo usar

- Al cerrar una tarea durante la cual el usuario corrigió al agente: en la revisión final («solicita cambios»), en los comentarios del pull request de la tarea o a mitad de la sesión.
- Cuando el usuario corrija una acción del agente y pida que quede constancia.

## Cuándo no usar

- Cuando la tarea terminó sin correcciones del usuario. Sin correcciones no hay experiencia que registrar.
- En subagentes: solo la sesión donde el usuario corrige puede juzgar qué es una corrección y con qué contexto. Un subagente de revisión nunca registra experiencias.
- Para guardar una decisión de diseño: eso corresponde al skill `decisiones-diseno`.

## Entrada

- La conversación de la sesión actual, donde el usuario corrigió al agente.
- La tarea en curso o recién terminada, referenciada como `docs/tasks/NNN-slug.md`.
- El registro de experiencias del proyecto, si ya existe; su ubicación la resuelve `operar-experiencias`.

## Salida

- Una entrada por corrección, añadida al final del registro de experiencias.
- El registro creado con su cabecera append-only si no existía.

## Principios rectores

1. **Append-only:** las entradas nunca se editan ni se borran. El registro de experiencias es el log de evidencia; la consolidación posterior marca las entradas, no las elimina.
2. **Registrar la brecha, no solo la corrección:** cada entrada documenta qué se esperaba, qué se obtuvo y qué indicó el usuario. Una corrección sin brecha explicada no enseña nada al agente futuro.
3. **Lenguaje natural:** el lector futuro de cada entrada es un agente; redactar en prosa clara, no en tuplas ni jerga críptica.
4. **Solo la sesión que recibe la corrección registra:** el contexto completo de la corrección solo existe donde el usuario la emitió.
5. **Validar con el usuario:** el usuario es la fuente de la corrección; las entradas se le presentan antes de escribirlas para evitar registrar mal lo que quiso decir.

## Procedimiento

1. **Identificar las correcciones** de la sesión: revisiones donde el usuario solicitó cambios, comentarios del pull request que corrigieron el trabajo, indicaciones que desviaron el rumbo del trabajo, o peticiones explícitas de registro.
2. **Descartar lo que no es lección:** correcciones meramente mecánicas ya resueltas (una tilde, un nombre de variable) que no contienen nada transferible a tareas futuras. Ante la duda sobre si una corrección es transferible, preguntar al usuario.
3. **Redactar una entrada por corrección** con el contenido descrito en «Contenido de la entrada»: un `Id` único delegando su generación en `operar-experiencias` —operación `id`, pasando como ocupados los ya asignados a otras entradas del mismo lote—, la tarea afectada, lo esperado, lo obtenido y la corrección del usuario.
4. **Comprobar duplicados:** verificar que el registro no tenga ya una entrada equivalente (misma tarea y misma corrección) antes de añadirla, recuperando las entradas de la tarea con la operación `por-tarea` de `operar-experiencias`; el skill puede invocarse a mitad de sesión y otra vez al cierre de la tarea.
5. **Presentar las entradas al usuario** para validación. Si pide ajustes, corregir y volver a presentar.
6. **Añadir las entradas** nuevas al registro delegando la operación `anexar` de `operar-experiencias`, que crea el registro con su cabecera si no existe y fija el estado inicial de cada entrada.
7. **Informar al usuario** de las experiencias registradas.

## Contenido de la entrada

Cada entrada documenta la brecha entre lo esperado y lo obtenido: un `Id` único, la tarea afectada, qué esperaba el usuario, qué produjo el agente y la corrección que indicó. La forma escrita —un campo por línea, el `Id` por timestamp con resolución de colisiones, el estado inicial— la define y valida `operar-experiencias` al anexar; este skill solo redacta el contenido.

Una corrección genera una entrada; varias correcciones en la misma tarea generan varias entradas con la misma referencia de tarea. Las lecciones consolidadas referencian el `Id`, no la tarea, porque una tarea puede generar varias experiencias.

## Finalización

El skill ha terminado cuando:

- Las entradas validadas por el usuario están añadidas al final del registro de experiencias.
- Ninguna entrada previa fue editada ni eliminada.
- Si no había correcciones que registrar, no se escribió nada.
