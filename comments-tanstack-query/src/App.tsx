import './App.css'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getComments, type CommentWithId, postComment } from './service/comments'
import { FormInput, FormTextArea } from './components/Form'
import { Results } from './components/Results'

function App () {
  const { data, isLoading, error } = useQuery({
    queryKey: ['comments'],
    queryFn: getComments
  })

  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: postComment,
    onMutate: async (newComment) => {
      await queryClient.cancelQueries({ queryKey: ['comments'] })

      // esto lo hacemos para guardar el estado previo
      // por si tenemos que hacer un rollback
      const previousComments = queryClient.getQueryData<CommentWithId[]>(['comments'])

      queryClient.setQueryData<CommentWithId[]>(['comments'], (oldData) => {
        const newCommentToAdd = structuredClone(newComment)
        newCommentToAdd.preview = true

        if (oldData == null) return [newCommentToAdd as CommentWithId]
        return [...oldData, newCommentToAdd as CommentWithId]
      })

      return { previousComments }
    },
    onError: (error, variables, context) => {
      console.error(error)
      if (context?.previousComments != null) {
        queryClient.setQueryData(['comments'], context.previousComments)
      }
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['comments']
      })
    }
  })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (isPending) return

    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const message = data.get('message')?.toString() ?? ''
    const title = data.get('title')?.toString() ?? ''

    if (title !== '' && message !== '') {
      mutate({ title, message })
    }
  }

  return (
    <main className='grid h-screen grid-cols-2'>
      <div className='col-span-1 p-8 bg-white'>

        {isLoading && <strong>Cargando...</strong>}
        {error != null && <strong>Algo ha ido mal</strong>}
        <Results data={data} />

      </div>
      <div className='col-span-1 p-8 bg-black'>
        <form className={`${isPending ? 'opacity-40' : ''} block max-w-xl px-4 m-auto`} onSubmit={handleSubmit}>

          <FormInput />
          <FormTextArea />

          <button
            disabled={isPending}
            type='submit' className='mt-4 px-12 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm py-2.5 text-center mr-2 mb-2'
          >
            {isPending ? 'Enviando comentario...' : 'Enviar comentario'}
          </button>
        </form>
      </div>
    </main>
  )
}

export default App