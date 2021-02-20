import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import useTypedSelector from '../hooks/useTypedSelector'
import { fetchUsers } from '../store/actions/user.actions'

const UserList = () => {
  const {loading, users, error} = useTypedSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  if (loading) return <h1>Идет загрузка...</h1>
  if (error) return <h1>{ error}</h1>

  return (
    <ul>
      {users.map(({ name, id }) => (
        <li key={id}>{name}</li>
      ))}
    </ul>
  )
}

export default UserList
