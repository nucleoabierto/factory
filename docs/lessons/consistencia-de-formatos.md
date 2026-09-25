# Consistencia de formatos

## Lecciones

- **Mantén la estructura común de los formatos del proyecto al crear plantillas nuevas, para que sean consistentes entre sí.** Por qué: una plantilla de épica añadió subsecciones `###` y una estructura más pesada que la plantilla de tarea, sin necesidad. El objetivo no es seguir convenciones por seguirlas, sino que los formatos se parezcan entre sí: los campos obligatorios se sugieren como bullets etiquetados dentro de una sección plana, no como subsecciones.
  Disparadores: plantillas, assets, formato, nuevo documento, nuevo skill, SKILL.md
  Origen: 20260921T011500

- **Cuando una entrada de plantilla lleva varios campos, usa listas anidadas en lugar de encadenarlos en una línea larga.** Por qué: el glosario de la plantilla de dominio ponía definición, ancla y origen en una sola línea por término, produciendo líneas difíciles de leer y de diff-ear; los sub-bullets mantienen las líneas cortas.
  Disparadores: plantillas, assets, glosario, campos por entrada, líneas largas, listas anidadas
  Origen: 20260921T183815

- **Declara en una plantilla solo los campos coherentes con el modelo del artefacto, no los heredados por inercia de otros formatos.** Por qué: la plantilla del roadmap incluía un campo Estado (Vigente/Superado) propio de una serie de documentos numerados, imposible en un documento vivo único en la raíz que se actualiza in situ y cuya historia la da git.
  Disparadores: plantillas, assets, formato, campos, campo de estado, serie de documentos, documento vivo, nuevo artefacto
  Origen: 20260924T023719
