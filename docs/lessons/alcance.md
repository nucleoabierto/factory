# Alcance

## Lecciones

- **Los hallazgos fuera del alcance de la tarea se reportan al usuario o se registran como trabajo descubierto; no se corrigen directamente.** Por qué: durante una auditoría de referencias dentro de una tarea se corrigió un comentario de `TODO.txt` ajeno a la tarea, y el usuario pidió revertirlo. Aunque el hallazgo sea correcto, tocar archivos fuera de la tarea contamina el commit y la revisión.
  Disparadores: alcance, auditoría, corrección transversal, archivos ajenos a la tarea, fuera de alcance
  Origen: 20260921T011600

- **Cuando un hallazgo toca el mismo tema que la tarea en curso, la frontera del alcance no está cerrada: ofrece absorberlo en la tarea además de registrarlo aparte.** Por qué: un documento desfasado que describía justo lo que la tarea estaba documentando se reportó como fuera de alcance y se propuso darlo de alta como tarea nueva, cuando actualizarlo era parte natural del trabajo en curso.
  Disparadores: alcance, fuera de alcance, hallazgo del mismo tema, documento desfasado, absorber en la tarea
  Origen: 20261002T123944
