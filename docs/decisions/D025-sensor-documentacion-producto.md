# D025: Sensor de documentación de producto junto al de dominio

## Estado

Aceptada

## Contexto

El ciclo de ejecución ya invoca `documentar-dominio` al cerrar cada tarea de desarrollo para mantener vivo `docs/domains/`. Con la documentación de producto creada en D024, ese mismo punto necesita un sensor que mantenga las funcionalidades, los flujos y la referencia de uso —una capa con audiencia y ritmo de cambio distintos del modelo de dominio.

## Decisión

Creamos el skill `documentar-producto` como sensor simétrico a `documentar-dominio`, invocado en el mismo punto del cierre de `ejecutar-tareas`. La frontera entre ambos queda declarada en los dos skills: el dominio documenta el modelo y sus invariantes; el producto documenta el comportamiento observable, los flujos y la referencia de uso, con escenarios anclados a la suite de pruebas del proyecto evaluado.

## Justificación

Replica la división sensor continuo / evaluación ocasional de D021 a nivel de producto en lugar de extender `documentar-dominio`: las dos documentaciones tienen audiencias distintas (mantenedor del modelo frente a usuario del producto) y mezclarlas en un solo sensor haría que cada diff disparara trabajo de ambas capas. La delimitación escrita en ambos skills mantiene «un hogar por hecho»: cada uno referencia al otro en lugar de copiarlo.

## Referencias

- `docs/tasks/085-skill-documentar-producto.md` — tarea que la consolida
- D021 — el patrón sensor continuo que se replica
- D024 — el directorio de producto y la convención de anclas que el sensor mantiene
