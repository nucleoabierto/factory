# Dominio de la tarea y persistencia local

## Estado

[ ] Pendiente

## Tipo

desarrollo

## Objetivo

Implementar el dominio de la tarea —entidad con sus invariantes y las operaciones del ciclo de vida— sobre el modelo de estado decidido, con persistencia en el navegador según la especificación TodoMVC.

## Dependencias

- 006 — el modelo de estado del dominio decidido.

## Entrada

- La decisión de modelo de estado registrada en `docs/decisions/` por la tarea 006.
- La especificación TodoMVC: claves `id`, `title`, `completed` por ítem; almacenamiento local bajo el nombre `todos-react`; título recortado y no vacío; el estado de edición no se persiste.
- La suite con cobertura al 100% como contrato: todo el módulo de dominio queda probado.

## Resultado esperado

- El dominio implementado en `src/` como módulo propio, con las operaciones completas del ciclo de vida: crear con validación, completar y reactivar, renombrar, eliminar, marcar y desmarcar todas, limpiar completadas, contador de pendientes y selección por filtro.
- Persistencia local funcional: la lista se conserva entre recargas con el formato de la spec; el estado transitorio (edición) no se escribe.
- Pruebas unitarias del dominio y de la persistencia en verde, con cobertura total del módulo.

## Criterios de calidad

- Las invariantes las garantiza el dominio, no la interfaz: un título vacío o de solo espacios no crea la tarea y una edición que lo deja vacío la destruye.
- El formato persistido respeta las claves de la spec (`id`, `title`, `completed`) y el nombre de almacenamiento `todos-react`.
- `npm run verify` en verde con cobertura al 100%.

## Procedimiento sugerido

1. Diseñar el módulo de dominio y su forma de estado según la decisión registrada.
2. Implementar las operaciones e invariantes escribiendo primero las pruebas.
3. Cablear la persistencia local y probar el ciclo completo escribir-leer.
4. Dejar `npm run verify` en verde.

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario: [fecha] — [Aprueba | Solicita cambios]
