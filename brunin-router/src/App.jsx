// App.jsx
import './App.css'
import HomePage from './pages/Home.jsx'
import { Router } from './Router.jsx'
import Page404 from './pages/404.jsx'
import SearchPage from './pages/Search.jsx'
import { Component, Suspense } from 'react'
import { Route } from './Route.jsx'

import { lazy } from 'react'
const LazyAboutPage = lazy(() => import('./pages/About.jsx'))
const LazyHomePage = lazy(() => import('./pages/Home.jsx'))

const routes = [
  {
    path: '/:lang/about',
    Component: LazyAboutPage
  },
  {
    path: '/search/:query',
    Component: SearchPage
  }
]

function App() {
  return (
    <main>
      <Suspense fallback={null}>
        <Router routes={routes} defaultComponent={Page404}>
          <Route path="/" Component={LazyHomePage} />
          <Route path="/about" Component={LazyAboutPage} />
        </Router>
      </Suspense>
    </main>
  )
}

export default App
