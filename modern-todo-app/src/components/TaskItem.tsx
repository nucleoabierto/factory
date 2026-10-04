import { useId } from 'react'
import type { Task } from '../domain/tasks'
import { removeTask, toggleTask } from '../domain/tasks'
import { useTodoDispatch } from '../state/todo-context'

interface TaskItemProps {
  task: Task
}

export function TaskItem({ task }: TaskItemProps) {
  const dispatch = useTodoDispatch()
  const titleId = useId()

  return (
    <li className={task.completed ? 'completed' : undefined}>
      <input
        className="toggle"
        type="checkbox"
        checked={task.completed}
        aria-labelledby={titleId}
        onChange={() => dispatch(toggleTask(task.id))}
      />
      <label id={titleId}>{task.title}</label>
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
