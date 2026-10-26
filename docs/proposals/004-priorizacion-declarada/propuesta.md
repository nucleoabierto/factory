# Priorización declarada de las líneas de trabajo

## Estado

[ ] Borrador | **[p] Pendiente de revisión** | [a] Aprobada | [d] Descartada

## Problema

El orden del trabajo pendiente sigue el orden de llegada: cada línea nueva se añade al final de la cola y ahí permanece, sea cual sea su afinidad con el estado actual del proyecto. La prioridad no se revisita en los dos momentos en que la información mejora —al cerrar un conjunto, cuando ya se conoce el coste real y las sinergias con lo que queda, y al incorporar una demanda nueva, que cae al final sin compararse con lo existente.

Afecta a quien dirige el producto y al sistema que ejecuta: la decisión de qué sigue se toma una vez y no se revisa, con una justificación cualitativa que queda en la conversación. La consecuencia es que el orden óptimo solo se descubre en retrospectiva —al terminar un conjunto se ve que otro orden habría rendido más— y que una línea recién llegada puede ser más afín al estado del proyecto que todo lo que la precede sin que nada lo detecte.

## Oportunidad

Disponer de una forma declarada de comparar líneas —sobre atributos explícitos como valor, confianza y esfuerzo— convertiría el orden en una decisión revisable y repetible: los momentos en que la información cambia dejarían de pasar sin revisión, la propuesta de orden sería delegable con justificación verificable, y el historial de porqués acumularía aprendizaje sobre qué criterios predicen mejor el impacto. Supera a la alternativa actual —orden de inserción más prosa justificativa— en precisión y trazabilidad; esta solo gana en simplicidad de arranque.

## Forma de solución

Al planear la dirección —y en los dos momentos en que la información mejora: el cierre de un conjunto y la incorporación de una demanda nueva—, las líneas abiertas se comparan sobre atributos declarados y la comparación produce planificaciones alternativas con sus implicaciones, que el usuario decide y pule antes de reflejarse en la dirección; la misma comparación queda disponible bajo demanda para revisitar el orden fuera de esos momentos. Categoría: paso nuevo en un flujo existente —la planeación de dirección existe y funciona; le falta el eslabón que convierte el orden de inserción en decisión revisable—.

## Solución

Una capacidad de comparación objetiva de las líneas de trabajo, guiada por el norte que declara la persona: el usuario marca uno o dos temas como directriz y la capacidad compara las líneas abiertas sobre atributos declarados —valor, criticidad temporal, habilitación y tamaño, con confianza e incertidumbre explícitas— para producir dos o más planificaciones alternativas. Cada alternativa expone sus implicaciones en beneficios y costes —qué se gana y qué se pierde con ese orden—, de modo que la decisión no es validar un cálculo sino elegir una dirección entendiendo sus consecuencias; elegida la alternativa, el usuario puede pulir los valores antes de fijarla.

La capacidad se invoca desde la planeación de dirección como un paso nuevo; además, los dos momentos en que la información cambia —el cierre de un conjunto y la incorporación de una demanda— disparan la revisita por su cuenta, y la comparación puede llamarse bajo demanda fuera de ellos. El orden elegido nunca se aplica solo: queda validado por la puerta humana y registrado con su justificación.

## Alternativas consideradas

- Capacidad independiente solo bajo demanda: la comparación existe pero nadie la invoca desde el ciclo. Se descarta porque no resuelve el núcleo del problema —que los momentos informativos pasan sin revisión—; dependería de recordar llamarla, el mismo fallo que el orden manual tiene hoy.
- Ordenación mecánica por regla fija: declarar una fórmula de pesos una vez y dejar que el orden se compute solo en cada cambio. Se descarta porque el problema pide juicio contextual —afinidad con el estado del proyecto, sinergias recién descubiertas— que una fórmula prefijada no captura; produciría órdenes indefensibles con apariencia de objetividad.
- Revisita humana sin soporte: al cerrar un conjunto, simplemente preguntar al usuario si quiere reordenar. Se descarta porque mantiene el criterio sin declarar: el problema no es solo que nadie revisite, sino que no hay base comparable cuando se revisa.

## Fuera de alcance

- Reordenar sin puerta humana: la propuesta de orden siempre se valida, nunca se aplica sola.
- Ordenación de tareas dentro de un conjunto: el ámbito son las líneas de trabajo de la dirección, no la secuencia interna de una épica.
- Política de capacidad por tipo de trabajo: la comparación declara los atributos, pero cuánto de cada tipo cabe en el horizonte es una decisión posterior.
- Métricas de resultado para calibrar los atributos: corresponde a la idea hermana `validacion-de-resultado`.
- Captura de demanda externa para alimentar los atributos: sigue aparcada en la dirección.

## Investigaciones de apoyo

- `docs/research/2026-10-metodos-priorizacion-lineas.md` — comparación de métodos de priorización objetiva; recomienda comparación relativa tipo WSJF adaptada con confianza e incertidumbre explícitas y justificación por decisión.

## Borradores

- `01-capacidad-escenarios-priorizacion.md` — Crear la capacidad de comparación por escenarios de las líneas
- `02-paso-priorizacion-planeacion-direccion.md` — Integrar la priorización como paso de la planeación de dirección (depende de 01)
- `03-disparadores-revisita-prioridad.md` — Conectar los momentos informativos que disparan la revisita (depende de 01 y 02)

## Revisión

- Usuario: [fecha] — Aprueba | Solicita cambios | Rechaza
