import type { Task } from '../domain/tasks'
import { TaskItem } from './TaskItem'

interface TaskListProps {
  tasks: Task[]
}

export function TaskList({ tasks }: TaskListProps) {
  return (
    <ul className="todo-list" aria-label="Lista de tareas">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  )
}
