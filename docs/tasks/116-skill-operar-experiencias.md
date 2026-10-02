# Crear el skill de operación de experiencias

## Estado

**[ ] Pendiente** | [~] En progreso | [r] En revisión | [x] Completada | [!] Bloqueada

## Tipo

mantenimiento

## Objetivo

Crear el skill de utilidad que ejecuta las operaciones mecánicas sobre `EXPERIENCIAS.md` mediante scripts bash propios: generación del `Id` único por timestamp con resolución de colisiones, listado y filtrado de entradas (por tarea, por estado pendiente/consolidada), anexado de una entrada con la cabecera append-only creada si el archivo no existe, y marcado quirúrgico de `Estado: pendiente` → `consolidada` solo en los `Id` indicados. El formato es estricto —un campo por línea, sin envolver— y ya hay un fallo real observado (`Id` 20260929T190800, entrada con formato envuelto) que un script habría evitado; el invariante append-only exige escritura quirúrgica. El nombre se decide en la ejecución (`operar-experiencias` tentativo).

## Dependencias

- Tarea 113 (`docs/tasks/113-delegacion-mecanica-scripts.md`): fija la decisión y el contrato de los scripts.

## Entrada

- La decisión y el contrato producidos por la tarea 113.
- El formato real de `EXPERIENCIAS.md` (cabecera append-only, `Id:`/`Tarea:`/`Estado:`/`Esperado`/`Obtenido`/`Corrección` por entrada) y los dos consumidores: `registrar-experiencias` y `consolidar-lecciones`.
- La entrada fallida existente como caso de prueba del parser tolerante.

## Resultado esperado

- `.agents/skills/<nombre>/SKILL.md` con el contrato delegado y los scripts bash en `assets/`.
- `registrar-experiencias` y `consolidar-lecciones` actualizados para delegar la generación de id, el listado de pendientes, el anexado y el marcado de consolidadas.
- Actualización del `README.md`.

## Criterios de calidad

- El `SKILL.md` cumple D004 y D005; la `description` declara capacidad, no mecánica.
- El anexado respeta el formato exacto «un campo por línea» y crea la cabecera si el archivo no existe; el marcado de consolidadas solo toca la línea `Estado:` de los `Id` dados y verifica que estaban `pendiente`.
- `Id` no encontrado produce aviso a stderr sin abortar el lote; archivo ausente produce exit 2 en lecturas y creación en escrituras.
- El contenido de las entradas lo redacta siempre el consumidor; el skill materializa, no sintetiza.
- El skill aparece en `README.md`.

## Procedimiento sugerido

1. Escribir los scripts (id, listar, anexar, marcar) probándolos sobre el `EXPERIENCIAS.md` real, incluida la entrada malformada.
2. Redactar el `SKILL.md`, revisar redacción y pulir.
3. Actualizar los consumidores y el `README.md`.

## Notas

- La detección de correcciones, la equivalencia de «misma corrección» y la clasificación de consolidación son juicio del consumidor; quedan fuera del skill.

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario: [fecha] — [Aprueba | Solicita cambios]
