# Changelog

Todos los cambios notables de este proyecto se documentan en este archivo.

El formato sigue [Keep a Changelog](https://keepachangelog.com/en/2.0.0/)
y el proyecto se adhiere a [Versionado Semántico](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Andamiaje del proyecto: aplicación web instalable, compilable y servible con React + TypeScript estricto + Vite, que muestra una pantalla propia y cuya verificación completa —tipos, lint, formato, pruebas con cobertura exigida al 100% y compilación— corre con un solo comando `npm run verify` ([docs/epics/001-andamiaje-proyecto.md](docs/epics/001-andamiaje-proyecto.md))

### Changed

- La pantalla se construye sobre el sistema de diseño del producto —guía de estilo declarada en `DESIGN.md`, tokens como custom properties y tema claro y oscuro— y se presenta como tarjeta ([docs/epics/002-nucleo-todomvc.md](docs/epics/002-nucleo-todomvc.md))
