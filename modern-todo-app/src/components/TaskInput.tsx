import { useState } from 'react'
import type { FormEvent } from 'react'
import { addTask } from '../domain/tasks'
import { useTodoDispatch } from '../state/todo-context'

export function TaskInput() {
  const dispatch = useTodoDispatch()
  const [title, setTitle] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    dispatch(addTask(title))
    setTitle('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="new-todo"
        type="text"
        autoFocus
        aria-label="Nueva tarea"
        placeholder="¿Qué hay que hacer?"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
    </form>
  )
}
