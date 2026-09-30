# modern-todo-app

Aplicación de lista de tareas moderna — segunda prueba de concepto del proyecto. Pila decidida en `docs/decisions/D001-pila-react-ts-vite-vitest-eslint-npm.md`: React + TypeScript estricto + Vite + Vitest + ESLint + npm.

## Requisitos

- Node.js 24
- npm 11

## Comandos

| Comando | Acción |
| --- | --- |
| `npm install` | Instala las dependencias fijadas en `package-lock.json` |
| `npm run dev` | Arranca el servidor de desarrollo |
| `npm run build` | Comprueba los tipos y compila la aplicación a `dist/` |
| `npm run typecheck` | Comprueba los tipos en modo estricto sin compilar |
| `npm run preview` | Sirve la salida de `dist/` para inspección local |

## Estructura

- `src/main.tsx` — punto de entrada
- `src/components/` — componentes de la aplicación
- `src/assets/` — recursos estáticos importados por el código
- `public/` — recursos estáticos servidos tal cual
- `docs/` — documentación del proceso (ideas, propuestas, tareas, épicas, decisiones)
- `TODO.txt` — índice de tareas del subproyecto
