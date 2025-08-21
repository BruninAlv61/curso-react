import { Link } from '../Link'

export default function Page404() {
  return (
    <>
      <section>
        <h1>This is not fine - 404</h1>
        <img
          src="https://imgs.search.brave.com/Cf5n58sOLQokuF6a3GHrErMZ6rTcHG12PD_XBvHfdJ8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5wcmludGxlci5j/b20vbWVkaWEvcGhv/dG8vMTAxMDYzLmpw/Zz9ybW9kZT1jcm9w/JndpZHRoPTYzOCZo/ZWlnaHQ9OTAw"
          alt="perrito en casa que se prende fuego, diavlo loco"
        />
      </section>
      <Link to="/">Go to home</Link>
    </>
  )
}
