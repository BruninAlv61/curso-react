import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { Router } from './Router.jsx'
import { Route } from './Route.jsx'
import { getCurrentPath } from './utils.js'
import { Link } from './Link.jsx'

vi.mock('./utils.js', () => ({
  getCurrentPath: vi.fn() // declaramos que getCurrentPath es una función de vitest
}))

describe('Router', () => {
  beforeEach(() => {
    cleanup()
    vi.clearAllMocks() // Limpiamos los mocks antes de cada prueba
  })
  it('should render without problems', () => {
    render(<Router routes={[]} />)
    expect(true).toBeTruthy()
  })

  it('should render 404 if no routes match', () => {
    render(<Router routes={[]} defaultComponent={() => <h1>404</h1>} />)
    expect(screen.getByText('404')).toBeTruthy()
  })

  it('should render the component of the first route that matches', () => {
    getCurrentPath.mockReturnValue('/about')
    const routes = [
      {
        path: '/',
        Component: () => <h1>Home</h1>
      },
      {
        path: '/about',
        Component: () => <h1>About</h1>
      }
    ]

    render(<Router routes={routes} />)
    expect(screen.getByText('About')).toBeTruthy()
  })

  it('should navigate using Links', async () => {
    getCurrentPath.mockReturnValueOnce('/')

    render(
      <Router>
        <Route
          path="/"
          Component={() => {
            return (
              <>
                <h1>Home</h1>
                <Link to="/about">Go to About</Link>
              </>
            )
          }}
        />
        <Route
          path="/about"
          Component={() => {
            return <h1>About</h1>
          }}
        />
      </Router>
    )

    // Click on the Link
    const button = screen.getByText(/Go to About/)
    fireEvent.click(button)

    const aboutTitle = await screen.findByText('About')

    console.log(screen.debug())

    // Check if the new route is rendered
    expect(aboutTitle).toBeTruthy()
  })
})
