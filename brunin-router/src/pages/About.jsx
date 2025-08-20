import { Link } from '../Link.jsx'

export default function AboutPage() {
  return (
    <>
      <h1>About</h1>
      <img
        src="https://avatars.githubusercontent.com/u/121315407?v=4"
        alt="Foto de Brunin"
      />
      <p>Me llamo Brunin, esta es mi maldita página bro.</p>
      <Link to="/">Ir a Inicio</Link>
    </>
  )
}
