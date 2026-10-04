import { useId, useState } from 'react'
import type { Task } from '../domain/tasks'
import { removeTask, renameTask, toggleTask } from '../domain/tasks'
import { useTodoDispatch } from '../state/todo-context'

interface TaskItemProps {
  task: Task
}

export function TaskItem({ task }: TaskItemProps) {
  const dispatch = useTodoDispatch()
  const titleId = useId()
  const [editing, setEditing] = useState(false)

  const commit = (value: string) => {
    const title = value.trim()
    dispatch(title === '' ? removeTask(task.id) : renameTask(task.id, title))
    setEditing(false)
  }

  if (editing) {
    return (
      <li className="editing">
        <input
          key="edit"
          className="edit"
          type="text"
          defaultValue={task.title}
          autoFocus
          aria-label={`Editar ${task.title}`}
          onBlur={(event) => commit(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              commit(event.currentTarget.value)
            } else if (event.key === 'Escape') {
              setEditing(false)
            }
          }}
        />
      </li>
    )
  }

  return (
    <li className={task.completed ? 'completed' : undefined}>
      <input
        key="toggle"
        className="toggle"
        type="checkbox"
        checked={task.completed}
        aria-labelledby={titleId}
        onChange={() => dispatch(toggleTask(task.id))}
      />
      <label id={titleId} onDoubleClick={() => setEditing(true)}>
        {task.title}
      </label>
      <button
        className="destroy"
        type="button"
        aria-label={`Eliminar ${task.title}`}
        title={`Eliminar ${task.title}`}
        onClick={() => dispatch(removeTask(task.id))}
      >
        ×
      </button>
    </li>
  )
}
