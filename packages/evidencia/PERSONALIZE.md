# Personalización del paquete evidencia

Evidencia instala en `.agents/skills/` las piezas que obtienen evidencia —investigación externa y validación de hipótesis técnicas—. Este archivo describe dónde vive cada literal personalizable cuando el proyecto destino usa convenciones distintas de las del paquete.

## Dónde vive cada literal personalizable

Cuando el proyecto destino usa una convención distinta del valor por defecto, el instalador edita el literal en cada archivo que lo contiene. Los literales ajenos a un artefacto viven embebidos en el `SKILL.md` —o `references/`— de cada pieza que los usa; los literales de un artefacto viven en su documento de reglas, instalado por el conjunto `gestores`. Los literales de este conjunto:

- `dir_investigaciones` (`docs/research`): `investigar`.

## Personalización al instalar

Al instalar, el agente instalador recorre la guía anterior: para cada convención que difiere del valor por defecto, edita el literal en cada archivo que lo contiene —el documento de reglas del artefacto y cada consumidor que lo embebe—. Un literal compartido puede vivir en varios archivos; la forma segura de no dejar ocurrencias es buscar el valor por defecto o el nombre de la convención en el paquete instalado y editar cada resultado. Las plantillas de `assets/` de los consumidores reproducen literales de la convención por defecto y se reescriben igualmente.

Cuando el proyecto instala varios conjuntos de la colección, la personalización se aplica sobre la unión instalada: cada conjunto trae la guía de sus propios literales y los artefactos compartidos se preparan una sola vez.
