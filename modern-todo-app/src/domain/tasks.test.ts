import { describe, expect, it } from 'vitest'
import {
  addTask,
  activeCount,
  clearCompleted,
  hydrateTasks,
  initialState,
  removeTask,
  renameTask,
  selectByFilter,
  setAllCompleted,
  todoReducer,
  toggleTask,
} from './tasks'
import type { Task, TodoState } from './tasks'

const task = (id: string, title: string, completed = false): Task => ({
  id,
  title,
  completed,
})

const stateWith = (...tasks: Task[]): TodoState => ({ tasks })

describe('add', () => {
  it('creates a single pending task in an empty list', () => {
    const state = todoReducer(initialState, addTask('Buy milk'))
    expect(state.tasks).toEqual([
      { id: expect.any(String), title: 'Buy milk', completed: false },
    ])
  })

  it('preserves insertion order and assigns distinct ids', () => {
    let state = initialState
    state = todoReducer(state, addTask('First'))
    state = todoReducer(state, addTask('Second'))
    state = todoReducer(state, addTask('Third'))

    expect(state.tasks.map((t) => t.title)).toEqual([
      'First',
      'Second',
      'Third',
    ])
    const ids = state.tasks.map((t) => t.id)
    expect(new Set(ids).size).toBe(3)
  })

  it('stores the trimmed title', () => {
    const state = todoReducer(initialState, addTask('  Trimmed  '))
    expect(state.tasks[0].title).toBe('Trimmed')
  })

  it.each(['', '   '])('creates nothing for an empty title (%j)', (title) => {
    const state = todoReducer(initialState, addTask(title))
    expect(state.tasks).toEqual([])
  })
})

describe('toggle', () => {
  it('completes a task and reactivates it', () => {
    let state = stateWith(task('a', 'One'))
    state = todoReducer(state, toggleTask('a'))
    expect(state.tasks[0].completed).toBe(true)
    state = todoReducer(state, toggleTask('a'))
    expect(state.tasks[0].completed).toBe(false)
  })
})

describe('rename', () => {
  it('stores the trimmed new title', () => {
    const state = stateWith(task('a', 'Old'))
    expect(todoReducer(state, renameTask('a', '  New  ')).tasks[0].title).toBe(
      'New',
    )
  })

  it('destroys the task when the new title is empty', () => {
    const state = stateWith(task('a', 'One'), task('b', 'Two'))
    expect(todoReducer(state, renameTask('a', '  ')).tasks).toEqual([
      task('b', 'Two'),
    ])
  })
})

describe('remove', () => {
  it('removes the task from the list', () => {
    const state = stateWith(task('a', 'One'), task('b', 'Two'))
    expect(todoReducer(state, removeTask('a')).tasks).toEqual([
      task('b', 'Two'),
    ])
  })
})

describe('missing id', () => {
  it.each([
    toggleTask('missing'),
    renameTask('missing', 'Renamed'),
    removeTask('missing'),
  ])('leaves the list unchanged for %j', (action) => {
    const state = stateWith(task('a', 'One'))
    expect(todoReducer(state, action)).toBe(state)
  })
})

describe('setAllCompleted', () => {
  it('completes every task in a mixed list', () => {
    const state = stateWith(task('a', 'One'), task('b', 'Two', true))
    expect(todoReducer(state, setAllCompleted(true)).tasks).toEqual([
      task('a', 'One', true),
      task('b', 'Two', true),
    ])
  })

  it('reactivates every task', () => {
    const state = stateWith(task('a', 'One', true), task('b', 'Two', true))
    expect(todoReducer(state, setAllCompleted(false)).tasks).toEqual([
      task('a', 'One'),
      task('b', 'Two'),
    ])
  })

  it.each([initialState, stateWith(task('a', 'One', true))])(
    'is a no-op when the list already matches (%j)',
    (state) => {
      expect(todoReducer(state, setAllCompleted(true))).toBe(state)
    },
  )
})

describe('clearCompleted', () => {
  it('removes only the completed tasks keeping the pending ones', () => {
    const state = stateWith(
      task('a', 'Pending'),
      task('b', 'Done', true),
      task('c', 'Also pending'),
      task('d', 'Also done', true),
    )
    expect(todoReducer(state, clearCompleted()).tasks).toEqual([
      task('a', 'Pending'),
      task('c', 'Also pending'),
    ])
  })

  it('leaves the list unchanged when nothing is completed', () => {
    const state = stateWith(task('a', 'Pending'))
    expect(todoReducer(state, clearCompleted())).toBe(state)
  })
})

describe('activeCount', () => {
  it.each([
    { state: stateWith(), expected: 0 },
    { state: stateWith(task('a', 'One')), expected: 1 },
    {
      state: stateWith(task('a', 'One'), task('b', 'Done', true)),
      expected: 1,
    },
    {
      state: stateWith(task('a', 'A'), task('b', 'B'), task('c', 'C')),
      expected: 3,
    },
  ])('counts $expected pending tasks', ({ state, expected }) => {
    expect(activeCount(state)).toBe(expected)
  })
})

describe('selectByFilter', () => {
  const state = stateWith(task('a', 'Pending'), task('b', 'Done', true))

  it('all returns every task', () => {
    expect(selectByFilter(state, 'all')).toEqual(state.tasks)
  })

  it('active returns only pending tasks', () => {
    expect(selectByFilter(state, 'active')).toEqual([task('a', 'Pending')])
  })

  it('completed returns only completed tasks', () => {
    expect(selectByFilter(state, 'completed')).toEqual([
      task('b', 'Done', true),
    ])
  })
})

describe('reducer purity', () => {
  it('never mutates the input state', () => {
    const before = stateWith(task('a', 'One'), task('b', 'Two'))
    const snapshot = structuredClone(before)

    todoReducer(before, addTask('New'))
    todoReducer(before, toggleTask('a'))
    todoReducer(before, renameTask('a', 'Renamed'))
    todoReducer(before, removeTask('a'))
    todoReducer(before, setAllCompleted(true))
    todoReducer(before, clearCompleted())

    expect(before).toEqual(snapshot)
  })
})

describe('hydrateTasks', () => {
  it.each([null, undefined, 'text', { tasks: [] }, 42])(
    'returns an empty list for non-array input %j',
    (data) => {
      expect(hydrateTasks(data)).toEqual([])
    },
  )

  it('returns valid tasks with the spec keys', () => {
    const tasks = hydrateTasks([
      { id: 'a', title: 'One', completed: false },
      { id: 'b', title: 'Done', completed: true },
    ])
    expect(tasks).toEqual([task('a', 'One'), task('b', 'Done', true)])
  })

  it('drops malformed entries without contaminating the valid ones', () => {
    const tasks = hydrateTasks([
      { id: 'a', title: 'Valid', completed: false },
      { title: 'no id', completed: false },
      { id: 'b', completed: true },
      { id: 'c', title: 'bad flag', completed: 'yes' },
      { id: '', title: 'empty id', completed: false },
      { id: 'd', title: '   ', completed: false },
      'not an object',
      null,
    ])
    expect(tasks).toEqual([task('a', 'Valid')])
  })

  it('drops duplicate ids keeping the first occurrence', () => {
    const tasks = hydrateTasks([
      { id: 'a', title: 'First', completed: false },
      { id: 'a', title: 'Duplicate', completed: true },
    ])
    expect(tasks).toEqual([task('a', 'First')])
  })

  it('normalizes entries to the spec keys, without extra keys', () => {
    const tasks = hydrateTasks([
      { id: 'a', title: '  With extra  ', completed: false, editing: true },
    ])
    expect(tasks).toEqual([{ id: 'a', title: 'With extra', completed: false }])
    expect(Object.keys(tasks[0]).sort()).toEqual(['completed', 'id', 'title'])
  })
})
