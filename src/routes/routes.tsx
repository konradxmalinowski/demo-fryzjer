import { lazy } from 'react'

const Home = lazy(() => import('../pages/Home'))
const Services = lazy(() => import('../pages/Services'))
const Booking = lazy(() => import('../pages/Booking'))
const Gallery = lazy(() => import('../pages/Gallery'))
const Team = lazy(() => import('../pages/Team'))
const Contact = lazy(() => import('../pages/Contact'))

export const routes = [
  { path: '/', component: Home, label: 'Start' },
  { path: '/uslugi', component: Services, label: 'Usługi' },
  { path: '/rezerwacja', component: Booking, label: 'Rezerwacja' },
  { path: '/galeria', component: Gallery, label: 'Galeria' },
  { path: '/zespol', component: Team, label: 'Zespół' },
  { path: '/kontakt', component: Contact, label: 'Kontakt' },
]
