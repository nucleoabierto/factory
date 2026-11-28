# Reglas del proyecto factory

## Fuente e instalación de las piezas

- La fuente de verdad de las piezas vive en `packages/<conjunto>/skills/`. Nunca edites el contenido de `.agents/skills/` directamente: es la copia instalada y la próxima reinstalación la sobrescribe.
- Las copias instaladas están versionadas: cualquier edición bajo `packages/` exige refrescarlas en el mismo trabajo. Como parte del cierre de toda tarea cuyo diff toque `packages/`, reinstala la colección sobre el propio repo y commitea las copias actualizadas:

  ```sh
  teleprompter install --path . . --package completo --force
  ```

  Requiere node >= 22 y el CLI de teleprompter — la instalación del CLI se documenta en el repositorio de teleprompter.
- Lo versionado debe ser portable: nunca commitees rutas absolutas de una máquina concreta (`/Users/<usuario>/…`, el home de alguien) ni estado específico de ella — `teleprompter-lock.json` se regenera en cada instalación y vive ignorado; las instrucciones referencian herramientas de forma genérica.

## Personalización de las copias instaladas

- El modelo de personalización de teleprompter —qué literales son editables y dónde vive cada uno— lo describen las guías `PERSONALIZE.md` de los paquetes: la fuente vive en `packages/<conjunto>/PERSONALIZE.md` y la instalación las copia a `.teleprompter/<conjunto>/`. Esas guías están escritas para el agente instalador de un proyecto consumidor; en factory sirven de referencia para el dogfooding.
- Las copias instaladas en `.agents/skills/` son el lugar legítimo de los ajustes del proyecto según ese modelo. Hoy factory usa las convenciones por defecto y las copias son idénticas a la fuente.
- Si el proyecto personaliza un literal en el futuro, la personalización se documenta en este archivo —la reinstalación la sobrescribe y hay que reaplicarla después de cada install—.
