# D038: Versiones por conjunto con tren de liberación común

## Estado

Aceptada

## Contexto

La división de la colección en once conjuntos —el documento de dominio 007, tarea 153— convierte cada conjunto en un paquete teleprompter con `version` obligatoria y `dependencies` de restricción opcional: una aserción sobre la versión que el manifiesto de la pieza obtenida declara, no una selección entre versiones. Había que decidir cómo versionan los conjuntos entre sí y qué restricciones declaran, de modo que la tarea 155 escriba los manifiestos sin decisiones pendientes. El repositorio versionaba hasta ahora como unidad única —`teleprompter.json` en `0.7.0` y un solo CHANGELOG— y la propuesta 006 dejó fuera de alcance las liberaciones independientes por conjunto —cadencia propia y changelog por conjunto— sin decidir la política de versiones.

## Decisión

Cada conjunto lleva su propia versión semver en su manifiesto —autoridad sobre el VCS, como en todo paquete— y las once versiones iniciales son `1.0.0`. La liberación sigue siendo única: un tren por repositorio —un tag, el CHANGELOG y la puerta humana de siempre— que mueve solo los conjuntos cuyas piezas o manifiestos cambiaron, con bump por la señal más fuerte presente. Las liberaciones independientes por conjunto quedan descartadas: versión propia no es ciclo de vida propio. Toda dependencia declarada lleva la restricción `^1.0.0` —la forma `^` admite la evolución compatible y rechaza la ruptura, forzando la actualización explícita del dependiente en el mismo tren—, sea cual sea la naturaleza de la arista; en cada liberación las restricciones se verifican contra las nuevas versiones y la insatisfecha se actualiza junto al bump del dependiente. `completo` declara `^1.0.0` sobre los diez conjuntos como cualquier otro.

## Justificación

Alternativas consideradas: un solo número de versión para los once manifiestos —el tren compartido literal—, que repite el versionado del paquete único pero estampa como cambiado un conjunto que no lo estuvo y deja las restricciones sin semántica propia; y las cadencias independientes por conjunto, que la propuesta ya descartó por multiplicar la operación de liberar. Las versiones propias hacen honesta la versión de cada artefacto —avanza cuando cambian sus piezas— y las restricciones `^` recuperan su función prevista: una ruptura de una dependencia no puede publicarse sin que el dependiente actualice su restricción en el mismo tren, la coherencia que el grafo declara convertida en aserción comprobable. La clasificación de las aristas por naturaleza contractual —mecánica de artefactos, invocación de pieza, sensores de cierre, contrato de archivo y agregación— no produjo formas de restricción distintas porque todos los contratos pertenecen al mismo tren y se liberan atómicamente; queda registrada como evidencia de que la uniformidad es decisión, no descuido. El `1.0.0` inicial declara la madurez heredada del paquete único —el contenido ya atravesó siete releases—; la adaptación de piezas de la tarea 156 se versiona por su señal como cualquier otro cambio.

## Referencias

- `docs/domains/007-coleccion-por-conjuntos.md` — El modelo de conjuntos y su grafo que la política versiona; la política vive como sección del documento.
- `docs/proposals/006-subpaquetes-por-dominio/propuesta.md` — La propuesta aprobada: las liberaciones independientes por conjunto quedan fuera de alcance.
- `docs/epics/007-subpaquetes-por-dominio.md` — La épica que enmarca la política.
- `docs/tasks/154-politica-versionado-conjuntos.md` y `docs/tasks/155-repositorio-como-coleccion.md` — La tarea que la produce y la que la materializa en los manifiestos.
- `/Users/gil/projects/teleprompter/docs/especificacion-paquete.md` — El contrato del formato: `version` obligatoria y restricción por dependencia como aserción.
- `docs/research/2026-09-changelog-y-versionado-semantico.md` — La correspondencia semver que la evolución de cada conjunto reutiliza.
