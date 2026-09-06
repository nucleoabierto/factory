# Requisitos del skill de pulido mecánico de escritura

## Propósito

El skill de pulido mecánico corrige los aspectos normativos y técnicos de un texto en español: ortografía, gramática evidente, puntuación y tipografía. Su objetivo es devolver un texto corregido, limpio y consistente, sin alterar el estilo, el contenido ni el mensaje.

Se distingue de la **revisión de redacción**, que se ocupa del estilo (claridad, coherencia, cohesión, tono, riqueza léxica). El pulido mecánico no interviene en esos aspectos estilísticos; los deja para la revisión de redacción.

## Alcance

- **Idioma:** español.
- **Tipo de texto:** textos generales (artículos, informes, correos, documentación, etc.).
- **Profundidad:** exhaustiva, recorriendo el texto completo.

## Qué recibe

- Un texto en español (o la ruta a un archivo que lo contenga).
- Opcionalmente, un libro de estilo o criterios editoriales específicos. Si no se proporciona, se aplican las normas de la RAE y las recomendaciones de la Fundéu.

## Qué devuelve

El texto corregido, con las correcciones aplicadas directamente. No se devuelve un informe separado; el resultado es el texto pulido.

## Qué corrige

### Ortografía

- **Uso de letras:** corrige errores en la representación gráfica de los fonemas (b/v, g/j, h, c/s/z, ll/y, x, etc.).
- **Tildes:** corrige acentuación errónea (faltas de tilde, tildes innecesarias, tilde diacrítica, diéresis).
- **Unión y separación de palabras:** corrige escritura incorrecta en una o varias palabras (aparte, a parte; porque, por qué; sino, si no; conque, con que; etc.).
- **Mayúsculas y minúsculas:** corrige el uso normativo de mayúsculas (iniciales, nombres propios, siglas, cargos, instituciones, topónimos) y minúsculas según la Ortografía de la lengua española (RAE-ASALE).

### Gramática evidente

Corrige errores gramaticales no ambiguos, es decir, aquellos donde la forma correcta es inequívoca según la norma. Los casos dudosos o donde caben múltiples interpretaciones se señalan sin aplicar.

- **Concordancia:** corrige errores de concordancia nominal (género y número entre sustantivo, adjetivos y determinantes) y verbal (número y persona entre sujeto y verbo).
- **Régimen verbal:** corrige errores en el régimen de los verbos (preposiciones que rigen cada verbo: depender de, consistir en, pensar en, etc.).
- **Tiempos verbales:** corrige usos incorrectos de los tiempos verbales y correlaciones temporales erróneas.
- **Dequeísmo y queísmo:** corrige "de que" innecesario y "que" sin la preposición requerida.
- **Leísmo, laísmo y loísmo:** corrige usos no admisibles de los pronombres átonos.
- **Verbos impersonales:** corrige concordancias erróneas con "haber" impersonal ("habían" por "había" + sustantivo plural) y otros verbos impersonales.
- **Formas verbales:** corrige formas verbales incorrectas (inflexiones, participios irregulares, etc.).
- **Pronombres:** corrige la colocación y forma de los pronombres átonos (enclíticos/proclíticos).

### Puntuación

- **Signos de puntuación:** corrige el uso de punto, coma, punto y coma, dos puntos, puntos suspensivos, signos de interrogación y exclamación.
- **Delimitadores:** corrige el uso de paréntesis, corchetes, rayas y comillas.
- **Comas incorrectas:** elimina comas que separan elementos que no deben ir separados (entre sujeto y verbo, entre verbo y complemento) y añade comas necesarias (incisos, vocativos, enumeraciones).
- **Posición de signos:** corrige la posición de los signos de puntuación respecto a comillas, paréntesis y corchetes.

### Tipografía y ortotipografía

- **Comillas:** unifica el uso de comillas según la jerarquía española: angulares («») → inglesas ("") → simples ('').
- **Guiones y rayas:** distingue guion (-) para palabras compuestas, raya (—) para incisos y diálogos, y signo menos (−) en contextos numéricos.
- **Cursivas:** aplica cursivas en títulos de obras, extranjerismos no adaptados, neologismos y metalenguaje; las elimina donde no corresponden.
- **Negritas y versalitas:** unifica criterios de uso a lo largo del texto.
- **Espacios:** corrige espacios de no separación (entre cifras y unidades: 5 km, 30 °C), espacios dobles, espacios antes de signos de puntuación y espacios faltantes.
- **Abreviaturas, siglas y símbolos:** corrige su escritura y uso (puntos en abreviaturas, mayúsculas en siglas, símbolos sin punto ni plural).
- **Cifras y números:** unifica la escritura de cifras (separador de miles, decimales, ordinales vs. cardinales) según la norma.
- **Consistencia:** unifica criterios tipográficos no normativos a lo largo de todo el texto (tipo de comillas, uso de cursivas, estilo de citas, etc.).

### Formato Markdown

Cuando el texto esté en Markdown, aplica además las siguientes reglas objetivas de formato:

- **Encabezados:** usa encabezados ATX (`#`, `##`, `###`) y nunca saltas niveles (`##` → `####`). Los encabezados son estructura, no tamaño de fuente. No termines encabezados con signo de puntuación.
- **Un solo H1:** el documento tiene exactamente un encabezado de nivel 1 (`#`).
- **Líneas en blanco:** deja una línea en blanco antes y después de cada encabezado, lista, bloque de código, cita y tabla.
- **Tablas vs. listas:** usa tablas solo para datos tabulares compactos (celdas con pocas palabras, estructura regular). Si una celda necesita más de un par de frases, o contiene listas, párrafos o bloques de código, sustituye la tabla por una lista de definición o encabezados con texto. Tablas con 20+ filas: considera dividirlas por secciones con encabezados descriptivos.
- **Listas:** usa un único marcador (`-`) en todo el documento. Indenta los elementos anidados con dos espacios. No mezcles `-`, `*` y `+`.
- **Negritas:** usa `**negrita**` solo para términos importantes que se introducen o avisos críticos. No uses negritas como sustituto de encabezados. No pongas bloques enteros en negrita. Si todo es negrita, nada destaca.
- **Cursivas:** usa `*cursiva*` para énfasis ligero, títulos de obras, extranjerismos no adaptados y metalenguaje. No combines estilos inline (`**negrita** + *cursiva* + `código``) en el mismo fragmento.
- **Emojis:** redúcelos al mínimo. Unos pocos pueden ayudar a la orientación; el exceso distrae y resta profesionalidad. No dependas solo de emojis para indicar estado o tipo (incluye siempre texto).
- **TOC (tabla de contenidos):** en documentos largos (más de 3-4 pantallas), incluye un TOC. Prefiere la generación automática (remark-toc, md-toc, extensión TOC de Python-Markdown) sobre la manual para evitar desincronización. El TOC se genera a partir de los encabezados H2-H6 como lista anidada de enlaces ancla.
- **Consistencia de estilo:** elige un estilo (`-` para listas, `**` para negrita, `*` para cursiva, ATX para encabezados) y manténlo en todo el documento.

### Edición objetiva de estructura

Aplica criterios mecánicos objetivos sobre la presentación del texto. No reescribe ni reorganiza ideas; solo aplica reglas de edición verificables.

- **Párrafos excesivamente largos:** detecta párrafos que superen las 10 líneas (o ~150 palabras) y, si existe un punto natural objetivo (cambio de idea marcado por un punto y seguido con transición temática clara), los parte en ese punto. No parte párrafos si no hay un punto natural evidente; en ese caso, los señala sin intervenir.
- **Párrafos de una sola oración:** detecta párrafos formados por una sola oración muy breve (menos de 10 palabras) que no cumplan una función narrativa clara (como un énfasis o una transición). Si son fragmentos sueltos sin propósito, los señala para posible fusión con el párrafo adyacente.
- **Oraciones excesivamente largas:** detecta oraciones que superen las 40 palabras con subordinación abundante o más de dos incisos. Las señala sin reescribirlas (la reescritura es propia de la revisión de redacción), pero aplica correcciones de puntuación si las hay.
- **Secuencias monótonas:** detecta secuencias de 3 o más oraciones consecutivas con la misma longitud (±3 palabras) y la misma estructura sintáctica (sujeto-verbo-complemento). Las señala sin reescribir.
- **Espaciado entre párrafos:** unifica el espaciado entre párrafos (un único salto de línea en texto plano, o una línea en blanco en Markdown).

## Qué no toca

- **Estilo:** no evalúa ni modifica la claridad, la concisión, la coherencia, la cohesión, el tono ni la riqueza léxica. Estos son principios subjetivos propios de la revisión de redacción.
- **Estructura del discurso:** no reorganiza el orden de las ideas ni reformula la progresión temática. Solo aplica criterios mecánicos objetivos de presentación (partir párrafos largos en puntos naturales, señalar oraciones excesivamente largas).
- **Contenido:** no evalúa la veracidad, la originalidad ni la calidad sustantiva de las ideas.
- **Reescritura:** no reformula oraciones para mejorar su redacción; solo corrige errores normativos y técnicos, y aplica reglas de edición objetivas (partir párrafos, unificar formato).
- **Voz del autor:** no altera la voz ni el estilo del autor.

## Fuentes de autoridad

1. **RAE-ASALE — Ortografía de la lengua española (2010)** — Normas de ortografía, puntuación, mayúsculas, signos ortográficos y ortotipografía. Estructura en capítulos:
   - I. Representación gráfica de los fonemas (uso de letras).
   - II. Representación gráfica del acento (uso de la tilde).
   - III. Uso de los signos ortográficos (diacríticos, puntuación, auxiliares).
   - IV. Uso de mayúsculas y minúsculas.
   - V. Representación gráfica de las unidades léxicas (unión/separación, abreviaciones, símbolos, cifras).

2. **RAE-ASALE — Diccionario panhispánico de dudas (DPD)** — Resolución de dudas frecuentes en los planos fonográfico, morfológico, sintáctico y lexicosemántico: concordancia, régimen, leísmo, dequeísmo, impropiedades léxicas, extranjerismos, topónimos y gentilicios.

3. **RAE-ASALE — Nueva gramática de la lengua española** — Normas gramaticales: concordancia, régimen verbal, tiempos verbales, pronombres.

4. **RAE — Diccionario de la lengua española (DLE)** — Forma correcta de las palabras, acepciones, género y pluralización.

5. **FundéuRAE** — Recomendaciones diarias sobre dudas lingüísticas frecuentes, usos asentados, anglicismos, mayúsculas, abreviaturas y escritura de cifras.

6. **Libro de estilo configurable (opcional)** — Si el usuario proporciona un libro de estilo o criterios editoriales específicos, estos prevalecen sobre las preferencias no normativas de la RAE y la Fundéu.

## Criterios de aplicación

- **Corrección directa:** los errores normativos inequívocos se corrigen directamente en el texto.
- **Casos dudosos:** cuando una corrección es ambigua o admite múltiples interpretaciones, se señala sin aplicar. El pulido mecánico no decide entre opciones válidas; solo corrige lo que es claramente erróneo.
- **Consistencia sobre preferencia:** cuando no hay una norma estricta (p. ej., tipo de comillas, uso de cursivas), se unifica el criterio a lo largo del texto, eligiendo la opción más frecuente o la recomendada por la RAE/Fundéu.
- **Mínima intervención:** se corrige solo lo necesario; no se reescriben oraciones ni se altera la estructura del texto.
- **Respeto a la voz del autor:** no se modifican elecciones estilísticas legítimas.

## Procedimiento

1. **Leer el texto completo** una vez para identificar el criterio tipográfico predominante (tipo de comillas, uso de cursivas, estilo de cifras) y si el texto está en Markdown.
2. **Recorrer el texto** aplicando las correcciones en el siguiente orden:
   1. Ortografía (letras, tildes, unión/separación, mayúsculas).
   2. Gramática evidente (concordancia, régimen, tiempos verbales, pronombres).
   3. Puntuación (signos, comas, posición).
   4. Tipografía y ortotipografía (comillas, guiones, cursivas, espacios, abreviaturas, cifras, consistencia).
   5. Formato Markdown (encabezados, tablas vs. listas, negritas, cursivas, emojis, TOC, consistencia de estilo) — solo si el texto está en Markdown.
   6. Edición objetiva de estructura (partir párrafos largos, señalar oraciones excesivamente largas, detectar secuencias monótonas, unificar espaciado).
3. **Señalar los casos dudosos** que no se corrigen automáticamente, sin alterar el texto en esos puntos.
4. **Devolver el texto corregido.**

## Referencias

- RAE-ASALE. *Ortografía de la lengua española.* https://www.rae.es/ortografía/
- RAE-ASALE. *Diccionario panhispánico de dudas.* https://www.rae.es/dpd/
- RAE-ASALE. *Nueva gramática de la lengua española.* https://www.rae.es/gramática/
- RAE. *Diccionario de la lengua española.* https://dle.rae.es/
- FundéuRAE. Recomendaciones en fundeu.es.
- FundéuRAE. *Resumen de las reglas de ortografía.* https://www.fundeu.es/wp-content/uploads/2019/06/reglasdeortografíaespañol.pdf
- RAE-ASALE. *Ortografía de la lengua española*, cap. III, §3.1: "Puntuación y prosodia" (relación entre signos de puntuación, pausas y ritmo).
- GitHub Flavored Markdown Spec. https://github.github.com/gfm/
- remark-toc. https://github.com/remarkjs/remark-toc/
- md-toc. https://github.com/frnmst/md-toc/
- Python-Markdown TOC extension. https://python-markdown.github.io/extensions/toc/
- Gary Provost. "Sentence variety and rhythm" (variación de longitud oracional como recurso rítmico).
- RAE-ASALE. *Libro de estilo de la lengua española*, §86-125: normas de puntuación.
