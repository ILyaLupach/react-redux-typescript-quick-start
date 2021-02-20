import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import useTypedSelector from '../hooks/useTypedSelector'
import { fetchTodos, setTodoPage } from '../store/actions/todo.actions'

const pages = [1, 2, 3, 4, 5]

const TodoList = () => {
  const { page, error, loading, todos, limit } = useTypedSelector(state => state.todo)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTodos(page, limit))
  }, [dispatch, limit, page])

  const togglePage = (p: number) => {
    dispatch(setTodoPage(p))
  }

  if (loading) return <h1>Идет загрузка...</h1>
  if (error) return <h1>{error}</h1>

  return (
    <div>
      <ul>
        {todos.map(({ title, id, completed }) => (
          <li style={{ textDecoration: completed ? 'line-through' : 'none' }} key={id}>
            {id} - {title}
          </li>
        ))}
      </ul>
      <div>
        <div style={{ display: 'flex' }}>
          {pages.map(p => (
            <div
              style={{
                border: p === page ? '3px solid green' : '1px solid gray',
                padding: 10,
                cursor: 'pointer',
              }}
              onClick={() => togglePage(p)}
            >
              {p}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TodoList
