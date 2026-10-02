# Crear el skill reflector del roadmap

## Estado

**[ ] Pendiente** | [~] En progreso | [r] En revisión | [x] Completada | [!] Bloqueada

## Tipo

mantenimiento

## Objetivo

Crear el skill que mantiene `ROADMAP.md` fiel a la ejecución real: invocable al cerrar cada tarea, refleja mecánicamente el estado de las líneas del horizonte Now —«pendiente de arrancar» pasa a «en curso» cuando la línea empieza a ejecutarse, «bloqueada por…» cuando su trabajo queda `[!]`— y retira las líneas completadas; y cuando detecta divergencia de dirección —Now vacío con Next poblado, agrupaciones del índice sin línea en el roadmap, una épica `Completada` aún listada— invoca `planificar-roadmap`, cuya puerta humana sigue decidiendo la dirección. Hoy `ROADMAP.md` solo se escribe al planificarlo y decae desde el primer commit posterior: el roadmap decide dirección, pero deja de reflejarla. El nombre del skill se decide en la ejecución (`mantener-roadmap` es el tentativo).

## Dependencias

- Ninguna.

## Entrada

- La tarea recién completada y su estado en `TODO.txt`, comunicados por `ejecutar-tareas` en el mismo punto de cierre que los demás sensores —la invocación se cablea en la tarea 111.
- `ROADMAP.md` del proyecto evaluado como documento a reflejar, con el formato de la plantilla de `planificar-roadmap` (horizontes, Estado por línea en Now).
- `TODO.txt` como fuente de verdad del estado de ejecución y `docs/epics/` como fuente del estado de las líneas-épica.
- Las decisiones que rigen el artefacto: D022 (el roadmap decide, el índice ejecuta; el reflejo es mecánico) y D027 (horizontes; solo Now declara estado por línea).
- El skill `mantener-changelog` como modelo de estructura: entrada por ubicación de cambios de la tarea, evaluación y escritura solo cuando procede.
- Las decisiones y lecciones que rigen la creación de skills: D003, D004, D005, lecciones `contratos-de-skills`, `consistencia-de-formatos`, `vocabulario`, `diseno-de-artefactos` y `nomenclatura`.

## Resultado esperado

- `.agents/skills/<nombre>/SKILL.md` con frontmatter `name` y `description` a nivel de capacidad, siguiendo la estructura común de los skills del proyecto.
- El procedimiento cubre: reconstrucción del estado real de cada línea de Now desde el índice y las épicas; actualización mecánica del campo Estado y retiro de líneas completadas; detección de divergencia de dirección e invocación de `planificar-roadmap` cuando aplica; emisión de «sin cambios» cuando el roadmap ya refleja la realidad.
- `references/` con el detalle si el cuerpo crece por encima de lo razonable (D005).
- Actualización del `README.md` en la sección de skills disponibles.

## Criterios de calidad

- El `SKILL.md` cumple D004 y D005.
- La `description` declara capacidad y resultado, no mecánica (lección `contratos-de-skills`).
- La escritura se limita al reflejo mecánico: el skill nunca reordena líneas, cambia horizontes ni reescribe justificaciones —la dirección pertenece a `planificar-roadmap` con su puerta humana (D022, D027).
- La divergencia de dirección invoca `planificar-roadmap`, no solo la informa.
- El skill declara explícitamente cuándo no escribe ni invoca nada —roadmap ausente o ya fiel— en lugar de tocar el documento siempre.
- El artefacto es genérico: opera sobre cualquier proyecto evaluado, sin acoplar a todo-app ni a Factory (lección `diseno-de-artefactos`).
- El skill aparece en `README.md`.

## Procedimiento sugerido

1. Leer D022, D027, la plantilla de `planificar-roadmap` y un sensor de cierre existente (`mantener-changelog`) como modelo de estructura.
2. Redactar `SKILL.md` y las referencias, revisar redacción y pulir antes de escribir.
3. Actualizar `README.md`.

## Notas

- La conexión del skill en el ciclo —quién lo invoca y en qué punto— queda en la tarea 111: esta tarea crea la capacidad, no la conexión.
- El orden relativo frente al skill de cierre de conjunto (tarea 109) —quién corre primero cuando una línea se agota— es un detalle del cableado de la tarea 111; ambos skills deben declarar entradas que no dependan del orden.
- El nombre definitivo del skill se decide en la ejecución, nombrando por la capacidad completa que ofrece (lección `contratos-de-skills`).

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario: [fecha] — [Aprueba | Solicita cambios]
