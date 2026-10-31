# PRD — Brechas clasificadas

Cuando el trabajo planeado no conecta con el código, el veredicto no distingue entre un detalle de implementación y una capacidad ausente, y la improvisación lo subsana todo. Este conjunto clasifica cada brecha y la enruta según su naturaleza, para que las decisiones de producto dejen de tomarse de tapadillo dentro de la ejecución.

## Usuarios

Quien planea y decide sobre el producto —un perfil de gestión— y el agente que ejecuta el flujo de desarrollo.

## Casos de uso

- **CU-1 — Brecha clasificada en la evaluación:** al declarar una pieza desconectada, el sistema emite su naturaleza —detalle de implementación o capacidad ausente— y su destino.
  - Borde: una brecha que el modelo no discrimina escala al usuario, no se adivina.
- **CU-2 — Detalle resuelto en el carril ligero:** la brecha-detalle se resuelve dentro del trabajo en curso con restricción declarada, alternativas y decisión documentada.
  - Borde: si al resolverlo el detalle resulta una ausencia, se reclasifica y toma la vía de demanda.
- **CU-3 — Ausencia devuelta a la demanda:** la brecha-ausencia produce una idea derivada con trazabilidad a la pieza que la reveló, que queda bloqueada con causa declarada.
  - Borde: la idea compite por prioridad por el canal habitual de la demanda, sin mecanismo paralelo ni disparo duplicado.

## Comportamiento esperado

- **Clasificación:** toda pieza desconectada recibe clase y destino declarados; ninguna sale con la etiqueta uniforme.
- **Trazabilidad:** la idea derivada referencia su pieza origen; el bloqueo declara su causa.
- **Proporcionalidad:** el detalle no paga el ciclo completo; la ausencia no se resuelve en silencio.
- **Escalación:** la duda sobre la naturaleza de la brecha se eleva al usuario.

## Criterios de éxito

- Los veredictos distinguen naturaleza y destino por pieza desconectada.
- Las decisiones de producto vuelven a la demanda con trazabilidad, no se improvisan dentro de la ejecución.
- Los detalles se resuelven sin ciclo completo y sin improvisación invisible.

## Fuera de alcance

- Priorizar la idea derivada una vez entra en la demanda —maquinaria existente.
- Los consumidores de la clasificación de las líneas siguientes: convergencia plan↔requisitos y carril de baja fricción.
- Reclasificación retroactiva de brechas ya resueltas.
- Clasificación automática por umbrales —la discriminación es juicio con criterios declarados, no cómputo.
