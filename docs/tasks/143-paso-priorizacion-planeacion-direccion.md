# Integrar la priorización como paso de la planeación de dirección

## Estado

**[ ] Pendiente** | [~] En progreso | [r] En revisión | [x] Completada | [!] Bloqueada

## Tipo

desarrollo

## Objetivo

Integrar la comparación por escenarios como paso nuevo del flujo de planeación de dirección, de modo que ordenar las líneas deje de ser orden de inserción: la planeación solicita el norte, invoca la comparación, presenta las alternativas con sus implicaciones en la puerta humana y refleja en la dirección el orden elegido junto con los atributos declarados por línea.

## Dependencias

- 142.

## Entrada

- La capacidad de comparación creada por el borrador 01.
- El skill de planeación de dirección del proyecto evaluado (en Factory: `planificar-roadmap`) y el documento de dirección que produce, con su formato de líneas.
- Las convenciones del proyecto sobre horizontes comprometidos y su reflejo en el índice de tareas.

## Resultado esperado

- La planeación de dirección incorpora la priorización objetiva como paso con su puerta humana: el orden de las líneas sale de escenarios decididos, no del orden de llegada.
- Las líneas de la dirección declaran los atributos que la comparación usa, y la decisión de orden queda registrada con su justificación.

## Criterios de calidad

- El paso se ejecuta dentro del flujo de planeación existente sin romper su contrato: la dirección sigue produciendo horizontes con justificación, ahora alimentados por la comparación.
- La puerta humana del paso presenta las alternativas completas —tabla comparada, implicaciones— y admite elegir, pulir valores o rechazar.
- El formato de las líneas de la dirección declara los atributos comparados sin duplicar la justificación prosaica existente.

## Procedimiento sugerido

1. Leer el skill de planeación de dirección y su documento producido para ubicar el punto exacto de inserción del paso.
2. Integrar la invocación de la comparación con su puerta humana y el reflejo del orden elegido en la dirección.
3. Extender el formato de las líneas para declarar los atributos comparados.
4. Actualizar las convenciones y la documentación afectadas por el paso nuevo.

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario (ejecución): [fecha] — [Aprueba | Solicita cambios]
- Usuario (cierre): [fecha] — [Aprueba | Solicita cambios]
