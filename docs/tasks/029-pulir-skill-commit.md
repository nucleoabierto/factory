# Pulir skill de commit para explicar qué y por qué, no el contenido

## Estado

[x] Completada

## Objetivo

Revisar y corregir el skill `commit` para que sus mensajes expliquen el *qué* y el *porqué* del cambio, no el contenido detallado de los archivos modificados. El diff ya muestra el contenido; el mensaje de commit debe aportar el contexto que el diff no revela: qué decisión motivó el cambio y por qué se tomó.

## Dependencias

- Ninguna

## Entrada

- Skill `commit` en `.agents/skills/commit/SKILL.md` y `.agents/skills/commit/references/convenciones.md`.
- Historial de git del proyecto como ejemplos de commits actuales.
- Investigación en `docs/research/commits-best-practices.md`.

## Resultado esperado

- `SKILL.md` y `references/convenciones.md` actualizados para enfatizar que el cuerpo del commit explica el *qué* y el *porqué*, no el contenido del cambio.
- Ejemplos de commits buenos y malos que ilustren la distinción.

## Criterios de calidad

- El skill distingue explícitamente entre el contenido del cambio (visible en el diff) y el contexto del cambio (el *qué* y el *porqué*).
- El skill prohíbe o desaconseja enumerar los archivos modificados o describir el contenido de los cambios en el cuerpo del commit.
- Incluye al menos un ejemplo de commit malo (que describe el contenido) y uno bueno (que explica el *qué* y el *porqué*).
- Pasa revisión de redacción y pulido mecánico.
- Pasa revisión técnica por subagente independiente.

## Procedimiento sugerido

1. Revisar el skill `commit` actual y la investigación en `docs/research/commits-best-practices.md`.
2. Identificar dónde el skill permite o fomenta describir el contenido en lugar del contexto.
3. Reformular las instrucciones para que el cuerpo explique el *qué* y el *porqué*.
4. Añadir ejemplos de commits buenos y malos.
5. Aplicar revisión de redacción y pulido mecánico.
6. Presentar al usuario para aprobación.

## Notas

- Este defecto se identificó al revisar los commits del proyecto, que tienden a describir el contenido de los cambios en lugar de su motivación.

## Revisión

- Subagente: 2026-09-07 — Aprueba
- Usuario: 2026-09-07 — Aprueba
