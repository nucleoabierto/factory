# Crear la capacidad de comparación por escenarios de las líneas

## Estado

[r] En revisión

## Tipo

desarrollo

## Objetivo

Crear la capacidad que compara objetivamente las líneas de trabajo abiertas: guiada por uno o dos temas-norte que declara el usuario, puntúa cada línea sobre atributos relativos —valor, criticidad temporal, habilitación/riesgo y tamaño— con confianza y factores de incertidumbre explícitos, y produce dos o más planificaciones alternativas, cada una con sus implicaciones en beneficios y costes, para que el usuario elija y pula los valores antes de fijar el orden.

## Dependencias

- Ninguna.

## Entrada

- `docs/research/2026-10-metodos-priorizacion-lineas.md` — mecanismo recomendado: comparación relativa tipo WSJF adaptada, confianza e incertidumbre explícitas, justificación por decisión.
- El formato de las líneas de trabajo de la dirección del proyecto evaluado y las decisiones que lo rigen (en Factory: D022 y D027 del registro de decisiones).
- Los skills existentes que consumirán o compartirán dominio: la planeación de dirección y el reflector del *roadmap*.

## Resultado esperado

- Un skill nuevo —autocontenido, portable e invocable bajo demanda— que produce escenarios de priorización completos: norte declarado, tabla comparada de líneas con atributos y confianza, alternativas con implicaciones y el orden elegido con su justificación registrada.

## Criterios de calidad

- Los atributos y sus escalas quedan declarados en el skill, siguiendo la recomendación de la investigación: estimación relativa entre líneas, nunca en unidades absolutas; confianza en escala cerrada; factores de incertidumbre que escalan a revisión.
- La salida siempre ofrece al menos dos alternativas con implicaciones explícitas —beneficios y costes de cada orden—; nunca un único veredicto.
- El norte que declara el usuario guía la alineación del resto de líneas, no solo la cabeza del orden.
- La decisión queda registrada con contexto, alternativas y límites; el orden nunca se aplica sin puerta humana.
- Sigue el estándar Agent Skills y las convenciones del proyecto: cuerpo bajo 500 líneas, detalle en `references/`, sin depender de un arnés concreto.

## Procedimiento sugerido

1. Leer la investigación de apoyo y los skills hermanos de planeación de dirección y reflector, para fijar el dominio compartido —qué es una línea, un horizonte, una agrupación—.
2. Diseñar el modelo de comparación: atributos, escalas, forma de la tabla comparada, declaración del norte y formato de las alternativas con implicaciones.
3. Redactar el skill con su procedimiento: recoger líneas abiertas, declarar el norte, comparar, componer alternativas, presentar para elección y pulido, registrar la decisión.
4. Registrar la decisión de diseño del mecanismo en el registro de decisiones del proyecto.

## Contexto

- Archivos similares:
  - `docs/research/2026-10-metodos-priorizacion-lineas.md` — la investigación que fundamenta el mecanismo: comparación relativa tipo WSJF adaptada, confianza en escala cerrada, factores de incertidumbre que escalan, decisión registrada con contexto y alternativas.
  - `.agents/skills/planificar-roadmap/SKILL.md` — el consumidor de la capacidad (tarea 143): hoy ordena Now/Next cualitativamente y refleja los horizontes en el índice; su consulta «las líneas de trabajo abiertas» es la fuente de líneas.
  - `.agents/skills/mantener-roadmap/SKILL.md` — el reflector: refleja el estado real de las líneas Now al cerrar tareas; no decide orden.
- Patrones:
  - Estándar de skill: `SKILL.md` con frontmatter `name`/`description`, cuerpo bajo 500 líneas, detalle en `references/` (D004, D005); el skill nuevo se registra en el manifiesto `teleprompter.json`.
  - Las lecturas mecánicas de artefactos se delegan en `consultar-artefactos`; las escrituras, en `actualizar-artefactos` (D035).
  - El registro de la decisión corre con `decisiones-diseno` dentro de la propia tarea (lección de diseño de artefactos).
- Dominio: `docs/domains/002-flujo-idea-a-tarea.md` — cubre propuestas, épicas y el roadmap como línea de dirección.
- Producto: `product-docs/vision.md` — la gestión a nivel de producto es la frontera que esta capacidad abre.
- PRD: `docs/prd/005-priorizacion-declarada.md` — CU-1 (priorizar en planeación de dirección) y CU-4 (revisita bajo demanda) son los casos que esta pieza materializa; CU-2 y CU-3 los cablea la tarea 144.
- Lecciones:
  - `contratos-de-skills` — nombre y description a nivel de capacidad; reglas inline; formatos en `assets/` o `references/`; referencias solo a material que viaja con el paquete.
  - `diseno-de-artefactos` — la capacidad es genérica sobre «las líneas de trabajo del proyecto evaluado», sin acoplar a este repositorio.
  - `flexibilidad-en-procesos` — las listas declarativas (atributos, factores) van abiertas.
  - `vocabulario` — español llano.
- Decisiones:
  - `D022` y `D027` — el roadmap como nivel de dirección con horizontes de confianza; la capacidad propone orden dentro de ese modelo, no lo redefine.
  - `D035` — la delegación mecánica vigente.
  - `D010` — el registro de la decisión del mecanismo es parte del resultado.
- Vacíos: ninguno detectado; la investigación y el PRD existen, y el consumidor tiene dónde integrar el paso.

## Conectividad

**Veredicto:** conectada.

Todo lo que la tarea asume existe: la investigación con la recomendación, el PRD con los casos de uso, la épica con la guía, los gestores de artefactos para las lecturas y escrituras, y `decisiones-diseno` para el registro. El skill nuevo es autocontenido y no requiere capacidad base ausente.

## Plan técnico

El subsistema es un skill nuevo, `priorizar-lineas`, autocontenido e invocable bajo demanda, que produce escenarios de priorización comparando las líneas abiertas del proyecto evaluado. Sus consumidores futuros son la planeación de dirección (143) y los disparadores de revisita (144); esta pieza crea la capacidad con su punto de entrada independiente y el artefacto donde la decisión queda registrada.

- [x] Definir el modelo de comparación en `references/modelo-comparacion.md`
  - Aporta: el detalle pesado —atributos (valor, criticidad temporal, habilitación/riesgo, tamaño), estimación relativa entre líneas nunca absoluta, confianza en escala cerrada (alta/media/baja), factores de incertidumbre y la regla de escalación (confianza baja o ≥3 factores llevan el punto a revisión explícita)— queda en `references/` y el cuerpo bajo 500 líneas (D005).
- [x] Redactar `SKILL.md` con el procedimiento
  - Aporta: recoger las líneas abiertas delegando «las líneas de trabajo abiertas» en `consultar-artefactos`, pedir el norte al usuario (uno o dos temas), comparar cada línea con confianza y factores, componer ≥2 planificaciones alternativas con implicaciones en beneficios y costes, presentar para elección y pulido, y persistir la decisión.
  - Contexto: la puerta humana es doble —elección entre alternativas y confirmación antes de aplicar—; el rechazo deja el orden como estaba con la revisita registrada (variante de CU-1).
- [x] Declarar el artefacto del escenario: `docs/priorizaciones/NNN-slug.md` con su plantilla en `assets/`
  - Aporta: la decisión queda persistida con contexto —norte, tabla comparada, alternativas, límites, disparador— y el orden elegido, auditable después (PRD e investigación).
  - Contexto: directorio nuevo nombrado por el contenido (lección de nomenclatura), serie numerada propia; los formatos producidos viven en `assets/` (lección de contratos de skills).
- [x] Registrar la decisión de diseño del mecanismo
  - Aporta: la entrada `DNNN` del registro que consolida el modelo de comparación, la doble puerta y el artefacto del escenario —parte explícita del resultado esperado.
- [x] Dar de alta el skill en `teleprompter.json`
  - Aporta: el paquete instala el skill nuevo; sin la entrada no viaja.

## Suite de pruebas esperada

Trazada al PRD `005` (CU-1 y CU-4 cubre esta pieza):

- Dado un conjunto de líneas abiertas y un norte declarado, el skill produce una tabla comparada donde cada línea lleva los mismos atributos estimados relativamente, con confianza y factores de incertidumbre (CU-1).
- Dada la comparación, la salida ofrece al menos dos planificaciones alternativas con implicaciones explícitas en beneficios y costes —nunca un único veredicto (CU-1, CU-4).
- Dada una línea con confianza baja o tres o más factores de incertidumbre, el punto escala a revisión explícita del usuario antes de fijarse (CU-1).
- Dado el rechazo de todas las alternativas, el orden queda como estaba y la revisita queda registrada —no aplicada ni silenciada (variante de CU-1).
- Dado el orden elegido, ningún orden se aplica sin confirmación humana y la decisión queda registrada con contexto, alternativas y límites (CU-1, CU-4).
- Dado el skill nuevo, cumple el estándar: frontmatter estándar, cuerpo <500 líneas, detalle en `references/`, entrada en `teleprompter.json` (regresión del paquete).

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario (ejecución): [fecha] — [Aprueba | Solicita cambios]
- Usuario (cierre): [fecha] — [Aprueba | Solicita cambios]
