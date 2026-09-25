# Documentación de producto y dirección por horizontes

## Estado

[x] Planificada | [ ] Completada

## Objetivo

Factory gana la capa de documentación de producto y un roadmap por horizontes de confianza. Al completarse, todo-app tiene un directorio propio de documentación de producto —consumible por un SSG Markdown-first sin configuración obligatoria— con guías, referencia y funcionalidades ancladas a la suite de pruebas del proyecto; existe un skill que mantiene esa documentación al cerrar tareas de desarrollo, delimitado frente a `documentar-dominio`; la plantilla del documento de dominio separa referencia y explicación; y `planificar-roadmap` produce roadmaps con horizontes Now/Next/Later y sección «No ahora», aplicado al roadmap de todo-app.

## Alcance

- **Dentro:** elección del SSG Markdown-first; estructura, configuración mínima y contenido inicial de la documentación de producto de todo-app; skill sensor de documentación de producto cableado en `ejecutar-tareas`; reestructura de la plantilla de dominio y del documento existente; extensión del roadmap a horizontes con estado por línea y sección «No ahora»; aplicación del formato nuevo a `todo-app/ROADMAP.md`; registro de las decisiones de diseño dentro de cada tarea.
- **Fuera:** publicación/hosting del sitio y CI de despliegue; inclusión de artefactos de proceso en el sitio; documentación formal del propio Factory; cambios en el criterio de cuándo actualizar de `documentar-dominio`; documentación multi-idioma.

## Piezas

- [ ] docs/tasks/083-investigar-ssg-markdown.md — Investigar generadores de sitio Markdown-first de configuración progresiva
- [ ] docs/tasks/084-docs-producto-todo-app.md — Crear el directorio de documentación de producto de todo-app con contenido inicial
- [ ] docs/tasks/085-skill-documentar-producto.md — Crear el skill que mantiene la documentación de producto
- [ ] docs/tasks/086-reestructurar-plantilla-documento-dominio.md — Reestructurar la plantilla del documento de dominio
- [ ] docs/tasks/087-roadmap-por-horizontes.md — Extender el roadmap a horizontes Now/Next/Later
- [ ] docs/tasks/088-aplicar-roadmap-horizontes-todo-app.md — Reescribir el roadmap de todo-app con horizontes

## Plan técnico

- **Orden:** 083 → 084 → 085 en la línea de documentación de producto; 087 → 088 en la línea de roadmap; 086 es independiente y puede ejecutarse en cualquier punto.
- **Dependencias:** 084 necesita el SSG elegido por 083; 085 necesita la estructura y convenciones de 084; 088 necesita el formato y el skill de 087. 086 solo comparte frontera conceptual con 085, sin dependencia.
- **Decisiones transversales:** el markdown es la fuente única y se sostiene sin build; la documentación de producto vive en un directorio separado del `docs/` de proceso; dominio documenta el modelo y producto el comportamiento —«un hogar por hecho» cruza ambos; los escenarios de funcionalidad se anclan a la suite de pruebas del proyecto, sea cual sea su tecnología; el roadmap decide dirección y `TODO.txt` refleja solo lo comprometido; cada tarea registra en `docs/decisions/` la decisión que consolida.

## Criterio de cierre

Las seis tareas completadas, la documentación de producto de todo-app recorrible desde su índice y construible con el SSG elegido, el nuevo sensor invocable desde el ciclo, el documento de dominio reestructurado sin pérdida, y `todo-app/ROADMAP.md` en formato de horizontes con su orden reflejado en `TODO.txt`.

## Revisión

- Usuario: 2026-09-25 — Aprueba
