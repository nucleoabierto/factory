import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('App', () => {
  it('muestra la identidad de la aplicación', () => {
    render(<App />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Modern Todo App',
    )
  })

  it('muestra el estado vacío de la lista de tareas', () => {
    render(<App />)
    expect(
      screen.getByRole('region', { name: 'Lista de tareas' }),
    ).toHaveTextContent('No hay tareas todavía.')
  })
})
