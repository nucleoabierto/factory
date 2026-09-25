# Crear el skill que mantiene la documentación de producto

## Estado

[ ] Pendiente | [ ] En progreso | [ ] En revisión | [x] Completada | [ ] Bloqueada

## Tipo

desarrollo

## Objetivo

Crear el skill que mantiene viva la documentación de producto del proyecto evaluado: al cerrar una tarea de tipo `desarrollo`, evalúa si el diff altera funcionalidades, flujos o referencia del producto y solo entonces actualiza; delimitado frente a `documentar-dominio` por audiencia y contenido.

## Dependencias

- 084

## Entrada

- El directorio de documentación de producto creado por la tarea 084, con su estructura y su convención de ancla doc↔test.
- `.agents/skills/documentar-dominio/SKILL.md` como patrón hermano: sensor con veredicto «sin impacto», índice obligatorio, un hogar por hecho.
- `.agents/skills/ejecutar-tareas/SKILL.md` para el punto de invocación en el cierre de tareas de desarrollo.
- `docs/decisions/D021-documentacion-dominio-y-revision-arquitectura.md` — división sensor continuo / evaluación ocasional que el nuevo skill replica a nivel de producto.

## Resultado esperado

- `.agents/skills/documentar-producto/` (o el nombre que resulte) con `SKILL.md` y, si aplica, `assets/` con la plantilla del documento de funcionalidad.
- La invocación cableada en el cierre de `ejecutar-tareas` para tareas de tipo `desarrollo`, junto a `documentar-dominio`.
- La frontera entre ambos sensores declarada en ambos skills: dominio = modelo e invariantes; producto = comportamiento observable, flujos y referencia de uso.

## Criterios de calidad

- El skill declara cuándo usarlo, cuándo no, entrada, salida, principios y procedimiento con el formato común de los skills del proyecto.
- El veredicto «sin impacto» existe como salida explícita y dominante (sensor barato).
- La delimitación frente a `documentar-dominio` queda escrita en ambos documentos: un hecho de comportamiento vive en la doc de producto; un hecho de modelo, en `docs/domains/`; cada uno referencia al otro, no lo copia.
- `ejecutar-tareas` invoca el nuevo skill en el mismo punto del cierre en que hoy invoca `documentar-dominio`.
- La decisión de diseño resultante queda registrada en `docs/decisions/` como parte del cierre de la tarea.

## Procedimiento sugerido

1. Redactar el SKILL.md siguiendo la forma de `documentar-dominio`, adaptando entrada (diff + directorio de docs de producto), umbral de impacto (funcionalidad, flujo, referencia) y plantilla.
2. Crear la plantilla del documento de funcionalidad en `assets/` si la tarea 084 no la dejó ya definida.
3. Cablear la invocación en `ejecutar-tareas` y actualizar la delimitación en `documentar-dominio`.
4. Registrar en el README del proyecto el skill nuevo en la tabla de «Salud del dominio» o la sección que corresponda.
5. Registrar con `decisiones-diseno` la decisión que consolida esta tarea: el nuevo sensor de producto y su delimitación frente a `documentar-dominio`.

## Notas

- Si el análisis muestra que una extensión de `documentar-dominio` cubre el caso sin mezclar audiencias, documentar la divergencia y discutirla con el usuario antes de decidir; la propuesta asume skill separado por la justificación ya validada (audiencias y ritmos distintos).

## Plan técnico

Subsistema: los skills son directorios `.agents/skills/<nombre>/` con `SKILL.md` (secciones comunes: cuándo usar/no usar, entrada, salida, principios rectores, procedimiento, finalización, referencias) y `assets/` opcional de plantillas. `ejecutar-tareas` invoca `documentar-dominio` en el paso de cierre de las tareas de desarrollo; `product-docs/` (D024) es la instancia que el sensor nuevo mantendrá, aunque el skill habla del directorio de documentación de producto del proyecto evaluado de forma genérica.

- [x] Crear `.agents/skills/documentar-producto/SKILL.md` siguiendo la forma de `documentar-dominio`: sensor tras cada tarea de desarrollo con veredicto «sin impacto» dominante; evalúa si el diff altera funcionalidades, flujos o referencia de uso y solo entonces actualiza el directorio de documentación de producto (índice incluido)
  - Aporta: es el sensor de producto, simétrico al de dominio por la división ya validada (audiencias y ritmos distintos, D021).
  - Contexto: `description` a nivel de resultado (lección de contratos); las listas de señales de impacto se declaran abiertas y extensibles (lección de flexibilidad); reglas inline y citas solo en Referencias (lección de estabilidad temporal). Delimitación explícita: dominio = modelo e invariantes; producto = comportamiento observable, flujos y referencia de uso.
- [x] Crear `assets/feature.txt` como plantilla del documento de funcionalidad (nombre, flujo del usuario, reglas, escenarios anclados a la suite por nombre, estado), al estilo de `assets/domain.txt` del skill hermano
  - Aporta: fija el formato que el sensor crea o actualiza, coherente con los documentos que la tarea 084 dejó en `product-docs/funcionalidades/`.
- [x] Cablear la invocación en `ejecutar-tareas` junto a la de `documentar-dominio`, en el mismo punto del cierre de tareas de desarrollo
  - Aporta: el sensor corre en el ciclo, no solo bajo demanda.
- [x] Actualizar `documentar-dominio` declarando la frontera en sentido contrario (un hecho de comportamiento vive en la doc de producto; se referencia, no se copia)
  - Aporta: la delimitación queda escrita en ambos documentos, como exige el criterio de calidad.
- [x] Registrar el skill en la tabla del README, renombrando la sección a «Salud del dominio y del producto»
  - Aporta: el índice de skills refleja la capacidad nueva y el nombre de la sección sigue declarando su contenido.
- [x] Registrar en `docs/decisions/` la decisión consolidada: el sensor de documentación de producto y su delimitación frente a `documentar-dominio`
  - Aporta: la división sensor continuo de dominio / sensor continuo de producto queda trazada.

## Suite de pruebas esperada

- El skill nuevo tiene el formato común completo (cuándo usar, cuándo no, entrada, salida, principios, procedimiento, finalización, referencias) y es invocable por nombre.
- `ejecutar-tareas` invoca ambos sensores en el mismo punto del cierre de una tarea de desarrollo.
- `documentar-dominio` y `documentar-producto` declaran la frontera dominio↔producto y se referencian mutuamente.
- La plantilla `feature.txt` produce un documento de funcionalidad compatible con los que existen en `todo-app/product-docs/funcionalidades/` (escenarios con ancla a la suite por nombre).
- El README lista `documentar-producto`.

## Desviaciones del plan

- La plantilla `feature.txt` quedó más simple que lo descrito en el plan (solo nombre y escenarios, sin secciones de flujo, reglas ni estado). Motivo: coincide con los documentos reales que la tarea 084 produjo y con la lección de consistencia de formatos (declarar solo los campos coherentes con el artefacto). Decisión: mantener la plantilla simple (desviación menor).

## Revisión

- Subagente: 2026-09-25 — Aprueba
- Usuario: 2026-09-25 — Aprueba
