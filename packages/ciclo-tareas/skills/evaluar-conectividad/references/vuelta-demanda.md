# Vuelta a la demanda

La vía que tramita la brecha que el modelo de `clasificacion-brechas.md` clasifica como «capacidad ausente»: la brecha produce una idea persistida derivada —demanda, no trabajo— con trazabilidad a la pieza que la reveló, y la pieza queda bloqueada con su causa declarada hasta que la demanda derivada se materialice. La consumen `planear-tarea` —al leer el veredicto enrutado— y `ejecutar-implementacion` —al reclasificar un detalle en el carril ligero—: ambos aplican este contrato sin reinterpretarlo.

## La idea derivada

Cada brecha «capacidad ausente» produce un archivo de idea persistida —uno por brecha— escrito directamente siguiendo las reglas de `.agents/skills/actualizar-artefactos/references/idea.md` —no hay operación de alta en el catálogo: la creación es escritura con juicio del consumidor, como en `lluvia-de-ideas`—:

- **Ubicación y nombre:** `docs/ideas/NNN-slug.md`, con la serie continua del directorio.
- **Cabecera:** `> **Fecha:**` y `> **Origen:** <referencia de la tarea> — <la pieza o brecha que la reveló>`. El «Origen» es la trazabilidad que sobrevive a la promoción: declara qué evaluación reveló la demanda.
- **`## Problema`:** el enunciado heredado de la brecha —qué falta, en términos de la pieza, sin lenguaje de solución—.
- **`## Qué desbloquea`:** la pieza origen, liberada cuando la capacidad exista.

«Problema» y «Qué desbloquea» son el mínimo que el canal de demanda consume —`.agents/skills/lluvia-de-ideas/references/formato-idea.md` declara que deben bastar para arrancar el descubrimiento—; el resto de secciones del formato completo queda a criterio del consumidor que escribe la idea.

## Idempotencia

Una brecha ya devuelta a la demanda no produce una segunda idea: si la pieza ya figura bloqueada por la idea derivada de esa misma brecha —el campo «Origen» del directorio de ideas la delata—, no se deriva otra. La vía se aplica una vez por brecha.

## El bloqueo con causa

La pieza origen queda bloqueada en el índice de tareas con la idea derivada como bloqueante declarado —la sublista del bloqueo lleva la referencia del archivo de la idea—. El bloqueo es honesto: nombra la capacidad que falta y la demanda que la reclama —no es un bloqueo mudo—. Cuando el punto de decisión declara varias brechas ausentes, cada una produce su idea y todas figuran como bloqueantes.

## El desbloqueo

La condición de desbloqueo es la materialización: la demanda derivada se convirtió en trabajo que cubre la capacidad. La marca «Procesada en» de la idea y las tareas nacidas de su flujo son la pista de que el canal la recogió; el desbloqueo corre por la vía habitual —sin mecanismo nuevo— y al retomarse la pieza vuelve a evaluar su conectividad en el mundo donde la capacidad ya existe.

## La regla anti-doble-disparo

Persistir la idea no invoca la revisita de prioridad: la idea derivada es demanda en espera, no trabajo incorporado. La revisita le corresponde cuando se materialice —el disparador «incorporación de demanda» del canal habitual la trata entonces como a cualquier otra demanda—. La vía no crea un canal paralelo de priorización.

## El retroenlace

El consumidor puede anotar la idea derivada en la entrada enrutada de la sección de conectividad —una línea `  - Idea: docs/ideas/NNN-slug.md` bajo la brecha— para que el archivo de la tarea trace en ambos sentidos sin pasar por el índice. El retroenlace es de trazabilidad, no parte del veredicto enrutado.
