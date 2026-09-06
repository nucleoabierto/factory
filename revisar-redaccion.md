# Revisar redacción

Instrucciones para que un agente revise la redacción de un texto en español desde la perspectiva del estilo.

## Cuándo usar

Cuando se necesite un diagnóstico de redacción sobre un texto en español, con sugerencias de reformulación, sin modificar el texto original.

## Cuándo no usar

- Para corregir ortografía, gramática, puntuación o tipografía: usar el skill de pulido mecánico.
- Para evaluar el contenido, la veracidad o la calidad sustantiva de las ideas.
- Para reescribir el texto completo o hacer edición de mesa.

## Entrada

- Un texto en español, o la ruta a un archivo que lo contenga.
- Opcionalmente, contexto sobre el propósito del texto y la audiencia destinataria. Si no se proporciona, inferirlo y declararlo en el informe.

## Salida

Un informe de revisión en formato Markdown, según la plantilla de la sección "Formato del informe". El informe no modifica el texto original.

## Principios rectores

Aplicar los siguientes principios durante la revisión. Cada hallazgo debe indicar qué principio se infringe.

### Principios referentes (comunes a los grandes ensayistas en español)

1. **Claridad** — La claridad es el fin primero de la prosa. Es la cortesía hacia el lector.
2. **Sencillez y naturalidad** — Huir de lo rebuscado y afectado.
3. **Concisión** — Decir lo necesario, no más.
4. **Precisión léxica** — La palabra exacta, no la aproximada.
5. **Orden lógico** — La disposición de los elementos sigue una secuencia comprensible.
6. **Eficacia comunicativa** — El estilo se mide por su efecto en el lector, no por la destreza aparente.

### Principios referentes por alto impacto

7. **La claridad es una cortesía hacia el lector** — Escribir claro es tratar al lector con consideración.
8. **Autosuficiencia del enunciado** — Cada enunciado debe decir todo lo que significa.
9. **Explicitud de matices y excepciones** — Las salvedades se enuncian, no se sobreentienden.
10. **Consistencia terminológica** — Un término, un concepto.
11. **Respeto al lector** — No abrumar con párrafos inacabables ni estructuras que hacen perder el hilo.
12. **Intervención mínima del autor / no ostentación** — El estilo no debe llamar la atención sobre sí mismo; la forma sirve al contenido.
13. **Unidad de pensamiento y expresión** — Coherencia entre la idea y su forma.

### Principios de lenguaje claro (ISO 24495-1 / UNE-ISO 24495-1:2024)

14. **Pertinencia** — El lector obtiene la información que necesita.
15. **Encontrabilidad** — El lector localiza fácilmente lo que busca.
16. **Comprensibilidad** — El lector entiende lo que encuentra.
17. **Utilidad** — El lector puede usar la información.

### Principios de precisión semántica (SBVR)

18. **Severabilidad** — Cada oración o párrafo debe poder sostenerse de forma independiente, pero el texto completo debe ser coherente como unidad.
19. **Accommodation** — Las excepciones, matices y precisiones deben explicitarse. No hay semántica oculta: lo que se expresa es exactamente lo que se obtiene.
20. **Wholeness (Integridad)** — Cada enunciado debe ser semánticamente autosuficiente; no requerir que el lector reconstruya información implícita dispersa.

### Principio de preservación de la voz del autor

La revisión preserva la voz y el estilo del autor como principio general. **Cuando la voz del autor entra en conflicto con la claridad, la claridad tiene prioridad.** En esos casos, la sugerencia de reformulación se acompaña de una justificación que explica el conflicto y por qué la claridad prevalece.

## Qué revisar

Recorrer el texto párrafo por párrafo, de forma exhaustiva, y detectar problemas en los siguientes niveles.

### Nivel discursivo

- **Estructura y orden:** ¿la organización de las ideas sigue un orden lógico? ¿La progresión temática es clara?
- **Coherencia:** ¿las ideas se relacionan sin contradicciones? ¿El hilo argumental es seguible?
- **Cohesión:** ¿la conexión entre párrafos y oraciones es fluida (conectores, referencias, transiciones)?
- **Unidad de párrafo:** ¿cada párrafo desarrolla una idea principal y no mezcla temas dispares?
- **Información encontrable:** ¿la estructura permite al lector localizar fácilmente la información que busca?
- **Autosuficiencia del enunciado:** ¿cada oración o párrafo puede entenderse por sí mismo sin requerir que el lector reconstruya información implícita dispersa?
- **Explicitud de matices y excepciones:** ¿hay afirmaciones que entran en tensión o contradicción con otras partes del texto sin que el matiz o la excepción se hagan explícitos?

### Nivel morfosintáctico

- **Claridad oracional:** ¿hay oraciones excesivamente largas, con subordinación abundante o incisos que dificultan la lectura?
- **Concisión:** ¿hay oraciones infladas, circunloquios o elementos superfluos que alargan sin aportar significado?
- **Orden de componentes:** ¿el orden de los elementos oracionales es natural y no genera ambigüedad?
- **Voz activa vs. pasiva:** ¿hay uso innecesario de voz pasiva o construcciones impersonales que oscurecen al agente?
- **Gerundios, infinitivos y participios:** ¿hay usos impropios o abusivos?
- **Verbos vs. sustantivación:** ¿hay nominalismos (sustantivos derivados donde un verbo sería más directo)?
- **Verbo principal conjugado:** ¿cada oración tiene un verbo principal claramente conjugado?
- **Acumulación de negaciones:** ¿hay construcciones con negaciones encadenadas que dificultan la comprensión?

### Nivel léxico

- **Precisión léxica:** ¿hay palabras imprecisas o de significado demasiado general (elemento, tema, factor, problema…) cuando existe una alternativa más específica?
- **Redundancias:** ¿hay expresiones repetitivas o conceptos duplicados innecesariamente?
- **Muletillas y vicios léxicos:** ¿hay fórmulas recurrentes sin función comunicativa?
- **Pobreza léxica:** ¿hay repetición excesiva de las mismas palabras cuando existen sinónimos adecuados?
- **Tecnicismos innecesarios:** ¿hay jerga o tecnicismos que la audiencia destinataria puede no comprender y que podrían sustituirse o explicarse?
- **Anglicismos evitables:** ¿hay calcos o préstamos del inglés cuando existe una alternativa natural en español?
- **Lenguaje inclusivo:** ¿el uso del lenguaje es inclusivo y no sexista de forma natural y adecuada?
- **Consistencia terminológica:** ¿un mismo término se usa con sentidos distintos, o conceptos distintos se nombran con el mismo término, generando ambigüedad?

### Tono

- **Adecuación:** ¿el tono del texto es apropiado para el propósito y la audiencia?
- **Propuesta:** sugerir un tono recomendado (p. ej., claro y directo, formal pero accesible, etc.) y señalar los fragmentos donde el tono se desvía.

## Qué no revisar

- Ortografía (faltas, tildes, mayúsculas).
- Gramática (concordancias, tiempos verbales, etc.).
- Puntuación (signos de puntuación).
- Tipografía (comillas, cursivas, negritas, versalitas).
- Contenido (veracidad, originalidad, calidad sustantiva de las ideas).
- Reescritura completa del texto.
- Diseño ni maquetación.

## Categorías de severidad

- **Alto:** el problema impide o dificulta seriamente la comprensión del texto.
- **Medio:** el problema afecta la fluidez o la precisión, pero el texto es comprensible.
- **Bajo:** el problema es menor o de preferencia estilística; su corrección mejora el texto pero no es imprescindible.

## Procedimiento

1. **Leer el texto completo** una vez, sin anotar, para captar el propósito, la audiencia y el tono general.
2. **Inferir el contexto** (propósito y audiencia) si no se proporcionó. Declararlo explícitamente en el informe.
3. **Evaluar el tono** actual y decidir un tono recomendado.
4. **Recorrer el texto párrafo por párrafo** y aplicar las verificaciones de cada nivel (discursivo, morfosintáctico, léxico). Para cada hallazgo:
   - Anotar la ubicación (párrafo y/o fragmento citado).
   - Describir el problema.
   - Indicar el principio que se infringe.
   - Asignar la severidad.
   - Proponer una sugerencia de reformulación concreta.
5. **Verificar la coherencia global** al terminar el recorrido: contradicciones entre partes, términos usados con sentidos distintos, información implícita que el lector tendría que reconstruir.
6. **Redactar el informe** siguiendo la plantilla de la sección "Formato del informe".
7. **No modificar el texto original.**

## Formato del informe

```
# Revisión de redacción: [título o identificador del texto]

## Contexto
- Propósito inferido: ...
- Audiencia destinataria inferida: ...

## Evaluación del tono
- Tono actual: ...
- Tono recomendado: ...
- Desviaciones: ...

## Hallazgos

### Nivel discursivo
| # | Ubicación | Problema | Principio infringido | Severidad | Sugerencia |
|---|-----------|----------|----------------------|-----------|------------|
| 1 | §3        | ...      | Claridad             | Alto      | ...        |

### Nivel morfosintáctico
| # | Ubicación | Problema | Principio infringido | Severidad | Sugerencia |
|---|-----------|----------|----------------------|-----------|------------|
| 1 | §1        | ...      | Concisión            | Medio     | ...        |

### Nivel léxico
| # | Ubicación | Problema | Principio infringido | Severidad | Sugerencia |
|---|-----------|----------|----------------------|-----------|------------|
| 1 | §2        | ...      | Precisión léxica     | Bajo      | ...        |

## Resumen
- Hallazgos por nivel: discursivo (X), morfosintáctico (Y), léxico (Z)
- Hallazgos por severidad: altos (X), medios (Y), bajos (Z)
- Observaciones generales: ...
```
