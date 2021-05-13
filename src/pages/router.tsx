import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

const Home = lazy(() => import('@/pages/Home/Home'))

export default function AppRouter() {
  return (
    <Router>
      <Suspense fallback={''}>
        <Switch>
          <Route path="/" exact component={Home} />
        </Switch>
      </Suspense>
    </Router>
  )
}
