import { activeCount, setAllCompleted } from '../domain/tasks'
import { useTodoDispatch, useTodoState } from '../state/todo-context'
import { TaskInput } from './TaskInput'
import { TaskList } from './TaskList'
import './App.css'

function App() {
  const state = useTodoState()
  const dispatch = useTodoDispatch()
  const hasTasks = state.tasks.length > 0
  const allCompleted = hasTasks && activeCount(state) === 0

  return (
    <main className="app">
      <header className="app-header">
        <h1>Modern Todo App</h1>
      </header>
      <TaskInput />
      {hasTasks ? (
        <>
          <label className="list-head">
            <input
              className="toggle-all"
              type="checkbox"
              aria-label="Marcar todas"
              checked={allCompleted}
              onChange={(event) =>
                dispatch(setAllCompleted(event.target.checked))
              }
            />
            <span className="toggle-all-label">Todas</span>
          </label>
          <TaskList tasks={state.tasks} />
        </>
      ) : (
        <p className="empty-state">No hay tareas todavía.</p>
      )}
    </main>
  )
}

export default App
