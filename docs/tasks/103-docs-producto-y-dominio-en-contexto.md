# Incluir documentación de producto y dominio en recopilar-contexto

## Estado

[ ] Pendiente | [ ] En progreso | [ ] En revisión | [x] Completada | [ ] Bloqueada

## Tipo

mantenimiento

## Objetivo

Ampliar el skill `recopilar-contexto` para que la recopilación incluya la documentación de producto (`product-docs/`) y la de dominios (`docs/domains/`) aplicable al trabajo de la tarea. Hoy el contexto cubre archivos similares, patrones, lecciones y decisiones, pero ignora lo que el proyecto ya documentó sobre sus funcionalidades y conceptos de dominio, con lo que la planeación puede contradecir la documentación viva sin saberlo.

## Dependencias

- Ninguna.

## Entrada

- `.agents/skills/recopilar-contexto/SKILL.md` — el skill a modificar.
- Las capacidades simétricas que ya recuperan esa documentación: `documentar-producto` y `documentar-dominio` —como referencia de qué directorios y artefactos cubre cada una— y `consultar-lecciones`/`consultar-decisiones` —como modelo de recuperación citada.
- Las decisiones y lecciones que rigen la edición de skills: D003 (skills autocontenidos), D004 (estándar Agent Skills), D005 (SKILL.md < 500 líneas, detalle en `references/`).

## Resultado esperado

- `.agents/skills/recopilar-contexto/SKILL.md` actualizado de forma coherente en todas sus secciones:
  - La `description` del frontmatter menciona la documentación de producto y dominio entre lo recopilado.
  - La salida declara las dos fuentes nuevas además de las cuatro actuales.
  - Los principios rectores reflejan las seis fuentes (o se reformulan para no depender del número).
  - El procedimiento incluye la localización de los documentos de producto y dominio aplicables al subsistema que la tarea toca, citados por su ruta con una frase de por qué aplican —sin copiar su contenido.
  - La finalización exige las seis fuentes cubiertas o declaradas sin aportación.
- Si el detalle de cómo identificar los documentos aplicables hace crecer el cuerpo por encima de lo razonable, se mueve a `references/` según D005.

## Criterios de calidad

- El `SKILL.md` cumple D004 y D005: frontmatter estándar y cuerpo compacto.
- La `description` declara capacidad y resultado, no mecánica (lección `contratos-de-skills`).
- Las dos fuentes nuevas se citan por ruta o nombre con justificación breve, sin duplicar su contenido en la sección Contexto (mismo principio que lecciones y decisiones).
- Las fuentes sin aportaciones se declaran («ninguna aplica»), no se omiten —comportamiento consistente con las fuentes actuales.
- El skill sigue siendo genérico: no asume rutas concretas de todo-app ni de ningún proyecto evaluado concreto (lección `diseno-de-artefactos`); los directorios de documentación se describen por su convención, no por una ruta fija.

## Procedimiento sugerido

1. Releer `recopilar-contexto` completo y revisar `documentar-producto` y `documentar-dominio` para fijar qué documentación produce cada uno y cómo se referencia.
2. Redactar los cambios del `SKILL.md`, revisar redacción y pulir antes de escribir.
3. Verificar coherencia de todas las secciones (frontmatter, cuándo usar/no usar, entrada, salida, principios, procedimiento, finalización).

## Notas

- Corrección del usuario en revisión: la lista de fuentes queda como guía abierta y extensible, no limitativa a las seis, y la `description` del skill se reescribió a nivel de capacidad —enumerar las fuentes acoplaba el contrato a la implementación—. Incorporado: la description habla de «el terreno del codebase y lo que la documentación y la memoria del proyecto ya declaran» y el cuerpo declara la lista de fuentes como abierta.

## Revisión

- Subagente: 2026-09-28 — Solicita cambios (planear-implementacion, README y glosario de dominio desfasados con el contrato de cuatro fuentes) → incorporados → Aprueba
- Usuario: 2026-09-28 — Solicita cambios (lista de fuentes abierta, no limitativa; description a nivel de capacidad) → incorporado → Aprueba
