# Comunicación en el código

## Lecciones

- **El nombre de un parámetro no presupone lo que la función verifica.** Por qué: `isValidTask` recibía el parámetro `t`, que asume que el valor ya es una tarea cuando eso es justo lo que se verifica; se renombró a `candidate`. `t` es aceptable donde el valor ya es una tarea (filtros, búsquedas internas).
  Disparadores: nombres de parámetros, predicados, validación, nombres que presuponen, isValid
  Origen: 20260922T140000

- **Los comentarios explican razones duraderas del código, no narrativa de la sesión.** Por qué: el comentario de `reset()` explicaba el razonamiento del proceso de la sesión (operación del arnés, no del dominio); los comentarios deben ser útiles a lo largo del tiempo — qué hace y por qué el código es así—, no relatar cómo se llegó a él en una conversación concreta.
  Disparadores: comentarios, app.js, narrativa de proceso, sesión
  Origen: 20260923T000000
