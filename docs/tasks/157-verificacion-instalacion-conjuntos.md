# Verificación de instalación por conjunto

## Estado

[ ] Pendiente

## Tipo

mantenimiento

## Objetivo

Verificar que cada conjunto instala en un destino limpio exactamente lo que declara —sus piezas más sus dependencias, transitivamente resueltas— y que las piezas operan en su frontera; que la composición pura, si existe, reproduce la adopción completa; y que el conjunto es reinstalable.

## Dependencias

- 156

## Entrada

- La colección adaptada de la tarea 156.
- El formato: la instalación resuelve el grafo transitivo —dependencias antes que dependientes—, satisface las restricciones y aborta sin escribir ante ciclos o conflictos; cada pieza instalada registra su origen y `reinstall` la reproduce.
- `docs/tasks/proyectos-validacion/` como referencia de instalación global; la verificación requiere destinos limpios por conjunto, no proyectos existentes.

## Resultado esperado

- Cada conjunto verificado: instala solo lo suyo más sus dependencias, opera en su frontera y es reinstalable desde el registro; composición pura con paridad verificada; defectos resueltos o reportados.

## Criterios de calidad

- Cada conjunto instala en destino limpio sin errores y trae exactamente sus piezas más sus dependencias —el grafo declarado, resuelto transitivamente—.
- Las piezas de cada conjunto operan con solo sus dependencias presentes.
- El destino conserva evidencia: registro con origen por pieza, reinstalable.
- Las restricciones de versión declaradas se satisfacen; no hay ciclos ni conflictos.
- Defectos resueltos o reportados con alcance.

## Procedimiento sugerido

1. Crear destinos de prueba por conjunto —directorios vacíos con la estructura mínima—.
2. Instalar cada conjunto por su nombre de miembro: verificar que trae sus dependencias —todas, antes que el dependiente, con restricciones satisfechas— y nada más.
3. Ejecutar las piezas del conjunto instalado: flujos principales operan; las necesidades degradadas se comportan como se documentó.
4. Si el modelo declaró composición pura, instalarla y verificar paridad con la adopción completa.
5. `reinstall` en un destino: reproduce el conjunto desde el registro.
6. Registrar defectos encontrados y resolver o reportar fuera de alcance.

## Notas

- La verificación de estructura —manifiestos, mapas— es previa y parte de ella; la funcional —destinos por conjunto— es el núcleo.
- Fuera de alcance: reinstalar con subconjuntos los proyectos de validación existentes y la automatización de la verificación como proceso del producto —el disparador `proyectos-validacion` lo decide aparte—.

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario (ejecución): [fecha] — [Aprueba | Solicita cambios]
- Usuario (cierre): [fecha] — [Aprueba | Solicita cambios]
