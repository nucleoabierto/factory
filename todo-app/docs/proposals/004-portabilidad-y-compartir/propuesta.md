# Portabilidad y listas compartidas sin servidor

## Estado

[ ] Borrador | [ ] Pendiente de revisión | [a] Aprobada | [ ] Descartada

## Problema

La lista entera vive en el `localStorage` de un único navegador: lo que se apunta en el portátil no existe en el móvil, lo de casa no está en el trabajo, y borrar los datos del navegador o cambiar de equipo destruye lo acumulado sin remedio. Entre personas, la aplicación es un compartimento estanco: no hay forma de pasarle la lista de la compra a otra persona ni de respaldar el contenido.

Afecta a cualquier persona cuya vida ocurra en más de un dispositivo o cuyas tareas involucren a alguien más —que es lo frecuente. El coste es que la lista es fiable solo mientras todo pase dentro de un solo navegador, y desaparece con él.

## Oportunidad

Resolverlo convierte el contenido en algo que la persona posee y controla: puede respaldarse, trasladarse entre dispositivos y entregarse a otras personas sin cuentas ni servidor. Supera a la alternativa actual —rehacer la lista a mano o copiar texto suelto— que pierde estado, estructura y completitud; y define el contrato de datos que cualquier sincronización futura usaría, sin obligar a recorrer ese camino.

## Forma de solución

La persona puede sacar su contenido de la aplicación y meterlo de vuelta: exportar el estado a un archivo legible que puede volver a importarse —o a un enlace que lleva los datos dentro—, e importar un archivo o enlace recibido que restaura el contenido en su navegador, sin cuentas ni servidor. Al importar se puede reemplazar el estado actual o incorporar lo recibido como copia junto a lo existente. Categoría: flujo nuevo — hoy no existe ningún recorrido para sacar el contenido de la aplicación ni para introducir contenido externo.

## Solución

Se define un formato de exportación propio y versionado: un documento legible que contiene el estado completo —tareas y lo que las épicas anteriores hayan añadido (listas, fechas)— y que la aplicación sabe producir y consumir con validación. La interfaz ofrece exportar como archivo descargable y como enlace que codifica los datos, e importar desde un archivo elegido o un enlace recibido.

Al importar, la persona decide entre reemplazar su estado por el recibido o incorporarlo como copia junto a lo que ya tiene; en este último caso los identificadores se reasignan para no colisionar. Datos corruptos, de versión desconocida o malformados se rechazan con un aviso claro, sin tocar el estado actual.

## Alternativas consideradas

- Sincronización con cuentas y servidor: se descarta porque el problema pide entrega y respaldo, no continuidad en vivo —y pagaría infraestructura, autenticación y resolución de conflictos para cubrir un caso que la copia ya cubre—.
- Solo exportar, sin importar (respaldo de solo lectura): se descarta porque cubre solo una parte del problema —protege contra pérdida pero no permite traslado ni entrega, que es donde el respaldo cobra sentido—.
- Copiar y pegar el estado como texto: variante de la misma forma; se descarta como mecanismo principal porque el portapapeles es más frágil que un archivo y no sirve para entregar una lista completa, aunque el formato de datos sea el mismo.

## Fuera de alcance

- Sincronización continua entre dispositivos y colaboración en vivo: descartado por forma, no solo por alcance.
- Cifrado o protección del archivo exportado: el contenido viaja en claro y quien lo comparte es responsable del canal.
- Fusión inteligente de dos estados que evolucionaron en paralelo: importar reemplaza o añade como copia; no hay resolución de conflictos.
- Formatos ajenos (CSV, iCal, importar desde otras apps): solo el formato propio.
- Respaldo automático periódico: la exportación es manual y a demanda.

## Investigaciones de apoyo

- Ninguna.

## Borradores

- docs/tasks/020-formato-de-exportacion.md — Formato versionado del estado y su serialización bidireccional validada
- docs/tasks/021-exportar-contenido.md — Exportar el estado como archivo descargable y como enlace portable (depende de 020)
- docs/tasks/022-importar-contenido.md — Importar desde archivo o enlace, reemplazando o incorporando como copia (depende de 021)

## Revisión

- Usuario: 2026-09-24 — Aprueba
