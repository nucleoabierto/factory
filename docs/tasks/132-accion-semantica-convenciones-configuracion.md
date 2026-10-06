# Acción semántica en los invocadores y convenciones como configuración

## Estado

[ ] Pendiente | [~] En progreso | [r] En revisión | [x] Completada | [!] Bloqueada

## Tipo

mantenimiento (refactoring)

## Objetivo

Que los skills consumidores expresen solo la acción de dominio —«la próxima pendiente», «marcar bloqueada», «registrar el veredicto», «crear la tarea»— sin nombrar ni pasar artefactos concretos: es el gestor de artefactos quien resuelve ubicación, formato y aplicación. Las convenciones —rutas, nomenclaturas (`NNN-slug`, `DNNN`, `MM`, `CU-N`), marcas, secciones, prefijo de rama— dejan de estar escritas en los skills y pasan a ser configuración por defecto declarada en `PERSONALIZE.md`, inyectada al instalar: si el proyecto destino cambia la convención, los flujos continúan sin tocar los skills.

## Dependencias

- Tarea 116 (`docs/tasks/116-skill-operar-experiencias.md`) y tarea 117 (`docs/tasks/117-skill-operar-changelog.md`): sus consumidores —`registrar-experiencias`, `consolidar-lecciones`, `mantener-changelog`, `liberar-version`— pasan a acciones semánticas en esta tarea, así que necesitan el gestor que las resuelva ya creado.
- Se beneficia además de la tarea 131 —el catálogo autodescriptivo es el contrato sobre el que esta abstracción se apoya—, pero no la exige.

## Entrada

- El inventario de fugas de implementación levantado en la revisión de la épica 003: nombres de artefacto, formatos internos y convenciones de ubicación presentes hoy en los consumidores, con su clasificación.
- El patrón ya usado por `mantener-roadmap`, `mantener-changelog`, `cerrar-conjunto`, `liberar-version` e `investigar`: «`X` en la convención; otra ubicación es dato de entrada» — forma de transición a generalizar.
- `PERSONALIZE.md` como documento de personalización de la instalación.

## Resultado esperado

- Los consumidores piden acciones semánticas; ninguno nombra ni pasa un artefacto que el gestor pueda resolver él mismo.
- Las convenciones del ciclo quedan declaradas como configuración por defecto en `PERSONALIZE.md`, catalogadas —operaciones, assets y constantes transversales— para pasarse al gestor y a los skills en la instalación.
- La frontera queda explícita: artefacto del dominio —la tarea como documento— puede nombrarse; detalle de backend —formato interno, marcadores, ubicación— no.

## Criterios de calidad

- Un barrido sobre los consumidores no encuentra fugas de artefacto, formato ni ubicación que el gestor pueda resolver.
- El catálogo de constantes del inventario —rutas, nomenclaturas, marcas, secciones, prefijos— queda cubierto por la configuración declarada.
- Un cambio de convención en la instalación —otro nombre de índice, otro directorio de tareas— no exige editar ningún skill.
- Las referencias legítimas a artefactos del dominio permanecen y el criterio de legitimidad queda escrito.

## Procedimiento sugerido

1. Fijar el criterio «artefacto del dominio vs. detalle de backend» con ejemplos del inventario.
2. Declarar en `PERSONALIZE.md` la configuración por defecto —convenciones y constantes— y cómo se inyecta en la instalación.
3. Reescribir los consumidores a acciones semánticas, empezando por los que usan el patrón «dato de entrada» como modelo.
4. Barrido final: verificar los criterios contra el inventario completo de fugas.

## Notas

- La motivación es la migración de backend: con la abstracción completa, cambiar el índice por un tracker real se reduce a reimplementar el catálogo del gestor, sin tocar consumidores.
- Del inventario de la épica 003: dos operaciones sin consumidor y los artefactos aún mutados a mano quedan registrados por la tarea 131; aquí solo se reescribe el lado consumidor.

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario (ejecución): [fecha] — [Aprueba | Solicita cambios]
- Usuario (cierre): [fecha] — [Aprueba | Solicita cambios]
