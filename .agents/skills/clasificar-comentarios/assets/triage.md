# Triage — PR <num>: <título>

## Estado

- fecha: <aaaa-mm-dd>
- PR: #<num> — <url>
- head triagiado: <sha>
- ronda: <1 para el documento nuevo; incrementa al acumular sobre el anterior>

## Resumen

- hilos triagiados en esta ronda: <n>
  - corregir: <n>
  - responder: <n>
  - aplazar: <n>
- preguntas abiertas: <n>

## Entradas por hilo

- `<archivo o superficie>:<línea o tema>` — «<fragmento del comentario del revisor>» (@<autor>)
  - hilo: <identificador de plataforma —`PRRT_…` para hilos de línea, el id de la review para cuerpos de review, el id del comentario para la conversación—; es la clave de deduplicación y lo que `mejorar-pr` necesita para responder o resolver>
  - veredicto: <corregir | responder | aplazar>
  - severidad: <blocker | important | nit>
  - propuesta: <corrección concreta citando el código y la regla o intención del comentario; respuesta redactada si el veredicto es responder; ausente si es aplazar —la respuesta de aplazamiento la redacta `mejorar-pr` a partir de la `razón`>
  - razón: <obligatoria cuando el veredicto es aplazar; se omite en otro caso>
  - ronda: <número de la ronda de triage en que entró la entrada —1 en el documento nuevo; en un triage acumulado, la ronda en que cada hilo se clasificó>
  - resultado: <lo escribe `mejorar-pr` al ejecutar la entrada —`corregido en <sha>`, `respondido`, `aplazado` con la referencia si se registró tarea, `resuelto en plataforma` u `omitido — <motivo>`—; la entrada nace sin este sub-ítem>

## Preguntas abiertas

- `<archivo o superficie>:<línea o tema>` — «<fragmento del comentario del revisor>» (@<autor>)
  - hilo: <identificador de plataforma —mismo formato que las entradas; hace reconocible y deduplicable la pregunta en rondas posteriores>
  - pregunta: <qué haría falta para decidir el veredicto —solo si el hilo no tiene intención clara; nunca una suposición>
