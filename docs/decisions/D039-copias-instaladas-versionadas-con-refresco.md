# Copias instaladas versionadas con refresco por regla de proyecto

## Estado

Vigente

## Contexto

Al convertir el repositorio en colección de paquetes (tarea 155), las 45 piezas se movieron a `packages/<conjunto>/skills/` —el formato exige que `source` no salga de su paquete— y `.agents/skills/` dejó de ser la fuente. El repo se autoconsume: sus propios skills orquestan su ciclo de desarrollo, así que el directorio debía repoblarse de alguna forma. El plan aprobado optó por instalar la colección sobre el propio repo e ignorar las copias en `.gitignore` —tratándolas como artefacto generado, a la manera de `node_modules`—. En la revisión del PR la decisión se revirtió: las copias pasaron a versionarse.

## Decisión

Las copias instaladas —`.agents/skills/` y `.teleprompter/`— quedan versionadas en el repositorio; `teleprompter-lock.json` no, por ser estado regenerable específico de la máquina. La sincronía entre la fuente y las copias la garantiza una regla del proyecto en `AGENTS.md`: el cierre de toda tarea cuyo diff toque `packages/` incluye reinstalar la colección y commitear las copias refrescadas, y está prohibido editar las copias directamente — la fuente vive en `packages/`—.

## Justificación

- **El bootstrap del clon lo exige:** con las copias ignoradas, un clon fresco arranca sin skills y el ciclo de desarrollo del propio repo no puede arrancar sin un prerequisito externo (node + CLI) que antes no existía. Con las copias versionadas, clonar basta.
- **La copia instalada es el lugar legítimo de la personalización:** el modelo de teleprompter define que los ajustes del proyecto se aplican sobre la copia instalada, no sobre el paquete. Versionar las copias es lo que permite que factory tenga sus ajustes propios mientras `packages/` conserva los literales genéricos — aunque hoy coincidan—.
- **El drift queda controlado por construcción:** la objeción contra versionar copias es la doble fuente de verdad; la regla de refresco la neutraliza — ninguna edición de piezas puede quedar sin sincronizar porque la misma tarea commitea el refresco—. La regla no puede vivir en las piezas del ciclo —genéricas, no pueden conocer la estructura de factory— ni en las propias copias —la reinstalación la borraría—; `AGENTS.md` sobrevive a ambas.
- **Alternativas descartadas:** la granja de symlinks versionados elimina copias y staleness pero deja de ejercitar el instalador en el uso diario y añade mantenimiento de enlaces; reinstalar como paso dentro de las piezas del ciclo acoplaría el producto genérico a este repo; el lockfile versionado arrastraría rutas absolutas de máquina —de hecho las arrastró y hubo que reescribir la historia—.

## Referencias

- `docs/tasks/155-repositorio-como-coleccion.md` — la tarea y sus desviaciones registradas.
- `AGENTS.md` — la regla de refresco y la prohibición de editar copias.
- `docs/decisions/D038-versiones-por-conjunto-tren-comun.md` — la política de versionado de la misma épica.
