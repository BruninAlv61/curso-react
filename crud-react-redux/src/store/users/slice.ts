import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

const DEFAULT_STATE = [
  {
    id: '1',
    name: 'Pepe Juarez',
    email: 'elpepe@gmail.com',
    github: 'elpepe'
  },
  {
    id: '2',
    name: 'Juan Perez',
    email: 'juanperez@gmail.com',
    github: 'juanperez'
  },
  {
    id: '3',
    name: 'Miguel Angel',
    email: 'midu@gmail.com',
    github: 'midudev'
  }
]

export interface User {
  name: string
  email: string
  github: string
}

export type UserId = string

export interface UserWithId extends User {
  id: UserId
}

const initialState: UserWithId[] = (()=> {
  const persistedState = localStorage.getItem('__redux__state__')

  if (persistedState) {
    return JSON.parse(persistedState).users
  }
  return DEFAULT_STATE
})()

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addNewUser: (state, action: PayloadAction<UserWithId>) => {
      const id = crypto.randomUUID()
      state.push({id, ...action.payload})
    },

    deleteUserById: (state, action: PayloadAction<UserId>) => {
      const id = action.payload
      return state.filter((user) => user.id !== id)
    },
    rollbackUser: (state, action: PayloadAction<UserWithId>) => {
      const isUserAlreadyDefined = state.some(user => user.id === action.payload.id)
      if (!isUserAlreadyDefined) {
        state.push(action.payload)
      }
    }
  }
})

export default usersSlice.reducer

export const { addNewUser, deleteUserById, rollbackUser } = usersSlice.actions
