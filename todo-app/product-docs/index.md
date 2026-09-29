# todo-app — Documentación de producto

todo-app es una lista de tareas que funciona en el navegador, sin instalación ni cuentas: se abre `index.html` y se empieza a apuntar. Todo lo que se escribe se conserva entre visitas en el propio navegador.

## Índice

- **Guías**
  - [Usar la lista](guias/usar-la-lista.md) — capturar, completar, organizar en listas y archivar
- **Funcionalidades**
  - [Tareas](funcionalidades/001-tareas.md) — crear, completar, editar, borrar, filtrar y limpiar
  - [Listas](funcionalidades/002-listas.md) — crear, renombrar, eliminar, mover tareas y lista activa
  - [Archivar listas](funcionalidades/003-archivar-listas.md) — aparcar y reactivar listas sin perder contenido
  - [Vista «hoy» y programación](funcionalidades/004-vista-hoy.md) — lo futuro oculto de la vista principal y la consulta acotada a la jornada
  - [Tareas recurrentes](funcionalidades/005-tareas-recurrentes.md) — periodicidad semanal o mensual que regenera la aparición al completar
  - [Exportar contenido](funcionalidades/006-exportar.md) — sacar el estado como archivo descargable o como enlace portable
  - [Importar contenido](funcionalidades/007-importar.md) — traer contenido desde un archivo o un enlace, reemplazando o copiando
- **Referencia**
  - [Estado persistido](referencia/estado-persistido.md) — qué guarda la aplicación en el navegador y en qué formato
  - [Formato de exportación](referencia/formato-exportacion.md) — el documento que llevan el archivo descargado y el enlace

## Qué hay detrás

El modelo y sus reglas —qué es una tarea, una lista, la entrada permanente y sus invariantes— están documentados en el documento de dominio `docs/domains/001-lista-de-tareas.md` del propio proyecto. Esta documentación cubre el comportamiento observable: qué hace la aplicación y cómo usarla.

## Construir el sitio

Los documentos se leen directamente en el repositorio. Para generar el sitio navegable, `mkdocs build` o `mkdocs serve` en `todo-app/` con la configuración mínima de `mkdocs.yml`.
