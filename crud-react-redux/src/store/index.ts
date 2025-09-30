import { configureStore, type Middleware } from '@reduxjs/toolkit'
import usersReducer from './users/slice'
import { toast } from 'sonner'
import { rollbackUser } from './users/slice'
import { type UserWithId } from './users/slice'

const persistanceLocalStorageMiddleware: Middleware =
  (store) => (next) => (action) => {
    next(action)
    localStorage.setItem('__redux__state__', JSON.stringify(store.getState()))
  }

const syncWithDatabase: Middleware = (store) => (next) => (action) => {
  const { type, payload } = action
  const previousState = store.getState()
  console.log(type, payload)
  console.log(store.getState())
  next(action)

  if (type === 'users/deleteUserById') {
    const userIdToRemove = payload
    const userToRemove = previousState.users.find(
      (user: UserWithId) => user.id === userIdToRemove
    )

    fetch(`https://jsonplaceholder.typicode.com/users/${userIdToRemove}`, {
      method: 'DELETE'
    })
      .then((res) => {
        if (res.ok) return toast.success('Se ha eliminado el usuario')

        throw new Error('Error eliminando usuario')
      })
      .catch((err) => {
        toast.error(`Error deleting user ${userIdToRemove}`)
        if (userToRemove) store.dispatch(rollbackUser(userToRemove))
        console.log(err)
      })
  } else if (type === 'users/addNewUser') {
    fetch(`https://jsonplaceholder.typicode.com/users/`, {
      method: 'POST',
      body: JSON.stringify(payload)
    })
      .then((res) => {
        if (res.ok) return toast.success('Se ha agregado el usuario')
        throw new Error('Error agregando usuario')
      })
      .catch((err) => {
        toast.error(`Error adding user ${payload.name}`)
        store.dispatch(rollbackUser(payload)) // este rollback no va a funcionar
        console.log(err)
      })
  }
}

export const store = configureStore({
  reducer: {
    users: usersReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      persistanceLocalStorageMiddleware,
      syncWithDatabase
    )
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
