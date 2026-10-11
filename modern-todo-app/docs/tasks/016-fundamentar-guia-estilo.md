# Fundamentar la guía de estilo

## Estado

**[ ] Pendiente** | [~] En progreso | [r] En revisión | [x] Completada | [!] Bloqueada

## Tipo

mantenimiento

## Objetivo

Llevar `DESIGN.md` a la estructura esperada para una aplicación TodoMVC de referencia. La guía ya fue reescrita en el formato de tres capas —principios, reglas con razón y orientación generativa— como efecto secundario de la tarea 126 del repositorio, pero nadie la ha cotejado contra la expectativa que el propio producto define: al ser una aplicación de referencia, TodoMVC tiene una estructura visual conocida en la web que la guía debe cubrir por completo. La tarea valida esa cobertura superficie a superficie y cierra los huecos con reglas fundamentadas.

## Dependencias

- Ninguna

## Entrada

- `DESIGN.md` vigente, en el formato de tres capas.
- El formato de referencia del skill `documentar-guia-estilo` del repositorio (`references/formato-design-md.md` y `references/ejemplo-design-md.md`).
- La expectativa de TodoMVC como aplicación de referencia: la spec funcional ya recopilada en las tareas 008–010 y la estructura visual canónica publicada en la web (`todomvc-app-css`/`todomvc-common` como referencia externa).
- El CSS vigente (`src/App.css`, `src/index.css`) como materialización del contrato.

## Resultado esperado

- `DESIGN.md` validado superficie a superficie contra la estructura esperada —cabecera, campo de captura, ítem y sus estados, edición, pie con contador, filtros y limpieza, estados vacíos— con los huecos cerrados: cada superficie tiene sus reglas, cada regla su razón y cada valor visual su token.
- El recorrido de conformidad documentado en el archivo de la tarea: la lista de superficies esperadas revisada una a una, sin huecos.
- Si el cotejo descubre valores visuales del código sin regla en la guía, la guía los declara o el código se alinea; no se dejan divergencias mudas.

## Criterios de calidad

- La lista de superficies esperadas queda revisada una a una y el recorrido está documentado en la tarea, sin huecos.
- Ninguna regla sin razón ni razón sin regla, en las ya existentes y en las añadidas.
- `aplicar-guia-estilo` verificado sobre la guía resultante: todo valor visual del código proviene de tokens declarados.
- Los tokens existentes no cambian; si un hueco justifica un token nuevo, el cambio queda registrado como desviación con su motivo.

## Procedimiento sugerido

1. Construir la lista de superficies esperadas desde la spec TodoMVC y la referencia web.
2. Cotejar cada superficie contra `DESIGN.md` y el CSS vigente; anotar las cubiertas y los huecos.
3. Cerrar los huecos con reglas fundamentadas —razón en las dos dimensiones UI+UX— sin tocar los tokens salvo necesidad justificada.
4. Verificar la guía resultante con `aplicar-guia-estilo` y documentar el recorrido en la tarea.

## Notas

- La línea de esta tarea ya figuraba en `TODO.txt` como residuo sin archivo; al crearla, el índice queda consistente sin tocarlo.

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario (ejecución): [fecha] — [Aprueba | Solicita cambios]
- Usuario (cierre): [fecha] — [Aprueba | Solicita cambios]
