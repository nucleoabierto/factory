# Revisión de revisar-redaccion.md

Aplicación de los skills `revisar-redaccion.md` y `pulir-escritura.md` sobre el archivo `revisar-redaccion.md`.

## Contexto

- **Propósito inferido:** servir como guía operativa para que un agente revise la redacción de textos en español desde la perspectiva del estilo, con sugerencias de reformulación y sin modificar el original.
- **Audiencia destinataria inferida:** agentes automatizados o personas que ejecutan tareas de revisión editorial.

## Evaluación del tono

- **Tono actual:** instructivo, directo, formal pero accesible. Predominan imperativos en infinitivo ("Recorrer", "Anotar", "Indicar") y construcciones impersonales con "se". El tono es adecuado al propósito y la audiencia.
- **Tono recomendado:** mantener el tono actual (claro y directo, formal pero accesible), con mayor consistencia entre imperativos infinitivistas e impersonales.
- **Desviaciones:** mezcla ocasional de imperativos en infinitivo con impersonales "se" en secciones adyacentes, lo que produce una ligera irregularidad tonal. No compromete la comprensión.

## Hallazgos de la revisión de redacción

### Nivel discursivo

| # | Ubicación | Problema | Principio infringido | Severidad | Sugerencia |
|---|-----------|----------|----------------------|-----------|------------|
| 1 | "Qué revisar", "Procedimiento" paso 4, "Formato del informe" | Falta el "Nivel rítmico" completo. El documento de requisitos lo define con cuatro verificaciones (variación de longitud oracional, variación de estructura sintáctica, ritmo y propósito, fatiga del lector). El archivo no lo incluye en "Qué revisar", no lo menciona en el procedimiento y no tiene tabla en el formato del informe. | Pertinencia, Encontrabilidad, Severabilidad | Alto | Añadir subsección "Nivel rítmico" bajo "Qué revisar"; añadir "(discursivo, rítmico, morfosintáctico, léxico)" en el paso 4; añadir tabla en la plantilla del informe. |
| 2 | "Qué revisar" → "Nivel discursivo" | Faltan "Progresión narrativa" y "Pacing (ritmo del discurso)". El documento de requisitos las incluye bajo el nivel discursivo. | Pertinencia, Severabilidad | Medio | Añadir dos viñetas al final del "Nivel discursivo". |
| 3 | "Cuándo no usar" y "Qué no revisar" | Redundancia estructural sin distinción explicitada. Ambas secciones cubren el mismo territorio. La diferencia funcional es implícita. | Explicitud, Concisión | Medio | Añadir frase introductoria en "Qué no revisar" que explique la diferencia, o fusionar en una sola sección. |
| 4 | Principios 1 y 7 | Son casi idénticos sin que se reconozca la coincidencia. La separación en dos grupos sugiere que son diferentes, pero no lo son. | Consistencia terminológica, Concisión | Medio | Consolidar o reformular el principio 7 para que aporte un matiz distinto. |
| 5 | "Principios de precisión semántica (SBVR)" | El acrónimo "SBVR" no se expande ni se explica. Un agente que solo lea este archivo no podrá entender el fundamento de los principios 18-20. | Autosuficiencia, Pertinencia | Medio | Añadir frase introductoria: "SBVR (Semantics of Business Vocabulary and Business Rules, estándar de OMG) es un marco para documentar vocabularios y reglas de negocio sin ambigüedad." |
| 6 | "Cuándo no usar" (línea 11) | Referencia no resuelta a "el skill de pulido mecánico". No se explica dónde encontrarlo ni cómo invocarlo. | Autosuficiencia, Encontrabilidad | Medio | Añadir referencia concreta: "usar el skill de pulido mecánico (ver `pulir-escritura.md`)". |
| 7 | "Principios rectores" y "Qué revisar" | No hay mapeo explícito entre principios y niveles de revisión. El agente debe inferir qué principios corresponden a qué nivel. | Explicitud, Encontrabilidad | Medio | Añadir tabla de mapeo entre niveles y principios. |
| 8 | "Formato del informe" | La plantilla no incluye tabla para "Nivel rítmico" ni mecanismo claro para reportar hallazgos de tono. | Pertinencia, Encontrabilidad | Medio | Añadir "Nivel rítmico" con su tabla. Para tono, explicitar que las desviaciones se reportan en "Evaluación del tono". |
| 9 | "Principios referentes (comunes a los grandes ensayistas)" | No se nombran los ensayistas. El documento de requisitos identifica a Ortega y Gasset, Alfonso Reyes, Borges, Octavio Paz, Azorín y María Zambrano. | Autosuficiencia, Explicitud | Bajo | Añadir entre paréntesis los nombres de los ensayistas. |
| 10 | "Principio de preservación de la voz del autor" | No sigue la numeración de los anteriores (1-20). Un agente que deba citar "qué principio se infringe" no sabrá si referirlo por número o por nombre. | Orden lógico, Consistencia terminológica | Bajo | Numerarlo como principio 21. |
| 11 | "Tono" y "Formato del informe" → "Evaluación del tono" | Ambigüedad sobre dónde se reportan los hallazgos de tono. No queda claro si son "hallazgos" o van solo en la evaluación. | Explicitud, Encontrabilidad | Bajo | Añadir nota en "Tono": "Los hallazgos de tono se reportan en la sección 'Evaluación del tono' del informe." |
| 12 | "Principios referentes por alto impacto" (encabezado) | La preposición "por" es inhabitual. Lo esperable sería "de alto impacto". | Precisión léxica | Bajo | Cambiar a "Principios referentes de alto impacto". |
| 13 | "Procedimiento" paso 5 y "Formato del informe" → "Resumen" | El paso 5 (verificar coherencia global) no tiene sección dedicada en la plantilla. No queda claro dónde van los hallazgos de coherencia global. | Encontrabilidad, Explicitud | Bajo | Explicitar en el paso 5 dónde reportar los hallazgos de coherencia global. |
| 14 | "Qué no revisar" vs "Cuándo no usar" | Inconsistencia menor entre las dos listas. "Cuándo no usar" menciona "veracidad o calidad sustantiva"; "Qué no revisar" añade "originalidad". "Cuándo no usar" menciona "edición de mesa"; "Qué no revisar" no lo incluye. | Consistencia terminológica | Bajo | Unificar ambas listas para que contengan los mismos elementos. |

### Nivel morfosintáctico

| # | Ubicación | Problema | Principio infringido | Severidad | Sugerencia |
|---|-----------|----------|----------------------|-----------|------------|
| 1 | "Qué no revisar" (línea 113) | "Diseño ni maquetación" rompe la estructura paralela de la lista. El "ni" coordina negaciones, pero aquí no hay verbo negado al que subordinarse. | Orden lógico, Claridad | Medio | Cambiar a "- Diseño y maquetación." |
| 2 | "Principio de preservación de la voz del autor" (línea 62) | Oración larga con subordinación encadenada: pasivo ("se acompaña"), relativa ("que explica"), subordinada interrogativa indirecta ("por qué la claridad prevalece"). | Claridad oracional, Concisión | Bajo | Dividir en dos: "En esos casos, la sugerencia de reformulación incluye una justificación. Esta explica el conflicto y por qué la claridad prevalece." |
| 3 | "Entrada" (línea 18) | "Si no se proporciona, inferirlo y declararlo en el informe" — el agente está oculto. La construcción impersonal no revela quién infiere. | Voz activa, Claridad | Bajo | "Si no se proporciona, el agente debe inferirlo y declararlo en el informe." |
| 4 | "Salida" (línea 22) | "El informe no modifica el texto original" — metonimia confusa. Un informe no puede modificar nada; quien podría modificar es el agente. | Precisión léxica, Claridad | Bajo | "La revisión no modifica el texto original." |
| 5 | "Principios de precisión semántica (SBVR)" (líneas 57-58) | Construcciones pasivas e impersonales concentradas: "deben explicitarse", "lo que se expresa", "debe poder sostenerse". En un pasaje que define principios de claridad, la acumulación de pasivas es irónica. | Voz activa, Eficacia comunicativa | Bajo | Reformular en activa: "El agente debe explicitar las excepciones, matices y precisiones." |
| 6 | "Principios de precisión semántica (SBVR)" (línea 58) | "no requerir que el lector reconstruya" — el sujeto de "requerir" es ambiguo. ¿Quién no requiere? ¿El enunciado? ¿El autor? | Claridad oracional, Orden de componentes | Bajo | "Cada enunciado debe ser semánticamente autosuficiente: el lector no debe necesitar reconstruir información implícita dispersa." |

### Nivel léxico

| # | Ubicación | Problema | Principio infringido | Severidad | Sugerencia |
|---|-----------|----------|----------------------|-----------|------------|
| 1 | Principio 18 (línea 56) | "Severabilidad" es un anglicismo evitable. Calca el inglés "severability". En español, el término natural es "separabilidad" o "independencia". | Anglicismos evitables, Precisión léxica | Medio | "18. **Separabilidad** — Cada oración o párrafo debe poder sostenerse de forma independiente…" |
| 2 | Principio 19 (línea 57) | "Accommodation" se deja sin traducir. A diferencia de "Wholeness (Integridad)", que sí ofrece la traducción española, "Accommodation" no tiene equivalente. Inconsistencia. | Anglicismos evitables, Consistencia terminológica | Medio | "19. **Adaptación (Accommodation)** — Las excepciones, matices y precisiones deben explicitarse…" |
| 3 | "Cuándo no usar" (línea 11) y otras | "Skill" es un anglicismo sin equivalente propuesto. Puede estar asentado, pero el documento no lo explicita como préstamo aceptado. | Anglicismos evitables, Consistencia terminológica | Bajo | Mantener "skill" pero añadir en la primera aparición: "skill (destreza o habilidad operativa)" o usar "habilidad" con "(skill)" entre paréntesis. |
| 4 | "Principios rectores" (líneas 28, 37) | "Principios referentes" — uso inhabitual de "referente". En español, "referente" como adjetivo sustantivado significa "modelo o ejemplo a seguir", no "principio de referencia". | Precisión léxica | Bajo | Considerar "Principios de referencia" o "Principios guía", o definir el uso en la primera aparición. |
| 5 | Principios 18-20 (líneas 56-58) | Inconsistencia en el tratamiento de los términos SBVR. "Severabilidad" se traduce (mal), "Accommodation" no se traduce, "Wholeness" se traduce entre paréntesis. Tres estrategias distintas. | Consistencia terminológica | Bajo | Unificar: traducir todos con el original entre paréntesis —"Separabilidad (Severability)", "Adaptación (Accommodation)", "Integridad (Wholeness)". |

### Nivel rítmico

| # | Ubicación | Problema | Principio infringido | Severidad | Sugerencia |
|---|-----------|----------|----------------------|-----------|------------|
| — | — | No aplica: el nivel rítmico no está definido en el archivo revisado. Ver hallazgo 1 del nivel discursivo. | Pertinencia | Alto | Incorporar el nivel rítmico (ver hallazgo discursivo 1). |

### Tono

| # | Ubicación | Problema | Principio infringido | Severidad | Sugerencia |
|---|-----------|----------|----------------------|-----------|------------|
| 1 | "Cuándo usar", "Entrada", "Principios SBVR" | Mezcla de imperativos en infinitivo e impersonales "se". La alternancia no sigue un patrón consistente. | Intervención mínima, Eficacia comunicativa | Bajo | Unificar el modo imperativo. Usar infinitivo imperativo en instrucciones operativas y reservar "se" para enunciados descriptivos. |
| 2 | Principio 12 (línea 44) | "Intervención mínima del autor / no ostentación" — la barra diagonal crea ambigüedad. No queda claro si es un principio con dos nombres o dos principios fusionados. | Claridad, Consistencia terminológica | Bajo | Elegir un nombre: "Intervención mínima (no ostentación)" o separar en dos principios. |

## Hallazgos del pulido mecánico

### Correcciones aplicadas

| # | Ubicación | Tipo | Qué se cambió | Por qué |
|---|-----------|------|---------------|---------|
| 1 | Línea 11 ("Cuándo no usar") | Tipografía — cursivas | `skill` → `*skill*` | "Skill" es un extranjerismo no adaptado. Debe ir en cursiva. |
| 2 | Línea 22 ("Salida") | Tipografía — comillas | `"Formato del informe"` → `«Formato del informe»` | Comillas inglesas → angulares (jerarquía española). |
| 3 | Línea 133 ("Procedimiento", paso 6) | Tipografía — comillas | `"Formato del informe"` → `«Formato del informe»` | Mismo motivo. Unificación. |

### Casos dudosos señalados (sin aplicar)

| # | Ubicación | Tipo | Descripción |
|---|-----------|------|-------------|
| 1 | Línea 37 (encabezado) | Gramática / régimen | "por alto impacto" es inusual. Lo natural sería "de alto impacto". "Por" puede interpretarse como causal, por lo que no es un error inequívoco. |
| 2 | Líneas 57-58 (principios 19-20) | Tipografía — extranjerismos | "Accommodation" y "Wholeness" deberían ir en cursiva, pero aparecen en negrita en una lista donde todos los términos van en negrita. Aplicar cursiva rompería la consistencia; aplicar ambas es incompatible con las reglas de Markdown del skill. |
| 3 | Línea 113 ("Qué no revisar") | Gramática / consistencia | "Diseño ni maquetación" usa "ni", que es válido en contexto negativo pero inconsistente con los demás ítems. Alternativa: "Diseño y maquetación". |
| 4 | Líneas 83 y 85 ("Nivel morfosintáctico") | Tipografía — extranjerismo | "vs." (abreviatura del latín *versus*). La Fundéu recomienda "frente a". "vs." está asentado y no es un error inequívoco. |
| 5 | Líneas 49-52 ("Principios de lenguaje claro") | Edición de estructura — secuencia monótona | Los cuatro principios (14-17) tienen la misma estructura sintáctica y longitud casi idéntica. Se señala sin reescribir. |
| 6 | Documento completo | Formato Markdown — TOC | El documento tiene 171 líneas (~4-5 pantallas). El skill recomienda TOC en documentos de más de 3-4 pantallas. El umbral es impreciso y la estructura de encabezados facilita la navegación. |

## Resumen

- **Revisión de redacción:** 28 hallazgos (altos: 2, medios: 9, bajos: 17)
  - Por nivel: discursivo (14), morfosintáctico (6), léxico (5), rítmico (1 — omisión completa), tono (2)
- **Pulido mecánico:** 3 correcciones aplicadas, 6 casos dudosos señalados

### Observaciones generales

1. **El hallazgo más crítico es la ausencia total del "Nivel rítmico"** definido en el documento de requisitos. Esta omisión deja sin cubrir una categoría entera de análisis y se propaga a tres secciones: "Qué revisar", "Procedimiento" y "Formato del informe". Su incorporación es prioritaria.
2. **El documento presenta redundancias estructurales** entre "Cuándo no usar" y "Qué no revisar", y entre los principios 1 y 7. Estas redundancias generan ambigüedad y podrían consolidarse.
3. **La autosuficiencia del documento es limitada en tres puntos:** el acrónimo "SBVR" no se expande, la referencia al "skill de pulido mecánico" no se resuelve, y los ensayistas citados no se nombran.
4. **El tratamiento de los términos SBVR es inconsistente:** "Severabilidad" se traduce (con anglicismo), "Accommodation" no se traduce, "Wholeness" se traduce entre paréntesis. Unificar la estrategia terminológica.
5. **El tono general es adecuado.** La redacción es mayormente clara, concisa y bien organizada. Los hallazgos de severidad baja son preferencias estilísticas y de pulido.
6. **No se detectaron** problemas de gerundios impropios, acumulación de negaciones, pobreza léxica significativa ni muletillas. La calidad redaccional general es alta.
7. **El pulido mecánico encontró solo 3 correcciones objetivas** (comillas y cursivas), lo que confirma que el documento es ortotipográficamente correcto en lo sustancial.

## Lista de mejoras aplicables

Ordenadas por prioridad (primero altas, luego medias, luego bajas):

1. **[Alta]** Incorporar el "Nivel rítmico" completo en "Qué revisar", "Procedimiento" y "Formato del informe".
2. **[Alta]** Añadir "Progresión narrativa" y "Pacing" al "Nivel discursivo".
3. **[Media]** Expandir el acrónimo "SBVR" con una frase introductoria.
4. **[Media]** Resolver la referencia al "skill de pulido mecánico" con la ruta del archivo.
5. **[Media]** Añadir mapeo explícito entre principios y niveles de revisión.
6. **[Media]** Añadir tabla de "Nivel rítmico" en la plantilla del informe y explicitar dónde se reportan los hallazgos de tono.
7. **[Media]** Consolidar o reformular el principio 7 para distinguirlo del principio 1.
8. **[Media]** Distinguir explícitamente "Cuándo no usar" de "Qué no revisar" con una frase introductoria.
9. **[Media]** Cambiar "Diseño ni maquetación" por "Diseño y maquetación".
10. **[Media]** Cambiar "Severabilidad" por "Separabilidad (Severability)".
11. **[Media]** Cambiar "Accommodation" por "Adaptación (Accommodation)".
12. **[Baja]** Nombrar los ensayistas en el encabezado de "Principios referentes".
13. **[Baja]** Numerar el "Principio de preservación de la voz del autor" como principio 21.
14. **[Baja]** Cambiar "Principios referentes por alto impacto" por "de alto impacto".
15. **[Baja]** Añadir nota sobre dónde se reportan los hallazgos de tono.
16. **[Baja]** Explicitar dónde se reportan los hallazgos de coherencia global.
17. **[Baja]** Unificar las listas de "Cuándo no usar" y "Qué no revisar".
18. **[Baja]** Dividir la oración larga del "Principio de preservación de la voz del autor".
19. **[Baja]** Reformular en voz activa las construcciones impersonales de "Entrada", "Salida" y "Principios SBVR".
20. **[Baja]** Unificar el tratamiento terminológico de los tres términos SBVR.
21. **[Baja]** Aplicar cursivas a "skill" en su primera aparición.
22. **[Baja]** Cambiar comillas inglesas por angulares en las dos apariciones.
23. **[Baja]** Unificar el modo imperativo (infinitivo imperativo vs. impersonal "se").
24. **[Baja]** Resolver la ambigüedad de la barra diagonal en el principio 12.
25. **[Baja]** Considerar añadir un TOC al documento.
