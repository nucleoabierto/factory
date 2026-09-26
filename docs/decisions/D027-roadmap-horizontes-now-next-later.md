# D027: El roadmap se organiza en horizontes Now/Next/Later

## Estado

Aceptada

## Contexto

D022 adoptó el roadmap como documento de dirección con orden lineal justificado. El orden lineal aplana la distinción entre «comprometido» y «dirección» y no da hogar a lo aparcado. La investigación de documentación de producto y roadmap identificó el patrón Now/Next/Later como el formato dominante de roadmaps sin fechas.

## Decisión

Extendemos D022: `ROADMAP.md` organiza las líneas en horizontes de confianza —Now (comprometido y en vuelo, acotado a 3-5 líneas y con estado), Next (validado y próximo), Later (dirección sin compromiso, temas sin orden) y No ahora (aparcado con su razón)—. La justificación por posición se mantiene dentro de Now y Next. `TODO.txt` refleja solo los horizontes comprometidos; Later y No ahora viven solo en el roadmap. Una propuesta `[p]` no es línea del roadmap hasta que se aprueba y planifica.

## Justificación

Los horizontes añaden la dimensión de confianza que la secuencia única aplanaba, sin introducir fechas ni un nivel nuevo de jerarquía. El reflejo parcial del índice es la consecuencia natural de que el índice sea fuente de ejecución: lo que no está comprometido no es ejecutable y no necesita orden. La sección «No ahora» comunica dirección y evita que las ideas aparcadas se pierdan o reaparezcan.

## Referencias

- `docs/tasks/087-roadmap-por-horizontes.md` — tarea que la consolida
- D022 — la decisión que extiende
- `docs/research/2026-09-documentacion-producto-y-roadmap.md` — sección 4, el patrón Now/Next/Later y sus prácticas asociadas
