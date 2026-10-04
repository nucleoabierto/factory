import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { addTask, toggleTask } from '../domain/tasks'
import { TASKS_STORAGE_KEY } from '../persistence/task-storage'
import type { TaskStorage } from '../persistence/task-storage'
import { TodoProvider } from './TodoProvider'
import { useTodoDispatch, useTodoState } from './todo-context'

function Probe() {
  const state = useTodoState()
  const dispatch = useTodoDispatch()
  return (
    <section aria-label="probe">
      <ul>
        {state.tasks.map((task) => (
          <li key={task.id}>
            {task.title} ({task.completed ? 'done' : 'pending'})
          </li>
        ))}
      </ul>
      <button type="button" onClick={() => dispatch(addTask('New task'))}>
        Add
      </button>
      <button
        type="button"
        onClick={() => dispatch(toggleTask(state.tasks[0]?.id ?? ''))}
      >
        Complete first
      </button>
    </section>
  )
}

const renderProbe = (storage?: TaskStorage) =>
  render(
    <TodoProvider storage={storage}>
      <Probe />
    </TodoProvider>,
  )

const items = () => screen.getAllByRole('listitem').map((li) => li.textContent)

describe('TodoProvider', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('hydrates the state from todos-react on mount', () => {
    localStorage.setItem(
      TASKS_STORAGE_KEY,
      JSON.stringify([
        { id: 'a', title: 'Saved', completed: false },
        { id: 'b', title: 'Done', completed: true },
      ]),
    )

    renderProbe()

    expect(items()).toEqual(['Saved (pending)', 'Done (done)'])
  })

  it('persists to todos-react after a dispatch', () => {
    renderProbe()

    fireEvent.click(screen.getByRole('button', { name: 'Add' }))

    const raw = localStorage.getItem(TASKS_STORAGE_KEY) ?? ''
    expect(JSON.parse(raw)).toEqual([
      { id: expect.any(String), title: 'New task', completed: false },
    ])
  })

  it('restores the state on a fresh mount with the same storage', () => {
    const first = renderProbe()
    fireEvent.click(screen.getByRole('button', { name: 'Add' }))
    first.unmount()

    renderProbe()

    expect(items()).toEqual(['New task (pending)'])
    fireEvent.click(screen.getByRole('button', { name: 'Complete first' }))
    expect(items()).toEqual(['New task (done)'])
  })

  it('uses the injected storage when provided', () => {
    const save = vi.fn()
    renderProbe({
      load: () => [{ id: 'x', title: 'Injected', completed: false }],
      save,
    })

    expect(items()).toEqual(['Injected (pending)'])
    expect(save).toHaveBeenCalledWith([
      { id: 'x', title: 'Injected', completed: false },
    ])
  })

  it('throws when the hooks are used outside the provider', () => {
    function StateProbe() {
      useTodoState()
      return null
    }
    function DispatchProbe() {
      useTodoDispatch()
      return null
    }
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    expect(() => render(<StateProbe />)).toThrow(
      'useTodoState debe usarse dentro de TodoProvider',
    )
    expect(() => render(<DispatchProbe />)).toThrow(
      'useTodoDispatch debe usarse dentro de TodoProvider',
    )

    consoleSpy.mockRestore()
  })
})
