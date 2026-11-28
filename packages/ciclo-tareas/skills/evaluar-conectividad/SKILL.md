---
name: evaluar-conectividad
description: >
  Evalúa si lo que una tarea de desarrollo asume está conectado
  con el codebase real y produce un veredicto —conectada,
  parcialmente conectada o desconectada— registrado en el archivo
  de la tarea, enrutando cada brecha no absorbible según su
  naturaleza para que la falta de infraestructura se detecte
  antes de planear.
  Usar en el sub-flujo de desarrollo tras la recopilación de
  contexto y antes de la planeación, o cuando el usuario pida
  evaluar la conectividad de una tarea concreta.
  Sinónimos: evaluar conectividad, gate de conectividad,
  conectividad técnica, veredicto de conectividad.
---

# Evaluar conectividad

Instrucciones para que un agente contraste lo que una tarea de desarrollo asume contra el codebase real, registre un veredicto de conectividad en el archivo de la tarea y enrute cada brecha no absorbible según su naturaleza. La evaluación lee el contexto ya recopilado; no planea ni implementa.

## Cuándo usar

- En el sub-flujo de desarrollo, tras `recopilar-contexto` y antes de `planear-implementacion`, invocado por `planear-tarea`.
- Cuando el usuario pida evaluar la conectividad de una tarea concreta.

## Cuándo no usar

- Antes de recopilar el contexto: el gate se apoya en la sección de contexto de la tarea, no en una exploración propia.
- Para decidir si la tarea está bien formulada o priorizada: eso corresponde al ciclo de tareas y a la revisión del usuario.
- Para tareas que no modifican código: la conectividad técnica evalúa supuestos sobre el codebase.

## Entrada

- El archivo de la tarea con su objetivo, entrada, resultado esperado y la sección de contexto recopilada por `recopilar-contexto`.
- El codebase del subsistema afectado, ya identificado en el contexto.

## Salida

- La sección de conectividad agregada al archivo de la tarea, antes de la sección de revisión, con el veredicto (`conectada`, `parcialmente conectada` o `desconectada`) y su justificación breve; en el veredicto desconectada, una entrada por cada brecha no absorbible —enrutada con qué falta, su clase, su destino y la razón, o escalada al usuario con la pregunta y sin clase ni destino—.
- El veredicto y, cuando aplique, las entradas por brecha comunicados al invocador, que decide si el sub-flujo continúa o se detiene.

## Principios rectores

1. **Contrastar, no asumir:** el veredicto nace de comparar lo que la tarea necesita con lo que el codebase tiene; una necesidad sin soporte detectado no se presume cubierta.
2. **Sin reexplorar:** la evaluación parte del contexto recopilado; solo abre un archivo adicional cuando el contexto deja una duda concreta sobre la existencia de lo que la tarea asume.
3. **Tres veredictos, un registro:** el resultado es un veredicto con justificación breve en el archivo de la tarea, no un informe paralelo.
4. **El veredicto desfavorable es el propósito, no el fracaso:** declarar la tarea desconectada a tiempo —con lo que falta clasificado y enrutado— es mejor que planear sobre lo que no existe.
5. **La duda escala, no se adivina:** una brecha cuya naturaleza no se resuelve con los criterios del modelo se eleva al usuario con la pregunta formulada; una clasificación forzada es peor que una pregunta.

## Procedimiento

1. **Leer el archivo de la tarea** y su sección de contexto —cuya presencia se verifica con «las secciones de la tarea» de `consultar-artefactos`— para fijar qué asume la tarea: archivos, módulos, interfaces o patrones que el objetivo presupone.
2. **Contrastar cada supuesto con el codebase:** para cada elemento que la tarea necesita, verificar que existe y tiene la forma que la tarea espera, usando los archivos ya identificados en el contexto.
3. **Emitir el veredicto:**
   - `Conectada`: todo lo que la tarea asume existe en el codebase; el sub-flujo puede continuar a la planeación.
   - `Parcialmente conectada`: falta algo. Si lo que falta es absorbible por la propia tarea —un elemento pequeño que la implementación puede crear dentro de su alcance—, se declara en la justificación y el sub-flujo continúa. Si no lo es, el veredicto registrado es `desconectada`.
   - `Desconectada`: lo que falta no es absorbible por la propia tarea; cada brecha declarada se clasifica en el paso siguiente.
4. **Clasificar cada brecha no absorbible:** si el veredicto es `desconectada`, aplicar el modelo de `references/clasificacion-brechas.md` a cada brecha declarada y emitir su entrada enrutada —qué falta, su `Clase`, su `Destino` y su `Razón`, en la forma que el modelo declara— siguiendo sus casos límite. Una brecha que el modelo no discrimina escala al usuario con la pregunta formulada —qué falta y por qué el modelo no la resuelve— y queda sin clase ni destino hasta que el usuario la resuelve; la pieza espera, no continúa.
5. **Registrar la sección de conectividad** en el archivo de la tarea —«insertar la sección `conectividad` en la tarea», delegada en `actualizar-artefactos`; queda antes de la de revisión—: el veredicto, la justificación breve, qué falta en los veredictos parcial o desconectado y, en el desconectado, las entradas enrutadas por brecha.
6. **Informar al invocador** del veredicto y, cuando aplique, de las entradas —clase, destino y razón por brecha—, que el invocador lee para decidir si el sub-flujo continúa o se detiene.

## Finalización

El skill ha terminado cuando:

- El archivo de la tarea contiene la sección de conectividad con el veredicto y su justificación.
- En veredicto desconectada, cada brecha no absorbible tiene su entrada enrutada —o la escalación al usuario con la pregunta formulada—.

## Referencias

- `references/clasificacion-brechas.md` — El modelo que el punto de decisión aplica: las dos clases con sus criterios, la forma de la entrada enrutada y los casos límite.
