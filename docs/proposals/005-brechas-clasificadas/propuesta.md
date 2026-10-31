# Brechas clasificadas: distinguir el detalle técnico de la capacidad ausente

## Estado

[ ] Borrador | **[p] Pendiente de revisión** | [a] Aprobada | [d] Descartada

## Problema

Cuando el trabajo planeado no conecta con el código, la evaluación dice cuánto falta pero no de qué naturaleza es lo que falta: un detalle de implementación que un ajuste local resuelve y una capacidad que el proyecto no tiene reciben la misma etiqueta. La consecuencia ya observada es la improvisación —trabajo puente creado al vuelo para subsanar lo que el veredicto no distinguió— y bloqueos sin trazabilidad hacia la demanda que los causó.

Afecta a quien planea y a quien decide: la brecha se trata siempre como un problema de ejecución aunque a veces sea una señal de producto —algo que falta y merecería competir por prioridad—. Ocurre cada vez que una pieza resulta parcialmente o nada conectada, y el coste es retrabajo más decisiones de producto tomadas de tapadillo dentro de la ejecución.

## Oportunidad

Resolverlo distingue la naturaleza de cada brecha en el momento del veredicto: lo que es un detalle se resuelve en su carril y lo que es una ausencia vuelve a la demanda con trazabilidad, para competir por prioridad en lugar de resolverse de tapadillo. Supera a la alternativa actual —la improvisación y la tolerancia al bloqueo sin causa declarada— en honestidad y en aprendizaje; esta solo gana en no exigir proceso alguno. Y su clasificación es además el insumo que consumen las líneas siguientes del orden decidido: la vuelta al diagnóstico de la convergencia y el umbral de lo trivial del carril.

## Forma de solución

Cuando la evaluación de una pieza planificada la declara desconectada, el veredicto deja de ser una sola etiqueta: el flujo gana un punto de decisión que clasifica la brecha —detalle de implementación o capacidad ausente— y la enruta según su naturaleza. El detalle sigue un carril técnico ligero dentro del propio trabajo; la ausencia vuelve a la demanda como idea derivada con trazabilidad a la pieza que la reveló, que queda bloqueada con su causa declarada en lugar de forzada. Categoría: paso nuevo en un flujo existente —el flujo de evaluación existe y funciona; le falta el eslabón que distingue y enruta—.

## Solución

El veredicto de la evaluación de conectividad gana una clasificación por pieza desconectada: cada brecha se declara detalle de implementación o capacidad ausente siguiendo un modelo de clasificación con criterios discriminadores, y el veredicto la emite con su destino en lugar de la etiqueta uniforme.

Las dos vías se comportan distinto según la naturaleza de la brecha: el detalle recorre un carril técnico ligero dentro del flujo de desarrollo —la restricción se declara, se listan alternativas y la decisión queda documentada en la tarea— sin montar el ciclo completo; la ausencia produce una idea persistida derivada con trazabilidad a la pieza que la reveló, que queda bloqueada con su causa declarada hasta que la demanda derivada se materialice y compita por prioridad.

## Alternativas consideradas

- Resolver toda brecha en el carril técnico: unificar el tratamiento —toda desconexión se subsana con trabajo puente—. Se descarta porque es la situación actual: las decisiones de producto siguen tomándose de tapadillo dentro de la ejecución.
- Devolver toda brecha a la demanda: toda desconexión genera una idea derivada que compite por prioridad. Se descarta porque hace pagar el ciclo completo de idea a tarea a detalles de implementación triviales —burocracia desproporcionada, el fallo contrario.
- Elevar toda brecha al usuario sin clasificar: el flujo se detiene y quien decide triage cada desconexión. Se descarta porque empuja la decisión sin el diagnóstico que la informa: el usuario recibe la brecha cruda, igual que hoy, más una puerta extra.

## Fuera de alcance

- La priorización de la idea derivada una vez entra en la demanda —ya la resuelve la maquinaria existente (revisita por «incorporación de demanda»)—; esta línea solo produce la idea con su trazabilidad.
- Los consumidores de la clasificación que vienen detrás en el orden: la vuelta al diagnóstico de convergencia plan↔requisitos y el umbral de lo trivial del carril de baja fricción.
- Reclasificar brechas ya resueltas en el pasado —el mecanismo opera sobre desconexiones nuevas.
- La ejecución automática del carril técnico ligero —sus pasos se definen en el refinamiento y su detalle en la tarea correspondiente.

## Investigaciones de apoyo

- Ninguna

## Borradores

- `01-modelo-clasificacion-brechas.md` — Modelo de clasificación de brechas
- `02-clasificacion-en-evaluacion.md` — Clasificación de brechas en la evaluación de conectividad (depende de 01)
- `03-carril-tecnico-ligero.md` — Carril técnico ligero para el detalle de implementación (depende de 01, 02)
- `04-vuelta-demanda-trazable.md` — Vuelta a la demanda de la capacidad ausente (depende de 01, 02)

## Revisión

- Usuario: [fecha] — [Aprueba | Solicita cambios | Rechaza]
