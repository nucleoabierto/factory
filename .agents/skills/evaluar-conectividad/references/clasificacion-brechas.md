# Clasificación de brechas

El modelo que `evaluar-conectividad` aplica para discriminar la naturaleza de una brecha —lo que le falta a una pieza del trabajo— y la forma del veredicto enrutado que el punto de decisión emite por cada brecha declarada. Las dos vías de resolución —el carril técnico ligero y la vuelta a la demanda— consumen este documento: aquí se decide qué es cada brecha, allá se resuelve según su clase.

La distinción anterior del veredicto —«absorbible por la propia tarea» frente a «no absorbible»— separaba cuánto falta; esta clasificación separa **de qué naturaleza** es lo que falta. Un detalle de implementación y una capacidad ausente pueden ser ambos no absorbibles como ajuste mínimo, y merecen destinos distintos.

## Categorías

Toda brecha declarada cae en una de dos clases, decididas por quién debe decidir su resolución, no por su tamaño:

- **Detalle de implementación:** lo que falta se resuelve con una decisión técnica dentro del alcance de la pieza en curso. El criterio observable: resolverlo no añade superficie de producto nueva —no crea una capacidad que otra línea pudiera querer ni exige decidir prioridad— y quien ejecuta puede elegir entre alternativas técnicas con el contexto de la tarea, sin preguntar nada sobre el producto. El carril técnico ligero lo resuelve: restricción declarada, alternativas, decisión documentada.
- **Capacidad ausente:** lo que falta es algo que el proyecto no tiene y cuya existencia es una decisión de producto. El criterio observable: resolverlo exige decidir fuera del trabajo en curso —si esa capacidad merece existir, con qué prioridad, con qué alcance— o excede lo que una decisión técnica local puede absorber con responsabilidad, por riesgo o por efecto sobre otras piezas. La vuelta a la demanda lo tramita: la brecha produce una idea derivada con trazabilidad y la pieza queda bloqueada con su causa declarada.

La pregunta discriminadora cuando el criterio no resuelve de inmediato: **¿puede quien ejecuta resolver esto con criterio técnico dentro del alcance declarado, o la resolución exige decidir algo que corresponde a la demanda?** Si la resolución compite por prioridad con otro trabajo, es demanda; si es una llamada técnica dentro de la pieza, es detalle.

## Forma del veredicto enrutado

Por cada brecha declarada, el punto de decisión emite una entrada con tres campos —los consumidores los leen sin reinterpretar—:

```markdown
- <qué falta, en términos de la pieza>
  - Clase: detalle de implementación | capacidad ausente
  - Destino: carril técnico ligero | vuelta a la demanda
  - Razón: <por qué esa clase, una frase>
```

La entrada vive en la sección de conectividad del archivo de la tarea, junto al veredicto que ya se registra. Una pieza puede declarar varias brechas, cada una con su clase y su destino.

## Casos límite

- **Brecha mixta** —parte detalle, parte ausencia—: se clasifica por el componente que bloquea primero. Si resolver la parte técnica no libera la pieza porque la capacidad sigue faltando, la clase es «capacidad ausente» y la razón declara la parte detallada que quedó identificada.
- **Brecha dudosa** —ningún criterio la resuelve—: escala al usuario con la pregunta formulada —qué falta, por qué el modelo no discrimina—. La duda nunca se adivina: una clasificación forzada es peor que una pregunta.
- **Detalle que se revela ausencia:** si al resolverlo en el carril el detalle muestra que la resolución exige decidir fuera del trabajo en curso, la brecha se reclasifica a «capacidad ausente» y toma la otra vía —la reclasificación queda declarada, no oculta.

## Precedentes que anclan los criterios

- El gate de conectividad (commit `5f344cb`) nació para no planear sobre infraestructura inexistente: su «no absorbible» es el borde que esta clasificación refina.
- Las tareas puente creadas al vuelo para subsanar desconexiones son la improvisación que el modelo elimina: antes, toda brecha no absorbible producía una tarea puente igual, fuera detalle o ausencia.
