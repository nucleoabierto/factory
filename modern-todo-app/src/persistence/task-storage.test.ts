import { beforeEach, describe, expect, it } from 'vitest'
import { hydrateTasks } from '../domain/tasks'
import {
  createLocalStorageTaskStorage,
  TASKS_STORAGE_KEY,
} from './task-storage'

const tasks = [
  { id: 'a', title: 'Pending', completed: false },
  { id: 'b', title: 'Done', completed: true },
]

describe('task-storage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('saves a JSON array with the spec keys under todos-react', () => {
    const storage = createLocalStorageTaskStorage()
    storage.save(tasks)

    const raw = localStorage.getItem(TASKS_STORAGE_KEY) ?? ''
    expect(JSON.parse(raw)).toEqual(tasks)
  })

  it('loads an empty list when nothing is stored', () => {
    const storage = createLocalStorageTaskStorage()
    expect(hydrateTasks(storage.load())).toEqual([])
  })

  it('round-trips the saved list', () => {
    const storage = createLocalStorageTaskStorage()
    storage.save(tasks)
    expect(hydrateTasks(storage.load())).toEqual(tasks)
  })

  it('loads an empty list on corrupted JSON without throwing', () => {
    localStorage.setItem(TASKS_STORAGE_KEY, '{corrupted')
    const storage = createLocalStorageTaskStorage()
    expect(hydrateTasks(storage.load())).toEqual([])
  })

  it('tolerates a storage that throws on every access', () => {
    const denied = {
      getItem() {
        throw new Error('denied')
      },
      setItem() {
        throw new Error('denied')
      },
    }
    const storage = createLocalStorageTaskStorage(denied)

    expect(() => storage.save(tasks)).not.toThrow()
    expect(hydrateTasks(storage.load())).toEqual([])
  })
})
