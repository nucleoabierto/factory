# Migrar los gestores mecánicos a reglas y eliminar los scripts

## Estado

**[ ] Pendiente** | [~] En progreso | [r] En revisión | [x] Completada | [!] Bloqueada

## Tipo

desarrollo

## Objetivo

Reescribir `consultar-artefactos`, `actualizar-artefactos`, `operar-experiencias` y `operar-changelog` para que resuelvan su catálogo de operaciones aplicando los documentos de reglas directamente sobre los artefactos —lectura y escritura con las herramientas habituales— en lugar de invocar scripts, conservando la interfaz de dominio para que ningún consumidor cambie su forma de delegar. Los scripts de `assets/` se eliminan.

## Dependencias

- 145.

## Entrada

- Los `SKILL.md` de los cuatro gestores y sus catálogos de operaciones publicados.
- Los documentos de reglas producidos por la tarea 145.
- Los scripts de `assets/` como referencia de la semántica a preservar durante la migración.

## Resultado esperado

- Los cuatro gestores reescritos: mismo catálogo de dominio, mecanismo declarativo en lugar de ejecutable.
- `assets/*.sh` eliminados de los cuatro gestores —incluidos `promocion.sh` y `convenciones.sh` o el artefacto que los sustituya—.

## Criterios de calidad

- Ningún skill consumidor cambia: la delegación sigue siendo la acción de dominio y el gestor la resuelve con las reglas.
- El catálogo publicado queda cubierto operación a operación; las que no sean expresables como regla se documentan explícitamente.
- No queda ningún script invocable en los cuatro gestores.
- La promoción de borradores —la operación más compleja del catálogo— queda descrita como procedimiento de reglas verificable, o se documenta por qué no migra.

## Procedimiento sugerido

1. Reescribir cada `SKILL.md`: la sección de catálogo conserva las operaciones de dominio; la de procedimiento pasa a «resolver la operación aplicando el documento de reglas del artefacto».
2. Migrar las operaciones complejas —promoción de borradores, recolocaciones del índice— a su forma declarativa.
3. Eliminar los scripts y ajustar las referencias internas.
4. Verificar que los consumidores existentes siguen siendo correctos sin cambios.

## Notas


- Con las convenciones embebidas por documento —sin `convenciones.md` ni `convenciones.sh`— la operación `convencion <clave>` pierde su artefacto: desaparece del catálogo. Los consumidores que resolvían convenciones ajenas a un artefacto —prefijo de rama de tarea, rama principal, directorios sin gestor como `dir_prd` o `dir_dominios`— embeben el literal en su propio `SKILL.md` o `references/`; el criterio «ningún consumidor cambia» aplica a la forma de delegar operaciones de artefacto, no a estos consumidores de convenciones.
- La consulta `siguiente` de las series numeradas tampoco tiene documento propio: la regla queda embebida en cada documento de artefacto con serie y el catálogo de `consultar-artefactos` la describe junto a la operación.

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario (ejecución): [fecha] — [Aprueba | Solicita cambios]
- Usuario (cierre): [fecha] — [Aprueba | Solicita cambios]
