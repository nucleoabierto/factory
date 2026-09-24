# Portabilidad y listas compartidas sin servidor

> **Tipo:** idea de funcionalidad — tamaño épica (complejidad media-alta)
> **Fecha:** 2026-09

## Problema

La lista entera vive en el `localStorage` de un único navegador. Lo que se apunta en el portátil no existe en el móvil; lo que se consulta en casa no está en el trabajo. Y entre personas, la aplicación es un compartimento estanco: no hay forma de pasarle la lista de la compra a otra persona, de llevarse el trabajo a otro equipo o de respaldar lo acumulado.

El coste es que la aplicación solo cubre la mitad del problema que dice resolver: las cosas por hacer ocurren en varios dispositivos y, con frecuencia, involucran a más de una persona. Hoy la lista es fiable solo mientras la vida de la usuaria ocurra dentro de un solo navegador — y desaparece con él si los datos se borran.

## Qué desbloquea

- **Respaldo real:** hoy borrar los datos del navegador o cambiar de equipo destruye la lista sin remedio. Exportar el estado a un archivo lo convierte en algo recuperable — el `localStorage` deja de ser el único ejemplar.
- **Traslado entre dispositivos:** exportar en un sitio e importar en otro rompe el bloqueo más literal del producto, aunque sea a demanda y no continuo.
- **Entrega entre personas:** compartir una lista —como archivo o como enlace que lleva los datos dentro— permite que otra persona la abra completa en su navegador, sin cuentas ni servidor.
- **Confianza para acumular:** saber que el contenido se puede sacar de la aplicación elimina el miedo a quedar atrapada; paradojalmente, poder irse es lo que hace razonable quedarse.

## Flujos de trabajo que se hacen viables

- Respaldo periódico: exportar la lista como archivo y guardarlo donde se guarde lo importante; restaurar si el navegador pierde los datos.
- Cambio de equipo: exportar en el equipo viejo, importar en el nuevo, continuar exactamente donde se estaba.
- Lista entregada: enviar la lista de la compra o las tareas del viaje a otra persona, que la abre en su propio navegador y trabaja sobre su copia.
- Plantillas reutilizables: una lista de «mudanza» o «viaje» exportada una vez e importada cada vez que haga falta, propia o de otra persona.
- Punto de control: exportar antes de una limpieza grande, con la posibilidad de volver atrás que hoy no existe en ninguna forma.

## Ventajas como producto

- **La lista deja de ser frágil:** hoy el producto entero depende de que un navegador no pierda sus datos; la portabilidad lo convierte en algo que la usuaria posee y controla.
- **Primer gesto colaborativo sin infraestructura:** compartir una lista por archivo o enlace cubre el caso doméstico frecuente —«pásame la lista»— sin pagar el coste de cuentas, servidor ni sincronización.
- **Datos abiertos como argumento:** que el contenido salga en un formato legible y reimportable es una postura de producto —nada de cautiverio— que diferencia a la app del grueso de herramientas que retienen los datos.
- **Prepara el terreno sin comprometerlo:** un formato de exportación bien definido es el contrato de datos que cualquier sincronización futura usaría; el trabajo adelanta ese camino sin obligar a recorrerlo.

## Tensión que introduce en el roadmap

Compite con las otras dos ideas en el orden, y el orden cambia su diseño: exportar una lista plana es trivial, pero si ya existen múltiples listas o fechas, el formato de exportación debe cubrirlas — cada épica anterior encarece esta y a la vez la hace más valiosa. También tensiona el dominio: importar datos externos exige validar, fusionar y decidir qué pasa con los identificadores al mezclar listas, un problema de consistencia que el producto aún no ha tenido que resolver. Es la candidata a cerrar un primer arco de madurez: con organización, tiempo y portabilidad, la aplicación cubre el ciclo completo de uso personal sin salir del navegador.
