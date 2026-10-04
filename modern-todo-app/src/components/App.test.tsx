import { fireEvent, render, screen, within } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { TodoProvider } from '../state/TodoProvider'
import App from './App'

const renderApp = () =>
  render(
    <TodoProvider>
      <App />
    </TodoProvider>,
  )

const captureInput = () => screen.getByRole('textbox', { name: 'Nueva tarea' })

const capture = (title: string) => {
  fireEvent.change(captureInput(), { target: { value: title } })
  fireEvent.submit(captureInput())
}

const itemCheckboxes = () =>
  screen
    .getAllByRole('checkbox')
    .filter((box) => box.getAttribute('aria-label') !== 'Marcar todas')

const list = () => screen.queryByRole('list')

describe('App', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('focuses the capture field on load', () => {
    renderApp()
    expect(captureInput()).toHaveFocus()
  })

  it('creates a task on Enter and clears the field for the next one', () => {
    renderApp()
    capture('Comprar leche')

    expect(
      screen.getByRole('checkbox', { name: 'Comprar leche' }),
    ).toBeInTheDocument()
    expect(captureInput()).toHaveValue('')
  })

  it('captures titles trimmed', () => {
    renderApp()
    capture('   Pasear al perro   ')

    expect(
      screen.getByRole('checkbox', { name: 'Pasear al perro' }),
    ).toBeInTheDocument()
  })

  it.each(['', '   '])('rejects the empty capture %j', (title) => {
    renderApp()
    capture(title)

    expect(list()).not.toBeInTheDocument()
    expect(screen.getByText('No hay tareas todavía.')).toBeInTheDocument()
  })

  it('lists captured tasks in insertion order', () => {
    renderApp()
    capture('Primera')
    capture('Segunda')
    capture('Tercera')

    const items = screen.getAllByRole('listitem')
    expect(items[0]).toHaveTextContent('Primera')
    expect(items[1]).toHaveTextContent('Segunda')
    expect(items[2]).toHaveTextContent('Tercera')
  })

  it('marks an item completed and reactivates it', () => {
    renderApp()
    capture('Comprar leche')

    const toggle = screen.getByRole('checkbox', { name: 'Comprar leche' })
    fireEvent.click(toggle)
    expect(toggle).toBeChecked()
    expect(toggle.closest('li')).toHaveClass('completed')

    fireEvent.click(toggle)
    expect(toggle).not.toBeChecked()
    expect(toggle.closest('li')).not.toHaveClass('completed')
  })

  it('acts on its own item in a list of many', () => {
    renderApp()
    capture('Primera')
    capture('Segunda')

    fireEvent.click(screen.getByRole('checkbox', { name: 'Primera' }))
    expect(screen.getByRole('checkbox', { name: 'Primera' })).toBeChecked()
    expect(screen.getByRole('checkbox', { name: 'Segunda' })).not.toBeChecked()

    fireEvent.click(screen.getByRole('button', { name: 'Eliminar Segunda' }))
    expect(
      screen.queryByRole('checkbox', { name: 'Segunda' }),
    ).not.toBeInTheDocument()
    expect(
      screen.getByRole('checkbox', { name: 'Primera' }),
    ).toBeInTheDocument()
  })

  it('removes an item and restores the empty screen when the last one goes', () => {
    renderApp()
    capture('Única')

    fireEvent.click(screen.getByRole('button', { name: 'Eliminar Única' }))

    expect(list()).not.toBeInTheDocument()
    expect(screen.getByText('No hay tareas todavía.')).toBeInTheDocument()
  })

  it('completes every item when marking all', () => {
    renderApp()
    capture('Primera')
    capture('Segunda')
    fireEvent.click(screen.getByRole('checkbox', { name: 'Primera' }))

    const markAll = screen.getByRole('checkbox', { name: 'Marcar todas' })
    fireEvent.click(markAll)

    expect(markAll).toBeChecked()
    for (const box of itemCheckboxes()) {
      expect(box).toBeChecked()
    }
  })

  it('reactivates every item when unmarking all', () => {
    renderApp()
    capture('Primera')
    capture('Segunda')

    const markAll = screen.getByRole('checkbox', { name: 'Marcar todas' })
    fireEvent.click(markAll)
    fireEvent.click(markAll)

    expect(markAll).not.toBeChecked()
    for (const box of itemCheckboxes()) {
      expect(box).not.toBeChecked()
    }
  })

  it('reflects the aggregate state when an item is reactivated', () => {
    renderApp()
    capture('Primera')
    capture('Segunda')

    const markAll = screen.getByRole('checkbox', { name: 'Marcar todas' })
    fireEvent.click(markAll)
    expect(markAll).toBeChecked()

    fireEvent.click(screen.getByRole('checkbox', { name: 'Primera' }))
    expect(markAll).not.toBeChecked()
  })

  it('hides the list while empty', () => {
    renderApp()

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Modern Todo App',
    )
    expect(screen.getByText('No hay tareas todavía.')).toBeInTheDocument()
    expect(list()).not.toBeInTheDocument()
    expect(
      screen.queryByRole('checkbox', { name: 'Marcar todas' }),
    ).not.toBeInTheDocument()
  })

  it('shows the list and mark-all control after the first capture', () => {
    renderApp()
    capture('Primera')

    expect(screen.getByRole('list')).toBeInTheDocument()
    expect(
      screen.getByRole('checkbox', { name: 'Marcar todas' }),
    ).toBeInTheDocument()
    expect(screen.getByText('Todas')).toBeInTheDocument()
    expect(screen.queryByText('No hay tareas todavía.')).not.toBeInTheDocument()
  })

  it('restores captured tasks on remount with the same storage', () => {
    const first = renderApp()
    capture('Persistida')
    first.unmount()

    renderApp()

    expect(
      screen.getByRole('checkbox', { name: 'Persistida' }),
    ).toBeInTheDocument()
    expect(
      within(screen.getByRole('list')).getAllByRole('listitem'),
    ).toHaveLength(1)
  })
})
