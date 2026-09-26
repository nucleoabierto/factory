# Investigar mejores prácticas de guías de estilo de diseño para agentes IA

## Estado

[ ] Pendiente | [ ] En progreso | [ ] En revisión | [x] Completada | [ ] Bloqueada

## Tipo

investigación

## Objetivo

Recopilar y sintetizar las mejores prácticas para que agentes IA trabajen con guías de estilo de diseño en proyectos frontend, como entrada para diseñar dos skills: uno que genere la guía de estilo de un proyecto y otro que la aplique y valide su cumplimiento en el frontend. La motivación es la brecha observada en `todo-app/`: el flujo produce código funcional pero sin sistema de diseño (CSS con colores y tamaños hardcodeados, sin tokens).

## Dependencias

- Ninguna.

## Entrada

- La brecha observada en `todo-app/style.css`: valores hardcodeados, sin `:root`, sin tokens ni escala tipográfica o de espaciado.
- El objetivo de los dos skills previstos: (1) generar la guía de estilo de un proyecto y mantenerla viva; (2) aplicarla al escribir frontend y validar que el resultado la cumple.

## Resultado esperado

- Documento de investigación en `docs/research/` siguiendo el formato del skill `investigar`, con conclusiones justificadas, referencias verificables y marca temporal, que cubra dos bloques:
  - **Generación y mantenimiento de la guía**: qué forma debe tener una guía de estilo consumible por agentes (design tokens, CSS custom properties, formatos estructurados como el estándar W3C Design Tokens, JSON, Markdown), qué contenido mínimo debe declarar (color, tipografía, espaciado, componentes, iconografía, tono visual), dónde debe vivir en el repositorio y cómo mantenerla sincronizada con el código a medida que el producto evoluciona.
  - **Aplicación y validación en el frontend**: cómo un agente aplica la guía al escribir o modificar frontend (tokens antes que valores literales, componentes de referencia), y cómo validar el cumplimiento —revisión por agente con checklist, linting automático (stylelint, variables obligatorias), pruebas visuales o de contrato— con sus ventajas y límites.
  - Ejemplos y patrones existentes relevantes: skills de diseño publicados, sistemas de design tokens en código abierto, guías de estilo orientadas a agentes.

## Criterios de calidad

- El documento distingue con evidencia qué formato de guía es más consumible por un agente y justifica la recomendación.
- El documento propone un ciclo de mantenimiento concreto para la guía (quién la actualiza, cuándo, cómo se detecta la deriva).
- El documento compara al menos dos estrategias de validación del cumplimiento en frontend y declara límites de cada una.
- Toda afirmación de peso tiene referencia verificable.
- Las conclusiones son accionables: permiten diseñar los dos skills sin nueva investigación.

## Procedimiento sugerido

1. Ejecutar el skill `investigar` sobre los dos bloques descritos en el Resultado esperado.
2. Usar `todo-app/` como caso de referencia: la guía que se diseñe debería poder generarse sobre su `style.css` actual.
3. Sintetizar recomendaciones separadas para el skill generador y el skill aplicador/validador.

## Notas

- El alcance acordado con el usuario se limita a la forma de generar y mantener la guía, y a cómo aplicarla y validarla en el frontend; quedan fuera de esta investigación temas como accesibilidad exhaustiva o frameworks concretos salvo que aparezcan como evidencia relevante.

## Revisión

- Subagente: 2026-09-26 — Solicita cambios (referencia huérfana, vocabulario «gatean», atribución ambigua) → corregido
- Usuario: 2026-09-26 — Aprueba (con corrección: el skill generador se renombra a `documentar-guia-estilo` para reflejar que mantiene, no solo genera)
