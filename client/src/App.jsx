import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import './App.css'

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || ''
const tasksEndpoint = `${apiBaseUrl}/api/tasks`

function App() {
  const [tasks, setTasks] = useState([])
  const [formData, setFormData] = useState({ title: '', description: '' })
  const [editingTaskId, setEditingTaskId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const sortedTasks = useMemo(
    () =>
      [...tasks].sort((a, b) => {
        if (a.completed === b.completed) {
          return new Date(b.createdAt) - new Date(a.createdAt)
        }

        return a.completed ? 1 : -1
      }),
    [tasks],
  )

  const resetForm = () => {
    setFormData({ title: '', description: '' })
    setEditingTaskId(null)
  }

  const fetchTasks = async () => {
    try {
      setLoading(true)
      const response = await axios.get(tasksEndpoint)
      setTasks(response.data)
      setError('')
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Failed to load tasks')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!formData.title.trim()) {
      setError('Title is required')
      return
    }

    try {
      setSubmitting(true)
      setError('')

      if (editingTaskId) {
        const response = await axios.put(`${tasksEndpoint}/${editingTaskId}`, {
          title: formData.title.trim(),
          description: formData.description.trim(),
        })

        setTasks((previousTasks) =>
          previousTasks.map((task) =>
            task._id === editingTaskId ? response.data : task,
          ),
        )
      } else {
        const response = await axios.post(tasksEndpoint, {
          title: formData.title.trim(),
          description: formData.description.trim(),
        })

        setTasks((previousTasks) => [response.data, ...previousTasks])
      }

      resetForm()
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Failed to save task')
    } finally {
      setSubmitting(false)
    }
  }

  const handleEdit = (task) => {
    setEditingTaskId(task._id)
    setFormData({
      title: task.title,
      description: task.description || '',
    })
  }

  const toggleCompleted = async (task) => {
    try {
      const response = await axios.put(`${tasksEndpoint}/${task._id}`, {
        completed: !task.completed,
      })

      setTasks((previousTasks) =>
        previousTasks.map((item) => (item._id === task._id ? response.data : item)),
      )
    } catch (requestError) {
      setError(
        requestError.response?.data?.message || 'Failed to update task status',
      )
    }
  }

  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`${tasksEndpoint}/${taskId}`)
      setTasks((previousTasks) => previousTasks.filter((task) => task._id !== taskId))

      if (editingTaskId === taskId) {
        resetForm()
      }
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Failed to delete task')
    }
  }

  return (
    <main className="app-shell">
      <section className="panel form-panel">
        <p className="eyebrow">Full-Stack CRUD</p>
        <h1>Task Manager</h1>
        <p className="subtitle">
          Create, edit, complete, and remove tasks synced with your Express and
          MongoDB backend.
        </p>

        <form onSubmit={handleSubmit} className="task-form">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            placeholder="Ship CRUD app"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            placeholder="Add optional details"
            rows={4}
            value={formData.description}
            onChange={handleChange}
          />

          <div className="form-actions">
            <button type="submit" disabled={submitting}>
              {submitting
                ? 'Saving...'
                : editingTaskId
                  ? 'Update Task'
                  : 'Add Task'}
            </button>

            {editingTaskId && (
              <button
                type="button"
                className="ghost"
                onClick={resetForm}
                disabled={submitting}
              >
                Cancel Edit
              </button>
            )}
          </div>
        </form>

        {error && <p className="error-message">{error}</p>}
      </section>

      <section className="panel list-panel">
        <div className="list-header">
          <h2>Tasks</h2>
          <button type="button" className="ghost" onClick={fetchTasks}>
            Refresh
          </button>
        </div>

        {loading ? (
          <p className="status-message">Loading tasks...</p>
        ) : sortedTasks.length === 0 ? (
          <p className="status-message">No tasks yet. Create your first one.</p>
        ) : (
          <ul className="task-list">
            {sortedTasks.map((task) => (
              <li key={task._id} className={task.completed ? 'task completed' : 'task'}>
                <div>
                  <h3>{task.title}</h3>
                  {task.description && <p>{task.description}</p>}
                </div>

                <div className="task-actions">
                  <button type="button" onClick={() => toggleCompleted(task)}>
                    {task.completed ? 'Mark Active' : 'Mark Done'}
                  </button>
                  <button type="button" onClick={() => handleEdit(task)}>
                    Edit
                  </button>
                  <button
                    type="button"
                    className="danger"
                    onClick={() => handleDelete(task._id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}

export default App
