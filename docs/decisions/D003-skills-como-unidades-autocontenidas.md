# D003: Skills como unidades autocontenidas, no reglas sueltas

## Estado

Aceptada

## Contexto

El proyecto empezó con instrucciones para el agente en `PROMPT.txt` y archivos sueltos (`revisar-redaccion.md`, `pulir-escritura.md`) en la raíz del repositorio. Estas instrucciones se cargaban siempre, incluso cuando no eran relevantes para la tarea actual, lo que saturaba el contexto del agente.

## Decisión

Adoptamos el formato de skills: unidades autocontenidas de funcionalidad que el agente carga solo cuando son relevantes. Cada skill vive en su propio directorio con un `SKILL.md` que contiene metadatos de descubrimiento e instrucciones de ejecución.

## Justificación

Los skills permiten división progresiva: el agente ve solo el `name` y la `description` hasta que decide invocar el skill, y solo entonces carga el cuerpo. El material de referencia detallado se carga bajo demanda. Esto reduce el ruido contextual y hace que cada unidad sea mantenible de forma independiente. Las reglas globales que deben estar siempre activas se mantienen fuera de los skills, en `AGENTS.md` o en el sistema de reglas del arnés.
