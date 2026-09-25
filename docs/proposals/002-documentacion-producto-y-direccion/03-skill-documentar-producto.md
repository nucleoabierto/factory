# Crear el skill que mantiene la documentación de producto

## Tipo

desarrollo

## Objetivo

Crear el skill que mantiene viva la documentación de producto del proyecto evaluado: al cerrar una tarea de tipo `desarrollo`, evalúa si el diff altera funcionalidades, flujos o referencia del producto y solo entonces actualiza; delimitado frente a `documentar-dominio` por audiencia y contenido.

## Dependencias

- Borrador 02

## Entrada

- El directorio de documentación de producto creado por el borrador 02, con su estructura y su convención de ancla doc↔test.
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
2. Crear la plantilla del documento de funcionalidad en `assets/` si el borrador 02 no la dejó ya definida.
3. Cablear la invocación en `ejecutar-tareas` y actualizar la delimitación en `documentar-dominio`.
4. Registrar en el README del proyecto el skill nuevo en la tabla de «Salud del dominio» o la sección que corresponda.
5. Registrar con `decisiones-diseno` la decisión que consolida esta tarea: el nuevo sensor de producto y su delimitación frente a `documentar-dominio`.

## Notas

- Si el análisis muestra que una extensión de `documentar-dominio` cubre el caso sin mezclar audiencias, documentar la divergencia y discutirla con el usuario antes de decidir; la propuesta asume skill separado por la justificación ya validada (audiencias y ritmos distintos).
