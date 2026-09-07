# D004: Estándar Agent Skills

## Estado

Aceptada

## Contexto

Inicialmente los skills del proyecto usaban formatos ad hoc: archivos Markdown sin frontmatter, sin `name` ni `description`, ubicados en la raíz del repositorio. Esto impedía que el agente los descubriera y los invocara de forma autónoma, y ataba el proyecto a un arnés específico.

## Decisión

Adoptamos el estándar Agent Skills (agentskills.io) para todos los skills del proyecto. Los skills viven bajo `.agents/skills/`, con `SKILL.md` y frontmatter YAML con los campos `name` y `description`. Usamos solo los campos del estándar y no dependemos de capacidades específicas de un arnés.

## Justificación

El estándar Agent Skills es portable: lo soportan Claude Code, Windsurf, Microsoft Agent Framework, OpenAI Codex y otros. El frontmatter con `name` y `description` permite que el agente descubra e invoque los skills de forma autónoma. La ubicación `.agents/skills/` es universalmente reconocida. Usar solo los campos del estándar mantiene los skills agnósticos al arnés y portables entre herramientas.
