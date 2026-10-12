# Higiene de ramas

## Lecciones

- **Tras commitear en la rama principal, empuja antes de ramificar: la rama de la tarea contiene solo el trabajo de su tarea.** Por qué: un commit de registro quedó local en `main` y viajó dentro de la rama del pull request, que mostró dos commits y arrastraba trabajo ajeno a la tarea. Empujar `main` antes de crear la rama mantiene el diff del PR limpio y revisable.
  Disparadores: rama, branch, git push, main, pull request, commit en main, registro de tareas, nueva rama, diff del PR
  Origen: 20261012T031400
