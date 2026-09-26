# Contratos de skills

## Lecciones

- **Declara la `description` del front-matter a nivel de capacidad y resultado, no de mecánica interna.** Por qué: la descripción de `ejecutar-implementacion` narraba el procedimiento («marcando cada acción de la checklist… delegando a subagentes…»), acoplando el contrato al procedimiento; el resultado es «devuelve el diff con el registro de desviaciones» y el procedimiento vive en el cuerpo del skill.
  Disparadores: skills, SKILL.md, front-matter, description, nuevo skill, editar descripción de skill
  Origen: 20260925T113207, 20260926T102400

- **Al delegar una acción en un subagente, el retorno es la explicación de lo hecho más los archivos tocados, y el ejecutor decide revisar o confiar según la complejidad.** Por qué: la delegación se diseñó como «el subagente devuelve un diff que el ejecutor aplica y verifica», lo que exige verificación mecánica siempre; el protocolo real es explicación + archivos y la decisión revisar/confiar es del ejecutor según la explicación y el tamaño de la acción.
  Disparadores: skills, SKILL.md, subagente, delegar, delegación, checklist, diff, revisar o confiar
  Origen: 20260925T113208

- **Describe las reglas inline en los skills; las citas a decisiones u otros documentos van resolubles (ruta y descripción) solo en la sección de referencias.** Por qué: un skill citaba «(D019)» sin explicar qué decidía, obligando a abrir el archivo de decisión para entender la regla. La cita desnuda no aporta contexto; la regla debe ser comprensible sin salir del documento.
  Disparadores: skills, SKILL.md, referencia a decisión, DNNN, citas, referencias, reglas inline
  Origen: 20260921T011530
