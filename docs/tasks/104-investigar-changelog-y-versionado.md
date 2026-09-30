# Investigar mejores prácticas de changelogs y versionado semántico

## Estado

[ ] Pendiente | [~] En progreso | [r] En revisión | [x] **Completada** | [!] Bloqueada

## Tipo

investigación

## Objetivo

Recopilar y sintetizar las mejores prácticas para mantener un changelog generado y gestionado por agentes, agnóstico de tecnología, como entrada para diseñar dos skills: uno que registre los cambios al cerrar cada tarea del flujo de ejecución y otro que anote versiones y promueva los cambios no liberados hacia una versión semver. La motivación es que el ciclo de tareas del proyecto produce cambios continuamente sin dejar un registro consumible por usuarios del producto, y un changelog ingenuo —una entrada por tarea— crecería sin control.

## Dependencias

- Ninguna.

## Entrada

- El objetivo de los dos skills previstos: (1) registrar el cambio de cada tarea en el changelog del proyecto evaluado, con agregación para evitar changelogs enormes; (2) anotar versiones y promover los cambios no liberados hacia una versión semver, agnóstico de tecnología.
- Los artefactos de agrupación que ya existen en el sistema y que el changelog podría referenciar para agregar: épicas (`docs/epics/`, D019), propuestas (`docs/proposals/`, D012) y las agrupaciones ligeras de `TODO.txt` (D008).
- Los sensores de cierre de tarea `documentar-dominio` y `documentar-producto` (D021, D025) como modelo del punto de invocación previsto para el skill de registro.

## Resultado esperado

- Documento de investigación en `docs/research/` siguiendo el formato del skill `investigar`, con conclusiones justificadas, referencias verificables y marca temporal, que cubra cuatro bloques:
  - **Formato y estructura del changelog**: Keep a Changelog y alternativas, sección de no liberados (`Unreleased`), categorías de entradas (añadido, cambiado, corregido, eliminado, etc.), dónde vive el archivo en el repositorio y cómo detectar o inicializar uno en un proyecto cualquiera.
  - **Granularidad y control de volumen**: cómo decidir qué merece entrada (cambio observable frente a trabajo interno), estrategias de agregación —por épica, por propuesta, por conjunto de cambios relacionados—, deduplicación, nivel de detalle de las entradas y referencias a los artefactos de origen.
  - **Correspondencia con semver**: qué tipos de cambio implican major, minor o patch, cómo clasificar entradas para que el bump sea derivable, y qué hacer con cambios que no afectan a la versión.
  - **Ciclo de vida de liberación**: cuándo y cómo promover `Unreleased` a una versión, formato de la anotación de versión (número, fecha, enlaces comparativos), y cómo mantenerlo agnóstico de gestores de paquetes y plataformas concretas.
  - Ejemplos y patrones existentes relevantes: changelogs mantenidos por herramientas automáticas (release-please, changesets, conventional-changelog) y qué aportan o qué problemas tienen frente a un mantenimiento dirigido por agente.

## Criterios de calidad

- El documento recomienda con justificación un formato de changelog y declara cuándo un proyecto debe adoptar una alternativa.
- El documento define una política concreta de agregación: qué condiciones hacen que una tarea quede absorbida por su épica o propuesta y cuándo merece entrada propia.
- El documento fija una correspondencia explícita entre tipos de entrada y bump semver, usable para proponer versiones sin ambigüedad.
- El documento describe el procedimiento de promoción de no liberados a versión sin acoplarlo a ninguna tecnología.
- Toda afirmación de peso tiene referencia verificable.
- Las conclusiones son accionables: permiten diseñar los dos skills sin nueva investigación.

## Procedimiento sugerido

1. Ejecutar el skill `investigar` sobre los cuatro bloques descritos en el Resultado esperado.
2. Usar el propio sistema del proyecto como caso de referencia: el flujo produce cambios por tarea agrupados en épicas y propuestas, y el skill de registro debería poder agregar sobre esa estructura.
3. Sintetizar recomendaciones separadas para el skill de registro de cambios y el skill de liberación de versiones.

## Notas

- El alcance acordado con el usuario es doble: prácticas del changelog en sí y prácticas de su gestión (control de volumen, agregación, promoción de versiones). Quedan fuera la generación automática desde mensajes de commit como solución principal —puede aparecer como comparativa— y cualquier integración con plataformas concretas de publicación.
- Resultado: `docs/research/2026-09-changelog-y-versionado-semantico.md`. La recomendación central es el modelo de dos momentos —registro al cerrar la tarea y nueva curación al liberar— con agregación por agrupación (épica, propuesta, encabezado ligero); esa agregación es una extrapolación de la regla de fusionar cambios relacionados, declarada como inferencia en las Limitaciones del documento.
- La revisión por subagente no se ejecutó porque la sesión no dispone de subagentes; el usuario revisó y aprobó el borrador completo antes de crear el archivo.

## Revisión

- Subagente: 2026-09-29 — No ejecutada (sesión sin subagentes; ver Notas)
- Usuario: 2026-09-29 — Aprueba
