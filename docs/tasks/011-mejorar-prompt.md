# Mejorar PROMPT.txt

## Estado

[x] Completada

## Objetivo

Mejorar `PROMPT.txt` para adaptarlo al nuevo formato de `TODO.txt` (índice de tareas individuales) y aplicar las reglas de redacción y escritura definidas en `revisar-redaccion.md` y `pulir-escritura.md`.

## Dependencias

- `docs/tasks/010-reestructurar-todo.md`

## Entrada

- `PROMPT.txt` (estado actual)
- `TODO.txt` (nuevo formato de índice)
- `revisar-redaccion.md`
- `pulir-escritura.md`

## Resultado esperado

- `PROMPT.txt` actualizado con instrucciones que reflejan el nuevo formato de `TODO.txt` (referencias a archivos individuales en `docs/tasks/`).
- `PROMPT.txt` pulido según las reglas de redacción y escritura.

## Criterios de calidad

- Las instrucciones de `PROMPT.txt` referencian correctamente el nuevo formato de `TODO.txt`.
- No quedan instrucciones obsoletas que asuman que las descripciones de tareas están en `TODO.txt`.
- El archivo pasa el pulido mecánico sin correcciones pendientes.
- El archivo pasa la revisión de redacción sin hallazgos altos o medios.

## Procedimiento sugerido

1. Leer `PROMPT.txt` y `TODO.txt`.
2. Actualizar las instrucciones para reflejar el nuevo formato.
3. Aplicar `pulir-escritura.md` sobre `PROMPT.txt`.
4. Aplicar `revisar-redaccion.md` sobre `PROMPT.txt`.
5. Corregir los hallazgos.

## Notas

- Pendiente de ejecución.
