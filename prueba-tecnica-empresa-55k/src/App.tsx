import { useState, useMemo } from 'react'
import './App.css'
import { SortBy, type User } from './types.d'
import { UsersList } from './components/UsersList'
import { useInfiniteQuery } from '@tanstack/react-query'

const fetchUsers = async (page: number) => {
  return await fetch(`https://randomuser.me/api/?results=10&seed=brunodev&page=${page}`)
    .then(res => {
      if(!res.ok) throw new Error('Error en la petición')
        return res.json()
    })
    .then(res => {
      const nextCursor = Number(res.info.page)
      return {
        users: res.results,
        nextCursor
      }
    })
}

function App() {
const { isLoading, isError, data, refetch, fetchNextPage, hasNextPage } = useInfiniteQuery({
  queryKey: ['users'],
  queryFn: ({ pageParam = 1 }) => fetchUsers(pageParam),
  getNextPageParam: (lastPage) => lastPage.nextCursor + 1,
  initialPageParam: 1
})

  console.log(data)

  const [showColors, setShowColors] = useState(false)
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)
  const [filterCountry, setFilterCountry] = useState<string | null>(null)

  const [currentPage, setCurrentPage] = useState(1)

  //const originalUsers = useRef<User[]>([])

  const handleReset = () => {
    refetch()
  }

  const toggleColors = () => {
    setShowColors(!showColors)
  }

  const toggleSortByCountry = () => {
    const newSortingValue =
      sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE
    setSorting(newSortingValue)
  }

  const handleDelete = (email: string) => {
    const filteredUsers = users.filter((user) => user.email !== email)
    //setUsers(filteredUsers)
  }

  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort)
  }

  const filteredUsers = useMemo(() => {
    console.log('Se están filtrando los usuarios con useMemo')
    return filterCountry
      ? users.filter((user) => {
          return user.location.country
            .toLocaleLowerCase()
            .includes(filterCountry.toLowerCase())
        })
      : users
  }, [users, filterCountry])

  const sortedUsers = useMemo(() => {
    console.log('Se están ordenando los usuarios con useMemo')

    if (sorting === SortBy.NONE) return filteredUsers

    const compareProperties: Record<string, (user: User) => any> = {
      [SortBy.COUNTRY]: (user) => user.location.country,
      [SortBy.NAME]: (user) => user.name.first,
      [SortBy.LAST]: (user) => user.name.last
    }

    return filteredUsers.toSorted((a, b) => {
      const extractPropierty = compareProperties[sorting]
      return extractPropierty(a).localeCompare(extractPropierty(b))
    })
  }, [filteredUsers, sorting]) // <-- estas dependencias son los valores que
  // queremos que al cambiar vuelva a ejecutar el useMemo

  return (
    <div className="App">
      <h1>Prueba técnica</h1>
      <header>
        <button onClick={toggleColors}>Colorear filas</button>
        <button onClick={toggleSortByCountry}>
          {sorting === SortBy.COUNTRY
            ? 'No ordenar por país'
            : 'Ordernar por país'}
        </button>
        <button onClick={handleReset}>Resetear estado</button>
        <input
          type="text"
          placeholder="Filtra por país"
          onChange={(e) => {
            setFilterCountry(e.target.value)
          }}
        />
      </header>
      <main>
        {users.length > 0 && (
          <UsersList
            changeSorting={handleChangeSort}
            deleteUser={handleDelete}
            showColors={showColors}
            users={sortedUsers}
          />
        )}
        {isLoading && <p>Cargando...</p>}
        {isError && <p>Ha habido un error</p>}
        {!isLoading && !isError && users.length === 0 && <p>No hay usuarios</p>}

        {!isLoading && !isError && users.length > 0 && (
          <button onClick={() => setCurrentPage(currentPage + 1)}>
            Cargar más resultados
          </button>
        )}
      </main>
    </div>
  )
}

export default App
