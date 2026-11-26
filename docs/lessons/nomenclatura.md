# Nomenclatura

## Lecciones

- **Nombra los directorios y artefactos por el tipo específico de contenido que almacenan, no por la operación genérica.** Por qué: `docs/reviews/` no distinguía revisiones de arquitectura de revisiones de planes, PRs o redacción; `docs/architecture-reviews/` declara qué contiene y evita que tipos de revisión distintos compartan ubicación.
  Disparadores: nuevo directorio, docs/, nombre de directorio, nomenclatura, ubicación de documentos, persistir documentos, nuevo índice
  Origen: 20260923T151159
- **Verifica el uso real de un término acuñado y nombra por el contexto de invocación, no por el mecanismo.** Por qué: «lazo de revisión» se propagó al documento del dominio sin comprobar que el término existe; «composicion» describía cómo funciona el conjunto en lugar de lo que el usuario escribe al instalarlo.
  Disparadores: nuevo término, nombrar, nombre de artefacto, acuñar, invocación, --package, identificador, nombre de conjunto, nombre de paquete
  Origen: 20261125T230344, 20261125T230345
