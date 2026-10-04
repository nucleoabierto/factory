import { useEffect, useMemo, useReducer } from 'react'
import type { ReactNode } from 'react'
import { hydrateTasks, todoReducer } from '../domain/tasks'
import { createLocalStorageTaskStorage } from '../persistence/task-storage'
import type { TaskStorage } from '../persistence/task-storage'
import { TodoDispatchContext, TodoStateContext } from './todo-context'

interface TodoProviderProps {
  children: ReactNode
  storage?: TaskStorage
}

export function TodoProvider({
  children,
  storage: storageProp,
}: TodoProviderProps) {
  const storage = useMemo(
    () => storageProp ?? createLocalStorageTaskStorage(),
    [storageProp],
  )
  const [state, dispatch] = useReducer(todoReducer, storage, (store) => ({
    tasks: hydrateTasks(store.load()),
  }))

  useEffect(() => {
    storage.save(state.tasks)
  }, [storage, state.tasks])

  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        {children}
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  )
}
