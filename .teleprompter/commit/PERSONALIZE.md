# Personalización del paquete commit

Commit instala en `.agents/skills/` la pieza que crea commits siguiendo las convenciones del proyecto. Este archivo describe dónde vive cada literal personalizable cuando el proyecto destino usa convenciones distintas de las del paquete.

## Dónde vive cada literal personalizable

Cuando el proyecto destino usa una convención distinta del valor por defecto, el instalador edita el literal en cada archivo que lo contiene. Los literales viven embebidos en el `SKILL.md` —o `references/`— de cada pieza que los usa; este conjunto no depende de `gestores` y no instala documentos de reglas de artefactos. Los literales de este conjunto:

- Las convenciones de commit que `commit` debe seguir (mensaje, idioma, formato): `commit`.
- `dir_tareas` (`docs/tasks`): `commit/references/convenciones.md` lo embebe en un ejemplo de referencia a una tarea dentro del mensaje. Es el literal del artefacto de tareas —cuyo documento de reglas instala el conjunto `gestores` cuando está presente—; se lista aquí porque la ocurrencia vive en una pieza de este conjunto.

## Personalización al instalar

Al instalar, el agente instalador recorre la guía anterior: para cada convención que difiere del valor por defecto, edita el literal en cada archivo que lo contiene —el documento de reglas del artefacto y cada consumidor que lo embebe—. Un literal compartido puede vivir en varios archivos y en piezas de varios conjuntos; la forma segura de no dejar ocurrencias es buscar el valor por defecto —y el nombre de la convención— en todas las piezas instaladas y editar cada resultado. Las plantillas de `assets/` de los consumidores reproducen literales de la convención por defecto y se reescriben igualmente.

Cada conjunto instala su propia guía —el instalador la encuentra en `.teleprompter/<conjunto>/PERSONALIZE.md`— y cada guía asume solamente la presencia de su propio conjunto y de sus dependencias. Cuando el proyecto instala varios conjuntos de la colección, la personalización se aplica una sola vez sobre la unión instalada: se recorren las guías de todos los conjuntos presentes, cada literal compartido se edita en todas sus ocurrencias de la unión y los artefactos compartidos se preparan una sola vez.
