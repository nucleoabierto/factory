# Organización de tareas por hitos

## Propósito

Investigar cómo organizar `TODO.txt` agrupando tareas por hitos, fases o proyectos, y proponer un formato concreto que mantenga la simplicidad del índice actual.

## Contexto actual

`TODO.txt` es una lista plana de tareas. Cada línea sigue el formato:

```
- [estado] docs/tasks/NNN-slug.md — título breve
```

Los estados posibles son `[ ]` pendiente, `[~]` en progreso, `[x]` completada e `[!]` bloqueada. El skill `ejecutar-tareas` recorre la lista en orden y toma la primera tarea pendiente que no esté bloqueada. Con 28 tareas, la lista empieza a ser larga y cuesta distinguir las fases del proyecto.

## Enfoques analizados

### 1. Secciones con encabezados Markdown

Agrupar las tareas bajo encabezados de hito dentro del propio `TODO.txt`:

```markdown
## Hito 1: Skills de redacción

- [x] docs/tasks/001-investigar-revisar-redaccion.md — Investigar skill de revisión de redacción
- [x] docs/tasks/002-escribir-revisar-redaccion.md — Escribir revisar-redaccion.md
...

## Hito 2: Sistema de tareas

- [x] docs/tasks/009-crear-plantilla-tareas.md — Crear plantilla de tareas
...

## Hito 3: Mejoras del sistema

- [ ] docs/tasks/019-investigar-organizacion-por-hitos.md — Investigar organización de tareas por hitos
...
```

**Ventajas:**
- El índice sigue en un solo archivo, fácil de inspeccionar.
- Los hitos son visibles de un vistazo.
- Compatible con Markdown: el encabezado es navegable.
- No requiere cambios en el skill `ejecutar-tareas`: las líneas de tarea siguen teniendo el mismo formato, el agente las ignora al recorrer la lista buscando `[ ]`.

**Desventajas:**
- El archivo crece en longitud con los encabezados.
- Si un hito tiene muchas tareas completadas, añade ruido visual.
- Requiere decidir cuándo archivar tareas completadas de hitos pasados.

### 2. Prefijos de hito en cada línea

Añadir un prefijo de hito a cada línea de tarea:

```markdown
- [x] [H1] docs/tasks/001-investigar-revisar-redaccion.md — Investigar skill de revisión de redacción
- [x] [H1] docs/tasks/002-escribir-revisar-redaccion.md — Escribir revisar-redaccion.md
...
- [ ] [H3] docs/tasks/019-investigar-organizacion-por-hitos.md — Investigar organización de tareas por hitos
```

**Ventajas:**
- Mantiene el formato plano: una línea por tarea, sin encabezados.
- Permite filtrar por hito con una búsqueda de texto.
- Cada tarea lleva su hito de forma autónoma.

**Desventajas:**
- Añade ruido a cada línea.
- El hito no es visible al ojear la lista; hay que buscarlo en cada línea.
- Requiere actualizar el skill `ejecutar-tareas` para que ignore el prefijo al parsear.
- No permite añadir metadatos del hito (descripción, estado).

### 3. Archivos separados por hito

Dividir `TODO.txt` en un archivo por hito:

```
docs/milestones/
├── H1-skills-redaccion.md
├── H2-sistema-tareas.md
├── H3-mejoras-sistema.md
```

Cada archivo contiene las tareas de ese hito. `TODO.txt` se convierte en un índice de hitos:

```markdown
# TODO

- [x] H1: Skills de redacción — docs/milestones/H1-skills-redaccion.md
- [x] H2: Sistema de tareas — docs/milestones/H2-sistema-tareas.md
- [~] H3: Mejoras del sistema — docs/milestones/H3-mejoras-sistema.md
```

**Ventajas:**
- Cada hito es autónomo y manejable.
- `TODO.txt` se reduce a un índice de alto nivel.
- Permite archivar hitos completados sin perder el historial.

**Desventajas:**
- Añade un nivel de indirección: el agente tiene que leer `TODO.txt` y luego el archivo del hito activo.
- Requiere cambios sustanciales en el skill `ejecutar-tareas`.
- Fragmenta la visión global del proyecto.
- Para un proyecto de este tamaño, es excesivo.

## Evaluación comparativa

| Criterio | Secciones | Prefijos | Archivos separados |
|----------|-----------|----------|-------------------|
| Simplicidad | Alta | Media | Baja |
| Visibilidad de hitos | Alta | Baja | Media |
| Cambios en `ejecutar-tareas` | Ninguno | Menores | Sustanciales |
| Escalabilidad | Media | Media | Alta |
| Mantiene un solo archivo | Sí | Sí | No |

## Recomendación

**Secciones con encabezados Markdown** dentro de `TODO.txt`.

Es el enfoque que mejor equilibra estructura y simplicidad para el tamaño actual del proyecto:

- No requiere cambios en el skill `ejecutar-tareas`: las líneas de tarea mantienen su formato y el agente las recorre igual.
- Los hitos son visibles al ojear el archivo.
- Mantiene todo en un solo archivo, fiel a la filosofía del proyecto de un índice único.
- Si el proyecto crece hasta el punto de que el archivo es difícil de manejar, se puede migrar a archivos separados sin perder la estructura de hitos.

### Formato propuesto

```markdown
# TODO

<!-- Índice de tareas. Cada tarea se documenta en un archivo individual en docs/tasks/.
     Formato de cada línea:
     - [estado] docs/tasks/NNN-slug.md — título breve
       estado: [ ] pendiente, [~] en progreso, [x] completada, [!] bloqueada
     Para tareas bloqueadas, añadir sublista con las tareas bloqueantes.
     Las tareas se agrupan por hito bajo encabezados ## Hito N: título.
-->


## Hito 1: Skills de redacción

- [x] docs/tasks/001-investigar-revisar-redaccion.md — Investigar skill de revisión de redacción
- [x] docs/tasks/002-escribir-revisar-redaccion.md — Escribir revisar-redaccion.md
- [x] docs/tasks/003-investigar-pulir-escritura.md — Investigar skill de pulido mecánico
- [x] docs/tasks/004-escribir-pulir-escritura.md — Escribir pulir-escritura.md
- [x] docs/tasks/005-revisar-revisar-redaccion.md — Revisar revisar-redaccion.md
- [x] docs/tasks/006-aplicar-mejoras-revisar-redaccion.md — Aplicar mejoras a revisar-redaccion.md
- [x] docs/tasks/007-revisar-pulir-escritura.md — Revisar pulir-escritura.md
- [x] docs/tasks/008-aplicar-mejoras-pulir-escritura.md — Aplicar mejoras a pulir-escritura.md

## Hito 2: Sistema de tareas y skills formales

- [x] docs/tasks/009-crear-plantilla-tareas.md — Crear plantilla de tareas
- [x] docs/tasks/010-reestructurar-todo.md — Reestructurar TODO.txt
- [x] docs/tasks/011-mejorar-prompt.md — Mejorar PROMPT.txt
- [x] docs/tasks/012-investigar-skills.md — Investigar mejores prácticas para skills
- [x] docs/tasks/013-formalizar-revisar-redaccion.md — Transformar revisar-redaccion.md en skill formal
- [x] docs/tasks/014-formalizar-pulir-escritura.md — Transformar pulir-escritura.md en skill formal
- [x] docs/tasks/015-investigar-commits.md — Investigar mejores prácticas para mensajes de commit
- [x] docs/tasks/016-crear-skill-commit.md — Crear skill para realizar commits
- [x] docs/tasks/017-crear-skill-tareas.md — Crear skill para crear tareas
- [x] docs/tasks/018-formalizar-ejecutar-tareas.md — Formalizar skill ejecutar-tareas

## Hito 3: Mejoras del sistema y documentación

- [~] docs/tasks/019-investigar-organizacion-por-hitos.md — Investigar organización de tareas por hitos
- [ ] docs/tasks/020-reestructurar-todo-por-hitos.md — Reestructurar TODO.txt por hitos
- [ ] docs/tasks/021-investigar-flujo-revision.md — Investigar flujo de revisión de tareas
- [ ] docs/tasks/022-implementar-flujo-revision.md — Implementar flujo de revisión de tareas
- [ ] docs/tasks/023-investigar-formato-decisiones-diseno.md — Investigar formato para decisiones de diseño
- [ ] docs/tasks/024-crear-skill-decisiones-diseno.md — Crear skill para registrar decisiones de diseño
- [ ] docs/tasks/025-backfill-decisiones-diseno.md — Backfill de decisiones de diseño del proyecto
- [ ] docs/tasks/026-definir-proyecto.md — Definir el proyecto
- [ ] docs/tasks/027-escribir-vision-proyecto.md — Escribir documento de visión del proyecto
- [ ] docs/tasks/028-escribir-readme.md — Escribir README del proyecto
```

### Reglas del formato

1. Los hitos se introducen con encabezados de nivel 2 (`## Hito N: título`).
2. Las tareas se listan bajo el hito al que pertenecen, manteniendo el formato actual.
3. Los hitos se numeran secuencialmente y se ordenan cronológicamente.
4. El título del hito describe la temática común de sus tareas.
5. Las tareas completadas no se mueven ni se archivan: permanecen bajo su hito para preservar el historial.
6. El skill `ejecutar-tareas` no necesita cambios: sigue recorriendo la lista en orden, ignorando los encabezados.

### Definición de hitos para el historial

Los hitos propuestos para el historial existente son:

- **Hito 1: Skills de redacción** (tareas 001-008). Creación y pulido de los skills de revisión de redacción y pulido mecánico.
- **Hito 2: Sistema de tareas y skills formales** (tareas 009-018). Creación del sistema de tareas, formalización de todos los skills bajo el estándar Agent Skills, y skills de commit, crear-tareas y ejecutar-tareas.
- **Hito 3: Mejoras del sistema y documentación** (tareas 019-028). Organización por hitos, flujo de revisión, decisiones de diseño, definición del proyecto, visión y README.

## Referencias

- todo.txt format — github.com/todotxt/todo.txt
- taskmd best practices — driangle.github.io/taskmd/guide/best-practices.html
- RRR milestone structure — cdn.jsdelivr.net/npm/projecta-rrr
- Handoff project tracking — github.com/pborenstein/handoff
