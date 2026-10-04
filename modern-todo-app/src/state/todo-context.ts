import { createContext, useContext } from 'react'
import type { Dispatch } from 'react'
import type { TaskAction, TodoState } from '../domain/tasks'

export const TodoStateContext = createContext<TodoState | null>(null)
export const TodoDispatchContext = createContext<Dispatch<TaskAction> | null>(
  null,
)

export function useTodoState(): TodoState {
  const state = useContext(TodoStateContext)
  if (state === null) {
    throw new Error('useTodoState debe usarse dentro de TodoProvider')
  }
  return state
}

export function useTodoDispatch(): Dispatch<TaskAction> {
  const dispatch = useContext(TodoDispatchContext)
  if (dispatch === null) {
    throw new Error('useTodoDispatch debe usarse dentro de TodoProvider')
  }
  return dispatch
}
