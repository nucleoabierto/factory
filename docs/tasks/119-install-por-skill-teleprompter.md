# Instalar cada skill por separado en el manifiesto de teleprompter

## Estado

[ ] Pendiente | [~] En progreso | [r] En revisión | **[x] Completada** | [!] Bloqueada

## Tipo

mantenimiento

## Objetivo

Cambiar `teleprompter.json` para que `install` declare una entrada por cada skill individual en lugar de la única entrada que instala la carpeta `.agents/skills/` completa. Instalar cada skill como unidad propia da granularidad al paquete: cada skill pasa a ser un recurso instalable identificable en el manifiesto.

## Dependencias

- Ninguna (la tarea 118, que creó el manifiesto, ya está completada).

## Entrada

- `teleprompter.json` — el manifiesto a modificar.
- `.agents/skills/` — los 32 skills que el paquete instala, cada uno en su propio subdirectorio.
- El contrato del formato de paquete transcrito en `docs/tasks/118-paquete-teleprompter-factory.md`, sección «Entrada» — `install` es una lista de entradas `{ "source", "target" }`, donde `source` es una ruta dentro del paquete y `target` la ruta relativa a la raíz del repositorio destino; ni `source` ni `target` admiten rutas absolutas ni `..`.

## Resultado esperado

- `teleprompter.json` con `install` reemplazado por 32 entradas, una por skill: `source: ".agents/skills/<skill>"` → `target: ".agents/skills/<skill>"`.
- `requires.paths` se mantiene sin cambios: `{ "path": ".agents/skills/", "create": true }` sigue siendo el directorio padre de todos los targets.
- El resto del manifiesto (`format`, `name`, `version`, `description`, `license`, `author`, `personalization`, `metadata`) permanece intacto.

## Criterios de calidad

- `install` tiene exactamente una entrada por cada subdirectorio de `.agents/skills/` (32 entradas), sin la entrada de carpeta completa.
- Cada `source` declarado existe dentro del paquete.
- Ninguna ruta es absoluta ni contiene `..`; ningún `target` es `teleprompter-lock.json` ni cae dentro de `.teleprompter/`.
- El JSON es parseable y el manifiesto supera la lista de comprobación del contrato (seis puntos de la tarea 118).

## Procedimiento sugerido

1. Listar los subdirectorios de `.agents/skills/`.
2. Reescribir la lista `install` de `teleprompter.json` con una entrada `{ "source", "target" }` por skill.
3. Validar: parsear el JSON, comprobar que cada `source` existe y que ningún `target` usa rutas reservadas.

## Notas

- Cambio solicitado directamente por el usuario.

## Revisión

- Subagente: 2026-10-02 — Aprueba
- Usuario: 2026-10-02 — Aprueba
