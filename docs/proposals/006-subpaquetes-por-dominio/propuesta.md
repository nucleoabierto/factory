# Propuesta: Subpaquetes por dominio

## Estado

[a] Aprobada

## Problema

Cuando un proyecto externo quiere consumir una parte de lo que ofrece este sistema —un conjunto de capacidades concretas, no todo—, la única vía realista hoy es llevarse la colección completa o seleccionar pieza a pieza sin saber cuáles forman un conjunto coherente. Escoger a mano exige conocer de antemano qué piezas dependen unas de otras y qué material comparten, conocimiento que reside solo en quien mantiene la colección.

La situación ya se observó en los propios proyectos de validación, que cargan la colección entera con superficie que nunca usan: el agente convive con capacidades que no le conciernen y esa convivencia generó fricción real. Afecta a quien adopta el sistema desde fuera —paga el coste completo aunque solo necesite una parte— y a quien mantiene la colección —cada pieza nueva agranda la unidad mínima que cualquier adoptante arrastra—. Ocurre en cada adopción parcial, y el coste de no resolverlo es adopción frenada o adopción con ruido: usuarios que agregan más de lo que requieren.

## Oportunidad

Resolverlo permitiría consumir el sistema por conjuntos de capacidades coherentes —llevarse justo lo que un proyecto necesita, con la seguridad de que el conjunto funciona— sin conocer la dependencia interna de cada pieza. Supera a la alternativa actual —la selección manual pieza a pieza— en escalabilidad y en garantía de coherencia: la selección manual solo gana cuando el consumo es de una o dos piezas aisladas.

## Forma de solución

La colección deja de ofrecerse solo como unidad completa: quien la adopta elige entre conjuntos declarados de capacidades —por ejemplo, el conjunto de redacción, el del lazo de revisión o el núcleo del ciclo—, cada uno consumible por separado y con garantía de coherencia, sin conocer las dependencias internas de las piezas. El conjunto incluye adaptar las piezas que lo requieran para funcionar dentro de su frontera. Categoría: **flujo nuevo** —una vía de adopción parcial que hoy no existe—.

## Solución

La colección se ofrece como índice de conjuntos declarados: cada conjunto agrupa las piezas de un dominio de capacidad en un paquete propio —instalable por separado y versionado— y declara qué otros conjuntos necesita para completarse, de modo que instalarlo trae todo lo que su coherencia exige. Los conjuntos del ejemplo —redacción, lazo de revisión, núcleo del ciclo— ilustran la división, no la fijan: el corte exacto se decide en el modelo de fronteras del primer borrador. El conjunto incluye adaptar las piezas que lo requieran para funcionar dentro de su frontera.

## Alternativas consideradas

- **Guía documental de subconjuntos recomendados** (cambio de UI): documentar qué piezas elegir para cada caso de uso. Se descarta porque la coherencia sigue siendo responsabilidad del adoptante —justo el conocimiento que falta— y la guía envejece con cada pieza nueva.
- **Selección asistida en la instalación** (paso nuevo en un flujo existente): que la instalación pregunte las capacidades deseadas y resuelva las piezas por él. Se descarta porque la coherencia se computaría en cada instalación en lugar de declararse una vez, y exige mecanismos ajenos al paquete.
- **Distribución como productos independientes** (cambio de proceso): cada conjunto como entrega separada con su propio ciclo. Se descarta porque multiplica la operación de mantener y versionar cada entrega, y el material compartido exigiría una entrega base que reproduce el mismo problema un nivel arriba.

## Fuera de alcance

- La mecánica concreta que expresa los conjuntos y sus dependencias en el formato de empaquetado (decisión del refinamiento).
- Ciclo de vida de liberaciones independientes por conjunto —cadencia propia, changelog por conjunto—; la decisión de política de versionado y las restricciones que los conjuntos declaran entre sí sí entran en el conjunto.
- Dependencias sobre piezas fuera de esta colección —orígenes externos—: todas las que el sistema declara residen en el mismo árbol.
- Reinstalar con subconjuntos los proyectos de validación existentes.
- Rediseño de las piezas más allá de lo que la coherencia de su conjunto exija —incluida la resolución del material compartido como dependencia declarada, reubicación o duplicación—.

## Investigaciones de apoyo

- El grafo real de dependencias entre las 45 piezas (obtenido por análisis de invocaciones y referencias entre ellas en el momento de la propuesta; el primer borrador lo regenera): `revisar-redaccion` y `pulir-escritura` no invocan ni referencian a ninguna otra pieza —el conjunto de redacción es un corte limpio—; las piezas de orquestación (`ejecutar-tareas`, `idea-a-tarea`, `crear-tareas`, `planificar`, `refinar-propuesta`) dependen de hasta 17, y los gestores (`distribuir`, `actualizar-artefactos`, `operar-changelog`, `operar-roadmap`, `registrar`, `consultar-artefactos`) son dependencia de la mayoría —material compartido que el modelo de fronteras convierte en conjuntos base o duplicado—.
- El paquete actual ya instala por pieza, pero la unidad de adopción es la colección completa de 45.
- El formato teleprompter soporta colecciones (`"collection": true`, paquetes por directorio con manifiesto propio y `version` obligatoria) y, desde su versión 0.7.0, dependencias entre paquetes: cada manifiesto declara las piezas que lo completan —del mismo árbol por nombre, con restricción de versión opcional como aserción—; la instalación resuelve el conjunto entero transitivamente, aborta ante ciclos o conflictos sin escribir, admite paquetes de composición pura sin instalación propia y registra el origen de cada pieza para reproducirla. La contención física deja de ser la única vía de coherencia.

## Borradores

- `docs/tasks/153-modelo-fronteras-conjuntos.md` — Modelo de fronteras de los conjuntos
- `docs/tasks/154-politica-versionado-conjuntos.md` — Política de versionado de los conjuntos (depende de 153)
- `docs/tasks/155-repositorio-como-coleccion.md` — Repositorio como colección de paquetes (depende de 153, 154)
- `docs/tasks/156-resolucion-necesidades-frontera.md` — Resolución de necesidades de las piezas en frontera (depende de 155)
- `docs/tasks/157-verificacion-instalacion-conjuntos.md` — Verificación de instalación por conjunto (depende de 156)

## Revisión

- Usuario: 2026-11-23 — Aprueba
