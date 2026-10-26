# Escribir los documentos de reglas por tipo de artefacto

## Estado

**[ ] Pendiente** | [~] En progreso | [r] En revisión | [x] Completada | [!] Bloqueada

## Tipo

desarrollo

## Objetivo

Crear un documento de reglas por cada tipo de artefacto del sistema, que declare su formato —marcas, secciones, orden, forma canónica— y las operaciones de dominio que los gestores hoy resuelven con scripts bash, trasladando con precisión lo que el código de `assets/*.sh` tiene embebido: la lectura tolerante a variantes históricas y la escritura canónica.

## Dependencias

- Ninguna.

## Entrada

- Los scripts de `consultar-artefactos` —`todo.sh`, `tarea.sh`, `ideas.sh`, `indice.sh`, `series.sh`, `convencion.sh`, `convenciones.sh`— y de `actualizar-artefactos` —los mismos más `promocion.sh`—.
- Los scripts de `operar-experiencias` y `operar-changelog` con sus catálogos.
- `PERSONALIZE.md` — el catálogo de convenciones configurables— y la decisión del mecanismo vigente (D033).
- Los artefactos reales como referencia del formato vivo.

## Resultado esperado

- Un documento de reglas por tipo de artefacto —índice de tareas, archivo de tarea, propuesta, épica, idea, índices de decisiones y lecciones, registro de experiencias, changelog, series numeradas y convenciones— escrito para que un agente lea y escriba el artefacto directamente, sin script.
- Los documentos quedan ubicados donde los gestores los consumirán, declarada la regla de ubicación para artefactos compartidos por varios gestores —el índice y las tareas los operan `consultar` y `actualizar` a la vez—.

## Criterios de calidad

- Cada documento cubre formato, lectura tolerante y escritura canónica del artefacto, sin depender de lógica ejecutable.
- Toda operación del catálogo vigente de los cuatro gestores queda expresable como regla sobre algún documento; ninguna se pierde.
- Las convenciones configurables de `PERSONALIZE.md` siguen resolubles: los valores viven declarados en el documento correspondiente.
- La precisión de la escritura canónica no baja respecto a lo que los scripts imponen hoy.

## Procedimiento sugerido

1. Inventariar las operaciones del catálogo de los cuatro gestores y los formatos que cada script impone.
2. Redactar el documento de reglas de cada artefacto trasladando el conocimiento del script: gramática de líneas, marcas, secciones, formas históricas aceptadas y forma canónica de escritura.
3. Verificar cobertura operación a operación contra el catálogo.
4. Decidir y declarar la ubicación de los documentos para que no se dupliquen entre gestores.

## Notas

- El punto delicado es el artefacto compartido: `consultar` y `actualizar` operan sobre los mismos tipos; conviene un único hogar por documento de reglas —p. ej. en `references/` de `actualizar-artefactos` para escritura y formato, referenciado por `consultar`— o un directorio común. La decisión queda en la tarea.

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario (ejecución): [fecha] — [Aprueba | Solicita cambios]
- Usuario (cierre): [fecha] — [Aprueba | Solicita cambios]
