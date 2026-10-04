import type { Task } from '../domain/tasks'

export const TASKS_STORAGE_KEY = 'todos-react'

export interface TaskStorage {
  load(): unknown
  save(tasks: readonly Task[]): void
}

type KeyValueStore = Pick<Storage, 'getItem' | 'setItem'>

export function createLocalStorageTaskStorage(
  storage: KeyValueStore = localStorage,
): TaskStorage {
  return {
    load() {
      try {
        const raw = storage.getItem(TASKS_STORAGE_KEY)
        return raw === null ? null : JSON.parse(raw)
      } catch {
        return null
      }
    },
    save(tasks) {
      try {
        storage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks))
      } catch {
        // Storage unavailable: the app keeps working in memory.
      }
    },
  }
}
