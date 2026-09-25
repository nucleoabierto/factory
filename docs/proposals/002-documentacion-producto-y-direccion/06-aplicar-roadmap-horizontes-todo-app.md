# Reescribir el roadmap de todo-app con horizontes

## Tipo

mantenimiento

## Objetivo

Reescribir `todo-app/ROADMAP.md` con el formato de horizontes producido por el borrador 05, validando el formato sobre un caso real con épicas en vuelo y planificadas.

## Dependencias

- Borrador 05

## Entrada

- `todo-app/ROADMAP.md` actual y `todo-app/TODO.txt` — las cuatro líneas declaradas (migración ES2024 ya ejecutada, épicas 002 completada y 003-004 planificadas) y su estado real.
- La plantilla nueva de `assets/roadmap.md` y el procedimiento actualizado de `planificar-roadmap`.
- `todo-app/docs/epics/` — contenido real de las líneas para decidir horizontes.

## Resultado esperado

- `todo-app/ROADMAP.md` en el formato de horizontes, aprobado por el usuario (puerta humana del skill).
- `todo-app/TODO.txt` reflejando solo los horizontes comprometidos según la regla nueva.

## Criterios de calidad

- Cada línea tiene horizonte asignado, estado y justificación coherente con su situación real (la épica 002 completada ya no es una línea abierta).
- Later y No ahora, si se usan, contienen líneas con su razón, no un vaciado de backlog.
- El orden de `TODO.txt` coincide con el declarado para Now/Next sin tocar estados de tareas.
- La sección Revisión registra la aprobación del usuario.

## Procedimiento sugerido

1. Invocar `planificar-roadmap` sobre todo-app con el formato nuevo.
2. Presentar el borrador al usuario y ajustar hasta aprobación.
3. Materializar `ROADMAP.md` y reflejar el orden en `TODO.txt`.

## Notas

- Es la primera aplicación real del formato de horizontes: las fricciones que aparezcan se registran como experiencia si el usuario corrige el resultado.
