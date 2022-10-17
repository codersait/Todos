import { useState } from 'react'

function App() {
  const [todo, setTodo] = useState({})
  const [completedTodos, setCompletedTodos] = useState([])
  const [todos, setTodos] = useState([])

  const changeHandler = (e) => {
    setTodo({
      value: e.target.value,
      completed: false,
      id: new Date().getTime().toString(),
    })
  }

  const submitHandler = (e) => {
    e.preventDefault()
    setTodos([...todos, todo])
    setTodo({ ...todo, value: '' })
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const checkedHandler = (e, id) => {
    if (e.target.checked) {
      const completed = todos.find((todo) => {
        return todo.id === id
      })
      setCompletedTodos([...completedTodos, { ...completed, completed: true }])
      setTimeout(() => {
        deleteTodo(id)
      }, 5000)
    }
  }

  return (
    <div className='App'>
      <h1>Todolarim</h1>
      <form onSubmit={submitHandler}>
        <input type='text' onChange={changeHandler} value={todo.value} />
        <button type='submit'>ekle</button>
      </form>
      <ul>
        {todos.map((todo, index) => (
          <div key={index}>
            <input
              type='checkbox'
              onChange={(e) => checkedHandler(e, todo.id)}
            />
            <li
              onClick={() => {
                deleteTodo(todo.id)
              }}
            >
              {JSON.stringify(todo)}
            </li>
          </div>
        ))}
      </ul>
      <h2>Completed</h2>
      {completedTodos.map((todo, index) => (
        <div key={index}>{JSON.stringify(todo)}</div>
      ))}
    </div>
  )
}

export default App
