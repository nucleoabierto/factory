---
name: revisar-implementacion
description: >
  Revisión técnica de la implementación de una tarea de
  desarrollo: un subagente de contexto aislado revisa el diff
  contra las convenciones del proyecto y los archivos hermanos
  o de funcionalidad similar, y produce un informe con veredicto.
  Usar en el paso de revisión del ciclo de tareas cuando la tarea
  es de tipo desarrollo.
  Sinónimos: revisar implementación, revisión de código,
  revisión técnica del diff, revisión adversarial.
---

# Revisar implementación

Instrucciones para que un agente someta la implementación de una tarea de desarrollo a revisión técnica por un subagente independiente. El revisor arranca con contexto aislado —recibe el diff y el archivo de la tarea, no el razonamiento del ejecutor—, con un rol explícitamente adversarial: verifica los criterios de calidad y la consistencia del diff con las convenciones del proyecto y con los archivos hermanos o de funcionalidad similar, y produce un informe con veredicto.

## Cuándo usar

- En el paso de revisión del ciclo de `ejecutar-tareas`, cuando la tarea en revisión es de tipo desarrollo.
- Cuando el usuario pida revisar una implementación concreta contra las convenciones del proyecto.

## Cuándo no usar

- Para tareas que no producen un diff de código (documentación, investigación, procesos): la revisión técnica general del ciclo las cubre.
- Para ejecutar las puertas mecánicas del proyecto (tests, lint, build): esa capa de la revisión está pospuesta.

## Entrada

- El diff de los cambios (`git diff`, incluidos los archivos nuevos).
- El archivo de la tarea (`docs/tasks/NNN-slug.md`): objetivo, criterios de calidad y las secciones del sub-flujo de desarrollo —`## Plan técnico`, `## Suite de pruebas esperada` y `## Desviaciones del plan`—, que son el objeto de la verificación nominal cuando existen.
- El código base del subsistema afectado, para la comparación con archivos hermanos.

## Salida

- Un informe de revisión con: cada criterio de calidad verificado contra el diff, la verificación nominal del plan —cada acción del `## Plan técnico` y cada expectativa de la `## Suite de pruebas esperada` contra su realización en el diff o su desviación registrada—, los hallazgos —cada uno citando la regla o el patrón concreto que infringe— y un veredicto: aprueba o solicita cambios.

## Principios rectores

1. **Contexto aislado:** el revisor ve el diff y los criterios, no el razonamiento del ejecutor; la separación de contextos es lo que neutraliza el sesgo de autoaprobación.
2. **Rol adversarial:** el revisor busca problemas, no confirma el trabajo; pero «no hay hallazgos» es un veredicto válido —un revisor obligado a producir hallazgos acaba inventándolos.
3. **Consistencia con el código base:** el diff se juzga también contra los archivos hermanos o de funcionalidad similar, no solo contra el enunciado de la tarea; el patrón canónico se extrae del código existente.
4. **Hallazgos citados:** cada hallazgo nombra la regla declarada del proyecto o el patrón concreto que infringe; una observación sin anclaje en una regla o patrón no es un hallazgo.
5. **La revisión no ejecuta ni reescribe:** el revisor no corre las puertas mecánicas ni modifica el código; su producto es el informe.

## Procedimiento

### 1. Preparar el paquete de revisión

1. **Reunir el diff** de los cambios de la tarea, incluidos los archivos nuevos.
2. **Reunir el archivo de la tarea** con su objetivo, criterios de calidad y las secciones del sub-flujo de desarrollo que existan (plan técnico, suite, desviaciones).

### 2. Lanzar el revisor independiente

3. **Lanzar un subagente de contexto aislado** que recibe únicamente el diff y el archivo de la tarea, sin el razonamiento del ejecutor. Su encargo:
   - **Verificar cada criterio de calidad** del archivo de tarea contra el diff.
   - **Revisar la consistencia con el código base:** leer al menos los archivos hermanos o de funcionalidad similar relevantes y comprobar que el diff sigue los patrones vigentes (estructura, nombrado, manejo de errores, estilo).
   - **Revisar las reglas declaradas del proyecto** que apliquen al cambio.
   - **Verificar el plan nominalmente:** confrontar cada acción del `## Plan técnico` con su realización en el diff y cada expectativa de la `## Suite de pruebas esperada` con la prueba que la cubre. Una acción no realizada solo es aceptable si figura en `## Desviaciones del plan` con su motivo y decisión: la desviación registrada cuenta como realización declarada, y el revisor verifica que el registro exista y sea coherente con el diff.
   - **Distinguir en el veredicto:** «plan no seguido sin desviación registrada» es un hallazgo que solicita cambios; «desviación registrada» se reporta como tal y puede requerir confirmación del usuario en la aprobación final.
   - **Buscar problemas no previstos:** invariantes rotos, casos borde ignorados, discrepancias entre lo declarado en la tarea y lo implementado.
   - **Producir el informe:** criterios verificados, verificación nominal del plan, hallazgos con la regla o patrón infringido citado, y veredicto.

### 3. Interpretar el informe

4. **Si el veredicto es solicita cambios:** corregir los problemas y repetir la revisión desde el paso 1 con el diff actualizado.
5. **Si el veredicto es aprueba:** presentar el informe al usuario junto con el resumen del trabajo, para la aprobación final del ciclo de tareas.

## Finalización

El skill ha terminado cuando:

- El subagente produjo su informe con veredicto.
- Los cambios solicitados se corrigieron y se repitió la revisión, o el informe aprobado se presentó al usuario.

## Referencias

- `docs/research/2026-09-flujo-desarrollo.md` — Fase de revisión contra convenciones, archivos hermanos y plan; la capa mecánica sigue pospuesta.
- `docs/research/flujo-revision-tareas.md` — Revisión dual, separación de contextos y rol adversarial del revisor.
- `docs/decisions/D020-flujo-desarrollo-skill-especialista.md` — La revisión de implementación como skill separado, invocado en el paso de revisión del ejecutor.
