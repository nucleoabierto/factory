# Documentación de producto y roadmap por horizontes

## Estado

[a] Aprobada

## Problema

El sistema produce hoy documentación interna de proceso (tareas, épicas, decisiones, investigaciones) y un documento de dominio que describe el modelo estático —lenguaje ubicuo, invariantes, fronteras— con anclas al código. Lo que no describe ningún artefacto es el comportamiento observable del producto: qué funcionalidades ofrece todo-app, qué flujos sigue el usuario y bajo qué reglas. La suite QUnit de `tests.html` ya contiene esos escenarios de facto, pero nadie los presenta como especificación ni los conecta con la documentación; y la épica 004 introducirá un formato de exportación versionado sin hogar documental donde describirlo. El resultado es que un lector —humano o agente— que quiera entender *qué hace* la aplicación solo puede leer el código o los tests.

Además, el mecanismo de dirección del producto llega hasta el orden lineal: `ROADMAP.md` declara líneas justificadas en una sola secuencia, sin distinguir lo comprometido de lo que es solo dirección, ni dar hogar a trabajo explícitamente aparcado. A medida que el horizonte crece —varias épicas abiertas, ideas sin fecha— una única lista ordenada aplana niveles de confianza distintos y obliga a posicionar líneas que aún no merecen posición.

## Oportunidad

Resolverlo añade al sistema la capa de documentación de producto que la industria resuelve con Diátaxis y living documentation —funcionalidades como escenarios en lenguaje de negocio anclados a los tests, guías y referencia navegables—, y eleva el roadmap al patrón Now/Next/Later con horizontes de confianza y sección de aparcados. El beneficio es triple: el conocimiento del comportamiento deja de vivir solo en el código y los tests; la documentación deja de ser exclusivamente interna; y la dirección del producto gana un mecanismo honesto para horizontes largos sin romper el orden justificado que ya funciona (D022). La investigación `2026-09-documentacion-producto-y-roadmap` ya recopiló las mejores prácticas y descartó las alternativas pesadas (Sphinx, timelines con fechas).

## Forma de solución

Cambio de proceso. El sistema gana dos artefactos nuevos, uno evolucionado y una mejora de un skill existente. Para el producto (validado en todo-app): una documentación de producto en markdown simple bajo un directorio propio y separado de los artefactos de proceso —funcionalidades descritas como escenarios en lenguaje de negocio con trazabilidad a las pruebas, guías de uso y referencia—, estructurada para que un generador de sitio estático Markdown-first la consuma sin configuración obligatoria y admita personalización progresiva. Para la dirección: un roadmap por horizontes de compromiso —en vuelo, próximas, dirección sin compromiso— con hogar explícito para lo aparcado. Y el skill `documentar-dominio` evoluciona su plantilla: la estructura actual mezcla tipos de información; la nueva separa con más claridad la referencia del modelo de la explicación del dominio, inspirada en Diátaxis/arc42 pero manteniendo anclas al código, «un hogar por hecho» y el rol de sensor.

## Solución

Se elige un generador de sitio estático Markdown-first que funcione sin configuración sobre markdown simple y admita personalización progresiva. En `todo-app/` se crea un directorio propio para la documentación de producto —separado del `docs/` de proceso— con índice navegable, guías de uso, referencia y documentos de funcionalidad cuyos escenarios se anclan a la suite de pruebas del proyecto. Un skill nuevo mantiene esa documentación al cerrar tareas de desarrollo, delimitado frente a `documentar-dominio`: el dominio documenta el modelo, la documentación de producto documenta el comportamiento.

En paralelo, la plantilla del documento de dominio se reestructura separando referencia del modelo y explicación del dominio, y se aplica al documento existente. El roadmap adopta horizontes Now/Next/Later con estado por línea y sección «No ahora»: `planificar-roadmap` y su plantilla se extienden, `TODO.txt` refleja solo los horizontes comprometidos y el roadmap de todo-app se reescribe en el formato nuevo. Cada tarea que consolida una decisión de diseño la registra en `docs/decisions/` como parte de su propio cierre.

## Alternativas consideradas

- **Markdown estructurado sin SSG previsto:** los markdowns deben ser entrada de un SSG desde el diseño, no una migración futura.
- **Sphinx como generador:** reStructuredText-first y autodoc pensado para Python/docstrings; sobre JS vanilla no aporta y exige más configuración que el patrón «sin configurar funciona».
- **Extender el documento de dominio para absorber funcionalidades y guías:** mezcla audiencias y ritmos; el documento de dominio es un sensor interno por tarea que debe terminar casi siempre en «sin impacto». Se mantiene la separación y solo se mejora su estructura interna.
- **Generar la documentación de funcionalidades automáticamente desde `tests.html`:** el valor del patrón living documentation es la redacción en lenguaje de negocio, no la transcripción de aserciones.
- **Roadmap con jerarquía iniciativa→épica→feature:** ya descartado por D022; los horizontes añaden la dimensión de confianza sin esa profundidad extra.

## Fuera de alcance

- Publicación/hosting del sitio: CI de despliegue, versionado de docs por release. El SSG se prepara y puede construirse localmente, pero no se despliega.
- Incluir los artefactos de proceso de `docs/` (tareas, épicas, decisiones, dominios) en el sitio documental.
- Documentación formal del propio Factory.
- Cambios en el criterio de cuándo actualizar de `documentar-dominio` (sensor, «sin impacto»): solo cambia la plantilla.
- Documentación en más de un idioma.

## Investigaciones de apoyo

- `docs/research/2026-09-documentacion-producto-y-roadmap.md` — Diátaxis, docs-as-code, living documentation, comparación Sphinx/MkDocs y patrones Now/Next/Later.

## Borradores

- `docs/tasks/083-investigar-ssg-markdown.md` — Investigar generadores de sitio Markdown-first de configuración progresiva y elegir el adoptado
- `docs/tasks/084-docs-producto-todo-app.md` — Crear el directorio de documentación de producto de todo-app con índice, configuración mínima del SSG y contenido inicial (depende de 083)
- `docs/tasks/085-skill-documentar-producto.md` — Crear el skill que mantiene la documentación de producto al cerrar tareas de desarrollo (depende de 084)
- `docs/tasks/086-reestructurar-plantilla-documento-dominio.md` — Reestructurar la plantilla del documento de dominio separando referencia y explicación, y aplicarla al documento existente
- `docs/tasks/087-roadmap-por-horizontes.md` — Extender `planificar-roadmap` y la plantilla con horizontes Now/Next/Later, estado por línea y sección «No ahora»
- `docs/tasks/088-aplicar-roadmap-horizontes-todo-app.md` — Reescribir `todo-app/ROADMAP.md` con el formato de horizontes (depende de 087)

## Revisión

- Usuario: 2026-09-25 — Solicita cambios (el registro de decisiones vive dentro de cada tarea, no como tarea independiente)
- Usuario: 2026-09-25 — Aprueba
