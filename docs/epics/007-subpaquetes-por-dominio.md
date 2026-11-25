# Subpaquetes por dominio

## Estado

[x] Planificada | [ ] Completada

## Objetivo

La colección se ofrece como índice de conjuntos declarados —cada uno instalable por separado, versionado y con sus dependencias entre conjuntos declaradas—, de modo que quien adopta el sistema consume solo los dominios de capacidad que necesita con su coherencia garantizada.

## Alcance

- **Dentro:** el modelo de fronteras con su grafo de dependencias entre conjuntos; la política de versionado con su estrategia de restricciones; la reestructura del repositorio como colección de paquetes; la resolución de necesidades de las piezas en frontera —dependencias declaradas y degradación elegante—; la verificación de instalación por conjunto.
- **Fuera:** liberaciones independientes por conjunto —cadencia y changelog propios—; dependencias sobre orígenes externos a la colección; reinstalar con subconjuntos los proyectos de validación existentes; rediseño de piezas más allá de lo que su coherencia en frontera exige.

## Piezas

- [ ] docs/tasks/153-modelo-fronteras-conjuntos.md — Modelo de fronteras de los conjuntos
- [ ] docs/tasks/154-politica-versionado-conjuntos.md — Política de versionado de los conjuntos
- [ ] docs/tasks/155-repositorio-como-coleccion.md — Repositorio como colección de paquetes
- [ ] docs/tasks/156-resolucion-necesidades-frontera.md — Resolución de necesidades de las piezas en frontera

## Plan técnico

La épica convierte el paquete monolítico en una colección de paquetes con dependencias declaradas del mismo árbol. Las piezas comparten un único modelo de fronteras —fuente de la división, del grafo de dependencias y de las degradaciones— que la política de versionado completa y la materialización escribe en los manifiestos.

- **Orden:** 153 → 154 → 155 → 156 —lineal: la política precede a los manifiestos porque escribe sus restricciones, y la resolución de contenido va sobre la estructura ya materializada—.
- **Dependencias:** 154 consume el grafo de 153; 155 materializa el modelo con la política y verifica la instalación de cada conjunto; 156 adapta el contenido sobre la estructura y cierra ejecutando cada conjunto en su frontera.
- **Decisiones transversales:** la coherencia se declara como dependencias entre conjuntos del mismo árbol, no como contención física; toda necesidad obligatoria que cruza frontera queda resuelta por dependencia declarada o co-ubicación; lo opcional degrada con gracia y se documenta en la pieza; los ciclos no existen —el formato los aborta—.

## Criterio de cierre

Cada conjunto declarado instala en un destino limpio solo sus piezas más sus dependencias resueltas transitivamente, opera en su frontera y es reinstalable desde el registro; la composición pura, si existe, reproduce la adopción completa.

## Revisión

- Usuario: 2026-11-23 — Aprueba
