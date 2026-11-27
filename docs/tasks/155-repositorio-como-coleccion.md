# Repositorio como colección de paquetes

## Estado

[r] En revisión

## Tipo

mantenimiento

## Objetivo

Expresar la división del modelo de fronteras en la estructura física del repositorio: la raíz como índice de conjuntos y cada conjunto como paquete con manifiesto propio —identidad, versión según la política, mapa de instalación, precondiciones, personalización y dependencias declaradas—.

## Dependencias

- 153
- 154

## Entrada

- El modelo de fronteras de la tarea 153 y la política de versionado de la tarea 154.
- El formato: la raíz de una colección es índice no instalable (`"collection": true` + `packages`); cada paquete declara `name`, `version`, `install` y dependencias sobre miembros del mismo árbol por nombre; la composición pura —dependencias sin `install`— es válida.
- Las 45 piezas a reubicar y el mapa de instalación actual, cuyos `target` de destino se conservan.

## Resultado esperado

- El repositorio reestructurado como colección de paquetes válidos con sus dependencias declaradas, listo para la adaptación de contenido de la tarea 156.

## Criterios de calidad

- El manifiesto raíz es colección válida y lista todos los conjuntos.
- Cada conjunto tiene manifiesto válido: `name` igual al directorio, `version` según política, `install` no vacío salvo composición pura, y `dependencies` fieles al grafo del modelo.
- Ningún `source` sale de su paquete; el contenido que cada conjunto instala —con sus dependencias— contiene lo que sus piezas necesitan.
- Cada conjunto —y la composición pura, si existe— instala en destino limpio trayendo exactamente sus piezas más sus dependencias resueltas transitivamente, y `reinstall` lo reproduce desde el registro.

## Procedimiento sugerido

1. Crear la estructura: raíz colección (`"collection": true` + `packages`) y un directorio por conjunto con las piezas del modelo.
2. Generar el manifiesto de cada conjunto: `name` igual al directorio, `version` inicial según política, `install` con las rutas de sus piezas, `requires.paths`, `personalization` y `dependencies` sobre los conjuntos que el grafo declara —del mismo árbol, con las restricciones de la política—.
3. Materializar el conjunto de composición pura si el modelo lo declara: manifiesto sin `install` cuyas `dependencies` reúnen la colección entera.
4. Ajustar `personalization`, `docs/` y el README a la nueva estructura.
5. Instalar cada conjunto —y la composición pura, si existe— en destinos limpios de prueba: verificar que la resolución trae todas las dependencias antes que los dependientes, satisface las restricciones, no encuentra ciclos y que la composición reproduce la adopción completa; comprobar `reinstall` desde el registro.

## Notas

- El `source` de una entrada `install` no puede salir de su paquete: lo que instala vive físicamente en su directorio; las dependencias no se instalan por `source` sino por resolución transitiva.
- Fuera de alcance: adaptar el contenido de las piezas (tarea 156), que cierra ejecutando cada conjunto en su frontera —la verificación funcional le pertenece—.

## Contexto

- Archivos similares:
  - `teleprompter.json` raíz — el manifiesto de paquete único `0.7.0` a convertir en índice de colección: sus 45 entradas `install` se reparten entre los conjuntos conservando cada `target`.
  - `/Users/gil/projects/teleprompter/packages/ciclo-tareas/teleprompter.json` — paquete real del repo de teleprompter: modelo del layout `packages/<conjunto>/skills/<pieza>/`, con `personalization` por paquete y `requires.paths` con `create: true`.
  - `/Users/gil/projects/teleprompter/examples/paquete-unico/teleprompter.json` — ejemplo canónico del formato.
  - `PERSONALIZE.md` — guía de personalización vigente, por paquete según el formato; su contenido cubre literales de piezas repartidas en varios conjuntos.
- Patrones: manifiesto `format: teleprompter-package@1`; una entrada `install` por pieza `{source, target}` hacia `.agents/skills/<pieza>/`; `license`, `author`, `metadata.idioma` por paquete; raíz de colección `"collection": true` + `packages` sin `install`.
- Dominio: `docs/domains/007-coleccion-por-conjuntos.md` — el modelo de fronteras (11 conjuntos, grafo de 14 aristas + `completo`→diez), la política de versionado (inicial `0.8.0`, restricción `>=0.8.0 <1.0.0`, tren único) y los invariantes.
- Producto: `README.md` — documenta la instalación como paquete único; la sección de instalación queda por actualizar a la selección por `--package`.
- PRD: `docs/prd/007-subpaquetes-por-dominio.md` — CU-1 (instalación parcial por conjunto), CU-2 (adopción completa por composición pura), CU-3 (versionado por conjunto).
- Formato: `/Users/gil/projects/teleprompter/docs/especificacion-paquete.md` — contrato de colección (raíz índice no instalable), dependencias por nombre dentro del mismo árbol con restricción como aserción, exención de `install` en composición pura.
- Lecciones: `contratos-de-skills` (las referencias entre piezas se resuelven en el destino instalado, no en la fuente — las rutas `.agents/skills/` internas sobreviven al movimiento); `consistencia-de-formatos`; `nomenclatura` (el nombre se juzga en la invocación — `completo`); `estabilidad-temporal` (no reescribir documentos históricos que citen `.agents/skills/`); `validacion` (verificación con instalación real).
- Decisiones: `D038` (la política de versionado que fija `version` y restricciones); `D003` (skills autocontenidos — cada pieza viaja con su material); `D004` (formato Agent Skills); `D035` (los literales de convención viven en los documentos de reglas, no en configuración central).
- Vacíos detectados:
  - El `.agents/skills/` del propio repo quedará vacío tras el movimiento — el plan decide cómo se repuebla para el dogfooding (instalación local de la propia colección frente a mantener copias).
  - `PERSONALIZE.md` es por paquete y su contenido actual abarca piezas de varios conjuntos — el plan decide su distribución.
  - El CLI de teleprompter no está en PATH; corre con node vía nvm (`~/.nvm/versions/node`) desde `/Users/gil/projects/teleprompter/bin/teleprompter.js` (v0.7.0, con soporte de colección en `src/collection.js`).

## Conectividad

**Veredicto: conectada.**

- El formato soporta lo que la tarea escribe: teleprompter 0.7.0 implementa colección (`src/collection.js`) y dependencias entre paquetes (`src/dependencies.js`), como declara la especificación.
- La verificación exigida por los criterios es ejecutable: el CLI corre con node vía nvm (`node /Users/gil/projects/teleprompter/bin/teleprompter.js`) e instala desde directorio local con `--path`; `reinstall` y `list` existen como comandos.
- Los insumos existen con la forma esperada: las 45 piezas están en `.agents/skills/`, el manifiesto raíz lista el mapa de instalación vigente, el modelo de fronteras y la política de versionado están fusionados en `main` (documento de dominio 007 + D038).
- Los dos vacíos del contexto —repoblación de `.agents/skills/` para dogfooding y distribución de `PERSONALIZE.md`— son decisiones absorbibles dentro de la tarea, las toma el plan.

## Plan técnico

El repo es hoy un paquete único `factory@0.7.0` — el `teleprompter.json` raíz mapea las 45 piezas de `.agents/skills/` a sus destinos de instalación—. La tarea lo convierte en colección: la raíz pasa a índice no instalable (`"collection": true` + `packages`) y cada conjunto vive en `packages/<conjunto>/` con su manifiesto y sus piezas bajo `skills/` —el layout que el propio repo de teleprompter usa para `ciclo-tareas`—. Toda decisión de contenido ya está tomada por el dominio 007 + D038; lo que queda son tres decisiones de estructura: layout (`packages/`, convención de teleprompter), repoblación de `.agents/skills/` para dogfooding (instalación local + `.gitignore`, que el repo coma su propia comida) y `PERSONALIZE.md` por conjunto (derivado del mapa de literales actual, solo en conjuntos cuyas piezas embeben literales).

- [x] Mover las 45 piezas a `packages/<conjunto>/skills/` según la tabla pieza→conjunto del documento de dominio (`git mv` para conservar historia)
  - Aporta: la frontera física del modelo — cada pieza vive dentro de su paquete, como exige `source`
  - Contexto: `.agents/skills/` deja de ser fuente — se repuebla en la acción de dogfooding, no quedan copias canónicas duplicadas
- [x] Reescribir el manifiesto raíz como índice de colección: `"collection": true`, `packages` con los once directorios, identidad/licencia/metadata, sin `install`
  - Aporta: la raíz deja de ser paquete instalable y lista los conjuntos
  - Contexto: los campos exactos que admite una colección los fija la especificación — `name` es cosmético, queda `factory`
- [x] Escribir el manifiesto de cada conjunto de piezas: `name` igual al directorio, `version` `0.8.0`, `description` desde su definición del dominio, `install` con una entrada por pieza conservando los `target` actuales, `requires.paths` y `dependencies` por arista del grafo con `>=0.8.0 <1.0.0`
  - Aporta: los diez paquetes reales, mecánicos desde dominio y política
  - Contexto: el grafo (14 aristas) vive en el doc de dominio; las dependencias del mismo árbol se declaran por nombre sin `origin`
- [x] Escribir el manifiesto de `completo` — composición pura: sin `install` ni `requires`, `dependencies` sobre los diez con la misma restricción
  - Aporta: la adopción completa en un solo gesto (CU-2)
- [x] Derivar un `PERSONALIZE.md` por conjunto desde el mapa de literales del actual — cada conjunto documenta los literales de sus piezas; los que no embeben literales no declaran `personalization`; `completo` no instala, no lleva guía
  - Aporta: la personalización por conjunto que la instalación parcial necesita (CU-1)
  - Contexto: el `PERSONALIZE.md` actual ya indexa cada literal por consumidor; la sección de artefactos corresponde a `gestores`
- [x] Repoblar `.agents/skills/` instalando la colección local con `--path` (`--package completo`) y añadir `.agents/skills/` + `teleprompter-lock.json` a `.gitignore`
  - Aporta: el repo come su propia comida — una sola fuente de verdad en `packages/`
  - Contexto: tras el movimiento `.agents/skills/` queda vacío; el trade-off es que quien clone necesita el CLI + node para tener los skills — se documenta en README
- [x] Actualizar `README.md` (instalación por `--package`, tabla de conjuntos, nota de desarrollo local) y el estado de salud del dominio 007 + su entrada en `docs/domains/README.md`
  - Aporta: la documentación de cara al usuario refleja la colección
- [x] Verificar instalaciones en destinos limpios: cada conjunto con `--path` + `--package`, `completo` = las 45 piezas, `reinstall` reproduce desde el lockfile
  - Aporta: la prueba real de los criterios de calidad (CU-1/CU-2)
- [x] Revisión de redacción preventiva sobre README, PERSONALIZEs y las actualizaciones del dominio
  - Aporta: la pieza sale con la voz del proyecto

## Suite de pruebas esperada

- El manifiesto raíz es colección válida que lista los once conjuntos y no es instalable como paquete (CU-1) (E)
- Instalado `gestores` en destino limpio, el resultado son exactamente sus piezas — el conjunto fuente sin dependencias (CU-1) (Z)
- Instalado cada conjunto de piezas, el resultado son sus piezas más sus dependencias resueltas transitivamente en orden topológico (CU-1) (M)
- Instalado `ciclo-tareas` — el sumidero del grafo — se resuelven sus siete dependencias transitivas (CU-1) (B)
- Instalado `completo`, el resultado son exactamente las 45 piezas — adopción completa en un gesto (CU-2) (O)
- Tras `reinstall` desde el lockfile, cada instalación se reproduce idéntica (CU-1/CU-2) (regresión)
- Cada manifiesto declara `name` igual al directorio, `version` `0.8.0`, `install` no vacío salvo `completo` y `dependencies` con `>=0.8.0 <1.0.0` fieles al grafo (CU-3) (I)
- Ningún `source` de ningún manifiesto sale de su directorio de paquete (CU-1) (I)
- El `.agents/skills/` del repo repoblado por instalación local contiene las 45 piezas — dogfooding verificado (regresión)

## Desviaciones

- `.gitignore` cubre también `.teleprompter/` — el directorio de copias de personalización que la instalación local crea y que el plan no nombraba—. Motivo: es estado de instalación del mismo tipo que el lockfile; dejarlo fuera versionaría copias generadas. Decisión: ignorarlo como parte de la misma acción.

## Revisión

- Subagente: 2026-11-26 — Aprueba
- Usuario (ejecución): [fecha] — [Aprueba | Solicita cambios]
- Usuario (cierre): [fecha] — [Aprueba | Solicita cambios]
