# División del paquete en subpaquetes por dominio de capacidad

## Estado

[p] Pendiente de revisión

## Problema

Cuando un proyecto externo quiere consumir una parte de lo que ofrece este sistema —un conjunto de capacidades concretas, no todo—, la única vía realista hoy es llevarse la colección completa o seleccionar pieza a pieza sin saber cuáles forman un conjunto coherente. Escoger a mano exige conocer de antemano qué piezas dependen unas de otras y qué material comparten, conocimiento que reside solo en quien mantiene la colección.

La situación ya se observó en los propios proyectos de validación, que cargan la colección entera con superficie que nunca usan: el agente convive con capacidades que no le conciernen y esa convivencia generó fricción real. Afecta a quien adopta el sistema desde fuera —paga el coste completo aunque solo necesite una parte— y a quien mantiene la colección —cada pieza nueva agranda la unidad mínima que cualquier adoptante arrastra—. Ocurre en cada adopción parcial, y el coste de no resolverlo es adopción frenada o adopción con ruido: usuarios que agregan más de lo que requieren.

## Oportunidad

Resolverlo permitiría consumir el sistema por conjuntos de capacidades coherentes —llevarse justo lo que un proyecto necesita, con la seguridad de que el conjunto funciona— sin conocer la dependencia interna de cada pieza. Supera a la alternativa actual —la selección manual pieza a pieza— en escalabilidad y en garantía de coherencia: la selección manual solo gana cuando el consumo es de una o dos piezas aisladas.

## Forma de solución

La colección deja de ofrecerse solo como unidad completa: quien la adopta elige entre conjuntos declarados de capacidades —por ejemplo, el conjunto de redacción, el del lazo de revisión o el núcleo del ciclo—, cada uno consumible por separado y con garantía de coherencia, sin conocer las dependencias internas de las piezas. El conjunto incluye adaptar las piezas que lo requieran para funcionar dentro de su frontera. Categoría: flujo nuevo —una vía de adopción parcial que hoy no existe—.

## Solución

El repositorio se reorganiza como colección teleprompter: el manifiesto raíz pasa a describir la colección y cada conjunto vive en su propio directorio de paquete con manifiesto propio —nombre, versión inicial y mapa de instalación— que contiene físicamente las piezas que instala, porque el formato exige que la fuente no salga del paquete y no ofrece dependencias entre paquetes.

El corte por dominios se decide con un modelo de fronteras construido sobre el grafo real de dependencias entre piezas —invocaciones por nombre y referencias a material compartido—: cada pieza queda asignada a un conjunto y cada dependencia que cruza una frontera se resuelve por regla —misma frontera, opcional degradada o material duplicado—. El primer conjunto es evidente: redacción, ya autocontenida. Las piezas adaptadas se limitan a lo que la coherencia de su conjunto exige, y la política de versionado de los conjuntos se decide y se materializa en el proceso de liberación.

## Alternativas consideradas

- Guía documental de subconjuntos recomendados: documentar qué piezas elegir para cada caso de uso. Se descarta porque la coherencia sigue siendo responsabilidad del adoptante —justo el conocimiento que falta— y la guía envejece con cada pieza nueva.
- Selección asistida en la instalación: que la instalación pregunte las capacidades deseadas y resuelva las piezas por él. Se descarta porque la coherencia se computaría en cada instalación en lugar de declararse una vez, y exige mecanismos ajenos al paquete.
- Distribución como productos independientes: cada conjunto como entrega separada con su propio ciclo. Se descarta porque multiplica la operación de mantener y versionar cada entrega, y el material compartido exigiría una entrega base que reproduce el mismo problema un nivel arriba.

## Fuera de alcance

- La mecánica concreta que expresa los conjuntos en el formato de empaquetado (decisión del refinamiento ya tomada: colección con paquetes autocontenidos; su detalle vive en los borradores).
- Ciclo de vida de liberaciones independientes por conjunto —cadencia propia, changelog por conjunto—; la decisión de política de versionado (tren compartido o independiente) sí entra en el conjunto.
- Reinstalar con subconjuntos los proyectos de validación existentes.
- Rediseño de las piezas más allá de lo que la coherencia de su conjunto exija —incluida la duplicación del material compartido que cada subpaquete necesite—.

## Investigaciones de apoyo

- Análisis del formato de paquete teleprompter resuelto durante el refinamiento —`docs/formato-paquete.md` y `examples/coleccion-skills/` del repositorio teleprompter—: la colección con paquetes autocontenidos es la forma nativa que el formato ya soporta; `source` no puede salir del paquete y no existe mecanismo de dependencias entre paquetes.
- Grafo de dependencias entre las 45 piezas, extraído mecánicamente durante el refinamiento: referencias `../<hermano>/` e invocaciones por nombre en cada `SKILL.md`. Confirma el primer corte limpio —`revisar-redaccion` y `pulir-escritura` no invocan ni referencian ninguna otra pieza—.

## Borradores

- `01-modelo-fronteras-conjuntos.md` — Modelo de fronteras de los conjuntos
- `02-repositorio-como-coleccion.md` — Repositorio reorganizado como colección (depende de 01)
- `03-autocontencion-piezas-frontera.md` — Autocontención de las piezas que cruzan fronteras (depende de 01, 02)
- `04-politica-versionado-conjuntos.md` — Política de versionado de los conjuntos (depende de 01)
- `05-verificacion-instalacion-conjuntos.md` — Verificación de la instalación por conjunto (depende de 03)

## Revisión

- Usuario: [fecha] — [Aprueba | Solicita cambios | Rechaza]
