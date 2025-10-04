import { useEffect, useState, useRef, useMemo } from 'react'
import './App.css'
import { SortBy, type User } from './types.d'
import { UsersList } from './components/UsersList'

function App() {
  const [users, setUsers] = useState<User[]>([])
  const originalUsers = useRef<User[]>([]) // así si
  const [showColors, setShowColors] = useState(false)
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)
  const [filterCountry, setFilterCountry] = useState<string | null>(null)

  const handleReset = () => {
    setUsers(originalUsers.current)
  }

  const toggleColors = () => {
    setShowColors(!showColors)
  }

  const toggleSortByCountry = () => {
    const newSortingValue = sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE
    setSorting(newSortingValue)
  }

  const handleDelete = (email: string) => {
    const filteredUsers = users.filter((user) => user.email !== email)
    setUsers(filteredUsers)
  }

  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort)
  }

  useEffect(() => {
    fetch('https://randomuser.me/api/?results=100')
      .then((res) => res.json())
      .then((res) => {
        setUsers(res.results)
        originalUsers.current = res.results //se modifica el current
      })
      .catch((err) => console.error(err))
  }, [])

  const filteredUsers = useMemo(() => {
    console.log('Se están filtrando los usuarios con useMemo')
    return filterCountry
    ? users.filter((user) => {
        return user.location.country
          .toLocaleLowerCase()
          .includes(filterCountry.toLowerCase())
      })
    : users}, [users, filterCountry])

    const sortedUsers = useMemo(()=> {
    console.log('Se están ordenando los usuarios con useMemo')
    
    if (sorting === SortBy.NONE) return filteredUsers
    
    const compareProperties: Record<string, (user: User) => any> = {
      [SortBy.COUNTRY]: user => user.location.country,
      [SortBy.NAME] : user => user.name.first,
      [SortBy.LAST] : user => user.name.last
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
          {sorting === SortBy.COUNTRY ? 'No ordenar por país' : 'Ordernar por país'}
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
        <UsersList
          changeSorting={handleChangeSort}
          deleteUser={handleDelete}
          showColors={showColors}
          users={sortedUsers}
        />
      </main>
    </div>
  )
}

export default App
