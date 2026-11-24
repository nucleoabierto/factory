# Borrador: Verificación de instalación por conjunto

> **Estado:** borrador — pendiente de aprobación de la propuesta
> **Tipo:** mantenimiento
> **Depende de:** `04-resolucion-necesidades-frontera.md`

## Objetivo

Verificar que cada conjunto instala en un destino limpio exactamente lo que declara —sus piezas más sus dependencias, transitivamente resueltas— y que las piezas operan en su frontera; que la composición pura, si existe, reproduce la adopción completa; y que el conjunto es reinstalable.

## Contexto y enfoque

- La instalación resuelve el grafo transitivo: la verificación comprueba orden (dependencias antes que dependientes), restricciones satisfechas y ausencia de ciclos —el instalador aborta sin escribir si es irresoluble—.
- Cada pieza instalada registra su origen en el registro del destino: `reinstall` la reproduce; el destino de prueba lo comprueba.
- Instalación global en `docs/tasks/proyectos-validacion/`; la verificación requiere destinos limpios por conjunto, no proyectos existentes.
- La verificación de estructura (manifiestos, mapas) es previa y parte de ella; la funcional (destinos por conjunto) es el núcleo.

## Plan de trabajo

- [ ] Crear destinos de prueba por conjunto (directorios vacíos con la estructura mínima).
- [ ] Instalar cada conjunto por su nombre de miembro: verificar que trae sus dependencias —todas, antes que el dependiente, con restricciones satisfechas— y nada más.
- [ ] Ejecutar las piezas del conjunto instalado: flujos principales operan; las necesidades degradadas se comportan como se documentó.
- [ ] Si el modelo declaró composición pura, instalarla y verificar paridad con la adopción completa.
- [ ] `reinstall` en un destino: reproduce el conjunto desde el registro.
- [ ] Registrar defectos encontrados y resolver o reportar fuera de alcance.

## Entregable

Cada conjunto verificado: instala solo lo suyo más sus dependencias, opera en su frontera, y es reinstalable desde el registro; composición pura con paridad verificada; defectos resueltos o reportados.

## Criterios de aceptación

- Cada conjunto instala en destino limpio sin errores y trae exactamente sus piezas más sus dependencias —el grafo declarado, resuelto transitivamente—.
- Las piezas de cada conjunto operan con solo sus dependencias presentes.
- El destino conserva evidencia: registro con origen por pieza, reinstalable.
- Las restricciones de versión declaradas se satisfacen; no hay ciclos ni conflictos.
- Defectos resueltos o reportados con alcance.

## Fuera de alcance

- Reinstalar con subconjuntos los proyectos de validación existentes.
- Automatización de la verificación como proceso del producto —el disparador `proyectos-validacion` lo decide aparte—.
