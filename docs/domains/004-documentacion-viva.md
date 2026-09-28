# Documentación viva

## Propósito

Mantener la documentación del proyecto sincronizada con su estado real —dominio, producto, decisiones, diseño e investigación— mediante sensores baratos que corren al cerrar cada tarea y evaluaciones profundas bajo demanda.

## Referencia del modelo

- **Lenguaje ubicuo:**
  - **Documento de dominio:** `docs/domains/NNN-slug.md`, separa «Referencia del modelo» (lenguaje ubicuo, entidades, invariantes, operaciones, con anclas al código) de «Explicación del dominio» (fronteras, decisiones); el índice es `docs/domains/README.md`.
    - Ancla: plantilla `.agents/skills/documentar-dominio/assets/domain.txt` y el propio directorio `docs/domains/`
    - Origen: `docs/decisions/D026-documento-dominio-referencia-explicacion.md`
  - **Documentación de producto:** directorio propio separado del `docs/` de proceso —`product-docs/` en el proyecto evaluado—, con índice, guías, referencia y un documento por funcionalidad cuyos escenarios se anclan a la suite de pruebas por nombre de módulo y título.
    - Ancla: `product-docs/` en la raíz de este repositorio y `todo-app/product-docs/` como instancia de referencia
    - Origen: `docs/decisions/D024-documentacion-producto-separada-anclas-suite.md`
  - **Decisión de diseño:** archivo `docs/decisions/DNNN-slug.md` numerado, con estado explícito y secciones contexto, decisión y justificación; se descubre por los disparadores del índice `docs/decisions/README.md`.
    - Ancla: directorio `docs/decisions/` y `.agents/skills/decisiones-diseno/SKILL.md`
    - Origen: `docs/decisions/D010-decisiones-diseno-formato-hibrido.md`
  - **Sensor:** skill invocado al cerrar cada tarea de desarrollo que evalúa si el diff altera lo documentado y solo entonces actualiza; la mayoría de las ejecuciones terminan en «sin impacto».
    - Ancla: principio «Sensor, no carga» en `.agents/skills/documentar-dominio/SKILL.md` y `.agents/skills/documentar-producto/SKILL.md`
    - Origen: `docs/decisions/D021-documentacion-dominio-y-revision-arquitectura.md`, `docs/decisions/D025-sensor-documentacion-producto.md`
  - **Guía de estilo:** `DESIGN.md` en la raíz del proyecto evaluado como contrato verificable de diseño, materializado en custom properties de CSS.
    - Ancla: `.agents/skills/documentar-guia-estilo/SKILL.md` y `todo-app/DESIGN.md` como instancia
- **Entidades / estado:**
  - Cada dominio y cada funcionalidad tiene un solo documento hogar; el índice correspondiente los lista todos («indexado o no existe»).
    - Ancla: reglas del índice en `docs/domains/README.md` y principio «Indexado o no existe» en `.agents/skills/documentar-producto/SKILL.md`
  - Las decisiones tienen estado Aceptada/Sustituida/Obsoleta; los documentos de dominio llevan «Estado de salud» con fecha y divergencias conocidas.
    - Ancla: comentario de formato en `docs/decisions/README.md` y sección «Estado de salud» de `.agents/skills/documentar-dominio/assets/domain.txt`
- **Invariantes:**
  - Un hogar por hecho: los hechos del modelo no se repiten en la doc de producto ni a la inversa; se referencian.
  - Los anclas apuntan al código (o a la suite, en producto), no a la historia: la procedencia va en el campo «Origen».
  - Los anclas de escenarios nombran módulo y título de la prueba, nunca números de línea.
  - La configuración del SSG vive fuera del directorio de documentos (`mkdocs.yml` con solo `site_name` y `docs_dir`).
- **Operaciones:**
  - Mantener dominios: `.agents/skills/documentar-dominio/SKILL.md`; producto: `.agents/skills/documentar-producto/SKILL.md`; guía de estilo: `.agents/skills/documentar-guia-estilo/SKILL.md` y `.agents/skills/aplicar-guia-estilo/SKILL.md`.
  - Registrar y consultar decisiones: `.agents/skills/decisiones-diseno/SKILL.md` y `.agents/skills/consultar-decisiones/SKILL.md`.
  - Investigar: `.agents/skills/investigar/SKILL.md` (produce `docs/research/`).
  - Revisión profunda bajo demanda: `.agents/skills/revisar-arquitectura/SKILL.md` (produce `docs/architecture-reviews/`).

## Explicación del dominio

- **Fronteras:**
  - Dentro: `docs/domains/`, el directorio de documentación de producto del proyecto evaluado, `docs/decisions/`, `docs/research/`, `docs/architecture-reviews/` y `DESIGN.md`, con sus skills de mantenimiento y consulta.
  - Fuera: los artefactos de trabajo (tareas, propuestas, épicas) que pertenecen a sus dominios; el registro de correcciones del usuario, del dominio de aprendizaje —aunque `consultar-decisiones` es el mecanismo de recuperación compartido.
  - Relaciones: todos los dominios son consumidos por `ejecutar-tareas` y el sub-flujo de desarrollo como contexto; el sensor de dominio puede recomendar `revisar-arquitectura` cuando detecta divergencia estructural.
- **Decisiones relevantes:**
  - `docs/decisions/D021-documentacion-dominio-y-revision-arquitectura.md`
  - `docs/decisions/D023-mkdocs-ssg-documentacion-producto.md`
  - `docs/decisions/D024-documentacion-producto-separada-anclas-suite.md`
  - `docs/decisions/D025-sensor-documentacion-producto.md`
  - `docs/decisions/D026-documento-dominio-referencia-explicacion.md`
  - `docs/decisions/D010-decisiones-diseno-formato-hibrido.md`

## Estado de salud

- Última revisión: 2026-09-28
- Divergencias conocidas: Ninguna
