# Personalización del paquete ciclo-revision

Ciclo de revisión instala en `.agents/skills/` las piezas del ciclo de vida del pull request —revisión, comentarios, triage y mejora—. Este archivo describe dónde vive cada literal personalizable cuando el proyecto destino usa convenciones distintas de las del paquete.

## Dónde vive cada literal personalizable

Cuando el proyecto destino usa una convención distinta del valor por defecto, el instalador edita el literal en cada archivo que lo contiene. Los literales ajenos a un artefacto viven embebidos en el `SKILL.md` —o `references/`— de cada pieza que los usa; los literales de un artefacto viven en su documento de reglas, instalado por el conjunto `gestores`. Los literales de este conjunto:

- El directorio de informes de revisión de PR (`.git/factory/pr-reviews`, con sustitución del prefijo `.git/` por `git rev-parse --git-common-dir`; los skills lo declaran sin nombre de convención): `revisar-pr`, `comentar-pr`, `clasificar-comentarios`, `mejorar-pr` y `gestionar-pr`.

## Personalización al instalar

Al instalar, el agente instalador recorre la guía anterior: para cada convención que difiere del valor por defecto, edita el literal en cada archivo que lo contiene —el documento de reglas del artefacto y cada consumidor que lo embebe—. Un literal compartido puede vivir en varios archivos; la forma segura de no dejar ocurrencias es buscar el valor por defecto o el nombre de la convención en el paquete instalado y editar cada resultado. Las plantillas de `assets/` de los consumidores reproducen literales de la convención por defecto y se reescriben igualmente.

Cuando el proyecto instala varios conjuntos de la colección, la personalización se aplica sobre la unión instalada: cada conjunto trae la guía de sus propios literales y los artefactos compartidos se preparan una sola vez.
