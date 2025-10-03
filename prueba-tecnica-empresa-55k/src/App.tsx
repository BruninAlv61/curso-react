import { useEffect, useState, useRef, useMemo } from 'react'
import './App.css'
import type { User } from './types.d'
import { UsersList } from './components/UsersList'

function App() {
  const [users, setUsers] = useState<User[]>([])
  const originalUsers = useRef<User[]>([]) // así si
  const [showColors, setShowColors] = useState(false)
  const [sortByCountry, setSortByCountry] = useState(false)
  const [filterCountry, setFilterCountry] = useState<string | null>(null)

  const handleReset = () => {
    setUsers(originalUsers.current)
  }

  const toggleColors = () => {
    setShowColors(!showColors)
  }

  const toggleSortByCountry = () => {
    setSortByCountry((prevState) => !prevState)
  }

  const handleDelete = (email: string) => {
    const filteredUsers = users.filter((user) => user.email !== email)
    setUsers(filteredUsers)
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
    return sortByCountry
      ? filteredUsers.toSorted(
        (a, b) =>  a.location.country.localeCompare(b.location.country)
      )
      : filteredUsers
    }, [filteredUsers, sortByCountry]) // <-- estas dependencias son los valores que
                                       // queremos que al cambiar vuelva a ejecutar el useMemo

  return (
    <div className="App">
      <h1>Prueba técnica</h1>
      <header>
        <button onClick={toggleColors}>Colorear filas</button>
        <button onClick={toggleSortByCountry}>
          {sortByCountry ? 'No ordenar por país' : 'Ordernar por país'}
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
          deleteUser={handleDelete}
          showColors={showColors}
          users={sortedUsers}
        />
      </main>
    </div>
  )
}

export default App
