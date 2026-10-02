# Documentar la conexión de los skills en flujos

## Estado

[ ] Pendiente | [~] En progreso | [r] En revisión | **[x] Completada** | [!] Bloqueada

## Tipo

mantenimiento

## Objetivo

Dejar escrito el mapa de cómo se conectan los skills en flujos, hoy implícito y repartido entre los más de treinta `SKILL.md`: quién orquesta (`idea-a-tarea`, `ejecutar-tareas`), quién es capacidad invocada, quién es sensor de cierre, qué artefactos transportan el estado entre invocaciones (`TODO.txt`, `propuesta.md`, las secciones del archivo de tarea), dónde están las puertas humanas y qué skills se activan solo por convención del arnés —como el par de guía de estilo, que ningún orquestador invoca—. Reconstruir ese cableado exige hoy releer los skills cada vez que se toca un flujo; la revisión que originó esta tarea lo demostró.

## Dependencias

- Ninguna.

## Entrada

- Los `SKILL.md` de `.agents/skills/` como fuente de verdad del cableado: quién invoca a quién, con qué entrada y en qué punto.
- El `README.md`, cuya sección «Cómo funciona el ciclo de trabajo» resume hoy los dos flujos sin mostrar la conexión completa.
- Las decisiones que describen la estructura de los flujos: D009 (revisión dual), D013/D015 (propuestas en el índice), D019 (épica), D020→D031 (sub-flujo de desarrollo), D022/D027 (roadmap), D030 (ideas persistidas).

## Resultado esperado

- La sección «Cómo funciona el ciclo de trabajo» del `README.md` con el mapa resumido de flujos: orquestadores, sub-flujo de desarrollo, sensores de cierre y artefactos de estado.
- Un documento detallado en `docs/` —nombre por el tipo de contenido que almacena (lección `nomenclatura`)— con la conexión exhaustiva por flujo: puntos de entrada, capacidades en orden, sensores, artefactos que llevan el estado, puertas humanas y skills activados por convención sin invocación explícita.
- El documento describe el estado vigente, no el deseado: si el cableado cambia (p. ej., las tareas 109-111), el documento se actualiza con ellas.

## Criterios de calidad

- Toda conexión declarada en el documento se puede verificar en un `SKILL.md`; una conexión que solo existe por convención del arnés se declara como tal.
- El README resume sin duplicar el detalle: el mapa exhaustivo vive en un solo lugar.
- El documento distingue explícitamente los tres grados de conexión: invocación explícita por un orquestador o especialista, activación por convención del arnés y uso bajo demanda del usuario.

## Procedimiento sugerido

1. Recorrer los `SKILL.md` extrayendo quién invoca a quién y con qué artefacto de estado.
2. Redactar el documento detallado y el resumen del README, revisar redacción y pulir antes de escribir.

## Notas

- El mapa documenta el cableado actual; los cambios en curso (tareas 109-111) se incorporan cuando aterricen, no por adelantado.
- Ampliación de alcance aprobada por el usuario durante la revisión: actualizar también la sección «Estado actual» de `docs/definicion-proyecto.md`, que describía el sub-flujo de desarrollo con los nombres antiguos y no listaba los skills más recientes.

## Revisión

- Subagente: 2026-10-02 — Aprueba
- Usuario: 2026-10-02 — Aprueba
