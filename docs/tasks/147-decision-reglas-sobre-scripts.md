# Registrar la decisión del mecanismo de reglas y actualizar la documentación

## Estado

**[ ] Pendiente** | [~] En progreso | [r] En revisión | [x] Completada | [!] Bloqueada

## Tipo

desarrollo

## Objetivo

Registrar la decisión de diseño que sustituye la delegación por scripts bash por documentos de reglas declarativos por tipo de artefacto —el mecanismo que D033 estableció— y actualizar la documentación del sistema para que describa el mecanismo vigente.

## Dependencias

- 146.

## Entrada

- `docs/decisions/D033-pasos-mecanicos-skills-utilidad-scripts.md` — la decisión que se sustituye.
- El resultado de las tareas 145 y 146: los documentos de reglas y los gestores migrados.
- `PERSONALIZE.md`, `docs/mapa-de-flujos.md`, `docs/definicion-proyecto.md` y las referencias a scripts en la documentación.

## Resultado esperado

- Una decisión nueva en `docs/decisions/` con el contexto —la duplicación observada de leer el artefacto e invocar el script— y la justificación del cambio; D033 queda marcada como sustituida según el mecanismo del registro.
- La documentación del sistema describe el mecanismo de reglas: mapa de flujos, definición del proyecto y catálogo de convenciones sin referencias a scripts.

## Criterios de calidad

- La decisión sigue el formato del registro —contexto, decisión, estado— y referencia a D033 como sustituida.
- No quedan referencias a scripts de `assets/` en la documentación de proceso.
- El índice de decisiones refleja la entrada nueva con sus disparadores.

## Procedimiento sugerido

1. Redactar la decisión nueva con el motivo observado y el mecanismo adoptado.
2. Marcar D033 como sustituida conforme al ciclo de vida de las decisiones.
3. Actualizar los documentos de proceso y el catálogo de convenciones.
4. Verificar referencias cruzadas a scripts en toda la documentación.

## Notas


- `PERSONALIZE.md` deja de ser el catálogo de convenciones con claves y valores: pasa a ser la guía que indica qué documento de reglas —o qué skill consumidor— contiene cada literal personalizable, para que el instalador edite cada archivo individualmente en lugar de reescribir un `convenciones.sh` central.

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario (ejecución): [fecha] — [Aprueba | Solicita cambios]
- Usuario (cierre): [fecha] — [Aprueba | Solicita cambios]
