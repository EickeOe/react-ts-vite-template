import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

const Home = lazy(() => import('@/pages/Home/Home'))

export default function AppRouter() {
  return (
    <Router>
      <Suspense fallback={''}>
        <Routes>
          <Route path="/" element={<Home/>} />
        </Routes>
      </Suspense>
    </Router>
  )
}
