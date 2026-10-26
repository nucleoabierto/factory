# Reglas de las series numeradas

Reglas del artefacto «serie numerada»: la numeración continua de los archivos de un directorio —tareas y propuestas `NNN`, decisiones `DNNN`, épicas e ideas `NNN`, borradores `MM` dentro de una propuesta—. No es un documento sino una regla de cómputo sobre el directorio. Hogar: `actualizar-artefactos` —la consume la promoción de `propuesta.md`—; la consume también `consultar-artefactos`, que la expone como consulta, por referencia cruzada —`../actualizar-artefactos/references/series.md`—.

## Literales

- El ancho por defecto de la numeración es `3` dígitos; el de los borradores de una propuesta, `2`.
- Los literales llevan los valores por defecto de la convención; un proyecto que difiere los edita aquí.

## Operación de lectura

### `siguiente [prefijo] [ancho]` sobre `<directorio>`

El siguiente número de la serie del directorio: el mayor número entre los nombres de archivo `<prefijo><dígitos>…`, más uno, emitido como `<prefijo>` seguido del número rellenado con ceros a `<ancho>` dígitos —por defecto `3`—. El prefijo es vacío salvo que la serie lo declare —`D` en las decisiones—; cuando solo interesa el ancho, el prefijo se pasa vacío.

- Solo cuentan los archivos del directorio, sin subdirectorios, que casan `<prefijo><dígitos>` al inicio del nombre.
- Directorio sin entradas de la serie: el primero —`001`, `D001`, `05` según prefijo y ancho—.
- Directorio ausente: fallo.
- Ejemplos: `121` para `docs/tasks`, `D034` para `docs/decisions` con prefijo `D`, `05` para los borradores de una propuesta con ancho `2`.
