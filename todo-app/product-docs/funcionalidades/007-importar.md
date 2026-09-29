# Importar contenido

Traer contenido a la aplicación en dos formas: «Importar», en el pie, abre un selector para elegir un archivo con un documento exportado, y abrir la aplicación con un enlace recibido propone su contenido automáticamente. En ambos casos la aplicación muestra primero una propuesta —qué trae— y la persona decide: «Reemplazar» deja el contenido recibido como único estado, «Copiar» lo añade junto a lo existente sin pisarlo, y «Descartar» lo deja fuera. Un archivo o enlace que no se puede leer, o que no es un documento válido de la aplicación, se rechaza con un aviso y nada cambia. Las reglas del documento y de la importación están en el documento de dominio `docs/domains/001-lista-de-tareas.md`; aquí se describe el comportamiento observable.

## Escenarios

Cada escenario está verificado por la suite de pruebas del proyecto (`tests.html`, módulo `import file and link`); se cita el título de la prueba que lo cubre.

- **Importar un archivo propone antes de aplicar.** Elegir un archivo válido muestra la propuesta —cuántas tareas y listas trae— sin cambiar nada hasta decidir. — «a valid file proposes the import without touching the state»
- **La última oferta es la que manda.** Con una propuesta pendiente, elegir otro archivo la sustituye. — «a second file replaces the pending proposal»
- **Un enlace recibido propone al abrir.** Abrir la aplicación con un enlace válido muestra la propuesta sin aplicarlo. — «opening the app with a valid link proposes the import»
- **El enlace exportado se reconoce al abrirlo.** La dirección que produce «Enlace» decodifica al mismo documento; un fragmento de filtro o de vista no propone nada. — «the exported link is recognized and decodes back»
- **Sin enlace no hay propuesta.** Abrir la aplicación a secas arranca con normalidad. — «opening without a link starts without a proposal»
- **Reemplazar deja solo lo recibido.** La propuesta se aplica como estado completo y desaparece. — «replacing applies the document and clears the proposal»
- **Copiar añade sin pisar.** El contenido recibido se suma a lo existente —lo propio queda intacto— y la propuesta desaparece. — «copying adds the content next to the existing»
- **Descartar lo deja fuera.** La propuesta desaparece sin tocar el estado. — «dismissing clears the proposal untouched»
- **Lo importado se conserva.** El contenido aplicado sigue ahí al recargar. — «an applied import persists like any other change»
- **Un archivo inválido avisa y no entra.** Contenido corrupto o de otra aplicación produce un aviso claro y el estado queda intacto. — «a malformed file warns and leaves the state intact»
- **Un enlace inválido avisa igual.** Una carga que no se puede leer o cuyo documento no valida produce el mismo aviso, con la aplicación arrancada con normalidad. — «a link that does not decode or validate warns»
- **La acción vive en el pie.** «Importar» está siempre disponible junto a las de exportación. — «the footer exposes the import action»
