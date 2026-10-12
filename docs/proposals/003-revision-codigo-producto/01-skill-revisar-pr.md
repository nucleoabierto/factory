# Capacidad de revisión de un pull request arbitrario

## Tipo

desarrollo

## Objetivo

Crear el skill `revisar-pr`: el bloque revisor de la revisión como capacidad del producto. Somete un *pull request* arbitrario del proyecto evaluado a la misma revisión independiente que hoy solo recibe el trabajo interno, y produce un informe persistido con hallazgos por severidad y un veredicto.

## Dependencias

- Ninguna

## Entrada

- La forma de solución validada de la propuesta y el skill `revisar-implementacion` como referencia de los principios de revisión (contexto aislado, rol adversarial, consistencia con el código base, hallazgos citados, cotejo de lecciones).
- Un PR del proyecto evaluado, identificable por número (o por la rama actual si el usuario no da número).

## Resultado esperado

- `.agents/skills/revisar-pr/SKILL.md` con su declaración de skill y procedimiento, registrado en el manifiesto de distribución del proyecto evaluado.
- Procedimiento que cubre: resolución del PR (número dado, o el de la rama actual vía `gh`); reconstrucción del diff y del historial de la rama contra su base; carga de los hilos de revisión existentes —abiertos y resueltos— para no duplicar feedback ya resuelto; revisión contra convenciones, archivos hermanos, reglas declaradas y lecciones aprendidas del proyecto evaluado (cotejo por disparadores, delegado en `consultar-artefactos`); producción del informe.
- El informe se escribe en disco bajo una ubicación de la convención del proyecto evaluado —configurable, como los demás artefactos— y contiene: resumen del cambio, criterios o intención reconstruida, hallazgos ordenados por severidad —blocker, important, nit— cada uno citando la regla o patrón infringido, y un veredicto único: `merge`, `improve` o `blocked` (este último cuando falte contexto para juzgar con justicia).
- Resumen del veredicto en chat.

## Criterios de calidad

- El skill no exige que el PR provenga del ciclo de tareas: funciona sobre cualquier PR accesible con `gh` en el proyecto evaluado.
- Reusa los principios de `revisar-implementacion` —contexto aislado del subagente revisor, rol adversarial, hallazgos citados con su regla o patrón, lecciones por disparadores— sin copiar sus secciones atadas al archivo de tarea (plan nominal, suite esperada, desviaciones).
- La intención del cambio se reconstruye desde la descripción del PR y los artefactos del proyecto evaluado cuando existan (tarea, épica, documentación); lo no reconstruible va a preguntas abiertas del informe, no a suposiciones.
- Solo análisis: el skill no publica comentarios, no corrige código, no fusiona.
- Los comentarios publicables quedan fuera: son el borrador siguiente.
- Declaración y formato coherentes con los skills existentes; ubicación del informe por convención, no por literal.

## Procedimiento sugerido

1. Leer `revisar-implementacion` y extraer los principios transferibles a un PR arbitrario, separándolos de lo que es contrato del ciclo de tareas.
2. Diseñar el encargo del subagente revisor: recibe la referencia del PR y la ubicación del informe; reconstruye el diff con `gh`/`git`; carga hilos existentes; revisa contra convenciones, hermanos, reglas y lecciones; produce el informe con veredicto.
3. Definir la convención de ubicación del informe —siguiendo el patrón de las demás ubicaciones configurables— y el formato del informe.
4. Escribir el `SKILL.md`, registrarlo en el manifiesto y actualizar los documentos vivos que catalogan skills si aplica.

## Notas

- El veredicto del informe alimenta la puerta humana del usuario; la aprobación del merge sigue siendo suya, como en el resto del sistema.
