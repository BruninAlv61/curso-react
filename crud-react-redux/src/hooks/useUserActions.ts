import { addNewUser, deleteUserById, type UserId } from '../store/users/slice.ts'
import { useAppDispatch } from './store.ts'

export const useUserActions = () => {
  const dispatch = useAppDispatch()
  
  const addUser = ({ name, email, github}) => {
    dispatch(addNewUser({ name, email, github }))
  }

  const removeUser = (id: UserId) => {
    dispatch(deleteUserById(id))
  }

  return { addUser, removeUser }
}
