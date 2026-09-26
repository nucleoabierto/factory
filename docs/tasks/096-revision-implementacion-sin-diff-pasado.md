# Revisión de implementación sin diff pasado al subagente

## Estado

[ ] Pendiente | [ ] En progreso | [ ] En revisión | [ ] Completada | [ ] Bloqueada

## Tipo

mantenimiento

## Objetivo

Simplificar `revisar-implementacion` para que el subagente revisor obtenga los cambios por sí mismo desde el historial de git —`git status`, `git diff` o el rango de commits de la tarea— en lugar de recibir el diff como entrada preparada por el ejecutor.

## Dependencias

- Ninguna

## Entrada

- `.agents/skills/revisar-implementacion/SKILL.md`, cuya Entrada exige «el diff de los cambios (`git diff`, incluidos los archivos nuevos)» y cuyo procedimiento dedica una fase a «reunir el paquete de revisión».
- El historial de git como fuente disponible del cambio.

## Resultado esperado

- La Entrada ya no exige el diff como dato: el revisor recibe el archivo de la tarea y la indicación de dónde están los cambios (árbol de trabajo sin commitear o rango de commits), y los obtiene con git.
- El procedimiento deja de «reunir el paquete»: el subagente reconstruye el diff él mismo, preservando el contexto aislado —sigue sin recibir el razonamiento del ejecutor.

## Criterios de calidad

- El principio de contexto aislado se mantiene: el revisor conoce la tarea y dónde mirar, no las conclusiones del ejecutor.
- El skill cubre tanto cambios sin commitear como cambios ya commiteados de la tarea.
- El encargo al subagente declara cómo obtener el diff (comandos o descripción resoluble), no el contenido.

## Procedimiento sugerido

1. Releer Entrada, fase 1 del procedimiento y el encargo al subagente.
2. Reescribirlos para que la fuente del cambio sea el historial de git.
3. Aplicar revisión de redacción y pulido mecánico en modo preventivo.

## Notas

- Solicitado por el usuario: el diff no necesita viajar como entrada porque git ya lo contiene.

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario: [fecha] — [Aprueba | Solicita cambios]
