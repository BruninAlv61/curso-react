import { Link } from '../Link.jsx'

const i18n = {
  es: {
    title: 'Sobre mí',
    description: 'Me llamo Brunin, esta es mi maldita página bro.',
    button: 'Ir a Inicio'
  },
  en: {
    title: 'About',
    description: 'My name is Brunin, this is my fucking page bro',
    button: 'Go Home'
  }
}

const useI18n = (lang) => {
  return i18n[lang] || i18n.en
}

export default function AboutPage({ routeParams }) {
  const i18n = useI18n(routeParams.lang ?? 'es')

  return (
    <>
      <h1>{i18n.title}</h1>
      <img
        src="https://avatars.githubusercontent.com/u/121315407?v=4"
        alt="Foto de Brunin"
      />
      <p>{i18n.description}</p>
      <Link to="/">{i18n.button}</Link>
    </>
  )
}
