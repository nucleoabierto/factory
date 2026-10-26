# Migrar los gestores mecánicos a reglas y eliminar los scripts

## Estado

**[~] En progreso** | [ ] Pendiente | [r] En revisión | [x] Completada | [!] Bloqueada

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

## Contexto

- Decisión previa: D033 introdujo los scripts de utilidad; el hito 2 los sustituye por documentos de reglas declarativos —la 145 los escribió— y la 147 registrará la nueva decisión. El hito existe porque los agentes ya leen el artefacto antes de invocar el script: el trabajo se paga dos veces.
- Subsistema: los cuatro gestores publican un catálogo de operaciones de dominio en su `SKILL.md` y las resuelven ejecutando `assets/*.sh` con las convenciones de `convenciones.sh`. Los ocho documentos de `references/` escritos en la 145 ya contienen la gramática completa de cada artefacto.
- ~28 skills consumidores resuelven convenciones ajenas a un artefacto (prefijo de rama, directorios sin gestor) vía la operación `convencion`, que desaparece: cada consumidor embebe el literal que usa en su propio `SKILL.md` o `references/`.

## Conectividad

Conectada. Los documentos de reglas existen y están verificados; los consumidores solo cambian en dónde leen el literal de convención, no en lo que hacen. No falta capacidad base.

## Plan técnico

1. Reescribir el `SKILL.md` de `consultar-artefactos`: el catálogo conserva cada operación de dominio pero declara que se resuelve aplicando el documento de reglas del artefacto —referencia por ruta a cada documento—; la operación `convencion` desaparece y `siguiente` describe la computación de la serie en línea (mayor número que case `<prefijo><dígitos>` entre los archivos del directorio, más uno, rellenado al ancho pedido, por defecto 3).
2. Reescribir el `SKILL.md` de `actualizar-artefactos` igual: catálogo de escritura sobre los documentos de reglas propios, la promoción descrita como el procedimiento declarativo de `propuesta.md`.
3. Reescribir los `SKILL.md` de `operar-experiencias` y `operar-changelog` igual, sobre sus documentos `experiencias.md` y `changelog.md`.
4. En cada skill consumidor que resolvía convenciones por `convencion`, embeber el literal que usa —solo el que usa— en su `SKILL.md` o `references/`.
5. Eliminar `assets/*.sh` de los cuatro gestores y las referencias a ellos.
6. Verificar: ninguna referencia viva a `assets/` ni a la operación `convencion` fuera de documentos históricos; cada operación del catálogo resuelve a un documento de reglas.

## Suite de pruebas esperada

- Dado un catálogo de cualquiera de los cuatro gestores, toda operación nombra el documento de reglas que la define —o declara por qué desaparece—. (regresión del mecanismo)
- Dado un consumidor que usaba `convencion`, su literal está embebido en su propio documento y ya no delega esa resolución.
- Dado el árbol de los cuatro gestores, no queda `assets/*.sh` ni invocación a script.
- Dado un agente con la acción de dominio y el documento de reglas, ejecuta la operación sin abrir el `SKILL.md` del gestor ni un script. (I)
- Dado un skill del paquete, ninguna referencia rota a documento movido o eliminado.

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario (ejecución): [fecha] — [Aprueba | Solicita cambios]
- Usuario (cierre): [fecha] — [Aprueba | Solicita cambios]
