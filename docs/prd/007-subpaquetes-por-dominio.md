# PRD — Subpaquetes por dominio

Cuando un proyecto quiere consumir una parte del sistema, hoy solo puede llevarse la colección completa o escoger piezas sin saber cuáles forman un conjunto coherente. Este conjunto divide la colección en paquetes por dominio de capacidad con dependencias declaradas, para que la adopción sea proporcional a la necesidad sin que el adoptante conozca las dependencias internas.

## Usuarios

Quien adopta el sistema en un proyecto —elige qué conjuntos instalar— y quien mantiene la colección —decide fronteras y política—.

## Casos de uso

- **CU-1 — Instalación de un conjunto:** quien adopta instala un conjunto por su nombre y recibe sus piezas más sus dependencias, resueltas transitivamente.
  - Borde: un conjunto cuyo grafo es irresoluble —ciclo, conflicto, versión insatisfecha— aborta sin escribir nada en el destino.
- **CU-2 — Adopción completa por composición pura:** quien quiere la colección entera instala un conjunto sin contenido propio cuyas dependencias la reúnen.
  - Borde: si el modelo decide no declararla, la adopción completa queda como instalación miembro a miembro.
- **CU-3 — Pieza operando en frontera:** una pieza instalada con solo sus dependencias funciona; lo que necesitaba fuera de su frontera llega vía dependencia o degrada con gracia.
  - Borde: una invocación a pieza opcional ausente degrada a instrucción documentada, no a error de referencia rota.

## Comportamiento esperado

- **Declaración:** la coherencia de cada conjunto está declarada en su manifiesto —piezas, versión, dependencias—, no inferida por el adoptante.
- **Transitividad:** instalar un conjunto trae todo su grafo en orden —dependencias antes que dependientes— y nada más.
- **Degradación:** las necesidades opcionales no resueltas se comportan como se documentó, sin referencias rotas.
- **Reproducibilidad:** cada pieza instalada registra su origen y el conjunto se reinstala desde el registro.

## Criterios de éxito

- Un conjunto coherente —como el de redacción— se consume solo, sin el resto de la colección ni conocimiento de dependencias internas.
- La fricción de adopción parcial desaparece: elegir conjunto es elegir capacidad, no auditar piezas.
- La colección completa sigue siendo consumible en un solo gesto si el modelo declara composición pura.

## Fuera de alcance

- Liberaciones independientes por conjunto —cadencia y changelog propios—.
- Dependencias sobre orígenes externos a la colección.
- Reinstalar con subconjuntos los proyectos de validación existentes.
- Rediseño de las piezas más allá de lo que su coherencia en frontera exige.
