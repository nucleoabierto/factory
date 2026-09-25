# Investigar generadores de sitio Markdown-first de configuración progresiva

## Estado

[ ] Pendiente | [~] En progreso | [r] En revisión | [x] Completada | [!] Bloqueada

## Tipo

investigación

## Objetivo

Comparar los generadores de sitio estático cuya entrada es markdown simple y que funcionan sin configuración obligatoria pero admiten personalización progresiva (índice navegable, tema, búsqueda, extensiones), y elegir el que adopta la documentación de producto de todo-app.

## Dependencias

- Ninguna

## Entrada

- La decisión de forma ya tomada: markdown simple como fuente, SSG Markdown-first, sin build obligatorio para leer los docs, personalización progresiva.
- `docs/research/2026-09-documentacion-producto-y-roadmap.md` — la comparación Sphinx vs MkDocs ya descarta Sphinx; queda abierto el espacio MkDocs, Zensical, mdBook, VitePress u otros Markdown-first.
- El criterio estructural de la decisión: funciona sobre un directorio de `.md` sin configurar; la configuración existe pero es opcional e incremental; consumible por humanos directamente en el repo.

## Resultado esperado

- Documento de investigación en `docs/research/` con la comparación de los candidatos y la recomendación justificada del SSG adoptado.

## Criterios de calidad

- La comparación evalúa al menos tres candidatos Markdown-first (p. ej., MkDocs, Zensical, mdBook, VitePress) contra los criterios estructurales declarados.
- La recomendación declara explícitamente qué ocurre sin configuración y qué habilita cada nivel de configuración.
- Cada afirmación sustantiva tiene su fuente citada, con marca temporal.
- La limitación declarada: las herramientas de agentes/docs recientes cambian rápido y la adopción real es difícil de medir.

## Procedimiento sugerido

1. Invocar el skill `investigar` con la pregunta: «¿Qué SSG Markdown-first adoptar para documentación de producto que funcione sin configuración y admita personalización progresiva?».
2. Comprobar que `docs/research/` no tiene ya una investigación vigente sobre el tema.
3. Sintetizar la recomendación con el nivel de configuración mínimo y el de personalización.

## Notas

- La investigación previa ya descartó Sphinx; esta investigación decide *entre* los Markdown-first, no reabre la decisión de usar SSG.

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario: [fecha] — [Aprueba | Solicita cambios]
