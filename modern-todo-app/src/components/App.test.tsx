import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('App', () => {
  it('muestra la pantalla inicial del scaffolding', () => {
    render(<App />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Get started',
    )
  })

  it('incrementa el contador al hacer click', () => {
    render(<App />)
    const button = screen.getByRole('button', { name: /count is/i })
    expect(button).toHaveTextContent('Count is 0')
    fireEvent.click(button)
    expect(button).toHaveTextContent('Count is 1')
  })
})
