# Armonizar la entrada de los sensores de cierre

## Estado

[ ] Pendiente | [~] En progreso | [r] En revisión | [x] Completada | [!] Bloqueada

## Tipo

mantenimiento

## Objetivo

Uniformar la convención de entrada de los sensores del cierre del ciclo de tareas. Hoy coexisten dos formas: `documentar-dominio` y `documentar-producto` reciben «el diff de la tarea» materializado, mientras `mantener-changelog` recibe la ubicación de los cambios y reconstruye el diff con git —el patrón que ya usan `revisar-implementacion` y el subagente de revisión del paso 9—. Además, los «Cuándo usar» de ambos sensores dicen «tarea de tipo desarrollo» cuando el ciclo los invoca también para `mantenimiento (refactoring)`. La armonización deja una sola convención declarada en todos los puntos.

## Dependencias

- Ninguna.

## Entrada

- `.agents/skills/ejecutar-tareas/SKILL.md` — pasos 9, 15 y 16 como referencia de las dos convenciones coexistiendo.
- `.agents/skills/documentar-dominio/SKILL.md` y `.agents/skills/documentar-producto/SKILL.md` — los sensores a alinear.
- `.agents/skills/mantener-changelog/SKILL.md` y `.agents/skills/revisar-implementacion/SKILL.md` — el patrón canónico «ubicación de los cambios, no diff materializado».
- La corrección del usuario registrada en `EXPERIENCIAS.md` (Id `20260929T185349`) que fijó la convención.

## Resultado esperado

- La «Entrada» de `documentar-dominio` y `documentar-producto` declara la ubicación de los cambios —árbol de trabajo sin commitear o rango de commits— y que el skill reconstruye el diff con git, en lugar del diff materializado.
- El paso 15 de `ejecutar-tareas` pasa la ubicación de los cambios, coherente con el paso 16.
- Los «Cuándo usar» de ambos sensores reflejan los tipos de tarea para los que el ciclo los invoca realmente —`desarrollo` y `mantenimiento (refactoring)`—.
- Todas las secciones de los skills tocados quedan coherentes entre sí.

## Criterios de calidad

- Ninguna sección de los skills tocados declara el diff como entrada materializada: todas hablan de ubicación de los cambios y reconstrucción con git.
- Los «Cuándo usar» de los sensores coinciden con los tipos de tarea para los que el ciclo los invoca.
- Los skills modificados siguen cumpliendo D004 y D005, y el cambio no rompe el enrutado por tipo ni la revisión dual.
- El cambio se limita a los archivos de skill mencionados o la diferencia queda justificada.

## Procedimiento sugerido

1. Releer los pasos 9, 15 y 16 de `ejecutar-tareas` y las secciones «Entrada» y «Cuándo usar» de los tres sensores.
2. Redactar la armonización siguiendo la formulación de `revisar-implementacion`, revisar redacción y pulir antes de escribir.
3. Verificar la coherencia cruzada de todas las secciones tocadas.

## Notas

- Trabajo descubierto durante la revisión de la tarea 106: el subagente y el usuario detectaron la doble convención de entrada en el bloque de cierre y la discrepancia de los «Cuándo usar».

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario: [fecha] — [Aprueba | Solicita cambios]
