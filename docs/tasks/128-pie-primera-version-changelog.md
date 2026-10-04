# Pie de primera versión en el changelog

## Estado

[ ] Pendiente | [~] En progreso | [r] En revisión | **[x] Completada** | [!] Bloqueada

## Tipo

mantenimiento

## Objetivo

Al liberar la 0.3.0 se descubrió que el enlace comparativo de la primera versión no funciona en GitHub: el árbol vacío de git (`4b825dc…`) es un objeto tree y el comparador de GitHub solo acepta commits, branches o tags. La referencia del skill `liberar-version` decía «se omite o apunta a la raíz del historial según lo que el host soporte» sin documentar cuál es la alternativa que funciona. La tarea registra la práctica aprendida: para la primera versión, el pie apunta a la página de release del tag.

## Dependencias

- Ninguna

## Entrada

- La corrección aplicada durante el release 0.3.0 de este proyecto.
- `references/promocion-y-semver.md` del skill `liberar-version`.

## Resultado esperado

- `references/promocion-y-semver.md` actualizado: la mecánica del paso 3 documenta que GitHub no soporta comparar contra la raíz del historial y que la alternativa que funciona es la página de release del tag.

## Criterios de calidad

- La referencia declara la limitación de GitHub con su causa (tree vs commit).
- La alternativa documentada es la que se aplicó y verificó en este repositorio.

## Procedimiento sugerido

1. Ajustar el punto 3 de la mecánica de la promoción con la limitación y la alternativa.

## Notas

- Tarea y ejecución en el mismo commit a pedido del usuario.

## Revisión

- Subagente: no invocado — cambio de una línea en material de referencia, ordenado y aprobado por el usuario antes de ejecutarse.
- Usuario: 2026-10-04 — Aprueba
