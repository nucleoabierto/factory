import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('App', () => {
  it('shows the application identity', () => {
    render(<App />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Modern Todo App',
    )
  })

  it('shows the empty state of the task list', () => {
    render(<App />)
    expect(
      screen.getByRole('region', { name: 'Lista de tareas' }),
    ).toHaveTextContent('No hay tareas todavía.')
  })
})
