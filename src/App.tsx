import { BrowserRouter, Routes, Route } from 'react-router-dom'

function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[var(--color-bg)] text-[var(--color-text)]">
      <h1 className="text-4xl font-bold mb-4">Salon Fryzjerski</h1>
      <p className="text-lg text-[var(--color-taupe)]">Witaj w naszym salonie fryzjerskim</p>
    </main>
  )
}

function App() {
  return (
    <BrowserRouter basename="/demo-fryzjer">
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
