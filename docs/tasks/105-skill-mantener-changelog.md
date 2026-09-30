# Crear el skill de mantenimiento del changelog

## Estado

[ ] Pendiente | [~] En progreso | [r] En revisión | [x] Completada | [!] Bloqueada

## Tipo

mantenimiento

## Objetivo

Crear el skill que mantiene el changelog del proyecto evaluado: invocable al cerrar una tarea, evalúa el cambio producido y decide si merece entrada; cuando la merece, la redacta en la sección de no liberados aplicando la política de agregación —si el cambio pertenece a una épica o propuesta ya registrada, la entrada de la agrupación lo absorbe en lugar de duplicarse—, siguiendo las conclusiones de la tarea 104. El nombre del skill se decide en la ejecución (`mantener-changelog` es el tentativo).

## Dependencias

- Tarea 104 (`docs/tasks/104-investigar-changelog-y-versionado.md`): fija el formato del changelog, la política de agregación y el ciclo de vida de los no liberados que este skill implementa.

## Entrada

- El documento de investigación producido por la tarea 104 — formato recomendado, política de agregación y categorías de entrada.
- Los sensores hermanos `documentar-dominio` y `documentar-producto` como modelo de estructura: evaluar el diff contra los artefactos documentados y solo entonces actualizar.
- Los artefactos de agrupación del sistema de tareas que la agregación referencia: épicas (`docs/epics/`), propuestas (`docs/proposals/`) y agrupaciones ligeras de `TODO.txt`.
- Las decisiones y lecciones que rigen la creación de skills: D003, D004, D005, lecciones `contratos-de-skills`, `consistencia-de-formatos`, `vocabulario`, `diseno-de-artefactos` y `nomenclatura`.

## Resultado esperado

- `.agents/skills/<nombre>/SKILL.md` con frontmatter `name` y `description` a nivel de capacidad, siguiendo la estructura común de los skills del proyecto.
- El procedimiento cubre: localización del changelog del proyecto evaluado —o su inicialización con el formato recomendado cuando no existe—, evaluación del cambio de la tarea para decidir si merece entrada, clasificación de la entrada en su categoría y agregación —absorber en la entrada de la épica o propuesta cuando el cambio pertenece a una agrupación ya registrada, crear entrada propia en caso contrario—.
- `references/` con el detalle del formato y la política de agregación si el cuerpo crece por encima de lo razonable (D005).
- Actualización del `README.md` en la sección de skills disponibles.

## Criterios de calidad

- El `SKILL.md` cumple D004 y D005.
- La `description` declara capacidad y resultado, no mecánica (lección `contratos-de-skills`).
- El artefacto es genérico y agnóstico: funciona sobre cualquier proyecto, sin acoplar a todo-app ni a una tecnología concreta; la ubicación y existencia del changelog del proyecto evaluado son datos de entrada (lección `diseno-de-artefactos`).
- La agregación está implementada: un cambio absorbido por su épica o propuesta no genera entrada duplicada, y un cambio sin agrupación genera la suya.
- El skill declara explícitamente cuándo no escribe —cambios sin impacto observable, según la investigación— en lugar de registrarlo todo.
- El skill aparece en `README.md`.

## Procedimiento sugerido

1. Leer el documento de investigación de la tarea 104 y un sensor existente (`documentar-dominio` o `documentar-producto`) como modelo de estructura.
2. Redactar `SKILL.md` y las referencias, revisar redacción y pulir antes de escribir.
3. Actualizar `README.md`.

## Notas

- La integración del skill en el cierre del ciclo de tareas —quién lo invoca y en qué punto— queda en la tarea 106: esta tarea crea la capacidad, no la conexión.
- El nombre definitivo del skill se decide en la ejecución, nombrando por la capacidad completa que ofrece (lección `contratos-de-skills`).

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario: [fecha] — [Aprueba | Solicita cambios]
