export interface Task {
  id: string
  title: string
  completed: boolean
}

export interface TodoState {
  tasks: Task[]
}

export type TaskFilter = 'all' | 'active' | 'completed'

export type TaskAction =
  | { type: 'add'; id: string; title: string }
  | { type: 'toggle'; id: string }
  | { type: 'rename'; id: string; title: string }
  | { type: 'remove'; id: string }
  | { type: 'setAllCompleted'; completed: boolean }
  | { type: 'clearCompleted' }

export const initialState: TodoState = { tasks: [] }

export function addTask(title: string): TaskAction {
  return { type: 'add', id: crypto.randomUUID(), title }
}

export function toggleTask(id: string): TaskAction {
  return { type: 'toggle', id }
}

export function renameTask(id: string, title: string): TaskAction {
  return { type: 'rename', id, title }
}

export function removeTask(id: string): TaskAction {
  return { type: 'remove', id }
}

export function setAllCompleted(completed: boolean): TaskAction {
  return { type: 'setAllCompleted', completed }
}

export function clearCompleted(): TaskAction {
  return { type: 'clearCompleted' }
}

export function todoReducer(state: TodoState, action: TaskAction): TodoState {
  switch (action.type) {
    case 'add': {
      const title = action.title.trim()
      if (title === '') {
        return state
      }
      return {
        tasks: [...state.tasks, { id: action.id, title, completed: false }],
      }
    }
    case 'toggle': {
      if (!state.tasks.some((task) => task.id === action.id)) {
        return state
      }
      return {
        tasks: state.tasks.map((task) =>
          task.id === action.id
            ? { ...task, completed: !task.completed }
            : task,
        ),
      }
    }
    case 'rename': {
      const title = action.title.trim()
      if (!state.tasks.some((task) => task.id === action.id)) {
        return state
      }
      if (title === '') {
        return { tasks: state.tasks.filter((task) => task.id !== action.id) }
      }
      return {
        tasks: state.tasks.map((task) =>
          task.id === action.id ? { ...task, title } : task,
        ),
      }
    }
    case 'remove': {
      if (!state.tasks.some((task) => task.id === action.id)) {
        return state
      }
      return { tasks: state.tasks.filter((task) => task.id !== action.id) }
    }
    case 'setAllCompleted': {
      if (state.tasks.every((task) => task.completed === action.completed)) {
        return state
      }
      return {
        tasks: state.tasks.map((task) => ({
          ...task,
          completed: action.completed,
        })),
      }
    }
    case 'clearCompleted': {
      if (!state.tasks.some((task) => task.completed)) {
        return state
      }
      return { tasks: state.tasks.filter((task) => !task.completed) }
    }
  }
}

export function activeCount(state: TodoState): number {
  return state.tasks.filter((task) => !task.completed).length
}

export function selectByFilter(state: TodoState, filter: TaskFilter): Task[] {
  switch (filter) {
    case 'all':
      return state.tasks
    case 'active':
      return state.tasks.filter((task) => !task.completed)
    case 'completed':
      return state.tasks.filter((task) => task.completed)
  }
}

function isTaskLike(candidate: unknown): candidate is Task {
  if (typeof candidate !== 'object' || candidate === null) {
    return false
  }
  if (
    !('id' in candidate) ||
    !('title' in candidate) ||
    !('completed' in candidate)
  ) {
    return false
  }
  const { id, title, completed } = candidate
  return (
    typeof id === 'string' &&
    id !== '' &&
    typeof title === 'string' &&
    title.trim() !== '' &&
    typeof completed === 'boolean'
  )
}

export function hydrateTasks(data: unknown): Task[] {
  if (!Array.isArray(data)) {
    return []
  }
  const seen = new Set<string>()
  const tasks: Task[] = []
  for (const candidate of data) {
    if (!isTaskLike(candidate) || seen.has(candidate.id)) {
      continue
    }
    seen.add(candidate.id)
    tasks.push({
      id: candidate.id,
      title: candidate.title.trim(),
      completed: candidate.completed,
    })
  }
  return tasks
}
