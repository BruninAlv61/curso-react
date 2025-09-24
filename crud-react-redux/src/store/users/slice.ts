import { createSlice } from '@reduxjs/toolkit'

export interface User {
  name: string
  email: string
  github: string
}

export interface UserWithId extends User {
  id: string
}

const initialState: UserWithId[] = [
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

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {}
})

export default usersSlice.reducer
