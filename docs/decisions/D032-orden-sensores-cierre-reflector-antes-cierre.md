# D032: Orden declarado de los sensores de cierre: reflector antes que cierre de conjunto

## Estado

Aceptada

## Contexto

El ciclo de tareas gana dos sensores que mantienen coherentes el índice, las épicas y el roadmap: el reflector del roadmap (reflejo mecánico del estado de las líneas comprometidas) y el cierre de conjunto (verificación del criterio de cierre, épica `Completada`, eliminación de la agrupación del índice). Ambos corren al completarse una tarea y ambos leen el índice, pero el cierre lo muta: una vez la agrupación sale, una línea del roadmap que resuelve a un encabezado ligero o a una tarea suelta ya no puede verificar su cierre. Las opciones eran pasar al reflector la señal de cierre, ordenar los sensores o fundirlos en uno.

## Decisión

Al completarse una tarea, el ciclo invoca primero el reflector del roadmap —para todo tipo de tarea, en el mismo punto del cierre que los demás sensores— y después, solo cuando la agrupación de la tarea quedó agotada, el cierre de conjunto. La detección del agotamiento la hace el ejecutor sobre el encabezado del índice y el comentario de enlace a la épica, sin leer el interior del documento. La divergencia de dirección que el reflector detecta invoca `planificar-roadmap`, que conserva la puerta humana.

## Justificación

El orden reflector→cierre hace a cada sensor independiente de la salida del otro: el reflector ve el índice aún íntegro y puede verificar el cierre de cualquier línea —con épica, encabezado ligero o tarea suelta— y el cierre opera después sobre un roadmap ya fiel. Las alternativas acoplaban los contratos: pasar la señal de cierre al reflector haría su entrada depender del orden y obligaría a los dos skills a conocerse; fundirlos mezclaría dos responsabilidades —reflejo de estado y cierre de conjunto— que tienen veredictos y condiciones de disparo distintos. Consecuencia: el ejecutor gana un paso que observa la frontera entre tarea y conjunto, y la escritura sobre el roadmap queda acotada al reflejo mecánico; la dirección sigue siendo exclusiva de la planeación con puerta humana.

## Referencias

- `docs/tasks/111-cablear-cierre-conjunto-y-roadmap.md` — Tarea que consolida la decisión.
- `docs/decisions/D017-todo-txt-indice-de-trabajo-activo.md` — El índice contiene solo trabajo activo; el cierre de conjunto es su ejecutor mecánico.
- `docs/decisions/D022-roadmap-como-nivel-de-direccion.md` — El roadmap decide y el índice ejecuta.
- `docs/decisions/D027-roadmap-horizontes-now-next-later.md` — Los horizontes del roadmap; solo Now declara estado por línea.
