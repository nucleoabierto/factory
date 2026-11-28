# Personalización del paquete flujo-ideas

Flujo de ideas instala en `.agents/skills/` las piezas que llevan una idea suelta a tareas definitivas —descubrimiento, propuesta y promoción de borradores—. Este archivo describe dónde vive cada literal personalizable cuando el proyecto destino usa convenciones distintas de las del paquete.

## Dónde vive cada literal personalizable

Cuando el proyecto destino usa una convención distinta del valor por defecto, el instalador edita el literal en cada archivo que lo contiene. Los literales ajenos a un artefacto viven embebidos en el `SKILL.md` —o `references/`— de cada pieza que los usa; los literales de un artefacto viven en su documento de reglas, instalado por el conjunto `gestores`. Los literales de este conjunto:

- `dir_tareas` (`docs/tasks`): `crear-tareas`.
- `dir_ideas` (`docs/ideas`): `lluvia-de-ideas`.
- `dir_propuestas` (`docs/proposals`): `refinar-propuesta`.
- `dir_investigaciones` (`docs/research`): la plantilla de `refinar-propuesta` (`assets/propuesta.md`) lo embebe en el marcador de referencia a investigaciones. La convención la nombra también la guía del conjunto evidencia —que no es dependencia de este—; se lista aquí porque la ocurrencia vive en una pieza de este conjunto.

## Personalización al instalar

Al instalar, el agente instalador recorre la guía anterior: para cada convención que difiere del valor por defecto, edita el literal en cada archivo que lo contiene —el documento de reglas del artefacto y cada consumidor que lo embebe—. Un literal compartido puede vivir en varios archivos y en piezas de varios conjuntos; la forma segura de no dejar ocurrencias es buscar el valor por defecto —y el nombre de la convención— en todas las piezas instaladas y editar cada resultado. Las plantillas de `assets/` de los consumidores reproducen literales de la convención por defecto y se reescriben igualmente.

Cada conjunto instala su propia guía —el instalador la encuentra en `.teleprompter/<conjunto>/PERSONALIZE.md`— y cada guía asume solamente la presencia de su propio conjunto y de sus dependencias. Cuando el proyecto instala varios conjuntos de la colección, la personalización se aplica una sola vez sobre la unión instalada: se recorren las guías de todos los conjuntos presentes, cada literal compartido se edita en todas sus ocurrencias de la unión y los artefactos compartidos se preparan una sola vez.
