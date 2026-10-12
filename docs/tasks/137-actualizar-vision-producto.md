# Actualizar la visión de producto

## Estado

[ ] Pendiente | [~] En progreso | [r] En revisión | [x] Completada | [!] Bloqueada

**[ ] Pendiente**

## Tipo

mantenimiento

## Objetivo

`product-docs/vision.md` quedó desactualizada respecto al estado real del sistema: lista la planeación de roadmap como pendiente cuando `planificar-roadmap`, `mantener-roadmap` y `cerrar-conjunto` ya existen; formula la validación externa como futura cuando `todo-app` ya se construyó con el sistema y `modern-todo-app` está en curso como segunda validación; y el alcance no menciona la liberación de versiones que `mantener-changelog` y `liberar-version` ya cubren (0.4.0 publicada). Actualizar la visión para que describa el producto que existe y la brecha que de verdad queda.

## Dependencias

- Ninguna

## Entrada

- `product-docs/vision.md` — documento a actualizar.
- `ROADMAP.md`, `.agents/skills/`, `CHANGELOG.md` — estado real a contrastar.

## Resultado esperado

- `vision.md` actualizado: dirección sin «planeación de roadmap» como pendiente; validación externa como práctica continuada (todo-app entregada, modern-todo-app en curso); alcance incluye liberación de versiones y aprendizaje por lecciones.
- La dirección pasa a centrar la brecha en la revisión de código como capacidad del producto y la gestión a nivel de producto —coherente con el roadmap—.
- Sin cambios en `index.md` salvo que la descripción del documento lo exija.

## Criterios de calidad

- Ninguna afirmación del documento contradice el estado real del repositorio (skills existentes, artefactos, versiones liberadas, proyectos de validación).
- El tono y la estructura de la visión se conservan; es una actualización, no una reescritura.
- Lo que queda como brecha coincide con las líneas del roadmap vigente.

## Procedimiento sugerido

1. Releer `vision.md` completo y contrastar cada afirmación de «hoy falta» o «se validará» contra el estado real.
2. Actualizar las secciones tocadas (Dirección, Objetivos, Alcance) con la mínima escritura necesaria.
3. Verificar que ningún otro documento de `product-docs/` quede inconsistente con la visión actualizada.

## Notas

- Tarea suelta en `General`, detectada al revisar la alineación de la documentación de producto tras la liberación de la 0.4.0.

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario (ejecución): [fecha] — [Aprueba | Solicita cambios]
- Usuario (cierre): [fecha] — [Aprueba | Solicita cambios]
