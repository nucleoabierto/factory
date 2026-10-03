# Backend y persistencia real

## Estado

[x] Planificada

## Objetivo

`modern-todo-app` opera como sistema distribuido: un servicio propio aloja el dominio de la tarea con persistencia real y lo expone por una API con contrato, la interfaz es una vista de ese estado remoto con carga y fallo visibles, y la misma lista se sirve a cualquier navegador — todo verificado de extremo a extremo por `npm run verify` con cobertura al 100%.

## Alcance

- **Dentro:** pila del servicio decidida y registrada como decisión; dominio del servidor con las invariantes del núcleo y almacenamiento persistente con esquema migrable; API del ciclo de vida con contrato documentado e integración probada; cliente reconectado a la API con estados de carga y error visibles; verificación de extremo a extremo del sistema distribuido y reconformidad TodoMVC; arranque del servicio documentado en el README.
- **Fuera:** identidad y pertenencia de listas (línea de Later); operación offline y reconciliación (idea 005); organización avanzada (idea 004); colaboración en tiempo real (Later); listas múltiples; migración de las listas existentes en el navegador; despliegue fuera del entorno local de desarrollo.

## Piezas

- [ ] docs/tasks/011-decidir-pila-servicio.md — Decidir la pila del servicio
- [ ] docs/tasks/012-dominio-servicio-almacenamiento.md — Dominio del servicio y almacenamiento real
- [ ] docs/tasks/013-api-contrato.md — API del ciclo de vida con contrato
- [ ] docs/tasks/014-cliente-remoto.md — Cliente como vista del estado remoto
- [ ] docs/tasks/015-verificacion-e2e.md — Verificación de extremo a extremo del sistema distribuido

## Plan técnico

- **Orden:** lineal, 011 → 015; la épica entera presupone la 002 — 012 necesita las invariantes del dominio de 007 y 014 la interfaz operable de 008–010.
- **Dependencias:** 012 consume la pila decidida en 011; 013 expone el dominio de 012; 014 reconecta el cliente sobre el contrato de 013; 015 cierra el sistema distribuido.
- **Decisiones transversales:** la pila del servicio se decide una vez en 011 —mismo repositorio, TypeScript estricto, Vitest— y las demás piezas la consumen sin reabrirla; la doble verdad es deliberada —las invariantes se validan en cliente y servidor—; el contrato es la frontera: cada lado se verifica contra él y la integración real se reserva a la pieza de cierre; el cliente falla visiblemente cuando el servicio no responde —la tolerancia offline pertenece a la idea 005—; `npm run verify` con cobertura al 100% cubre ambos lados.

## Criterio de cierre

El servicio arranca junto al cliente según el README, dos clientes ven y operan la misma lista compartida, la aplicación sigue conforme a las cláusulas funcionales de la spec TodoMVC y `npm run verify` queda en verde con cobertura al 100% en ambos lados.

## Revisión

- Usuario: 2026-10-02 — Aprueba
