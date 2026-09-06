# Revisión de pulir-escritura.md

Aplicación de los skills `revisar-redaccion.md` y `pulir-escritura.md` sobre el archivo `pulir-escritura.md`.

## Contexto

- **Propósito inferido:** servir como guía operativa para que un agente pula mecánicamente textos en español, corrigiendo aspectos normativos y técnicos sin alterar el estilo ni el contenido.
- **Audiencia destinataria inferida:** agentes de IA o personas que ejecutan tareas de corrección ortotipográfica y de formato. Audiencia técnica, familiarizada con normas de la RAE/Fundéu y con Markdown.

## Evaluación del tono

- **Tono actual:** instructivo y formal en la mayor parte del documento, con tres registros coexistentes: tercera persona impersonal («se corrige», «no evalúa») en las secciones descriptivas; infinitivo («Leer», «Recorrer») en el procedimiento; e imperativo de tú («usa», «deja», «no mezcles») en la sección de formato Markdown.
- **Tono recomendado:** uniformar a un único registro. Dado el carácter de guía operativa para agentes, se recomienda mantener la tercera persona impersonal (o el infinitivo) en todo el documento y eliminar el imperativo de tú de la sección de Markdown.
- **Desviaciones:** la sección «Formato Markdown» cambia al imperativo de tú de forma abrupta, rompiendo la consistencia de registro del resto del documento. Es la desviación tonal más notable.

## Hallazgos de la revisión de redacción

### Nivel discursivo

| # | Ubicación | Problema | Principio infringido | Severidad | Sugerencia |
|---|-----------|----------|----------------------|-----------|------------|
| 1 | "Edición objetiva de estructura" vs "Qué corrige" | La sección aparece dentro de "Qué corrige", pero varias acciones son señalamiento, no corrección ("señala sin reescribir", "señala para posible fusión"). El título no cubre la acción de señalar. | Coherencia, Consistencia terminológica | Medio | Renombrar la sección superior a "Qué corrige y señala", o mover "Edición objetiva de estructura" a una sección propia. |
| 2 | "Qué no corrige": "Estructura del discurso" y "Reescritura" | Redundancia: ambos puntos mencionan "partir párrafos largos" y "señalar oraciones excesivamente largas" como acciones que sí se hacen, con la salvedad de que no se reescribe. | Concisión, Unidad de párrafo | Medio | Fusionar ambos puntos en uno solo. |
| 3 | "Casos dudosos" (criterios de aplicación) vs "Gramática evidente" | El criterio de señalar casos dudosos se formula dos veces con palabras casi idénticas. | Concisión, Explicitud | Bajo | Eliminar la repetición en "Gramática evidente" y remitir al criterio general. |
| 4 | "Edición objetiva de estructura" vs "Qué no corrige" → "Estilo" | Tensión no explicitada: "Estilo" declara que no se evalúa la concisión, cohesión ni tono, pero "Edición objetiva de estructura" detecta "secuencias monótonas" y "oraciones excesivamente largas", aspectos que rozan lo estilístico. | Explicitud, Coherencia | Medio | Añadir salvedad explícita: "Estas detecciones se basan en umbrales objetivos y no constituyen juicio estilístico." |
| 5 | "Formato Markdown" | Cambio abrupto de registro: se pasa de la tercera persona impersonal al imperativo de tú ("usa", "deja", "no mezcles", "redúcelos", "incluye", "prefiere", "elige", "mantén"). | Coherencia, Intervención mínima | Medio | Uniformar al registro del resto: "usa" → "se usa"; "deja" → "se deja"; etc. |
| 6 | "Procedimiento" paso 3 | El paso 3 ("Señalar los casos dudosos") se separa del paso 2, pero los pasos 2.1-2.6 ya implican señalamiento. La separación cronológica no queda clara. | Orden lógico, Claridad | Bajo | Integrar el señalamiento dentro del paso 2 como acción transversal. |

### Nivel rítmico

| # | Ubicación | Problema | Principio infringido | Severidad | Sugerencia |
|---|-----------|----------|----------------------|-----------|------------|
| 1 | Ortografía, Gramática, Puntuación, Tipografía | Secuencias de viñetas con la misma estructura sintáctica (verbo "corrige" + objeto) repetida en series de 4, 8, 4 y 8 elementos. Efecto metrónomo. | Fatiga del lector, Variación de estructura | Bajo | Alternar el verbo rector: "normaliza", "unifica", "elimina", "ajusta". |
| 2 | "Edición objetiva de estructura", viñetas de párrafos | Tres viñetas consecutivas con oraciones de 40+ palabras cada una, alta densidad informativa, subordinación abundante e incisos parentéticos anidados. | Fatiga del lector, Pacing | Medio | Fragmentar cada viñeta en dos oraciones más cortas. |

### Nivel morfosintáctico

| # | Ubicación | Problema | Principio infringido | Severidad | Sugerencia |
|---|-----------|----------|----------------------|-----------|------------|
| 1 | "Edición objetiva de estructura", viñeta 1 | Oración de ~45 palabras con dos incisos entre paréntesis anidados y subordinación abundante. | Claridad oracional, Concisión | Medio | "Detecta párrafos que superen las 10 líneas o 150 palabras. Si existe un punto natural objetivo —cambio de idea con transición temática clara—, los parte en ese punto." |
| 2 | "Edición objetiva de estructura", viñeta 2 | Oración de ~40 palabras con subordinación de relativa y dos incisos parentéticos. | Claridad oracional | Bajo | "Detecta párrafos de una sola oración breve (menos de 10 palabras) sin función narrativa clara —ni énfasis ni transición—." |
| 3 | "Edición objetiva de estructura", viñeta 3 | El inciso parentético interrumpe el flujo oracional. | Claridad oracional, Orden | Bajo | Mover la salvedad a oración independiente. |
| 4 | "Criterios de aplicación", "Casos dudosos" | La segunda oración reformula la primera: "se señala sin aplicar. El pulido mecánico no decide entre opciones válidas; solo corrige lo que es claramente erróneo." | Concisión | Bajo | Conservar solo una formulación. |
| 5 | "Gramática evidente", intro | Redundancia interna: "errores gramaticales no ambiguos, donde la forma correcta es inequívoca". "No ambiguos" e "inequívoca" expresan lo mismo. | Concisión | Bajo | "Corrige errores gramaticales inequívocos según la norma." |

### Nivel léxico

| # | Ubicación | Problema | Principio infringido | Severidad | Sugerencia |
|---|-----------|----------|----------------------|-----------|------------|
| 1 | "Formato Markdown", "Tablas vs. listas" | "Tablas con 20+ filas": notación anglicada (el sufijo "+" con valor de "o más"). | Anglicismos evitables | Bajo | "Tablas con más de 20 filas" o "Tablas de 20 o más filas". |
| 2 | "Formato Markdown", "TOC" | "TOC": acrónimo del inglés *Table of Contents*. En español, "índice" es la alternativa natural. | Anglicismos evitables | Bajo | Sustituir "TOC" por "índice" o "tabla de contenidos". |
| 3 | "Formato Markdown", "Cursivas" | "estilos inline": anglicismo. | Anglicismos evitables | Bajo | "estilos en línea" o "combinaciones de formato en un mismo fragmento". |
| 4 | "Criterios de aplicación", "Edición objetiva", "Qué no corrige" | Inconsistencia terminológica: un mismo concepto se nombra de tres formas: "criterios mecánicos objetivos", "criterios mecánicos objetivos de presentación", "reglas de edición objetivas" y "reglas de edición verificables". | Consistencia terminológica | Medio | Elegir una única denominación —"reglas de edición objetivas"— y usarla en todas las apariciones. |
| 5 | Ortografía, Gramática, Puntuación, Tipografía | Pobreza léxica: el verbo "corrige" se repite como verbo rector en la mayoría de las viñetas. | Pobreza léxica | Bajo | Introducir alternativas: "normaliza", "ajusta", "sanea", manteniendo "corrige" donde no haya alternativa natural. |
| 6 | "Formato Markdown", "TOC" | Tecnicismos de herramientas específicas sin explicación: "remark-toc, md-toc, extensión TOC de Python-Markdown". | Tecnicismos innecesarios | Bajo | Añadir una glosa breve. |

## Hallazgos del pulido mecánico

### Correcciones aplicadas

| # | Ubicación | Tipo | Qué se cambió | Por qué |
|---|-----------|------|---------------|---------|
| 1 | "Fuentes de autoridad", entradas 1-4 | Tipografía — cursivas en títulos de obras | Se separó la negrita (nombre de la fuente) de la cursiva (título de la obra) en las cuatro primeras entradas. | Los títulos de obras deben ir en cursiva. Al incluirlos dentro de la negrita se combinaban estilos inline, lo que el documento prohíbe. |
| 2 | "Ortografía", "Mayúsculas y minúsculas" | Tipografía — cursivas en título de obra | `Ortografía de la lengua española` → `*Ortografía de la lengua española*` | El título de la obra debe ir en cursiva. Inconsistencia con la referencia de "Fuentes de autoridad". |
| 3 | "Gramática evidente", "Dequeísmo y queísmo" | Tipografía — comillas → cursivas en metalenguaje | `"de que"` → `*de que*` y `"que"` → `*que*` | El documento establece que el metalenguaje debe ir en cursiva, no en comillas. Además, las comillas primarias en español son las angulares. |
| 4 | "Gramática evidente", "Verbos impersonales" | Tipografía — comillas → cursivas en metalenguaje | `"haber"` → `*haber*`, `"habían"` → `*habían*`, `"había"` → `*había*` | Mismo criterio que el cambio 3. |
| 5 | "Formato Markdown", "Encabezados" | Gramática — modo verbal | `nunca saltas niveles` → `nunca saltes niveles` | Con el adverbio "nunca" en una instrucción, el español exige el modo subjuntivo. |
| 6 | "Formato Markdown", "Cursivas" | Formato Markdown — anidación de code spans | Se corrigió la anidación de backticks para que cada término se renderice como un code span independiente. | Los backticks estaban mal anidados, creando un único code span que englobaba todo. |

### Casos dudosos señalados (sin aplicar)

| # | Ubicación | Tipo | Descripción |
|---|-----------|------|-------------|
| 1 | Línea 11 | Extranjerismo "skill" | "skill" es un extranjerismo no adaptado que debería ir en cursiva. En el contexto de agentes de IA, es un término técnico de uso extendido. No se aplica por ser una decisión de estilo. |
| 2 | "Cursivas" | Extranjerismo "inline" | "inline" es un extranjerismo no adaptado. La Fundéu recomienda "en línea", pero en el contexto de Markdown es un término técnico aceptado. No se aplica. |
| 3 | "TOC" | Necesidad de TOC | El documento tiene 125 líneas, en el límite de "más de 3-4 pantallas". Podría beneficiarse de un TOC, pero el umbral es impreciso. No se aplica. |
| 4 | "Procedimiento", lista anidada | Indentación de lista anidada | La lista anidada usa 3 espacios (para alinear con el texto tras `2. ` en CommonMark). La regla del documento dice "dos espacios", pero esa regla funciona para listas no ordenadas, no para ordenadas en CommonMark estricto. No se aplica. |
| 5 | "Entrada", "Criterios de aplicación" | Consistencia "Fundéu" vs. "FundéuRAE" | El documento usa "FundéuRAE" (nombre oficial) en la lista de fuentes, pero "Fundéu" (forma abreviada) en otros lugares. Ambas son válidas. No se aplica. |
| 6 | "Ortografía", ejemplos entre paréntesis | Posible cursiva en metalenguaje | Los pares de letras y palabras en paréntesis se usan como metalenguaje y podrían ir en cursiva. Aplicar cursiva a todos recargaría la lectura. No se aplica. |

## Resumen

- **Revisión de redacción:** 19 hallazgos (altos: 0, medios: 6, bajos: 13)
  - Por nivel: discursivo (6), rítmico (2), morfosintáctico (5), léxico (6)
- **Pulido mecánico:** 6 correcciones aplicadas, 6 casos dudosos señalados

### Observaciones generales

1. **El problema estructural más penetrante es la mezcla de registros verbales:** tercera persona impersonal, infinitivo e imperativo de tú sin transición explícita. Aunque cada sección es internamente coherente, el cambio de registro entre "Formato Markdown" y el resto resta unidad al documento.
2. **La frontera entre corrección y señalamiento no está explicitada:** el documento define "mínima intervención" pero "Edición objetiva de estructura" opera en una zona gris entre corregir y señalar. Explicitar esa frontera mejoraría la consistencia conceptual.
3. **El criterio de "casos dudosos" se enuncia tres veces:** en "Criterios de aplicación", en "Gramática evidente" y se invoca implícitamente en "Edición objetiva de estructura". Consolidarlo en un único enunciado evitaría dispersión.
4. **La inconsistencia terminológica** en la denominación de las "reglas de edición objetivas" afecta la encontrabilidad: un agente que busque el concepto no sabrá bajo qué término localizarlo.
5. **El pulido mecánico encontró 6 correcciones objetivas**, principalmente de cursivas en títulos de obras y metalenguaje, y una corrección gramatical de modo verbal. El documento es ortotipográficamente correcto en lo sustancial.

## Lista de mejoras aplicables

Ordenadas por prioridad (primero medias, luego bajas):

1. **[Media]** Renombrar "Qué corrige" a "Qué corrige y señala", o mover "Edición objetiva de estructura" a una sección propia.
2. **[Media]** Fusionar "Estructura del discurso" y "Reescritura" en "Qué no corrige".
3. **[Media]** Añadir salvedad explícita en "Edición objetiva de estructura" sobre umbrales objetivos vs. juicio estilístico.
4. **[Media]** Uniformar el registro verbal: eliminar el imperativo de tú de "Formato Markdown" y usar tercera persona impersonal.
5. **[Media]** Fragmentar las viñetas de "Edición objetiva de estructura" en oraciones más cortas.
6. **[Media]** Fijar una única denominación para "reglas de edición objetivas" y usarla en todas las apariciones.
7. **[Baja]** Eliminar la repetición del criterio de "casos dudosos" en "Gramática evidente".
8. **[Baja]** Integrar el señalamiento de casos dudosos dentro del paso 2 del procedimiento.
9. **[Baja]** Alternar el verbo rector en las viñetas de Ortografía, Gramática, Puntuación y Tipografía.
10. **[Baja]** Simplificar las oraciones largas de "Edición objetiva de estructura" (viñetas 2 y 3).
11. **[Baja]** Consolidar la reformulación del criterio "Casos dudosos" en una sola formulación.
12. **[Baja]** Eliminar la redundancia "no ambiguos" / "inequívoca" en "Gramática evidente".
13. **[Baja]** Cambiar "20+ filas" por "más de 20 filas".
14. **[Baja]** Sustituir "TOC" por "índice" o "tabla de contenidos".
15. **[Baja]** Cambiar "estilos inline" por "estilos en línea".
16. **[Baja]** Añadir glosa breve a las herramientas de generación automática de TOC.
17. **[Baja]** Aplicar las 6 correcciones del pulido mecánico (cursivas en títulos, metalenguaje, modo verbal, code spans).
18. **[Baja]** Considerar aplicar cursiva a "skill" como extranjerismo.
