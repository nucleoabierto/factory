# Resolución de necesidades de las piezas en frontera

## Estado

[~] En progreso

## Tipo

desarrollo

## Objetivo

Adaptar las piezas para que cada necesidad que cruza su frontera quede resuelta: las obligatorias mediante las dependencias declaradas en los manifiestos, y las opcionales mediante degradación elegante —sin invocaciones ni referencias rotas a lo no instalado—.

## Dependencias

- 155

## Entrada

- La colección materializada de la tarea 155 y la lista de necesidades con su degradación decidida del modelo de la tarea 153.
- Una referencia `../hermano/` resuelve en el árbol de destino si el hermano está instalado: la dependencia declarada lo garantiza; solo las referencias a piezas que no son dependencia del conjunto requieren adaptación.
- La instalación trae transitivamente las dependencias declaradas: lo obligatorio está garantizado en destino; lo opcional exige degradación por diseño.
- Los proyectos de validación, donde cualquier comportamiento degradado se evidencia.

## Resultado esperado

- Las piezas adaptadas dentro de sus conjuntos: cada necesidad obligatoria satisfecha por dependencia declarada, cada opcional con su degradación documentada en la propia pieza.

## Criterios de calidad

- Ninguna pieza invoca ni referencia material fuera de su conjunto más sus dependencias declaradas, salvo la degradación documentada.
- Cada conjunto es funcional con solo sus dependencias instaladas: sus flujos principales corren en destino de prueba.
- Las adaptaciones respetan el formato vigente de las piezas y el material compartido llega vía dependencias declaradas.
- Las fricciones encontradas quedan registradas.

## Procedimiento sugerido

1. Por pieza, recorrer sus necesidades según la lista del modelo: la referencia a pieza declarada como dependencia queda tal cual —resuelve en destino—; la referencia o invocación a pieza opcional se degrada a instrucción o comportamiento reducido documentado.
2. Adaptar invocaciones entre skills: `skill(nombre)` de una pieza no dependiente degrada a instrucción; las de piezas dependientes se mantienen.
3. Adaptar imports y referencias a gestores que quedaron como dependencias o fuera de frontera.
4. Ejecutar las piezas en frontera en un destino de prueba por conjunto: cada una funciona con solo sus dependencias instaladas —la verificación funcional del grafo declarado—.
5. Si la adaptación ajustó alguna dependencia declarada en un manifiesto, re-verificar la instalación de los conjuntos afectados: el grafo sigue resolviendo y la composición pura, si existe, mantiene la paridad.

## Notas

- Hallazgos de la revisión de personalización (tarea 155) que pertenecen a esta tarea:
  - Citas de artefactos internos de factory embebidas en piezas —`docs/decisions/D031-…`, `docs/research/2026-09-…`— que cuelgan en instalaciones consumidoras.
  - Fugas de convención: `docs/ideas/NNN-slug.md` como ubicación embebida en `evaluar-conectividad/references/vuelta-demanda.md` y en `planear-tarea` — la idea tiene documento de reglas en gestores y debería delegarse.
  - `gestionar-pr` usa «la rama principal» sin literal ni mecanismo de resolución, y `ciclo-revision` no depende de `ciclo-tareas` donde vive `rama_principal` — hueco de diseño de la pieza.

- Fuera de alcance: el modelo de fronteras (tarea 153), la materialización de la colección (tarea 155), reinstalar con subconjuntos los proyectos de validación existentes y rediseño de piezas más allá de lo que su coherencia en frontera exige.
- Detectado en la revisión de la tarea 153: `revisar-pr/SKILL.md` cita `.agents/skills/revisar-implementacion/SKILL.md` como proveniencia —referencia de archivo que cruza conjuntos (`ciclo-revision` → `ciclo-tareas`) y declararla como dependencia crearía un ciclo (`ciclo-tareas` ya depende de `ciclo-revision`); resolverla como referencia incidental en esta tarea —reformular la cita o duplicar el fragmento necesario—.

## Contexto

- La colección materializada vive en `packages/<conjunto>/skills/`; las copias instaladas en `.agents/skills/` se refrescan por reinstalación y se commitean (regla de `AGENTS.md`, D039). Toda edición de esta tarea se hace en la fuente —`packages/`— y se propaga al cierre.
- Auditoría estática ejecutada sobre los once conjuntos (2026-11-26), que inventarió las necesidades reales en frontera:
  - **Referencias de archivo entre piezas:** una sola violación —`ciclo-revision/skills/revisar-pr/SKILL.md` cita `.agents/skills/revisar-implementacion/SKILL.md` como proveniencia en «Referencias», arista que crearía ciclo (sembrada en las notas). El resto de citas `.agents/skills/<pieza>` resuelve dentro del conjunto propio o de las dependencias declaradas: el grafo de la 153 es fiel.
  - **Citas colgadas a artefactos internos de factory** —la clase mayor—: una veintena de piezas citan en «Referencias» `docs/decisions/DNNN-…` y `docs/research/…` de este repositorio, que no existen en la instalación consumidora (o peor: colisionan con las decisiones del consumidor). La lección `contratos-de-skills` ya lo fija: las referencias apuntan solo a material que viaja con el paquete; la motivación se escribe portable o se omite. Piezas afectadas: `idea-a-tarea`, `cerrar-conjunto`, `evaluar-conectividad`, `planear-tarea`, `desarrollar-tarea`, `planear-implementacion`, `ejecutar-implementacion`, `revisar-implementacion`, `liberar-version`, `mantener-changelog`, `gestionar-pr`, `actualizar-artefactos`, `operar-changelog`, `consultar-artefactos`, `operar-experiencias`, `priorizar-lineas`, `documentar-dominio`, `aplicar-guia-estilo`, `documentar-producto`, `documentar-guia-estilo`, `mantener-roadmap`, `planificar-roadmap`, `mantener-prd`.
  - **Fugas de convención:** `evaluar-conectividad/references/vuelta-demanda.md` replica la ubicación, la serie y el formato de la idea persistida pese a referenciar ya el documento de reglas `actualizar-artefactos/references/idea.md` que los declara; `planear-tarea/SKILL.md` menciona `docs/ideas/` como ubicación embebida. El literal personalizado viviría en el documento de reglas y la réplica quedaría desfasada.
  - **`gestionar-pr` sin `rama_principal`:** la pieza usa «la rama principal» en todo su procedimiento sin literal ni mecanismo —`ejecutar-tareas` sí lo declara (`rama_principal`, `main` por defecto) como literales embebidos, el patrón que `consultar-artefactos` fija para convenciones ajenas a artefacto—. `ciclo-revision` no puede depender de `ciclo-tareas` (ciclo); la resolución es embeber el literal en la propia pieza.
  - **Invocaciones incondicionales a `evidencia`:** `refinar-propuesta` (flujo-ideas) y `planear-implementacion` (ciclo-tareas) invocan `investigar`/`prueba-concepto` sin condición, cuando ninguno de los dos conjuntos depende de `evidencia` —el modelo declara la degradación (registrar como pendiente o asumir con suposición declarada) pero las piezas no la implementan—. Las invocaciones a `revisar-redaccion`/`pulir-escritura` ya son condicionales («si el arnés lo permite… equivalente manual»), aunque la condición real en frontera es la instalación de la pieza, no solo el arnés.
  - Las menciones de enrutado («eso corresponde a X», «usar X» en cuándo-no-usar) son señales según el modelo: no son dependencias ni requieren adaptación.
- Las referencias legítimas que se conservan: plantillas de `assets/` propias, citas a piezas del conjunto o de dependencias declaradas, documentos de reglas de gestores (viajan con el paquete) y los placeholders dirigidos al consumidor (p. ej. `docs/research/NNN` en la plantilla de propuesta, que apunta a las investigaciones del proyecto consumidor).

## Conectividad

Conectada. El universo de la tarea está completo en el repositorio: las 45 piezas en `packages/`, el grafo declarado en los manifiestos y el modelo del dominio 007 con las degradaciones decididas. La auditoría estática ya produjo el inventario de necesidades en frontera; no hace falta ninguna capacidad ausente ni tarea puente.

## Plan técnico

Aprobado por el usuario el 2026-11-26.

Las 45 piezas viven en su frontera física pero su contenido arrastra la era del paquete único: citas a artefactos que solo existen en factory, convenciones duplicadas que los documentos de reglas de gestores ya declaran, invocaciones a piezas opcionales escritas como si siempre estuvieran presentes y un literal sin resolver en `gestionar-pr`. Las invocaciones estructurales a `evidencia` en `refinar-propuesta` y `planear-implementacion` eran dependencias obligatorias mal clasificadas como opcionales; declararlas es la resolución mínima que deja las piezas correctas sin rediseño.

Decisiones de forma:

- Citas colgadas → eliminación o motivación portable; la proveniencia vive en la historia de factory.
- `rama_principal` se embebe en `gestionar-pr` con el patrón de `ejecutar-tareas`.
- Las invocaciones condicionales a `redaccion` se redactan con la condición real de frontera —«si la pieza está instalada»—.
- Las necesidades obligatorias se resuelven por dependencia declarada cuando la invocación es estructural y no hay ciclo —`evidencia` ya declarada en `flujo-ideas` y `ciclo-tareas`—; la degradación queda reservada a lo genuinamente opcional —derivaciones condicionales, señales de enrutado y `redaccion`—.

Acciones:

- [x] Declarar `evidencia` en los manifiestos de `flujo-ideas` y `ciclo-tareas` — ejecutada y verificada en la planeación: `flujo-ideas` 20 piezas, `ciclo-tareas` 43, resolución transitiva sin ciclos
- [x] Eliminar o hacer portables las citas colgadas en las 23 piezas inventariadas — conservando referencias legítimas: assets propios, piezas en frontera, reglas de gestores, placeholders del consumidor
- [x] Resolver la cita cíclica de `revisar-pr` a `revisar-implementacion` reformulando la línea de «Referencias»; la señal de enrutado en «cuándo no usar» se conserva
- [x] Eliminar las fugas de convención de ideas: `vuelta-demanda.md` delega en el documento de reglas que ya referencia; `planear-tarea` nombra la convención sin embeber ruta
- [x] Embeber `rama_principal` en `gestionar-pr` y registrarlo en `ciclo-revision/PERSONALIZE.md`
- [x] Adaptar las derivaciones condicionales que asumen presencia: `revisar-arquitectura` paso 6 y `gestionar-pr`/`mejorar-pr` (rama fuera-de-alcance con `crear-tareas`): condición de frontera explícita con degradación —registro manual o anotación en la respuesta—
- [x] Re-redactar las condicionales de `revisar-redaccion`/`pulir-escritura` en la docena de piezas: la condición es la instalación de la pieza, no solo el arnés
- [x] Actualizar el dominio 007: el grafo gana las dos aristas de `evidencia`, las degradaciones declaradas se reescriben y las anclas se ajustan
- [x] Barrido de verificación estática: auditoría automatizada con cero violaciones y cero citas colgadas
- [x] Verificación en frontera por conjunto: instalar cada uno en destino limpio y auditar el árbol instalado
- [x] Reinstalar la colección en el repo y commitear las copias refrescadas
- [x] Revisión de redacción preventiva de los pasajes reescritos

## Suite de pruebas esperada

Aprobada por el usuario el 2026-11-26.

- La auditoría estática arroja cero violaciones de frontera entre piezas (B)
- Ninguna pieza cita `docs/decisions/DNNN` ni `docs/research/` de factory —salvo placeholders dirigidos al consumidor— (Z)
- `vuelta-demanda.md` y `planear-tarea` no embeben la convención de ideas (I)
- `gestionar-pr` declara y resuelve el literal `rama_principal`, registrado en el PERSONALIZE del conjunto (E)
- Toda invocación a pieza no dependiente —`redaccion`, derivaciones a `crear-tareas`/`decisiones-diseno`— es condicional con degradación documentada (M)
- Los manifiestos de `flujo-ideas` y `ciclo-tareas` declaran `evidencia` con `>=0.8.0 <1.0.0` y el grafo resuelve sin ciclos —ya verificado: 20 y 43 piezas— (O)
- Instalado cada conjunto en destino limpio, el árbol no contiene referencias a piezas ausentes fuera de las degradaciones documentadas (O)
- El dominio 007 refleja el grafo corregido y sus degradaciones vigentes (I)
- Copias instaladas en sincronía byte-idéntica tras la reinstalación del cierre (regresión)
- Las referencias legítimas se conservan intactas (regresión)

## Desviaciones

- `.teleprompter/backups/` añadido al `.gitignore`: la reinstalación con `--force` crea copias de seguridad transitorias de las piezas sobrescritas, estado local de máquina que el plan no nombraba —misma clase que el lockfile—. Sin efecto sobre el resultado.
- Ronda de correcciones de la revisión técnica aplicada dentro de la propia tarea: citas inline `(DNNN)` que el barrido por secciones no alcanzó, resolución operativa del literal `rama_principal` en los pasos de apertura y cierre, alineación de dos textos con la degradación y la salud del dominio. Flujo normal de revisión, registrado por transparencia.

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario (ejecución): [fecha] — [Aprueba | Solicita cambios]
- Usuario (cierre): [fecha] — [Aprueba | Solicita cambios]
