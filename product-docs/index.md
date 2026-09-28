# Factory — Documentación de producto

Factory es un conjunto de skills que permiten a un agente de IA gestionar un producto de software de principio a fin: desde una idea suelta hasta un *pull request* integrado en la base de código. Esta documentación cubre el producto —qué es y hacia dónde va—; el proceso de trabajo interno vive en `docs/`.

## Índice

- [Visión del proyecto](vision.md) — propósito, dirección, objetivos, alcance y audiencia.

## Qué hay detrás

El modelo del sistema —sus dominios, invariantes y fronteras— está documentado en `docs/domains/`; las decisiones que le dan forma, en `docs/decisions/`; y la guía de uso del propio sistema, en el `README.md` de la raíz.

## Construir el sitio

Los documentos se leen directamente en el repositorio. Para generar el sitio navegable, `mkdocs build` o `mkdocs serve` en la raíz del repositorio con la configuración mínima de `mkdocs.yml`.
