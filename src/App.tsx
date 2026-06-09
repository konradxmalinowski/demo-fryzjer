import { Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { DemoModal } from './components/demo/DemoModal'
import { Footer } from './components/layout/Footer'
import { Navbar } from './components/layout/Navbar'
import { LoadingScreen } from './components/layout/LoadingScreen'
import { routes } from './routes/routes'

function App() {
  return (
    <BrowserRouter basename="/demo-fryzjer">
      <LoadingScreen />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-2 border-[var(--color-gold)] border-t-transparent rounded-full animate-spin" /></div>}>
            <Routes>
              {routes.map(({ path, component: Component }) => (
                <Route key={path} path={path} element={<Component />} />
              ))}
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
      <DemoModal />
    </BrowserRouter>
  )
}

export default App
