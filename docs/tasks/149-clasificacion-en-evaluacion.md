# Clasificación de brechas en la evaluación de conectividad

## Estado

[ ] Pendiente

## Tipo

desarrollo

## Objetivo

Insertar en `evaluar-conectividad` el punto de decisión que clasifica cada pieza desconectada según el modelo: el veredicto deja de ser una etiqueta uniforme y emite por pieza su clase y su destino —carril técnico ligero o vuelta a la demanda—.

## Dependencias

- 148

## Entrada

- El modelo de clasificación producido por el borrador 01.
- El skill `evaluar-conectividad` y sus consumidores en el subflujo de desarrollo.

## Resultado esperado

- `evaluar-conectividad` clasifica cada brecha detectada aplicando el modelo y su veredicto declara por pieza desconectada la clase y el destino.
- Los consumidores del veredicto quedan actualizados para leer la nueva forma; `docs/mapa-de-flujos.md` refleja el punto de decisión si el cableado cambia.

## Criterios de calidad

- Toda pieza desconectada sale del veredicto con clase y destino declarados; ninguna queda con la etiqueta uniforme anterior.
- La emisión es determinista para los consumidores: misma entrada, mismo veredicto.
- La duda no se resuelve en silencio: una brecha que el modelo no discrimina escala al usuario.
- Los veredictos anteriores al cambio no se reescriben.

## Procedimiento sugerido

1. Leer `evaluar-conectividad` completo y localizar el punto donde una pieza se declara desconectada.
2. Insertar el paso de clasificación tras la detección, consumiendo el modelo del borrador 01.
3. Declarar la forma de salida del veredicto enrutado y ajustar lo que los consumidores esperan leer.
4. Actualizar el mapa de flujos si el cableado del veredicto cambia.
5. Revisión de redacción preventiva sobre los cambios.

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario (ejecución): [fecha] — [Aprueba | Solicita cambios]
- Usuario (cierre): [fecha] — [Aprueba | Solicita cambios]
