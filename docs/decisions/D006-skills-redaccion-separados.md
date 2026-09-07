# D006: Skills de redacción separados: revisión vs. pulido

## Estado

Aceptada

## Contexto

La revisión de redacción (estilo: claridad, coherencia, tono, precisión léxica) y el pulido mecánico (ortografía, gramática, puntuación, tipografía) son tareas distintas que requieren criterios distintos. Unificarlas en un solo skill mezclaría juicios subjetivos con correcciones normativas inequívocas.

## Decisión

Mantenemos dos skills separados: `revisar-redaccion` para el estilo y `pulir-escritura` para la corrección ortotipográfica. El pulido mecánico requiere que el texto haya pasado primero por la revisión de redacción.

## Justificación

La separación de dominios evita la ambigüedad en la invocación: el agente sabe qué skill usar según el tipo de problema. Cada skill tiene sus propios principios, categorías y criterios de finalización. La dependencia ordenada (revisión antes que pulido) asegura que el pulido mecánico se aplica sobre un texto cuya redacción ya está revisada, no al revés.
