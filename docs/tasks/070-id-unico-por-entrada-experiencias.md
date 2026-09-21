# Generar un Id único por entrada en registrar-experiencias

## Estado

[ ] Pendiente | [ ] En progreso | [ ] En revisión | [x] Completada | [ ] Bloqueada

## Tipo

mantenimiento

## Objetivo

Corregir el skill `registrar-experiencias` para que cada entrada registrada genere su propio `Id` en lugar de reutilizar el timestamp de la ejecución. Hoy, varias correcciones registradas en una misma sesión comparten el mismo timestamp con precisión de segundo, lo que produce `Id` duplicados y rompe la referencia inequívoca que `consolidar-lecciones` necesita para marcar entradas consolidadas.

## Dependencias

- Ninguna

## Entrada

- El skill `.agents/skills/registrar-experiencias/SKILL.md`, en concreto el formato de la entrada y la definición del `Id`.
- La brecha detectada en la revisión de la tarea 069: dos entradas de `todo-app/EXPERIENCIAS.md` compartieron `Id: 20260921T170817` porque el timestamp se generó una sola vez para todo el lote.

## Resultado esperado

- `SKILL.md` actualizado para que el `Id` se genere por entrada (por ejemplo, tomando un timestamp nuevo antes de escribir cada una) o documente un mecanismo equivalente que garantice unicidad —sufijo, espera de un segundo entre entradas, etc.
- La explicación del formato del `Id` deja de asumir que el timestamp con precisión de segundo «es suficiente para ser único» sin condiciones.

## Criterios de calidad

- Dos entradas registradas en la misma ejecución ya no pueden compartir `Id` según el procedimiento documentado.
- El formato de la entrada sigue siendo compatible con las entradas existentes (no cambia la estructura, solo la generación del `Id`).
- No se edita retroactivamente ninguna entrada previa de `EXPERIENCIAS.md`; el cambio afecta al procedimiento.

## Procedimiento sugerido

1. Leer la sección «Formato de la entrada» del skill y localizar dónde se asume la unicidad del timestamp.
2. Elegir el mecanismo de unicidad más simple (timestamp por entrada como primera opción).
3. Actualizar el skill y verificar que el texto no deja lugar a la interpretación de un único timestamp por lote.

## Notas

- Origen: hallazgo de la re-revisión de la tarea 069 (2026-09-21). El `Id` duplicado en `todo-app/EXPERIENCIAS.md` se corrigió manualmente en esa sesión; esta tarea evita que el procedimiento lo vuelva a producir.
- El skill se enlaza desde `todo-app/.agents/skills`, así que la corrección se propaga al escenario externo automáticamente.

## Revisión

- Subagente: 2026-09-21 — Aprueba
- Usuario: 2026-09-21 — Aprueba
