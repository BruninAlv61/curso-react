import { deleteUserById, type UserId } from '../store/users/slice.ts'
import { useAppDispatch } from './store.ts'

export const useUserActions = () => {
  const dispatch = useAppDispatch()

  const removeUser = (id: UserId) => {
    dispatch(deleteUserById(id))
  }

  return { removeUser }
}
