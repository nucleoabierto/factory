# D037: Brechas clasificadas y enrutadas por naturaleza

## Estado

Aceptada

## Contexto

La evaluación de conectividad declaraba una pieza `desconectada` cuando una brecha no era absorbible, y el sub-flujo reaccionaba igual ante cualquier naturaleza: una tarea puente creada al vuelo. Un detalle de implementación y una capacidad que el proyecto no tiene recibían el mismo tratamiento, y las decisiones de producto se tomaban de tapadillo dentro de la ejecución. El conjunto «brechas clasificadas» definió el modelo compartido (tarea 148) y esta decisión registra el mecanismo cableado (tarea 149).

## Decisión

Clasificamos cada brecha no absorbible en el punto de decisión de `evaluar-conectividad` —detalle de implementación o capacidad ausente— emitiendo su entrada enrutada con clase, destino y razón según el modelo compartido de `references/clasificacion-brechas.md`. El bloqueo se deriva de la clase agregada: una pieza con capacidad ausente queda bloqueada con causa declarada y vuelve a la demanda; una con solo detalle continúa y el carril ligero la resuelve en la ejecución. La duda sobre la naturaleza escala al usuario, nunca se adivina, y el alta improvisada de tarea puente desaparece.

## Justificación

Alternativas descartadas en la propuesta: tratar toda brecha en el carril técnico —reproduce el tapadillo—, devolver toda brecha a la demanda —ciclo completo para detalles triviales— y elevar toda brecha sin clasificar —puerta sin diagnóstico—. El modelo único compartido evita que el punto de decisión y las dos vías dupliquen criterios, y la escalación de la duda preserva la regla de no improvisar decisiones de producto. Como consecuencia, la demanda se materializa como idea derivada y el detalle como carril documentado —sus vías se cablean en las piezas siguientes del conjunto—, y el bloqueo por ausencia queda declarado aunque el mecanismo de la idea aterrice después.

## Referencias

- `docs/epics/006-brechas-clasificadas.md` — El conjunto que introduce el mecanismo.
- `docs/proposals/005-brechas-clasificadas/propuesta.md` — La propuesta aprobada con las alternativas consideradas.
- `.agents/skills/evaluar-conectividad/references/clasificacion-brechas.md` — El modelo compartido que el punto de decisión aplica.
- `docs/tasks/148-modelo-clasificacion-brechas.md` y `docs/tasks/149-clasificacion-en-evaluacion.md` — Las piezas que materializan la decisión.
