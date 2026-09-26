# Registrar la decisión de modularizar con scripts clásicos

## Estado

[ ] Pendiente | [ ] En progreso | [ ] En revisión | [ ] Completada | [ ] Bloqueada

## Tipo

mantenimiento

## Objetivo

Dejar registrada como decisión de diseño la elección tomada en la revisión de arquitectura 003: dividir `app.js` en archivos por capa cargados como scripts clásicos que comparten un namespace, descartando los ES modules porque no funcionan sobre `file://` y la aplicación se abre directamente como `index.html`.

## Dependencias

- Ninguna

## Entrada

- El hallazgo H1 de `docs/architecture-reviews/003-modularidad-y-tests.md`, con sus tres opciones y sus restricciones.
- La elección del usuario: scripts clásicos.

## Resultado esperado

- Una decisión registrada (documento de decisión del subproyecto) que declara: `app.js` se divide en un archivo por capa cargado con `<script>` clásico en orden de dependencias, compartiendo lo necesario por un namespace global; se descartan los ES modules por incompatibles con `file://` y la opción de archivo único queda sustituida.

## Criterios de calidad

- La decisión queda persistida con contexto, decisión y justificación, y referencia al informe 003.
- La alternativa descartada (ES modules) y su razón quedan explícitas.

## Procedimiento sugerido

1. Crear el documento de decisión en el subproyecto.
2. Enlazarla desde el hallazgo H1 del informe («Derivado en»).

## Notas

- Los commits de este proyecto llevan el ámbito `todo-app` en Conventional Commits (`tipo(todo-app): descripción`).

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario: [fecha] — [Aprueba | Solicita cambios]
