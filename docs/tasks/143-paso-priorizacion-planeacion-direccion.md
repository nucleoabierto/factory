# Integrar la priorización como paso de la planeación de dirección

## Estado

[r] En revisión

## Tipo

desarrollo

## Objetivo

Integrar la comparación por escenarios como paso nuevo del flujo de planeación de dirección, de modo que ordenar las líneas deje de ser orden de inserción: la planeación solicita el norte, invoca la comparación, presenta las alternativas con sus implicaciones en la puerta humana y refleja en la dirección el orden elegido junto con los atributos declarados por línea.

## Dependencias

- 142.

## Entrada

- La capacidad de comparación creada por el borrador 01.
- El skill de planeación de dirección del proyecto evaluado (en Factory: `planificar-roadmap`) y el documento de dirección que produce, con su formato de líneas.
- Las convenciones del proyecto sobre horizontes comprometidos y su reflejo en el índice de tareas.

## Resultado esperado

- La planeación de dirección incorpora la priorización objetiva como paso con su puerta humana: el orden de las líneas sale de escenarios decididos, no del orden de llegada.
- Las líneas de la dirección declaran los atributos que la comparación usa, y la decisión de orden queda registrada con su justificación.

## Criterios de calidad

- El paso se ejecuta dentro del flujo de planeación existente sin romper su contrato: la dirección sigue produciendo horizontes con justificación, ahora alimentados por la comparación.
- La puerta humana del paso presenta las alternativas completas —tabla comparada, implicaciones— y admite elegir, pulir valores o rechazar.
- El formato de las líneas de la dirección declara los atributos comparados sin duplicar la justificación prosaica existente.

## Procedimiento sugerido

1. Leer el skill de planeación de dirección y su documento producido para ubicar el punto exacto de inserción del paso.
2. Integrar la invocación de la comparación con su puerta humana y el reflejo del orden elegido en la dirección.
3. Extender el formato de las líneas para declarar los atributos comparados.
4. Actualizar las convenciones y la documentación afectadas por el paso nuevo.

## Contexto

- Épica `docs/epics/005-priorizacion-declarada.md`: guía transversal —la comparación es capacidad invocable compartida, no lógica privada del consumidor— y criterio de cierre del conjunto. PRD `docs/prd/005-priorizacion-declarada.md`: CU-1 (priorizar en la planeación) es el caso que esta pieza cubre; CU-2 y CU-3 quedan para la 144, CU-4 ya lo cubre la invocación directa.
- `.agents/skills/priorizar-lineas/SKILL.md` (tarea 142): produce el escenario —norte, comparación con confianza e incertidumbre, ≥2 alternativas, doble puerta, persistencia en `docs/priorizaciones/NNN-slug.md`— y declara «planeación de dirección» como disparador válido; su paso 9 deja la aplicación del orden al invocador. No requiere cambios.
- `.agents/skills/planificar-roadmap/SKILL.md`: flujo actual Reunir → Redactar → Puerta → Materializar; el paso 5 ordena Now/Next por «secuencia de ejecución» con criterio cualitativo —el punto de inserción—. Consume `inventario` de `consultar-artefactos` y `recolocar`/`registrar-revision` de `actualizar-artefactos`.
- `.agents/skills/planificar-roadmap/assets/roadmap.md`: la plantilla con el formato de línea por horizonte que hay que extender con los atributos.
- `.agents/skills/mantener-roadmap/SKILL.md`: reflector que solo escribe el campo «Estado» y retira líneas completadas; tolera campos ajenos pero su «formato esperado» debe reconocer los nuevos.
- Decisiones vigentes: D022/D027 (roadmap y horizontes), D035 (reglas declarativas), D036 (priorización por escenarios), D005 (detalle en references), D006 (revisión de redacción preventiva), D028 (letras ZOMBIE en la suite).
- Lecciones: listas anidadas para entradas con varios campos; contratos a nivel de capacidad; no publicar operaciones sin consumidor; artefactos genéricos; vocabulario llano; verificación preventiva sobre el estado final.
- Documentación viva afectada: `docs/mapa-de-flujos.md` (la invocación `planificar-roadmap → priorizar-lineas` es cableado nuevo y `docs/priorizaciones/` aún no figura como artefacto de estado), `PERSONALIZE.md` (el literal `dir_priorizaciones` puede aparecer en la plantilla del roadmap). El dominio 002 y el changelog los cubren los sensores de cierre.

## Conectividad

Conectada. Todo lo que la tarea asume existe: `priorizar-lineas` con su plantilla de escenario, `planificar-roadmap` con su plantilla de roadmap, las operaciones `inventario` y `siguiente` de `consultar-artefactos`, `recolocar` y `registrar-revision` de `actualizar-artefactos`, el literal `dir_priorizaciones` registrado en `PERSONALIZE.md` y el PRD 005 que ancla la suite. Ninguna brecha exige tarea puente.

## Plan técnico

- [x] Integrar el paso de priorización en `planificar-roadmap/SKILL.md`
  - Aporta: la sección «Priorizar las líneas» entre «Reunir las líneas» y «Redactar el borrador» invoca `priorizar-lineas` con disparador «planeación de dirección» —invocación completa: el skill reúne, pide el norte, compara, escala, presenta alternativas y persiste el escenario—; el orden confirmado alimenta el borrador y, ante rechazo o aplazamiento, el orden vigente se conserva con la revisita registrada. La `description` y la «Salida» quedan a nivel de capacidad —el orden sale de escenarios decididos—; «Finalización» exige el escenario persistido; se referencia `priorizar-lineas` y D036.
  - Contexto: las puertas se componen —la doble puerta del escenario decide el orden, la puerta del roadmap aprueba horizontes, justificaciones y documento—; el corte Now (3-5 con estado) / Next lo hace la redacción sobre el orden elegido.
- [x] Extender `planificar-roadmap/assets/roadmap.md`
  - Aporta: las líneas de Now y Next declaran el bloque anidado `Comparación` —valor, criticidad temporal, habilitación/riesgo, tamaño y la confianza menor— y el campo `Escenario` con el `docs/priorizaciones/NNN-slug.md` que decidió su posición; los textos guía declaran que el orden sale del escenario y que Later y No ahora no llevan comparación.
- [x] Ajustar `mantener-roadmap/SKILL.md`
  - Aporta: el «formato esperado» declara los campos nuevos como ajenos al reflejo —se conservan intactos— y su ausencia en líneas del formato anterior no vuelve la línea irresoluble.
- [x] Actualizar `docs/mapa-de-flujos.md`
  - Aporta: `ROADMAP.md` declara que su orden sale de escenarios de `priorizar-lineas` invocado por la planeación; `docs/priorizaciones/` entra en «Artefactos que transportan estado».
- [x] Actualizar `PERSONALIZE.md` si la plantilla referencia `docs/priorizaciones`
  - Aporta: el literal `dir_priorizaciones` señala también `planificar-roadmap/assets/roadmap.md`.
- [x] Revisión preventiva de redacción sobre el texto final
  - Aporta: `revisar-redaccion` seguido de `pulir-escritura` —o el equivalente manual— cubriendo el estado final tras las rondas de corrección.

## Suite de pruebas esperada

- Dada una planeación con varias líneas abiertas, el procedimiento invoca `priorizar-lineas` con disparador «planeación de dirección» antes de redactar, y el orden del roadmap es el del escenario confirmado (CU-1). **(I)**
- Dado el rechazo o aplazamiento de las alternativas, el borrador conserva el orden vigente y la revisita queda registrada sin aplicar (variante de CU-1). **(E)**
- Dado el roadmap producido, cada línea de Now y Next declara atributos, confianza y escenario sin duplicar la justificación (CU-1). **(I)**
- Dada una línea con el formato nuevo, el reflector actualiza su «Estado» sin tocar comparación ni escenario; dada una línea sin ellos, la trata como válida. **(B)**
- Dado el mapa de flujos, describe la invocación `planificar-roadmap → priorizar-lineas` y el artefacto `docs/priorizaciones/`. (regresión)
- Dado el paquete, `planificar-roadmap` sigue por debajo de 500 líneas, con el detalle fuera del cuerpo y sin referencias que no viajen con él. (regresión)

## Revisión

- Subagente: 2026-10-26 — Aprueba
- Usuario (ejecución): [fecha] — [Aprueba | Solicita cambios]
- Usuario (cierre): [fecha] — [Aprueba | Solicita cambios]
