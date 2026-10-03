import './App.css'

function App() {
  return (
    <main className="app">
      <header className="app-header">
        <h1>Modern Todo App</h1>
      </header>
      <section className="task-list" aria-label="Lista de tareas">
        <p className="empty-state">No hay tareas todavía.</p>
      </section>
    </main>
  )
}

export default App
